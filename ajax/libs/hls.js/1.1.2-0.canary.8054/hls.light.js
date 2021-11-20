typeof window !== "undefined" &&
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Hls"] = factory();
	else
		root["Hls"] = factory();
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/hls.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/url-toolkit/src/url-toolkit.js":
/*!*****************************************************!*\
  !*** ./node_modules/url-toolkit/src/url-toolkit.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// see https://tools.ietf.org/html/rfc1808

(function (root) {
  var URL_REGEX =
    /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#[^]*)?$/;
  var FIRST_SEGMENT_REGEX = /^([^\/?#]*)([^]*)$/;
  var SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
  var SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g;

  var URLToolkit = {
    // If opts.alwaysNormalize is true then the path will always be normalized even when it starts with / or //
    // E.g
    // With opts.alwaysNormalize = false (default, spec compliant)
    // http://a.com/b/cd + /e/f/../g => http://a.com/e/f/../g
    // With opts.alwaysNormalize = true (not spec compliant)
    // http://a.com/b/cd + /e/f/../g => http://a.com/e/g
    buildAbsoluteURL: function (baseURL, relativeURL, opts) {
      opts = opts || {};
      // remove any remaining space and CRLF
      baseURL = baseURL.trim();
      relativeURL = relativeURL.trim();
      if (!relativeURL) {
        // 2a) If the embedded URL is entirely empty, it inherits the
        // entire base URL (i.e., is set equal to the base URL)
        // and we are done.
        if (!opts.alwaysNormalize) {
          return baseURL;
        }
        var basePartsForNormalise = URLToolkit.parseURL(baseURL);
        if (!basePartsForNormalise) {
          throw new Error('Error trying to parse base URL.');
        }
        basePartsForNormalise.path = URLToolkit.normalizePath(
          basePartsForNormalise.path
        );
        return URLToolkit.buildURLFromParts(basePartsForNormalise);
      }
      var relativeParts = URLToolkit.parseURL(relativeURL);
      if (!relativeParts) {
        throw new Error('Error trying to parse relative URL.');
      }
      if (relativeParts.scheme) {
        // 2b) If the embedded URL starts with a scheme name, it is
        // interpreted as an absolute URL and we are done.
        if (!opts.alwaysNormalize) {
          return relativeURL;
        }
        relativeParts.path = URLToolkit.normalizePath(relativeParts.path);
        return URLToolkit.buildURLFromParts(relativeParts);
      }
      var baseParts = URLToolkit.parseURL(baseURL);
      if (!baseParts) {
        throw new Error('Error trying to parse base URL.');
      }
      if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== '/') {
        // If netLoc missing and path doesn't start with '/', assume everthing before the first '/' is the netLoc
        // This causes 'example.com/a' to be handled as '//example.com/a' instead of '/example.com/a'
        var pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
        baseParts.netLoc = pathParts[1];
        baseParts.path = pathParts[2];
      }
      if (baseParts.netLoc && !baseParts.path) {
        baseParts.path = '/';
      }
      var builtParts = {
        // 2c) Otherwise, the embedded URL inherits the scheme of
        // the base URL.
        scheme: baseParts.scheme,
        netLoc: relativeParts.netLoc,
        path: null,
        params: relativeParts.params,
        query: relativeParts.query,
        fragment: relativeParts.fragment,
      };
      if (!relativeParts.netLoc) {
        // 3) If the embedded URL's <net_loc> is non-empty, we skip to
        // Step 7.  Otherwise, the embedded URL inherits the <net_loc>
        // (if any) of the base URL.
        builtParts.netLoc = baseParts.netLoc;
        // 4) If the embedded URL path is preceded by a slash "/", the
        // path is not relative and we skip to Step 7.
        if (relativeParts.path[0] !== '/') {
          if (!relativeParts.path) {
            // 5) If the embedded URL path is empty (and not preceded by a
            // slash), then the embedded URL inherits the base URL path
            builtParts.path = baseParts.path;
            // 5a) if the embedded URL's <params> is non-empty, we skip to
            // step 7; otherwise, it inherits the <params> of the base
            // URL (if any) and
            if (!relativeParts.params) {
              builtParts.params = baseParts.params;
              // 5b) if the embedded URL's <query> is non-empty, we skip to
              // step 7; otherwise, it inherits the <query> of the base
              // URL (if any) and we skip to step 7.
              if (!relativeParts.query) {
                builtParts.query = baseParts.query;
              }
            }
          } else {
            // 6) The last segment of the base URL's path (anything
            // following the rightmost slash "/", or the entire path if no
            // slash is present) is removed and the embedded URL's path is
            // appended in its place.
            var baseURLPath = baseParts.path;
            var newPath =
              baseURLPath.substring(0, baseURLPath.lastIndexOf('/') + 1) +
              relativeParts.path;
            builtParts.path = URLToolkit.normalizePath(newPath);
          }
        }
      }
      if (builtParts.path === null) {
        builtParts.path = opts.alwaysNormalize
          ? URLToolkit.normalizePath(relativeParts.path)
          : relativeParts.path;
      }
      return URLToolkit.buildURLFromParts(builtParts);
    },
    parseURL: function (url) {
      var parts = URL_REGEX.exec(url);
      if (!parts) {
        return null;
      }
      return {
        scheme: parts[1] || '',
        netLoc: parts[2] || '',
        path: parts[3] || '',
        params: parts[4] || '',
        query: parts[5] || '',
        fragment: parts[6] || '',
      };
    },
    normalizePath: function (path) {
      // The following operations are
      // then applied, in order, to the new path:
      // 6a) All occurrences of "./", where "." is a complete path
      // segment, are removed.
      // 6b) If the path ends with "." as a complete path segment,
      // that "." is removed.
      path = path.split('').reverse().join('').replace(SLASH_DOT_REGEX, '');
      // 6c) All occurrences of "<segment>/../", where <segment> is a
      // complete path segment not equal to "..", are removed.
      // Removal of these path segments is performed iteratively,
      // removing the leftmost matching pattern on each iteration,
      // until no matching pattern remains.
      // 6d) If the path ends with "<segment>/..", where <segment> is a
      // complete path segment not equal to "..", that
      // "<segment>/.." is removed.
      while (
        path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, '')).length
      ) {}
      return path.split('').reverse().join('');
    },
    buildURLFromParts: function (parts) {
      return (
        parts.scheme +
        parts.netLoc +
        parts.path +
        parts.params +
        parts.query +
        parts.fragment
      );
    },
  };

  if (true)
    module.exports = URLToolkit;
  else {}
})(this);


/***/ }),

/***/ "./node_modules/webworkify-webpack/index.js":
/*!**************************************************!*\
  !*** ./node_modules/webworkify-webpack/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function webpackBootstrapFunc (modules) {
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.l = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }

/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // identity function for calling harmony imports with the correct context
/******/  __webpack_require__.i = function(value) { return value; };

/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };

/******/  // define __esModule on exports
/******/  __webpack_require__.r = function(exports) {
/******/    Object.defineProperty(exports, '__esModule', { value: true });
/******/  };

/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };

/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "/";

/******/  // on error function for async loading
/******/  __webpack_require__.oe = function(err) { console.error(err); throw err; };

  var f = __webpack_require__(__webpack_require__.s = ENTRY_MODULE)
  return f.default || f // try to call default if defined to also support babel esmodule exports
}

var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+'
var dependencyRegExp = '\\(\\s*(\/\\*.*?\\*\/)?\\s*.*?(' + moduleNameReqExp + ').*?\\)' // additional chars when output.pathinfo is true

// http://stackoverflow.com/a/2593661/130442
function quoteRegExp (str) {
  return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
}

function isNumeric(n) {
  return !isNaN(1 * n); // 1 * n converts integers, integers as string ("123"), 1e3 and "1e3" to integers and strings to NaN
}

function getModuleDependencies (sources, module, queueName) {
  var retval = {}
  retval[queueName] = []

  var fnString = module.toString()
  var wrapperSignature = fnString.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/)
  if (!wrapperSignature) return retval
  var webpackRequireName = wrapperSignature[1]

  // main bundle deps
  var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g')
  var match
  while ((match = re.exec(fnString))) {
    if (match[3] === 'dll-reference') continue
    retval[queueName].push(match[3])
  }

  // dll deps
  re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g')
  while ((match = re.exec(fnString))) {
    if (!sources[match[2]]) {
      retval[queueName].push(match[1])
      sources[match[2]] = __webpack_require__(match[1]).m
    }
    retval[match[2]] = retval[match[2]] || []
    retval[match[2]].push(match[4])
  }

  // convert 1e3 back to 1000 - this can be important after uglify-js converted 1000 to 1e3
  var keys = Object.keys(retval);
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < retval[keys[i]].length; j++) {
      if (isNumeric(retval[keys[i]][j])) {
        retval[keys[i]][j] = 1 * retval[keys[i]][j];
      }
    }
  }

  return retval
}

function hasValuesInQueues (queues) {
  var keys = Object.keys(queues)
  return keys.reduce(function (hasValues, key) {
    return hasValues || queues[key].length > 0
  }, false)
}

function getRequiredModules (sources, moduleId) {
  var modulesQueue = {
    main: [moduleId]
  }
  var requiredModules = {
    main: []
  }
  var seenModules = {
    main: {}
  }

  while (hasValuesInQueues(modulesQueue)) {
    var queues = Object.keys(modulesQueue)
    for (var i = 0; i < queues.length; i++) {
      var queueName = queues[i]
      var queue = modulesQueue[queueName]
      var moduleToCheck = queue.pop()
      seenModules[queueName] = seenModules[queueName] || {}
      if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck]) continue
      seenModules[queueName][moduleToCheck] = true
      requiredModules[queueName] = requiredModules[queueName] || []
      requiredModules[queueName].push(moduleToCheck)
      var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName)
      var newModulesKeys = Object.keys(newModules)
      for (var j = 0; j < newModulesKeys.length; j++) {
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || []
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]])
      }
    }
  }

  return requiredModules
}

module.exports = function (moduleId, options) {
  options = options || {}
  var sources = {
    main: __webpack_require__.m
  }

  var requiredModules = options.all ? { main: Object.keys(sources.main) } : getRequiredModules(sources, moduleId)

  var src = ''

  Object.keys(requiredModules).filter(function (m) { return m !== 'main' }).forEach(function (module) {
    var entryModule = 0
    while (requiredModules[module][entryModule]) {
      entryModule++
    }
    requiredModules[module].push(entryModule)
    sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })'
    src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString() }).join(',') + '});\n'
  })

  src = src + 'new ((' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString() }).join(',') + '}))(self);'

  var blob = new window.Blob([src], { type: 'text/javascript' })
  if (options.bare) { return blob }

  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL

  var workerUrl = URL.createObjectURL(blob)
  var worker = new window.Worker(workerUrl)
  worker.objectURL = workerUrl

  return worker
}


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: hlsDefaultConfig, mergeConfig, enableStreamingMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hlsDefaultConfig", function() { return hlsDefaultConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeConfig", function() { return mergeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableStreamingMode", function() { return enableStreamingMode; });
/* harmony import */ var _controller_abr_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/abr-controller */ "./src/controller/abr-controller.ts");
/* harmony import */ var _controller_audio_stream_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller/audio-stream-controller */ "./src/empty.js");
/* harmony import */ var _controller_audio_stream_controller__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_controller_audio_stream_controller__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controller_buffer_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller/buffer-controller */ "./src/controller/buffer-controller.ts");
/* harmony import */ var _controller_cap_level_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller/cap-level-controller */ "./src/controller/cap-level-controller.ts");
/* harmony import */ var _controller_fps_controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controller/fps-controller */ "./src/controller/fps-controller.ts");
/* harmony import */ var _utils_xhr_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/xhr-loader */ "./src/utils/xhr-loader.ts");
/* harmony import */ var _utils_fetch_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/fetch-loader */ "./src/utils/fetch-loader.ts");
/* harmony import */ var _utils_mediakeys_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/mediakeys-helper */ "./src/utils/mediakeys-helper.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















// If possible, keep hlsDefaultConfig shallow
// It is cloned whenever a new Hls instance is created, by keeping the config
// shallow the properties are cloned, and we don't end up manipulating the default
var hlsDefaultConfig = _objectSpread(_objectSpread({
  autoStartLoad: true,
  // used by stream-controller
  startPosition: -1,
  // used by stream-controller
  defaultAudioCodec: undefined,
  // used by stream-controller
  debug: false,
  // used by logger
  capLevelOnFPSDrop: false,
  // used by fps-controller
  capLevelToPlayerSize: false,
  // used by cap-level-controller
  initialLiveManifestSize: 1,
  // used by stream-controller
  maxBufferLength: 30,
  // used by stream-controller
  backBufferLength: Infinity,
  // used by buffer-controller
  maxBufferSize: 60 * 1000 * 1000,
  // used by stream-controller
  maxBufferHole: 0.1,
  // used by stream-controller
  highBufferWatchdogPeriod: 2,
  // used by stream-controller
  nudgeOffset: 0.1,
  // used by stream-controller
  nudgeMaxRetry: 3,
  // used by stream-controller
  maxFragLookUpTolerance: 0.25,
  // used by stream-controller
  liveSyncDurationCount: 3,
  // used by latency-controller
  liveMaxLatencyDurationCount: Infinity,
  // used by latency-controller
  liveSyncDuration: undefined,
  // used by latency-controller
  liveMaxLatencyDuration: undefined,
  // used by latency-controller
  maxLiveSyncPlaybackRate: 1,
  // used by latency-controller
  liveDurationInfinity: false,
  // used by buffer-controller
  liveBackBufferLength: null,
  // used by buffer-controller
  maxMaxBufferLength: 600,
  // used by stream-controller
  enableWorker: true,
  // used by demuxer
  enableSoftwareAES: true,
  // used by decrypter
  manifestLoadingTimeOut: 10000,
  // used by playlist-loader
  manifestLoadingMaxRetry: 1,
  // used by playlist-loader
  manifestLoadingRetryDelay: 1000,
  // used by playlist-loader
  manifestLoadingMaxRetryTimeout: 64000,
  // used by playlist-loader
  startLevel: undefined,
  // used by level-controller
  levelLoadingTimeOut: 10000,
  // used by playlist-loader
  levelLoadingMaxRetry: 4,
  // used by playlist-loader
  levelLoadingRetryDelay: 1000,
  // used by playlist-loader
  levelLoadingMaxRetryTimeout: 64000,
  // used by playlist-loader
  fragLoadingTimeOut: 20000,
  // used by fragment-loader
  fragLoadingMaxRetry: 6,
  // used by fragment-loader
  fragLoadingRetryDelay: 1000,
  // used by fragment-loader
  fragLoadingMaxRetryTimeout: 64000,
  // used by fragment-loader
  startFragPrefetch: false,
  // used by stream-controller
  fpsDroppedMonitoringPeriod: 5000,
  // used by fps-controller
  fpsDroppedMonitoringThreshold: 0.2,
  // used by fps-controller
  appendErrorMaxRetry: 3,
  // used by buffer-controller
  loader: _utils_xhr_loader__WEBPACK_IMPORTED_MODULE_5__["default"],
  // loader: FetchLoader,
  fLoader: undefined,
  // used by fragment-loader
  pLoader: undefined,
  // used by playlist-loader
  xhrSetup: undefined,
  // used by xhr-loader
  licenseXhrSetup: undefined,
  // used by eme-controller
  licenseResponseCallback: undefined,
  // used by eme-controller
  abrController: _controller_abr_controller__WEBPACK_IMPORTED_MODULE_0__["default"],
  bufferController: _controller_buffer_controller__WEBPACK_IMPORTED_MODULE_2__["default"],
  capLevelController: _controller_cap_level_controller__WEBPACK_IMPORTED_MODULE_3__["default"],
  fpsController: _controller_fps_controller__WEBPACK_IMPORTED_MODULE_4__["default"],
  stretchShortVideoTrack: false,
  // used by mp4-remuxer
  maxAudioFramesDrift: 1,
  // used by mp4-remuxer
  forceKeyFrameOnDiscontinuity: true,
  // used by ts-demuxer
  abrEwmaFastLive: 3,
  // used by abr-controller
  abrEwmaSlowLive: 9,
  // used by abr-controller
  abrEwmaFastVoD: 3,
  // used by abr-controller
  abrEwmaSlowVoD: 9,
  // used by abr-controller
  abrEwmaDefaultEstimate: 5e5,
  // 500 kbps  // used by abr-controller
  abrBandWidthFactor: 0.95,
  // used by abr-controller
  abrBandWidthUpFactor: 0.7,
  // used by abr-controller
  abrMaxWithRealBitrate: false,
  // used by abr-controller
  maxStarvationDelay: 4,
  // used by abr-controller
  maxLoadingDelay: 4,
  // used by abr-controller
  minAutoBitrate: 0,
  // used by hls
  emeEnabled: false,
  // used by eme-controller
  widevineLicenseUrl: undefined,
  // used by eme-controller
  drmSystemOptions: {},
  // used by eme-controller
  requestMediaKeySystemAccessFunc: _utils_mediakeys_helper__WEBPACK_IMPORTED_MODULE_7__["requestMediaKeySystemAccess"],
  // used by eme-controller
  testBandwidth: true,
  progressive: false,
  lowLatencyMode: true,
  cmcd: undefined
}, timelineConfig()), {}, {
  subtitleStreamController:  false ? undefined : undefined,
  subtitleTrackController:  false ? undefined : undefined,
  timelineController:  false ? undefined : undefined,
  audioStreamController:  false ? undefined : undefined,
  audioTrackController:  false ? undefined : undefined,
  emeController:  false ? undefined : undefined,
  cmcdController:  false ? undefined : undefined
});

function timelineConfig() {
  return {
    cueHandler: _controller_audio_stream_controller__WEBPACK_IMPORTED_MODULE_1___default.a,
    // used by timeline-controller
    enableCEA708Captions: false,
    // used by timeline-controller
    enableWebVTT: false,
    // used by timeline-controller
    enableIMSC1: false,
    // used by timeline-controller
    captionsTextTrack1Label: 'English',
    // used by timeline-controller
    captionsTextTrack1LanguageCode: 'en',
    // used by timeline-controller
    captionsTextTrack2Label: 'Spanish',
    // used by timeline-controller
    captionsTextTrack2LanguageCode: 'es',
    // used by timeline-controller
    captionsTextTrack3Label: 'Unknown CC',
    // used by timeline-controller
    captionsTextTrack3LanguageCode: '',
    // used by timeline-controller
    captionsTextTrack4Label: 'Unknown CC',
    // used by timeline-controller
    captionsTextTrack4LanguageCode: '',
    // used by timeline-controller
    renderTextTracksNatively: true
  };
}

function mergeConfig(defaultConfig, userConfig) {
  if ((userConfig.liveSyncDurationCount || userConfig.liveMaxLatencyDurationCount) && (userConfig.liveSyncDuration || userConfig.liveMaxLatencyDuration)) {
    throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
  }

  if (userConfig.liveMaxLatencyDurationCount !== undefined && (userConfig.liveSyncDurationCount === undefined || userConfig.liveMaxLatencyDurationCount <= userConfig.liveSyncDurationCount)) {
    throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
  }

  if (userConfig.liveMaxLatencyDuration !== undefined && (userConfig.liveSyncDuration === undefined || userConfig.liveMaxLatencyDuration <= userConfig.liveSyncDuration)) {
    throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
  }

  return _extends({}, defaultConfig, userConfig);
}
function enableStreamingMode(config) {
  var currentLoader = config.loader;

  if (currentLoader !== _utils_fetch_loader__WEBPACK_IMPORTED_MODULE_6__["default"] && currentLoader !== _utils_xhr_loader__WEBPACK_IMPORTED_MODULE_5__["default"]) {
    // If a developer has configured their own loader, respect that choice
    _utils_logger__WEBPACK_IMPORTED_MODULE_8__["logger"].log('[config]: Custom loader detected, cannot enable progressive streaming');
    config.progressive = false;
  } else {
    var canStreamProgressively = Object(_utils_fetch_loader__WEBPACK_IMPORTED_MODULE_6__["fetchSupported"])();

    if (canStreamProgressively) {
      config.loader = _utils_fetch_loader__WEBPACK_IMPORTED_MODULE_6__["default"];
      config.progressive = true;
      config.enableSoftwareAES = true;
      _utils_logger__WEBPACK_IMPORTED_MODULE_8__["logger"].log('[config]: Progressive streaming enabled, using FetchLoader');
    }
  }
}

/***/ }),

/***/ "./src/controller/abr-controller.ts":
/*!******************************************!*\
  !*** ./src/controller/abr-controller.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _utils_ewma_bandwidth_estimator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ewma-bandwidth-estimator */ "./src/utils/ewma-bandwidth-estimator.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/buffer-helper */ "./src/utils/buffer-helper.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _types_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types/loader */ "./src/types/loader.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");



function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var AbrController = /*#__PURE__*/function () {
  function AbrController(hls) {
    this.hls = void 0;
    this.lastLoadedFragLevel = 0;
    this._nextAutoLevel = -1;
    this.timer = void 0;
    this.onCheck = this._abandonRulesCheck.bind(this);
    this.fragCurrent = null;
    this.partCurrent = null;
    this.bitrateTestDelay = 0;
    this.bwEstimator = void 0;
    this.hls = hls;
    var config = hls.config;
    this.bwEstimator = new _utils_ewma_bandwidth_estimator__WEBPACK_IMPORTED_MODULE_1__["default"](config.abrEwmaSlowVoD, config.abrEwmaFastVoD, config.abrEwmaDefaultEstimate);
    this.registerListeners();
  }

  var _proto = AbrController.prototype;

  _proto.registerListeners = function registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_LOADING, this.onFragLoading, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_LOADED, this.onFragLoaded, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_BUFFERED, this.onFragBuffered, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].LEVEL_LOADED, this.onLevelLoaded, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].ERROR, this.onError, this);
  };

  _proto.unregisterListeners = function unregisterListeners() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_LOADING, this.onFragLoading, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_LOADED, this.onFragLoaded, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_BUFFERED, this.onFragBuffered, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].LEVEL_LOADED, this.onLevelLoaded, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].ERROR, this.onError, this);
  };

  _proto.destroy = function destroy() {
    this.unregisterListeners();
    this.clearTimer(); // @ts-ignore

    this.hls = this.onCheck = null;
    this.fragCurrent = this.partCurrent = null;
  };

  _proto.onFragLoading = function onFragLoading(event, data) {
    var frag = data.frag;

    if (frag.type === _types_loader__WEBPACK_IMPORTED_MODULE_5__["PlaylistLevelType"].MAIN) {
      if (!this.timer) {
        var _data$part;

        this.fragCurrent = frag;
        this.partCurrent = (_data$part = data.part) != null ? _data$part : null;
        this.timer = self.setInterval(this.onCheck, 100);
      }
    }
  };

  _proto.onLevelLoaded = function onLevelLoaded(event, data) {
    var config = this.hls.config;

    if (data.details.live) {
      this.bwEstimator.update(config.abrEwmaSlowLive, config.abrEwmaFastLive);
    } else {
      this.bwEstimator.update(config.abrEwmaSlowVoD, config.abrEwmaFastVoD);
    }
  }
  /*
      This method monitors the download rate of the current fragment, and will downswitch if that fragment will not load
      quickly enough to prevent underbuffering
    */
  ;

  _proto._abandonRulesCheck = function _abandonRulesCheck() {
    var frag = this.fragCurrent,
        part = this.partCurrent,
        hls = this.hls;
    var autoLevelEnabled = hls.autoLevelEnabled,
        config = hls.config,
        media = hls.media;

    if (!frag || !media) {
      return;
    }

    var stats = part ? part.stats : frag.stats;
    var duration = part ? part.duration : frag.duration; // If loading has been aborted and not in lowLatencyMode, stop timer and return

    if (stats.aborted) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].warn('frag loader destroy or aborted, disarm abandonRules');
      this.clearTimer(); // reset forced auto level value so that next level will be selected

      this._nextAutoLevel = -1;
      return;
    } // This check only runs if we're in ABR mode and actually playing


    if (!autoLevelEnabled || media.paused || !media.playbackRate || !media.readyState) {
      return;
    }

    var requestDelay = performance.now() - stats.loading.start;
    var playbackRate = Math.abs(media.playbackRate); // In order to work with a stable bandwidth, only begin monitoring bandwidth after half of the fragment has been loaded

    if (requestDelay <= 500 * duration / playbackRate) {
      return;
    }

    var levels = hls.levels,
        minAutoLevel = hls.minAutoLevel;
    var level = levels[frag.level];
    var expectedLen = stats.total || Math.max(stats.loaded, Math.round(duration * level.maxBitrate / 8));
    var loadRate = Math.max(1, stats.bwEstimate ? stats.bwEstimate / 8 : stats.loaded * 1000 / requestDelay); // fragLoadDelay is an estimate of the time (in seconds) it will take to buffer the entire fragment

    var fragLoadedDelay = (expectedLen - stats.loaded) / loadRate;
    var pos = media.currentTime; // bufferStarvationDelay is an estimate of the amount time (in seconds) it will take to exhaust the buffer

    var bufferStarvationDelay = (_utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].bufferInfo(media, pos, config.maxBufferHole).end - pos) / playbackRate; // Attempt an emergency downswitch only if less than 2 fragment lengths are buffered, and the time to finish loading
    // the current fragment is greater than the amount of buffer we have left

    if (bufferStarvationDelay >= 2 * duration / playbackRate || fragLoadedDelay <= bufferStarvationDelay) {
      return;
    }

    var fragLevelNextLoadedDelay = Number.POSITIVE_INFINITY;
    var nextLoadLevel; // Iterate through lower level and try to find the largest one that avoids rebuffering

    for (nextLoadLevel = frag.level - 1; nextLoadLevel > minAutoLevel; nextLoadLevel--) {
      // compute time to load next fragment at lower level
      // 0.8 : consider only 80% of current bw to be conservative
      // 8 = bits per byte (bps/Bps)
      var levelNextBitrate = levels[nextLoadLevel].maxBitrate;
      fragLevelNextLoadedDelay = duration * levelNextBitrate / (8 * 0.8 * loadRate);

      if (fragLevelNextLoadedDelay < bufferStarvationDelay) {
        break;
      }
    } // Only emergency switch down if it takes less time to load a new fragment at lowest level instead of continuing
    // to load the current one


    if (fragLevelNextLoadedDelay >= fragLoadedDelay) {
      return;
    }

    var bwEstimate = this.bwEstimator.getEstimate();
    _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].warn("Fragment " + frag.sn + (part ? ' part ' + part.index : '') + " of level " + frag.level + " is loading too slowly and will cause an underbuffer; aborting and switching to level " + nextLoadLevel + "\n      Current BW estimate: " + (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(bwEstimate) ? (bwEstimate / 1024).toFixed(3) : 'Unknown') + " Kb/s\n      Estimated load time for current fragment: " + fragLoadedDelay.toFixed(3) + " s\n      Estimated load time for the next fragment: " + fragLevelNextLoadedDelay.toFixed(3) + " s\n      Time to underbuffer: " + bufferStarvationDelay.toFixed(3) + " s");
    hls.nextLoadLevel = nextLoadLevel;
    this.bwEstimator.sample(requestDelay, stats.loaded);
    this.clearTimer();

    if (frag.loader) {
      this.fragCurrent = this.partCurrent = null;
      frag.loader.abort();
    }

    hls.trigger(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_LOAD_EMERGENCY_ABORTED, {
      frag: frag,
      part: part,
      stats: stats
    });
  };

  _proto.onFragLoaded = function onFragLoaded(event, _ref) {
    var frag = _ref.frag,
        part = _ref.part;

    if (frag.type === _types_loader__WEBPACK_IMPORTED_MODULE_5__["PlaylistLevelType"].MAIN && Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(frag.sn)) {
      var stats = part ? part.stats : frag.stats;
      var duration = part ? part.duration : frag.duration; // stop monitoring bw once frag loaded

      this.clearTimer(); // store level id after successful fragment load

      this.lastLoadedFragLevel = frag.level; // reset forced auto level value so that next level will be selected

      this._nextAutoLevel = -1; // compute level average bitrate

      if (this.hls.config.abrMaxWithRealBitrate) {
        var level = this.hls.levels[frag.level];
        var loadedBytes = (level.loaded ? level.loaded.bytes : 0) + stats.loaded;
        var loadedDuration = (level.loaded ? level.loaded.duration : 0) + duration;
        level.loaded = {
          bytes: loadedBytes,
          duration: loadedDuration
        };
        level.realBitrate = Math.round(8 * loadedBytes / loadedDuration);
      }

      if (frag.bitrateTest) {
        var fragBufferedData = {
          stats: stats,
          frag: frag,
          part: part,
          id: frag.type
        };
        this.onFragBuffered(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].FRAG_BUFFERED, fragBufferedData);
        frag.bitrateTest = false;
      }
    }
  };

  _proto.onFragBuffered = function onFragBuffered(event, data) {
    var frag = data.frag,
        part = data.part;
    var stats = part ? part.stats : frag.stats;

    if (stats.aborted) {
      return;
    } // Only count non-alt-audio frags which were actually buffered in our BW calculations


    if (frag.type !== _types_loader__WEBPACK_IMPORTED_MODULE_5__["PlaylistLevelType"].MAIN || frag.sn === 'initSegment') {
      return;
    } // Use the difference between parsing and request instead of buffering and request to compute fragLoadingProcessing;
    // rationale is that buffer appending only happens once media is attached. This can happen when config.startFragPrefetch
    // is used. If we used buffering in that case, our BW estimate sample will be very large.


    var processingMs = stats.parsing.end - stats.loading.start;
    this.bwEstimator.sample(processingMs, stats.loaded);
    stats.bwEstimate = this.bwEstimator.getEstimate();

    if (frag.bitrateTest) {
      this.bitrateTestDelay = processingMs / 1000;
    } else {
      this.bitrateTestDelay = 0;
    }
  };

  _proto.onError = function onError(event, data) {
    // stop timer in case of frag loading error
    switch (data.details) {
      case _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorDetails"].FRAG_LOAD_ERROR:
      case _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorDetails"].FRAG_LOAD_TIMEOUT:
        this.clearTimer();
        break;

      default:
        break;
    }
  };

  _proto.clearTimer = function clearTimer() {
    self.clearInterval(this.timer);
    this.timer = undefined;
  } // return next auto level
  ;

  _proto.getNextABRAutoLevel = function getNextABRAutoLevel() {
    var fragCurrent = this.fragCurrent,
        partCurrent = this.partCurrent,
        hls = this.hls;
    var maxAutoLevel = hls.maxAutoLevel,
        config = hls.config,
        minAutoLevel = hls.minAutoLevel,
        media = hls.media;
    var currentFragDuration = partCurrent ? partCurrent.duration : fragCurrent ? fragCurrent.duration : 0;
    var pos = media ? media.currentTime : 0; // playbackRate is the absolute value of the playback rate; if media.playbackRate is 0, we use 1 to load as
    // if we're playing back at the normal rate.

    var playbackRate = media && media.playbackRate !== 0 ? Math.abs(media.playbackRate) : 1.0;
    var avgbw = this.bwEstimator ? this.bwEstimator.getEstimate() : config.abrEwmaDefaultEstimate; // bufferStarvationDelay is the wall-clock time left until the playback buffer is exhausted.

    var bufferStarvationDelay = (_utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].bufferInfo(media, pos, config.maxBufferHole).end - pos) / playbackRate; // First, look to see if we can find a level matching with our avg bandwidth AND that could also guarantee no rebuffering at all

    var bestLevel = this.findBestLevel(avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay, config.abrBandWidthFactor, config.abrBandWidthUpFactor);

    if (bestLevel >= 0) {
      return bestLevel;
    }

    _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].trace((bufferStarvationDelay ? 'rebuffering expected' : 'buffer is empty') + ", finding optimal quality level"); // not possible to get rid of rebuffering ... let's try to find level that will guarantee less than maxStarvationDelay of rebuffering
    // if no matching level found, logic will return 0

    var maxStarvationDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxStarvationDelay) : config.maxStarvationDelay;
    var bwFactor = config.abrBandWidthFactor;
    var bwUpFactor = config.abrBandWidthUpFactor;

    if (!bufferStarvationDelay) {
      // in case buffer is empty, let's check if previous fragment was loaded to perform a bitrate test
      var bitrateTestDelay = this.bitrateTestDelay;

      if (bitrateTestDelay) {
        // if it is the case, then we need to adjust our max starvation delay using maxLoadingDelay config value
        // max video loading delay used in  automatic start level selection :
        // in that mode ABR controller will ensure that video loading time (ie the time to fetch the first fragment at lowest quality level +
        // the time to fetch the fragment at the appropriate quality level is less than ```maxLoadingDelay``` )
        // cap maxLoadingDelay and ensure it is not bigger 'than bitrate test' frag duration
        var maxLoadingDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxLoadingDelay) : config.maxLoadingDelay;
        maxStarvationDelay = maxLoadingDelay - bitrateTestDelay;
        _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].trace("bitrate test took " + Math.round(1000 * bitrateTestDelay) + "ms, set first fragment max fetchDuration to " + Math.round(1000 * maxStarvationDelay) + " ms"); // don't use conservative factor on bitrate test

        bwFactor = bwUpFactor = 1;
      }
    }

    bestLevel = this.findBestLevel(avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay + maxStarvationDelay, bwFactor, bwUpFactor);
    return Math.max(bestLevel, 0);
  };

  _proto.findBestLevel = function findBestLevel(currentBw, minAutoLevel, maxAutoLevel, maxFetchDuration, bwFactor, bwUpFactor) {
    var _level$details;

    var fragCurrent = this.fragCurrent,
        partCurrent = this.partCurrent,
        currentLevel = this.lastLoadedFragLevel;
    var levels = this.hls.levels;
    var level = levels[currentLevel];
    var live = !!(level !== null && level !== void 0 && (_level$details = level.details) !== null && _level$details !== void 0 && _level$details.live);
    var currentCodecSet = level === null || level === void 0 ? void 0 : level.codecSet;
    var currentFragDuration = partCurrent ? partCurrent.duration : fragCurrent ? fragCurrent.duration : 0;

    for (var i = maxAutoLevel; i >= minAutoLevel; i--) {
      var levelInfo = levels[i];

      if (!levelInfo || currentCodecSet && levelInfo.codecSet !== currentCodecSet) {
        continue;
      }

      var levelDetails = levelInfo.details;
      var avgDuration = (partCurrent ? levelDetails === null || levelDetails === void 0 ? void 0 : levelDetails.partTarget : levelDetails === null || levelDetails === void 0 ? void 0 : levelDetails.averagetargetduration) || currentFragDuration;
      var adjustedbw = void 0; // follow algorithm captured from stagefright :
      // https://android.googlesource.com/platform/frameworks/av/+/master/media/libstagefright/httplive/LiveSession.cpp
      // Pick the highest bandwidth stream below or equal to estimated bandwidth.
      // consider only 80% of the available bandwidth, but if we are switching up,
      // be even more conservative (70%) to avoid overestimating and immediately
      // switching back.

      if (i <= currentLevel) {
        adjustedbw = bwFactor * currentBw;
      } else {
        adjustedbw = bwUpFactor * currentBw;
      }

      var bitrate = levels[i].maxBitrate;
      var fetchDuration = bitrate * avgDuration / adjustedbw;
      _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + i + "/" + Math.round(adjustedbw) + "/" + bitrate + "/" + avgDuration + "/" + maxFetchDuration + "/" + fetchDuration); // if adjusted bw is greater than level bitrate AND

      if (adjustedbw > bitrate && ( // fragment fetchDuration unknown OR live stream OR fragment fetchDuration less than max allowed fetch duration, then this level matches
      // we don't account for max Fetch Duration for live streams, this is to avoid switching down when near the edge of live sliding window ...
      // special case to support startLevel = -1 (bitrateTest) on live streams : in that case we should not exit loop so that findBestLevel will return -1
      !fetchDuration || live && !this.bitrateTestDelay || fetchDuration < maxFetchDuration)) {
        // as we are looping from highest to lowest, this will return the best achievable quality level
        return i;
      }
    } // not enough time budget even with quality level 0 ... rebuffering might happen


    return -1;
  };

  _createClass(AbrController, [{
    key: "nextAutoLevel",
    get: function get() {
      var forcedAutoLevel = this._nextAutoLevel;
      var bwEstimator = this.bwEstimator; // in case next auto level has been forced, and bw not available or not reliable, return forced value

      if (forcedAutoLevel !== -1 && (!bwEstimator || !bwEstimator.canEstimate())) {
        return forcedAutoLevel;
      } // compute next level using ABR logic


      var nextABRAutoLevel = this.getNextABRAutoLevel(); // if forced auto level has been defined, use it to cap ABR computed quality level

      if (forcedAutoLevel !== -1) {
        nextABRAutoLevel = Math.min(forcedAutoLevel, nextABRAutoLevel);
      }

      return nextABRAutoLevel;
    },
    set: function set(nextLevel) {
      this._nextAutoLevel = nextLevel;
    }
  }]);

  return AbrController;
}();

/* harmony default export */ __webpack_exports__["default"] = (AbrController);

/***/ }),

/***/ "./src/controller/base-playlist-controller.ts":
/*!****************************************************!*\
  !*** ./src/controller/base-playlist-controller.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BasePlaylistController; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _types_level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/level */ "./src/types/level.ts");
/* harmony import */ var _level_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./level-helper */ "./src/controller/level-helper.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");







var BasePlaylistController = /*#__PURE__*/function () {
  function BasePlaylistController(hls, logPrefix) {
    this.hls = void 0;
    this.timer = -1;
    this.canLoad = false;
    this.retryCount = 0;
    this.log = void 0;
    this.warn = void 0;
    this.log = _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].log.bind(_utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"], logPrefix + ":");
    this.warn = _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn.bind(_utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"], logPrefix + ":");
    this.hls = hls;
  }

  var _proto = BasePlaylistController.prototype;

  _proto.destroy = function destroy() {
    this.clearTimer(); // @ts-ignore

    this.hls = this.log = this.warn = null;
  };

  _proto.onError = function onError(event, data) {
    if (data.fatal && data.type === _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorTypes"].NETWORK_ERROR) {
      this.clearTimer();
    }
  };

  _proto.clearTimer = function clearTimer() {
    clearTimeout(this.timer);
    this.timer = -1;
  };

  _proto.startLoad = function startLoad() {
    this.canLoad = true;
    this.retryCount = 0;
    this.loadPlaylist();
  };

  _proto.stopLoad = function stopLoad() {
    this.canLoad = false;
    this.clearTimer();
  };

  _proto.switchParams = function switchParams(playlistUri, previous) {
    var renditionReports = previous === null || previous === void 0 ? void 0 : previous.renditionReports;

    if (renditionReports) {
      for (var i = 0; i < renditionReports.length; i++) {
        var attr = renditionReports[i];
        var uri = '' + attr.URI;

        if (uri === playlistUri.substr(-uri.length)) {
          var msn = parseInt(attr['LAST-MSN']);
          var part = parseInt(attr['LAST-PART']);

          if (previous && this.hls.config.lowLatencyMode) {
            var currentGoal = Math.min(previous.age - previous.partTarget, previous.targetduration);

            if (part !== undefined && currentGoal > previous.partTarget) {
              part += 1;
            }
          }

          if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(msn)) {
            return new _types_level__WEBPACK_IMPORTED_MODULE_1__["HlsUrlParameters"](msn, Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(part) ? part : undefined, _types_level__WEBPACK_IMPORTED_MODULE_1__["HlsSkip"].No);
          }
        }
      }
    }
  };

  _proto.loadPlaylist = function loadPlaylist(hlsUrlParameters) {};

  _proto.shouldLoadTrack = function shouldLoadTrack(track) {
    return this.canLoad && track && !!track.url && (!track.details || track.details.live);
  };

  _proto.playlistLoaded = function playlistLoaded(index, data, previousDetails) {
    var _this = this;

    var details = data.details,
        stats = data.stats; // Set last updated date-time

    var elapsed = stats.loading.end ? Math.max(0, self.performance.now() - stats.loading.end) : 0;
    details.advancedDateTime = Date.now() - elapsed; // if current playlist is a live playlist, arm a timer to reload it

    if (details.live || previousDetails !== null && previousDetails !== void 0 && previousDetails.live) {
      details.reloaded(previousDetails);

      if (previousDetails) {
        this.log("live playlist " + index + " " + (details.advanced ? 'REFRESHED ' + details.lastPartSn + '-' + details.lastPartIndex : 'MISSED'));
      } // Merge live playlists to adjust fragment starts and fill in delta playlist skipped segments


      if (previousDetails && details.fragments.length > 0) {
        Object(_level_helper__WEBPACK_IMPORTED_MODULE_2__["mergeDetails"])(previousDetails, details);
      }

      if (!this.canLoad || !details.live) {
        return;
      }

      var deliveryDirectives;
      var msn = undefined;
      var part = undefined;

      if (details.canBlockReload && details.endSN && details.advanced) {
        // Load level with LL-HLS delivery directives
        var lowLatencyMode = this.hls.config.lowLatencyMode;
        var lastPartSn = details.lastPartSn;
        var endSn = details.endSN;
        var lastPartIndex = details.lastPartIndex;
        var hasParts = lastPartIndex !== -1;
        var lastPart = lastPartSn === endSn; // When low latency mode is disabled, we'll skip part requests once the last part index is found

        var nextSnStartIndex = lowLatencyMode ? 0 : lastPartIndex;

        if (hasParts) {
          msn = lastPart ? endSn + 1 : lastPartSn;
          part = lastPart ? nextSnStartIndex : lastPartIndex + 1;
        } else {
          msn = endSn + 1;
        } // Low-Latency CDN Tune-in: "age" header and time since load indicates we're behind by more than one part
        // Update directives to obtain the Playlist that has the estimated additional duration of media


        var lastAdvanced = details.age;
        var cdnAge = lastAdvanced + details.ageHeader;
        var currentGoal = Math.min(cdnAge - details.partTarget, details.targetduration * 1.5);

        if (currentGoal > 0) {
          if (previousDetails && currentGoal > previousDetails.tuneInGoal) {
            // If we attempted to get the next or latest playlist update, but currentGoal increased,
            // then we either can't catchup, or the "age" header cannot be trusted.
            this.warn("CDN Tune-in goal increased from: " + previousDetails.tuneInGoal + " to: " + currentGoal + " with playlist age: " + details.age);
            currentGoal = 0;
          } else {
            var segments = Math.floor(currentGoal / details.targetduration);
            msn += segments;

            if (part !== undefined) {
              var parts = Math.round(currentGoal % details.targetduration / details.partTarget);
              part += parts;
            }

            this.log("CDN Tune-in age: " + details.ageHeader + "s last advanced " + lastAdvanced.toFixed(2) + "s goal: " + currentGoal + " skip sn " + segments + " to part " + part);
          }

          details.tuneInGoal = currentGoal;
        }

        deliveryDirectives = this.getDeliveryDirectives(details, data.deliveryDirectives, msn, part);

        if (lowLatencyMode || !lastPart) {
          this.loadPlaylist(deliveryDirectives);
          return;
        }
      } else {
        deliveryDirectives = this.getDeliveryDirectives(details, data.deliveryDirectives, msn, part);
      }

      var reloadInterval = Object(_level_helper__WEBPACK_IMPORTED_MODULE_2__["computeReloadInterval"])(details, stats);

      if (msn !== undefined && details.canBlockReload) {
        reloadInterval -= details.partTarget || 1;
      }

      this.log("reload live playlist " + index + " in " + Math.round(reloadInterval) + " ms");
      this.timer = self.setTimeout(function () {
        return _this.loadPlaylist(deliveryDirectives);
      }, reloadInterval);
    } else {
      this.clearTimer();
    }
  };

  _proto.getDeliveryDirectives = function getDeliveryDirectives(details, previousDeliveryDirectives, msn, part) {
    var skip = Object(_types_level__WEBPACK_IMPORTED_MODULE_1__["getSkipValue"])(details, msn);

    if (previousDeliveryDirectives !== null && previousDeliveryDirectives !== void 0 && previousDeliveryDirectives.skip && details.deltaUpdateFailed) {
      msn = previousDeliveryDirectives.msn;
      part = previousDeliveryDirectives.part;
      skip = _types_level__WEBPACK_IMPORTED_MODULE_1__["HlsSkip"].No;
    }

    return new _types_level__WEBPACK_IMPORTED_MODULE_1__["HlsUrlParameters"](msn, part, skip);
  };

  _proto.retryLoadingOrFail = function retryLoadingOrFail(errorEvent) {
    var _this2 = this;

    var config = this.hls.config;
    var retry = this.retryCount < config.levelLoadingMaxRetry;

    if (retry) {
      var _errorEvent$context;

      this.retryCount++;

      if (errorEvent.details.indexOf('LoadTimeOut') > -1 && (_errorEvent$context = errorEvent.context) !== null && _errorEvent$context !== void 0 && _errorEvent$context.deliveryDirectives) {
        // The LL-HLS request already timed out so retry immediately
        this.warn("retry playlist loading #" + this.retryCount + " after \"" + errorEvent.details + "\"");
        this.loadPlaylist();
      } else {
        // exponential backoff capped to max retry timeout
        var delay = Math.min(Math.pow(2, this.retryCount) * config.levelLoadingRetryDelay, config.levelLoadingMaxRetryTimeout); // Schedule level/track reload

        this.timer = self.setTimeout(function () {
          return _this2.loadPlaylist();
        }, delay);
        this.warn("retry playlist loading #" + this.retryCount + " in " + delay + " ms after \"" + errorEvent.details + "\"");
      }
    } else {
      this.warn("cannot recover from error \"" + errorEvent.details + "\""); // stopping live reloading timer if any

      this.clearTimer(); // switch error to fatal

      errorEvent.fatal = true;
    }

    return retry;
  };

  return BasePlaylistController;
}();



/***/ }),

/***/ "./src/controller/base-stream-controller.ts":
/*!**************************************************!*\
  !*** ./src/controller/base-stream-controller.ts ***!
  \**************************************************/
/*! exports provided: State, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseStreamController; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _task_loop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../task-loop */ "./src/task-loop.ts");
/* harmony import */ var _fragment_tracker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fragment-tracker */ "./src/controller/fragment-tracker.ts");
/* harmony import */ var _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/buffer-helper */ "./src/utils/buffer-helper.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _types_transmuxer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../types/transmuxer */ "./src/types/transmuxer.ts");
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _utils_discontinuities__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/discontinuities */ "./src/utils/discontinuities.ts");
/* harmony import */ var _fragment_finders__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fragment-finders */ "./src/controller/fragment-finders.ts");
/* harmony import */ var _level_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./level-helper */ "./src/controller/level-helper.ts");
/* harmony import */ var _loader_fragment_loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../loader/fragment-loader */ "./src/loader/fragment-loader.ts");
/* harmony import */ var _crypt_decrypter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../crypt/decrypter */ "./src/crypt/decrypter.ts");
/* harmony import */ var _utils_time_ranges__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utils/time-ranges */ "./src/utils/time-ranges.ts");
/* harmony import */ var _types_loader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../types/loader */ "./src/types/loader.ts");






function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
















var State = {
  STOPPED: 'STOPPED',
  IDLE: 'IDLE',
  KEY_LOADING: 'KEY_LOADING',
  FRAG_LOADING: 'FRAG_LOADING',
  FRAG_LOADING_WAITING_RETRY: 'FRAG_LOADING_WAITING_RETRY',
  WAITING_TRACK: 'WAITING_TRACK',
  PARSING: 'PARSING',
  PARSED: 'PARSED',
  BACKTRACKING: 'BACKTRACKING',
  ENDED: 'ENDED',
  ERROR: 'ERROR',
  WAITING_INIT_PTS: 'WAITING_INIT_PTS',
  WAITING_LEVEL: 'WAITING_LEVEL'
};

var BaseStreamController = /*#__PURE__*/function (_TaskLoop) {
  _inheritsLoose(BaseStreamController, _TaskLoop);

  function BaseStreamController(hls, fragmentTracker, logPrefix) {
    var _this;

    _this = _TaskLoop.call(this) || this;
    _this.hls = void 0;
    _this.fragPrevious = null;
    _this.fragCurrent = null;
    _this.fragmentTracker = void 0;
    _this.transmuxer = null;
    _this._state = State.STOPPED;
    _this.media = void 0;
    _this.mediaBuffer = void 0;
    _this.config = void 0;
    _this.bitrateTest = false;
    _this.lastCurrentTime = 0;
    _this.nextLoadPosition = 0;
    _this.startPosition = 0;
    _this.loadedmetadata = false;
    _this.fragLoadError = 0;
    _this.retryDate = 0;
    _this.levels = null;
    _this.fragmentLoader = void 0;
    _this.levelLastLoaded = null;
    _this.startFragRequested = false;
    _this.decrypter = void 0;
    _this.initPTS = [];
    _this.onvseeking = null;
    _this.onvended = null;
    _this.logPrefix = '';
    _this.log = void 0;
    _this.warn = void 0;
    _this.logPrefix = logPrefix;
    _this.log = _utils_logger__WEBPACK_IMPORTED_MODULE_4__["logger"].log.bind(_utils_logger__WEBPACK_IMPORTED_MODULE_4__["logger"], logPrefix + ":");
    _this.warn = _utils_logger__WEBPACK_IMPORTED_MODULE_4__["logger"].warn.bind(_utils_logger__WEBPACK_IMPORTED_MODULE_4__["logger"], logPrefix + ":");
    _this.hls = hls;
    _this.fragmentLoader = new _loader_fragment_loader__WEBPACK_IMPORTED_MODULE_12__["default"](hls.config);
    _this.fragmentTracker = fragmentTracker;
    _this.config = hls.config;
    _this.decrypter = new _crypt_decrypter__WEBPACK_IMPORTED_MODULE_13__["default"](hls, hls.config);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].KEY_LOADED, _this.onKeyLoaded, _assertThisInitialized(_this));
    return _this;
  }

  var _proto = BaseStreamController.prototype;

  _proto.doTick = function doTick() {
    this.onTickEnd();
  };

  _proto.onTickEnd = function onTickEnd() {} // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;

  _proto.startLoad = function startLoad(startPosition) {};

  _proto.stopLoad = function stopLoad() {
    this.fragmentLoader.abort();
    var frag = this.fragCurrent;

    if (frag) {
      this.fragmentTracker.removeFragment(frag);
    }

    this.resetTransmuxer();
    this.fragCurrent = null;
    this.fragPrevious = null;
    this.clearInterval();
    this.clearNextTick();
    this.state = State.STOPPED;
  };

  _proto._streamEnded = function _streamEnded(bufferInfo, levelDetails) {
    var fragCurrent = this.fragCurrent,
        fragmentTracker = this.fragmentTracker; // we just got done loading the final fragment and there is no other buffered range after ...
    // rationale is that in case there are any buffered ranges after, it means that there are unbuffered portion in between
    // so we should not switch to ENDED in that case, to be able to buffer them

    if (!levelDetails.live && fragCurrent && fragCurrent.sn === levelDetails.endSN && !bufferInfo.nextStart) {
      var fragState = fragmentTracker.getState(fragCurrent);
      return fragState === _fragment_tracker__WEBPACK_IMPORTED_MODULE_2__["FragmentState"].PARTIAL || fragState === _fragment_tracker__WEBPACK_IMPORTED_MODULE_2__["FragmentState"].OK;
    }

    return false;
  };

  _proto.onMediaAttached = function onMediaAttached(event, data) {
    var media = this.media = this.mediaBuffer = data.media;
    this.onvseeking = this.onMediaSeeking.bind(this);
    this.onvended = this.onMediaEnded.bind(this);
    media.addEventListener('seeking', this.onvseeking);
    media.addEventListener('ended', this.onvended);
    var config = this.config;

    if (this.levels && config.autoStartLoad && this.state === State.STOPPED) {
      this.startLoad(config.startPosition);
    }
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    var media = this.media;

    if (media !== null && media !== void 0 && media.ended) {
      this.log('MSE detaching and video ended, reset startPosition');
      this.startPosition = this.lastCurrentTime = 0;
    } // remove video listeners


    if (media) {
      media.removeEventListener('seeking', this.onvseeking);
      media.removeEventListener('ended', this.onvended);
      this.onvseeking = this.onvended = null;
    }

    this.media = this.mediaBuffer = null;
    this.loadedmetadata = false;
    this.fragmentTracker.removeAllFragments();
    this.stopLoad();
  };

  _proto.onMediaSeeking = function onMediaSeeking() {
    var config = this.config,
        fragCurrent = this.fragCurrent,
        media = this.media,
        mediaBuffer = this.mediaBuffer,
        state = this.state;
    var currentTime = media ? media.currentTime : 0;
    var bufferInfo = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].bufferInfo(mediaBuffer || media, currentTime, config.maxBufferHole);
    this.log("media seeking to " + (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(currentTime) ? currentTime.toFixed(3) : currentTime) + ", state: " + state);

    if (state === State.ENDED) {
      this.resetLoadingState();
    } else if (fragCurrent && !bufferInfo.len) {
      // check if we are seeking to a unbuffered area AND if frag loading is in progress
      var tolerance = config.maxFragLookUpTolerance;
      var fragStartOffset = fragCurrent.start - tolerance;
      var fragEndOffset = fragCurrent.start + fragCurrent.duration + tolerance;
      var pastFragment = currentTime > fragEndOffset; // check if the seek position is past current fragment, and if so abort loading

      if (currentTime < fragStartOffset || pastFragment) {
        if (pastFragment && fragCurrent.loader) {
          this.log('seeking outside of buffer while fragment load in progress, cancel fragment load');
          fragCurrent.loader.abort();
        }

        this.resetLoadingState();
      }
    }

    if (media) {
      this.lastCurrentTime = currentTime;
    } // in case seeking occurs although no media buffered, adjust startPosition and nextLoadPosition to seek target


    if (!this.loadedmetadata && !bufferInfo.len) {
      this.nextLoadPosition = this.startPosition = currentTime;
    } // Async tick to speed up processing


    this.tickImmediate();
  };

  _proto.onMediaEnded = function onMediaEnded() {
    // reset startPosition and lastCurrentTime to restart playback @ stream beginning
    this.startPosition = this.lastCurrentTime = 0;
  };

  _proto.onKeyLoaded = function onKeyLoaded(event, data) {
    if (this.state !== State.KEY_LOADING || data.frag !== this.fragCurrent || !this.levels) {
      return;
    }

    this.state = State.IDLE;
    var levelDetails = this.levels[data.frag.level].details;

    if (levelDetails) {
      this.loadFragment(data.frag, levelDetails, data.frag.start);
    }
  };

  _proto.onHandlerDestroying = function onHandlerDestroying() {
    this.stopLoad();

    _TaskLoop.prototype.onHandlerDestroying.call(this);
  };

  _proto.onHandlerDestroyed = function onHandlerDestroyed() {
    this.state = State.STOPPED;
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].KEY_LOADED, this.onKeyLoaded, this);

    if (this.fragmentLoader) {
      this.fragmentLoader.destroy();
    }

    if (this.decrypter) {
      this.decrypter.destroy();
    }

    this.hls = this.log = this.warn = this.decrypter = this.fragmentLoader = this.fragmentTracker = null;

    _TaskLoop.prototype.onHandlerDestroyed.call(this);
  };

  _proto.loadKey = function loadKey(frag, details) {
    this.log("Loading key for " + frag.sn + " of [" + details.startSN + "-" + details.endSN + "], " + (this.logPrefix === '[stream-controller]' ? 'level' : 'track') + " " + frag.level);
    this.state = State.KEY_LOADING;
    this.fragCurrent = frag;
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].KEY_LOADING, {
      frag: frag
    });
  };

  _proto.loadFragment = function loadFragment(frag, levelDetails, targetBufferTime) {
    this._loadFragForPlayback(frag, levelDetails, targetBufferTime);
  };

  _proto._loadFragForPlayback = function _loadFragForPlayback(frag, levelDetails, targetBufferTime) {
    var _this2 = this;

    var progressCallback = function progressCallback(data) {
      if (_this2.fragContextChanged(frag)) {
        _this2.warn("Fragment " + frag.sn + (data.part ? ' p: ' + data.part.index : '') + " of level " + frag.level + " was dropped during download.");

        _this2.fragmentTracker.removeFragment(frag);

        return;
      }

      frag.stats.chunkCount++;

      _this2._handleFragmentLoadProgress(data);
    };

    this._doFragLoad(frag, levelDetails, targetBufferTime, progressCallback).then(function (data) {
      if (!data) {
        // if we're here we probably needed to backtrack or are waiting for more parts
        return;
      }

      _this2.fragLoadError = 0;
      var state = _this2.state;

      if (_this2.fragContextChanged(frag)) {
        if (state === State.FRAG_LOADING || state === State.BACKTRACKING || !_this2.fragCurrent && state === State.PARSING) {
          _this2.fragmentTracker.removeFragment(frag);

          _this2.state = State.IDLE;
        }

        return;
      }

      if ('payload' in data) {
        _this2.log("Loaded fragment " + frag.sn + " of level " + frag.level);

        _this2.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].FRAG_LOADED, data); // Tracker backtrack must be called after onFragLoaded to update the fragment entity state to BACKTRACKED
        // This happens after handleTransmuxComplete when the worker or progressive is disabled


        if (_this2.state === State.BACKTRACKING) {
          _this2.fragmentTracker.backtrack(frag, data);

          _this2.resetFragmentLoading(frag);

          return;
        }
      } // Pass through the whole payload; controllers not implementing progressive loading receive data from this callback


      _this2._handleFragmentLoadComplete(data);
    }).catch(function (reason) {
      _this2.warn(reason);

      _this2.resetFragmentLoading(frag);
    });
  };

  _proto.flushMainBuffer = function flushMainBuffer(startOffset, endOffset, type) {
    if (type === void 0) {
      type = null;
    }

    if (!(startOffset - endOffset)) {
      return;
    } // When alternate audio is playing, the audio-stream-controller is responsible for the audio buffer. Otherwise,
    // passing a null type flushes both buffers


    var flushScope = {
      startOffset: startOffset,
      endOffset: endOffset,
      type: type
    }; // Reset load errors on flush

    this.fragLoadError = 0;
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].BUFFER_FLUSHING, flushScope);
  };

  _proto._loadInitSegment = function _loadInitSegment(frag) {
    var _this3 = this;

    this._doFragLoad(frag).then(function (data) {
      if (!data || _this3.fragContextChanged(frag) || !_this3.levels) {
        throw new Error('init load aborted');
      }

      return data;
    }).then(function (data) {
      var hls = _this3.hls;
      var payload = data.payload;
      var decryptData = frag.decryptdata; // check to see if the payload needs to be decrypted

      if (payload && payload.byteLength > 0 && decryptData && decryptData.key && decryptData.iv && decryptData.method === 'AES-128') {
        var startTime = self.performance.now(); // decrypt the subtitles

        return _this3.decrypter.webCryptoDecrypt(new Uint8Array(payload), decryptData.key.buffer, decryptData.iv.buffer).then(function (decryptedData) {
          var endTime = self.performance.now();
          hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].FRAG_DECRYPTED, {
            frag: frag,
            payload: decryptedData,
            stats: {
              tstart: startTime,
              tdecrypt: endTime
            }
          });
          data.payload = decryptedData;
          return data;
        });
      }

      return data;
    }).then(function (data) {
      var fragCurrent = _this3.fragCurrent,
          hls = _this3.hls,
          levels = _this3.levels;

      if (!levels) {
        throw new Error('init load aborted, missing levels');
      }

      var details = levels[frag.level].details;
      console.assert(details, 'Level details are defined when init segment is loaded');
      var stats = frag.stats;
      _this3.state = State.IDLE;
      _this3.fragLoadError = 0;
      frag.data = new Uint8Array(data.payload);
      stats.parsing.start = stats.buffering.start = self.performance.now();
      stats.parsing.end = stats.buffering.end = self.performance.now(); // Silence FRAG_BUFFERED event if fragCurrent is null

      if (data.frag === fragCurrent) {
        hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].FRAG_BUFFERED, {
          stats: stats,
          frag: fragCurrent,
          part: null,
          id: frag.type
        });
      }

      _this3.tick();
    }).catch(function (reason) {
      _this3.warn(reason);

      _this3.resetFragmentLoading(frag);
    });
  };

  _proto.fragContextChanged = function fragContextChanged(frag) {
    var fragCurrent = this.fragCurrent;
    return !frag || !fragCurrent || frag.level !== fragCurrent.level || frag.sn !== fragCurrent.sn || frag.urlId !== fragCurrent.urlId;
  };

  _proto.fragBufferedComplete = function fragBufferedComplete(frag, part) {
    var media = this.mediaBuffer ? this.mediaBuffer : this.media;
    this.log("Buffered " + frag.type + " sn: " + frag.sn + (part ? ' part: ' + part.index : '') + " of " + (this.logPrefix === '[stream-controller]' ? 'level' : 'track') + " " + frag.level + " " + _utils_time_ranges__WEBPACK_IMPORTED_MODULE_14__["default"].toString(_utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].getBuffered(media)));
    this.state = State.IDLE;
    this.tick();
  };

  _proto._handleFragmentLoadComplete = function _handleFragmentLoadComplete(fragLoadedEndData) {
    var transmuxer = this.transmuxer;

    if (!transmuxer) {
      return;
    }

    var frag = fragLoadedEndData.frag,
        part = fragLoadedEndData.part,
        partsLoaded = fragLoadedEndData.partsLoaded; // If we did not load parts, or loaded all parts, we have complete (not partial) fragment data

    var complete = !partsLoaded || partsLoaded.length === 0 || partsLoaded.some(function (fragLoaded) {
      return !fragLoaded;
    });
    var chunkMeta = new _types_transmuxer__WEBPACK_IMPORTED_MODULE_7__["ChunkMetadata"](frag.level, frag.sn, frag.stats.chunkCount + 1, 0, part ? part.index : -1, !complete);
    transmuxer.flush(chunkMeta);
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;

  _proto._handleFragmentLoadProgress = function _handleFragmentLoadProgress(frag) {};

  _proto._doFragLoad = function _doFragLoad(frag, details, targetBufferTime, progressCallback) {
    var _this4 = this;

    if (targetBufferTime === void 0) {
      targetBufferTime = null;
    }

    if (!this.levels) {
      throw new Error('frag load aborted, missing levels');
    }

    targetBufferTime = Math.max(frag.start, targetBufferTime || 0);

    if (this.config.lowLatencyMode && details) {
      var partList = details.partList;

      if (partList && progressCallback) {
        if (targetBufferTime > frag.end && details.fragmentHint) {
          frag = details.fragmentHint;
        }

        var partIndex = this.getNextPart(partList, frag, targetBufferTime);

        if (partIndex > -1) {
          var part = partList[partIndex];
          this.log("Loading part sn: " + frag.sn + " p: " + part.index + " cc: " + frag.cc + " of playlist [" + details.startSN + "-" + details.endSN + "] parts [0-" + partIndex + "-" + (partList.length - 1) + "] " + (this.logPrefix === '[stream-controller]' ? 'level' : 'track') + ": " + frag.level + ", target: " + parseFloat(targetBufferTime.toFixed(3)));
          this.nextLoadPosition = part.start + part.duration;
          this.state = State.FRAG_LOADING;
          this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].FRAG_LOADING, {
            frag: frag,
            part: partList[partIndex],
            targetBufferTime: targetBufferTime
          });
          return this.doFragPartsLoad(frag, partList, partIndex, progressCallback).catch(function (error) {
            return _this4.handleFragLoadError(error);
          });
        } else if (!frag.url || this.loadedEndOfParts(partList, targetBufferTime)) {
          // Fragment hint has no parts
          return Promise.resolve(null);
        }
      }
    }

    this.log("Loading fragment " + frag.sn + " cc: " + frag.cc + " " + (details ? 'of [' + details.startSN + '-' + details.endSN + '] ' : '') + (this.logPrefix === '[stream-controller]' ? 'level' : 'track') + ": " + frag.level + ", target: " + parseFloat(targetBufferTime.toFixed(3))); // Don't update nextLoadPosition for fragments which are not buffered

    if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(frag.sn) && !this.bitrateTest) {
      this.nextLoadPosition = frag.start + frag.duration;
    }

    this.state = State.FRAG_LOADING;
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].FRAG_LOADING, {
      frag: frag,
      targetBufferTime: targetBufferTime
    });
    return this.fragmentLoader.load(frag, progressCallback).catch(function (error) {
      return _this4.handleFragLoadError(error);
    });
  };

  _proto.doFragPartsLoad = function doFragPartsLoad(frag, partList, partIndex, progressCallback) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      var partsLoaded = [];

      var loadPartIndex = function loadPartIndex(index) {
        var part = partList[index];

        _this5.fragmentLoader.loadPart(frag, part, progressCallback).then(function (partLoadedData) {
          partsLoaded[part.index] = partLoadedData;
          var loadedPart = partLoadedData.part;

          _this5.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].FRAG_LOADED, partLoadedData);

          var nextPart = partList[index + 1];

          if (nextPart && nextPart.fragment === frag) {
            loadPartIndex(index + 1);
          } else {
            return resolve({
              frag: frag,
              part: loadedPart,
              partsLoaded: partsLoaded
            });
          }
        }).catch(reject);
      };

      loadPartIndex(partIndex);
    });
  };

  _proto.handleFragLoadError = function handleFragLoadError(_ref) {
    var data = _ref.data;

    if (data && data.details === _errors__WEBPACK_IMPORTED_MODULE_6__["ErrorDetails"].INTERNAL_ABORTED) {
      this.handleFragLoadAborted(data.frag, data.part);
    } else {
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].ERROR, data);
    }

    return null;
  };

  _proto._handleTransmuxerFlush = function _handleTransmuxerFlush(chunkMeta) {
    var context = this.getCurrentContext(chunkMeta);

    if (!context || this.state !== State.PARSING) {
      if (!this.fragCurrent) {
        this.state = State.IDLE;
      }

      return;
    }

    var frag = context.frag,
        part = context.part,
        level = context.level;
    var now = self.performance.now();
    frag.stats.parsing.end = now;

    if (part) {
      part.stats.parsing.end = now;
    }

    this.updateLevelTiming(frag, part, level, chunkMeta.partial);
  };

  _proto.getCurrentContext = function getCurrentContext(chunkMeta) {
    var levels = this.levels;
    var levelIndex = chunkMeta.level,
        sn = chunkMeta.sn,
        partIndex = chunkMeta.part;

    if (!levels || !levels[levelIndex]) {
      this.warn("Levels object was unset while buffering fragment " + sn + " of level " + levelIndex + ". The current chunk will not be buffered.");
      return null;
    }

    var level = levels[levelIndex];
    var part = partIndex > -1 ? Object(_level_helper__WEBPACK_IMPORTED_MODULE_11__["getPartWith"])(level, sn, partIndex) : null;
    var frag = part ? part.fragment : Object(_level_helper__WEBPACK_IMPORTED_MODULE_11__["getFragmentWithSN"])(level, sn, this.fragCurrent);

    if (!frag) {
      return null;
    }

    return {
      frag: frag,
      part: part,
      level: level
    };
  };

  _proto.bufferFragmentData = function bufferFragmentData(data, frag, part, chunkMeta) {
    if (!data || this.state !== State.PARSING) {
      return;
    }

    var data1 = data.data1,
        data2 = data.data2;
    var buffer = data1;

    if (data1 && data2) {
      // Combine the moof + mdat so that we buffer with a single append
      buffer = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_8__["appendUint8Array"])(data1, data2);
    }

    if (!buffer || !buffer.length) {
      return;
    }

    var segment = {
      type: data.type,
      frag: frag,
      part: part,
      chunkMeta: chunkMeta,
      parent: frag.type,
      data: buffer
    };
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].BUFFER_APPENDING, segment);

    if (data.dropped && data.independent && !part) {
      // Clear buffer so that we reload previous segments sequentially if required
      this.flushBufferGap(frag);
    }
  };

  _proto.flushBufferGap = function flushBufferGap(frag) {
    var media = this.media;

    if (!media) {
      return;
    } // If currentTime is not buffered, clear the back buffer so that we can backtrack as much as needed


    if (!_utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].isBuffered(media, media.currentTime)) {
      this.flushMainBuffer(0, frag.start);
      return;
    } // Remove back-buffer without interrupting playback to allow back tracking


    var currentTime = media.currentTime;
    var bufferInfo = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].bufferInfo(media, currentTime, 0);
    var fragDuration = frag.duration;
    var segmentFraction = Math.min(this.config.maxFragLookUpTolerance * 2, fragDuration * 0.25);
    var start = Math.max(Math.min(frag.start - segmentFraction, bufferInfo.end - segmentFraction), currentTime + segmentFraction);

    if (frag.start - start > segmentFraction) {
      this.flushMainBuffer(start, frag.start);
    }
  };

  _proto.getFwdBufferInfo = function getFwdBufferInfo(bufferable, type) {
    var config = this.config;
    var pos = this.getLoadPosition();

    if (!Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(pos)) {
      return null;
    }

    var bufferInfo = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].bufferInfo(bufferable, pos, config.maxBufferHole); // Workaround flaw in getting forward buffer when maxBufferHole is smaller than gap at current pos

    if (bufferInfo.len === 0 && bufferInfo.nextStart !== undefined) {
      var bufferedFragAtPos = this.fragmentTracker.getBufferedFrag(pos, type);

      if (bufferedFragAtPos && bufferInfo.nextStart < bufferedFragAtPos.end) {
        return _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].bufferInfo(bufferable, pos, Math.max(bufferInfo.nextStart, config.maxBufferHole));
      }
    }

    return bufferInfo;
  };

  _proto.getMaxBufferLength = function getMaxBufferLength(levelBitrate) {
    var config = this.config;
    var maxBufLen;

    if (levelBitrate) {
      maxBufLen = Math.max(8 * config.maxBufferSize / levelBitrate, config.maxBufferLength);
    } else {
      maxBufLen = config.maxBufferLength;
    }

    return Math.min(maxBufLen, config.maxMaxBufferLength);
  };

  _proto.reduceMaxBufferLength = function reduceMaxBufferLength(threshold) {
    var config = this.config;
    var minLength = threshold || config.maxBufferLength;

    if (config.maxMaxBufferLength >= minLength) {
      // reduce max buffer length as it might be too high. we do this to avoid loop flushing ...
      config.maxMaxBufferLength /= 2;
      this.warn("Reduce max buffer length to " + config.maxMaxBufferLength + "s");
      return true;
    }

    return false;
  };

  _proto.getNextFragment = function getNextFragment(pos, levelDetails) {
    var _frag, _frag2;

    var fragments = levelDetails.fragments;
    var fragLen = fragments.length;

    if (!fragLen) {
      return null;
    } // find fragment index, contiguous with end of buffer position


    var config = this.config;
    var start = fragments[0].start;
    var frag;

    if (levelDetails.live) {
      var initialLiveManifestSize = config.initialLiveManifestSize;

      if (fragLen < initialLiveManifestSize) {
        this.warn("Not enough fragments to start playback (have: " + fragLen + ", need: " + initialLiveManifestSize + ")");
        return null;
      } // The real fragment start times for a live stream are only known after the PTS range for that level is known.
      // In order to discover the range, we load the best matching fragment for that level and demux it.
      // Do not load using live logic if the starting frag is requested - we want to use getFragmentAtPosition() so that
      // we get the fragment matching that start time


      if (!levelDetails.PTSKnown && !this.startFragRequested && this.startPosition === -1) {
        frag = this.getInitialLiveFragment(levelDetails, fragments);
        this.startPosition = frag ? this.hls.liveSyncPosition || frag.start : pos;
      }
    } else if (pos <= start) {
      // VoD playlist: if loadPosition before start of playlist, load first fragment
      frag = fragments[0];
    } // If we haven't run into any special cases already, just load the fragment most closely matching the requested position


    if (!frag) {
      var end = config.lowLatencyMode ? levelDetails.partEnd : levelDetails.fragmentEnd;
      frag = this.getFragmentAtPosition(pos, end, levelDetails);
    } // If an initSegment is present, it must be buffered first


    if ((_frag = frag) !== null && _frag !== void 0 && _frag.initSegment && !((_frag2 = frag) !== null && _frag2 !== void 0 && _frag2.initSegment.data) && !this.bitrateTest) {
      frag = frag.initSegment;
    }

    return frag;
  };

  _proto.getNextPart = function getNextPart(partList, frag, targetBufferTime) {
    var nextPart = -1;
    var contiguous = false;
    var independentAttrOmitted = true;

    for (var i = 0, len = partList.length; i < len; i++) {
      var part = partList[i];
      independentAttrOmitted = independentAttrOmitted && !part.independent;

      if (nextPart > -1 && targetBufferTime < part.start) {
        break;
      }

      var loaded = part.loaded;

      if (!loaded && (contiguous || part.independent || independentAttrOmitted) && part.fragment === frag) {
        nextPart = i;
      }

      contiguous = loaded;
    }

    return nextPart;
  };

  _proto.loadedEndOfParts = function loadedEndOfParts(partList, targetBufferTime) {
    var lastPart = partList[partList.length - 1];
    return lastPart && targetBufferTime > lastPart.start && lastPart.loaded;
  }
  /*
   This method is used find the best matching first fragment for a live playlist. This fragment is used to calculate the
   "sliding" of the playlist, which is its offset from the start of playback. After sliding we can compute the real
   start and end times for each fragment in the playlist (after which this method will not need to be called).
  */
  ;

  _proto.getInitialLiveFragment = function getInitialLiveFragment(levelDetails, fragments) {
    var fragPrevious = this.fragPrevious;
    var frag = null;

    if (fragPrevious) {
      if (levelDetails.hasProgramDateTime) {
        // Prefer using PDT, because it can be accurate enough to choose the correct fragment without knowing the level sliding
        this.log("Live playlist, switching playlist, load frag with same PDT: " + fragPrevious.programDateTime);
        frag = Object(_fragment_finders__WEBPACK_IMPORTED_MODULE_10__["findFragmentByPDT"])(fragments, fragPrevious.endProgramDateTime, this.config.maxFragLookUpTolerance);
      }

      if (!frag) {
        // SN does not need to be accurate between renditions, but depending on the packaging it may be so.
        var targetSN = fragPrevious.sn + 1;

        if (targetSN >= levelDetails.startSN && targetSN <= levelDetails.endSN) {
          var fragNext = fragments[targetSN - levelDetails.startSN]; // Ensure that we're staying within the continuity range, since PTS resets upon a new range

          if (fragPrevious.cc === fragNext.cc) {
            frag = fragNext;
            this.log("Live playlist, switching playlist, load frag with next SN: " + frag.sn);
          }
        } // It's important to stay within the continuity range if available; otherwise the fragments in the playlist
        // will have the wrong start times


        if (!frag) {
          frag = Object(_fragment_finders__WEBPACK_IMPORTED_MODULE_10__["findFragWithCC"])(fragments, fragPrevious.cc);

          if (frag) {
            this.log("Live playlist, switching playlist, load frag with same CC: " + frag.sn);
          }
        }
      }
    } else {
      // Find a new start fragment when fragPrevious is null
      var liveStart = this.hls.liveSyncPosition;

      if (liveStart !== null) {
        frag = this.getFragmentAtPosition(liveStart, this.bitrateTest ? levelDetails.fragmentEnd : levelDetails.edge, levelDetails);
      }
    }

    return frag;
  }
  /*
  This method finds the best matching fragment given the provided position.
   */
  ;

  _proto.getFragmentAtPosition = function getFragmentAtPosition(bufferEnd, end, levelDetails) {
    var config = this.config,
        fragPrevious = this.fragPrevious;
    var fragments = levelDetails.fragments,
        endSN = levelDetails.endSN;
    var fragmentHint = levelDetails.fragmentHint;
    var tolerance = config.maxFragLookUpTolerance;
    var loadingParts = !!(config.lowLatencyMode && levelDetails.partList && fragmentHint);

    if (loadingParts && fragmentHint && !this.bitrateTest) {
      // Include incomplete fragment with parts at end
      fragments = fragments.concat(fragmentHint);
      endSN = fragmentHint.sn;
    }

    var frag;

    if (bufferEnd < end) {
      var lookupTolerance = bufferEnd > end - tolerance ? 0 : tolerance; // Remove the tolerance if it would put the bufferEnd past the actual end of stream
      // Uses buffer and sequence number to calculate switch segment (required if using EXT-X-DISCONTINUITY-SEQUENCE)

      frag = Object(_fragment_finders__WEBPACK_IMPORTED_MODULE_10__["findFragmentByPTS"])(fragPrevious, fragments, bufferEnd, lookupTolerance);
    } else {
      // reach end of playlist
      frag = fragments[fragments.length - 1];
    }

    if (frag) {
      var curSNIdx = frag.sn - levelDetails.startSN;
      var sameLevel = fragPrevious && frag.level === fragPrevious.level;
      var nextFrag = fragments[curSNIdx + 1];
      var fragState = this.fragmentTracker.getState(frag);

      if (fragState === _fragment_tracker__WEBPACK_IMPORTED_MODULE_2__["FragmentState"].BACKTRACKED) {
        frag = null;
        var i = curSNIdx;

        while (fragments[i] && this.fragmentTracker.getState(fragments[i]) === _fragment_tracker__WEBPACK_IMPORTED_MODULE_2__["FragmentState"].BACKTRACKED) {
          // When fragPrevious is null, backtrack to first the first fragment is not BACKTRACKED for loading
          // When fragPrevious is set, we want the first BACKTRACKED fragment for parsing and buffering
          if (!fragPrevious) {
            frag = fragments[--i];
          } else {
            frag = fragments[i--];
          }
        }

        if (!frag) {
          frag = nextFrag;
        }
      } else if (fragPrevious && frag.sn === fragPrevious.sn && !loadingParts) {
        // Force the next fragment to load if the previous one was already selected. This can occasionally happen with
        // non-uniform fragment durations
        if (sameLevel) {
          if (frag.sn < endSN && this.fragmentTracker.getState(nextFrag) !== _fragment_tracker__WEBPACK_IMPORTED_MODULE_2__["FragmentState"].OK) {
            this.log("SN " + frag.sn + " just loaded, load next one: " + nextFrag.sn);
            frag = nextFrag;
          } else {
            frag = null;
          }
        }
      }
    }

    return frag;
  };

  _proto.synchronizeToLiveEdge = function synchronizeToLiveEdge(levelDetails) {
    var config = this.config,
        media = this.media;

    if (!media) {
      return;
    }

    var liveSyncPosition = this.hls.liveSyncPosition;
    var currentTime = media.currentTime;
    var start = levelDetails.fragments[0].start;
    var end = levelDetails.edge;
    var withinSlidingWindow = currentTime >= start - config.maxFragLookUpTolerance && currentTime <= end; // Continue if we can seek forward to sync position or if current time is outside of sliding window

    if (liveSyncPosition !== null && media.duration > liveSyncPosition && (currentTime < liveSyncPosition || !withinSlidingWindow)) {
      // Continue if buffer is starving or if current time is behind max latency
      var maxLatency = config.liveMaxLatencyDuration !== undefined ? config.liveMaxLatencyDuration : config.liveMaxLatencyDurationCount * levelDetails.targetduration;

      if (!withinSlidingWindow && media.readyState < 4 || currentTime < end - maxLatency) {
        if (!this.loadedmetadata) {
          this.nextLoadPosition = liveSyncPosition;
        } // Only seek if ready and there is not a significant forward buffer available for playback


        if (media.readyState) {
          this.warn("Playback: " + currentTime.toFixed(3) + " is located too far from the end of live sliding playlist: " + end + ", reset currentTime to : " + liveSyncPosition.toFixed(3));
          media.currentTime = liveSyncPosition;
        }
      }
    }
  };

  _proto.alignPlaylists = function alignPlaylists(details, previousDetails) {
    var levels = this.levels,
        levelLastLoaded = this.levelLastLoaded,
        fragPrevious = this.fragPrevious;
    var lastLevel = levelLastLoaded !== null ? levels[levelLastLoaded] : null; // FIXME: If not for `shouldAlignOnDiscontinuities` requiring fragPrevious.cc,
    //  this could all go in level-helper mergeDetails()

    var length = details.fragments.length;

    if (!length) {
      this.warn("No fragments in live playlist");
      return 0;
    }

    var slidingStart = details.fragments[0].start;
    var firstLevelLoad = !previousDetails;

    var aligned = details.alignedSliding && Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(slidingStart);

    if (firstLevelLoad || !aligned && !slidingStart) {
      Object(_utils_discontinuities__WEBPACK_IMPORTED_MODULE_9__["alignStream"])(fragPrevious, lastLevel, details);
      var alignedSlidingStart = details.fragments[0].start;
      this.log("Live playlist sliding: " + alignedSlidingStart.toFixed(2) + " start-sn: " + (previousDetails ? previousDetails.startSN : 'na') + "->" + details.startSN + " prev-sn: " + (fragPrevious ? fragPrevious.sn : 'na') + " fragments: " + length);
      return alignedSlidingStart;
    }

    return slidingStart;
  };

  _proto.waitForCdnTuneIn = function waitForCdnTuneIn(details) {
    // Wait for Low-Latency CDN Tune-in to get an updated playlist
    var advancePartLimit = 3;
    return details.live && details.canBlockReload && details.tuneInGoal > Math.max(details.partHoldBack, details.partTarget * advancePartLimit);
  };

  _proto.setStartPosition = function setStartPosition(details, sliding) {
    // compute start position if set to -1. use it straight away if value is defined
    var startPosition = this.startPosition;

    if (startPosition < sliding) {
      startPosition = -1;
    }

    if (startPosition === -1 || this.lastCurrentTime === -1) {
      // first, check if start time offset has been set in playlist, if yes, use this value
      var startTimeOffset = details.startTimeOffset;

      if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(startTimeOffset)) {
        startPosition = sliding + startTimeOffset;

        if (startTimeOffset < 0) {
          startPosition += details.totalduration;
        }

        startPosition = Math.min(Math.max(sliding, startPosition), sliding + details.totalduration);
        this.log("Start time offset " + startTimeOffset + " found in playlist, adjust startPosition to " + startPosition);
        this.startPosition = startPosition;
      } else if (details.live) {
        // Leave this.startPosition at -1, so that we can use `getInitialLiveFragment` logic when startPosition has
        // not been specified via the config or an as an argument to startLoad (#3736).
        startPosition = this.hls.liveSyncPosition || sliding;
      } else {
        this.startPosition = startPosition = 0;
      }

      this.lastCurrentTime = startPosition;
    }

    this.nextLoadPosition = startPosition;
  };

  _proto.getLoadPosition = function getLoadPosition() {
    var media = this.media; // if we have not yet loaded any fragment, start loading from start position

    var pos = 0;

    if (this.loadedmetadata && media) {
      pos = media.currentTime;
    } else if (this.nextLoadPosition) {
      pos = this.nextLoadPosition;
    }

    return pos;
  };

  _proto.handleFragLoadAborted = function handleFragLoadAborted(frag, part) {
    if (this.transmuxer && frag.sn !== 'initSegment' && frag.stats.aborted) {
      this.warn("Fragment " + frag.sn + (part ? ' part' + part.index : '') + " of level " + frag.level + " was aborted");
      this.resetFragmentLoading(frag);
    }
  };

  _proto.resetFragmentLoading = function resetFragmentLoading(frag) {
    if (!this.fragCurrent || !this.fragContextChanged(frag)) {
      this.state = State.IDLE;
    }
  };

  _proto.onFragmentOrKeyLoadError = function onFragmentOrKeyLoadError(filterType, data) {
    if (data.fatal) {
      return;
    }

    var frag = data.frag; // Handle frag error related to caller's filterType

    if (!frag || frag.type !== filterType) {
      return;
    }

    var fragCurrent = this.fragCurrent;
    console.assert(fragCurrent && frag.sn === fragCurrent.sn && frag.level === fragCurrent.level && frag.urlId === fragCurrent.urlId, 'Frag load error must match current frag to retry');
    var config = this.config; // keep retrying until the limit will be reached

    if (this.fragLoadError + 1 <= config.fragLoadingMaxRetry) {
      if (this.resetLiveStartWhenNotLoaded(frag.level)) {
        return;
      } // exponential backoff capped to config.fragLoadingMaxRetryTimeout


      var delay = Math.min(Math.pow(2, this.fragLoadError) * config.fragLoadingRetryDelay, config.fragLoadingMaxRetryTimeout);
      this.warn("Fragment " + frag.sn + " of " + filterType + " " + frag.level + " failed to load, retrying in " + delay + "ms");
      this.retryDate = self.performance.now() + delay;
      this.fragLoadError++;
      this.state = State.FRAG_LOADING_WAITING_RETRY;
    } else if (data.levelRetry) {
      if (filterType === _types_loader__WEBPACK_IMPORTED_MODULE_15__["PlaylistLevelType"].AUDIO) {
        // Reset current fragment since audio track audio is essential and may not have a fail-over track
        this.fragCurrent = null;
      } // Fragment errors that result in a level switch or redundant fail-over
      // should reset the stream controller state to idle


      this.fragLoadError = 0;
      this.state = State.IDLE;
    } else {
      _utils_logger__WEBPACK_IMPORTED_MODULE_4__["logger"].error(data.details + " reaches max retry, redispatch as fatal ..."); // switch error to fatal

      data.fatal = true;
      this.hls.stopLoad();
      this.state = State.ERROR;
    }
  };

  _proto.afterBufferFlushed = function afterBufferFlushed(media, bufferType, playlistType) {
    if (!media) {
      return;
    } // After successful buffer flushing, filter flushed fragments from bufferedFrags use mediaBuffered instead of media
    // (so that we will check against video.buffered ranges in case of alt audio track)


    var bufferedTimeRanges = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_3__["BufferHelper"].getBuffered(media);
    this.fragmentTracker.detectEvictedFragments(bufferType, bufferedTimeRanges, playlistType);

    if (this.state === State.ENDED) {
      this.resetLoadingState();
    }
  };

  _proto.resetLoadingState = function resetLoadingState() {
    this.fragCurrent = null;
    this.fragPrevious = null;
    this.state = State.IDLE;
  };

  _proto.resetLiveStartWhenNotLoaded = function resetLiveStartWhenNotLoaded(level) {
    // if loadedmetadata is not set, it means that we are emergency switch down on first frag
    // in that case, reset startFragRequested flag
    if (!this.loadedmetadata) {
      this.startFragRequested = false;
      var details = this.levels ? this.levels[level].details : null;

      if (details !== null && details !== void 0 && details.live) {
        // We can't afford to retry after a delay in a live scenario. Update the start position and return to IDLE.
        this.startPosition = -1;
        this.setStartPosition(details, 0);
        this.resetLoadingState();
        return true;
      }

      this.nextLoadPosition = this.startPosition;
    }

    return false;
  };

  _proto.updateLevelTiming = function updateLevelTiming(frag, part, level, partial) {
    var _this6 = this;

    var details = level.details;
    console.assert(!!details, 'level.details must be defined');
    var parsed = Object.keys(frag.elementaryStreams).reduce(function (result, type) {
      var info = frag.elementaryStreams[type];

      if (info) {
        var parsedDuration = info.endPTS - info.startPTS;

        if (parsedDuration <= 0) {
          // Destroy the transmuxer after it's next time offset failed to advance because duration was <= 0.
          // The new transmuxer will be configured with a time offset matching the next fragment start,
          // preventing the timeline from shifting.
          _this6.warn("Could not parse fragment " + frag.sn + " " + type + " duration reliably (" + parsedDuration + ") resetting transmuxer to fallback to playlist timing");

          _this6.resetTransmuxer();

          return result || false;
        }

        var drift = partial ? 0 : Object(_level_helper__WEBPACK_IMPORTED_MODULE_11__["updateFragPTSDTS"])(details, frag, info.startPTS, info.endPTS, info.startDTS, info.endDTS);

        _this6.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].LEVEL_PTS_UPDATED, {
          details: details,
          level: level,
          drift: drift,
          type: type,
          frag: frag,
          start: info.startPTS,
          end: info.endPTS
        });

        return true;
      }

      return result;
    }, false);

    if (parsed) {
      this.state = State.PARSED;
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].FRAG_PARSED, {
        frag: frag,
        part: part
      });
    } else {
      this.resetLoadingState();
    }
  };

  _proto.resetTransmuxer = function resetTransmuxer() {
    if (this.transmuxer) {
      this.transmuxer.destroy();
      this.transmuxer = null;
    }
  };

  _createClass(BaseStreamController, [{
    key: "state",
    get: function get() {
      return this._state;
    },
    set: function set(nextState) {
      var previousState = this._state;

      if (previousState !== nextState) {
        this._state = nextState;
        this.log(previousState + "->" + nextState);
      }
    }
  }]);

  return BaseStreamController;
}(_task_loop__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/controller/buffer-controller.ts":
/*!*********************************************!*\
  !*** ./src/controller/buffer-controller.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BufferController; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/buffer-helper */ "./src/utils/buffer-helper.ts");
/* harmony import */ var _utils_mediasource_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/mediasource-helper */ "./src/utils/mediasource-helper.ts");
/* harmony import */ var _loader_fragment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../loader/fragment */ "./src/loader/fragment.ts");
/* harmony import */ var _buffer_operation_queue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./buffer-operation-queue */ "./src/controller/buffer-operation-queue.ts");












var MediaSource = Object(_utils_mediasource_helper__WEBPACK_IMPORTED_MODULE_5__["getMediaSource"])();
var VIDEO_CODEC_PROFILE_REPACE = /([ha]vc.)(?:\.[^.,]+)+/;

var BufferController = /*#__PURE__*/function () {
  // The level details used to determine duration, target-duration and live
  // cache the self generated object url to detect hijack of video tag
  // A queue of buffer operations which require the SourceBuffer to not be updating upon execution
  // References to event listeners for each SourceBuffer, so that they can be referenced for event removal
  // The number of BUFFER_CODEC events received before any sourceBuffers are created
  // The total number of BUFFER_CODEC events received
  // A reference to the attached media element
  // A reference to the active media source
  // counters
  function BufferController(_hls) {
    var _this = this;

    this.details = null;
    this._objectUrl = null;
    this.operationQueue = void 0;
    this.listeners = void 0;
    this.hls = void 0;
    this.bufferCodecEventsExpected = 0;
    this._bufferCodecEventsTotal = 0;
    this.media = null;
    this.mediaSource = null;
    this.appendError = 0;
    this.tracks = {};
    this.pendingTracks = {};
    this.sourceBuffer = void 0;

    this._onMediaSourceOpen = function () {
      var hls = _this.hls,
          media = _this.media,
          mediaSource = _this.mediaSource;
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('[buffer-controller]: Media source opened');

      if (media) {
        _this.updateMediaElementDuration();

        hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_ATTACHED, {
          media: media
        });
      }

      if (mediaSource) {
        // once received, don't listen anymore to sourceopen event
        mediaSource.removeEventListener('sourceopen', _this._onMediaSourceOpen);
      }

      _this.checkPendingTracks();
    };

    this._onMediaSourceClose = function () {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('[buffer-controller]: Media source closed');
    };

    this._onMediaSourceEnded = function () {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('[buffer-controller]: Media source ended');
    };

    this.hls = _hls;

    this._initSourceBuffer();

    this.registerListeners();
  }

  var _proto = BufferController.prototype;

  _proto.hasSourceTypes = function hasSourceTypes() {
    return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0;
  };

  _proto.destroy = function destroy() {
    this.unregisterListeners();
    this.details = null;
  };

  _proto.registerListeners = function registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_ATTACHING, this.onMediaAttaching, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_PARSED, this.onManifestParsed, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_RESET, this.onBufferReset, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_APPENDING, this.onBufferAppending, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_CODECS, this.onBufferCodecs, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_EOS, this.onBufferEos, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_FLUSHING, this.onBufferFlushing, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_UPDATED, this.onLevelUpdated, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_PARSED, this.onFragParsed, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_CHANGED, this.onFragChanged, this);
  };

  _proto.unregisterListeners = function unregisterListeners() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_ATTACHING, this.onMediaAttaching, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_PARSED, this.onManifestParsed, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_RESET, this.onBufferReset, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_APPENDING, this.onBufferAppending, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_CODECS, this.onBufferCodecs, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_EOS, this.onBufferEos, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_FLUSHING, this.onBufferFlushing, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_UPDATED, this.onLevelUpdated, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_PARSED, this.onFragParsed, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_CHANGED, this.onFragChanged, this);
  };

  _proto._initSourceBuffer = function _initSourceBuffer() {
    this.sourceBuffer = {};
    this.operationQueue = new _buffer_operation_queue__WEBPACK_IMPORTED_MODULE_7__["default"](this.sourceBuffer);
    this.listeners = {
      audio: [],
      video: [],
      audiovideo: []
    };
  };

  _proto.onManifestParsed = function onManifestParsed(event, data) {
    // in case of alt audio 2 BUFFER_CODECS events will be triggered, one per stream controller
    // sourcebuffers will be created all at once when the expected nb of tracks will be reached
    // in case alt audio is not used, only one BUFFER_CODEC event will be fired from main stream controller
    // it will contain the expected nb of source buffers, no need to compute it
    var codecEvents = 2;

    if (data.audio && !data.video || !data.altAudio) {
      codecEvents = 1;
    }

    this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = codecEvents;
    this.details = null;
    _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected");
  };

  _proto.onMediaAttaching = function onMediaAttaching(event, data) {
    var media = this.media = data.media;

    if (media && MediaSource) {
      var ms = this.mediaSource = new MediaSource(); // MediaSource listeners are arrow functions with a lexical scope, and do not need to be bound

      ms.addEventListener('sourceopen', this._onMediaSourceOpen);
      ms.addEventListener('sourceended', this._onMediaSourceEnded);
      ms.addEventListener('sourceclose', this._onMediaSourceClose); // link video and media Source

      media.src = self.URL.createObjectURL(ms); // cache the locally generated object url

      this._objectUrl = media.src;
    }
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    var media = this.media,
        mediaSource = this.mediaSource,
        _objectUrl = this._objectUrl;

    if (mediaSource) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('[buffer-controller]: media source detaching');

      if (mediaSource.readyState === 'open') {
        try {
          // endOfStream could trigger exception if any sourcebuffer is in updating state
          // we don't really care about checking sourcebuffer state here,
          // as we are anyway detaching the MediaSource
          // let's just avoid this exception to propagate
          mediaSource.endOfStream();
        } catch (err) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("[buffer-controller]: onMediaDetaching: " + err.message + " while calling endOfStream");
        }
      } // Clean up the SourceBuffers by invoking onBufferReset


      this.onBufferReset();
      mediaSource.removeEventListener('sourceopen', this._onMediaSourceOpen);
      mediaSource.removeEventListener('sourceended', this._onMediaSourceEnded);
      mediaSource.removeEventListener('sourceclose', this._onMediaSourceClose); // Detach properly the MediaSource from the HTMLMediaElement as
      // suggested in https://github.com/w3c/media-source/issues/53.

      if (media) {
        if (_objectUrl) {
          self.URL.revokeObjectURL(_objectUrl);
        } // clean up video tag src only if it's our own url. some external libraries might
        // hijack the video tag and change its 'src' without destroying the Hls instance first


        if (media.src === _objectUrl) {
          media.removeAttribute('src');
          media.load();
        } else {
          _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn('[buffer-controller]: media.src was changed by a third party - skip cleanup');
        }
      }

      this.mediaSource = null;
      this.media = null;
      this._objectUrl = null;
      this.bufferCodecEventsExpected = this._bufferCodecEventsTotal;
      this.pendingTracks = {};
      this.tracks = {};
    }

    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_DETACHED, undefined);
  };

  _proto.onBufferReset = function onBufferReset() {
    var _this2 = this;

    this.getSourceBufferTypes().forEach(function (type) {
      var sb = _this2.sourceBuffer[type];

      try {
        if (sb) {
          _this2.removeBufferListeners(type);

          if (_this2.mediaSource) {
            _this2.mediaSource.removeSourceBuffer(sb);
          } // Synchronously remove the SB from the map before the next call in order to prevent an async function from
          // accessing it


          _this2.sourceBuffer[type] = undefined;
        }
      } catch (err) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("[buffer-controller]: Failed to reset the " + type + " buffer", err);
      }
    });

    this._initSourceBuffer();
  };

  _proto.onBufferCodecs = function onBufferCodecs(event, data) {
    var _this3 = this;

    var sourceBufferCount = this.getSourceBufferTypes().length;
    Object.keys(data).forEach(function (trackName) {
      if (sourceBufferCount) {
        // check if SourceBuffer codec needs to change
        var track = _this3.tracks[trackName];

        if (track && typeof track.buffer.changeType === 'function') {
          var _data$trackName = data[trackName],
              codec = _data$trackName.codec,
              levelCodec = _data$trackName.levelCodec,
              container = _data$trackName.container;
          var currentCodec = (track.levelCodec || track.codec).replace(VIDEO_CODEC_PROFILE_REPACE, '$1');
          var nextCodec = (levelCodec || codec).replace(VIDEO_CODEC_PROFILE_REPACE, '$1');

          if (currentCodec !== nextCodec) {
            var mimeType = container + ";codecs=" + (levelCodec || codec);

            _this3.appendChangeType(trackName, mimeType);
          }
        }
      } else {
        // if source buffer(s) not created yet, appended buffer tracks in this.pendingTracks
        _this3.pendingTracks[trackName] = data[trackName];
      }
    }); // if sourcebuffers already created, do nothing ...

    if (sourceBufferCount) {
      return;
    }

    this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0);

    if (this.mediaSource && this.mediaSource.readyState === 'open') {
      this.checkPendingTracks();
    }
  };

  _proto.appendChangeType = function appendChangeType(type, mimeType) {
    var _this4 = this;

    var operationQueue = this.operationQueue;
    var operation = {
      execute: function execute() {
        var sb = _this4.sourceBuffer[type];

        if (sb) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log("[buffer-controller]: changing " + type + " sourceBuffer type to " + mimeType);
          sb.changeType(mimeType);
        }

        operationQueue.shiftAndExecuteNext(type);
      },
      onStart: function onStart() {},
      onComplete: function onComplete() {},
      onError: function onError(e) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("[buffer-controller]: Failed to change " + type + " SourceBuffer type", e);
      }
    };
    operationQueue.append(operation, type);
  };

  _proto.onBufferAppending = function onBufferAppending(event, eventData) {
    var _this5 = this;

    var hls = this.hls,
        operationQueue = this.operationQueue,
        tracks = this.tracks;
    var data = eventData.data,
        type = eventData.type,
        frag = eventData.frag,
        part = eventData.part,
        chunkMeta = eventData.chunkMeta;
    var chunkStats = chunkMeta.buffering[type];
    var bufferAppendingStart = self.performance.now();
    chunkStats.start = bufferAppendingStart;
    var fragBuffering = frag.stats.buffering;
    var partBuffering = part ? part.stats.buffering : null;

    if (fragBuffering.start === 0) {
      fragBuffering.start = bufferAppendingStart;
    }

    if (partBuffering && partBuffering.start === 0) {
      partBuffering.start = bufferAppendingStart;
    } // TODO: Only update timestampOffset when audio/mpeg fragment or part is not contiguous with previously appended
    // Adjusting `SourceBuffer.timestampOffset` (desired point in the timeline where the next frames should be appended)
    // in Chrome browser when we detect MPEG audio container and time delta between level PTS and `SourceBuffer.timestampOffset`
    // is greater than 100ms (this is enough to handle seek for VOD or level change for LIVE videos).
    // More info here: https://github.com/video-dev/hls.js/issues/332#issuecomment-257986486


    var audioTrack = tracks.audio;
    var checkTimestampOffset = type === 'audio' && chunkMeta.id === 1 && (audioTrack === null || audioTrack === void 0 ? void 0 : audioTrack.container) === 'audio/mpeg';
    var operation = {
      execute: function execute() {
        chunkStats.executeStart = self.performance.now();

        if (checkTimestampOffset) {
          var sb = _this5.sourceBuffer[type];

          if (sb) {
            var delta = frag.start - sb.timestampOffset;

            if (Math.abs(delta) >= 0.1) {
              _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + frag.start + " (delta: " + delta + ") sn: " + frag.sn + ")");
              sb.timestampOffset = frag.start;
            }
          }
        }

        _this5.appendExecutor(data, type);
      },
      onStart: function onStart() {// logger.debug(`[buffer-controller]: ${type} SourceBuffer updatestart`);
      },
      onComplete: function onComplete() {
        // logger.debug(`[buffer-controller]: ${type} SourceBuffer updateend`);
        var end = self.performance.now();
        chunkStats.executeEnd = chunkStats.end = end;

        if (fragBuffering.first === 0) {
          fragBuffering.first = end;
        }

        if (partBuffering && partBuffering.first === 0) {
          partBuffering.first = end;
        }

        var sourceBuffer = _this5.sourceBuffer;
        var timeRanges = {};

        for (var _type in sourceBuffer) {
          timeRanges[_type] = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__["BufferHelper"].getBuffered(sourceBuffer[_type]);
        }

        _this5.appendError = 0;

        _this5.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_APPENDED, {
          type: type,
          frag: frag,
          part: part,
          chunkMeta: chunkMeta,
          parent: frag.type,
          timeRanges: timeRanges
        });
      },
      onError: function onError(err) {
        // in case any error occured while appending, put back segment in segments table
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].error("[buffer-controller]: Error encountered while trying to append to the " + type + " SourceBuffer", err);
        var event = {
          type: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorTypes"].MEDIA_ERROR,
          parent: frag.type,
          details: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorDetails"].BUFFER_APPEND_ERROR,
          err: err,
          fatal: false
        };

        if (err.code === DOMException.QUOTA_EXCEEDED_ERR) {
          // QuotaExceededError: http://www.w3.org/TR/html5/infrastructure.html#quotaexceedederror
          // let's stop appending any segments, and report BUFFER_FULL_ERROR error
          event.details = _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorDetails"].BUFFER_FULL_ERROR;
        } else {
          _this5.appendError++;
          event.details = _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorDetails"].BUFFER_APPEND_ERROR;
          /* with UHD content, we could get loop of quota exceeded error until
            browser is able to evict some data from sourcebuffer. Retrying can help recover.
          */

          if (_this5.appendError > hls.config.appendErrorMaxRetry) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].error("[buffer-controller]: Failed " + hls.config.appendErrorMaxRetry + " times to append segment in sourceBuffer");
            event.fatal = true;
          }
        }

        hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, event);
      }
    };
    operationQueue.append(operation, type);
  };

  _proto.onBufferFlushing = function onBufferFlushing(event, data) {
    var _this6 = this;

    var operationQueue = this.operationQueue;

    var flushOperation = function flushOperation(type) {
      return {
        execute: _this6.removeExecutor.bind(_this6, type, data.startOffset, data.endOffset),
        onStart: function onStart() {// logger.debug(`[buffer-controller]: Started flushing ${data.startOffset} -> ${data.endOffset} for ${type} Source Buffer`);
        },
        onComplete: function onComplete() {
          // logger.debug(`[buffer-controller]: Finished flushing ${data.startOffset} -> ${data.endOffset} for ${type} Source Buffer`);
          _this6.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_FLUSHED, {
            type: type
          });
        },
        onError: function onError(e) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("[buffer-controller]: Failed to remove from " + type + " SourceBuffer", e);
        }
      };
    };

    if (data.type) {
      operationQueue.append(flushOperation(data.type), data.type);
    } else {
      this.getSourceBufferTypes().forEach(function (type) {
        operationQueue.append(flushOperation(type), type);
      });
    }
  };

  _proto.onFragParsed = function onFragParsed(event, data) {
    var _this7 = this;

    var frag = data.frag,
        part = data.part;
    var buffersAppendedTo = [];
    var elementaryStreams = part ? part.elementaryStreams : frag.elementaryStreams;

    if (elementaryStreams[_loader_fragment__WEBPACK_IMPORTED_MODULE_6__["ElementaryStreamTypes"].AUDIOVIDEO]) {
      buffersAppendedTo.push('audiovideo');
    } else {
      if (elementaryStreams[_loader_fragment__WEBPACK_IMPORTED_MODULE_6__["ElementaryStreamTypes"].AUDIO]) {
        buffersAppendedTo.push('audio');
      }

      if (elementaryStreams[_loader_fragment__WEBPACK_IMPORTED_MODULE_6__["ElementaryStreamTypes"].VIDEO]) {
        buffersAppendedTo.push('video');
      }
    }

    var onUnblocked = function onUnblocked() {
      var now = self.performance.now();
      frag.stats.buffering.end = now;

      if (part) {
        part.stats.buffering.end = now;
      }

      var stats = part ? part.stats : frag.stats;

      _this7.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_BUFFERED, {
        frag: frag,
        part: part,
        stats: stats,
        id: frag.type
      });
    };

    if (buffersAppendedTo.length === 0) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("Fragments must have at least one ElementaryStreamType set. type: " + frag.type + " level: " + frag.level + " sn: " + frag.sn);
    }

    this.blockBuffers(onUnblocked, buffersAppendedTo);
  };

  _proto.onFragChanged = function onFragChanged(event, data) {
    this.flushBackBuffer();
  } // on BUFFER_EOS mark matching sourcebuffer(s) as ended and trigger checkEos()
  // an undefined data.type will mark all buffers as EOS.
  ;

  _proto.onBufferEos = function onBufferEos(event, data) {
    var _this8 = this;

    var ended = this.getSourceBufferTypes().reduce(function (acc, type) {
      var sb = _this8.sourceBuffer[type];

      if (!data.type || data.type === type) {
        if (sb && !sb.ended) {
          sb.ended = true;
          _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log("[buffer-controller]: " + type + " sourceBuffer now EOS");
        }
      }

      return acc && !!(!sb || sb.ended);
    }, true);

    if (ended) {
      this.blockBuffers(function () {
        var mediaSource = _this8.mediaSource;

        if (!mediaSource || mediaSource.readyState !== 'open') {
          return;
        } // Allow this to throw and be caught by the enqueueing function


        mediaSource.endOfStream();
      });
    }
  };

  _proto.onLevelUpdated = function onLevelUpdated(event, _ref) {
    var details = _ref.details;

    if (!details.fragments.length) {
      return;
    }

    this.details = details;

    if (this.getSourceBufferTypes().length) {
      this.blockBuffers(this.updateMediaElementDuration.bind(this));
    } else {
      this.updateMediaElementDuration();
    }
  };

  _proto.flushBackBuffer = function flushBackBuffer() {
    var hls = this.hls,
        details = this.details,
        media = this.media,
        sourceBuffer = this.sourceBuffer;

    if (!media || details === null) {
      return;
    }

    var sourceBufferTypes = this.getSourceBufferTypes();

    if (!sourceBufferTypes.length) {
      return;
    } // Support for deprecated liveBackBufferLength


    var backBufferLength = details.live && hls.config.liveBackBufferLength !== null ? hls.config.liveBackBufferLength : hls.config.backBufferLength;

    if (!Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(backBufferLength) || backBufferLength < 0) {
      return;
    }

    var currentTime = media.currentTime;
    var targetDuration = details.levelTargetDuration;
    var maxBackBufferLength = Math.max(backBufferLength, targetDuration);
    var targetBackBufferPosition = Math.floor(currentTime / targetDuration) * targetDuration - maxBackBufferLength;
    sourceBufferTypes.forEach(function (type) {
      var sb = sourceBuffer[type];

      if (sb) {
        var buffered = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__["BufferHelper"].getBuffered(sb); // when target buffer start exceeds actual buffer start

        if (buffered.length > 0 && targetBackBufferPosition > buffered.start(0)) {
          hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BACK_BUFFER_REACHED, {
            bufferEnd: targetBackBufferPosition
          }); // Support for deprecated event:

          if (details.live) {
            hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LIVE_BACK_BUFFER_REACHED, {
              bufferEnd: targetBackBufferPosition
            });
          }

          hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_FLUSHING, {
            startOffset: 0,
            endOffset: targetBackBufferPosition,
            type: type
          });
        }
      }
    });
  }
  /**
   * Update Media Source duration to current level duration or override to Infinity if configuration parameter
   * 'liveDurationInfinity` is set to `true`
   * More details: https://github.com/video-dev/hls.js/issues/355
   */
  ;

  _proto.updateMediaElementDuration = function updateMediaElementDuration() {
    if (!this.details || !this.media || !this.mediaSource || this.mediaSource.readyState !== 'open') {
      return;
    }

    var details = this.details,
        hls = this.hls,
        media = this.media,
        mediaSource = this.mediaSource;
    var levelDuration = details.fragments[0].start + details.totalduration;
    var mediaDuration = media.duration;
    var msDuration = Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(mediaSource.duration) ? mediaSource.duration : 0;

    if (details.live && hls.config.liveDurationInfinity) {
      // Override duration to Infinity
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('[buffer-controller]: Media Source duration is set to Infinity');
      mediaSource.duration = Infinity;
      this.updateSeekableRange(details);
    } else if (levelDuration > msDuration && levelDuration > mediaDuration || !Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(mediaDuration)) {
      // levelDuration was the last value we set.
      // not using mediaSource.duration as the browser may tweak this value
      // only update Media Source duration if its value increase, this is to avoid
      // flushing already buffered portion when switching between quality level
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log("[buffer-controller]: Updating Media Source duration to " + levelDuration.toFixed(3));
      mediaSource.duration = levelDuration;
    }
  };

  _proto.updateSeekableRange = function updateSeekableRange(levelDetails) {
    var mediaSource = this.mediaSource;
    var fragments = levelDetails.fragments;
    var len = fragments.length;

    if (len && levelDetails.live && mediaSource !== null && mediaSource !== void 0 && mediaSource.setLiveSeekableRange) {
      var start = Math.max(0, fragments[0].start);
      var end = Math.max(start, start + levelDetails.totalduration);
      mediaSource.setLiveSeekableRange(start, end);
    }
  };

  _proto.checkPendingTracks = function checkPendingTracks() {
    var bufferCodecEventsExpected = this.bufferCodecEventsExpected,
        operationQueue = this.operationQueue,
        pendingTracks = this.pendingTracks; // Check if we've received all of the expected bufferCodec events. When none remain, create all the sourceBuffers at once.
    // This is important because the MSE spec allows implementations to throw QuotaExceededErrors if creating new sourceBuffers after
    // data has been appended to existing ones.
    // 2 tracks is the max (one for audio, one for video). If we've reach this max go ahead and create the buffers.

    var pendingTracksCount = Object.keys(pendingTracks).length;

    if (pendingTracksCount && !bufferCodecEventsExpected || pendingTracksCount === 2) {
      // ok, let's create them now !
      this.createSourceBuffers(pendingTracks);
      this.pendingTracks = {}; // append any pending segments now !

      var buffers = this.getSourceBufferTypes();

      if (buffers.length === 0) {
        this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
          type: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorTypes"].MEDIA_ERROR,
          details: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorDetails"].BUFFER_INCOMPATIBLE_CODECS_ERROR,
          fatal: true,
          reason: 'could not create source buffer for media codec(s)'
        });
        return;
      }

      buffers.forEach(function (type) {
        operationQueue.executeNext(type);
      });
    }
  };

  _proto.createSourceBuffers = function createSourceBuffers(tracks) {
    var sourceBuffer = this.sourceBuffer,
        mediaSource = this.mediaSource;

    if (!mediaSource) {
      throw Error('createSourceBuffers called when mediaSource was null');
    }

    var tracksCreated = 0;

    for (var trackName in tracks) {
      if (!sourceBuffer[trackName]) {
        var track = tracks[trackName];

        if (!track) {
          throw Error("source buffer exists for track " + trackName + ", however track does not");
        } // use levelCodec as first priority


        var codec = track.levelCodec || track.codec;
        var mimeType = track.container + ";codecs=" + codec;
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log("[buffer-controller]: creating sourceBuffer(" + mimeType + ")");

        try {
          var sb = sourceBuffer[trackName] = mediaSource.addSourceBuffer(mimeType);
          var sbName = trackName;
          this.addBufferListener(sbName, 'updatestart', this._onSBUpdateStart);
          this.addBufferListener(sbName, 'updateend', this._onSBUpdateEnd);
          this.addBufferListener(sbName, 'error', this._onSBUpdateError);
          this.tracks[trackName] = {
            buffer: sb,
            codec: codec,
            container: track.container,
            levelCodec: track.levelCodec,
            id: track.id
          };
          tracksCreated++;
        } catch (err) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].error("[buffer-controller]: error while trying to add sourceBuffer: " + err.message);
          this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
            type: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorTypes"].MEDIA_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorDetails"].BUFFER_ADD_CODEC_ERROR,
            fatal: false,
            error: err,
            mimeType: mimeType
          });
        }
      }
    }

    if (tracksCreated) {
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].BUFFER_CREATED, {
        tracks: this.tracks
      });
    }
  } // Keep as arrow functions so that we can directly reference these functions directly as event listeners
  ;

  _proto._onSBUpdateStart = function _onSBUpdateStart(type) {
    var operationQueue = this.operationQueue;
    var operation = operationQueue.current(type);
    operation.onStart();
  };

  _proto._onSBUpdateEnd = function _onSBUpdateEnd(type) {
    var operationQueue = this.operationQueue;
    var operation = operationQueue.current(type);
    operation.onComplete();
    operationQueue.shiftAndExecuteNext(type);
  };

  _proto._onSBUpdateError = function _onSBUpdateError(type, event) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].error("[buffer-controller]: " + type + " SourceBuffer error", event); // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
    // SourceBuffer errors are not necessarily fatal; if so, the HTMLMediaElement will fire an error event

    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
      type: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorTypes"].MEDIA_ERROR,
      details: _errors__WEBPACK_IMPORTED_MODULE_3__["ErrorDetails"].BUFFER_APPENDING_ERROR,
      fatal: false
    }); // updateend is always fired after error, so we'll allow that to shift the current operation off of the queue

    var operation = this.operationQueue.current(type);

    if (operation) {
      operation.onError(event);
    }
  } // This method must result in an updateend event; if remove is not called, _onSBUpdateEnd must be called manually
  ;

  _proto.removeExecutor = function removeExecutor(type, startOffset, endOffset) {
    var media = this.media,
        mediaSource = this.mediaSource,
        operationQueue = this.operationQueue,
        sourceBuffer = this.sourceBuffer;
    var sb = sourceBuffer[type];

    if (!media || !mediaSource || !sb) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("[buffer-controller]: Attempting to remove from the " + type + " SourceBuffer, but it does not exist");
      operationQueue.shiftAndExecuteNext(type);
      return;
    }

    var mediaDuration = Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(media.duration) ? media.duration : Infinity;
    var msDuration = Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(mediaSource.duration) ? mediaSource.duration : Infinity;
    var removeStart = Math.max(0, startOffset);
    var removeEnd = Math.min(endOffset, mediaDuration, msDuration);

    if (removeEnd > removeStart) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log("[buffer-controller]: Removing [" + removeStart + "," + removeEnd + "] from the " + type + " SourceBuffer");
      console.assert(!sb.updating, type + " sourceBuffer must not be updating");
      sb.remove(removeStart, removeEnd);
    } else {
      // Cycle the queue
      operationQueue.shiftAndExecuteNext(type);
    }
  } // This method must result in an updateend event; if append is not called, _onSBUpdateEnd must be called manually
  ;

  _proto.appendExecutor = function appendExecutor(data, type) {
    var operationQueue = this.operationQueue,
        sourceBuffer = this.sourceBuffer;
    var sb = sourceBuffer[type];

    if (!sb) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("[buffer-controller]: Attempting to append to the " + type + " SourceBuffer, but it does not exist");
      operationQueue.shiftAndExecuteNext(type);
      return;
    }

    sb.ended = false;
    console.assert(!sb.updating, type + " sourceBuffer must not be updating");
    sb.appendBuffer(data);
  } // Enqueues an operation to each SourceBuffer queue which, upon execution, resolves a promise. When all promises
  // resolve, the onUnblocked function is executed. Functions calling this method do not need to unblock the queue
  // upon completion, since we already do it here
  ;

  _proto.blockBuffers = function blockBuffers(onUnblocked, buffers) {
    var _this9 = this;

    if (buffers === void 0) {
      buffers = this.getSourceBufferTypes();
    }

    if (!buffers.length) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('[buffer-controller]: Blocking operation requested, but no SourceBuffers exist');
      Promise.resolve(onUnblocked);
      return;
    }

    var operationQueue = this.operationQueue; // logger.debug(`[buffer-controller]: Blocking ${buffers} SourceBuffer`);

    var blockingOperations = buffers.map(function (type) {
      return operationQueue.appendBlocker(type);
    });
    Promise.all(blockingOperations).then(function () {
      // logger.debug(`[buffer-controller]: Blocking operation resolved; unblocking ${buffers} SourceBuffer`);
      onUnblocked();
      buffers.forEach(function (type) {
        var sb = _this9.sourceBuffer[type]; // Only cycle the queue if the SB is not updating. There's a bug in Chrome which sets the SB updating flag to
        // true when changing the MediaSource duration (https://bugs.chromium.org/p/chromium/issues/detail?id=959359&can=2&q=mediasource%20duration)
        // While this is a workaround, it's probably useful to have around

        if (!sb || !sb.updating) {
          operationQueue.shiftAndExecuteNext(type);
        }
      });
    });
  };

  _proto.getSourceBufferTypes = function getSourceBufferTypes() {
    return Object.keys(this.sourceBuffer);
  };

  _proto.addBufferListener = function addBufferListener(type, event, fn) {
    var buffer = this.sourceBuffer[type];

    if (!buffer) {
      return;
    }

    var listener = fn.bind(this, type);
    this.listeners[type].push({
      event: event,
      listener: listener
    });
    buffer.addEventListener(event, listener);
  };

  _proto.removeBufferListeners = function removeBufferListeners(type) {
    var buffer = this.sourceBuffer[type];

    if (!buffer) {
      return;
    }

    this.listeners[type].forEach(function (l) {
      buffer.removeEventListener(l.event, l.listener);
    });
  };

  return BufferController;
}();



/***/ }),

/***/ "./src/controller/buffer-operation-queue.ts":
/*!**************************************************!*\
  !*** ./src/controller/buffer-operation-queue.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BufferOperationQueue; });
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");


var BufferOperationQueue = /*#__PURE__*/function () {
  function BufferOperationQueue(sourceBufferReference) {
    this.buffers = void 0;
    this.queues = {
      video: [],
      audio: [],
      audiovideo: []
    };
    this.buffers = sourceBufferReference;
  }

  var _proto = BufferOperationQueue.prototype;

  _proto.append = function append(operation, type) {
    var queue = this.queues[type];
    queue.push(operation);

    if (queue.length === 1 && this.buffers[type]) {
      this.executeNext(type);
    }
  };

  _proto.insertAbort = function insertAbort(operation, type) {
    var queue = this.queues[type];
    queue.unshift(operation);
    this.executeNext(type);
  };

  _proto.appendBlocker = function appendBlocker(type) {
    var execute;
    var promise = new Promise(function (resolve) {
      execute = resolve;
    });
    var operation = {
      execute: execute,
      onStart: function onStart() {},
      onComplete: function onComplete() {},
      onError: function onError() {}
    };
    this.append(operation, type);
    return promise;
  };

  _proto.executeNext = function executeNext(type) {
    var buffers = this.buffers,
        queues = this.queues;
    var sb = buffers[type];
    var queue = queues[type];

    if (queue.length) {
      var operation = queue[0];

      try {
        // Operations are expected to result in an 'updateend' event being fired. If not, the queue will lock. Operations
        // which do not end with this event must call _onSBUpdateEnd manually
        operation.execute();
      } catch (e) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].warn('[buffer-operation-queue]: Unhandled exception executing the current operation');
        operation.onError(e); // Only shift the current operation off, otherwise the updateend handler will do this for us

        if (!sb || !sb.updating) {
          queue.shift();
          this.executeNext(type);
        }
      }
    }
  };

  _proto.shiftAndExecuteNext = function shiftAndExecuteNext(type) {
    this.queues[type].shift();
    this.executeNext(type);
  };

  _proto.current = function current(type) {
    return this.queues[type][0];
  };

  return BufferOperationQueue;
}();



/***/ }),

/***/ "./src/controller/cap-level-controller.ts":
/*!************************************************!*\
  !*** ./src/controller/cap-level-controller.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./src/events.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * cap stream level to media size dimension controller
 */


var CapLevelController = /*#__PURE__*/function () {
  function CapLevelController(hls) {
    this.autoLevelCapping = void 0;
    this.firstLevel = void 0;
    this.media = void 0;
    this.restrictedLevels = void 0;
    this.timer = void 0;
    this.hls = void 0;
    this.streamController = void 0;
    this.clientRect = void 0;
    this.hls = hls;
    this.autoLevelCapping = Number.POSITIVE_INFINITY;
    this.firstLevel = -1;
    this.media = null;
    this.restrictedLevels = [];
    this.timer = undefined;
    this.clientRect = null;
    this.registerListeners();
  }

  var _proto = CapLevelController.prototype;

  _proto.setStreamController = function setStreamController(streamController) {
    this.streamController = streamController;
  };

  _proto.destroy = function destroy() {
    this.unregisterListener();

    if (this.hls.config.capLevelToPlayerSize) {
      this.stopCapping();
    }

    this.media = null;
    this.clientRect = null; // @ts-ignore

    this.hls = this.streamController = null;
  };

  _proto.registerListeners = function registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_ATTACHING, this.onMediaAttaching, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MANIFEST_PARSED, this.onManifestParsed, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].BUFFER_CODECS, this.onBufferCodecs, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
  };

  _proto.unregisterListener = function unregisterListener() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_ATTACHING, this.onMediaAttaching, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MANIFEST_PARSED, this.onManifestParsed, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].BUFFER_CODECS, this.onBufferCodecs, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
  };

  _proto.onFpsDropLevelCapping = function onFpsDropLevelCapping(event, data) {
    // Don't add a restricted level more than once
    if (CapLevelController.isLevelAllowed(data.droppedLevel, this.restrictedLevels)) {
      this.restrictedLevels.push(data.droppedLevel);
    }
  };

  _proto.onMediaAttaching = function onMediaAttaching(event, data) {
    this.media = data.media instanceof HTMLVideoElement ? data.media : null;
  };

  _proto.onManifestParsed = function onManifestParsed(event, data) {
    var hls = this.hls;
    this.restrictedLevels = [];
    this.firstLevel = data.firstLevel;

    if (hls.config.capLevelToPlayerSize && data.video) {
      // Start capping immediately if the manifest has signaled video codecs
      this.startCapping();
    }
  } // Only activate capping when playing a video stream; otherwise, multi-bitrate audio-only streams will be restricted
  // to the first level
  ;

  _proto.onBufferCodecs = function onBufferCodecs(event, data) {
    var hls = this.hls;

    if (hls.config.capLevelToPlayerSize && data.video) {
      // If the manifest did not signal a video codec capping has been deferred until we're certain video is present
      this.startCapping();
    }
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    this.stopCapping();
  };

  _proto.detectPlayerSize = function detectPlayerSize() {
    if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
      var levels = this.hls.levels;

      if (levels.length) {
        var hls = this.hls;
        hls.autoLevelCapping = this.getMaxLevel(levels.length - 1);

        if (hls.autoLevelCapping > this.autoLevelCapping && this.streamController) {
          // if auto level capping has a higher value for the previous one, flush the buffer using nextLevelSwitch
          // usually happen when the user go to the fullscreen mode.
          this.streamController.nextLevelSwitch();
        }

        this.autoLevelCapping = hls.autoLevelCapping;
      }
    }
  }
  /*
   * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
   */
  ;

  _proto.getMaxLevel = function getMaxLevel(capLevelIndex) {
    var _this = this;

    var levels = this.hls.levels;

    if (!levels.length) {
      return -1;
    }

    var validLevels = levels.filter(function (level, index) {
      return CapLevelController.isLevelAllowed(index, _this.restrictedLevels) && index <= capLevelIndex;
    });
    this.clientRect = null;
    return CapLevelController.getMaxLevelByMediaSize(validLevels, this.mediaWidth, this.mediaHeight);
  };

  _proto.startCapping = function startCapping() {
    if (this.timer) {
      // Don't reset capping if started twice; this can happen if the manifest signals a video codec
      return;
    }

    this.autoLevelCapping = Number.POSITIVE_INFINITY;
    this.hls.firstLevel = this.getMaxLevel(this.firstLevel);
    self.clearInterval(this.timer);
    this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1000);
    this.detectPlayerSize();
  };

  _proto.stopCapping = function stopCapping() {
    this.restrictedLevels = [];
    this.firstLevel = -1;
    this.autoLevelCapping = Number.POSITIVE_INFINITY;

    if (this.timer) {
      self.clearInterval(this.timer);
      this.timer = undefined;
    }
  };

  _proto.getDimensions = function getDimensions() {
    if (this.clientRect) {
      return this.clientRect;
    }

    var media = this.media;
    var boundsRect = {
      width: 0,
      height: 0
    };

    if (media) {
      var clientRect = media.getBoundingClientRect();
      boundsRect.width = clientRect.width;
      boundsRect.height = clientRect.height;

      if (!boundsRect.width && !boundsRect.height) {
        // When the media element has no width or height (equivalent to not being in the DOM),
        // then use its width and height attributes (media.width, media.height)
        boundsRect.width = clientRect.right - clientRect.left || media.width || 0;
        boundsRect.height = clientRect.bottom - clientRect.top || media.height || 0;
      }
    }

    this.clientRect = boundsRect;
    return boundsRect;
  };

  CapLevelController.isLevelAllowed = function isLevelAllowed(level, restrictedLevels) {
    if (restrictedLevels === void 0) {
      restrictedLevels = [];
    }

    return restrictedLevels.indexOf(level) === -1;
  };

  CapLevelController.getMaxLevelByMediaSize = function getMaxLevelByMediaSize(levels, width, height) {
    if (!levels || !levels.length) {
      return -1;
    } // Levels can have the same dimensions but differing bandwidths - since levels are ordered, we can look to the next
    // to determine whether we've chosen the greatest bandwidth for the media's dimensions


    var atGreatestBandiwdth = function atGreatestBandiwdth(curLevel, nextLevel) {
      if (!nextLevel) {
        return true;
      }

      return curLevel.width !== nextLevel.width || curLevel.height !== nextLevel.height;
    }; // If we run through the loop without breaking, the media's dimensions are greater than every level, so default to
    // the max level


    var maxLevelIndex = levels.length - 1;

    for (var i = 0; i < levels.length; i += 1) {
      var level = levels[i];

      if ((level.width >= width || level.height >= height) && atGreatestBandiwdth(level, levels[i + 1])) {
        maxLevelIndex = i;
        break;
      }
    }

    return maxLevelIndex;
  };

  _createClass(CapLevelController, [{
    key: "mediaWidth",
    get: function get() {
      return this.getDimensions().width * CapLevelController.contentScaleFactor;
    }
  }, {
    key: "mediaHeight",
    get: function get() {
      return this.getDimensions().height * CapLevelController.contentScaleFactor;
    }
  }], [{
    key: "contentScaleFactor",
    get: function get() {
      var pixelRatio = 1;

      try {
        pixelRatio = self.devicePixelRatio;
      } catch (e) {
        /* no-op */
      }

      return pixelRatio;
    }
  }]);

  return CapLevelController;
}();

/* harmony default export */ __webpack_exports__["default"] = (CapLevelController);

/***/ }),

/***/ "./src/controller/fps-controller.ts":
/*!******************************************!*\
  !*** ./src/controller/fps-controller.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");



var FPSController = /*#__PURE__*/function () {
  // stream controller must be provided as a dependency!
  function FPSController(hls) {
    this.hls = void 0;
    this.isVideoPlaybackQualityAvailable = false;
    this.timer = void 0;
    this.media = null;
    this.lastTime = void 0;
    this.lastDroppedFrames = 0;
    this.lastDecodedFrames = 0;
    this.streamController = void 0;
    this.hls = hls;
    this.registerListeners();
  }

  var _proto = FPSController.prototype;

  _proto.setStreamController = function setStreamController(streamController) {
    this.streamController = streamController;
  };

  _proto.registerListeners = function registerListeners() {
    this.hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_ATTACHING, this.onMediaAttaching, this);
  };

  _proto.unregisterListeners = function unregisterListeners() {
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_ATTACHING, this.onMediaAttaching);
  };

  _proto.destroy = function destroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.unregisterListeners();
    this.isVideoPlaybackQualityAvailable = false;
    this.media = null;
  };

  _proto.onMediaAttaching = function onMediaAttaching(event, data) {
    var config = this.hls.config;

    if (config.capLevelOnFPSDrop) {
      var media = data.media instanceof self.HTMLVideoElement ? data.media : null;
      this.media = media;

      if (media && typeof media.getVideoPlaybackQuality === 'function') {
        this.isVideoPlaybackQualityAvailable = true;
      }

      self.clearInterval(this.timer);
      this.timer = self.setInterval(this.checkFPSInterval.bind(this), config.fpsDroppedMonitoringPeriod);
    }
  };

  _proto.checkFPS = function checkFPS(video, decodedFrames, droppedFrames) {
    var currentTime = performance.now();

    if (decodedFrames) {
      if (this.lastTime) {
        var currentPeriod = currentTime - this.lastTime;
        var currentDropped = droppedFrames - this.lastDroppedFrames;
        var currentDecoded = decodedFrames - this.lastDecodedFrames;
        var droppedFPS = 1000 * currentDropped / currentPeriod;
        var hls = this.hls;
        hls.trigger(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FPS_DROP, {
          currentDropped: currentDropped,
          currentDecoded: currentDecoded,
          totalDroppedFrames: droppedFrames
        });

        if (droppedFPS > 0) {
          // logger.log('checkFPS : droppedFPS/decodedFPS:' + droppedFPS/(1000 * currentDecoded / currentPeriod));
          if (currentDropped > hls.config.fpsDroppedMonitoringThreshold * currentDecoded) {
            var currentLevel = hls.currentLevel;
            _utils_logger__WEBPACK_IMPORTED_MODULE_1__["logger"].warn('drop FPS ratio greater than max allowed value for currentLevel: ' + currentLevel);

            if (currentLevel > 0 && (hls.autoLevelCapping === -1 || hls.autoLevelCapping >= currentLevel)) {
              currentLevel = currentLevel - 1;
              hls.trigger(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FPS_DROP_LEVEL_CAPPING, {
                level: currentLevel,
                droppedLevel: hls.currentLevel
              });
              hls.autoLevelCapping = currentLevel;
              this.streamController.nextLevelSwitch();
            }
          }
        }
      }

      this.lastTime = currentTime;
      this.lastDroppedFrames = droppedFrames;
      this.lastDecodedFrames = decodedFrames;
    }
  };

  _proto.checkFPSInterval = function checkFPSInterval() {
    var video = this.media;

    if (video) {
      if (this.isVideoPlaybackQualityAvailable) {
        var videoPlaybackQuality = video.getVideoPlaybackQuality();
        this.checkFPS(video, videoPlaybackQuality.totalVideoFrames, videoPlaybackQuality.droppedVideoFrames);
      } else {
        // HTMLVideoElement doesn't include the webkit types
        this.checkFPS(video, video.webkitDecodedFrameCount, video.webkitDroppedFrameCount);
      }
    }
  };

  return FPSController;
}();

/* harmony default export */ __webpack_exports__["default"] = (FPSController);

/***/ }),

/***/ "./src/controller/fragment-finders.ts":
/*!********************************************!*\
  !*** ./src/controller/fragment-finders.ts ***!
  \********************************************/
/*! exports provided: findFragmentByPDT, findFragmentByPTS, fragmentWithinToleranceTest, pdtWithinToleranceTest, findFragWithCC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findFragmentByPDT", function() { return findFragmentByPDT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findFragmentByPTS", function() { return findFragmentByPTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fragmentWithinToleranceTest", function() { return fragmentWithinToleranceTest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pdtWithinToleranceTest", function() { return pdtWithinToleranceTest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findFragWithCC", function() { return findFragWithCC; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _utils_binary_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/binary-search */ "./src/utils/binary-search.ts");



/**
 * Returns first fragment whose endPdt value exceeds the given PDT.
 * @param {Array<Fragment>} fragments - The array of candidate fragments
 * @param {number|null} [PDTValue = null] - The PDT value which must be exceeded
 * @param {number} [maxFragLookUpTolerance = 0] - The amount of time that a fragment's start/end can be within in order to be considered contiguous
 * @returns {*|null} fragment - The best matching fragment
 */
function findFragmentByPDT(fragments, PDTValue, maxFragLookUpTolerance) {
  if (PDTValue === null || !Array.isArray(fragments) || !fragments.length || !Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(PDTValue)) {
    return null;
  } // if less than start


  var startPDT = fragments[0].programDateTime;

  if (PDTValue < (startPDT || 0)) {
    return null;
  }

  var endPDT = fragments[fragments.length - 1].endProgramDateTime;

  if (PDTValue >= (endPDT || 0)) {
    return null;
  }

  maxFragLookUpTolerance = maxFragLookUpTolerance || 0;

  for (var seg = 0; seg < fragments.length; ++seg) {
    var frag = fragments[seg];

    if (pdtWithinToleranceTest(PDTValue, maxFragLookUpTolerance, frag)) {
      return frag;
    }
  }

  return null;
}
/**
 * Finds a fragment based on the SN of the previous fragment; or based on the needs of the current buffer.
 * This method compensates for small buffer gaps by applying a tolerance to the start of any candidate fragment, thus
 * breaking any traps which would cause the same fragment to be continuously selected within a small range.
 * @param {*} fragPrevious - The last frag successfully appended
 * @param {Array} fragments - The array of candidate fragments
 * @param {number} [bufferEnd = 0] - The end of the contiguous buffered range the playhead is currently within
 * @param {number} maxFragLookUpTolerance - The amount of time that a fragment's start/end can be within in order to be considered contiguous
 * @returns {*} foundFrag - The best matching fragment
 */

function findFragmentByPTS(fragPrevious, fragments, bufferEnd, maxFragLookUpTolerance) {
  if (bufferEnd === void 0) {
    bufferEnd = 0;
  }

  if (maxFragLookUpTolerance === void 0) {
    maxFragLookUpTolerance = 0;
  }

  var fragNext = null;

  if (fragPrevious) {
    fragNext = fragments[fragPrevious.sn - fragments[0].sn + 1] || null;
  } else if (bufferEnd === 0 && fragments[0].start === 0) {
    fragNext = fragments[0];
  } // Prefer the next fragment if it's within tolerance


  if (fragNext && fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, fragNext) === 0) {
    return fragNext;
  } // We might be seeking past the tolerance so find the best match


  var foundFragment = _utils_binary_search__WEBPACK_IMPORTED_MODULE_1__["default"].search(fragments, fragmentWithinToleranceTest.bind(null, bufferEnd, maxFragLookUpTolerance));

  if (foundFragment) {
    return foundFragment;
  } // If no match was found return the next fragment after fragPrevious, or null


  return fragNext;
}
/**
 * The test function used by the findFragmentBySn's BinarySearch to look for the best match to the current buffer conditions.
 * @param {*} candidate - The fragment to test
 * @param {number} [bufferEnd = 0] - The end of the current buffered range the playhead is currently within
 * @param {number} [maxFragLookUpTolerance = 0] - The amount of time that a fragment's start can be within in order to be considered contiguous
 * @returns {number} - 0 if it matches, 1 if too low, -1 if too high
 */

function fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, candidate) {
  if (bufferEnd === void 0) {
    bufferEnd = 0;
  }

  if (maxFragLookUpTolerance === void 0) {
    maxFragLookUpTolerance = 0;
  }

  // offset should be within fragment boundary - config.maxFragLookUpTolerance
  // this is to cope with situations like
  // bufferEnd = 9.991
  // frag[Ø] : [0,10]
  // frag[1] : [10,20]
  // bufferEnd is within frag[0] range ... although what we are expecting is to return frag[1] here
  //              frag start               frag start+duration
  //                  |-----------------------------|
  //              <--->                         <--->
  //  ...--------><-----------------------------><---------....
  // previous frag         matching fragment         next frag
  //  return -1             return 0                 return 1
  // logger.log(`level/sn/start/end/bufEnd:${level}/${candidate.sn}/${candidate.start}/${(candidate.start+candidate.duration)}/${bufferEnd}`);
  // Set the lookup tolerance to be small enough to detect the current segment - ensures we don't skip over very small segments
  var candidateLookupTolerance = Math.min(maxFragLookUpTolerance, candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0));

  if (candidate.start + candidate.duration - candidateLookupTolerance <= bufferEnd) {
    return 1;
  } else if (candidate.start - candidateLookupTolerance > bufferEnd && candidate.start) {
    // if maxFragLookUpTolerance will have negative value then don't return -1 for first element
    return -1;
  }

  return 0;
}
/**
 * The test function used by the findFragmentByPdt's BinarySearch to look for the best match to the current buffer conditions.
 * This function tests the candidate's program date time values, as represented in Unix time
 * @param {*} candidate - The fragment to test
 * @param {number} [pdtBufferEnd = 0] - The Unix time representing the end of the current buffered range
 * @param {number} [maxFragLookUpTolerance = 0] - The amount of time that a fragment's start can be within in order to be considered contiguous
 * @returns {boolean} True if contiguous, false otherwise
 */

function pdtWithinToleranceTest(pdtBufferEnd, maxFragLookUpTolerance, candidate) {
  var candidateLookupTolerance = Math.min(maxFragLookUpTolerance, candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0)) * 1000; // endProgramDateTime can be null, default to zero

  var endProgramDateTime = candidate.endProgramDateTime || 0;
  return endProgramDateTime - candidateLookupTolerance > pdtBufferEnd;
}
function findFragWithCC(fragments, cc) {
  return _utils_binary_search__WEBPACK_IMPORTED_MODULE_1__["default"].search(fragments, function (candidate) {
    if (candidate.cc < cc) {
      return 1;
    } else if (candidate.cc > cc) {
      return -1;
    } else {
      return 0;
    }
  });
}

/***/ }),

/***/ "./src/controller/fragment-tracker.ts":
/*!********************************************!*\
  !*** ./src/controller/fragment-tracker.ts ***!
  \********************************************/
/*! exports provided: FragmentState, FragmentTracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FragmentState", function() { return FragmentState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FragmentTracker", function() { return FragmentTracker; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _types_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/loader */ "./src/types/loader.ts");


var FragmentState;

(function (FragmentState) {
  FragmentState["NOT_LOADED"] = "NOT_LOADED";
  FragmentState["BACKTRACKED"] = "BACKTRACKED";
  FragmentState["APPENDING"] = "APPENDING";
  FragmentState["PARTIAL"] = "PARTIAL";
  FragmentState["OK"] = "OK";
})(FragmentState || (FragmentState = {}));

var FragmentTracker = /*#__PURE__*/function () {
  function FragmentTracker(hls) {
    this.activeFragment = null;
    this.activeParts = null;
    this.fragments = Object.create(null);
    this.timeRanges = Object.create(null);
    this.bufferPadding = 0.2;
    this.hls = void 0;
    this.hls = hls;

    this._registerListeners();
  }

  var _proto = FragmentTracker.prototype;

  _proto._registerListeners = function _registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].BUFFER_APPENDED, this.onBufferAppended, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_BUFFERED, this.onFragBuffered, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_LOADED, this.onFragLoaded, this);
  };

  _proto._unregisterListeners = function _unregisterListeners() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].BUFFER_APPENDED, this.onBufferAppended, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_BUFFERED, this.onFragBuffered, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_LOADED, this.onFragLoaded, this);
  };

  _proto.destroy = function destroy() {
    this._unregisterListeners(); // @ts-ignore


    this.fragments = this.timeRanges = null;
  }
  /**
   * Return a Fragment with an appended range that matches the position and levelType.
   * If not found any Fragment, return null
   */
  ;

  _proto.getAppendedFrag = function getAppendedFrag(position, levelType) {
    if (levelType === _types_loader__WEBPACK_IMPORTED_MODULE_1__["PlaylistLevelType"].MAIN) {
      var activeFragment = this.activeFragment,
          activeParts = this.activeParts;

      if (!activeFragment) {
        return null;
      }

      if (activeParts) {
        for (var i = activeParts.length; i--;) {
          var activePart = activeParts[i];
          var appendedPTS = activePart ? activePart.end : activeFragment.appendedPTS;

          if (activePart.start <= position && appendedPTS !== undefined && position <= appendedPTS) {
            // 9 is a magic number. remove parts from lookup after a match but keep some short seeks back.
            if (i > 9) {
              this.activeParts = activeParts.slice(i - 9);
            }

            return activePart;
          }
        }
      } else if (activeFragment.start <= position && activeFragment.appendedPTS !== undefined && position <= activeFragment.appendedPTS) {
        return activeFragment;
      }
    }

    return this.getBufferedFrag(position, levelType);
  }
  /**
   * Return a buffered Fragment that matches the position and levelType.
   * A buffered Fragment is one whose loading, parsing and appending is done (completed or "partial" meaning aborted).
   * If not found any Fragment, return null
   */
  ;

  _proto.getBufferedFrag = function getBufferedFrag(position, levelType) {
    var fragments = this.fragments;
    var keys = Object.keys(fragments);

    for (var i = keys.length; i--;) {
      var fragmentEntity = fragments[keys[i]];

      if ((fragmentEntity === null || fragmentEntity === void 0 ? void 0 : fragmentEntity.body.type) === levelType && fragmentEntity.buffered) {
        var frag = fragmentEntity.body;

        if (frag.start <= position && position <= frag.end) {
          return frag;
        }
      }
    }

    return null;
  }
  /**
   * Partial fragments effected by coded frame eviction will be removed
   * The browser will unload parts of the buffer to free up memory for new buffer data
   * Fragments will need to be reloaded when the buffer is freed up, removing partial fragments will allow them to reload(since there might be parts that are still playable)
   */
  ;

  _proto.detectEvictedFragments = function detectEvictedFragments(elementaryStream, timeRange, playlistType) {
    var _this = this;

    // Check if any flagged fragments have been unloaded
    Object.keys(this.fragments).forEach(function (key) {
      var fragmentEntity = _this.fragments[key];

      if (!fragmentEntity) {
        return;
      }

      if (!fragmentEntity.buffered) {
        if (fragmentEntity.body.type === playlistType) {
          _this.removeFragment(fragmentEntity.body);
        }

        return;
      }

      var esData = fragmentEntity.range[elementaryStream];

      if (!esData) {
        return;
      }

      esData.time.some(function (time) {
        var isNotBuffered = !_this.isTimeBuffered(time.startPTS, time.endPTS, timeRange);

        if (isNotBuffered) {
          // Unregister partial fragment as it needs to load again to be reused
          _this.removeFragment(fragmentEntity.body);
        }

        return isNotBuffered;
      });
    });
  }
  /**
   * Checks if the fragment passed in is loaded in the buffer properly
   * Partially loaded fragments will be registered as a partial fragment
   */
  ;

  _proto.detectPartialFragments = function detectPartialFragments(data) {
    var _this2 = this;

    var timeRanges = this.timeRanges;
    var frag = data.frag,
        part = data.part;

    if (!timeRanges || frag.sn === 'initSegment') {
      return;
    }

    var fragKey = getFragmentKey(frag);
    var fragmentEntity = this.fragments[fragKey];

    if (!fragmentEntity) {
      return;
    }

    Object.keys(timeRanges).forEach(function (elementaryStream) {
      var streamInfo = frag.elementaryStreams[elementaryStream];

      if (!streamInfo) {
        return;
      }

      var timeRange = timeRanges[elementaryStream];
      var partial = part !== null || streamInfo.partial === true;
      fragmentEntity.range[elementaryStream] = _this2.getBufferedTimes(frag, part, partial, timeRange);
    });
    fragmentEntity.backtrack = fragmentEntity.loaded = null;

    if (Object.keys(fragmentEntity.range).length) {
      fragmentEntity.buffered = true;
    } else {
      // remove fragment if nothing was appended
      this.removeFragment(fragmentEntity.body);
    }
  };

  _proto.fragBuffered = function fragBuffered(frag) {
    var fragKey = getFragmentKey(frag);
    var fragmentEntity = this.fragments[fragKey];

    if (fragmentEntity) {
      fragmentEntity.backtrack = fragmentEntity.loaded = null;
      fragmentEntity.buffered = true;
    }
  };

  _proto.getBufferedTimes = function getBufferedTimes(fragment, part, partial, timeRange) {
    var buffered = {
      time: [],
      partial: partial
    };
    var startPTS = part ? part.start : fragment.start;
    var endPTS = part ? part.end : fragment.end;
    var minEndPTS = fragment.minEndPTS || endPTS;
    var maxStartPTS = fragment.maxStartPTS || startPTS;

    for (var i = 0; i < timeRange.length; i++) {
      var startTime = timeRange.start(i) - this.bufferPadding;
      var endTime = timeRange.end(i) + this.bufferPadding;

      if (maxStartPTS >= startTime && minEndPTS <= endTime) {
        // Fragment is entirely contained in buffer
        // No need to check the other timeRange times since it's completely playable
        buffered.time.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        });
        break;
      } else if (startPTS < endTime && endPTS > startTime) {
        buffered.partial = true; // Check for intersection with buffer
        // Get playable sections of the fragment

        buffered.time.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        });
      } else if (endPTS <= startTime) {
        // No need to check the rest of the timeRange as it is in order
        break;
      }
    }

    return buffered;
  }
  /**
   * Gets the partial fragment for a certain time
   */
  ;

  _proto.getPartialFragment = function getPartialFragment(time) {
    var bestFragment = null;
    var timePadding;
    var startTime;
    var endTime;
    var bestOverlap = 0;
    var bufferPadding = this.bufferPadding,
        fragments = this.fragments;
    Object.keys(fragments).forEach(function (key) {
      var fragmentEntity = fragments[key];

      if (!fragmentEntity) {
        return;
      }

      if (isPartial(fragmentEntity)) {
        startTime = fragmentEntity.body.start - bufferPadding;
        endTime = fragmentEntity.body.end + bufferPadding;

        if (time >= startTime && time <= endTime) {
          // Use the fragment that has the most padding from start and end time
          timePadding = Math.min(time - startTime, endTime - time);

          if (bestOverlap <= timePadding) {
            bestFragment = fragmentEntity.body;
            bestOverlap = timePadding;
          }
        }
      }
    });
    return bestFragment;
  };

  _proto.getState = function getState(fragment) {
    var fragKey = getFragmentKey(fragment);
    var fragmentEntity = this.fragments[fragKey];

    if (fragmentEntity) {
      if (!fragmentEntity.buffered) {
        if (fragmentEntity.backtrack) {
          return FragmentState.BACKTRACKED;
        }

        return FragmentState.APPENDING;
      } else if (isPartial(fragmentEntity)) {
        return FragmentState.PARTIAL;
      } else {
        return FragmentState.OK;
      }
    }

    return FragmentState.NOT_LOADED;
  };

  _proto.backtrack = function backtrack(frag, data) {
    var fragKey = getFragmentKey(frag);
    var fragmentEntity = this.fragments[fragKey];

    if (!fragmentEntity || fragmentEntity.backtrack) {
      return null;
    }

    var backtrack = fragmentEntity.backtrack = data ? data : fragmentEntity.loaded;
    fragmentEntity.loaded = null;
    return backtrack;
  };

  _proto.getBacktrackData = function getBacktrackData(fragment) {
    var fragKey = getFragmentKey(fragment);
    var fragmentEntity = this.fragments[fragKey];

    if (fragmentEntity) {
      var _backtrack$payload;

      var backtrack = fragmentEntity.backtrack; // If data was already sent to Worker it is detached no longer available

      if (backtrack !== null && backtrack !== void 0 && (_backtrack$payload = backtrack.payload) !== null && _backtrack$payload !== void 0 && _backtrack$payload.byteLength) {
        return backtrack;
      } else {
        this.removeFragment(fragment);
      }
    }

    return null;
  };

  _proto.isTimeBuffered = function isTimeBuffered(startPTS, endPTS, timeRange) {
    var startTime;
    var endTime;

    for (var i = 0; i < timeRange.length; i++) {
      startTime = timeRange.start(i) - this.bufferPadding;
      endTime = timeRange.end(i) + this.bufferPadding;

      if (startPTS >= startTime && endPTS <= endTime) {
        return true;
      }

      if (endPTS <= startTime) {
        // No need to check the rest of the timeRange as it is in order
        return false;
      }
    }

    return false;
  };

  _proto.onFragLoaded = function onFragLoaded(event, data) {
    var frag = data.frag,
        part = data.part; // don't track initsegment (for which sn is not a number)
    // don't track frags used for bitrateTest, they're irrelevant.
    // don't track parts for memory efficiency

    if (frag.sn === 'initSegment' || frag.bitrateTest || part) {
      return;
    }

    var fragKey = getFragmentKey(frag);
    this.fragments[fragKey] = {
      body: frag,
      loaded: data,
      backtrack: null,
      buffered: false,
      range: Object.create(null)
    };
  };

  _proto.onBufferAppended = function onBufferAppended(event, data) {
    var _this3 = this;

    var frag = data.frag,
        part = data.part,
        timeRanges = data.timeRanges;

    if (frag.type === _types_loader__WEBPACK_IMPORTED_MODULE_1__["PlaylistLevelType"].MAIN) {
      this.activeFragment = frag;

      if (part) {
        var activeParts = this.activeParts;

        if (!activeParts) {
          this.activeParts = activeParts = [];
        }

        activeParts.push(part);
      } else {
        this.activeParts = null;
      }
    } // Store the latest timeRanges loaded in the buffer


    this.timeRanges = timeRanges;
    Object.keys(timeRanges).forEach(function (elementaryStream) {
      var timeRange = timeRanges[elementaryStream];

      _this3.detectEvictedFragments(elementaryStream, timeRange);

      if (!part) {
        for (var i = 0; i < timeRange.length; i++) {
          frag.appendedPTS = Math.max(timeRange.end(i), frag.appendedPTS || 0);
        }
      }
    });
  };

  _proto.onFragBuffered = function onFragBuffered(event, data) {
    this.detectPartialFragments(data);
  };

  _proto.hasFragment = function hasFragment(fragment) {
    var fragKey = getFragmentKey(fragment);
    return !!this.fragments[fragKey];
  };

  _proto.removeFragmentsInRange = function removeFragmentsInRange(start, end, playlistType) {
    var _this4 = this;

    Object.keys(this.fragments).forEach(function (key) {
      var fragmentEntity = _this4.fragments[key];

      if (!fragmentEntity) {
        return;
      }

      if (fragmentEntity.buffered) {
        var frag = fragmentEntity.body;

        if (frag.type === playlistType && frag.start < end && frag.end > start) {
          _this4.removeFragment(frag);
        }
      }
    });
  };

  _proto.removeFragment = function removeFragment(fragment) {
    var fragKey = getFragmentKey(fragment);
    fragment.stats.loaded = 0;
    fragment.clearElementaryStreamInfo();
    delete this.fragments[fragKey];
  };

  _proto.removeAllFragments = function removeAllFragments() {
    this.fragments = Object.create(null);
    this.activeFragment = null;
    this.activeParts = null;
  };

  return FragmentTracker;
}();

function isPartial(fragmentEntity) {
  var _fragmentEntity$range, _fragmentEntity$range2;

  return fragmentEntity.buffered && (((_fragmentEntity$range = fragmentEntity.range.video) === null || _fragmentEntity$range === void 0 ? void 0 : _fragmentEntity$range.partial) || ((_fragmentEntity$range2 = fragmentEntity.range.audio) === null || _fragmentEntity$range2 === void 0 ? void 0 : _fragmentEntity$range2.partial));
}

function getFragmentKey(fragment) {
  return fragment.type + "_" + fragment.level + "_" + fragment.urlId + "_" + fragment.sn;
}

/***/ }),

/***/ "./src/controller/gap-controller.ts":
/*!******************************************!*\
  !*** ./src/controller/gap-controller.ts ***!
  \******************************************/
/*! exports provided: STALL_MINIMUM_DURATION_MS, MAX_START_GAP_JUMP, SKIP_BUFFER_HOLE_STEP_SECONDS, SKIP_BUFFER_RANGE_START, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STALL_MINIMUM_DURATION_MS", function() { return STALL_MINIMUM_DURATION_MS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_START_GAP_JUMP", function() { return MAX_START_GAP_JUMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SKIP_BUFFER_HOLE_STEP_SECONDS", function() { return SKIP_BUFFER_HOLE_STEP_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SKIP_BUFFER_RANGE_START", function() { return SKIP_BUFFER_RANGE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GapController; });
/* harmony import */ var _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/buffer-helper */ "./src/utils/buffer-helper.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");




var STALL_MINIMUM_DURATION_MS = 250;
var MAX_START_GAP_JUMP = 2.0;
var SKIP_BUFFER_HOLE_STEP_SECONDS = 0.1;
var SKIP_BUFFER_RANGE_START = 0.05;

var GapController = /*#__PURE__*/function () {
  function GapController(config, media, fragmentTracker, hls) {
    this.config = void 0;
    this.media = void 0;
    this.fragmentTracker = void 0;
    this.hls = void 0;
    this.nudgeRetry = 0;
    this.stallReported = false;
    this.stalled = null;
    this.moved = false;
    this.seeking = false;
    this.config = config;
    this.media = media;
    this.fragmentTracker = fragmentTracker;
    this.hls = hls;
  }

  var _proto = GapController.prototype;

  _proto.destroy = function destroy() {
    // @ts-ignore
    this.hls = this.fragmentTracker = this.media = null;
  }
  /**
   * Checks if the playhead is stuck within a gap, and if so, attempts to free it.
   * A gap is an unbuffered range between two buffered ranges (or the start and the first buffered range).
   *
   * @param {number} lastCurrentTime Previously read playhead position
   */
  ;

  _proto.poll = function poll(lastCurrentTime) {
    var config = this.config,
        media = this.media,
        stalled = this.stalled;
    var currentTime = media.currentTime,
        seeking = media.seeking;
    var seeked = this.seeking && !seeking;
    var beginSeek = !this.seeking && seeking;
    this.seeking = seeking; // The playhead is moving, no-op

    if (currentTime !== lastCurrentTime) {
      this.moved = true;

      if (stalled !== null) {
        // The playhead is now moving, but was previously stalled
        if (this.stallReported) {
          var _stalledDuration = self.performance.now() - stalled;

          _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn("playback not stuck anymore @" + currentTime + ", after " + Math.round(_stalledDuration) + "ms");
          this.stallReported = false;
        }

        this.stalled = null;
        this.nudgeRetry = 0;
      }

      return;
    } // Clear stalled state when beginning or finishing seeking so that we don't report stalls coming out of a seek


    if (beginSeek || seeked) {
      this.stalled = null;
    } // The playhead should not be moving


    if (media.paused || media.ended || media.playbackRate === 0 || !_utils_buffer_helper__WEBPACK_IMPORTED_MODULE_0__["BufferHelper"].getBuffered(media).length) {
      return;
    }

    var bufferInfo = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_0__["BufferHelper"].bufferInfo(media, currentTime, 0);
    var isBuffered = bufferInfo.len > 0;
    var nextStart = bufferInfo.nextStart || 0; // There is no playable buffer (seeked, waiting for buffer)

    if (!isBuffered && !nextStart) {
      return;
    }

    if (seeking) {
      // Waiting for seeking in a buffered range to complete
      var hasEnoughBuffer = bufferInfo.len > MAX_START_GAP_JUMP; // Next buffered range is too far ahead to jump to while still seeking

      var noBufferGap = !nextStart || nextStart - currentTime > MAX_START_GAP_JUMP && !this.fragmentTracker.getPartialFragment(currentTime);

      if (hasEnoughBuffer || noBufferGap) {
        return;
      } // Reset moved state when seeking to a point in or before a gap


      this.moved = false;
    } // Skip start gaps if we haven't played, but the last poll detected the start of a stall
    // The addition poll gives the browser a chance to jump the gap for us


    if (!this.moved && this.stalled !== null) {
      var _level$details;

      // Jump start gaps within jump threshold
      var startJump = Math.max(nextStart, bufferInfo.start || 0) - currentTime; // When joining a live stream with audio tracks, account for live playlist window sliding by allowing
      // a larger jump over start gaps caused by the audio-stream-controller buffering a start fragment
      // that begins over 1 target duration after the video start position.

      var level = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null;
      var isLive = level === null || level === void 0 ? void 0 : (_level$details = level.details) === null || _level$details === void 0 ? void 0 : _level$details.live;
      var maxStartGapJump = isLive ? level.details.targetduration * 2 : MAX_START_GAP_JUMP;

      if (startJump > 0 && startJump <= maxStartGapJump) {
        this._trySkipBufferHole(null);

        return;
      }
    } // Start tracking stall time


    var tnow = self.performance.now();

    if (stalled === null) {
      this.stalled = tnow;
      return;
    }

    var stalledDuration = tnow - stalled;

    if (!seeking && stalledDuration >= STALL_MINIMUM_DURATION_MS) {
      // Report stalling after trying to fix
      this._reportStall(bufferInfo.len);
    }

    var bufferedWithHoles = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_0__["BufferHelper"].bufferInfo(media, currentTime, config.maxBufferHole);

    this._tryFixBufferStall(bufferedWithHoles, stalledDuration);
  }
  /**
   * Detects and attempts to fix known buffer stalling issues.
   * @param bufferInfo - The properties of the current buffer.
   * @param stalledDurationMs - The amount of time Hls.js has been stalling for.
   * @private
   */
  ;

  _proto._tryFixBufferStall = function _tryFixBufferStall(bufferInfo, stalledDurationMs) {
    var config = this.config,
        fragmentTracker = this.fragmentTracker,
        media = this.media;
    var currentTime = media.currentTime;
    var partial = fragmentTracker.getPartialFragment(currentTime);

    if (partial) {
      // Try to skip over the buffer hole caused by a partial fragment
      // This method isn't limited by the size of the gap between buffered ranges
      var targetTime = this._trySkipBufferHole(partial); // we return here in this case, meaning
      // the branch below only executes when we don't handle a partial fragment


      if (targetTime) {
        return;
      }
    } // if we haven't had to skip over a buffer hole of a partial fragment
    // we may just have to "nudge" the playlist as the browser decoding/rendering engine
    // needs to cross some sort of threshold covering all source-buffers content
    // to start playing properly.


    if (bufferInfo.len > config.maxBufferHole && stalledDurationMs > config.highBufferWatchdogPeriod * 1000) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn('Trying to nudge playhead over buffer-hole'); // Try to nudge currentTime over a buffer hole if we've been stalling for the configured amount of seconds
      // We only try to jump the hole if it's under the configured size
      // Reset stalled so to rearm watchdog timer

      this.stalled = null;

      this._tryNudgeBuffer();
    }
  }
  /**
   * Triggers a BUFFER_STALLED_ERROR event, but only once per stall period.
   * @param bufferLen - The playhead distance from the end of the current buffer segment.
   * @private
   */
  ;

  _proto._reportStall = function _reportStall(bufferLen) {
    var hls = this.hls,
        media = this.media,
        stallReported = this.stallReported;

    if (!stallReported) {
      // Report stalled error once
      this.stallReported = true;
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn("Playback stalling at @" + media.currentTime + " due to low buffer (buffer=" + bufferLen + ")");
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].ERROR, {
        type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].MEDIA_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].BUFFER_STALLED_ERROR,
        fatal: false,
        buffer: bufferLen
      });
    }
  }
  /**
   * Attempts to fix buffer stalls by jumping over known gaps caused by partial fragments
   * @param partial - The partial fragment found at the current time (where playback is stalling).
   * @private
   */
  ;

  _proto._trySkipBufferHole = function _trySkipBufferHole(partial) {
    var config = this.config,
        hls = this.hls,
        media = this.media;
    var currentTime = media.currentTime;
    var lastEndTime = 0; // Check if currentTime is between unbuffered regions of partial fragments

    var buffered = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_0__["BufferHelper"].getBuffered(media);

    for (var i = 0; i < buffered.length; i++) {
      var startTime = buffered.start(i);

      if (currentTime + config.maxBufferHole >= lastEndTime && currentTime < startTime) {
        var targetTime = Math.max(startTime + SKIP_BUFFER_RANGE_START, media.currentTime + SKIP_BUFFER_HOLE_STEP_SECONDS);
        _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn("skipping hole, adjusting currentTime from " + currentTime + " to " + targetTime);
        this.moved = true;
        this.stalled = null;
        media.currentTime = targetTime;

        if (partial) {
          hls.trigger(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].ERROR, {
            type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].MEDIA_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].BUFFER_SEEK_OVER_HOLE,
            fatal: false,
            reason: "fragment loaded with buffer holes, seeking from " + currentTime + " to " + targetTime,
            frag: partial
          });
        }

        return targetTime;
      }

      lastEndTime = buffered.end(i);
    }

    return 0;
  }
  /**
   * Attempts to fix buffer stalls by advancing the mediaElement's current time by a small amount.
   * @private
   */
  ;

  _proto._tryNudgeBuffer = function _tryNudgeBuffer() {
    var config = this.config,
        hls = this.hls,
        media = this.media;
    var currentTime = media.currentTime;
    var nudgeRetry = (this.nudgeRetry || 0) + 1;
    this.nudgeRetry = nudgeRetry;

    if (nudgeRetry < config.nudgeMaxRetry) {
      var targetTime = currentTime + nudgeRetry * config.nudgeOffset; // playback stalled in buffered area ... let's nudge currentTime to try to overcome this

      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn("Nudging 'currentTime' from " + currentTime + " to " + targetTime);
      media.currentTime = targetTime;
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].ERROR, {
        type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].MEDIA_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].BUFFER_NUDGE_ON_STALL,
        fatal: false
      });
    } else {
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].error("Playhead still not moving while enough data buffered @" + currentTime + " after " + config.nudgeMaxRetry + " nudges");
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].ERROR, {
        type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].MEDIA_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].BUFFER_STALLED_ERROR,
        fatal: true
      });
    }
  };

  return GapController;
}();



/***/ }),

/***/ "./src/controller/id3-track-controller.ts":
/*!************************************************!*\
  !*** ./src/controller/id3-track-controller.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_texttrack_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/texttrack-utils */ "./src/utils/texttrack-utils.ts");
/* harmony import */ var _demux_id3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../demux/id3 */ "./src/demux/id3.ts");



var MIN_CUE_DURATION = 0.25;

var ID3TrackController = /*#__PURE__*/function () {
  function ID3TrackController(hls) {
    this.hls = void 0;
    this.id3Track = null;
    this.media = null;
    this.hls = hls;

    this._registerListeners();
  }

  var _proto = ID3TrackController.prototype;

  _proto.destroy = function destroy() {
    this._unregisterListeners();
  };

  _proto._registerListeners = function _registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_ATTACHED, this.onMediaAttached, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_PARSING_METADATA, this.onFragParsingMetadata, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].BUFFER_FLUSHING, this.onBufferFlushing, this);
  };

  _proto._unregisterListeners = function _unregisterListeners() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_ATTACHED, this.onMediaAttached, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].FRAG_PARSING_METADATA, this.onFragParsingMetadata, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].BUFFER_FLUSHING, this.onBufferFlushing, this);
  } // Add ID3 metatadata text track.
  ;

  _proto.onMediaAttached = function onMediaAttached(event, data) {
    this.media = data.media;
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    if (!this.id3Track) {
      return;
    }

    Object(_utils_texttrack_utils__WEBPACK_IMPORTED_MODULE_1__["clearCurrentCues"])(this.id3Track);
    this.id3Track = null;
    this.media = null;
  };

  _proto.getID3Track = function getID3Track(textTracks) {
    if (!this.media) {
      return;
    }

    for (var i = 0; i < textTracks.length; i++) {
      var textTrack = textTracks[i];

      if (textTrack.kind === 'metadata' && textTrack.label === 'id3') {
        // send 'addtrack' when reusing the textTrack for metadata,
        // same as what we do for captions
        Object(_utils_texttrack_utils__WEBPACK_IMPORTED_MODULE_1__["sendAddTrackEvent"])(textTrack, this.media);
        return textTrack;
      }
    }

    return this.media.addTextTrack('metadata', 'id3');
  };

  _proto.onFragParsingMetadata = function onFragParsingMetadata(event, data) {
    if (!this.media) {
      return;
    }

    var fragment = data.frag;
    var samples = data.samples; // create track dynamically

    if (!this.id3Track) {
      this.id3Track = this.getID3Track(this.media.textTracks);
      this.id3Track.mode = 'hidden';
    } // Attempt to recreate Safari functionality by creating
    // WebKitDataCue objects when available and store the decoded
    // ID3 data in the value property of the cue


    var Cue = self.WebKitDataCue || self.VTTCue || self.TextTrackCue;

    for (var i = 0; i < samples.length; i++) {
      var frames = _demux_id3__WEBPACK_IMPORTED_MODULE_2__["getID3Frames"](samples[i].data);

      if (frames) {
        var startTime = samples[i].pts;
        var endTime = i < samples.length - 1 ? samples[i + 1].pts : fragment.end;
        var timeDiff = endTime - startTime;

        if (timeDiff <= 0) {
          endTime = startTime + MIN_CUE_DURATION;
        }

        for (var j = 0; j < frames.length; j++) {
          var frame = frames[j]; // Safari doesn't put the timestamp frame in the TextTrack

          if (!_demux_id3__WEBPACK_IMPORTED_MODULE_2__["isTimeStampFrame"](frame)) {
            var cue = new Cue(startTime, endTime, '');
            cue.value = frame;
            this.id3Track.addCue(cue);
          }
        }
      }
    }
  };

  _proto.onBufferFlushing = function onBufferFlushing(event, _ref) {
    var startOffset = _ref.startOffset,
        endOffset = _ref.endOffset,
        type = _ref.type;

    if (!type || type === 'audio') {
      // id3 cues come from parsed audio only remove cues when audio buffer is cleared
      var id3Track = this.id3Track;

      if (id3Track) {
        Object(_utils_texttrack_utils__WEBPACK_IMPORTED_MODULE_1__["removeCuesInRange"])(id3Track, startOffset, endOffset);
      }
    }
  };

  return ID3TrackController;
}();

/* harmony default export */ __webpack_exports__["default"] = (ID3TrackController);

/***/ }),

/***/ "./src/controller/latency-controller.ts":
/*!**********************************************!*\
  !*** ./src/controller/latency-controller.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LatencyController; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var LatencyController = /*#__PURE__*/function () {
  function LatencyController(hls) {
    var _this = this;

    this.hls = void 0;
    this.config = void 0;
    this.media = null;
    this.levelDetails = null;
    this.currentTime = 0;
    this.stallCount = 0;
    this._latency = null;

    this.timeupdateHandler = function () {
      return _this.timeupdate();
    };

    this.hls = hls;
    this.config = hls.config;
    this.registerListeners();
  }

  var _proto = LatencyController.prototype;

  _proto.destroy = function destroy() {
    this.unregisterListeners();
    this.onMediaDetaching();
    this.levelDetails = null; // @ts-ignore

    this.hls = this.timeupdateHandler = null;
  };

  _proto.registerListeners = function registerListeners() {
    this.hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_ATTACHED, this.onMediaAttached, this);
    this.hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
    this.hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADING, this.onManifestLoading, this);
    this.hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_UPDATED, this.onLevelUpdated, this);
    this.hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, this.onError, this);
  };

  _proto.unregisterListeners = function unregisterListeners() {
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_ATTACHED, this.onMediaAttached);
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_DETACHING, this.onMediaDetaching);
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADING, this.onManifestLoading);
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_UPDATED, this.onLevelUpdated);
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, this.onError);
  };

  _proto.onMediaAttached = function onMediaAttached(event, data) {
    this.media = data.media;
    this.media.addEventListener('timeupdate', this.timeupdateHandler);
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    if (this.media) {
      this.media.removeEventListener('timeupdate', this.timeupdateHandler);
      this.media = null;
    }
  };

  _proto.onManifestLoading = function onManifestLoading() {
    this.levelDetails = null;
    this._latency = null;
    this.stallCount = 0;
  };

  _proto.onLevelUpdated = function onLevelUpdated(event, _ref) {
    var details = _ref.details;
    this.levelDetails = details;

    if (details.advanced) {
      this.timeupdate();
    }

    if (!details.live && this.media) {
      this.media.removeEventListener('timeupdate', this.timeupdateHandler);
    }
  };

  _proto.onError = function onError(event, data) {
    if (data.details !== _errors__WEBPACK_IMPORTED_MODULE_0__["ErrorDetails"].BUFFER_STALLED_ERROR) {
      return;
    }

    this.stallCount++;
    _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn('[playback-rate-controller]: Stall detected, adjusting target latency');
  };

  _proto.timeupdate = function timeupdate() {
    var media = this.media,
        levelDetails = this.levelDetails;

    if (!media || !levelDetails) {
      return;
    }

    this.currentTime = media.currentTime;
    var latency = this.computeLatency();

    if (latency === null) {
      return;
    }

    this._latency = latency; // Adapt playbackRate to meet target latency in low-latency mode

    var _this$config = this.config,
        lowLatencyMode = _this$config.lowLatencyMode,
        maxLiveSyncPlaybackRate = _this$config.maxLiveSyncPlaybackRate;

    if (!lowLatencyMode || maxLiveSyncPlaybackRate === 1) {
      return;
    }

    var targetLatency = this.targetLatency;

    if (targetLatency === null) {
      return;
    }

    var distanceFromTarget = latency - targetLatency; // Only adjust playbackRate when within one target duration of targetLatency
    // and more than one second from under-buffering.
    // Playback further than one target duration from target can be considered DVR playback.

    var liveMinLatencyDuration = Math.min(this.maxLatency, targetLatency + levelDetails.targetduration);
    var inLiveRange = distanceFromTarget < liveMinLatencyDuration;

    if (levelDetails.live && inLiveRange && distanceFromTarget > 0.05 && this.forwardBufferLength > 1) {
      var max = Math.min(2, Math.max(1.0, maxLiveSyncPlaybackRate));
      var rate = Math.round(2 / (1 + Math.exp(-0.75 * distanceFromTarget - this.edgeStalled)) * 20) / 20;
      media.playbackRate = Math.min(max, Math.max(1, rate));
    } else if (media.playbackRate !== 1 && media.playbackRate !== 0) {
      media.playbackRate = 1;
    }
  };

  _proto.estimateLiveEdge = function estimateLiveEdge() {
    var levelDetails = this.levelDetails;

    if (levelDetails === null) {
      return null;
    }

    return levelDetails.edge + levelDetails.age;
  };

  _proto.computeLatency = function computeLatency() {
    var liveEdge = this.estimateLiveEdge();

    if (liveEdge === null) {
      return null;
    }

    return liveEdge - this.currentTime;
  };

  _createClass(LatencyController, [{
    key: "latency",
    get: function get() {
      return this._latency || 0;
    }
  }, {
    key: "maxLatency",
    get: function get() {
      var config = this.config,
          levelDetails = this.levelDetails;

      if (config.liveMaxLatencyDuration !== undefined) {
        return config.liveMaxLatencyDuration;
      }

      return levelDetails ? config.liveMaxLatencyDurationCount * levelDetails.targetduration : 0;
    }
  }, {
    key: "targetLatency",
    get: function get() {
      var levelDetails = this.levelDetails;

      if (levelDetails === null) {
        return null;
      }

      var holdBack = levelDetails.holdBack,
          partHoldBack = levelDetails.partHoldBack,
          targetduration = levelDetails.targetduration;
      var _this$config2 = this.config,
          liveSyncDuration = _this$config2.liveSyncDuration,
          liveSyncDurationCount = _this$config2.liveSyncDurationCount,
          lowLatencyMode = _this$config2.lowLatencyMode;
      var userConfig = this.hls.userConfig;
      var targetLatency = lowLatencyMode ? partHoldBack || holdBack : holdBack;

      if (userConfig.liveSyncDuration || userConfig.liveSyncDurationCount || targetLatency === 0) {
        targetLatency = liveSyncDuration !== undefined ? liveSyncDuration : liveSyncDurationCount * targetduration;
      }

      var maxLiveSyncOnStallIncrease = targetduration;
      var liveSyncOnStallIncrease = 1.0;
      return targetLatency + Math.min(this.stallCount * liveSyncOnStallIncrease, maxLiveSyncOnStallIncrease);
    }
  }, {
    key: "liveSyncPosition",
    get: function get() {
      var liveEdge = this.estimateLiveEdge();
      var targetLatency = this.targetLatency;
      var levelDetails = this.levelDetails;

      if (liveEdge === null || targetLatency === null || levelDetails === null) {
        return null;
      }

      var edge = levelDetails.edge;
      var syncPosition = liveEdge - targetLatency - this.edgeStalled;
      var min = edge - levelDetails.totalduration;
      var max = edge - (this.config.lowLatencyMode && levelDetails.partTarget || levelDetails.targetduration);
      return Math.min(Math.max(min, syncPosition), max);
    }
  }, {
    key: "drift",
    get: function get() {
      var levelDetails = this.levelDetails;

      if (levelDetails === null) {
        return 1;
      }

      return levelDetails.drift;
    }
  }, {
    key: "edgeStalled",
    get: function get() {
      var levelDetails = this.levelDetails;

      if (levelDetails === null) {
        return 0;
      }

      var maxLevelUpdateAge = (this.config.lowLatencyMode && levelDetails.partTarget || levelDetails.targetduration) * 3;
      return Math.max(levelDetails.age - maxLevelUpdateAge, 0);
    }
  }, {
    key: "forwardBufferLength",
    get: function get() {
      var media = this.media,
          levelDetails = this.levelDetails;

      if (!media || !levelDetails) {
        return 0;
      }

      var bufferedRanges = media.buffered.length;
      return bufferedRanges ? media.buffered.end(bufferedRanges - 1) : levelDetails.edge - this.currentTime;
    }
  }]);

  return LatencyController;
}();



/***/ }),

/***/ "./src/controller/level-controller.ts":
/*!********************************************!*\
  !*** ./src/controller/level-controller.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LevelController; });
/* harmony import */ var _types_level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/level */ "./src/types/level.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _utils_codecs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/codecs */ "./src/utils/codecs.ts");
/* harmony import */ var _level_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./level-helper */ "./src/controller/level-helper.ts");
/* harmony import */ var _base_playlist_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base-playlist-controller */ "./src/controller/base-playlist-controller.ts");
/* harmony import */ var _types_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/loader */ "./src/types/loader.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
 * Level Controller
 */







var chromeOrFirefox = /chrome|firefox/.test(navigator.userAgent.toLowerCase());

var LevelController = /*#__PURE__*/function (_BasePlaylistControll) {
  _inheritsLoose(LevelController, _BasePlaylistControll);

  function LevelController(hls) {
    var _this;

    _this = _BasePlaylistControll.call(this, hls, '[level-controller]') || this;
    _this._levels = [];
    _this._firstLevel = -1;
    _this._startLevel = void 0;
    _this.currentLevelIndex = -1;
    _this.manualLevelIndex = -1;
    _this.onParsedComplete = void 0;

    _this._registerListeners();

    return _this;
  }

  var _proto = LevelController.prototype;

  _proto._registerListeners = function _registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADED, this.onManifestLoaded, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_LOADED, this.onLevelLoaded, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_LOADED, this.onFragLoaded, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, this.onError, this);
  };

  _proto._unregisterListeners = function _unregisterListeners() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADED, this.onManifestLoaded, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_LOADED, this.onLevelLoaded, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_LOADED, this.onFragLoaded, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, this.onError, this);
  };

  _proto.destroy = function destroy() {
    this._unregisterListeners();

    this.manualLevelIndex = -1;
    this._levels.length = 0;

    _BasePlaylistControll.prototype.destroy.call(this);
  };

  _proto.startLoad = function startLoad() {
    var levels = this._levels; // clean up live level details to force reload them, and reset load errors

    levels.forEach(function (level) {
      level.loadError = 0;
    });

    _BasePlaylistControll.prototype.startLoad.call(this);
  };

  _proto.onManifestLoaded = function onManifestLoaded(event, data) {
    var levels = [];
    var audioTracks = [];
    var subtitleTracks = [];
    var bitrateStart;
    var levelSet = {};
    var levelFromSet;
    var resolutionFound = false;
    var videoCodecFound = false;
    var audioCodecFound = false; // regroup redundant levels together

    data.levels.forEach(function (levelParsed) {
      var attributes = levelParsed.attrs;
      resolutionFound = resolutionFound || !!(levelParsed.width && levelParsed.height);
      videoCodecFound = videoCodecFound || !!levelParsed.videoCodec;
      audioCodecFound = audioCodecFound || !!levelParsed.audioCodec; // erase audio codec info if browser does not support mp4a.40.34.
      // demuxer will autodetect codec and fallback to mpeg/audio

      if (chromeOrFirefox && levelParsed.audioCodec && levelParsed.audioCodec.indexOf('mp4a.40.34') !== -1) {
        levelParsed.audioCodec = undefined;
      }

      var levelKey = levelParsed.bitrate + "-" + levelParsed.attrs.RESOLUTION + "-" + levelParsed.attrs.CODECS;
      levelFromSet = levelSet[levelKey];

      if (!levelFromSet) {
        levelFromSet = new _types_level__WEBPACK_IMPORTED_MODULE_0__["Level"](levelParsed);
        levelSet[levelKey] = levelFromSet;
        levels.push(levelFromSet);
      } else {
        levelFromSet.url.push(levelParsed.url);
      }

      if (attributes) {
        if (attributes.AUDIO) {
          Object(_level_helper__WEBPACK_IMPORTED_MODULE_4__["addGroupId"])(levelFromSet, 'audio', attributes.AUDIO);
        }

        if (attributes.SUBTITLES) {
          Object(_level_helper__WEBPACK_IMPORTED_MODULE_4__["addGroupId"])(levelFromSet, 'text', attributes.SUBTITLES);
        }
      }
    }); // remove audio-only level if we also have levels with video codecs or RESOLUTION signalled

    if ((resolutionFound || videoCodecFound) && audioCodecFound) {
      levels = levels.filter(function (_ref) {
        var videoCodec = _ref.videoCodec,
            width = _ref.width,
            height = _ref.height;
        return !!videoCodec || !!(width && height);
      });
    } // only keep levels with supported audio/video codecs


    levels = levels.filter(function (_ref2) {
      var audioCodec = _ref2.audioCodec,
          videoCodec = _ref2.videoCodec;
      return (!audioCodec || Object(_utils_codecs__WEBPACK_IMPORTED_MODULE_3__["isCodecSupportedInMp4"])(audioCodec, 'audio')) && (!videoCodec || Object(_utils_codecs__WEBPACK_IMPORTED_MODULE_3__["isCodecSupportedInMp4"])(videoCodec, 'video'));
    });

    if (data.audioTracks) {
      audioTracks = data.audioTracks.filter(function (track) {
        return !track.audioCodec || Object(_utils_codecs__WEBPACK_IMPORTED_MODULE_3__["isCodecSupportedInMp4"])(track.audioCodec, 'audio');
      }); // Assign ids after filtering as array indices by group-id

      Object(_level_helper__WEBPACK_IMPORTED_MODULE_4__["assignTrackIdsByGroup"])(audioTracks);
    }

    if (data.subtitles) {
      subtitleTracks = data.subtitles;
      Object(_level_helper__WEBPACK_IMPORTED_MODULE_4__["assignTrackIdsByGroup"])(subtitleTracks);
    }

    if (levels.length > 0) {
      // start bitrate is the first bitrate of the manifest
      bitrateStart = levels[0].bitrate; // sort level on bitrate

      levels.sort(function (a, b) {
        return a.bitrate - b.bitrate;
      });
      this._levels = levels; // find index of first level in sorted levels

      for (var i = 0; i < levels.length; i++) {
        if (levels[i].bitrate === bitrateStart) {
          this._firstLevel = i;
          this.log("manifest loaded, " + levels.length + " level(s) found, first bitrate: " + bitrateStart);
          break;
        }
      } // Audio is only alternate if manifest include a URI along with the audio group tag,
      // and this is not an audio-only stream where levels contain audio-only


      var audioOnly = audioCodecFound && !videoCodecFound;
      var edata = {
        levels: levels,
        audioTracks: audioTracks,
        subtitleTracks: subtitleTracks,
        firstLevel: this._firstLevel,
        stats: data.stats,
        audio: audioCodecFound,
        video: videoCodecFound,
        altAudio: !audioOnly && audioTracks.some(function (t) {
          return !!t.url;
        })
      };
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_PARSED, edata); // Initiate loading after all controllers have received MANIFEST_PARSED

      if (this.hls.config.autoStartLoad || this.hls.forceStartLoad) {
        this.hls.startLoad(this.hls.config.startPosition);
      }
    } else {
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
        type: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorTypes"].MEDIA_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].MANIFEST_INCOMPATIBLE_CODECS_ERROR,
        fatal: true,
        url: data.url,
        reason: 'no level with compatible codecs found in manifest'
      });
    }
  };

  _proto.onError = function onError(event, data) {
    _BasePlaylistControll.prototype.onError.call(this, event, data);

    if (data.fatal) {
      return;
    } // Switch to redundant level when track fails to load


    var context = data.context;
    var level = this._levels[this.currentLevelIndex];

    if (context && (context.type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].AUDIO_TRACK && level.audioGroupIds && context.groupId === level.audioGroupIds[level.urlId] || context.type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].SUBTITLE_TRACK && level.textGroupIds && context.groupId === level.textGroupIds[level.urlId])) {
      this.redundantFailover(this.currentLevelIndex);
      return;
    }

    var levelError = false;
    var levelSwitch = true;
    var levelIndex; // try to recover not fatal errors

    switch (data.details) {
      case _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].FRAG_LOAD_ERROR:
      case _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].FRAG_LOAD_TIMEOUT:
      case _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].KEY_LOAD_ERROR:
      case _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].KEY_LOAD_TIMEOUT:
        if (data.frag) {
          var _level = this._levels[data.frag.level]; // Set levelIndex when we're out of fragment retries

          if (_level) {
            _level.fragmentError++;

            if (_level.fragmentError > this.hls.config.fragLoadingMaxRetry) {
              levelIndex = data.frag.level;
            }
          } else {
            levelIndex = data.frag.level;
          }
        }

        break;

      case _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].LEVEL_LOAD_ERROR:
      case _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].LEVEL_LOAD_TIMEOUT:
        // Do not perform level switch if an error occurred using delivery directives
        // Attempt to reload level without directives first
        if (context) {
          if (context.deliveryDirectives) {
            levelSwitch = false;
          }

          levelIndex = context.level;
        }

        levelError = true;
        break;

      case _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].REMUX_ALLOC_ERROR:
        levelIndex = data.level;
        levelError = true;
        break;
    }

    if (levelIndex !== undefined) {
      this.recoverLevel(data, levelIndex, levelError, levelSwitch);
    }
  }
  /**
   * Switch to a redundant stream if any available.
   * If redundant stream is not available, emergency switch down if ABR mode is enabled.
   */
  ;

  _proto.recoverLevel = function recoverLevel(errorEvent, levelIndex, levelError, levelSwitch) {
    var errorDetails = errorEvent.details;
    var level = this._levels[levelIndex];
    level.loadError++;

    if (levelError) {
      var retrying = this.retryLoadingOrFail(errorEvent);

      if (retrying) {
        // boolean used to inform stream controller not to switch back to IDLE on non fatal error
        errorEvent.levelRetry = true;
      } else {
        this.currentLevelIndex = -1;
        return;
      }
    }

    if (levelSwitch) {
      var redundantLevels = level.url.length; // Try redundant fail-over until level.loadError reaches redundantLevels

      if (redundantLevels > 1 && level.loadError < redundantLevels) {
        errorEvent.levelRetry = true;
        this.redundantFailover(levelIndex);
      } else if (this.manualLevelIndex === -1) {
        // Search for available level in auto level selection mode, cycling from highest to lowest bitrate
        var nextLevel = levelIndex === 0 ? this._levels.length - 1 : levelIndex - 1;

        if (this.currentLevelIndex !== nextLevel && this._levels[nextLevel].loadError === 0) {
          this.warn(errorDetails + ": switch to " + nextLevel);
          errorEvent.levelRetry = true;
          this.hls.nextAutoLevel = nextLevel;
        }
      }
    }
  };

  _proto.redundantFailover = function redundantFailover(levelIndex) {
    var level = this._levels[levelIndex];
    var redundantLevels = level.url.length;

    if (redundantLevels > 1) {
      // Update the url id of all levels so that we stay on the same set of variants when level switching
      var newUrlId = (level.urlId + 1) % redundantLevels;
      this.warn("Switching to redundant URL-id " + newUrlId);

      this._levels.forEach(function (level) {
        level.urlId = newUrlId;
      });

      this.level = levelIndex;
    }
  } // reset errors on the successful load of a fragment
  ;

  _proto.onFragLoaded = function onFragLoaded(event, _ref3) {
    var frag = _ref3.frag;

    if (frag !== undefined && frag.type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN) {
      var level = this._levels[frag.level];

      if (level !== undefined) {
        level.fragmentError = 0;
        level.loadError = 0;
      }
    }
  };

  _proto.onLevelLoaded = function onLevelLoaded(event, data) {
    var _data$deliveryDirecti2;

    var level = data.level,
        details = data.details;
    var curLevel = this._levels[level];

    if (!curLevel) {
      var _data$deliveryDirecti;

      this.warn("Invalid level index " + level);

      if ((_data$deliveryDirecti = data.deliveryDirectives) !== null && _data$deliveryDirecti !== void 0 && _data$deliveryDirecti.skip) {
        details.deltaUpdateFailed = true;
      }

      return;
    } // only process level loaded events matching with expected level


    if (level === this.currentLevelIndex) {
      // reset level load error counter on successful level loaded only if there is no issues with fragments
      if (curLevel.fragmentError === 0) {
        curLevel.loadError = 0;
        this.retryCount = 0;
      }

      this.playlistLoaded(level, data, curLevel.details);
    } else if ((_data$deliveryDirecti2 = data.deliveryDirectives) !== null && _data$deliveryDirecti2 !== void 0 && _data$deliveryDirecti2.skip) {
      // received a delta playlist update that cannot be merged
      details.deltaUpdateFailed = true;
    }
  };

  _proto.onAudioTrackSwitched = function onAudioTrackSwitched(event, data) {
    var currentLevel = this.hls.levels[this.currentLevelIndex];

    if (!currentLevel) {
      return;
    }

    if (currentLevel.audioGroupIds) {
      var urlId = -1;
      var audioGroupId = this.hls.audioTracks[data.id].groupId;

      for (var i = 0; i < currentLevel.audioGroupIds.length; i++) {
        if (currentLevel.audioGroupIds[i] === audioGroupId) {
          urlId = i;
          break;
        }
      }

      if (urlId !== currentLevel.urlId) {
        currentLevel.urlId = urlId;
        this.startLoad();
      }
    }
  };

  _proto.loadPlaylist = function loadPlaylist(hlsUrlParameters) {
    var level = this.currentLevelIndex;
    var currentLevel = this._levels[level];

    if (this.canLoad && currentLevel && currentLevel.url.length > 0) {
      var id = currentLevel.urlId;
      var url = currentLevel.url[id];

      if (hlsUrlParameters) {
        try {
          url = hlsUrlParameters.addDirectives(url);
        } catch (error) {
          this.warn("Could not construct new URL with HLS Delivery Directives: " + error);
        }
      }

      this.log("Attempt loading level index " + level + (hlsUrlParameters ? ' at sn ' + hlsUrlParameters.msn + ' part ' + hlsUrlParameters.part : '') + " with URL-id " + id + " " + url); // console.log('Current audio track group ID:', this.hls.audioTracks[this.hls.audioTrack].groupId);
      // console.log('New video quality level audio group id:', levelObject.attrs.AUDIO, level);

      this.clearTimer();
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_LOADING, {
        url: url,
        level: level,
        id: id,
        deliveryDirectives: hlsUrlParameters || null
      });
    }
  };

  _proto.removeLevel = function removeLevel(levelIndex, urlId) {
    var filterLevelAndGroupByIdIndex = function filterLevelAndGroupByIdIndex(url, id) {
      return id !== urlId;
    };

    var levels = this._levels.filter(function (level, index) {
      if (index !== levelIndex) {
        return true;
      }

      if (level.url.length > 1 && urlId !== undefined) {
        level.url = level.url.filter(filterLevelAndGroupByIdIndex);

        if (level.audioGroupIds) {
          level.audioGroupIds = level.audioGroupIds.filter(filterLevelAndGroupByIdIndex);
        }

        if (level.textGroupIds) {
          level.textGroupIds = level.textGroupIds.filter(filterLevelAndGroupByIdIndex);
        }

        level.urlId = 0;
        return true;
      }

      return false;
    }).map(function (level, index) {
      var details = level.details;

      if (details !== null && details !== void 0 && details.fragments) {
        details.fragments.forEach(function (fragment) {
          fragment.level = index;
        });
      }

      return level;
    });

    this._levels = levels;
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVELS_UPDATED, {
      levels: levels
    });
  };

  _createClass(LevelController, [{
    key: "levels",
    get: function get() {
      if (this._levels.length === 0) {
        return null;
      }

      return this._levels;
    }
  }, {
    key: "level",
    get: function get() {
      return this.currentLevelIndex;
    },
    set: function set(newLevel) {
      var _levels$newLevel;

      var levels = this._levels;

      if (levels.length === 0) {
        return;
      }

      if (this.currentLevelIndex === newLevel && (_levels$newLevel = levels[newLevel]) !== null && _levels$newLevel !== void 0 && _levels$newLevel.details) {
        return;
      } // check if level idx is valid


      if (newLevel < 0 || newLevel >= levels.length) {
        // invalid level id given, trigger error
        var fatal = newLevel < 0;
        this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
          type: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorTypes"].OTHER_ERROR,
          details: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].LEVEL_SWITCH_ERROR,
          level: newLevel,
          fatal: fatal,
          reason: 'invalid level idx'
        });

        if (fatal) {
          return;
        }

        newLevel = Math.min(newLevel, levels.length - 1);
      } // stopping live reloading timer if any


      this.clearTimer();
      var lastLevelIndex = this.currentLevelIndex;
      var lastLevel = levels[lastLevelIndex];
      var level = levels[newLevel];
      this.log("switching to level " + newLevel + " from " + lastLevelIndex);
      this.currentLevelIndex = newLevel;

      var levelSwitchingData = _extends({}, level, {
        level: newLevel,
        maxBitrate: level.maxBitrate,
        uri: level.uri,
        urlId: level.urlId
      }); // @ts-ignore


      delete levelSwitchingData._urlId;
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_SWITCHING, levelSwitchingData); // check if we need to load playlist for this level

      var levelDetails = level.details;

      if (!levelDetails || levelDetails.live) {
        // level not retrieved yet, or live playlist we need to (re)load it
        var hlsUrlParameters = this.switchParams(level.uri, lastLevel === null || lastLevel === void 0 ? void 0 : lastLevel.details);
        this.loadPlaylist(hlsUrlParameters);
      }
    }
  }, {
    key: "manualLevel",
    get: function get() {
      return this.manualLevelIndex;
    },
    set: function set(newLevel) {
      this.manualLevelIndex = newLevel;

      if (this._startLevel === undefined) {
        this._startLevel = newLevel;
      }

      if (newLevel !== -1) {
        this.level = newLevel;
      }
    }
  }, {
    key: "firstLevel",
    get: function get() {
      return this._firstLevel;
    },
    set: function set(newLevel) {
      this._firstLevel = newLevel;
    }
  }, {
    key: "startLevel",
    get: function get() {
      // hls.startLevel takes precedence over config.startLevel
      // if none of these values are defined, fallback on this._firstLevel (first quality level appearing in variant manifest)
      if (this._startLevel === undefined) {
        var configStartLevel = this.hls.config.startLevel;

        if (configStartLevel !== undefined) {
          return configStartLevel;
        } else {
          return this._firstLevel;
        }
      } else {
        return this._startLevel;
      }
    },
    set: function set(newLevel) {
      this._startLevel = newLevel;
    }
  }, {
    key: "nextLoadLevel",
    get: function get() {
      if (this.manualLevelIndex !== -1) {
        return this.manualLevelIndex;
      } else {
        return this.hls.nextAutoLevel;
      }
    },
    set: function set(nextLevel) {
      this.level = nextLevel;

      if (this.manualLevelIndex === -1) {
        this.hls.nextAutoLevel = nextLevel;
      }
    }
  }]);

  return LevelController;
}(_base_playlist_controller__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/controller/level-helper.ts":
/*!****************************************!*\
  !*** ./src/controller/level-helper.ts ***!
  \****************************************/
/*! exports provided: addGroupId, assignTrackIdsByGroup, updatePTS, updateFragPTSDTS, mergeDetails, mapPartIntersection, mapFragmentIntersection, adjustSliding, addSliding, computeReloadInterval, getFragmentWithSN, getPartWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addGroupId", function() { return addGroupId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignTrackIdsByGroup", function() { return assignTrackIdsByGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePTS", function() { return updatePTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFragPTSDTS", function() { return updateFragPTSDTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDetails", function() { return mergeDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapPartIntersection", function() { return mapPartIntersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapFragmentIntersection", function() { return mapFragmentIntersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustSliding", function() { return adjustSliding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSliding", function() { return addSliding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeReloadInterval", function() { return computeReloadInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragmentWithSN", function() { return getFragmentWithSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPartWith", function() { return getPartWith; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");






/**
 * @module LevelHelper
 * Providing methods dealing with playlist sliding and drift
 * */

function addGroupId(level, type, id) {
  switch (type) {
    case 'audio':
      if (!level.audioGroupIds) {
        level.audioGroupIds = [];
      }

      level.audioGroupIds.push(id);
      break;

    case 'text':
      if (!level.textGroupIds) {
        level.textGroupIds = [];
      }

      level.textGroupIds.push(id);
      break;
  }
}
function assignTrackIdsByGroup(tracks) {
  var groups = {};
  tracks.forEach(function (track) {
    var groupId = track.groupId || '';
    track.id = groups[groupId] = groups[groupId] || 0;
    groups[groupId]++;
  });
}
function updatePTS(fragments, fromIdx, toIdx) {
  var fragFrom = fragments[fromIdx];
  var fragTo = fragments[toIdx];
  updateFromToPTS(fragFrom, fragTo);
}

function updateFromToPTS(fragFrom, fragTo) {
  var fragToPTS = fragTo.startPTS; // if we know startPTS[toIdx]

  if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(fragToPTS)) {
    // update fragment duration.
    // it helps to fix drifts between playlist reported duration and fragment real duration
    var duration = 0;
    var frag;

    if (fragTo.sn > fragFrom.sn) {
      duration = fragToPTS - fragFrom.start;
      frag = fragFrom;
    } else {
      duration = fragFrom.start - fragToPTS;
      frag = fragTo;
    } // TODO? Drift can go either way, or the playlist could be completely accurate
    // console.assert(duration > 0,
    //   `duration of ${duration} computed for frag ${frag.sn}, level ${frag.level}, there should be some duration drift between playlist and fragment!`);


    if (frag.duration !== duration) {
      frag.duration = duration;
    } // we dont know startPTS[toIdx]

  } else if (fragTo.sn > fragFrom.sn) {
    var contiguous = fragFrom.cc === fragTo.cc; // TODO: With part-loading end/durations we need to confirm the whole fragment is loaded before using (or setting) minEndPTS

    if (contiguous && fragFrom.minEndPTS) {
      fragTo.start = fragFrom.start + (fragFrom.minEndPTS - fragFrom.start);
    } else {
      fragTo.start = fragFrom.start + fragFrom.duration;
    }
  } else {
    fragTo.start = Math.max(fragFrom.start - fragTo.duration, 0);
  }
}

function updateFragPTSDTS(details, frag, startPTS, endPTS, startDTS, endDTS) {
  var parsedMediaDuration = endPTS - startPTS;

  if (parsedMediaDuration <= 0) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_1__["logger"].warn('Fragment should have a positive duration', frag);
    endPTS = startPTS + frag.duration;
    endDTS = startDTS + frag.duration;
  }

  var maxStartPTS = startPTS;
  var minEndPTS = endPTS;
  var fragStartPts = frag.startPTS;
  var fragEndPts = frag.endPTS;

  if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(fragStartPts)) {
    // delta PTS between audio and video
    var deltaPTS = Math.abs(fragStartPts - startPTS);

    if (!Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(frag.deltaPTS)) {
      frag.deltaPTS = deltaPTS;
    } else {
      frag.deltaPTS = Math.max(deltaPTS, frag.deltaPTS);
    }

    maxStartPTS = Math.max(startPTS, fragStartPts);
    startPTS = Math.min(startPTS, fragStartPts);
    startDTS = Math.min(startDTS, frag.startDTS);
    minEndPTS = Math.min(endPTS, fragEndPts);
    endPTS = Math.max(endPTS, fragEndPts);
    endDTS = Math.max(endDTS, frag.endDTS);
  }

  frag.duration = endPTS - startPTS;
  var drift = startPTS - frag.start;
  frag.appendedPTS = endPTS;
  frag.start = frag.startPTS = startPTS;
  frag.maxStartPTS = maxStartPTS;
  frag.startDTS = startDTS;
  frag.endPTS = endPTS;
  frag.minEndPTS = minEndPTS;
  frag.endDTS = endDTS;
  var sn = frag.sn; // 'initSegment'
  // exit if sn out of range

  if (!details || sn < details.startSN || sn > details.endSN) {
    return 0;
  }

  var i;
  var fragIdx = sn - details.startSN;
  var fragments = details.fragments; // update frag reference in fragments array
  // rationale is that fragments array might not contain this frag object.
  // this will happen if playlist has been refreshed between frag loading and call to updateFragPTSDTS()
  // if we don't update frag, we won't be able to propagate PTS info on the playlist
  // resulting in invalid sliding computation

  fragments[fragIdx] = frag; // adjust fragment PTS/duration from seqnum-1 to frag 0

  for (i = fragIdx; i > 0; i--) {
    updateFromToPTS(fragments[i], fragments[i - 1]);
  } // adjust fragment PTS/duration from seqnum to last frag


  for (i = fragIdx; i < fragments.length - 1; i++) {
    updateFromToPTS(fragments[i], fragments[i + 1]);
  }

  if (details.fragmentHint) {
    updateFromToPTS(fragments[fragments.length - 1], details.fragmentHint);
  }

  details.PTSKnown = details.alignedSliding = true;
  return drift;
}
function mergeDetails(oldDetails, newDetails) {
  // Track the last initSegment processed. Initialize it to the last one on the timeline.
  var currentInitSegment = null;
  var oldFragments = oldDetails.fragments;

  for (var i = oldFragments.length - 1; i >= 0; i--) {
    var oldInit = oldFragments[i].initSegment;

    if (oldInit) {
      currentInitSegment = oldInit;
      break;
    }
  }

  if (oldDetails.fragmentHint) {
    // prevent PTS and duration from being adjusted on the next hint
    delete oldDetails.fragmentHint.endPTS;
  } // check if old/new playlists have fragments in common
  // loop through overlapping SN and update startPTS , cc, and duration if any found


  var ccOffset = 0;
  var PTSFrag;
  mapFragmentIntersection(oldDetails, newDetails, function (oldFrag, newFrag) {
    var _currentInitSegment;

    if (oldFrag.relurl) {
      // Do not compare CC if the old fragment has no url. This is a level.fragmentHint used by LL-HLS parts.
      // It maybe be off by 1 if it was created before any parts or discontinuity tags were appended to the end
      // of the playlist.
      ccOffset = oldFrag.cc - newFrag.cc;
    }

    if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(oldFrag.startPTS) && Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(oldFrag.endPTS)) {
      newFrag.start = newFrag.startPTS = oldFrag.startPTS;
      newFrag.startDTS = oldFrag.startDTS;
      newFrag.appendedPTS = oldFrag.appendedPTS;
      newFrag.maxStartPTS = oldFrag.maxStartPTS;
      newFrag.endPTS = oldFrag.endPTS;
      newFrag.endDTS = oldFrag.endDTS;
      newFrag.minEndPTS = oldFrag.minEndPTS;
      newFrag.duration = oldFrag.endPTS - oldFrag.startPTS;

      if (newFrag.duration) {
        PTSFrag = newFrag;
      } // PTS is known when any segment has startPTS and endPTS


      newDetails.PTSKnown = newDetails.alignedSliding = true;
    }

    newFrag.elementaryStreams = oldFrag.elementaryStreams;
    newFrag.loader = oldFrag.loader;
    newFrag.stats = oldFrag.stats;
    newFrag.urlId = oldFrag.urlId;

    if (oldFrag.initSegment) {
      newFrag.initSegment = oldFrag.initSegment;
      currentInitSegment = oldFrag.initSegment;
    } else if (!newFrag.initSegment || newFrag.initSegment.relurl == ((_currentInitSegment = currentInitSegment) === null || _currentInitSegment === void 0 ? void 0 : _currentInitSegment.relurl)) {
      newFrag.initSegment = currentInitSegment;
    }
  });

  if (newDetails.skippedSegments) {
    newDetails.deltaUpdateFailed = newDetails.fragments.some(function (frag) {
      return !frag;
    });

    if (newDetails.deltaUpdateFailed) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_1__["logger"].warn('[level-helper] Previous playlist missing segments skipped in delta playlist');

      for (var _i = newDetails.skippedSegments; _i--;) {
        newDetails.fragments.shift();
      }

      newDetails.startSN = newDetails.fragments[0].sn;
      newDetails.startCC = newDetails.fragments[0].cc;
    }
  }

  var newFragments = newDetails.fragments;

  if (ccOffset) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_1__["logger"].warn('discontinuity sliding from playlist, take drift into account');

    for (var _i2 = 0; _i2 < newFragments.length; _i2++) {
      newFragments[_i2].cc += ccOffset;
    }
  }

  if (newDetails.skippedSegments) {
    newDetails.startCC = newDetails.fragments[0].cc;
  } // Merge parts


  mapPartIntersection(oldDetails.partList, newDetails.partList, function (oldPart, newPart) {
    newPart.elementaryStreams = oldPart.elementaryStreams;
    newPart.stats = oldPart.stats;
  }); // if at least one fragment contains PTS info, recompute PTS information for all fragments

  if (PTSFrag) {
    updateFragPTSDTS(newDetails, PTSFrag, PTSFrag.startPTS, PTSFrag.endPTS, PTSFrag.startDTS, PTSFrag.endDTS);
  } else {
    // ensure that delta is within oldFragments range
    // also adjust sliding in case delta is 0 (we could have old=[50-60] and new=old=[50-61])
    // in that case we also need to adjust start offset of all fragments
    adjustSliding(oldDetails, newDetails);
  }

  if (newFragments.length) {
    newDetails.totalduration = newDetails.edge - newFragments[0].start;
  }

  newDetails.driftStartTime = oldDetails.driftStartTime;
  newDetails.driftStart = oldDetails.driftStart;
  var advancedDateTime = newDetails.advancedDateTime;

  if (newDetails.advanced && advancedDateTime) {
    var edge = newDetails.edge;

    if (!newDetails.driftStart) {
      newDetails.driftStartTime = advancedDateTime;
      newDetails.driftStart = edge;
    }

    newDetails.driftEndTime = advancedDateTime;
    newDetails.driftEnd = edge;
  } else {
    newDetails.driftEndTime = oldDetails.driftEndTime;
    newDetails.driftEnd = oldDetails.driftEnd;
    newDetails.advancedDateTime = oldDetails.advancedDateTime;
  }
}
function mapPartIntersection(oldParts, newParts, intersectionFn) {
  if (oldParts && newParts) {
    var delta = 0;

    for (var i = 0, len = oldParts.length; i <= len; i++) {
      var _oldPart = oldParts[i];
      var _newPart = newParts[i + delta];

      if (_oldPart && _newPart && _oldPart.index === _newPart.index && _oldPart.fragment.sn === _newPart.fragment.sn) {
        intersectionFn(_oldPart, _newPart);
      } else {
        delta--;
      }
    }
  }
}
function mapFragmentIntersection(oldDetails, newDetails, intersectionFn) {
  var skippedSegments = newDetails.skippedSegments;
  var start = Math.max(oldDetails.startSN, newDetails.startSN) - newDetails.startSN;
  var end = (oldDetails.fragmentHint ? 1 : 0) + (skippedSegments ? newDetails.endSN : Math.min(oldDetails.endSN, newDetails.endSN)) - newDetails.startSN;
  var delta = newDetails.startSN - oldDetails.startSN;
  var newFrags = newDetails.fragmentHint ? newDetails.fragments.concat(newDetails.fragmentHint) : newDetails.fragments;
  var oldFrags = oldDetails.fragmentHint ? oldDetails.fragments.concat(oldDetails.fragmentHint) : oldDetails.fragments;

  for (var i = start; i <= end; i++) {
    var _oldFrag = oldFrags[delta + i];
    var _newFrag = newFrags[i];

    if (skippedSegments && !_newFrag && i < skippedSegments) {
      // Fill in skipped segments in delta playlist
      _newFrag = newDetails.fragments[i] = _oldFrag;
    }

    if (_oldFrag && _newFrag) {
      intersectionFn(_oldFrag, _newFrag);
    }
  }
}
function adjustSliding(oldDetails, newDetails) {
  var delta = newDetails.startSN + newDetails.skippedSegments - oldDetails.startSN;
  var oldFragments = oldDetails.fragments;

  if (delta < 0 || delta >= oldFragments.length) {
    return;
  }

  addSliding(newDetails, oldFragments[delta].start);
}
function addSliding(details, start) {
  if (start) {
    var fragments = details.fragments;

    for (var i = details.skippedSegments; i < fragments.length; i++) {
      fragments[i].start += start;
    }

    if (details.fragmentHint) {
      details.fragmentHint.start += start;
    }
  }
}
function computeReloadInterval(newDetails, stats) {
  var reloadInterval = 1000 * newDetails.levelTargetDuration;
  var reloadIntervalAfterMiss = reloadInterval / 2;
  var timeSinceLastModified = newDetails.age;
  var useLastModified = timeSinceLastModified > 0 && timeSinceLastModified < reloadInterval * 3;
  var roundTrip = stats.loading.end - stats.loading.start;
  var estimatedTimeUntilUpdate;
  var availabilityDelay = newDetails.availabilityDelay; // let estimate = 'average';

  if (newDetails.updated === false) {
    if (useLastModified) {
      // estimate = 'miss round trip';
      // We should have had a hit so try again in the time it takes to get a response,
      // but no less than 1/3 second.
      var minRetry = 333 * newDetails.misses;
      estimatedTimeUntilUpdate = Math.max(Math.min(reloadIntervalAfterMiss, roundTrip * 2), minRetry);
      newDetails.availabilityDelay = (newDetails.availabilityDelay || 0) + estimatedTimeUntilUpdate;
    } else {
      // estimate = 'miss half average';
      // follow HLS Spec, If the client reloads a Playlist file and finds that it has not
      // changed then it MUST wait for a period of one-half the target
      // duration before retrying.
      estimatedTimeUntilUpdate = reloadIntervalAfterMiss;
    }
  } else if (useLastModified) {
    // estimate = 'next modified date';
    // Get the closest we've been to timeSinceLastModified on update
    availabilityDelay = Math.min(availabilityDelay || reloadInterval / 2, timeSinceLastModified);
    newDetails.availabilityDelay = availabilityDelay;
    estimatedTimeUntilUpdate = availabilityDelay + reloadInterval - timeSinceLastModified;
  } else {
    estimatedTimeUntilUpdate = reloadInterval - roundTrip;
  } // console.log(`[computeReloadInterval] live reload ${newDetails.updated ? 'REFRESHED' : 'MISSED'}`,
  //   '\n  method', estimate,
  //   '\n  estimated time until update =>', estimatedTimeUntilUpdate,
  //   '\n  average target duration', reloadInterval,
  //   '\n  time since modified', timeSinceLastModified,
  //   '\n  time round trip', roundTrip,
  //   '\n  availability delay', availabilityDelay);


  return Math.round(estimatedTimeUntilUpdate);
}
function getFragmentWithSN(level, sn, fragCurrent) {
  if (!level || !level.details) {
    return null;
  }

  var levelDetails = level.details;
  var fragment = levelDetails.fragments[sn - levelDetails.startSN];

  if (fragment) {
    return fragment;
  }

  fragment = levelDetails.fragmentHint;

  if (fragment && fragment.sn === sn) {
    return fragment;
  }

  if (sn < levelDetails.startSN && fragCurrent && fragCurrent.sn === sn) {
    return fragCurrent;
  }

  return null;
}
function getPartWith(level, sn, partIndex) {
  if (!level || !level.details) {
    return null;
  }

  var partList = level.details.partList;

  if (partList) {
    for (var i = partList.length; i--;) {
      var part = partList[i];

      if (part.index === partIndex && part.fragment.sn === sn) {
        return part;
      }
    }
  }

  return null;
}

/***/ }),

/***/ "./src/controller/stream-controller.ts":
/*!*********************************************!*\
  !*** ./src/controller/stream-controller.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StreamController; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-stream-controller */ "./src/controller/base-stream-controller.ts");
/* harmony import */ var _is_supported__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../is-supported */ "./src/is-supported.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/buffer-helper */ "./src/utils/buffer-helper.ts");
/* harmony import */ var _fragment_tracker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fragment-tracker */ "./src/controller/fragment-tracker.ts");
/* harmony import */ var _types_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/loader */ "./src/types/loader.ts");
/* harmony import */ var _loader_fragment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loader/fragment */ "./src/loader/fragment.ts");
/* harmony import */ var _demux_transmuxer_interface__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../demux/transmuxer-interface */ "./src/demux/transmuxer-interface.ts");
/* harmony import */ var _types_transmuxer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../types/transmuxer */ "./src/types/transmuxer.ts");
/* harmony import */ var _gap_controller__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./gap-controller */ "./src/controller/gap-controller.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");



function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var TICK_INTERVAL = 100; // how often to tick in ms

var StreamController = /*#__PURE__*/function (_BaseStreamController) {
  _inheritsLoose(StreamController, _BaseStreamController);

  function StreamController(hls, fragmentTracker) {
    var _this;

    _this = _BaseStreamController.call(this, hls, fragmentTracker, '[stream-controller]') || this;
    _this.audioCodecSwap = false;
    _this.gapController = null;
    _this.level = -1;
    _this._forceStartLoad = false;
    _this.altAudio = false;
    _this.audioOnly = false;
    _this.fragPlaying = null;
    _this.onvplaying = null;
    _this.onvseeked = null;
    _this.fragLastKbps = 0;
    _this.stalled = false;
    _this.couldBacktrack = false;
    _this.audioCodecSwitch = false;
    _this.videoBuffer = null;

    _this._registerListeners();

    return _this;
  }

  var _proto = StreamController.prototype;

  _proto._registerListeners = function _registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MEDIA_ATTACHED, this.onMediaAttached, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MANIFEST_LOADING, this.onManifestLoading, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MANIFEST_PARSED, this.onManifestParsed, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].LEVEL_LOADING, this.onLevelLoading, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].LEVEL_LOADED, this.onLevelLoaded, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].ERROR, this.onError, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_CREATED, this.onBufferCreated, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_FLUSHED, this.onBufferFlushed, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].LEVELS_UPDATED, this.onLevelsUpdated, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_BUFFERED, this.onFragBuffered, this);
  };

  _proto._unregisterListeners = function _unregisterListeners() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MEDIA_ATTACHED, this.onMediaAttached, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MEDIA_DETACHING, this.onMediaDetaching, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MANIFEST_LOADING, this.onManifestLoading, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].MANIFEST_PARSED, this.onManifestParsed, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].LEVEL_LOADED, this.onLevelLoaded, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].ERROR, this.onError, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_CREATED, this.onBufferCreated, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_FLUSHED, this.onBufferFlushed, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].LEVELS_UPDATED, this.onLevelsUpdated, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_BUFFERED, this.onFragBuffered, this);
  };

  _proto.onHandlerDestroying = function onHandlerDestroying() {
    this._unregisterListeners();

    this.onMediaDetaching();
  };

  _proto.startLoad = function startLoad(startPosition) {
    if (this.levels) {
      var lastCurrentTime = this.lastCurrentTime,
          hls = this.hls;
      this.stopLoad();
      this.setInterval(TICK_INTERVAL);
      this.level = -1;
      this.fragLoadError = 0;

      if (!this.startFragRequested) {
        // determine load level
        var startLevel = hls.startLevel;

        if (startLevel === -1) {
          if (hls.config.testBandwidth) {
            // -1 : guess start Level by doing a bitrate test by loading first fragment of lowest quality level
            startLevel = 0;
            this.bitrateTest = true;
          } else {
            startLevel = hls.nextAutoLevel;
          }
        } // set new level to playlist loader : this will trigger start level load
        // hls.nextLoadLevel remains until it is set to a new value or until a new frag is successfully loaded


        this.level = hls.nextLoadLevel = startLevel;
        this.loadedmetadata = false;
      } // if startPosition undefined but lastCurrentTime set, set startPosition to last currentTime


      if (lastCurrentTime > 0 && startPosition === -1) {
        this.log("Override startPosition with lastCurrentTime @" + lastCurrentTime.toFixed(3));
        startPosition = lastCurrentTime;
      }

      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
      this.nextLoadPosition = this.startPosition = this.lastCurrentTime = startPosition;
      this.tick();
    } else {
      this._forceStartLoad = true;
      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].STOPPED;
    }
  };

  _proto.stopLoad = function stopLoad() {
    this._forceStartLoad = false;

    _BaseStreamController.prototype.stopLoad.call(this);
  };

  _proto.doTick = function doTick() {
    switch (this.state) {
      case _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE:
        this.doTickIdle();
        break;

      case _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].WAITING_LEVEL:
        {
          var _levels$level;

          var levels = this.levels,
              level = this.level;
          var details = levels === null || levels === void 0 ? void 0 : (_levels$level = levels[level]) === null || _levels$level === void 0 ? void 0 : _levels$level.details;

          if (details && (!details.live || this.levelLastLoaded === this.level)) {
            if (this.waitForCdnTuneIn(details)) {
              break;
            }

            this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
            break;
          }

          break;
        }

      case _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].FRAG_LOADING_WAITING_RETRY:
        {
          var _this$media;

          var now = self.performance.now();
          var retryDate = this.retryDate; // if current time is gt than retryDate, or if media seeking let's switch to IDLE state to retry loading

          if (!retryDate || now >= retryDate || (_this$media = this.media) !== null && _this$media !== void 0 && _this$media.seeking) {
            this.log('retryDate reached, switch back to IDLE state');
            this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
          }
        }
        break;

      default:
        break;
    } // check buffer
    // check/update current fragment


    this.onTickEnd();
  };

  _proto.onTickEnd = function onTickEnd() {
    _BaseStreamController.prototype.onTickEnd.call(this);

    this.checkBuffer();
    this.checkFragmentChanged();
  };

  _proto.doTickIdle = function doTickIdle() {
    var _frag$decryptdata, _frag$decryptdata2;

    var hls = this.hls,
        levelLastLoaded = this.levelLastLoaded,
        levels = this.levels,
        media = this.media;
    var config = hls.config,
        level = hls.nextLoadLevel; // if start level not parsed yet OR
    // if video not attached AND start fragment already requested OR start frag prefetch not enabled
    // exit loop, as we either need more info (level not parsed) or we need media to be attached to load new fragment

    if (levelLastLoaded === null || !media && (this.startFragRequested || !config.startFragPrefetch)) {
      return;
    } // If the "main" level is audio-only but we are loading an alternate track in the same group, do not load anything


    if (this.altAudio && this.audioOnly) {
      return;
    }

    if (!levels || !levels[level]) {
      return;
    }

    var levelInfo = levels[level]; // if buffer length is less than maxBufLen try to load a new fragment
    // set next load level : this will trigger a playlist load if needed

    this.level = hls.nextLoadLevel = level;
    var levelDetails = levelInfo.details; // if level info not retrieved yet, switch state and wait for level retrieval
    // if live playlist, ensure that new playlist has been refreshed to avoid loading/try to load
    // a useless and outdated fragment (that might even introduce load error if it is already out of the live playlist)

    if (!levelDetails || this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].WAITING_LEVEL || levelDetails.live && this.levelLastLoaded !== level) {
      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].WAITING_LEVEL;
      return;
    }

    var bufferInfo = this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : media, _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN);

    if (bufferInfo === null) {
      return;
    }

    var bufferLen = bufferInfo.len; // compute max Buffer Length that we could get from this load level, based on level bitrate. don't buffer more than 60 MB and more than 30s

    var maxBufLen = this.getMaxBufferLength(levelInfo.maxBitrate); // Stay idle if we are still with buffer margins

    if (bufferLen >= maxBufLen) {
      return;
    }

    if (this._streamEnded(bufferInfo, levelDetails)) {
      var data = {};

      if (this.altAudio) {
        data.type = 'video';
      }

      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_EOS, data);
      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].ENDED;
      return;
    }

    var targetBufferTime = bufferInfo.end;
    var frag = this.getNextFragment(targetBufferTime, levelDetails); // Avoid backtracking after seeking or switching by loading an earlier segment in streams that could backtrack

    if (this.couldBacktrack && !this.fragPrevious && frag && frag.sn !== 'initSegment') {
      var fragIdx = frag.sn - levelDetails.startSN;

      if (fragIdx > 1) {
        frag = levelDetails.fragments[fragIdx - 1];
        this.fragmentTracker.removeFragment(frag);
      }
    } // Avoid loop loading by using nextLoadPosition set for backtracking


    if (frag && this.fragmentTracker.getState(frag) === _fragment_tracker__WEBPACK_IMPORTED_MODULE_5__["FragmentState"].OK && this.nextLoadPosition > targetBufferTime) {
      // Cleanup the fragment tracker before trying to find the next unbuffered fragment
      var type = this.audioOnly && !this.altAudio ? _loader_fragment__WEBPACK_IMPORTED_MODULE_7__["ElementaryStreamTypes"].AUDIO : _loader_fragment__WEBPACK_IMPORTED_MODULE_7__["ElementaryStreamTypes"].VIDEO;
      this.afterBufferFlushed(media, type, _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN);
      frag = this.getNextFragment(this.nextLoadPosition, levelDetails);
    }

    if (!frag) {
      return;
    }

    if (frag.initSegment && !frag.initSegment.data && !this.bitrateTest) {
      frag = frag.initSegment;
    } // We want to load the key if we're dealing with an identity key, because we will decrypt
    // this content using the key we fetch. Other keys will be handled by the DRM CDM via EME.


    if (((_frag$decryptdata = frag.decryptdata) === null || _frag$decryptdata === void 0 ? void 0 : _frag$decryptdata.keyFormat) === 'identity' && !((_frag$decryptdata2 = frag.decryptdata) !== null && _frag$decryptdata2 !== void 0 && _frag$decryptdata2.key)) {
      this.loadKey(frag, levelDetails);
    } else {
      this.loadFragment(frag, levelDetails, targetBufferTime);
    }
  };

  _proto.loadFragment = function loadFragment(frag, levelDetails, targetBufferTime) {
    var _this$media2;

    // Check if fragment is not loaded
    var fragState = this.fragmentTracker.getState(frag);
    this.fragCurrent = frag; // Use data from loaded backtracked fragment if available

    if (fragState === _fragment_tracker__WEBPACK_IMPORTED_MODULE_5__["FragmentState"].BACKTRACKED) {
      var data = this.fragmentTracker.getBacktrackData(frag);

      if (data) {
        this._handleFragmentLoadProgress(data);

        this._handleFragmentLoadComplete(data);

        return;
      } else {
        fragState = _fragment_tracker__WEBPACK_IMPORTED_MODULE_5__["FragmentState"].NOT_LOADED;
      }
    }

    if (fragState === _fragment_tracker__WEBPACK_IMPORTED_MODULE_5__["FragmentState"].NOT_LOADED || fragState === _fragment_tracker__WEBPACK_IMPORTED_MODULE_5__["FragmentState"].PARTIAL) {
      if (frag.sn === 'initSegment') {
        this._loadInitSegment(frag);
      } else if (this.bitrateTest) {
        frag.bitrateTest = true;
        this.log("Fragment " + frag.sn + " of level " + frag.level + " is being downloaded to test bitrate and will not be buffered");

        this._loadBitrateTestFrag(frag);
      } else {
        this.startFragRequested = true;

        _BaseStreamController.prototype.loadFragment.call(this, frag, levelDetails, targetBufferTime);
      }
    } else if (fragState === _fragment_tracker__WEBPACK_IMPORTED_MODULE_5__["FragmentState"].APPENDING) {
      // Lower the buffer size and try again
      if (this.reduceMaxBufferLength(frag.duration)) {
        this.fragmentTracker.removeFragment(frag);
      }
    } else if (((_this$media2 = this.media) === null || _this$media2 === void 0 ? void 0 : _this$media2.buffered.length) === 0) {
      // Stop gap for bad tracker / buffer flush behavior
      this.fragmentTracker.removeAllFragments();
    }
  };

  _proto.getAppendedFrag = function getAppendedFrag(position) {
    var fragOrPart = this.fragmentTracker.getAppendedFrag(position, _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN);

    if (fragOrPart && 'fragment' in fragOrPart) {
      return fragOrPart.fragment;
    }

    return fragOrPart;
  };

  _proto.getBufferedFrag = function getBufferedFrag(position) {
    return this.fragmentTracker.getBufferedFrag(position, _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN);
  };

  _proto.followingBufferedFrag = function followingBufferedFrag(frag) {
    if (frag) {
      // try to get range of next fragment (500ms after this range)
      return this.getBufferedFrag(frag.end + 0.5);
    }

    return null;
  }
  /*
    on immediate level switch :
     - pause playback if playing
     - cancel any pending load request
     - and trigger a buffer flush
  */
  ;

  _proto.immediateLevelSwitch = function immediateLevelSwitch() {
    this.abortCurrentFrag();
    this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
  }
  /**
   * try to switch ASAP without breaking video playback:
   * in order to ensure smooth but quick level switching,
   * we need to find the next flushable buffer range
   * we should take into account new segment fetch time
   */
  ;

  _proto.nextLevelSwitch = function nextLevelSwitch() {
    var levels = this.levels,
        media = this.media; // ensure that media is defined and that metadata are available (to retrieve currentTime)

    if (media !== null && media !== void 0 && media.readyState) {
      var fetchdelay;
      var fragPlayingCurrent = this.getAppendedFrag(media.currentTime);

      if (fragPlayingCurrent && fragPlayingCurrent.start > 1) {
        // flush buffer preceding current fragment (flush until current fragment start offset)
        // minus 1s to avoid video freezing, that could happen if we flush keyframe of current video ...
        this.flushMainBuffer(0, fragPlayingCurrent.start - 1);
      }

      if (!media.paused && levels) {
        // add a safety delay of 1s
        var nextLevelId = this.hls.nextLoadLevel;
        var nextLevel = levels[nextLevelId];
        var fragLastKbps = this.fragLastKbps;

        if (fragLastKbps && this.fragCurrent) {
          fetchdelay = this.fragCurrent.duration * nextLevel.maxBitrate / (1000 * fragLastKbps) + 1;
        } else {
          fetchdelay = 0;
        }
      } else {
        fetchdelay = 0;
      } // this.log('fetchdelay:'+fetchdelay);
      // find buffer range that will be reached once new fragment will be fetched


      var bufferedFrag = this.getBufferedFrag(media.currentTime + fetchdelay);

      if (bufferedFrag) {
        // we can flush buffer range following this one without stalling playback
        var nextBufferedFrag = this.followingBufferedFrag(bufferedFrag);

        if (nextBufferedFrag) {
          // if we are here, we can also cancel any loading/demuxing in progress, as they are useless
          this.abortCurrentFrag(); // start flush position is in next buffered frag. Leave some padding for non-independent segments and smoother playback.

          var maxStart = nextBufferedFrag.maxStartPTS ? nextBufferedFrag.maxStartPTS : nextBufferedFrag.start;
          var fragDuration = nextBufferedFrag.duration;
          var startPts = Math.max(bufferedFrag.end, maxStart + Math.min(Math.max(fragDuration - this.config.maxFragLookUpTolerance, fragDuration * 0.5), fragDuration * 0.75));
          this.flushMainBuffer(startPts, Number.POSITIVE_INFINITY);
        }
      }
    }
  };

  _proto.abortCurrentFrag = function abortCurrentFrag() {
    var fragCurrent = this.fragCurrent;
    this.fragCurrent = null;

    if (fragCurrent !== null && fragCurrent !== void 0 && fragCurrent.loader) {
      fragCurrent.loader.abort();
    }

    if (this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].KEY_LOADING) {
      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
    }

    this.nextLoadPosition = this.getLoadPosition();
  };

  _proto.flushMainBuffer = function flushMainBuffer(startOffset, endOffset) {
    _BaseStreamController.prototype.flushMainBuffer.call(this, startOffset, endOffset, this.altAudio ? 'video' : null);
  };

  _proto.onMediaAttached = function onMediaAttached(event, data) {
    _BaseStreamController.prototype.onMediaAttached.call(this, event, data);

    var media = data.media;
    this.onvplaying = this.onMediaPlaying.bind(this);
    this.onvseeked = this.onMediaSeeked.bind(this);
    media.addEventListener('playing', this.onvplaying);
    media.addEventListener('seeked', this.onvseeked);
    this.gapController = new _gap_controller__WEBPACK_IMPORTED_MODULE_10__["default"](this.config, media, this.fragmentTracker, this.hls);
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    var media = this.media;

    if (media) {
      media.removeEventListener('playing', this.onvplaying);
      media.removeEventListener('seeked', this.onvseeked);
      this.onvplaying = this.onvseeked = null;
      this.videoBuffer = null;
    }

    this.fragPlaying = null;

    if (this.gapController) {
      this.gapController.destroy();
      this.gapController = null;
    }

    _BaseStreamController.prototype.onMediaDetaching.call(this);
  };

  _proto.onMediaPlaying = function onMediaPlaying() {
    // tick to speed up FRAG_CHANGED triggering
    this.tick();
  };

  _proto.onMediaSeeked = function onMediaSeeked() {
    var media = this.media;
    var currentTime = media ? media.currentTime : null;

    if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(currentTime)) {
      this.log("Media seeked to " + currentTime.toFixed(3));
    } // tick to speed up FRAG_CHANGED triggering


    this.tick();
  };

  _proto.onManifestLoading = function onManifestLoading() {
    // reset buffer on manifest loading
    this.log('Trigger BUFFER_RESET');
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_RESET, undefined);
    this.fragmentTracker.removeAllFragments();
    this.couldBacktrack = this.stalled = false;
    this.startPosition = this.lastCurrentTime = 0;
    this.fragPlaying = null;
  };

  _proto.onManifestParsed = function onManifestParsed(event, data) {
    var aac = false;
    var heaac = false;
    var codec;
    data.levels.forEach(function (level) {
      // detect if we have different kind of audio codecs used amongst playlists
      codec = level.audioCodec;

      if (codec) {
        if (codec.indexOf('mp4a.40.2') !== -1) {
          aac = true;
        }

        if (codec.indexOf('mp4a.40.5') !== -1) {
          heaac = true;
        }
      }
    });
    this.audioCodecSwitch = aac && heaac && !Object(_is_supported__WEBPACK_IMPORTED_MODULE_2__["changeTypeSupported"])();

    if (this.audioCodecSwitch) {
      this.log('Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC');
    }

    this.levels = data.levels;
    this.startFragRequested = false;
  };

  _proto.onLevelLoading = function onLevelLoading(event, data) {
    var levels = this.levels;

    if (!levels || this.state !== _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE) {
      return;
    }

    var level = levels[data.level];

    if (!level.details || level.details.live && this.levelLastLoaded !== data.level || this.waitForCdnTuneIn(level.details)) {
      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].WAITING_LEVEL;
    }
  };

  _proto.onLevelLoaded = function onLevelLoaded(event, data) {
    var _curLevel$details;

    var levels = this.levels;
    var newLevelId = data.level;
    var newDetails = data.details;
    var duration = newDetails.totalduration;

    if (!levels) {
      this.warn("Levels were reset while loading level " + newLevelId);
      return;
    }

    this.log("Level " + newLevelId + " loaded [" + newDetails.startSN + "," + newDetails.endSN + "], cc [" + newDetails.startCC + ", " + newDetails.endCC + "] duration:" + duration);
    var fragCurrent = this.fragCurrent;

    if (fragCurrent && (this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].FRAG_LOADING || this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].FRAG_LOADING_WAITING_RETRY)) {
      if (fragCurrent.level !== data.level && fragCurrent.loader) {
        this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
        fragCurrent.loader.abort();
      }
    }

    var curLevel = levels[newLevelId];
    var sliding = 0;

    if (newDetails.live || (_curLevel$details = curLevel.details) !== null && _curLevel$details !== void 0 && _curLevel$details.live) {
      if (!newDetails.fragments[0]) {
        newDetails.deltaUpdateFailed = true;
      }

      if (newDetails.deltaUpdateFailed) {
        return;
      }

      sliding = this.alignPlaylists(newDetails, curLevel.details);
    } // override level info


    curLevel.details = newDetails;
    this.levelLastLoaded = newLevelId;
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].LEVEL_UPDATED, {
      details: newDetails,
      level: newLevelId
    }); // only switch back to IDLE state if we were waiting for level to start downloading a new fragment

    if (this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].WAITING_LEVEL) {
      if (this.waitForCdnTuneIn(newDetails)) {
        // Wait for Low-Latency CDN Tune-in
        return;
      }

      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
    }

    if (!this.startFragRequested) {
      this.setStartPosition(newDetails, sliding);
    } else if (newDetails.live) {
      this.synchronizeToLiveEdge(newDetails);
    } // trigger handler right now


    this.tick();
  };

  _proto._handleFragmentLoadProgress = function _handleFragmentLoadProgress(data) {
    var _frag$initSegment;

    var frag = data.frag,
        part = data.part,
        payload = data.payload;
    var levels = this.levels;

    if (!levels) {
      this.warn("Levels were reset while fragment load was in progress. Fragment " + frag.sn + " of level " + frag.level + " will not be buffered");
      return;
    }

    var currentLevel = levels[frag.level];
    var details = currentLevel.details;

    if (!details) {
      this.warn("Dropping fragment " + frag.sn + " of level " + frag.level + " after level details were reset");
      return;
    }

    var videoCodec = currentLevel.videoCodec; // time Offset is accurate if level PTS is known, or if playlist is not sliding (not live)

    var accurateTimeOffset = details.PTSKnown || !details.live;
    var initSegmentData = (_frag$initSegment = frag.initSegment) === null || _frag$initSegment === void 0 ? void 0 : _frag$initSegment.data;

    var audioCodec = this._getAudioCodec(currentLevel); // transmux the MPEG-TS data to ISO-BMFF segments
    // this.log(`Transmuxing ${frag.sn} of [${details.startSN} ,${details.endSN}],level ${frag.level}, cc ${frag.cc}`);


    var transmuxer = this.transmuxer = this.transmuxer || new _demux_transmuxer_interface__WEBPACK_IMPORTED_MODULE_8__["default"](this.hls, _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this));
    var partIndex = part ? part.index : -1;
    var partial = partIndex !== -1;
    var chunkMeta = new _types_transmuxer__WEBPACK_IMPORTED_MODULE_9__["ChunkMetadata"](frag.level, frag.sn, frag.stats.chunkCount, payload.byteLength, partIndex, partial);
    var initPTS = this.initPTS[frag.cc];
    transmuxer.push(payload, initSegmentData, audioCodec, videoCodec, frag, part, details.totalduration, accurateTimeOffset, chunkMeta, initPTS);
  };

  _proto.onAudioTrackSwitching = function onAudioTrackSwitching(event, data) {
    // if any URL found on new audio track, it is an alternate audio track
    var fromAltAudio = this.altAudio;
    var altAudio = !!data.url;
    var trackId = data.id; // if we switch on main audio, ensure that main fragment scheduling is synced with media.buffered
    // don't do anything if we switch to alt audio: audio stream controller is handling it.
    // we will just have to change buffer scheduling on audioTrackSwitched

    if (!altAudio) {
      if (this.mediaBuffer !== this.media) {
        this.log('Switching on main audio, use media.buffered to schedule main fragment loading');
        this.mediaBuffer = this.media;
        var fragCurrent = this.fragCurrent; // we need to refill audio buffer from main: cancel any frag loading to speed up audio switch

        if (fragCurrent !== null && fragCurrent !== void 0 && fragCurrent.loader) {
          this.log('Switching to main audio track, cancel main fragment load');
          fragCurrent.loader.abort();
        } // destroy transmuxer to force init segment generation (following audio switch)


        this.resetTransmuxer(); // switch to IDLE state to load new fragment

        this.resetLoadingState();
      } else if (this.audioOnly) {
        // Reset audio transmuxer so when switching back to main audio we're not still appending where we left off
        this.resetTransmuxer();
      }

      var hls = this.hls; // If switching from alt to main audio, flush all audio and trigger track switched

      if (fromAltAudio) {
        hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_FLUSHING, {
          startOffset: 0,
          endOffset: Number.POSITIVE_INFINITY,
          type: 'audio'
        });
      }

      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].AUDIO_TRACK_SWITCHED, {
        id: trackId
      });
    }
  };

  _proto.onAudioTrackSwitched = function onAudioTrackSwitched(event, data) {
    var trackId = data.id;
    var altAudio = !!this.hls.audioTracks[trackId].url;

    if (altAudio) {
      var videoBuffer = this.videoBuffer; // if we switched on alternate audio, ensure that main fragment scheduling is synced with video sourcebuffer buffered

      if (videoBuffer && this.mediaBuffer !== videoBuffer) {
        this.log('Switching on alternate audio, use video.buffered to schedule main fragment loading');
        this.mediaBuffer = videoBuffer;
      }
    }

    this.altAudio = altAudio;
    this.tick();
  };

  _proto.onBufferCreated = function onBufferCreated(event, data) {
    var tracks = data.tracks;
    var mediaTrack;
    var name;
    var alternate = false;

    for (var type in tracks) {
      var track = tracks[type];

      if (track.id === 'main') {
        name = type;
        mediaTrack = track; // keep video source buffer reference

        if (type === 'video') {
          var videoTrack = tracks[type];

          if (videoTrack) {
            this.videoBuffer = videoTrack.buffer;
          }
        }
      } else {
        alternate = true;
      }
    }

    if (alternate && mediaTrack) {
      this.log("Alternate track found, use " + name + ".buffered to schedule main fragment loading");
      this.mediaBuffer = mediaTrack.buffer;
    } else {
      this.mediaBuffer = this.media;
    }
  };

  _proto.onFragBuffered = function onFragBuffered(event, data) {
    var frag = data.frag,
        part = data.part;

    if (frag && frag.type !== _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN) {
      return;
    }

    if (this.fragContextChanged(frag)) {
      // If a level switch was requested while a fragment was buffering, it will emit the FRAG_BUFFERED event upon completion
      // Avoid setting state back to IDLE, since that will interfere with a level switch
      this.warn("Fragment " + frag.sn + (part ? ' p: ' + part.index : '') + " of level " + frag.level + " finished buffering, but was aborted. state: " + this.state);

      if (this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].PARSED) {
        this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
      }

      return;
    }

    var stats = part ? part.stats : frag.stats;
    this.fragLastKbps = Math.round(8 * stats.total / (stats.buffering.end - stats.loading.first));

    if (frag.sn !== 'initSegment') {
      this.fragPrevious = frag;
    }

    this.fragBufferedComplete(frag, part);
  };

  _proto.onError = function onError(event, data) {
    switch (data.details) {
      case _errors__WEBPACK_IMPORTED_MODULE_11__["ErrorDetails"].FRAG_LOAD_ERROR:
      case _errors__WEBPACK_IMPORTED_MODULE_11__["ErrorDetails"].FRAG_LOAD_TIMEOUT:
      case _errors__WEBPACK_IMPORTED_MODULE_11__["ErrorDetails"].KEY_LOAD_ERROR:
      case _errors__WEBPACK_IMPORTED_MODULE_11__["ErrorDetails"].KEY_LOAD_TIMEOUT:
        this.onFragmentOrKeyLoadError(_types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN, data);
        break;

      case _errors__WEBPACK_IMPORTED_MODULE_11__["ErrorDetails"].LEVEL_LOAD_ERROR:
      case _errors__WEBPACK_IMPORTED_MODULE_11__["ErrorDetails"].LEVEL_LOAD_TIMEOUT:
        if (this.state !== _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].ERROR) {
          if (data.fatal) {
            // if fatal error, stop processing
            this.warn("" + data.details);
            this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].ERROR;
          } else {
            // in case of non fatal error while loading level, if level controller is not retrying to load level , switch back to IDLE
            if (!data.levelRetry && this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].WAITING_LEVEL) {
              this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
            }
          }
        }

        break;

      case _errors__WEBPACK_IMPORTED_MODULE_11__["ErrorDetails"].BUFFER_FULL_ERROR:
        // if in appending state
        if (data.parent === 'main' && (this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].PARSING || this.state === _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].PARSED)) {
          var flushBuffer = true;
          var bufferedInfo = this.getFwdBufferInfo(this.media, _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN); // 0.5 : tolerance needed as some browsers stalls playback before reaching buffered end
          // reduce max buf len if current position is buffered

          if (bufferedInfo && bufferedInfo.len > 0.5) {
            flushBuffer = !this.reduceMaxBufferLength(bufferedInfo.len);
          }

          if (flushBuffer) {
            // current position is not buffered, but browser is still complaining about buffer full error
            // this happens on IE/Edge, refer to https://github.com/video-dev/hls.js/pull/708
            // in that case flush the whole buffer to recover
            this.warn('buffer full error also media.currentTime is not buffered, flush main'); // flush main buffer

            this.immediateLevelSwitch();
          }

          this.resetLoadingState();
        }

        break;

      default:
        break;
    }
  } // Checks the health of the buffer and attempts to resolve playback stalls.
  ;

  _proto.checkBuffer = function checkBuffer() {
    var media = this.media,
        gapController = this.gapController;

    if (!media || !gapController || !media.readyState) {
      // Exit early if we don't have media or if the media hasn't buffered anything yet (readyState 0)
      return;
    } // Check combined buffer


    var buffered = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__["BufferHelper"].getBuffered(media);

    if (!this.loadedmetadata && buffered.length) {
      this.loadedmetadata = true;
      this.seekToStartPos();
    } else {
      // Resolve gaps using the main buffer, whose ranges are the intersections of the A/V sourcebuffers
      gapController.poll(this.lastCurrentTime);
    }

    this.lastCurrentTime = media.currentTime;
  };

  _proto.onFragLoadEmergencyAborted = function onFragLoadEmergencyAborted() {
    this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE; // if loadedmetadata is not set, it means that we are emergency switch down on first frag
    // in that case, reset startFragRequested flag

    if (!this.loadedmetadata) {
      this.startFragRequested = false;
      this.nextLoadPosition = this.startPosition;
    }

    this.tickImmediate();
  };

  _proto.onBufferFlushed = function onBufferFlushed(event, _ref) {
    var type = _ref.type;

    if (type !== _loader_fragment__WEBPACK_IMPORTED_MODULE_7__["ElementaryStreamTypes"].AUDIO || this.audioOnly && !this.altAudio) {
      var media = (type === _loader_fragment__WEBPACK_IMPORTED_MODULE_7__["ElementaryStreamTypes"].VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
      this.afterBufferFlushed(media, type, _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN);
    }
  };

  _proto.onLevelsUpdated = function onLevelsUpdated(event, data) {
    this.levels = data.levels;
  };

  _proto.swapAudioCodec = function swapAudioCodec() {
    this.audioCodecSwap = !this.audioCodecSwap;
  }
  /**
   * Seeks to the set startPosition if not equal to the mediaElement's current time.
   * @private
   */
  ;

  _proto.seekToStartPos = function seekToStartPos() {
    var media = this.media;
    var currentTime = media.currentTime;
    var startPosition = this.startPosition; // only adjust currentTime if different from startPosition or if startPosition not buffered
    // at that stage, there should be only one buffered range, as we reach that code after first fragment has been buffered

    if (startPosition >= 0 && currentTime < startPosition) {
      if (media.seeking) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_12__["logger"].log("could not seek to " + startPosition + ", already seeking at " + currentTime);
        return;
      }

      var buffered = _utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__["BufferHelper"].getBuffered(media);
      var bufferStart = buffered.length ? buffered.start(0) : 0;
      var delta = bufferStart - startPosition;

      if (delta > 0 && (delta < this.config.maxBufferHole || delta < this.config.maxFragLookUpTolerance)) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_12__["logger"].log("adjusting start position by " + delta + " to match buffer start");
        startPosition += delta;
        this.startPosition = startPosition;
      }

      this.log("seek to target start position " + startPosition + " from current time " + currentTime);
      media.currentTime = startPosition;
    }
  };

  _proto._getAudioCodec = function _getAudioCodec(currentLevel) {
    var audioCodec = this.config.defaultAudioCodec || currentLevel.audioCodec;

    if (this.audioCodecSwap && audioCodec) {
      this.log('Swapping audio codec');

      if (audioCodec.indexOf('mp4a.40.5') !== -1) {
        audioCodec = 'mp4a.40.2';
      } else {
        audioCodec = 'mp4a.40.5';
      }
    }

    return audioCodec;
  };

  _proto._loadBitrateTestFrag = function _loadBitrateTestFrag(frag) {
    var _this2 = this;

    this._doFragLoad(frag).then(function (data) {
      var hls = _this2.hls;

      if (!data || hls.nextLoadLevel || _this2.fragContextChanged(frag)) {
        return;
      }

      _this2.fragLoadError = 0;
      _this2.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].IDLE;
      _this2.startFragRequested = false;
      _this2.bitrateTest = false;
      var stats = frag.stats; // Bitrate tests fragments are neither parsed nor buffered

      stats.parsing.start = stats.parsing.end = stats.buffering.start = stats.buffering.end = self.performance.now();
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_LOADED, data);
    });
  };

  _proto._handleTransmuxComplete = function _handleTransmuxComplete(transmuxResult) {
    var _id3$samples;

    var id = 'main';
    var hls = this.hls;
    var remuxResult = transmuxResult.remuxResult,
        chunkMeta = transmuxResult.chunkMeta;
    var context = this.getCurrentContext(chunkMeta);

    if (!context) {
      this.warn("The loading context changed while buffering fragment " + chunkMeta.sn + " of level " + chunkMeta.level + ". This chunk will not be buffered.");
      this.resetLiveStartWhenNotLoaded(chunkMeta.level);
      return;
    }

    var frag = context.frag,
        part = context.part,
        level = context.level;
    var video = remuxResult.video,
        text = remuxResult.text,
        id3 = remuxResult.id3,
        initSegment = remuxResult.initSegment; // The audio-stream-controller handles audio buffering if Hls.js is playing an alternate audio track

    var audio = this.altAudio ? undefined : remuxResult.audio; // Check if the current fragment has been aborted. We check this by first seeing if we're still playing the current level.
    // If we are, subsequently check if the currently loading fragment (fragCurrent) has changed.

    if (this.fragContextChanged(frag)) {
      return;
    }

    this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].PARSING;

    if (initSegment) {
      if (initSegment.tracks) {
        this._bufferInitSegment(level, initSegment.tracks, frag, chunkMeta);

        hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_PARSING_INIT_SEGMENT, {
          frag: frag,
          id: id,
          tracks: initSegment.tracks
        });
      } // This would be nice if Number.isFinite acted as a typeguard, but it doesn't. See: https://github.com/Microsoft/TypeScript/issues/10038


      var initPTS = initSegment.initPTS;
      var timescale = initSegment.timescale;

      if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(initPTS)) {
        this.initPTS[frag.cc] = initPTS;
        hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].INIT_PTS_FOUND, {
          frag: frag,
          id: id,
          initPTS: initPTS,
          timescale: timescale
        });
      }
    } // Avoid buffering if backtracking this fragment


    if (video && remuxResult.independent !== false) {
      if (level.details) {
        var startPTS = video.startPTS,
            endPTS = video.endPTS,
            startDTS = video.startDTS,
            endDTS = video.endDTS;

        if (part) {
          part.elementaryStreams[video.type] = {
            startPTS: startPTS,
            endPTS: endPTS,
            startDTS: startDTS,
            endDTS: endDTS
          };
        } else {
          if (video.firstKeyFrame && video.independent) {
            this.couldBacktrack = true;
          }

          if (video.dropped && video.independent) {
            // Backtrack if dropped frames create a gap after currentTime
            var pos = this.getLoadPosition() + this.config.maxBufferHole;

            if (pos < startPTS) {
              this.backtrack(frag);
              return;
            } // Set video stream start to fragment start so that truncated samples do not distort the timeline, and mark it partial


            frag.setElementaryStreamInfo(video.type, frag.start, endPTS, frag.start, endDTS, true);
          }
        }

        frag.setElementaryStreamInfo(video.type, startPTS, endPTS, startDTS, endDTS);
        this.bufferFragmentData(video, frag, part, chunkMeta);
      }
    } else if (remuxResult.independent === false) {
      this.backtrack(frag);
      return;
    }

    if (audio) {
      var _startPTS = audio.startPTS,
          _endPTS = audio.endPTS,
          _startDTS = audio.startDTS,
          _endDTS = audio.endDTS;

      if (part) {
        part.elementaryStreams[_loader_fragment__WEBPACK_IMPORTED_MODULE_7__["ElementaryStreamTypes"].AUDIO] = {
          startPTS: _startPTS,
          endPTS: _endPTS,
          startDTS: _startDTS,
          endDTS: _endDTS
        };
      }

      frag.setElementaryStreamInfo(_loader_fragment__WEBPACK_IMPORTED_MODULE_7__["ElementaryStreamTypes"].AUDIO, _startPTS, _endPTS, _startDTS, _endDTS);
      this.bufferFragmentData(audio, frag, part, chunkMeta);
    }

    if (id3 !== null && id3 !== void 0 && (_id3$samples = id3.samples) !== null && _id3$samples !== void 0 && _id3$samples.length) {
      var emittedID3 = {
        frag: frag,
        id: id,
        samples: id3.samples
      };
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_PARSING_METADATA, emittedID3);
    }

    if (text) {
      var emittedText = {
        frag: frag,
        id: id,
        samples: text.samples
      };
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_PARSING_USERDATA, emittedText);
    }
  };

  _proto._bufferInitSegment = function _bufferInitSegment(currentLevel, tracks, frag, chunkMeta) {
    var _this3 = this;

    if (this.state !== _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].PARSING) {
      return;
    }

    this.audioOnly = !!tracks.audio && !tracks.video; // if audio track is expected to come from audio stream controller, discard any coming from main

    if (this.altAudio && !this.audioOnly) {
      delete tracks.audio;
    } // include levelCodec in audio and video tracks


    var audio = tracks.audio,
        video = tracks.video,
        audiovideo = tracks.audiovideo;

    if (audio) {
      var audioCodec = currentLevel.audioCodec;
      var ua = navigator.userAgent.toLowerCase();

      if (this.audioCodecSwitch) {
        if (audioCodec) {
          if (audioCodec.indexOf('mp4a.40.5') !== -1) {
            audioCodec = 'mp4a.40.2';
          } else {
            audioCodec = 'mp4a.40.5';
          }
        } // In the case that AAC and HE-AAC audio codecs are signalled in manifest,
        // force HE-AAC, as it seems that most browsers prefers it.
        // don't force HE-AAC if mono stream, or in Firefox


        if (audio.metadata.channelCount !== 1 && ua.indexOf('firefox') === -1) {
          audioCodec = 'mp4a.40.5';
        }
      } // HE-AAC is broken on Android, always signal audio codec as AAC even if variant manifest states otherwise


      if (ua.indexOf('android') !== -1 && audio.container !== 'audio/mpeg') {
        // Exclude mpeg audio
        audioCodec = 'mp4a.40.2';
        this.log("Android: force audio codec to " + audioCodec);
      }

      if (currentLevel.audioCodec && currentLevel.audioCodec !== audioCodec) {
        this.log("Swapping manifest audio codec \"" + currentLevel.audioCodec + "\" for \"" + audioCodec + "\"");
      }

      audio.levelCodec = audioCodec;
      audio.id = 'main';
      this.log("Init audio buffer, container:" + audio.container + ", codecs[selected/level/parsed]=[" + (audioCodec || '') + "/" + (currentLevel.audioCodec || '') + "/" + audio.codec + "]");
    }

    if (video) {
      video.levelCodec = currentLevel.videoCodec;
      video.id = 'main';
      this.log("Init video buffer, container:" + video.container + ", codecs[level/parsed]=[" + (currentLevel.videoCodec || '') + "/" + video.codec + "]");
    }

    if (audiovideo) {
      this.log("Init audiovideo buffer, container:" + audiovideo.container + ", codecs[level/parsed]=[" + (currentLevel.attrs.CODECS || '') + "/" + audiovideo.codec + "]");
    }

    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_CODECS, tracks); // loop through tracks that are going to be provided to bufferController

    Object.keys(tracks).forEach(function (trackName) {
      var track = tracks[trackName];
      var initSegment = track.initSegment;

      if (initSegment !== null && initSegment !== void 0 && initSegment.byteLength) {
        _this3.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].BUFFER_APPENDING, {
          type: trackName,
          data: initSegment,
          frag: frag,
          part: null,
          chunkMeta: chunkMeta,
          parent: frag.type
        });
      }
    }); // trigger handler right now

    this.tick();
  };

  _proto.backtrack = function backtrack(frag) {
    this.couldBacktrack = true; // Causes findFragments to backtrack through fragments to find the keyframe

    this.resetTransmuxer();
    this.flushBufferGap(frag);
    var data = this.fragmentTracker.backtrack(frag);
    this.fragPrevious = null;
    this.nextLoadPosition = frag.start;

    if (data) {
      this.resetFragmentLoading(frag);
    } else {
      // Change state to BACKTRACKING so that fragmentEntity.backtrack data can be added after _doFragLoad
      this.state = _base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["State"].BACKTRACKING;
    }
  };

  _proto.checkFragmentChanged = function checkFragmentChanged() {
    var video = this.media;
    var fragPlayingCurrent = null;

    if (video && video.readyState > 1 && video.seeking === false) {
      var currentTime = video.currentTime;
      /* if video element is in seeked state, currentTime can only increase.
        (assuming that playback rate is positive ...)
        As sometimes currentTime jumps back to zero after a
        media decode error, check this, to avoid seeking back to
        wrong position after a media decode error
      */

      if (_utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__["BufferHelper"].isBuffered(video, currentTime)) {
        fragPlayingCurrent = this.getAppendedFrag(currentTime);
      } else if (_utils_buffer_helper__WEBPACK_IMPORTED_MODULE_4__["BufferHelper"].isBuffered(video, currentTime + 0.1)) {
        /* ensure that FRAG_CHANGED event is triggered at startup,
          when first video frame is displayed and playback is paused.
          add a tolerance of 100ms, in case current position is not buffered,
          check if current pos+100ms is buffered and use that buffer range
          for FRAG_CHANGED event reporting */
        fragPlayingCurrent = this.getAppendedFrag(currentTime + 0.1);
      }

      if (fragPlayingCurrent) {
        var fragPlaying = this.fragPlaying;
        var fragCurrentLevel = fragPlayingCurrent.level;

        if (!fragPlaying || fragPlayingCurrent.sn !== fragPlaying.sn || fragPlaying.level !== fragCurrentLevel || fragPlayingCurrent.urlId !== fragPlaying.urlId) {
          this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].FRAG_CHANGED, {
            frag: fragPlayingCurrent
          });

          if (!fragPlaying || fragPlaying.level !== fragCurrentLevel) {
            this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].LEVEL_SWITCHED, {
              level: fragCurrentLevel
            });
          }

          this.fragPlaying = fragPlayingCurrent;
        }
      }
    }
  };

  _createClass(StreamController, [{
    key: "nextLevel",
    get: function get() {
      var frag = this.nextBufferedFrag;

      if (frag) {
        return frag.level;
      } else {
        return -1;
      }
    }
  }, {
    key: "currentLevel",
    get: function get() {
      var media = this.media;

      if (media) {
        var fragPlayingCurrent = this.getAppendedFrag(media.currentTime);

        if (fragPlayingCurrent) {
          return fragPlayingCurrent.level;
        }
      }

      return -1;
    }
  }, {
    key: "nextBufferedFrag",
    get: function get() {
      var media = this.media;

      if (media) {
        // first get end range of current fragment
        var fragPlayingCurrent = this.getAppendedFrag(media.currentTime);
        return this.followingBufferedFrag(fragPlayingCurrent);
      } else {
        return null;
      }
    }
  }, {
    key: "forceStartLoad",
    get: function get() {
      return this._forceStartLoad;
    }
  }]);

  return StreamController;
}(_base_stream_controller__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/crypt/aes-crypto.ts":
/*!*********************************!*\
  !*** ./src/crypt/aes-crypto.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AESCrypto; });
var AESCrypto = /*#__PURE__*/function () {
  function AESCrypto(subtle, iv) {
    this.subtle = void 0;
    this.aesIV = void 0;
    this.subtle = subtle;
    this.aesIV = iv;
  }

  var _proto = AESCrypto.prototype;

  _proto.decrypt = function decrypt(data, key) {
    return this.subtle.decrypt({
      name: 'AES-CBC',
      iv: this.aesIV
    }, key, data);
  };

  return AESCrypto;
}();



/***/ }),

/***/ "./src/crypt/aes-decryptor.ts":
/*!************************************!*\
  !*** ./src/crypt/aes-decryptor.ts ***!
  \************************************/
/*! exports provided: removePadding, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePadding", function() { return removePadding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AESDecryptor; });
/* harmony import */ var _utils_typed_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/typed-array */ "./src/utils/typed-array.ts");
 // PKCS7

function removePadding(array) {
  var outputBytes = array.byteLength;
  var paddingBytes = outputBytes && new DataView(array.buffer).getUint8(outputBytes - 1);

  if (paddingBytes) {
    return Object(_utils_typed_array__WEBPACK_IMPORTED_MODULE_0__["sliceUint8"])(array, 0, outputBytes - paddingBytes);
  }

  return array;
}

var AESDecryptor = /*#__PURE__*/function () {
  function AESDecryptor() {
    this.rcon = [0x0, 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
    this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
    this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
    this.sBox = new Uint32Array(256);
    this.invSBox = new Uint32Array(256);
    this.key = new Uint32Array(0);
    this.ksRows = 0;
    this.keySize = 0;
    this.keySchedule = void 0;
    this.invKeySchedule = void 0;
    this.initTable();
  } // Using view.getUint32() also swaps the byte order.


  var _proto = AESDecryptor.prototype;

  _proto.uint8ArrayToUint32Array_ = function uint8ArrayToUint32Array_(arrayBuffer) {
    var view = new DataView(arrayBuffer);
    var newArray = new Uint32Array(4);

    for (var i = 0; i < 4; i++) {
      newArray[i] = view.getUint32(i * 4);
    }

    return newArray;
  };

  _proto.initTable = function initTable() {
    var sBox = this.sBox;
    var invSBox = this.invSBox;
    var subMix = this.subMix;
    var subMix0 = subMix[0];
    var subMix1 = subMix[1];
    var subMix2 = subMix[2];
    var subMix3 = subMix[3];
    var invSubMix = this.invSubMix;
    var invSubMix0 = invSubMix[0];
    var invSubMix1 = invSubMix[1];
    var invSubMix2 = invSubMix[2];
    var invSubMix3 = invSubMix[3];
    var d = new Uint32Array(256);
    var x = 0;
    var xi = 0;
    var i = 0;

    for (i = 0; i < 256; i++) {
      if (i < 128) {
        d[i] = i << 1;
      } else {
        d[i] = i << 1 ^ 0x11b;
      }
    }

    for (i = 0; i < 256; i++) {
      var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
      sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
      sBox[x] = sx;
      invSBox[sx] = x; // Compute multiplication

      var x2 = d[x];
      var x4 = d[x2];
      var x8 = d[x4]; // Compute sub/invSub bytes, mix columns tables

      var t = d[sx] * 0x101 ^ sx * 0x1010100;
      subMix0[x] = t << 24 | t >>> 8;
      subMix1[x] = t << 16 | t >>> 16;
      subMix2[x] = t << 8 | t >>> 24;
      subMix3[x] = t; // Compute inv sub bytes, inv mix columns tables

      t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
      invSubMix0[sx] = t << 24 | t >>> 8;
      invSubMix1[sx] = t << 16 | t >>> 16;
      invSubMix2[sx] = t << 8 | t >>> 24;
      invSubMix3[sx] = t; // Compute next counter

      if (!x) {
        x = xi = 1;
      } else {
        x = x2 ^ d[d[d[x8 ^ x2]]];
        xi ^= d[d[xi]];
      }
    }
  };

  _proto.expandKey = function expandKey(keyBuffer) {
    // convert keyBuffer to Uint32Array
    var key = this.uint8ArrayToUint32Array_(keyBuffer);
    var sameKey = true;
    var offset = 0;

    while (offset < key.length && sameKey) {
      sameKey = key[offset] === this.key[offset];
      offset++;
    }

    if (sameKey) {
      return;
    }

    this.key = key;
    var keySize = this.keySize = key.length;

    if (keySize !== 4 && keySize !== 6 && keySize !== 8) {
      throw new Error('Invalid aes key size=' + keySize);
    }

    var ksRows = this.ksRows = (keySize + 6 + 1) * 4;
    var ksRow;
    var invKsRow;
    var keySchedule = this.keySchedule = new Uint32Array(ksRows);
    var invKeySchedule = this.invKeySchedule = new Uint32Array(ksRows);
    var sbox = this.sBox;
    var rcon = this.rcon;
    var invSubMix = this.invSubMix;
    var invSubMix0 = invSubMix[0];
    var invSubMix1 = invSubMix[1];
    var invSubMix2 = invSubMix[2];
    var invSubMix3 = invSubMix[3];
    var prev;
    var t;

    for (ksRow = 0; ksRow < ksRows; ksRow++) {
      if (ksRow < keySize) {
        prev = keySchedule[ksRow] = key[ksRow];
        continue;
      }

      t = prev;

      if (ksRow % keySize === 0) {
        // Rot word
        t = t << 8 | t >>> 24; // Sub word

        t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff]; // Mix Rcon

        t ^= rcon[ksRow / keySize | 0] << 24;
      } else if (keySize > 6 && ksRow % keySize === 4) {
        // Sub word
        t = sbox[t >>> 24] << 24 | sbox[t >>> 16 & 0xff] << 16 | sbox[t >>> 8 & 0xff] << 8 | sbox[t & 0xff];
      }

      keySchedule[ksRow] = prev = (keySchedule[ksRow - keySize] ^ t) >>> 0;
    }

    for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
      ksRow = ksRows - invKsRow;

      if (invKsRow & 3) {
        t = keySchedule[ksRow];
      } else {
        t = keySchedule[ksRow - 4];
      }

      if (invKsRow < 4 || ksRow <= 4) {
        invKeySchedule[invKsRow] = t;
      } else {
        invKeySchedule[invKsRow] = invSubMix0[sbox[t >>> 24]] ^ invSubMix1[sbox[t >>> 16 & 0xff]] ^ invSubMix2[sbox[t >>> 8 & 0xff]] ^ invSubMix3[sbox[t & 0xff]];
      }

      invKeySchedule[invKsRow] = invKeySchedule[invKsRow] >>> 0;
    }
  } // Adding this as a method greatly improves performance.
  ;

  _proto.networkToHostOrderSwap = function networkToHostOrderSwap(word) {
    return word << 24 | (word & 0xff00) << 8 | (word & 0xff0000) >> 8 | word >>> 24;
  };

  _proto.decrypt = function decrypt(inputArrayBuffer, offset, aesIV) {
    var nRounds = this.keySize + 6;
    var invKeySchedule = this.invKeySchedule;
    var invSBOX = this.invSBox;
    var invSubMix = this.invSubMix;
    var invSubMix0 = invSubMix[0];
    var invSubMix1 = invSubMix[1];
    var invSubMix2 = invSubMix[2];
    var invSubMix3 = invSubMix[3];
    var initVector = this.uint8ArrayToUint32Array_(aesIV);
    var initVector0 = initVector[0];
    var initVector1 = initVector[1];
    var initVector2 = initVector[2];
    var initVector3 = initVector[3];
    var inputInt32 = new Int32Array(inputArrayBuffer);
    var outputInt32 = new Int32Array(inputInt32.length);
    var t0, t1, t2, t3;
    var s0, s1, s2, s3;
    var inputWords0, inputWords1, inputWords2, inputWords3;
    var ksRow, i;
    var swapWord = this.networkToHostOrderSwap;

    while (offset < inputInt32.length) {
      inputWords0 = swapWord(inputInt32[offset]);
      inputWords1 = swapWord(inputInt32[offset + 1]);
      inputWords2 = swapWord(inputInt32[offset + 2]);
      inputWords3 = swapWord(inputInt32[offset + 3]);
      s0 = inputWords0 ^ invKeySchedule[0];
      s1 = inputWords3 ^ invKeySchedule[1];
      s2 = inputWords2 ^ invKeySchedule[2];
      s3 = inputWords1 ^ invKeySchedule[3];
      ksRow = 4; // Iterate through the rounds of decryption

      for (i = 1; i < nRounds; i++) {
        t0 = invSubMix0[s0 >>> 24] ^ invSubMix1[s1 >> 16 & 0xff] ^ invSubMix2[s2 >> 8 & 0xff] ^ invSubMix3[s3 & 0xff] ^ invKeySchedule[ksRow];
        t1 = invSubMix0[s1 >>> 24] ^ invSubMix1[s2 >> 16 & 0xff] ^ invSubMix2[s3 >> 8 & 0xff] ^ invSubMix3[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
        t2 = invSubMix0[s2 >>> 24] ^ invSubMix1[s3 >> 16 & 0xff] ^ invSubMix2[s0 >> 8 & 0xff] ^ invSubMix3[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
        t3 = invSubMix0[s3 >>> 24] ^ invSubMix1[s0 >> 16 & 0xff] ^ invSubMix2[s1 >> 8 & 0xff] ^ invSubMix3[s2 & 0xff] ^ invKeySchedule[ksRow + 3]; // Update state

        s0 = t0;
        s1 = t1;
        s2 = t2;
        s3 = t3;
        ksRow = ksRow + 4;
      } // Shift rows, sub bytes, add round key


      t0 = invSBOX[s0 >>> 24] << 24 ^ invSBOX[s1 >> 16 & 0xff] << 16 ^ invSBOX[s2 >> 8 & 0xff] << 8 ^ invSBOX[s3 & 0xff] ^ invKeySchedule[ksRow];
      t1 = invSBOX[s1 >>> 24] << 24 ^ invSBOX[s2 >> 16 & 0xff] << 16 ^ invSBOX[s3 >> 8 & 0xff] << 8 ^ invSBOX[s0 & 0xff] ^ invKeySchedule[ksRow + 1];
      t2 = invSBOX[s2 >>> 24] << 24 ^ invSBOX[s3 >> 16 & 0xff] << 16 ^ invSBOX[s0 >> 8 & 0xff] << 8 ^ invSBOX[s1 & 0xff] ^ invKeySchedule[ksRow + 2];
      t3 = invSBOX[s3 >>> 24] << 24 ^ invSBOX[s0 >> 16 & 0xff] << 16 ^ invSBOX[s1 >> 8 & 0xff] << 8 ^ invSBOX[s2 & 0xff] ^ invKeySchedule[ksRow + 3]; // Write

      outputInt32[offset] = swapWord(t0 ^ initVector0);
      outputInt32[offset + 1] = swapWord(t3 ^ initVector1);
      outputInt32[offset + 2] = swapWord(t2 ^ initVector2);
      outputInt32[offset + 3] = swapWord(t1 ^ initVector3); // reset initVector to last 4 unsigned int

      initVector0 = inputWords0;
      initVector1 = inputWords1;
      initVector2 = inputWords2;
      initVector3 = inputWords3;
      offset = offset + 4;
    }

    return outputInt32.buffer;
  };

  return AESDecryptor;
}();



/***/ }),

/***/ "./src/crypt/decrypter.ts":
/*!********************************!*\
  !*** ./src/crypt/decrypter.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Decrypter; });
/* harmony import */ var _aes_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aes-crypto */ "./src/crypt/aes-crypto.ts");
/* harmony import */ var _fast_aes_key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fast-aes-key */ "./src/crypt/fast-aes-key.ts");
/* harmony import */ var _aes_decryptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aes-decryptor */ "./src/crypt/aes-decryptor.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _utils_typed_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/typed-array */ "./src/utils/typed-array.ts");






var CHUNK_SIZE = 16; // 16 bytes, 128 bits

var Decrypter = /*#__PURE__*/function () {
  function Decrypter(observer, config, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$removePKCS7Paddi = _ref.removePKCS7Padding,
        removePKCS7Padding = _ref$removePKCS7Paddi === void 0 ? true : _ref$removePKCS7Paddi;

    this.logEnabled = true;
    this.observer = void 0;
    this.config = void 0;
    this.removePKCS7Padding = void 0;
    this.subtle = null;
    this.softwareDecrypter = null;
    this.key = null;
    this.fastAesKey = null;
    this.remainderData = null;
    this.currentIV = null;
    this.currentResult = null;
    this.observer = observer;
    this.config = config;
    this.removePKCS7Padding = removePKCS7Padding; // built in decryptor expects PKCS7 padding

    if (removePKCS7Padding) {
      try {
        var browserCrypto = self.crypto;

        if (browserCrypto) {
          this.subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
        }
      } catch (e) {
        /* no-op */
      }
    }

    if (this.subtle === null) {
      this.config.enableSoftwareAES = true;
    }
  }

  var _proto = Decrypter.prototype;

  _proto.destroy = function destroy() {
    // @ts-ignore
    this.observer = null;
  };

  _proto.isSync = function isSync() {
    return this.config.enableSoftwareAES;
  };

  _proto.flush = function flush() {
    var currentResult = this.currentResult;

    if (!currentResult) {
      this.reset();
      return;
    }

    var data = new Uint8Array(currentResult);
    this.reset();

    if (this.removePKCS7Padding) {
      return Object(_aes_decryptor__WEBPACK_IMPORTED_MODULE_2__["removePadding"])(data);
    }

    return data;
  };

  _proto.reset = function reset() {
    this.currentResult = null;
    this.currentIV = null;
    this.remainderData = null;

    if (this.softwareDecrypter) {
      this.softwareDecrypter = null;
    }
  };

  _proto.decrypt = function decrypt(data, key, iv, callback) {
    if (this.config.enableSoftwareAES) {
      this.softwareDecrypt(new Uint8Array(data), key, iv);
      var decryptResult = this.flush();

      if (decryptResult) {
        callback(decryptResult.buffer);
      }
    } else {
      this.webCryptoDecrypt(new Uint8Array(data), key, iv).then(callback);
    }
  };

  _proto.softwareDecrypt = function softwareDecrypt(data, key, iv) {
    var currentIV = this.currentIV,
        currentResult = this.currentResult,
        remainderData = this.remainderData;
    this.logOnce('JS AES decrypt'); // The output is staggered during progressive parsing - the current result is cached, and emitted on the next call
    // This is done in order to strip PKCS7 padding, which is found at the end of each segment. We only know we've reached
    // the end on flush(), but by that time we have already received all bytes for the segment.
    // Progressive decryption does not work with WebCrypto

    if (remainderData) {
      data = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_4__["appendUint8Array"])(remainderData, data);
      this.remainderData = null;
    } // Byte length must be a multiple of 16 (AES-128 = 128 bit blocks = 16 bytes)


    var currentChunk = this.getValidChunk(data);

    if (!currentChunk.length) {
      return null;
    }

    if (currentIV) {
      iv = currentIV;
    }

    var softwareDecrypter = this.softwareDecrypter;

    if (!softwareDecrypter) {
      softwareDecrypter = this.softwareDecrypter = new _aes_decryptor__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }

    softwareDecrypter.expandKey(key);
    var result = currentResult;
    this.currentResult = softwareDecrypter.decrypt(currentChunk.buffer, 0, iv);
    this.currentIV = Object(_utils_typed_array__WEBPACK_IMPORTED_MODULE_5__["sliceUint8"])(currentChunk, -16).buffer;

    if (!result) {
      return null;
    }

    return result;
  };

  _proto.webCryptoDecrypt = function webCryptoDecrypt(data, key, iv) {
    var _this = this;

    var subtle = this.subtle;

    if (this.key !== key || !this.fastAesKey) {
      this.key = key;
      this.fastAesKey = new _fast_aes_key__WEBPACK_IMPORTED_MODULE_1__["default"](subtle, key);
    }

    return this.fastAesKey.expandKey().then(function (aesKey) {
      // decrypt using web crypto
      if (!subtle) {
        return Promise.reject(new Error('web crypto not initialized'));
      }

      var crypto = new _aes_crypto__WEBPACK_IMPORTED_MODULE_0__["default"](subtle, iv);
      return crypto.decrypt(data.buffer, aesKey);
    }).catch(function (err) {
      return _this.onWebCryptoError(err, data, key, iv);
    });
  };

  _proto.onWebCryptoError = function onWebCryptoError(err, data, key, iv) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn('[decrypter.ts]: WebCrypto Error, disable WebCrypto API:', err);
    this.config.enableSoftwareAES = true;
    this.logEnabled = true;
    return this.softwareDecrypt(data, key, iv);
  };

  _proto.getValidChunk = function getValidChunk(data) {
    var currentChunk = data;
    var splitPoint = data.length - data.length % CHUNK_SIZE;

    if (splitPoint !== data.length) {
      currentChunk = Object(_utils_typed_array__WEBPACK_IMPORTED_MODULE_5__["sliceUint8"])(data, 0, splitPoint);
      this.remainderData = Object(_utils_typed_array__WEBPACK_IMPORTED_MODULE_5__["sliceUint8"])(data, splitPoint);
    }

    return currentChunk;
  };

  _proto.logOnce = function logOnce(msg) {
    if (!this.logEnabled) {
      return;
    }

    _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].log("[decrypter.ts]: " + msg);
    this.logEnabled = false;
  };

  return Decrypter;
}();



/***/ }),

/***/ "./src/crypt/fast-aes-key.ts":
/*!***********************************!*\
  !*** ./src/crypt/fast-aes-key.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FastAESKey; });
var FastAESKey = /*#__PURE__*/function () {
  function FastAESKey(subtle, key) {
    this.subtle = void 0;
    this.key = void 0;
    this.subtle = subtle;
    this.key = key;
  }

  var _proto = FastAESKey.prototype;

  _proto.expandKey = function expandKey() {
    return this.subtle.importKey('raw', this.key, {
      name: 'AES-CBC'
    }, false, ['encrypt', 'decrypt']);
  };

  return FastAESKey;
}();



/***/ }),

/***/ "./src/demux/aacdemuxer.ts":
/*!*********************************!*\
  !*** ./src/demux/aacdemuxer.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_audio_demuxer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-audio-demuxer */ "./src/demux/base-audio-demuxer.ts");
/* harmony import */ var _adts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adts */ "./src/demux/adts.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _demux_id3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../demux/id3 */ "./src/demux/id3.ts");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * AAC demuxer
 */





var AACDemuxer = /*#__PURE__*/function (_BaseAudioDemuxer) {
  _inheritsLoose(AACDemuxer, _BaseAudioDemuxer);

  function AACDemuxer(observer, config) {
    var _this;

    _this = _BaseAudioDemuxer.call(this) || this;
    _this.observer = void 0;
    _this.config = void 0;
    _this.observer = observer;
    _this.config = config;
    return _this;
  }

  var _proto = AACDemuxer.prototype;

  _proto.resetInitSegment = function resetInitSegment(audioCodec, videoCodec, duration) {
    _BaseAudioDemuxer.prototype.resetInitSegment.call(this, audioCodec, videoCodec, duration);

    this._audioTrack = {
      container: 'audio/adts',
      type: 'audio',
      id: 0,
      pid: -1,
      sequenceNumber: 0,
      isAAC: true,
      samples: [],
      manifestCodec: audioCodec,
      duration: duration,
      inputTimeScale: 90000,
      dropped: 0
    };
  } // Source for probe info - https://wiki.multimedia.cx/index.php?title=ADTS
  ;

  AACDemuxer.probe = function probe(data) {
    if (!data) {
      return false;
    } // Check for the ADTS sync word
    // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
    // Layer bits (position 14 and 15) in header should be always 0 for ADTS
    // More info https://wiki.multimedia.cx/index.php?title=ADTS


    var id3Data = _demux_id3__WEBPACK_IMPORTED_MODULE_3__["getID3Data"](data, 0) || [];
    var offset = id3Data.length;

    for (var length = data.length; offset < length; offset++) {
      if (_adts__WEBPACK_IMPORTED_MODULE_1__["probe"](data, offset)) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('ADTS sync word found !');
        return true;
      }
    }

    return false;
  };

  _proto.canParse = function canParse(data, offset) {
    return _adts__WEBPACK_IMPORTED_MODULE_1__["canParse"](data, offset);
  };

  _proto.appendFrame = function appendFrame(track, data, offset) {
    _adts__WEBPACK_IMPORTED_MODULE_1__["initTrackConfig"](track, this.observer, data, offset, track.manifestCodec);
    var frame = _adts__WEBPACK_IMPORTED_MODULE_1__["appendFrame"](track, data, offset, this.initPTS, this.frameIndex);

    if (frame && frame.missing === 0) {
      return frame;
    }
  };

  return AACDemuxer;
}(_base_audio_demuxer__WEBPACK_IMPORTED_MODULE_0__["default"]);

AACDemuxer.minProbeByteLength = 9;
/* harmony default export */ __webpack_exports__["default"] = (AACDemuxer);

/***/ }),

/***/ "./src/demux/adts.ts":
/*!***************************!*\
  !*** ./src/demux/adts.ts ***!
  \***************************/
/*! exports provided: getAudioConfig, isHeaderPattern, getHeaderLength, getFullFrameLength, canGetFrameLength, isHeader, canParse, probe, initTrackConfig, getFrameDuration, parseFrameHeader, appendFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAudioConfig", function() { return getAudioConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHeaderPattern", function() { return isHeaderPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeaderLength", function() { return getHeaderLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFullFrameLength", function() { return getFullFrameLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canGetFrameLength", function() { return canGetFrameLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHeader", function() { return isHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canParse", function() { return canParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "probe", function() { return probe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTrackConfig", function() { return initTrackConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFrameDuration", function() { return getFrameDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseFrameHeader", function() { return parseFrameHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendFrame", function() { return appendFrame; });
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/**
 * ADTS parser helper
 * @link https://wiki.multimedia.cx/index.php?title=ADTS
 */



function getAudioConfig(observer, data, offset, audioCodec) {
  var adtsObjectType;
  var adtsExtensionSamplingIndex;
  var adtsChanelConfig;
  var config;
  var userAgent = navigator.userAgent.toLowerCase();
  var manifestCodec = audioCodec;
  var adtsSampleingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350]; // byte 2

  adtsObjectType = ((data[offset + 2] & 0xc0) >>> 6) + 1;
  var adtsSamplingIndex = (data[offset + 2] & 0x3c) >>> 2;

  if (adtsSamplingIndex > adtsSampleingRates.length - 1) {
    observer.trigger(_events__WEBPACK_IMPORTED_MODULE_2__["Events"].ERROR, {
      type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].MEDIA_ERROR,
      details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].FRAG_PARSING_ERROR,
      fatal: true,
      reason: "invalid ADTS sampling index:" + adtsSamplingIndex
    });
    return;
  }

  adtsChanelConfig = (data[offset + 2] & 0x01) << 2; // byte 3

  adtsChanelConfig |= (data[offset + 3] & 0xc0) >>> 6;
  _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].log("manifest codec:" + audioCodec + ", ADTS type:" + adtsObjectType + ", samplingIndex:" + adtsSamplingIndex); // firefox: freq less than 24kHz = AAC SBR (HE-AAC)

  if (/firefox/i.test(userAgent)) {
    if (adtsSamplingIndex >= 6) {
      adtsObjectType = 5;
      config = new Array(4); // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)

      adtsExtensionSamplingIndex = adtsSamplingIndex - 3;
    } else {
      adtsObjectType = 2;
      config = new Array(2);
      adtsExtensionSamplingIndex = adtsSamplingIndex;
    } // Android : always use AAC

  } else if (userAgent.indexOf('android') !== -1) {
    adtsObjectType = 2;
    config = new Array(2);
    adtsExtensionSamplingIndex = adtsSamplingIndex;
  } else {
    /*  for other browsers (Chrome/Vivaldi/Opera ...)
        always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
    */
    adtsObjectType = 5;
    config = new Array(4); // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)

    if (audioCodec && (audioCodec.indexOf('mp4a.40.29') !== -1 || audioCodec.indexOf('mp4a.40.5') !== -1) || !audioCodec && adtsSamplingIndex >= 6) {
      // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)
      adtsExtensionSamplingIndex = adtsSamplingIndex - 3;
    } else {
      // if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1) OR (manifest codec not specified and mono audio)
      // Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
      if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && (adtsSamplingIndex >= 6 && adtsChanelConfig === 1 || /vivaldi/i.test(userAgent)) || !audioCodec && adtsChanelConfig === 1) {
        adtsObjectType = 2;
        config = new Array(2);
      }

      adtsExtensionSamplingIndex = adtsSamplingIndex;
    }
  }
  /* refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
      ISO 14496-3 (AAC).pdf - Table 1.13 — Syntax of AudioSpecificConfig()
    Audio Profile / Audio Object Type
    0: Null
    1: AAC Main
    2: AAC LC (Low Complexity)
    3: AAC SSR (Scalable Sample Rate)
    4: AAC LTP (Long Term Prediction)
    5: SBR (Spectral Band Replication)
    6: AAC Scalable
   sampling freq
    0: 96000 Hz
    1: 88200 Hz
    2: 64000 Hz
    3: 48000 Hz
    4: 44100 Hz
    5: 32000 Hz
    6: 24000 Hz
    7: 22050 Hz
    8: 16000 Hz
    9: 12000 Hz
    10: 11025 Hz
    11: 8000 Hz
    12: 7350 Hz
    13: Reserved
    14: Reserved
    15: frequency is written explictly
    Channel Configurations
    These are the channel configurations:
    0: Defined in AOT Specifc Config
    1: 1 channel: front-center
    2: 2 channels: front-left, front-right
  */
  // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1


  config[0] = adtsObjectType << 3; // samplingFrequencyIndex

  config[0] |= (adtsSamplingIndex & 0x0e) >> 1;
  config[1] |= (adtsSamplingIndex & 0x01) << 7; // channelConfiguration

  config[1] |= adtsChanelConfig << 3;

  if (adtsObjectType === 5) {
    // adtsExtensionSampleingIndex
    config[1] |= (adtsExtensionSamplingIndex & 0x0e) >> 1;
    config[2] = (adtsExtensionSamplingIndex & 0x01) << 7; // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
    //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc

    config[2] |= 2 << 2;
    config[3] = 0;
  }

  return {
    config: config,
    samplerate: adtsSampleingRates[adtsSamplingIndex],
    channelCount: adtsChanelConfig,
    codec: 'mp4a.40.' + adtsObjectType,
    manifestCodec: manifestCodec
  };
}
function isHeaderPattern(data, offset) {
  return data[offset] === 0xff && (data[offset + 1] & 0xf6) === 0xf0;
}
function getHeaderLength(data, offset) {
  return data[offset + 1] & 0x01 ? 7 : 9;
}
function getFullFrameLength(data, offset) {
  return (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xe0) >>> 5;
}
function canGetFrameLength(data, offset) {
  return offset + 5 < data.length;
}
function isHeader(data, offset) {
  // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
  // Layer bits (position 14 and 15) in header should be always 0 for ADTS
  // More info https://wiki.multimedia.cx/index.php?title=ADTS
  return offset + 1 < data.length && isHeaderPattern(data, offset);
}
function canParse(data, offset) {
  return canGetFrameLength(data, offset) && isHeaderPattern(data, offset) && getFullFrameLength(data, offset) <= data.length - offset;
}
function probe(data, offset) {
  // same as isHeader but we also check that ADTS frame follows last ADTS frame
  // or end of data is reached
  if (isHeader(data, offset)) {
    // ADTS header Length
    var headerLength = getHeaderLength(data, offset);

    if (offset + headerLength >= data.length) {
      return false;
    } // ADTS frame Length


    var frameLength = getFullFrameLength(data, offset);

    if (frameLength <= headerLength) {
      return false;
    }

    var newOffset = offset + frameLength;
    return newOffset === data.length || isHeader(data, newOffset);
  }

  return false;
}
function initTrackConfig(track, observer, data, offset, audioCodec) {
  if (!track.samplerate) {
    var config = getAudioConfig(observer, data, offset, audioCodec);

    if (!config) {
      return;
    }

    track.config = config.config;
    track.samplerate = config.samplerate;
    track.channelCount = config.channelCount;
    track.codec = config.codec;
    track.manifestCodec = config.manifestCodec;
    _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].log("parsed codec:" + track.codec + ", rate:" + config.samplerate + ", channels:" + config.channelCount);
  }
}
function getFrameDuration(samplerate) {
  return 1024 * 90000 / samplerate;
}
function parseFrameHeader(data, offset, pts, frameIndex, frameDuration) {
  // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
  var headerLength = getHeaderLength(data, offset); // retrieve frame size

  var frameLength = getFullFrameLength(data, offset);
  frameLength -= headerLength;

  if (frameLength > 0) {
    var stamp = pts + frameIndex * frameDuration; // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);

    return {
      headerLength: headerLength,
      frameLength: frameLength,
      stamp: stamp
    };
  }
}
function appendFrame(track, data, offset, pts, frameIndex) {
  var frameDuration = getFrameDuration(track.samplerate);
  var header = parseFrameHeader(data, offset, pts, frameIndex, frameDuration);

  if (header) {
    var frameLength = header.frameLength,
        headerLength = header.headerLength,
        stamp = header.stamp;
    var length = headerLength + frameLength;
    var missing = Math.max(0, offset + length - data.length); // logger.log(`AAC frame ${frameIndex}, pts:${stamp} length@offset/total: ${frameLength}@${offset+headerLength}/${data.byteLength} missing: ${missing}`);

    var unit;

    if (missing) {
      unit = new Uint8Array(length - headerLength);
      unit.set(data.subarray(offset + headerLength, data.length), 0);
    } else {
      unit = data.subarray(offset + headerLength, offset + length);
    }

    var sample = {
      unit: unit,
      pts: stamp
    };

    if (!missing) {
      track.samples.push(sample);
    }

    return {
      sample: sample,
      length: length,
      missing: missing
    };
  }
}

/***/ }),

/***/ "./src/demux/base-audio-demuxer.ts":
/*!*****************************************!*\
  !*** ./src/demux/base-audio-demuxer.ts ***!
  \*****************************************/
/*! exports provided: initPTSFn, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPTSFn", function() { return initPTSFn; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _demux_id3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../demux/id3 */ "./src/demux/id3.ts");
/* harmony import */ var _dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dummy-demuxed-track */ "./src/demux/dummy-demuxed-track.ts");
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _utils_typed_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/typed-array */ "./src/utils/typed-array.ts");






var BaseAudioDemuxer = /*#__PURE__*/function () {
  function BaseAudioDemuxer() {
    this._audioTrack = void 0;
    this._id3Track = void 0;
    this.frameIndex = 0;
    this.cachedData = null;
    this.initPTS = null;
  }

  var _proto = BaseAudioDemuxer.prototype;

  _proto.resetInitSegment = function resetInitSegment(audioCodec, videoCodec, duration) {
    this._id3Track = {
      type: 'id3',
      id: 0,
      pid: -1,
      inputTimeScale: 90000,
      sequenceNumber: 0,
      samples: [],
      dropped: 0
    };
  };

  _proto.resetTimeStamp = function resetTimeStamp() {};

  _proto.resetContiguity = function resetContiguity() {};

  _proto.canParse = function canParse(data, offset) {
    return false;
  };

  _proto.appendFrame = function appendFrame(track, data, offset) {} // feed incoming data to the front of the parsing pipeline
  ;

  _proto.demux = function demux(data, timeOffset) {
    if (this.cachedData) {
      data = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_3__["appendUint8Array"])(this.cachedData, data);
      this.cachedData = null;
    }

    var id3Data = _demux_id3__WEBPACK_IMPORTED_MODULE_1__["getID3Data"](data, 0);
    var offset = id3Data ? id3Data.length : 0;
    var lastDataIndex;
    var pts;
    var track = this._audioTrack;
    var id3Track = this._id3Track;
    var timestamp = id3Data ? _demux_id3__WEBPACK_IMPORTED_MODULE_1__["getTimeStamp"](id3Data) : undefined;
    var length = data.length;

    if (this.frameIndex === 0 || this.initPTS === null) {
      this.initPTS = initPTSFn(timestamp, timeOffset);
    } // more expressive than alternative: id3Data?.length


    if (id3Data && id3Data.length > 0) {
      id3Track.samples.push({
        pts: this.initPTS,
        dts: this.initPTS,
        data: id3Data
      });
    }

    pts = this.initPTS;

    while (offset < length) {
      if (this.canParse(data, offset)) {
        var frame = this.appendFrame(track, data, offset);

        if (frame) {
          this.frameIndex++;
          pts = frame.sample.pts;
          offset += frame.length;
          lastDataIndex = offset;
        } else {
          offset = length;
        }
      } else if (_demux_id3__WEBPACK_IMPORTED_MODULE_1__["canParse"](data, offset)) {
        // after a ID3.canParse, a call to ID3.getID3Data *should* always returns some data
        id3Data = _demux_id3__WEBPACK_IMPORTED_MODULE_1__["getID3Data"](data, offset);
        id3Track.samples.push({
          pts: pts,
          dts: pts,
          data: id3Data
        });
        offset += id3Data.length;
        lastDataIndex = offset;
      } else {
        offset++;
      }

      if (offset === length && lastDataIndex !== length) {
        var partialData = Object(_utils_typed_array__WEBPACK_IMPORTED_MODULE_4__["sliceUint8"])(data, lastDataIndex);

        if (this.cachedData) {
          this.cachedData = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_3__["appendUint8Array"])(this.cachedData, partialData);
        } else {
          this.cachedData = partialData;
        }
      }
    }

    return {
      audioTrack: track,
      avcTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_2__["dummyTrack"])(),
      id3Track: id3Track,
      textTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_2__["dummyTrack"])()
    };
  };

  _proto.demuxSampleAes = function demuxSampleAes(data, keyData, timeOffset) {
    return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"));
  };

  _proto.flush = function flush(timeOffset) {
    // Parse cache in case of remaining frames.
    var cachedData = this.cachedData;

    if (cachedData) {
      this.cachedData = null;
      this.demux(cachedData, 0);
    }

    this.frameIndex = 0;
    return {
      audioTrack: this._audioTrack,
      avcTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_2__["dummyTrack"])(),
      id3Track: this._id3Track,
      textTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_2__["dummyTrack"])()
    };
  };

  _proto.destroy = function destroy() {};

  return BaseAudioDemuxer;
}();
/**
 * Initialize PTS
 * <p>
 *    use timestamp unless it is undefined, NaN or Infinity
 * </p>
 */


var initPTSFn = function initPTSFn(timestamp, timeOffset) {
  return Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(timestamp) ? timestamp * 90 : timeOffset * 90000;
};
/* harmony default export */ __webpack_exports__["default"] = (BaseAudioDemuxer);

/***/ }),

/***/ "./src/demux/chunk-cache.ts":
/*!**********************************!*\
  !*** ./src/demux/chunk-cache.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChunkCache; });
var ChunkCache = /*#__PURE__*/function () {
  function ChunkCache() {
    this.chunks = [];
    this.dataLength = 0;
  }

  var _proto = ChunkCache.prototype;

  _proto.push = function push(chunk) {
    this.chunks.push(chunk);
    this.dataLength += chunk.length;
  };

  _proto.flush = function flush() {
    var chunks = this.chunks,
        dataLength = this.dataLength;
    var result;

    if (!chunks.length) {
      return new Uint8Array(0);
    } else if (chunks.length === 1) {
      result = chunks[0];
    } else {
      result = concatUint8Arrays(chunks, dataLength);
    }

    this.reset();
    return result;
  };

  _proto.reset = function reset() {
    this.chunks.length = 0;
    this.dataLength = 0;
  };

  return ChunkCache;
}();



function concatUint8Arrays(chunks, dataLength) {
  var result = new Uint8Array(dataLength);
  var offset = 0;

  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i];
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

/***/ }),

/***/ "./src/demux/dummy-demuxed-track.ts":
/*!******************************************!*\
  !*** ./src/demux/dummy-demuxed-track.ts ***!
  \******************************************/
/*! exports provided: dummyTrack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dummyTrack", function() { return dummyTrack; });
function dummyTrack() {
  return {
    type: '',
    id: -1,
    pid: -1,
    inputTimeScale: 90000,
    sequenceNumber: -1,
    samples: [],
    dropped: 0
  };
}

/***/ }),

/***/ "./src/demux/exp-golomb.ts":
/*!*********************************!*\
  !*** ./src/demux/exp-golomb.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/**
 * Parser for exponential Golomb codes, a variable-bitwidth number encoding scheme used by h264.
 */


var ExpGolomb = /*#__PURE__*/function () {
  function ExpGolomb(data) {
    this.data = void 0;
    this.bytesAvailable = void 0;
    this.word = void 0;
    this.bitsAvailable = void 0;
    this.data = data; // the number of bytes left to examine in this.data

    this.bytesAvailable = data.byteLength; // the current word being examined

    this.word = 0; // :uint
    // the number of bits left to examine in the current word

    this.bitsAvailable = 0; // :uint
  } // ():void


  var _proto = ExpGolomb.prototype;

  _proto.loadWord = function loadWord() {
    var data = this.data;
    var bytesAvailable = this.bytesAvailable;
    var position = data.byteLength - bytesAvailable;
    var workingBytes = new Uint8Array(4);
    var availableBytes = Math.min(4, bytesAvailable);

    if (availableBytes === 0) {
      throw new Error('no bytes available');
    }

    workingBytes.set(data.subarray(position, position + availableBytes));
    this.word = new DataView(workingBytes.buffer).getUint32(0); // track the amount of this.data that has been processed

    this.bitsAvailable = availableBytes * 8;
    this.bytesAvailable -= availableBytes;
  } // (count:int):void
  ;

  _proto.skipBits = function skipBits(count) {
    var skipBytes; // :int

    if (this.bitsAvailable > count) {
      this.word <<= count;
      this.bitsAvailable -= count;
    } else {
      count -= this.bitsAvailable;
      skipBytes = count >> 3;
      count -= skipBytes >> 3;
      this.bytesAvailable -= skipBytes;
      this.loadWord();
      this.word <<= count;
      this.bitsAvailable -= count;
    }
  } // (size:int):uint
  ;

  _proto.readBits = function readBits(size) {
    var bits = Math.min(this.bitsAvailable, size); // :uint

    var valu = this.word >>> 32 - bits; // :uint

    if (size > 32) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].error('Cannot read more than 32 bits at a time');
    }

    this.bitsAvailable -= bits;

    if (this.bitsAvailable > 0) {
      this.word <<= bits;
    } else if (this.bytesAvailable > 0) {
      this.loadWord();
    }

    bits = size - bits;

    if (bits > 0 && this.bitsAvailable) {
      return valu << bits | this.readBits(bits);
    } else {
      return valu;
    }
  } // ():uint
  ;

  _proto.skipLZ = function skipLZ() {
    var leadingZeroCount; // :uint

    for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
      if ((this.word & 0x80000000 >>> leadingZeroCount) !== 0) {
        // the first bit of working word is 1
        this.word <<= leadingZeroCount;
        this.bitsAvailable -= leadingZeroCount;
        return leadingZeroCount;
      }
    } // we exhausted word and still have not found a 1


    this.loadWord();
    return leadingZeroCount + this.skipLZ();
  } // ():void
  ;

  _proto.skipUEG = function skipUEG() {
    this.skipBits(1 + this.skipLZ());
  } // ():void
  ;

  _proto.skipEG = function skipEG() {
    this.skipBits(1 + this.skipLZ());
  } // ():uint
  ;

  _proto.readUEG = function readUEG() {
    var clz = this.skipLZ(); // :uint

    return this.readBits(clz + 1) - 1;
  } // ():int
  ;

  _proto.readEG = function readEG() {
    var valu = this.readUEG(); // :int

    if (0x01 & valu) {
      // the number is odd if the low order bit is set
      return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
    } else {
      return -1 * (valu >>> 1); // divide by two then make it negative
    }
  } // Some convenience functions
  // :Boolean
  ;

  _proto.readBoolean = function readBoolean() {
    return this.readBits(1) === 1;
  } // ():int
  ;

  _proto.readUByte = function readUByte() {
    return this.readBits(8);
  } // ():int
  ;

  _proto.readUShort = function readUShort() {
    return this.readBits(16);
  } // ():int
  ;

  _proto.readUInt = function readUInt() {
    return this.readBits(32);
  }
  /**
   * Advance the ExpGolomb decoder past a scaling list. The scaling
   * list is optionally transmitted as part of a sequence parameter
   * set and is not relevant to transmuxing.
   * @param count the number of entries in this scaling list
   * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
   */
  ;

  _proto.skipScalingList = function skipScalingList(count) {
    var lastScale = 8;
    var nextScale = 8;
    var deltaScale;

    for (var j = 0; j < count; j++) {
      if (nextScale !== 0) {
        deltaScale = this.readEG();
        nextScale = (lastScale + deltaScale + 256) % 256;
      }

      lastScale = nextScale === 0 ? lastScale : nextScale;
    }
  }
  /**
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the H264 metadata that
   * describes the properties of upcoming video frames.
   * @param data {Uint8Array} the bytes of a sequence parameter set
   * @return {object} an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  ;

  _proto.readSPS = function readSPS() {
    var frameCropLeftOffset = 0;
    var frameCropRightOffset = 0;
    var frameCropTopOffset = 0;
    var frameCropBottomOffset = 0;
    var numRefFramesInPicOrderCntCycle;
    var scalingListCount;
    var i;
    var readUByte = this.readUByte.bind(this);
    var readBits = this.readBits.bind(this);
    var readUEG = this.readUEG.bind(this);
    var readBoolean = this.readBoolean.bind(this);
    var skipBits = this.skipBits.bind(this);
    var skipEG = this.skipEG.bind(this);
    var skipUEG = this.skipUEG.bind(this);
    var skipScalingList = this.skipScalingList.bind(this);
    readUByte();
    var profileIdc = readUByte(); // profile_idc

    readBits(5); // profileCompat constraint_set[0-4]_flag, u(5)

    skipBits(3); // reserved_zero_3bits u(3),

    readUByte(); // level_idc u(8)

    skipUEG(); // seq_parameter_set_id
    // some profiles have more optional data we don't need

    if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128) {
      var chromaFormatIdc = readUEG();

      if (chromaFormatIdc === 3) {
        skipBits(1);
      } // separate_colour_plane_flag


      skipUEG(); // bit_depth_luma_minus8

      skipUEG(); // bit_depth_chroma_minus8

      skipBits(1); // qpprime_y_zero_transform_bypass_flag

      if (readBoolean()) {
        // seq_scaling_matrix_present_flag
        scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;

        for (i = 0; i < scalingListCount; i++) {
          if (readBoolean()) {
            // seq_scaling_list_present_flag[ i ]
            if (i < 6) {
              skipScalingList(16);
            } else {
              skipScalingList(64);
            }
          }
        }
      }
    }

    skipUEG(); // log2_max_frame_num_minus4

    var picOrderCntType = readUEG();

    if (picOrderCntType === 0) {
      readUEG(); // log2_max_pic_order_cnt_lsb_minus4
    } else if (picOrderCntType === 1) {
      skipBits(1); // delta_pic_order_always_zero_flag

      skipEG(); // offset_for_non_ref_pic

      skipEG(); // offset_for_top_to_bottom_field

      numRefFramesInPicOrderCntCycle = readUEG();

      for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
        skipEG();
      } // offset_for_ref_frame[ i ]

    }

    skipUEG(); // max_num_ref_frames

    skipBits(1); // gaps_in_frame_num_value_allowed_flag

    var picWidthInMbsMinus1 = readUEG();
    var picHeightInMapUnitsMinus1 = readUEG();
    var frameMbsOnlyFlag = readBits(1);

    if (frameMbsOnlyFlag === 0) {
      skipBits(1);
    } // mb_adaptive_frame_field_flag


    skipBits(1); // direct_8x8_inference_flag

    if (readBoolean()) {
      // frame_cropping_flag
      frameCropLeftOffset = readUEG();
      frameCropRightOffset = readUEG();
      frameCropTopOffset = readUEG();
      frameCropBottomOffset = readUEG();
    }

    var pixelRatio = [1, 1];

    if (readBoolean()) {
      // vui_parameters_present_flag
      if (readBoolean()) {
        // aspect_ratio_info_present_flag
        var aspectRatioIdc = readUByte();

        switch (aspectRatioIdc) {
          case 1:
            pixelRatio = [1, 1];
            break;

          case 2:
            pixelRatio = [12, 11];
            break;

          case 3:
            pixelRatio = [10, 11];
            break;

          case 4:
            pixelRatio = [16, 11];
            break;

          case 5:
            pixelRatio = [40, 33];
            break;

          case 6:
            pixelRatio = [24, 11];
            break;

          case 7:
            pixelRatio = [20, 11];
            break;

          case 8:
            pixelRatio = [32, 11];
            break;

          case 9:
            pixelRatio = [80, 33];
            break;

          case 10:
            pixelRatio = [18, 11];
            break;

          case 11:
            pixelRatio = [15, 11];
            break;

          case 12:
            pixelRatio = [64, 33];
            break;

          case 13:
            pixelRatio = [160, 99];
            break;

          case 14:
            pixelRatio = [4, 3];
            break;

          case 15:
            pixelRatio = [3, 2];
            break;

          case 16:
            pixelRatio = [2, 1];
            break;

          case 255:
            {
              pixelRatio = [readUByte() << 8 | readUByte(), readUByte() << 8 | readUByte()];
              break;
            }
        }
      }
    }

    return {
      width: Math.ceil((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2),
      height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset),
      pixelRatio: pixelRatio
    };
  };

  _proto.readSliceType = function readSliceType() {
    // skip NALu type
    this.readUByte(); // discard first_mb_in_slice

    this.readUEG(); // return slice_type

    return this.readUEG();
  };

  return ExpGolomb;
}();

/* harmony default export */ __webpack_exports__["default"] = (ExpGolomb);

/***/ }),

/***/ "./src/demux/id3.ts":
/*!**************************!*\
  !*** ./src/demux/id3.ts ***!
  \**************************/
/*! exports provided: isHeader, isFooter, getID3Data, canParse, getTimeStamp, isTimeStampFrame, getID3Frames, decodeFrame, utf8ArrayToStr, testables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHeader", function() { return isHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFooter", function() { return isFooter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getID3Data", function() { return getID3Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canParse", function() { return canParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeStamp", function() { return getTimeStamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTimeStampFrame", function() { return isTimeStampFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getID3Frames", function() { return getID3Frames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeFrame", function() { return decodeFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8ArrayToStr", function() { return utf8ArrayToStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testables", function() { return testables; });
// breaking up those two types in order to clarify what is happening in the decoding path.

/**
 * Returns true if an ID3 header can be found at offset in data
 * @param {Uint8Array} data - The data to search in
 * @param {number} offset - The offset at which to start searching
 * @return {boolean} - True if an ID3 header is found
 */
var isHeader = function isHeader(data, offset) {
  /*
   * http://id3.org/id3v2.3.0
   * [0]     = 'I'
   * [1]     = 'D'
   * [2]     = '3'
   * [3,4]   = {Version}
   * [5]     = {Flags}
   * [6-9]   = {ID3 Size}
   *
   * An ID3v2 tag can be detected with the following pattern:
   *  $49 44 33 yy yy xx zz zz zz zz
   * Where yy is less than $FF, xx is the 'flags' byte and zz is less than $80
   */
  if (offset + 10 <= data.length) {
    // look for 'ID3' identifier
    if (data[offset] === 0x49 && data[offset + 1] === 0x44 && data[offset + 2] === 0x33) {
      // check version is within range
      if (data[offset + 3] < 0xff && data[offset + 4] < 0xff) {
        // check size is within range
        if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
          return true;
        }
      }
    }
  }

  return false;
};
/**
 * Returns true if an ID3 footer can be found at offset in data
 * @param {Uint8Array} data - The data to search in
 * @param {number} offset - The offset at which to start searching
 * @return {boolean} - True if an ID3 footer is found
 */

var isFooter = function isFooter(data, offset) {
  /*
   * The footer is a copy of the header, but with a different identifier
   */
  if (offset + 10 <= data.length) {
    // look for '3DI' identifier
    if (data[offset] === 0x33 && data[offset + 1] === 0x44 && data[offset + 2] === 0x49) {
      // check version is within range
      if (data[offset + 3] < 0xff && data[offset + 4] < 0xff) {
        // check size is within range
        if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
          return true;
        }
      }
    }
  }

  return false;
};
/**
 * Returns any adjacent ID3 tags found in data starting at offset, as one block of data
 * @param {Uint8Array} data - The data to search in
 * @param {number} offset - The offset at which to start searching
 * @return {Uint8Array | undefined} - The block of data containing any ID3 tags found
 * or *undefined* if no header is found at the starting offset
 */

var getID3Data = function getID3Data(data, offset) {
  var front = offset;
  var length = 0;

  while (isHeader(data, offset)) {
    // ID3 header is 10 bytes
    length += 10;
    var size = readSize(data, offset + 6);
    length += size;

    if (isFooter(data, offset + 10)) {
      // ID3 footer is 10 bytes
      length += 10;
    }

    offset += length;
  }

  if (length > 0) {
    return data.subarray(front, front + length);
  }

  return undefined;
};

var readSize = function readSize(data, offset) {
  var size = 0;
  size = (data[offset] & 0x7f) << 21;
  size |= (data[offset + 1] & 0x7f) << 14;
  size |= (data[offset + 2] & 0x7f) << 7;
  size |= data[offset + 3] & 0x7f;
  return size;
};

var canParse = function canParse(data, offset) {
  return isHeader(data, offset) && readSize(data, offset + 6) + 10 <= data.length - offset;
};
/**
 * Searches for the Elementary Stream timestamp found in the ID3 data chunk
 * @param {Uint8Array} data - Block of data containing one or more ID3 tags
 * @return {number | undefined} - The timestamp
 */

var getTimeStamp = function getTimeStamp(data) {
  var frames = getID3Frames(data);

  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];

    if (isTimeStampFrame(frame)) {
      return readTimeStamp(frame);
    }
  }

  return undefined;
};
/**
 * Returns true if the ID3 frame is an Elementary Stream timestamp frame
 * @param {ID3 frame} frame
 */

var isTimeStampFrame = function isTimeStampFrame(frame) {
  return frame && frame.key === 'PRIV' && frame.info === 'com.apple.streaming.transportStreamTimestamp';
};

var getFrameData = function getFrameData(data) {
  /*
  Frame ID       $xx xx xx xx (four characters)
  Size           $xx xx xx xx
  Flags          $xx xx
  */
  var type = String.fromCharCode(data[0], data[1], data[2], data[3]);
  var size = readSize(data, 4); // skip frame id, size, and flags

  var offset = 10;
  return {
    type: type,
    size: size,
    data: data.subarray(offset, offset + size)
  };
};
/**
 * Returns an array of ID3 frames found in all the ID3 tags in the id3Data
 * @param {Uint8Array} id3Data - The ID3 data containing one or more ID3 tags
 * @return {ID3.Frame[]} - Array of ID3 frame objects
 */


var getID3Frames = function getID3Frames(id3Data) {
  var offset = 0;
  var frames = [];

  while (isHeader(id3Data, offset)) {
    var size = readSize(id3Data, offset + 6); // skip past ID3 header

    offset += 10;
    var end = offset + size; // loop through frames in the ID3 tag

    while (offset + 8 < end) {
      var frameData = getFrameData(id3Data.subarray(offset));
      var frame = decodeFrame(frameData);

      if (frame) {
        frames.push(frame);
      } // skip frame header and frame data


      offset += frameData.size + 10;
    }

    if (isFooter(id3Data, offset)) {
      offset += 10;
    }
  }

  return frames;
};
var decodeFrame = function decodeFrame(frame) {
  if (frame.type === 'PRIV') {
    return decodePrivFrame(frame);
  } else if (frame.type[0] === 'W') {
    return decodeURLFrame(frame);
  }

  return decodeTextFrame(frame);
};

var decodePrivFrame = function decodePrivFrame(frame) {
  /*
  Format: <text string>\0<binary data>
  */
  if (frame.size < 2) {
    return undefined;
  }

  var owner = utf8ArrayToStr(frame.data, true);
  var privateData = new Uint8Array(frame.data.subarray(owner.length + 1));
  return {
    key: frame.type,
    info: owner,
    data: privateData.buffer
  };
};

var decodeTextFrame = function decodeTextFrame(frame) {
  if (frame.size < 2) {
    return undefined;
  }

  if (frame.type === 'TXXX') {
    /*
    Format:
    [0]   = {Text Encoding}
    [1-?] = {Description}\0{Value}
    */
    var index = 1;
    var description = utf8ArrayToStr(frame.data.subarray(index), true);
    index += description.length + 1;
    var value = utf8ArrayToStr(frame.data.subarray(index));
    return {
      key: frame.type,
      info: description,
      data: value
    };
  }
  /*
  Format:
  [0]   = {Text Encoding}
  [1-?] = {Value}
  */


  var text = utf8ArrayToStr(frame.data.subarray(1));
  return {
    key: frame.type,
    data: text
  };
};

var decodeURLFrame = function decodeURLFrame(frame) {
  if (frame.type === 'WXXX') {
    /*
    Format:
    [0]   = {Text Encoding}
    [1-?] = {Description}\0{URL}
    */
    if (frame.size < 2) {
      return undefined;
    }

    var index = 1;
    var description = utf8ArrayToStr(frame.data.subarray(index), true);
    index += description.length + 1;
    var value = utf8ArrayToStr(frame.data.subarray(index));
    return {
      key: frame.type,
      info: description,
      data: value
    };
  }
  /*
  Format:
  [0-?] = {URL}
  */


  var url = utf8ArrayToStr(frame.data);
  return {
    key: frame.type,
    data: url
  };
};

var readTimeStamp = function readTimeStamp(timeStampFrame) {
  if (timeStampFrame.data.byteLength === 8) {
    var data = new Uint8Array(timeStampFrame.data); // timestamp is 33 bit expressed as a big-endian eight-octet number,
    // with the upper 31 bits set to zero.

    var pts33Bit = data[3] & 0x1;
    var timestamp = (data[4] << 23) + (data[5] << 15) + (data[6] << 7) + data[7];
    timestamp /= 45;

    if (pts33Bit) {
      timestamp += 47721858.84;
    } // 2^32 / 90


    return Math.round(timestamp);
  }

  return undefined;
}; // http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript/22373197
// http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */


var utf8ArrayToStr = function utf8ArrayToStr(array, exitOnNull) {
  if (exitOnNull === void 0) {
    exitOnNull = false;
  }

  var decoder = getTextDecoder();

  if (decoder) {
    var decoded = decoder.decode(array);

    if (exitOnNull) {
      // grab up to the first null
      var idx = decoded.indexOf('\0');
      return idx !== -1 ? decoded.substring(0, idx) : decoded;
    } // remove any null characters


    return decoded.replace(/\0/g, '');
  }

  var len = array.length;
  var c;
  var char2;
  var char3;
  var out = '';
  var i = 0;

  while (i < len) {
    c = array[i++];

    if (c === 0x00 && exitOnNull) {
      return out;
    } else if (c === 0x00 || c === 0x03) {
      // If the character is 3 (END_OF_TEXT) or 0 (NULL) then skip it
      continue;
    }

    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;

      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode((c & 0x1f) << 6 | char2 & 0x3f);
        break;

      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode((c & 0x0f) << 12 | (char2 & 0x3f) << 6 | (char3 & 0x3f) << 0);
        break;

      default:
    }
  }

  return out;
};
var testables = {
  decodeTextFrame: decodeTextFrame
};
var decoder;

function getTextDecoder() {
  if (!decoder && typeof self.TextDecoder !== 'undefined') {
    decoder = new self.TextDecoder('utf-8');
  }

  return decoder;
}

/***/ }),

/***/ "./src/demux/mp3demuxer.ts":
/*!*********************************!*\
  !*** ./src/demux/mp3demuxer.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_audio_demuxer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-audio-demuxer */ "./src/demux/base-audio-demuxer.ts");
/* harmony import */ var _demux_id3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../demux/id3 */ "./src/demux/id3.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _mpegaudio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mpegaudio */ "./src/demux/mpegaudio.ts");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * MP3 demuxer
 */





var MP3Demuxer = /*#__PURE__*/function (_BaseAudioDemuxer) {
  _inheritsLoose(MP3Demuxer, _BaseAudioDemuxer);

  function MP3Demuxer() {
    return _BaseAudioDemuxer.apply(this, arguments) || this;
  }

  var _proto = MP3Demuxer.prototype;

  _proto.resetInitSegment = function resetInitSegment(audioCodec, videoCodec, duration) {
    _BaseAudioDemuxer.prototype.resetInitSegment.call(this, audioCodec, videoCodec, duration);

    this._audioTrack = {
      container: 'audio/mpeg',
      type: 'audio',
      id: 0,
      pid: -1,
      sequenceNumber: 0,
      isAAC: false,
      samples: [],
      manifestCodec: audioCodec,
      duration: duration,
      inputTimeScale: 90000,
      dropped: 0
    };
  };

  MP3Demuxer.probe = function probe(data) {
    if (!data) {
      return false;
    } // check if data contains ID3 timestamp and MPEG sync word
    // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
    // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
    // More info http://www.mp3-tech.org/programmer/frame_header.html


    var id3Data = _demux_id3__WEBPACK_IMPORTED_MODULE_1__["getID3Data"](data, 0) || [];
    var offset = id3Data.length;

    for (var length = data.length; offset < length; offset++) {
      if (_mpegaudio__WEBPACK_IMPORTED_MODULE_3__["probe"](data, offset)) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('MPEG Audio sync word found !');
        return true;
      }
    }

    return false;
  };

  _proto.canParse = function canParse(data, offset) {
    return _mpegaudio__WEBPACK_IMPORTED_MODULE_3__["canParse"](data, offset);
  };

  _proto.appendFrame = function appendFrame(track, data, offset) {
    if (this.initPTS === null) {
      return;
    }

    return _mpegaudio__WEBPACK_IMPORTED_MODULE_3__["appendFrame"](track, data, offset, this.initPTS, this.frameIndex);
  };

  return MP3Demuxer;
}(_base_audio_demuxer__WEBPACK_IMPORTED_MODULE_0__["default"]);

MP3Demuxer.minProbeByteLength = 4;
/* harmony default export */ __webpack_exports__["default"] = (MP3Demuxer);

/***/ }),

/***/ "./src/demux/mp4demuxer.ts":
/*!*********************************!*\
  !*** ./src/demux/mp4demuxer.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dummy-demuxed-track */ "./src/demux/dummy-demuxed-track.ts");
/**
 * MP4 demuxer
 */



var MP4Demuxer = /*#__PURE__*/function () {
  function MP4Demuxer(observer, config) {
    this.remainderData = null;
    this.config = void 0;
    this.config = config;
  }

  var _proto = MP4Demuxer.prototype;

  _proto.resetTimeStamp = function resetTimeStamp() {};

  _proto.resetInitSegment = function resetInitSegment() {};

  _proto.resetContiguity = function resetContiguity() {};

  MP4Demuxer.probe = function probe(data) {
    // ensure we find a moof box in the first 16 kB
    return Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_0__["findBox"])({
      data: data,
      start: 0,
      end: Math.min(data.length, 16384)
    }, ['moof']).length > 0;
  };

  _proto.demux = function demux(data) {
    // Load all data into the avc track. The CMAF remuxer will look for the data in the samples object; the rest of the fields do not matter
    var avcSamples = data;
    var avcTrack = Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])();

    if (this.config.progressive) {
      // Split the bytestream into two ranges: one encompassing all data up until the start of the last moof, and everything else.
      // This is done to guarantee that we're sending valid data to MSE - when demuxing progressively, we have no guarantee
      // that the fetch loader gives us flush moof+mdat pairs. If we push jagged data to MSE, it will throw an exception.
      if (this.remainderData) {
        avcSamples = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_0__["appendUint8Array"])(this.remainderData, data);
      }

      var segmentedData = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_0__["segmentValidRange"])(avcSamples);
      this.remainderData = segmentedData.remainder;
      avcTrack.samples = segmentedData.valid || new Uint8Array();
    } else {
      avcTrack.samples = avcSamples;
    }

    return {
      audioTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])(),
      avcTrack: avcTrack,
      id3Track: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])(),
      textTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])()
    };
  };

  _proto.flush = function flush() {
    var avcTrack = Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])();
    avcTrack.samples = this.remainderData || new Uint8Array();
    this.remainderData = null;
    return {
      audioTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])(),
      avcTrack: avcTrack,
      id3Track: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])(),
      textTrack: Object(_dummy_demuxed_track__WEBPACK_IMPORTED_MODULE_1__["dummyTrack"])()
    };
  };

  _proto.demuxSampleAes = function demuxSampleAes(data, keyData, timeOffset) {
    return Promise.reject(new Error('The MP4 demuxer does not support SAMPLE-AES decryption'));
  };

  _proto.destroy = function destroy() {};

  return MP4Demuxer;
}();

MP4Demuxer.minProbeByteLength = 1024;
/* harmony default export */ __webpack_exports__["default"] = (MP4Demuxer);

/***/ }),

/***/ "./src/demux/mpegaudio.ts":
/*!********************************!*\
  !*** ./src/demux/mpegaudio.ts ***!
  \********************************/
/*! exports provided: appendFrame, parseHeader, isHeaderPattern, isHeader, canParse, probe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendFrame", function() { return appendFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHeader", function() { return parseHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHeaderPattern", function() { return isHeaderPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHeader", function() { return isHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canParse", function() { return canParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "probe", function() { return probe; });
/**
 *  MPEG parser helper
 */
var chromeVersion = null;
var BitratesMap = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160];
var SamplingRateMap = [44100, 48000, 32000, 22050, 24000, 16000, 11025, 12000, 8000];
var SamplesCoefficients = [// MPEG 2.5
[0, // Reserved
72, // Layer3
144, // Layer2
12 // Layer1
], // Reserved
[0, // Reserved
0, // Layer3
0, // Layer2
0 // Layer1
], // MPEG 2
[0, // Reserved
72, // Layer3
144, // Layer2
12 // Layer1
], // MPEG 1
[0, // Reserved
144, // Layer3
144, // Layer2
12 // Layer1
]];
var BytesInSlot = [0, // Reserved
1, // Layer3
1, // Layer2
4 // Layer1
];
function appendFrame(track, data, offset, pts, frameIndex) {
  // Using http://www.datavoyage.com/mpgscript/mpeghdr.htm as a reference
  if (offset + 24 > data.length) {
    return;
  }

  var header = parseHeader(data, offset);

  if (header && offset + header.frameLength <= data.length) {
    var frameDuration = header.samplesPerFrame * 90000 / header.sampleRate;
    var stamp = pts + frameIndex * frameDuration;
    var sample = {
      unit: data.subarray(offset, offset + header.frameLength),
      pts: stamp,
      dts: stamp
    };
    track.config = [];
    track.channelCount = header.channelCount;
    track.samplerate = header.sampleRate;
    track.samples.push(sample);
    return {
      sample: sample,
      length: header.frameLength,
      missing: 0
    };
  }
}
function parseHeader(data, offset) {
  var mpegVersion = data[offset + 1] >> 3 & 3;
  var mpegLayer = data[offset + 1] >> 1 & 3;
  var bitRateIndex = data[offset + 2] >> 4 & 15;
  var sampleRateIndex = data[offset + 2] >> 2 & 3;

  if (mpegVersion !== 1 && bitRateIndex !== 0 && bitRateIndex !== 15 && sampleRateIndex !== 3) {
    var paddingBit = data[offset + 2] >> 1 & 1;
    var channelMode = data[offset + 3] >> 6;
    var columnInBitrates = mpegVersion === 3 ? 3 - mpegLayer : mpegLayer === 3 ? 3 : 4;
    var bitRate = BitratesMap[columnInBitrates * 14 + bitRateIndex - 1] * 1000;
    var columnInSampleRates = mpegVersion === 3 ? 0 : mpegVersion === 2 ? 1 : 2;
    var sampleRate = SamplingRateMap[columnInSampleRates * 3 + sampleRateIndex];
    var channelCount = channelMode === 3 ? 1 : 2; // If bits of channel mode are `11` then it is a single channel (Mono)

    var sampleCoefficient = SamplesCoefficients[mpegVersion][mpegLayer];
    var bytesInSlot = BytesInSlot[mpegLayer];
    var samplesPerFrame = sampleCoefficient * 8 * bytesInSlot;
    var frameLength = Math.floor(sampleCoefficient * bitRate / sampleRate + paddingBit) * bytesInSlot;

    if (chromeVersion === null) {
      var userAgent = navigator.userAgent || '';
      var result = userAgent.match(/Chrome\/(\d+)/i);
      chromeVersion = result ? parseInt(result[1]) : 0;
    }

    var needChromeFix = !!chromeVersion && chromeVersion <= 87;

    if (needChromeFix && mpegLayer === 2 && bitRate >= 224000 && channelMode === 0) {
      // Work around bug in Chromium by setting channelMode to dual-channel (01) instead of stereo (00)
      data[offset + 3] = data[offset + 3] | 0x80;
    }

    return {
      sampleRate: sampleRate,
      channelCount: channelCount,
      frameLength: frameLength,
      samplesPerFrame: samplesPerFrame
    };
  }
}
function isHeaderPattern(data, offset) {
  return data[offset] === 0xff && (data[offset + 1] & 0xe0) === 0xe0 && (data[offset + 1] & 0x06) !== 0x00;
}
function isHeader(data, offset) {
  // Look for MPEG header | 1111 1111 | 111X XYZX | where X can be either 0 or 1 and Y or Z should be 1
  // Layer bits (position 14 and 15) in header should be always different from 0 (Layer I or Layer II or Layer III)
  // More info http://www.mp3-tech.org/programmer/frame_header.html
  return offset + 1 < data.length && isHeaderPattern(data, offset);
}
function canParse(data, offset) {
  var headerSize = 4;
  return isHeaderPattern(data, offset) && headerSize <= data.length - offset;
}
function probe(data, offset) {
  // same as isHeader but we also check that MPEG frame follows last MPEG frame
  // or end of data is reached
  if (offset + 1 < data.length && isHeaderPattern(data, offset)) {
    // MPEG header Length
    var headerLength = 4; // MPEG frame Length

    var header = parseHeader(data, offset);
    var frameLength = headerLength;

    if (header !== null && header !== void 0 && header.frameLength) {
      frameLength = header.frameLength;
    }

    var newOffset = offset + frameLength;
    return newOffset === data.length || isHeader(data, newOffset);
  }

  return false;
}

/***/ }),

/***/ "./src/demux/sample-aes.ts":
/*!*********************************!*\
  !*** ./src/demux/sample-aes.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _crypt_decrypter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../crypt/decrypter */ "./src/crypt/decrypter.ts");
/* harmony import */ var _tsdemuxer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tsdemuxer */ "./src/demux/tsdemuxer.ts");
/**
 * SAMPLE-AES decrypter
 */



var SampleAesDecrypter = /*#__PURE__*/function () {
  function SampleAesDecrypter(observer, config, keyData) {
    this.keyData = void 0;
    this.decrypter = void 0;
    this.keyData = keyData;
    this.decrypter = new _crypt_decrypter__WEBPACK_IMPORTED_MODULE_0__["default"](observer, config, {
      removePKCS7Padding: false
    });
  }

  var _proto = SampleAesDecrypter.prototype;

  _proto.decryptBuffer = function decryptBuffer(encryptedData, callback) {
    this.decrypter.decrypt(encryptedData, this.keyData.key.buffer, this.keyData.iv.buffer, callback);
  } // AAC - encrypt all full 16 bytes blocks starting from offset 16
  ;

  _proto.decryptAacSample = function decryptAacSample(samples, sampleIndex, callback, sync) {
    var curUnit = samples[sampleIndex].unit;
    var encryptedData = curUnit.subarray(16, curUnit.length - curUnit.length % 16);
    var encryptedBuffer = encryptedData.buffer.slice(encryptedData.byteOffset, encryptedData.byteOffset + encryptedData.length);
    var localthis = this;
    this.decryptBuffer(encryptedBuffer, function (decryptedBuffer) {
      var decryptedData = new Uint8Array(decryptedBuffer);
      curUnit.set(decryptedData, 16);

      if (!sync) {
        localthis.decryptAacSamples(samples, sampleIndex + 1, callback);
      }
    });
  };

  _proto.decryptAacSamples = function decryptAacSamples(samples, sampleIndex, callback) {
    for (;; sampleIndex++) {
      if (sampleIndex >= samples.length) {
        callback();
        return;
      }

      if (samples[sampleIndex].unit.length < 32) {
        continue;
      }

      var sync = this.decrypter.isSync();
      this.decryptAacSample(samples, sampleIndex, callback, sync);

      if (!sync) {
        return;
      }
    }
  } // AVC - encrypt one 16 bytes block out of ten, starting from offset 32
  ;

  _proto.getAvcEncryptedData = function getAvcEncryptedData(decodedData) {
    var encryptedDataLen = Math.floor((decodedData.length - 48) / 160) * 16 + 16;
    var encryptedData = new Int8Array(encryptedDataLen);
    var outputPos = 0;

    for (var inputPos = 32; inputPos <= decodedData.length - 16; inputPos += 160, outputPos += 16) {
      encryptedData.set(decodedData.subarray(inputPos, inputPos + 16), outputPos);
    }

    return encryptedData;
  };

  _proto.getAvcDecryptedUnit = function getAvcDecryptedUnit(decodedData, decryptedData) {
    var uint8DecryptedData = new Uint8Array(decryptedData);
    var inputPos = 0;

    for (var outputPos = 32; outputPos <= decodedData.length - 16; outputPos += 160, inputPos += 16) {
      decodedData.set(uint8DecryptedData.subarray(inputPos, inputPos + 16), outputPos);
    }

    return decodedData;
  };

  _proto.decryptAvcSample = function decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit, sync) {
    var decodedData = Object(_tsdemuxer__WEBPACK_IMPORTED_MODULE_1__["discardEPB"])(curUnit.data);
    var encryptedData = this.getAvcEncryptedData(decodedData);
    var localthis = this;
    this.decryptBuffer(encryptedData.buffer, function (decryptedBuffer) {
      curUnit.data = localthis.getAvcDecryptedUnit(decodedData, decryptedBuffer);

      if (!sync) {
        localthis.decryptAvcSamples(samples, sampleIndex, unitIndex + 1, callback);
      }
    });
  };

  _proto.decryptAvcSamples = function decryptAvcSamples(samples, sampleIndex, unitIndex, callback) {
    if (samples instanceof Uint8Array) {
      throw new Error('Cannot decrypt samples of type Uint8Array');
    }

    for (;; sampleIndex++, unitIndex = 0) {
      if (sampleIndex >= samples.length) {
        callback();
        return;
      }

      var curUnits = samples[sampleIndex].units;

      for (;; unitIndex++) {
        if (unitIndex >= curUnits.length) {
          break;
        }

        var curUnit = curUnits[unitIndex];

        if (curUnit.data.length <= 48 || curUnit.type !== 1 && curUnit.type !== 5) {
          continue;
        }

        var sync = this.decrypter.isSync();
        this.decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit, sync);

        if (!sync) {
          return;
        }
      }
    }
  };

  return SampleAesDecrypter;
}();

/* harmony default export */ __webpack_exports__["default"] = (SampleAesDecrypter);

/***/ }),

/***/ "./src/demux/transmuxer-interface.ts":
/*!*******************************************!*\
  !*** ./src/demux/transmuxer-interface.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransmuxerInterface; });
/* harmony import */ var webworkify_webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webworkify-webpack */ "./node_modules/webworkify-webpack/index.js");
/* harmony import */ var webworkify_webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webworkify_webpack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _demux_transmuxer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../demux/transmuxer */ "./src/demux/transmuxer.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _utils_mediasource_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/mediasource-helper */ "./src/utils/mediasource-helper.ts");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_6__);







var MediaSource = Object(_utils_mediasource_helper__WEBPACK_IMPORTED_MODULE_5__["getMediaSource"])() || {
  isTypeSupported: function isTypeSupported() {
    return false;
  }
};

var TransmuxerInterface = /*#__PURE__*/function () {
  function TransmuxerInterface(hls, id, onTransmuxComplete, onFlush) {
    var _this = this;

    this.hls = void 0;
    this.id = void 0;
    this.observer = void 0;
    this.frag = null;
    this.part = null;
    this.worker = void 0;
    this.onwmsg = void 0;
    this.transmuxer = null;
    this.onTransmuxComplete = void 0;
    this.onFlush = void 0;
    this.hls = hls;
    this.id = id;
    this.onTransmuxComplete = onTransmuxComplete;
    this.onFlush = onFlush;
    var config = hls.config;

    var forwardMessage = function forwardMessage(ev, data) {
      data = data || {};
      data.frag = _this.frag;
      data.id = _this.id;
      hls.trigger(ev, data);
    }; // forward events to main thread


    this.observer = new eventemitter3__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
    this.observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_DECRYPTED, forwardMessage);
    this.observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, forwardMessage);
    var typeSupported = {
      mp4: MediaSource.isTypeSupported('video/mp4'),
      mpeg: MediaSource.isTypeSupported('audio/mpeg'),
      mp3: MediaSource.isTypeSupported('audio/mp4; codecs="mp3"')
    }; // navigator.vendor is not always available in Web Worker
    // refer to https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/navigator

    var vendor = navigator.vendor;

    if (config.enableWorker && typeof Worker !== 'undefined') {
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].log('demuxing in webworker');
      var worker;

      try {
        worker = this.worker = webworkify_webpack__WEBPACK_IMPORTED_MODULE_0__(/*require.resolve*/(/*! ../demux/transmuxer-worker.ts */ "./src/demux/transmuxer-worker.ts"));
        this.onwmsg = this.onWorkerMessage.bind(this);
        worker.addEventListener('message', this.onwmsg);

        worker.onerror = function (event) {
          hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
            type: _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorTypes"].OTHER_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorDetails"].INTERNAL_EXCEPTION,
            fatal: true,
            event: 'demuxerWorker',
            error: new Error(event.message + "  (" + event.filename + ":" + event.lineno + ")")
          });
        };

        worker.postMessage({
          cmd: 'init',
          typeSupported: typeSupported,
          vendor: vendor,
          id: id,
          config: JSON.stringify(config)
        });
      } catch (err) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn('Error in worker:', err);
        _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].error('Error while initializing DemuxerWorker, fallback to inline');

        if (worker) {
          // revoke the Object URL that was used to create transmuxer worker, so as not to leak it
          self.URL.revokeObjectURL(worker.objectURL);
        }

        this.transmuxer = new _demux_transmuxer__WEBPACK_IMPORTED_MODULE_2__["default"](this.observer, typeSupported, config, vendor, id);
        this.worker = null;
      }
    } else {
      this.transmuxer = new _demux_transmuxer__WEBPACK_IMPORTED_MODULE_2__["default"](this.observer, typeSupported, config, vendor, id);
    }
  }

  var _proto = TransmuxerInterface.prototype;

  _proto.destroy = function destroy() {
    var w = this.worker;

    if (w) {
      w.removeEventListener('message', this.onwmsg);
      w.terminate();
      this.worker = null;
    } else {
      var transmuxer = this.transmuxer;

      if (transmuxer) {
        transmuxer.destroy();
        this.transmuxer = null;
      }
    }

    var observer = this.observer;

    if (observer) {
      observer.removeAllListeners();
    } // @ts-ignore


    this.observer = null;
  };

  _proto.push = function push(data, initSegmentData, audioCodec, videoCodec, frag, part, duration, accurateTimeOffset, chunkMeta, defaultInitPTS) {
    var _this2 = this;

    chunkMeta.transmuxing.start = self.performance.now();
    var transmuxer = this.transmuxer,
        worker = this.worker;
    var timeOffset = part ? part.start : frag.start;
    var decryptdata = frag.decryptdata;
    var lastFrag = this.frag;
    var discontinuity = !(lastFrag && frag.cc === lastFrag.cc);
    var trackSwitch = !(lastFrag && chunkMeta.level === lastFrag.level);
    var snDiff = lastFrag ? chunkMeta.sn - lastFrag.sn : -1;
    var partDiff = this.part ? chunkMeta.part - this.part.index : 1;
    var contiguous = !trackSwitch && (snDiff === 1 || snDiff === 0 && partDiff === 1);
    var now = self.performance.now();

    if (trackSwitch || snDiff || frag.stats.parsing.start === 0) {
      frag.stats.parsing.start = now;
    }

    if (part && (partDiff || !contiguous)) {
      part.stats.parsing.start = now;
    }

    var state = new _demux_transmuxer__WEBPACK_IMPORTED_MODULE_2__["TransmuxState"](discontinuity, contiguous, accurateTimeOffset, trackSwitch, timeOffset);

    if (!contiguous || discontinuity) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].log("[transmuxer-interface, " + frag.type + "]: Starting new transmux session for sn: " + chunkMeta.sn + " p: " + chunkMeta.part + " level: " + chunkMeta.level + " id: " + chunkMeta.id + "\n        discontinuity: " + discontinuity + "\n        trackSwitch: " + trackSwitch + "\n        contiguous: " + contiguous + "\n        accurateTimeOffset: " + accurateTimeOffset + "\n        timeOffset: " + timeOffset);
      var config = new _demux_transmuxer__WEBPACK_IMPORTED_MODULE_2__["TransmuxConfig"](audioCodec, videoCodec, initSegmentData, duration, defaultInitPTS);
      this.configureTransmuxer(config);
    }

    this.frag = frag;
    this.part = part; // Frags with sn of 'initSegment' are not transmuxed

    if (worker) {
      // post fragment payload as transferable objects for ArrayBuffer (no copy)
      worker.postMessage({
        cmd: 'demux',
        data: data,
        decryptdata: decryptdata,
        chunkMeta: chunkMeta,
        state: state
      }, data instanceof ArrayBuffer ? [data] : []);
    } else if (transmuxer) {
      var _transmuxResult = transmuxer.push(data, decryptdata, chunkMeta, state);

      if (Object(_demux_transmuxer__WEBPACK_IMPORTED_MODULE_2__["isPromise"])(_transmuxResult)) {
        _transmuxResult.then(function (data) {
          _this2.handleTransmuxComplete(data);
        });
      } else {
        this.handleTransmuxComplete(_transmuxResult);
      }
    }
  };

  _proto.flush = function flush(chunkMeta) {
    var _this3 = this;

    chunkMeta.transmuxing.start = self.performance.now();
    var transmuxer = this.transmuxer,
        worker = this.worker;

    if (worker) {
      worker.postMessage({
        cmd: 'flush',
        chunkMeta: chunkMeta
      });
    } else if (transmuxer) {
      var _transmuxResult2 = transmuxer.flush(chunkMeta);

      if (Object(_demux_transmuxer__WEBPACK_IMPORTED_MODULE_2__["isPromise"])(_transmuxResult2)) {
        _transmuxResult2.then(function (data) {
          _this3.handleFlushResult(data, chunkMeta);
        });
      } else {
        this.handleFlushResult(_transmuxResult2, chunkMeta);
      }
    }
  };

  _proto.handleFlushResult = function handleFlushResult(results, chunkMeta) {
    var _this4 = this;

    results.forEach(function (result) {
      _this4.handleTransmuxComplete(result);
    });
    this.onFlush(chunkMeta);
  };

  _proto.onWorkerMessage = function onWorkerMessage(ev) {
    var data = ev.data;
    var hls = this.hls;

    switch (data.event) {
      case 'init':
        {
          // revoke the Object URL that was used to create transmuxer worker, so as not to leak it
          self.URL.revokeObjectURL(this.worker.objectURL);
          break;
        }

      case 'transmuxComplete':
        {
          this.handleTransmuxComplete(data.data);
          break;
        }

      case 'flush':
        {
          this.onFlush(data.data);
          break;
        }

      /* falls through */

      default:
        {
          data.data = data.data || {};
          data.data.frag = this.frag;
          data.data.id = this.id;
          hls.trigger(data.event, data.data);
          break;
        }
    }
  };

  _proto.configureTransmuxer = function configureTransmuxer(config) {
    var worker = this.worker,
        transmuxer = this.transmuxer;

    if (worker) {
      worker.postMessage({
        cmd: 'configure',
        config: config
      });
    } else if (transmuxer) {
      transmuxer.configure(config);
    }
  };

  _proto.handleTransmuxComplete = function handleTransmuxComplete(result) {
    result.chunkMeta.transmuxing.end = self.performance.now();
    this.onTransmuxComplete(result);
  };

  return TransmuxerInterface;
}();



/***/ }),

/***/ "./src/demux/transmuxer-worker.ts":
/*!****************************************!*\
  !*** ./src/demux/transmuxer-worker.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransmuxerWorker; });
/* harmony import */ var _demux_transmuxer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../demux/transmuxer */ "./src/demux/transmuxer.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_3__);




function TransmuxerWorker(self) {
  var observer = new eventemitter3__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();

  var forwardMessage = function forwardMessage(ev, data) {
    self.postMessage({
      event: ev,
      data: data
    });
  }; // forward events to main thread


  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].FRAG_DECRYPTED, forwardMessage);
  observer.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, forwardMessage);
  self.addEventListener('message', function (ev) {
    var data = ev.data;

    switch (data.cmd) {
      case 'init':
        {
          var config = JSON.parse(data.config);
          self.transmuxer = new _demux_transmuxer__WEBPACK_IMPORTED_MODULE_0__["default"](observer, data.typeSupported, config, data.vendor, data.id);
          Object(_utils_logger__WEBPACK_IMPORTED_MODULE_2__["enableLogs"])(config.debug);
          forwardMessage('init', null);
          break;
        }

      case 'configure':
        {
          self.transmuxer.configure(data.config);
          break;
        }

      case 'demux':
        {
          var transmuxResult = self.transmuxer.push(data.data, data.decryptdata, data.chunkMeta, data.state);

          if (Object(_demux_transmuxer__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(transmuxResult)) {
            transmuxResult.then(function (data) {
              emitTransmuxComplete(self, data);
            });
          } else {
            emitTransmuxComplete(self, transmuxResult);
          }

          break;
        }

      case 'flush':
        {
          var id = data.chunkMeta;

          var _transmuxResult = self.transmuxer.flush(id);

          if (Object(_demux_transmuxer__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(_transmuxResult)) {
            _transmuxResult.then(function (results) {
              handleFlushResult(self, results, id);
            });
          } else {
            handleFlushResult(self, _transmuxResult, id);
          }

          break;
        }

      default:
        break;
    }
  });
}

function emitTransmuxComplete(self, transmuxResult) {
  if (isEmptyResult(transmuxResult.remuxResult)) {
    return;
  }

  var transferable = [];
  var _transmuxResult$remux = transmuxResult.remuxResult,
      audio = _transmuxResult$remux.audio,
      video = _transmuxResult$remux.video;

  if (audio) {
    addToTransferable(transferable, audio);
  }

  if (video) {
    addToTransferable(transferable, video);
  }

  self.postMessage({
    event: 'transmuxComplete',
    data: transmuxResult
  }, transferable);
} // Converts data to a transferable object https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast)
// in order to minimize message passing overhead


function addToTransferable(transferable, track) {
  if (track.data1) {
    transferable.push(track.data1.buffer);
  }

  if (track.data2) {
    transferable.push(track.data2.buffer);
  }
}

function handleFlushResult(self, results, chunkMeta) {
  results.forEach(function (result) {
    emitTransmuxComplete(self, result);
  });
  self.postMessage({
    event: 'flush',
    data: chunkMeta
  });
}

function isEmptyResult(remuxResult) {
  return !remuxResult.audio && !remuxResult.video && !remuxResult.text && !remuxResult.id3 && !remuxResult.initSegment;
}

/***/ }),

/***/ "./src/demux/transmuxer.ts":
/*!*********************************!*\
  !*** ./src/demux/transmuxer.ts ***!
  \*********************************/
/*! exports provided: default, isPromise, TransmuxConfig, TransmuxState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Transmuxer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransmuxConfig", function() { return TransmuxConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransmuxState", function() { return TransmuxState; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _crypt_decrypter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../crypt/decrypter */ "./src/crypt/decrypter.ts");
/* harmony import */ var _demux_aacdemuxer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../demux/aacdemuxer */ "./src/demux/aacdemuxer.ts");
/* harmony import */ var _demux_mp4demuxer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demux/mp4demuxer */ "./src/demux/mp4demuxer.ts");
/* harmony import */ var _demux_tsdemuxer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../demux/tsdemuxer */ "./src/demux/tsdemuxer.ts");
/* harmony import */ var _demux_mp3demuxer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../demux/mp3demuxer */ "./src/demux/mp3demuxer.ts");
/* harmony import */ var _remux_mp4_remuxer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../remux/mp4-remuxer */ "./src/remux/mp4-remuxer.ts");
/* harmony import */ var _remux_passthrough_remuxer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../remux/passthrough-remuxer */ "./src/remux/passthrough-remuxer.ts");
/* harmony import */ var _chunk_cache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./chunk-cache */ "./src/demux/chunk-cache.ts");
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");












var now; // performance.now() not available on WebWorker, at least on Safari Desktop

try {
  now = self.performance.now.bind(self.performance);
} catch (err) {
  _utils_logger__WEBPACK_IMPORTED_MODULE_11__["logger"].debug('Unable to use Performance API on this environment');
  now = self.Date.now;
}

var muxConfig = [{
  demux: _demux_tsdemuxer__WEBPACK_IMPORTED_MODULE_5__["default"],
  remux: _remux_mp4_remuxer__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  demux: _demux_mp4demuxer__WEBPACK_IMPORTED_MODULE_4__["default"],
  remux: _remux_passthrough_remuxer__WEBPACK_IMPORTED_MODULE_8__["default"]
}, {
  demux: _demux_aacdemuxer__WEBPACK_IMPORTED_MODULE_3__["default"],
  remux: _remux_mp4_remuxer__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  demux: _demux_mp3demuxer__WEBPACK_IMPORTED_MODULE_6__["default"],
  remux: _remux_mp4_remuxer__WEBPACK_IMPORTED_MODULE_7__["default"]
}];
var minProbeByteLength = 1024;
muxConfig.forEach(function (_ref) {
  var demux = _ref.demux;
  minProbeByteLength = Math.max(minProbeByteLength, demux.minProbeByteLength);
});

var Transmuxer = /*#__PURE__*/function () {
  function Transmuxer(observer, typeSupported, config, vendor, id) {
    this.observer = void 0;
    this.typeSupported = void 0;
    this.config = void 0;
    this.vendor = void 0;
    this.id = void 0;
    this.demuxer = void 0;
    this.remuxer = void 0;
    this.decrypter = void 0;
    this.probe = void 0;
    this.decryptionPromise = null;
    this.transmuxConfig = void 0;
    this.currentTransmuxState = void 0;
    this.cache = new _chunk_cache__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this.observer = observer;
    this.typeSupported = typeSupported;
    this.config = config;
    this.vendor = vendor;
    this.id = id;
  }

  var _proto = Transmuxer.prototype;

  _proto.configure = function configure(transmuxConfig) {
    this.transmuxConfig = transmuxConfig;

    if (this.decrypter) {
      this.decrypter.reset();
    }
  };

  _proto.push = function push(data, decryptdata, chunkMeta, state) {
    var _this = this;

    var stats = chunkMeta.transmuxing;
    stats.executeStart = now();
    var uintData = new Uint8Array(data);
    var cache = this.cache,
        config = this.config,
        currentTransmuxState = this.currentTransmuxState,
        transmuxConfig = this.transmuxConfig;

    if (state) {
      this.currentTransmuxState = state;
    }

    var keyData = getEncryptionType(uintData, decryptdata);

    if (keyData && keyData.method === 'AES-128') {
      var decrypter = this.getDecrypter(); // Software decryption is synchronous; webCrypto is not

      if (config.enableSoftwareAES) {
        // Software decryption is progressive. Progressive decryption may not return a result on each call. Any cached
        // data is handled in the flush() call
        var decryptedData = decrypter.softwareDecrypt(uintData, keyData.key.buffer, keyData.iv.buffer);

        if (!decryptedData) {
          stats.executeEnd = now();
          return emptyResult(chunkMeta);
        }

        uintData = new Uint8Array(decryptedData);
      } else {
        this.decryptionPromise = decrypter.webCryptoDecrypt(uintData, keyData.key.buffer, keyData.iv.buffer).then(function (decryptedData) {
          // Calling push here is important; if flush() is called while this is still resolving, this ensures that
          // the decrypted data has been transmuxed
          var result = _this.push(decryptedData, null, chunkMeta);

          _this.decryptionPromise = null;
          return result;
        });
        return this.decryptionPromise;
      }
    }

    var _ref2 = state || currentTransmuxState,
        contiguous = _ref2.contiguous,
        discontinuity = _ref2.discontinuity,
        trackSwitch = _ref2.trackSwitch,
        accurateTimeOffset = _ref2.accurateTimeOffset,
        timeOffset = _ref2.timeOffset;

    var audioCodec = transmuxConfig.audioCodec,
        videoCodec = transmuxConfig.videoCodec,
        defaultInitPts = transmuxConfig.defaultInitPts,
        duration = transmuxConfig.duration,
        initSegmentData = transmuxConfig.initSegmentData; // Reset muxers before probing to ensure that their state is clean, even if flushing occurs before a successful probe

    if (discontinuity || trackSwitch) {
      this.resetInitSegment(initSegmentData, audioCodec, videoCodec, duration);
    }

    if (discontinuity) {
      this.resetInitialTimestamp(defaultInitPts);
    }

    if (!contiguous) {
      this.resetContiguity();
    }

    if (this.needsProbing(uintData, discontinuity, trackSwitch)) {
      if (cache.dataLength) {
        var cachedData = cache.flush();
        uintData = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_10__["appendUint8Array"])(cachedData, uintData);
      }

      this.configureTransmuxer(uintData, transmuxConfig);
    }

    var result = this.transmux(uintData, keyData, timeOffset, accurateTimeOffset, chunkMeta);
    var currentState = this.currentTransmuxState;
    currentState.contiguous = true;
    currentState.discontinuity = false;
    currentState.trackSwitch = false;
    stats.executeEnd = now();
    return result;
  } // Due to data caching, flush calls can produce more than one TransmuxerResult (hence the Array type)
  ;

  _proto.flush = function flush(chunkMeta) {
    var _this2 = this;

    var stats = chunkMeta.transmuxing;
    stats.executeStart = now();
    var decrypter = this.decrypter,
        cache = this.cache,
        currentTransmuxState = this.currentTransmuxState,
        decryptionPromise = this.decryptionPromise;

    if (decryptionPromise) {
      // Upon resolution, the decryption promise calls push() and returns its TransmuxerResult up the stack. Therefore
      // only flushing is required for async decryption
      return decryptionPromise.then(function () {
        return _this2.flush(chunkMeta);
      });
    }

    var transmuxResults = [];
    var timeOffset = currentTransmuxState.timeOffset;

    if (decrypter) {
      // The decrypter may have data cached, which needs to be demuxed. In this case we'll have two TransmuxResults
      // This happens in the case that we receive only 1 push call for a segment (either for non-progressive downloads,
      // or for progressive downloads with small segments)
      var decryptedData = decrypter.flush();

      if (decryptedData) {
        // Push always returns a TransmuxerResult if decryptdata is null
        transmuxResults.push(this.push(decryptedData, null, chunkMeta));
      }
    }

    var bytesSeen = cache.dataLength;
    cache.reset();
    var demuxer = this.demuxer,
        remuxer = this.remuxer;

    if (!demuxer || !remuxer) {
      // If probing failed, and each demuxer saw enough bytes to be able to probe, then Hls.js has been given content its not able to handle
      if (bytesSeen >= minProbeByteLength) {
        this.observer.emit(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].ERROR, _events__WEBPACK_IMPORTED_MODULE_0__["Events"].ERROR, {
          type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].MEDIA_ERROR,
          details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].FRAG_PARSING_ERROR,
          fatal: true,
          reason: 'no demux matching with content found'
        });
      }

      stats.executeEnd = now();
      return [emptyResult(chunkMeta)];
    }

    var demuxResultOrPromise = demuxer.flush(timeOffset);

    if (isPromise(demuxResultOrPromise)) {
      // Decrypt final SAMPLE-AES samples
      return demuxResultOrPromise.then(function (demuxResult) {
        _this2.flushRemux(transmuxResults, demuxResult, chunkMeta);

        return transmuxResults;
      });
    }

    this.flushRemux(transmuxResults, demuxResultOrPromise, chunkMeta);
    return transmuxResults;
  };

  _proto.flushRemux = function flushRemux(transmuxResults, demuxResult, chunkMeta) {
    var audioTrack = demuxResult.audioTrack,
        avcTrack = demuxResult.avcTrack,
        id3Track = demuxResult.id3Track,
        textTrack = demuxResult.textTrack;
    var _this$currentTransmux = this.currentTransmuxState,
        accurateTimeOffset = _this$currentTransmux.accurateTimeOffset,
        timeOffset = _this$currentTransmux.timeOffset;
    _utils_logger__WEBPACK_IMPORTED_MODULE_11__["logger"].log("[transmuxer.ts]: Flushed fragment " + chunkMeta.sn + (chunkMeta.part > -1 ? ' p: ' + chunkMeta.part : '') + " of level " + chunkMeta.level);
    var remuxResult = this.remuxer.remux(audioTrack, avcTrack, id3Track, textTrack, timeOffset, accurateTimeOffset, true, this.id);
    transmuxResults.push({
      remuxResult: remuxResult,
      chunkMeta: chunkMeta
    });
    chunkMeta.transmuxing.executeEnd = now();
  };

  _proto.resetInitialTimestamp = function resetInitialTimestamp(defaultInitPts) {
    var demuxer = this.demuxer,
        remuxer = this.remuxer;

    if (!demuxer || !remuxer) {
      return;
    }

    demuxer.resetTimeStamp(defaultInitPts);
    remuxer.resetTimeStamp(defaultInitPts);
  };

  _proto.resetContiguity = function resetContiguity() {
    var demuxer = this.demuxer,
        remuxer = this.remuxer;

    if (!demuxer || !remuxer) {
      return;
    }

    demuxer.resetContiguity();
    remuxer.resetNextTimestamp();
  };

  _proto.resetInitSegment = function resetInitSegment(initSegmentData, audioCodec, videoCodec, duration) {
    var demuxer = this.demuxer,
        remuxer = this.remuxer;

    if (!demuxer || !remuxer) {
      return;
    }

    demuxer.resetInitSegment(audioCodec, videoCodec, duration);
    remuxer.resetInitSegment(initSegmentData, audioCodec, videoCodec);
  };

  _proto.destroy = function destroy() {
    if (this.demuxer) {
      this.demuxer.destroy();
      this.demuxer = undefined;
    }

    if (this.remuxer) {
      this.remuxer.destroy();
      this.remuxer = undefined;
    }
  };

  _proto.transmux = function transmux(data, keyData, timeOffset, accurateTimeOffset, chunkMeta) {
    var result;

    if (keyData && keyData.method === 'SAMPLE-AES') {
      result = this.transmuxSampleAes(data, keyData, timeOffset, accurateTimeOffset, chunkMeta);
    } else {
      result = this.transmuxUnencrypted(data, timeOffset, accurateTimeOffset, chunkMeta);
    }

    return result;
  };

  _proto.transmuxUnencrypted = function transmuxUnencrypted(data, timeOffset, accurateTimeOffset, chunkMeta) {
    var _demux = this.demuxer.demux(data, timeOffset, false, !this.config.progressive),
        audioTrack = _demux.audioTrack,
        avcTrack = _demux.avcTrack,
        id3Track = _demux.id3Track,
        textTrack = _demux.textTrack;

    var remuxResult = this.remuxer.remux(audioTrack, avcTrack, id3Track, textTrack, timeOffset, accurateTimeOffset, false, this.id);
    return {
      remuxResult: remuxResult,
      chunkMeta: chunkMeta
    };
  };

  _proto.transmuxSampleAes = function transmuxSampleAes(data, decryptData, timeOffset, accurateTimeOffset, chunkMeta) {
    var _this3 = this;

    return this.demuxer.demuxSampleAes(data, decryptData, timeOffset).then(function (demuxResult) {
      var remuxResult = _this3.remuxer.remux(demuxResult.audioTrack, demuxResult.avcTrack, demuxResult.id3Track, demuxResult.textTrack, timeOffset, accurateTimeOffset, false, _this3.id);

      return {
        remuxResult: remuxResult,
        chunkMeta: chunkMeta
      };
    });
  };

  _proto.configureTransmuxer = function configureTransmuxer(data, transmuxConfig) {
    var config = this.config,
        observer = this.observer,
        typeSupported = this.typeSupported,
        vendor = this.vendor;
    var audioCodec = transmuxConfig.audioCodec,
        defaultInitPts = transmuxConfig.defaultInitPts,
        duration = transmuxConfig.duration,
        initSegmentData = transmuxConfig.initSegmentData,
        videoCodec = transmuxConfig.videoCodec; // probe for content type

    var mux;

    for (var i = 0, len = muxConfig.length; i < len; i++) {
      if (muxConfig[i].demux.probe(data)) {
        mux = muxConfig[i];
        break;
      }
    }

    if (!mux) {
      // If probing previous configs fail, use mp4 passthrough
      _utils_logger__WEBPACK_IMPORTED_MODULE_11__["logger"].warn('Failed to find demuxer by probing frag, treating as mp4 passthrough');
      mux = {
        demux: _demux_mp4demuxer__WEBPACK_IMPORTED_MODULE_4__["default"],
        remux: _remux_passthrough_remuxer__WEBPACK_IMPORTED_MODULE_8__["default"]
      };
    } // so let's check that current remuxer and demuxer are still valid


    var demuxer = this.demuxer;
    var remuxer = this.remuxer;
    var Remuxer = mux.remux;
    var Demuxer = mux.demux;

    if (!remuxer || !(remuxer instanceof Remuxer)) {
      this.remuxer = new Remuxer(observer, config, typeSupported, vendor);
    }

    if (!demuxer || !(demuxer instanceof Demuxer)) {
      this.demuxer = new Demuxer(observer, config, typeSupported);
      this.probe = Demuxer.probe;
    } // Ensure that muxers are always initialized with an initSegment


    this.resetInitSegment(initSegmentData, audioCodec, videoCodec, duration);
    this.resetInitialTimestamp(defaultInitPts);
  };

  _proto.needsProbing = function needsProbing(data, discontinuity, trackSwitch) {
    // in case of continuity change, or track switch
    // we might switch from content type (AAC container to TS container, or TS to fmp4 for example)
    return !this.demuxer || !this.remuxer || discontinuity || trackSwitch;
  };

  _proto.getDecrypter = function getDecrypter() {
    var decrypter = this.decrypter;

    if (!decrypter) {
      decrypter = this.decrypter = new _crypt_decrypter__WEBPACK_IMPORTED_MODULE_2__["default"](this.observer, this.config);
    }

    return decrypter;
  };

  return Transmuxer;
}();



function getEncryptionType(data, decryptData) {
  var encryptionType = null;

  if (data.byteLength > 0 && decryptData != null && decryptData.key != null && decryptData.iv !== null && decryptData.method != null) {
    encryptionType = decryptData;
  }

  return encryptionType;
}

var emptyResult = function emptyResult(chunkMeta) {
  return {
    remuxResult: {},
    chunkMeta: chunkMeta
  };
};

function isPromise(p) {
  return 'then' in p && p.then instanceof Function;
}
var TransmuxConfig = function TransmuxConfig(audioCodec, videoCodec, initSegmentData, duration, defaultInitPts) {
  this.audioCodec = void 0;
  this.videoCodec = void 0;
  this.initSegmentData = void 0;
  this.duration = void 0;
  this.defaultInitPts = void 0;
  this.audioCodec = audioCodec;
  this.videoCodec = videoCodec;
  this.initSegmentData = initSegmentData;
  this.duration = duration;
  this.defaultInitPts = defaultInitPts;
};
var TransmuxState = function TransmuxState(discontinuity, contiguous, accurateTimeOffset, trackSwitch, timeOffset) {
  this.discontinuity = void 0;
  this.contiguous = void 0;
  this.accurateTimeOffset = void 0;
  this.trackSwitch = void 0;
  this.timeOffset = void 0;
  this.discontinuity = discontinuity;
  this.contiguous = contiguous;
  this.accurateTimeOffset = accurateTimeOffset;
  this.trackSwitch = trackSwitch;
  this.timeOffset = timeOffset;
};

/***/ }),

/***/ "./src/demux/tsdemuxer.ts":
/*!********************************!*\
  !*** ./src/demux/tsdemuxer.ts ***!
  \********************************/
/*! exports provided: discardEPB, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discardEPB", function() { return discardEPB; });
/* harmony import */ var _adts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adts */ "./src/demux/adts.ts");
/* harmony import */ var _mpegaudio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mpegaudio */ "./src/demux/mpegaudio.ts");
/* harmony import */ var _exp_golomb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exp-golomb */ "./src/demux/exp-golomb.ts");
/* harmony import */ var _id3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./id3 */ "./src/demux/id3.ts");
/* harmony import */ var _sample_aes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sample-aes */ "./src/demux/sample-aes.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/**
 * highly optimized TS demuxer:
 * parse PAT, PMT
 * extract PES packet from audio and video PIDs
 * extract AVC/H264 NAL units and AAC/ADTS samples from PES packet
 * trigger the remuxer upon parsing completion
 * it also tries to workaround as best as it can audio codec switch (HE-AAC to AAC and vice versa), without having to restart the MediaSource.
 * it also controls the remuxing process :
 * upon discontinuity or level switch detection, it will also notifies the remuxer so that it can reset its state.
 */









// We are using fixed track IDs for driving the MP4 remuxer
// instead of following the TS PIDs.
// There is no reason not to do this and some browsers/SourceBuffer-demuxers
// may not like if there are TrackID "switches"
// See https://github.com/video-dev/hls.js/issues/1331
// Here we are mapping our internal track types to constant MP4 track IDs
// With MSE currently one can only have one track of each, and we are muxing
// whatever video/audio rendition in them.
var RemuxerTrackIdConfig = {
  video: 1,
  audio: 2,
  id3: 3,
  text: 4
};

var TSDemuxer = /*#__PURE__*/function () {
  function TSDemuxer(observer, config, typeSupported) {
    this.observer = void 0;
    this.config = void 0;
    this.typeSupported = void 0;
    this.sampleAes = null;
    this.pmtParsed = false;
    this.audioCodec = void 0;
    this.videoCodec = void 0;
    this._duration = 0;
    this.aacLastPTS = null;
    this._initPTS = null;
    this._initDTS = null;
    this._pmtId = -1;
    this._avcTrack = void 0;
    this._audioTrack = void 0;
    this._id3Track = void 0;
    this._txtTrack = void 0;
    this.aacOverFlow = null;
    this.avcSample = null;
    this.remainderData = null;
    this.observer = observer;
    this.config = config;
    this.typeSupported = typeSupported;
  }

  TSDemuxer.probe = function probe(data) {
    var syncOffset = TSDemuxer.syncOffset(data);

    if (syncOffset < 0) {
      return false;
    } else {
      if (syncOffset) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].warn("MPEG2-TS detected but first sync word found @ offset " + syncOffset + ", junk ahead ?");
      }

      return true;
    }
  };

  TSDemuxer.syncOffset = function syncOffset(data) {
    // scan 1000 first bytes
    var scanwindow = Math.min(1000, data.length - 3 * 188);
    var i = 0;

    while (i < scanwindow) {
      // a TS fragment should contain at least 3 TS packets, a PAT, a PMT, and one PID, each starting with 0x47
      if (data[i] === 0x47 && data[i + 188] === 0x47 && data[i + 2 * 188] === 0x47) {
        return i;
      } else {
        i++;
      }
    }

    return -1;
  }
  /**
   * Creates a track model internal to demuxer used to drive remuxing input
   *
   * @param type 'audio' | 'video' | 'id3' | 'text'
   * @param duration
   * @return TSDemuxer's internal track model
   */
  ;

  TSDemuxer.createTrack = function createTrack(type, duration) {
    return {
      container: type === 'video' || type === 'audio' ? 'video/mp2t' : undefined,
      type: type,
      id: RemuxerTrackIdConfig[type],
      pid: -1,
      inputTimeScale: 90000,
      sequenceNumber: 0,
      samples: [],
      dropped: 0,
      duration: type === 'audio' ? duration : undefined
    };
  }
  /**
   * Initializes a new init segment on the demuxer/remuxer interface. Needed for discontinuities/track-switches (or at stream start)
   * Resets all internal track instances of the demuxer.
   */
  ;

  var _proto = TSDemuxer.prototype;

  _proto.resetInitSegment = function resetInitSegment(audioCodec, videoCodec, duration) {
    this.pmtParsed = false;
    this._pmtId = -1;
    this._avcTrack = TSDemuxer.createTrack('video', duration);
    this._audioTrack = TSDemuxer.createTrack('audio', duration);
    this._id3Track = TSDemuxer.createTrack('id3', duration);
    this._txtTrack = TSDemuxer.createTrack('text', duration);
    this._audioTrack.isAAC = true; // flush any partial content

    this.aacOverFlow = null;
    this.aacLastPTS = null;
    this.avcSample = null;
    this.audioCodec = audioCodec;
    this.videoCodec = videoCodec;
    this._duration = duration;
  };

  _proto.resetTimeStamp = function resetTimeStamp() {};

  _proto.resetContiguity = function resetContiguity() {
    var _audioTrack = this._audioTrack,
        _avcTrack = this._avcTrack,
        _id3Track = this._id3Track;

    if (_audioTrack) {
      _audioTrack.pesData = null;
    }

    if (_avcTrack) {
      _avcTrack.pesData = null;
    }

    if (_id3Track) {
      _id3Track.pesData = null;
    }

    this.aacOverFlow = null;
    this.aacLastPTS = null;
  };

  _proto.demux = function demux(data, timeOffset, isSampleAes, flush) {
    if (isSampleAes === void 0) {
      isSampleAes = false;
    }

    if (flush === void 0) {
      flush = false;
    }

    if (!isSampleAes) {
      this.sampleAes = null;
    }

    var pes;
    var avcTrack = this._avcTrack;
    var audioTrack = this._audioTrack;
    var id3Track = this._id3Track;
    var avcId = avcTrack.pid;
    var avcData = avcTrack.pesData;
    var audioId = audioTrack.pid;
    var id3Id = id3Track.pid;
    var audioData = audioTrack.pesData;
    var id3Data = id3Track.pesData;
    var unknownPIDs = false;
    var pmtParsed = this.pmtParsed;
    var pmtId = this._pmtId;
    var len = data.length;

    if (this.remainderData) {
      data = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_6__["appendUint8Array"])(this.remainderData, data);
      len = data.length;
      this.remainderData = null;
    }

    if (len < 188 && !flush) {
      this.remainderData = data;
      return {
        audioTrack: audioTrack,
        avcTrack: avcTrack,
        id3Track: id3Track,
        textTrack: this._txtTrack
      };
    }

    var syncOffset = Math.max(0, TSDemuxer.syncOffset(data));
    len -= (len + syncOffset) % 188;

    if (len < data.byteLength && !flush) {
      this.remainderData = new Uint8Array(data.buffer, len, data.buffer.byteLength - len);
    } // loop through TS packets


    for (var start = syncOffset; start < len; start += 188) {
      if (data[start] === 0x47) {
        var stt = !!(data[start + 1] & 0x40); // pid is a 13-bit field starting at the last bit of TS[1]

        var pid = ((data[start + 1] & 0x1f) << 8) + data[start + 2];
        var atf = (data[start + 3] & 0x30) >> 4; // if an adaption field is present, its length is specified by the fifth byte of the TS packet header.

        var offset = void 0;

        if (atf > 1) {
          offset = start + 5 + data[start + 4]; // continue if there is only adaptation field

          if (offset === start + 188) {
            continue;
          }
        } else {
          offset = start + 4;
        }

        switch (pid) {
          case avcId:
            if (stt) {
              if (avcData && (pes = parsePES(avcData))) {
                this.parseAVCPES(pes, false);
              }

              avcData = {
                data: [],
                size: 0
              };
            }

            if (avcData) {
              avcData.data.push(data.subarray(offset, start + 188));
              avcData.size += start + 188 - offset;
            }

            break;

          case audioId:
            if (stt) {
              if (audioData && (pes = parsePES(audioData))) {
                if (audioTrack.isAAC) {
                  this.parseAACPES(pes);
                } else {
                  this.parseMPEGPES(pes);
                }
              }

              audioData = {
                data: [],
                size: 0
              };
            }

            if (audioData) {
              audioData.data.push(data.subarray(offset, start + 188));
              audioData.size += start + 188 - offset;
            }

            break;

          case id3Id:
            if (stt) {
              if (id3Data && (pes = parsePES(id3Data))) {
                this.parseID3PES(pes);
              }

              id3Data = {
                data: [],
                size: 0
              };
            }

            if (id3Data) {
              id3Data.data.push(data.subarray(offset, start + 188));
              id3Data.size += start + 188 - offset;
            }

            break;

          case 0:
            if (stt) {
              offset += data[offset] + 1;
            }

            pmtId = this._pmtId = parsePAT(data, offset);
            break;

          case pmtId:
            {
              if (stt) {
                offset += data[offset] + 1;
              }

              var parsedPIDs = parsePMT(data, offset, this.typeSupported.mpeg === true || this.typeSupported.mp3 === true, isSampleAes); // only update track id if track PID found while parsing PMT
              // this is to avoid resetting the PID to -1 in case
              // track PID transiently disappears from the stream
              // this could happen in case of transient missing audio samples for example
              // NOTE this is only the PID of the track as found in TS,
              // but we are not using this for MP4 track IDs.

              avcId = parsedPIDs.avc;

              if (avcId > 0) {
                avcTrack.pid = avcId;
              }

              audioId = parsedPIDs.audio;

              if (audioId > 0) {
                audioTrack.pid = audioId;
                audioTrack.isAAC = parsedPIDs.isAAC;
              }

              id3Id = parsedPIDs.id3;

              if (id3Id > 0) {
                id3Track.pid = id3Id;
              }

              if (unknownPIDs && !pmtParsed) {
                _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].log('reparse from beginning');
                unknownPIDs = false; // we set it to -188, the += 188 in the for loop will reset start to 0

                start = syncOffset - 188;
              }

              pmtParsed = this.pmtParsed = true;
              break;
            }

          case 17:
          case 0x1fff:
            break;

          default:
            unknownPIDs = true;
            break;
        }
      } else {
        this.observer.emit(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].ERROR, _events__WEBPACK_IMPORTED_MODULE_5__["Events"].ERROR, {
          type: _errors__WEBPACK_IMPORTED_MODULE_8__["ErrorTypes"].MEDIA_ERROR,
          details: _errors__WEBPACK_IMPORTED_MODULE_8__["ErrorDetails"].FRAG_PARSING_ERROR,
          fatal: false,
          reason: 'TS packet did not start with 0x47'
        });
      }
    }

    avcTrack.pesData = avcData;
    audioTrack.pesData = audioData;
    id3Track.pesData = id3Data;
    var demuxResult = {
      audioTrack: audioTrack,
      avcTrack: avcTrack,
      id3Track: id3Track,
      textTrack: this._txtTrack
    };

    if (flush) {
      this.extractRemainingSamples(demuxResult);
    }

    return demuxResult;
  };

  _proto.flush = function flush() {
    var remainderData = this.remainderData;
    this.remainderData = null;
    var result;

    if (remainderData) {
      result = this.demux(remainderData, -1, false, true);
    } else {
      result = {
        audioTrack: this._audioTrack,
        avcTrack: this._avcTrack,
        textTrack: this._txtTrack,
        id3Track: this._id3Track
      };
    }

    this.extractRemainingSamples(result);

    if (this.sampleAes) {
      return this.decrypt(result, this.sampleAes);
    }

    return result;
  };

  _proto.extractRemainingSamples = function extractRemainingSamples(demuxResult) {
    var audioTrack = demuxResult.audioTrack,
        avcTrack = demuxResult.avcTrack,
        id3Track = demuxResult.id3Track;
    var avcData = avcTrack.pesData;
    var audioData = audioTrack.pesData;
    var id3Data = id3Track.pesData; // try to parse last PES packets

    var pes;

    if (avcData && (pes = parsePES(avcData))) {
      this.parseAVCPES(pes, true);
      avcTrack.pesData = null;
    } else {
      // either avcData null or PES truncated, keep it for next frag parsing
      avcTrack.pesData = avcData;
    }

    if (audioData && (pes = parsePES(audioData))) {
      if (audioTrack.isAAC) {
        this.parseAACPES(pes);
      } else {
        this.parseMPEGPES(pes);
      }

      audioTrack.pesData = null;
    } else {
      if (audioData !== null && audioData !== void 0 && audioData.size) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].log('last AAC PES packet truncated,might overlap between fragments');
      } // either audioData null or PES truncated, keep it for next frag parsing


      audioTrack.pesData = audioData;
    }

    if (id3Data && (pes = parsePES(id3Data))) {
      this.parseID3PES(pes);
      id3Track.pesData = null;
    } else {
      // either id3Data null or PES truncated, keep it for next frag parsing
      id3Track.pesData = id3Data;
    }
  };

  _proto.demuxSampleAes = function demuxSampleAes(data, keyData, timeOffset) {
    var demuxResult = this.demux(data, timeOffset, true, !this.config.progressive);
    var sampleAes = this.sampleAes = new _sample_aes__WEBPACK_IMPORTED_MODULE_4__["default"](this.observer, this.config, keyData);
    return this.decrypt(demuxResult, sampleAes);
  };

  _proto.decrypt = function decrypt(demuxResult, sampleAes) {
    return new Promise(function (resolve) {
      var audioTrack = demuxResult.audioTrack,
          avcTrack = demuxResult.avcTrack;

      if (audioTrack.samples && audioTrack.isAAC) {
        sampleAes.decryptAacSamples(audioTrack.samples, 0, function () {
          if (avcTrack.samples) {
            sampleAes.decryptAvcSamples(avcTrack.samples, 0, 0, function () {
              resolve(demuxResult);
            });
          } else {
            resolve(demuxResult);
          }
        });
      } else if (avcTrack.samples) {
        sampleAes.decryptAvcSamples(avcTrack.samples, 0, 0, function () {
          resolve(demuxResult);
        });
      }
    });
  };

  _proto.destroy = function destroy() {
    this._initPTS = this._initDTS = null;
    this._duration = 0;
  };

  _proto.parseAVCPES = function parseAVCPES(pes, last) {
    var _this = this;

    var track = this._avcTrack;
    var units = this.parseAVCNALu(pes.data);
    var debug = false;
    var avcSample = this.avcSample;
    var push;
    var spsfound = false; // free pes.data to save up some memory

    pes.data = null; // if new NAL units found and last sample still there, let's push ...
    // this helps parsing streams with missing AUD (only do this if AUD never found)

    if (avcSample && units.length && !track.audFound) {
      pushAccessUnit(avcSample, track);
      avcSample = this.avcSample = createAVCSample(false, pes.pts, pes.dts, '');
    }

    units.forEach(function (unit) {
      switch (unit.type) {
        // NDR
        case 1:
          {
            push = true;

            if (!avcSample) {
              avcSample = _this.avcSample = createAVCSample(true, pes.pts, pes.dts, '');
            }

            if (debug) {
              avcSample.debug += 'NDR ';
            }

            avcSample.frame = true;
            var data = unit.data; // only check slice type to detect KF in case SPS found in same packet (any keyframe is preceded by SPS ...)

            if (spsfound && data.length > 4) {
              // retrieve slice type by parsing beginning of NAL unit (follow H264 spec, slice_header definition) to detect keyframe embedded in NDR
              var sliceType = new _exp_golomb__WEBPACK_IMPORTED_MODULE_2__["default"](data).readSliceType(); // 2 : I slice, 4 : SI slice, 7 : I slice, 9: SI slice
              // SI slice : A slice that is coded using intra prediction only and using quantisation of the prediction samples.
              // An SI slice can be coded such that its decoded samples can be constructed identically to an SP slice.
              // I slice: A slice that is not an SI slice that is decoded using intra prediction only.
              // if (sliceType === 2 || sliceType === 7) {

              if (sliceType === 2 || sliceType === 4 || sliceType === 7 || sliceType === 9) {
                avcSample.key = true;
              }
            }

            break; // IDR
          }

        case 5:
          push = true; // handle PES not starting with AUD

          if (!avcSample) {
            avcSample = _this.avcSample = createAVCSample(true, pes.pts, pes.dts, '');
          }

          if (debug) {
            avcSample.debug += 'IDR ';
          }

          avcSample.key = true;
          avcSample.frame = true;
          break;
        // SEI

        case 6:
          {
            push = true;

            if (debug && avcSample) {
              avcSample.debug += 'SEI ';
            }

            var expGolombDecoder = new _exp_golomb__WEBPACK_IMPORTED_MODULE_2__["default"](discardEPB(unit.data)); // skip frameType

            expGolombDecoder.readUByte();
            var payloadType = 0;
            var payloadSize = 0;
            var endOfCaptions = false;
            var b = 0;

            while (!endOfCaptions && expGolombDecoder.bytesAvailable > 1) {
              payloadType = 0;

              do {
                b = expGolombDecoder.readUByte();
                payloadType += b;
              } while (b === 0xff); // Parse payload size.


              payloadSize = 0;

              do {
                b = expGolombDecoder.readUByte();
                payloadSize += b;
              } while (b === 0xff); // TODO: there can be more than one payload in an SEI packet...
              // TODO: need to read type and size in a while loop to get them all


              if (payloadType === 4 && expGolombDecoder.bytesAvailable !== 0) {
                endOfCaptions = true;
                var countryCode = expGolombDecoder.readUByte();

                if (countryCode === 181) {
                  var providerCode = expGolombDecoder.readUShort();

                  if (providerCode === 49) {
                    var userStructure = expGolombDecoder.readUInt();

                    if (userStructure === 0x47413934) {
                      var userDataType = expGolombDecoder.readUByte(); // Raw CEA-608 bytes wrapped in CEA-708 packet

                      if (userDataType === 3) {
                        var firstByte = expGolombDecoder.readUByte();
                        var secondByte = expGolombDecoder.readUByte();
                        var totalCCs = 31 & firstByte;
                        var byteArray = [firstByte, secondByte];

                        for (var i = 0; i < totalCCs; i++) {
                          // 3 bytes per CC
                          byteArray.push(expGolombDecoder.readUByte());
                          byteArray.push(expGolombDecoder.readUByte());
                          byteArray.push(expGolombDecoder.readUByte());
                        }

                        insertSampleInOrder(_this._txtTrack.samples, {
                          type: 3,
                          pts: pes.pts,
                          bytes: byteArray
                        });
                      }
                    }
                  }
                }
              } else if (payloadType === 5 && expGolombDecoder.bytesAvailable !== 0) {
                endOfCaptions = true;

                if (payloadSize > 16) {
                  var uuidStrArray = [];

                  for (var _i = 0; _i < 16; _i++) {
                    uuidStrArray.push(expGolombDecoder.readUByte().toString(16));

                    if (_i === 3 || _i === 5 || _i === 7 || _i === 9) {
                      uuidStrArray.push('-');
                    }
                  }

                  var length = payloadSize - 16;
                  var userDataPayloadBytes = new Uint8Array(length);

                  for (var _i2 = 0; _i2 < length; _i2++) {
                    userDataPayloadBytes[_i2] = expGolombDecoder.readUByte();
                  }

                  insertSampleInOrder(_this._txtTrack.samples, {
                    pts: pes.pts,
                    payloadType: payloadType,
                    uuid: uuidStrArray.join(''),
                    userData: Object(_id3__WEBPACK_IMPORTED_MODULE_3__["utf8ArrayToStr"])(userDataPayloadBytes),
                    userDataBytes: userDataPayloadBytes
                  });
                }
              } else if (payloadSize < expGolombDecoder.bytesAvailable) {
                for (var _i3 = 0; _i3 < payloadSize; _i3++) {
                  expGolombDecoder.readUByte();
                }
              }
            }

            break; // SPS
          }

        case 7:
          push = true;
          spsfound = true;

          if (debug && avcSample) {
            avcSample.debug += 'SPS ';
          }

          if (!track.sps) {
            var _expGolombDecoder = new _exp_golomb__WEBPACK_IMPORTED_MODULE_2__["default"](unit.data);

            var config = _expGolombDecoder.readSPS();

            track.width = config.width;
            track.height = config.height;
            track.pixelRatio = config.pixelRatio; // TODO: `track.sps` is defined as a `number[]`, but we're setting it to a `Uint8Array[]`.

            track.sps = [unit.data];
            track.duration = _this._duration;
            var codecarray = unit.data.subarray(1, 4);
            var codecstring = 'avc1.';

            for (var _i4 = 0; _i4 < 3; _i4++) {
              var h = codecarray[_i4].toString(16);

              if (h.length < 2) {
                h = '0' + h;
              }

              codecstring += h;
            }

            track.codec = codecstring;
          }

          break;
        // PPS

        case 8:
          push = true;

          if (debug && avcSample) {
            avcSample.debug += 'PPS ';
          }

          if (!track.pps) {
            // TODO: `track.pss` is defined as a `number[]`, but we're setting it to a `Uint8Array[]`.
            track.pps = [unit.data];
          }

          break;
        // AUD

        case 9:
          push = false;
          track.audFound = true;

          if (avcSample) {
            pushAccessUnit(avcSample, track);
          }

          avcSample = _this.avcSample = createAVCSample(false, pes.pts, pes.dts, debug ? 'AUD ' : '');
          break;
        // Filler Data

        case 12:
          push = false;
          break;

        default:
          push = false;

          if (avcSample) {
            avcSample.debug += 'unknown NAL ' + unit.type + ' ';
          }

          break;
      }

      if (avcSample && push) {
        var _units = avcSample.units;

        _units.push(unit);
      }
    }); // if last PES packet, push samples

    if (last && avcSample) {
      pushAccessUnit(avcSample, track);
      this.avcSample = null;
    }
  };

  _proto.getLastNalUnit = function getLastNalUnit() {
    var _avcSample;

    var avcSample = this.avcSample;
    var lastUnit; // try to fallback to previous sample if current one is empty

    if (!avcSample || avcSample.units.length === 0) {
      var samples = this._avcTrack.samples;
      avcSample = samples[samples.length - 1];
    }

    if ((_avcSample = avcSample) !== null && _avcSample !== void 0 && _avcSample.units) {
      var units = avcSample.units;
      lastUnit = units[units.length - 1];
    }

    return lastUnit;
  };

  _proto.parseAVCNALu = function parseAVCNALu(array) {
    var len = array.byteLength;
    var track = this._avcTrack;
    var state = track.naluState || 0;
    var lastState = state;
    var units = [];
    var i = 0;
    var value;
    var overflow;
    var unitType;
    var lastUnitStart = -1;
    var lastUnitType = 0; // logger.log('PES:' + Hex.hexDump(array));

    if (state === -1) {
      // special use case where we found 3 or 4-byte start codes exactly at the end of previous PES packet
      lastUnitStart = 0; // NALu type is value read from offset 0

      lastUnitType = array[0] & 0x1f;
      state = 0;
      i = 1;
    }

    while (i < len) {
      value = array[i++]; // optimization. state 0 and 1 are the predominant case. let's handle them outside of the switch/case

      if (!state) {
        state = value ? 0 : 1;
        continue;
      }

      if (state === 1) {
        state = value ? 0 : 2;
        continue;
      } // here we have state either equal to 2 or 3


      if (!value) {
        state = 3;
      } else if (value === 1) {
        if (lastUnitStart >= 0) {
          var unit = {
            data: array.subarray(lastUnitStart, i - state - 1),
            type: lastUnitType
          }; // logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);

          units.push(unit);
        } else {
          // lastUnitStart is undefined => this is the first start code found in this PES packet
          // first check if start code delimiter is overlapping between 2 PES packets,
          // ie it started in last packet (lastState not zero)
          // and ended at the beginning of this PES packet (i <= 4 - lastState)
          var lastUnit = this.getLastNalUnit();

          if (lastUnit) {
            if (lastState && i <= 4 - lastState) {
              // start delimiter overlapping between PES packets
              // strip start delimiter bytes from the end of last NAL unit
              // check if lastUnit had a state different from zero
              if (lastUnit.state) {
                // strip last bytes
                lastUnit.data = lastUnit.data.subarray(0, lastUnit.data.byteLength - lastState);
              }
            } // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.


            overflow = i - state - 1;

            if (overflow > 0) {
              // logger.log('first NALU found with overflow:' + overflow);
              var tmp = new Uint8Array(lastUnit.data.byteLength + overflow);
              tmp.set(lastUnit.data, 0);
              tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength);
              lastUnit.data = tmp;
            }
          }
        } // check if we can read unit type


        if (i < len) {
          unitType = array[i] & 0x1f; // logger.log('find NALU @ offset:' + i + ',type:' + unitType);

          lastUnitStart = i;
          lastUnitType = unitType;
          state = 0;
        } else {
          // not enough byte to read unit type. let's read it on next PES parsing
          state = -1;
        }
      } else {
        state = 0;
      }
    }

    if (lastUnitStart >= 0 && state >= 0) {
      var _unit = {
        data: array.subarray(lastUnitStart, len),
        type: lastUnitType,
        state: state
      };
      units.push(_unit); // logger.log('pushing NALU, type/size/state:' + unit.type + '/' + unit.data.byteLength + '/' + state);
    } // no NALu found


    if (units.length === 0) {
      // append pes.data to previous NAL unit
      var _lastUnit = this.getLastNalUnit();

      if (_lastUnit) {
        var _tmp = new Uint8Array(_lastUnit.data.byteLength + array.byteLength);

        _tmp.set(_lastUnit.data, 0);

        _tmp.set(array, _lastUnit.data.byteLength);

        _lastUnit.data = _tmp;
      }
    }

    track.naluState = state;
    return units;
  };

  _proto.parseAACPES = function parseAACPES(pes) {
    var startOffset = 0;
    var track = this._audioTrack;
    var aacOverFlow = this.aacOverFlow;
    var data = pes.data;

    if (aacOverFlow) {
      this.aacOverFlow = null;
      var sampleLength = aacOverFlow.sample.unit.byteLength;
      var frameMissingBytes = Math.min(aacOverFlow.missing, sampleLength);
      var frameOverflowBytes = sampleLength - frameMissingBytes;
      aacOverFlow.sample.unit.set(data.subarray(0, frameMissingBytes), frameOverflowBytes);
      track.samples.push(aacOverFlow.sample); // logger.log(`AAC: append overflowing ${frameOverflowBytes} bytes to beginning of new PES`);

      startOffset = aacOverFlow.missing;
    } // look for ADTS header (0xFFFx)


    var offset;
    var len;

    for (offset = startOffset, len = data.length; offset < len - 1; offset++) {
      if (_adts__WEBPACK_IMPORTED_MODULE_0__["isHeader"](data, offset)) {
        break;
      }
    } // if ADTS header does not start straight from the beginning of the PES payload, raise an error


    if (offset !== startOffset) {
      var reason;
      var fatal;

      if (offset < len - 1) {
        reason = "AAC PES did not start with ADTS header,offset:" + offset;
        fatal = false;
      } else {
        reason = 'no ADTS header found in AAC PES';
        fatal = true;
      }

      _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].warn("parsing error:" + reason);
      this.observer.emit(_events__WEBPACK_IMPORTED_MODULE_5__["Events"].ERROR, _events__WEBPACK_IMPORTED_MODULE_5__["Events"].ERROR, {
        type: _errors__WEBPACK_IMPORTED_MODULE_8__["ErrorTypes"].MEDIA_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_8__["ErrorDetails"].FRAG_PARSING_ERROR,
        fatal: fatal,
        reason: reason
      });

      if (fatal) {
        return;
      }
    }

    _adts__WEBPACK_IMPORTED_MODULE_0__["initTrackConfig"](track, this.observer, data, offset, this.audioCodec);
    var pts;

    if (pes.pts !== undefined) {
      pts = pes.pts;
    } else if (aacOverFlow) {
      // if last AAC frame is overflowing, we should ensure timestamps are contiguous:
      // first sample PTS should be equal to last sample PTS + frameDuration
      var frameDuration = _adts__WEBPACK_IMPORTED_MODULE_0__["getFrameDuration"](track.samplerate);
      pts = aacOverFlow.sample.pts + frameDuration;
    } else {
      _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].warn('[tsdemuxer]: AAC PES unknown PTS');
      return;
    } // scan for aac samples


    var frameIndex = 0;

    while (offset < len) {
      if (_adts__WEBPACK_IMPORTED_MODULE_0__["isHeader"](data, offset)) {
        if (offset + 5 < len) {
          var frame = _adts__WEBPACK_IMPORTED_MODULE_0__["appendFrame"](track, data, offset, pts, frameIndex);

          if (frame) {
            if (frame.missing) {
              this.aacOverFlow = frame;
            } else {
              offset += frame.length;
              frameIndex++;
              continue;
            }
          }
        } // We are at an ADTS header, but do not have enough data for a frame
        // Remaining data will be added to aacOverFlow


        break;
      } else {
        // nothing found, keep looking
        offset++;
      }
    }
  };

  _proto.parseMPEGPES = function parseMPEGPES(pes) {
    var data = pes.data;
    var length = data.length;
    var frameIndex = 0;
    var offset = 0;
    var pts = pes.pts;

    if (pts === undefined) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].warn('[tsdemuxer]: MPEG PES unknown PTS');
      return;
    }

    while (offset < length) {
      if (_mpegaudio__WEBPACK_IMPORTED_MODULE_1__["isHeader"](data, offset)) {
        var frame = _mpegaudio__WEBPACK_IMPORTED_MODULE_1__["appendFrame"](this._audioTrack, data, offset, pts, frameIndex);

        if (frame) {
          offset += frame.length;
          frameIndex++;
        } else {
          // logger.log('Unable to parse Mpeg audio frame');
          break;
        }
      } else {
        // nothing found, keep looking
        offset++;
      }
    }
  };

  _proto.parseID3PES = function parseID3PES(pes) {
    if (pes.pts === undefined) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].warn('[tsdemuxer]: ID3 PES unknown PTS');
      return;
    }

    this._id3Track.samples.push(pes);
  };

  return TSDemuxer;
}();

TSDemuxer.minProbeByteLength = 188;

function createAVCSample(key, pts, dts, debug) {
  return {
    key: key,
    frame: false,
    pts: pts,
    dts: dts,
    units: [],
    debug: debug,
    length: 0
  };
}

function parsePAT(data, offset) {
  // skip the PSI header and parse the first PMT entry
  return (data[offset + 10] & 0x1f) << 8 | data[offset + 11]; // logger.log('PMT PID:'  + this._pmtId);
}

function parsePMT(data, offset, mpegSupported, isSampleAes) {
  var result = {
    audio: -1,
    avc: -1,
    id3: -1,
    isAAC: true
  };
  var sectionLength = (data[offset + 1] & 0x0f) << 8 | data[offset + 2];
  var tableEnd = offset + 3 + sectionLength - 4; // to determine where the table is, we have to figure out how
  // long the program info descriptors are

  var programInfoLength = (data[offset + 10] & 0x0f) << 8 | data[offset + 11]; // advance the offset to the first entry in the mapping table

  offset += 12 + programInfoLength;

  while (offset < tableEnd) {
    var pid = (data[offset + 1] & 0x1f) << 8 | data[offset + 2];

    switch (data[offset]) {
      case 0xcf:
        // SAMPLE-AES AAC
        if (!isSampleAes) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].log('ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream');
          break;
        }

      /* falls through */

      case 0x0f:
        // ISO/IEC 13818-7 ADTS AAC (MPEG-2 lower bit-rate audio)
        // logger.log('AAC PID:'  + pid);
        if (result.audio === -1) {
          result.audio = pid;
        }

        break;
      // Packetized metadata (ID3)

      case 0x15:
        // logger.log('ID3 PID:'  + pid);
        if (result.id3 === -1) {
          result.id3 = pid;
        }

        break;

      case 0xdb:
        // SAMPLE-AES AVC
        if (!isSampleAes) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].log('H.264 with AES-128-CBC slice encryption found in unencrypted stream');
          break;
        }

      /* falls through */

      case 0x1b:
        // ITU-T Rec. H.264 and ISO/IEC 14496-10 (lower bit-rate video)
        // logger.log('AVC PID:'  + pid);
        if (result.avc === -1) {
          result.avc = pid;
        }

        break;
      // ISO/IEC 11172-3 (MPEG-1 audio)
      // or ISO/IEC 13818-3 (MPEG-2 halved sample rate audio)

      case 0x03:
      case 0x04:
        // logger.log('MPEG PID:'  + pid);
        if (!mpegSupported) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].log('MPEG audio found, not supported in this browser');
        } else if (result.audio === -1) {
          result.audio = pid;
          result.isAAC = false;
        }

        break;

      case 0x24:
        _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].warn('Unsupported HEVC stream type found');
        break;

      default:
        // logger.log('unknown stream type:' + data[offset]);
        break;
    } // move to the next table entry
    // skip past the elementary stream descriptors, if present


    offset += ((data[offset + 3] & 0x0f) << 8 | data[offset + 4]) + 5;
  }

  return result;
}

function parsePES(stream) {
  var i = 0;
  var frag;
  var pesLen;
  var pesHdrLen;
  var pesPts;
  var pesDts;
  var data = stream.data; // safety check

  if (!stream || stream.size === 0) {
    return null;
  } // we might need up to 19 bytes to read PES header
  // if first chunk of data is less than 19 bytes, let's merge it with following ones until we get 19 bytes
  // usually only one merge is needed (and this is rare ...)


  while (data[0].length < 19 && data.length > 1) {
    var newData = new Uint8Array(data[0].length + data[1].length);
    newData.set(data[0]);
    newData.set(data[1], data[0].length);
    data[0] = newData;
    data.splice(1, 1);
  } // retrieve PTS/DTS from first fragment


  frag = data[0];
  var pesPrefix = (frag[0] << 16) + (frag[1] << 8) + frag[2];

  if (pesPrefix === 1) {
    pesLen = (frag[4] << 8) + frag[5]; // if PES parsed length is not zero and greater than total received length, stop parsing. PES might be truncated
    // minus 6 : PES header size

    if (pesLen && pesLen > stream.size - 6) {
      return null;
    }

    var pesFlags = frag[7];

    if (pesFlags & 0xc0) {
      /* PES header described here : http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
          as PTS / DTS is 33 bit we cannot use bitwise operator in JS,
          as Bitwise operators treat their operands as a sequence of 32 bits */
      pesPts = (frag[9] & 0x0e) * 536870912 + // 1 << 29
      (frag[10] & 0xff) * 4194304 + // 1 << 22
      (frag[11] & 0xfe) * 16384 + // 1 << 14
      (frag[12] & 0xff) * 128 + // 1 << 7
      (frag[13] & 0xfe) / 2;

      if (pesFlags & 0x40) {
        pesDts = (frag[14] & 0x0e) * 536870912 + // 1 << 29
        (frag[15] & 0xff) * 4194304 + // 1 << 22
        (frag[16] & 0xfe) * 16384 + // 1 << 14
        (frag[17] & 0xff) * 128 + // 1 << 7
        (frag[18] & 0xfe) / 2;

        if (pesPts - pesDts > 60 * 90000) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].warn(Math.round((pesPts - pesDts) / 90000) + "s delta between PTS and DTS, align them");
          pesPts = pesDts;
        }
      } else {
        pesDts = pesPts;
      }
    }

    pesHdrLen = frag[8]; // 9 bytes : 6 bytes for PES header + 3 bytes for PES extension

    var payloadStartOffset = pesHdrLen + 9;

    if (stream.size <= payloadStartOffset) {
      return null;
    }

    stream.size -= payloadStartOffset; // reassemble PES packet

    var pesData = new Uint8Array(stream.size);

    for (var j = 0, dataLen = data.length; j < dataLen; j++) {
      frag = data[j];
      var len = frag.byteLength;

      if (payloadStartOffset) {
        if (payloadStartOffset > len) {
          // trim full frag if PES header bigger than frag
          payloadStartOffset -= len;
          continue;
        } else {
          // trim partial frag if PES header smaller than frag
          frag = frag.subarray(payloadStartOffset);
          len -= payloadStartOffset;
          payloadStartOffset = 0;
        }
      }

      pesData.set(frag, i);
      i += len;
    }

    if (pesLen) {
      // payload size : remove PES header + PES extension
      pesLen -= pesHdrLen + 3;
    }

    return {
      data: pesData,
      pts: pesPts,
      dts: pesDts,
      len: pesLen
    };
  }

  return null;
}

function pushAccessUnit(avcSample, avcTrack) {
  if (avcSample.units.length && avcSample.frame) {
    // if sample does not have PTS/DTS, patch with last sample PTS/DTS
    if (avcSample.pts === undefined) {
      var samples = avcTrack.samples;
      var nbSamples = samples.length;

      if (nbSamples) {
        var lastSample = samples[nbSamples - 1];
        avcSample.pts = lastSample.pts;
        avcSample.dts = lastSample.dts;
      } else {
        // dropping samples, no timestamp found
        avcTrack.dropped++;
        return;
      }
    }

    avcTrack.samples.push(avcSample);
  }

  if (avcSample.debug.length) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_7__["logger"].log(avcSample.pts + '/' + avcSample.dts + ':' + avcSample.debug);
  }
}

function insertSampleInOrder(arr, data) {
  var len = arr.length;

  if (len > 0) {
    if (data.pts >= arr[len - 1].pts) {
      arr.push(data);
    } else {
      for (var pos = len - 1; pos >= 0; pos--) {
        if (data.pts < arr[pos].pts) {
          arr.splice(pos, 0, data);
          break;
        }
      }
    }
  } else {
    arr.push(data);
  }
}
/**
 * remove Emulation Prevention bytes from a RBSP
 */


function discardEPB(data) {
  var length = data.byteLength;
  var EPBPositions = [];
  var i = 1; // Find all `Emulation Prevention Bytes`

  while (i < length - 2) {
    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
      EPBPositions.push(i + 2);
      i += 2;
    } else {
      i++;
    }
  } // If no Emulation Prevention Bytes were found just return the original
  // array


  if (EPBPositions.length === 0) {
    return data;
  } // Create a new array to hold the NAL unit data


  var newLength = length - EPBPositions.length;
  var newData = new Uint8Array(newLength);
  var sourceIndex = 0;

  for (i = 0; i < newLength; sourceIndex++, i++) {
    if (sourceIndex === EPBPositions[0]) {
      // Skip this byte
      sourceIndex++; // Remove this position index

      EPBPositions.shift();
    }

    newData[i] = data[sourceIndex];
  }

  return newData;
}
/* harmony default export */ __webpack_exports__["default"] = (TSDemuxer);

/***/ }),

/***/ "./src/empty.js":
/*!**********************!*\
  !*** ./src/empty.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// This file is inserted as a shim for modules which we do not want to include into the distro.
// This replacement is done in the "resolve" section of the webpack config.
module.exports = undefined;

/***/ }),

/***/ "./src/errors.ts":
/*!***********************!*\
  !*** ./src/errors.ts ***!
  \***********************/
/*! exports provided: ErrorTypes, ErrorDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorTypes", function() { return ErrorTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorDetails", function() { return ErrorDetails; });
var ErrorTypes;
/**
 * @enum {ErrorDetails}
 * @typedef {string} ErrorDetail
 */

(function (ErrorTypes) {
  ErrorTypes["NETWORK_ERROR"] = "networkError";
  ErrorTypes["MEDIA_ERROR"] = "mediaError";
  ErrorTypes["KEY_SYSTEM_ERROR"] = "keySystemError";
  ErrorTypes["MUX_ERROR"] = "muxError";
  ErrorTypes["OTHER_ERROR"] = "otherError";
})(ErrorTypes || (ErrorTypes = {}));

var ErrorDetails;

(function (ErrorDetails) {
  ErrorDetails["KEY_SYSTEM_NO_KEYS"] = "keySystemNoKeys";
  ErrorDetails["KEY_SYSTEM_NO_ACCESS"] = "keySystemNoAccess";
  ErrorDetails["KEY_SYSTEM_NO_SESSION"] = "keySystemNoSession";
  ErrorDetails["KEY_SYSTEM_LICENSE_REQUEST_FAILED"] = "keySystemLicenseRequestFailed";
  ErrorDetails["KEY_SYSTEM_NO_INIT_DATA"] = "keySystemNoInitData";
  ErrorDetails["MANIFEST_LOAD_ERROR"] = "manifestLoadError";
  ErrorDetails["MANIFEST_LOAD_TIMEOUT"] = "manifestLoadTimeOut";
  ErrorDetails["MANIFEST_PARSING_ERROR"] = "manifestParsingError";
  ErrorDetails["MANIFEST_INCOMPATIBLE_CODECS_ERROR"] = "manifestIncompatibleCodecsError";
  ErrorDetails["LEVEL_EMPTY_ERROR"] = "levelEmptyError";
  ErrorDetails["LEVEL_LOAD_ERROR"] = "levelLoadError";
  ErrorDetails["LEVEL_LOAD_TIMEOUT"] = "levelLoadTimeOut";
  ErrorDetails["LEVEL_SWITCH_ERROR"] = "levelSwitchError";
  ErrorDetails["AUDIO_TRACK_LOAD_ERROR"] = "audioTrackLoadError";
  ErrorDetails["AUDIO_TRACK_LOAD_TIMEOUT"] = "audioTrackLoadTimeOut";
  ErrorDetails["SUBTITLE_LOAD_ERROR"] = "subtitleTrackLoadError";
  ErrorDetails["SUBTITLE_TRACK_LOAD_TIMEOUT"] = "subtitleTrackLoadTimeOut";
  ErrorDetails["FRAG_LOAD_ERROR"] = "fragLoadError";
  ErrorDetails["FRAG_LOAD_TIMEOUT"] = "fragLoadTimeOut";
  ErrorDetails["FRAG_DECRYPT_ERROR"] = "fragDecryptError";
  ErrorDetails["FRAG_PARSING_ERROR"] = "fragParsingError";
  ErrorDetails["REMUX_ALLOC_ERROR"] = "remuxAllocError";
  ErrorDetails["KEY_LOAD_ERROR"] = "keyLoadError";
  ErrorDetails["KEY_LOAD_TIMEOUT"] = "keyLoadTimeOut";
  ErrorDetails["BUFFER_ADD_CODEC_ERROR"] = "bufferAddCodecError";
  ErrorDetails["BUFFER_INCOMPATIBLE_CODECS_ERROR"] = "bufferIncompatibleCodecsError";
  ErrorDetails["BUFFER_APPEND_ERROR"] = "bufferAppendError";
  ErrorDetails["BUFFER_APPENDING_ERROR"] = "bufferAppendingError";
  ErrorDetails["BUFFER_STALLED_ERROR"] = "bufferStalledError";
  ErrorDetails["BUFFER_FULL_ERROR"] = "bufferFullError";
  ErrorDetails["BUFFER_SEEK_OVER_HOLE"] = "bufferSeekOverHole";
  ErrorDetails["BUFFER_NUDGE_ON_STALL"] = "bufferNudgeOnStall";
  ErrorDetails["INTERNAL_EXCEPTION"] = "internalException";
  ErrorDetails["INTERNAL_ABORTED"] = "aborted";
  ErrorDetails["UNKNOWN"] = "unknown";
})(ErrorDetails || (ErrorDetails = {}));

/***/ }),

/***/ "./src/events.ts":
/*!***********************!*\
  !*** ./src/events.ts ***!
  \***********************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/**
 * @readonly
 * @enum {string}
 */
var Events;

(function (Events) {
  Events["MEDIA_ATTACHING"] = "hlsMediaAttaching";
  Events["MEDIA_ATTACHED"] = "hlsMediaAttached";
  Events["MEDIA_DETACHING"] = "hlsMediaDetaching";
  Events["MEDIA_DETACHED"] = "hlsMediaDetached";
  Events["BUFFER_RESET"] = "hlsBufferReset";
  Events["BUFFER_CODECS"] = "hlsBufferCodecs";
  Events["BUFFER_CREATED"] = "hlsBufferCreated";
  Events["BUFFER_APPENDING"] = "hlsBufferAppending";
  Events["BUFFER_APPENDED"] = "hlsBufferAppended";
  Events["BUFFER_EOS"] = "hlsBufferEos";
  Events["BUFFER_FLUSHING"] = "hlsBufferFlushing";
  Events["BUFFER_FLUSHED"] = "hlsBufferFlushed";
  Events["MANIFEST_LOADING"] = "hlsManifestLoading";
  Events["MANIFEST_LOADED"] = "hlsManifestLoaded";
  Events["MANIFEST_PARSED"] = "hlsManifestParsed";
  Events["LEVEL_SWITCHING"] = "hlsLevelSwitching";
  Events["LEVEL_SWITCHED"] = "hlsLevelSwitched";
  Events["LEVEL_LOADING"] = "hlsLevelLoading";
  Events["LEVEL_LOADED"] = "hlsLevelLoaded";
  Events["LEVEL_UPDATED"] = "hlsLevelUpdated";
  Events["LEVEL_PTS_UPDATED"] = "hlsLevelPtsUpdated";
  Events["LEVELS_UPDATED"] = "hlsLevelsUpdated";
  Events["AUDIO_TRACKS_UPDATED"] = "hlsAudioTracksUpdated";
  Events["AUDIO_TRACK_SWITCHING"] = "hlsAudioTrackSwitching";
  Events["AUDIO_TRACK_SWITCHED"] = "hlsAudioTrackSwitched";
  Events["AUDIO_TRACK_LOADING"] = "hlsAudioTrackLoading";
  Events["AUDIO_TRACK_LOADED"] = "hlsAudioTrackLoaded";
  Events["SUBTITLE_TRACKS_UPDATED"] = "hlsSubtitleTracksUpdated";
  Events["SUBTITLE_TRACKS_CLEARED"] = "hlsSubtitleTracksCleared";
  Events["SUBTITLE_TRACK_SWITCH"] = "hlsSubtitleTrackSwitch";
  Events["SUBTITLE_TRACK_LOADING"] = "hlsSubtitleTrackLoading";
  Events["SUBTITLE_TRACK_LOADED"] = "hlsSubtitleTrackLoaded";
  Events["SUBTITLE_FRAG_PROCESSED"] = "hlsSubtitleFragProcessed";
  Events["CUES_PARSED"] = "hlsCuesParsed";
  Events["NON_NATIVE_TEXT_TRACKS_FOUND"] = "hlsNonNativeTextTracksFound";
  Events["INIT_PTS_FOUND"] = "hlsInitPtsFound";
  Events["FRAG_LOADING"] = "hlsFragLoading";
  Events["FRAG_LOAD_EMERGENCY_ABORTED"] = "hlsFragLoadEmergencyAborted";
  Events["FRAG_LOADED"] = "hlsFragLoaded";
  Events["FRAG_DECRYPTED"] = "hlsFragDecrypted";
  Events["FRAG_PARSING_INIT_SEGMENT"] = "hlsFragParsingInitSegment";
  Events["FRAG_PARSING_USERDATA"] = "hlsFragParsingUserdata";
  Events["FRAG_PARSING_METADATA"] = "hlsFragParsingMetadata";
  Events["FRAG_PARSED"] = "hlsFragParsed";
  Events["FRAG_BUFFERED"] = "hlsFragBuffered";
  Events["FRAG_CHANGED"] = "hlsFragChanged";
  Events["FPS_DROP"] = "hlsFpsDrop";
  Events["FPS_DROP_LEVEL_CAPPING"] = "hlsFpsDropLevelCapping";
  Events["ERROR"] = "hlsError";
  Events["DESTROYING"] = "hlsDestroying";
  Events["KEY_LOADING"] = "hlsKeyLoading";
  Events["KEY_LOADED"] = "hlsKeyLoaded";
  Events["LIVE_BACK_BUFFER_REACHED"] = "hlsLiveBackBufferReached";
  Events["BACK_BUFFER_REACHED"] = "hlsBackBufferReached";
})(Events || (Events = {}));

/***/ }),

/***/ "./src/hls.ts":
/*!********************!*\
  !*** ./src/hls.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hls; });
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url-toolkit */ "./node_modules/url-toolkit/src/url-toolkit.js");
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loader_playlist_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader/playlist-loader */ "./src/loader/playlist-loader.ts");
/* harmony import */ var _loader_key_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loader/key-loader */ "./src/loader/key-loader.ts");
/* harmony import */ var _controller_id3_track_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller/id3-track-controller */ "./src/controller/id3-track-controller.ts");
/* harmony import */ var _controller_latency_controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controller/latency-controller */ "./src/controller/latency-controller.ts");
/* harmony import */ var _controller_level_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controller/level-controller */ "./src/controller/level-controller.ts");
/* harmony import */ var _controller_fragment_tracker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controller/fragment-tracker */ "./src/controller/fragment-tracker.ts");
/* harmony import */ var _controller_stream_controller__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controller/stream-controller */ "./src/controller/stream-controller.ts");
/* harmony import */ var _is_supported__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./is-supported */ "./src/is-supported.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./events */ "./src/events.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./errors */ "./src/errors.ts");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
















/**
 * @module Hls
 * @class
 * @constructor
 */
var Hls = /*#__PURE__*/function () {
  Hls.isSupported = function isSupported() {
    return Object(_is_supported__WEBPACK_IMPORTED_MODULE_8__["isSupported"])();
  };

  /**
   * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
   *
   * @constructs Hls
   * @param {HlsConfig} config
   */
  function Hls(userConfig) {
    if (userConfig === void 0) {
      userConfig = {};
    }

    this.config = void 0;
    this.userConfig = void 0;
    this.coreComponents = void 0;
    this.networkControllers = void 0;
    this._emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_11__["EventEmitter"]();
    this._autoLevelCapping = void 0;
    this.abrController = void 0;
    this.bufferController = void 0;
    this.capLevelController = void 0;
    this.latencyController = void 0;
    this.levelController = void 0;
    this.streamController = void 0;
    this.audioTrackController = void 0;
    this.subtitleTrackController = void 0;
    this.emeController = void 0;
    this.cmcdController = void 0;
    this._media = null;
    this.url = null;
    var config = this.config = Object(_config__WEBPACK_IMPORTED_MODULE_10__["mergeConfig"])(Hls.DefaultConfig, userConfig);
    this.userConfig = userConfig;
    Object(_utils_logger__WEBPACK_IMPORTED_MODULE_9__["enableLogs"])(config.debug);
    this._autoLevelCapping = -1;

    if (config.progressive) {
      Object(_config__WEBPACK_IMPORTED_MODULE_10__["enableStreamingMode"])(config);
    } // core controllers and network loaders


    var ConfigAbrController = config.abrController,
        ConfigBufferController = config.bufferController,
        ConfigCapLevelController = config.capLevelController,
        ConfigFpsController = config.fpsController;
    var abrController = this.abrController = new ConfigAbrController(this);
    var bufferController = this.bufferController = new ConfigBufferController(this);
    var capLevelController = this.capLevelController = new ConfigCapLevelController(this);
    var fpsController = new ConfigFpsController(this);
    var playListLoader = new _loader_playlist_loader__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    var keyLoader = new _loader_key_loader__WEBPACK_IMPORTED_MODULE_2__["default"](this);
    var id3TrackController = new _controller_id3_track_controller__WEBPACK_IMPORTED_MODULE_3__["default"](this); // network controllers

    var levelController = this.levelController = new _controller_level_controller__WEBPACK_IMPORTED_MODULE_5__["default"](this); // FragmentTracker must be defined before StreamController because the order of event handling is important

    var fragmentTracker = new _controller_fragment_tracker__WEBPACK_IMPORTED_MODULE_6__["FragmentTracker"](this);
    var streamController = this.streamController = new _controller_stream_controller__WEBPACK_IMPORTED_MODULE_7__["default"](this, fragmentTracker); // Cap level controller uses streamController to flush the buffer

    capLevelController.setStreamController(streamController); // fpsController uses streamController to switch when frames are being dropped

    fpsController.setStreamController(streamController);
    var networkControllers = [levelController, streamController];
    this.networkControllers = networkControllers;
    var coreComponents = [playListLoader, keyLoader, abrController, bufferController, capLevelController, fpsController, id3TrackController, fragmentTracker];
    this.audioTrackController = this.createController(config.audioTrackController, null, networkControllers);
    this.createController(config.audioStreamController, fragmentTracker, networkControllers); // subtitleTrackController must be defined before  because the order of event handling is important

    this.subtitleTrackController = this.createController(config.subtitleTrackController, null, networkControllers);
    this.createController(config.subtitleStreamController, fragmentTracker, networkControllers);
    this.createController(config.timelineController, null, coreComponents);
    this.emeController = this.createController(config.emeController, null, coreComponents);
    this.cmcdController = this.createController(config.cmcdController, null, coreComponents);
    this.latencyController = this.createController(_controller_latency_controller__WEBPACK_IMPORTED_MODULE_4__["default"], null, coreComponents);
    this.coreComponents = coreComponents;
  }

  var _proto = Hls.prototype;

  _proto.createController = function createController(ControllerClass, fragmentTracker, components) {
    if (ControllerClass) {
      var controllerInstance = fragmentTracker ? new ControllerClass(this, fragmentTracker) : new ControllerClass(this);

      if (components) {
        components.push(controllerInstance);
      }

      return controllerInstance;
    }

    return null;
  } // Delegate the EventEmitter through the public API of Hls.js
  ;

  _proto.on = function on(event, listener, context) {
    if (context === void 0) {
      context = this;
    }

    this._emitter.on(event, listener, context);
  };

  _proto.once = function once(event, listener, context) {
    if (context === void 0) {
      context = this;
    }

    this._emitter.once(event, listener, context);
  };

  _proto.removeAllListeners = function removeAllListeners(event) {
    this._emitter.removeAllListeners(event);
  };

  _proto.off = function off(event, listener, context, once) {
    if (context === void 0) {
      context = this;
    }

    this._emitter.off(event, listener, context, once);
  };

  _proto.listeners = function listeners(event) {
    return this._emitter.listeners(event);
  };

  _proto.emit = function emit(event, name, eventObject) {
    return this._emitter.emit(event, name, eventObject);
  };

  _proto.trigger = function trigger(event, eventObject) {
    if (this.config.debug) {
      return this.emit(event, event, eventObject);
    } else {
      try {
        return this.emit(event, event, eventObject);
      } catch (e) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].error('An internal error happened while handling event ' + event + '. Error message: "' + e.message + '". Here is a stacktrace:', e);
        this.trigger(_events__WEBPACK_IMPORTED_MODULE_12__["Events"].ERROR, {
          type: _errors__WEBPACK_IMPORTED_MODULE_13__["ErrorTypes"].OTHER_ERROR,
          details: _errors__WEBPACK_IMPORTED_MODULE_13__["ErrorDetails"].INTERNAL_EXCEPTION,
          fatal: false,
          event: event,
          error: e
        });
      }
    }

    return false;
  };

  _proto.listenerCount = function listenerCount(event) {
    return this._emitter.listenerCount(event);
  }
  /**
   * Dispose of the instance
   */
  ;

  _proto.destroy = function destroy() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log('destroy');
    this.trigger(_events__WEBPACK_IMPORTED_MODULE_12__["Events"].DESTROYING, undefined);
    this.detachMedia();
    this.removeAllListeners();
    this._autoLevelCapping = -1;
    this.url = null;
    this.networkControllers.forEach(function (component) {
      return component.destroy();
    });
    this.networkControllers.length = 0;
    this.coreComponents.forEach(function (component) {
      return component.destroy();
    });
    this.coreComponents.length = 0;
  }
  /**
   * Attaches Hls.js to a media element
   * @param {HTMLMediaElement} media
   */
  ;

  _proto.attachMedia = function attachMedia(media) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log('attachMedia');
    this._media = media;
    this.trigger(_events__WEBPACK_IMPORTED_MODULE_12__["Events"].MEDIA_ATTACHING, {
      media: media
    });
  }
  /**
   * Detach Hls.js from the media
   */
  ;

  _proto.detachMedia = function detachMedia() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log('detachMedia');
    this.trigger(_events__WEBPACK_IMPORTED_MODULE_12__["Events"].MEDIA_DETACHING, undefined);
    this._media = null;
  }
  /**
   * Set the source URL. Can be relative or absolute.
   * @param {string} url
   */
  ;

  _proto.loadSource = function loadSource(url) {
    this.stopLoad();
    var media = this.media;
    var loadedSource = this.url;
    var loadingSource = this.url = url_toolkit__WEBPACK_IMPORTED_MODULE_0__["buildAbsoluteURL"](self.location.href, url, {
      alwaysNormalize: true
    });
    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("loadSource:" + loadingSource);

    if (media && loadedSource && loadedSource !== loadingSource && this.bufferController.hasSourceTypes()) {
      this.detachMedia();
      this.attachMedia(media);
    } // when attaching to a source URL, trigger a playlist load


    this.trigger(_events__WEBPACK_IMPORTED_MODULE_12__["Events"].MANIFEST_LOADING, {
      url: url
    });
  }
  /**
   * Start loading data from the stream source.
   * Depending on default config, client starts loading automatically when a source is set.
   *
   * @param {number} startPosition Set the start position to stream from
   * @default -1 None (from earliest point)
   */
  ;

  _proto.startLoad = function startLoad(startPosition) {
    if (startPosition === void 0) {
      startPosition = -1;
    }

    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("startLoad(" + startPosition + ")");
    this.networkControllers.forEach(function (controller) {
      controller.startLoad(startPosition);
    });
  }
  /**
   * Stop loading of any stream data.
   */
  ;

  _proto.stopLoad = function stopLoad() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log('stopLoad');
    this.networkControllers.forEach(function (controller) {
      controller.stopLoad();
    });
  }
  /**
   * Swap through possible audio codecs in the stream (for example to switch from stereo to 5.1)
   */
  ;

  _proto.swapAudioCodec = function swapAudioCodec() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log('swapAudioCodec');
    this.streamController.swapAudioCodec();
  }
  /**
   * When the media-element fails, this allows to detach and then re-attach it
   * as one call (convenience method).
   *
   * Automatic recovery of media-errors by this process is configurable.
   */
  ;

  _proto.recoverMediaError = function recoverMediaError() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log('recoverMediaError');
    var media = this._media;
    this.detachMedia();

    if (media) {
      this.attachMedia(media);
    }
  };

  _proto.removeLevel = function removeLevel(levelIndex, urlId) {
    if (urlId === void 0) {
      urlId = 0;
    }

    this.levelController.removeLevel(levelIndex, urlId);
  }
  /**
   * @type {Level[]}
   */
  ;

  _createClass(Hls, [{
    key: "levels",
    get: function get() {
      var levels = this.levelController.levels;
      return levels ? levels : [];
    }
    /**
     * Index of quality level currently played
     * @type {number}
     */

  }, {
    key: "currentLevel",
    get: function get() {
      return this.streamController.currentLevel;
    }
    /**
     * Set quality level index immediately .
     * This will flush the current buffer to replace the quality asap.
     * That means playback will interrupt at least shortly to re-buffer and re-sync eventually.
     * @type {number} -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("set currentLevel:" + newLevel);
      this.loadLevel = newLevel;
      this.abrController.clearTimer();
      this.streamController.immediateLevelSwitch();
    }
    /**
     * Index of next quality level loaded as scheduled by stream controller.
     * @type {number}
     */

  }, {
    key: "nextLevel",
    get: function get() {
      return this.streamController.nextLevel;
    }
    /**
     * Set quality level index for next loaded data.
     * This will switch the video quality asap, without interrupting playback.
     * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
     * @type {number} -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("set nextLevel:" + newLevel);
      this.levelController.manualLevel = newLevel;
      this.streamController.nextLevelSwitch();
    }
    /**
     * Return the quality level of the currently or last (of none is loaded currently) segment
     * @type {number}
     */

  }, {
    key: "loadLevel",
    get: function get() {
      return this.levelController.level;
    }
    /**
     * Set quality level index for next loaded data in a conservative way.
     * This will switch the quality without flushing, but interrupt current loading.
     * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
     * @type {number} newLevel -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("set loadLevel:" + newLevel);
      this.levelController.manualLevel = newLevel;
    }
    /**
     * get next quality level loaded
     * @type {number}
     */

  }, {
    key: "nextLoadLevel",
    get: function get() {
      return this.levelController.nextLoadLevel;
    }
    /**
     * Set quality level of next loaded segment in a fully "non-destructive" way.
     * Same as `loadLevel` but will wait for next switch (until current loading is done).
     * @type {number} level
     */
    ,
    set: function set(level) {
      this.levelController.nextLoadLevel = level;
    }
    /**
     * Return "first level": like a default level, if not set,
     * falls back to index of first level referenced in manifest
     * @type {number}
     */

  }, {
    key: "firstLevel",
    get: function get() {
      return Math.max(this.levelController.firstLevel, this.minAutoLevel);
    }
    /**
     * Sets "first-level", see getter.
     * @type {number}
     */
    ,
    set: function set(newLevel) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("set firstLevel:" + newLevel);
      this.levelController.firstLevel = newLevel;
    }
    /**
     * Return start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number}
     */

  }, {
    key: "startLevel",
    get: function get() {
      return this.levelController.startLevel;
    }
    /**
     * set  start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number} newLevel
     */
    ,
    set: function set(newLevel) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("set startLevel:" + newLevel); // if not in automatic start level detection, ensure startLevel is greater than minAutoLevel

      if (newLevel !== -1) {
        newLevel = Math.max(newLevel, this.minAutoLevel);
      }

      this.levelController.startLevel = newLevel;
    }
    /**
     * Get the current setting for capLevelToPlayerSize
     *
     * @type {boolean}
     */

  }, {
    key: "capLevelToPlayerSize",
    get: function get() {
      return this.config.capLevelToPlayerSize;
    }
    /**
     * set  dynamically set capLevelToPlayerSize against (`CapLevelController`)
     *
     * @type {boolean}
     */
    ,
    set: function set(shouldStartCapping) {
      var newCapLevelToPlayerSize = !!shouldStartCapping;

      if (newCapLevelToPlayerSize !== this.config.capLevelToPlayerSize) {
        if (newCapLevelToPlayerSize) {
          this.capLevelController.startCapping(); // If capping occurs, nextLevelSwitch will happen based on size.
        } else {
          this.capLevelController.stopCapping();
          this.autoLevelCapping = -1;
          this.streamController.nextLevelSwitch(); // Now we're uncapped, get the next level asap.
        }

        this.config.capLevelToPlayerSize = newCapLevelToPlayerSize;
      }
    }
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */

  }, {
    key: "autoLevelCapping",
    get: function get() {
      return this._autoLevelCapping;
    }
    /**
     * get bandwidth estimate
     * @type {number}
     */
    ,
    set:
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */
    function set(newLevel) {
      if (this._autoLevelCapping !== newLevel) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_9__["logger"].log("set autoLevelCapping:" + newLevel);
        this._autoLevelCapping = newLevel;
      }
    }
    /**
     * True when automatic level selection enabled
     * @type {boolean}
     */

  }, {
    key: "bandwidthEstimate",
    get: function get() {
      var bwEstimator = this.abrController.bwEstimator;

      if (!bwEstimator) {
        return NaN;
      }

      return bwEstimator.getEstimate();
    }
  }, {
    key: "autoLevelEnabled",
    get: function get() {
      return this.levelController.manualLevel === -1;
    }
    /**
     * Level set manually (if any)
     * @type {number}
     */

  }, {
    key: "manualLevel",
    get: function get() {
      return this.levelController.manualLevel;
    }
    /**
     * min level selectable in auto mode according to config.minAutoBitrate
     * @type {number}
     */

  }, {
    key: "minAutoLevel",
    get: function get() {
      var levels = this.levels,
          minAutoBitrate = this.config.minAutoBitrate;
      if (!levels) return 0;
      var len = levels.length;

      for (var i = 0; i < len; i++) {
        if (levels[i].maxBitrate > minAutoBitrate) {
          return i;
        }
      }

      return 0;
    }
    /**
     * max level selectable in auto mode according to autoLevelCapping
     * @type {number}
     */

  }, {
    key: "maxAutoLevel",
    get: function get() {
      var levels = this.levels,
          autoLevelCapping = this.autoLevelCapping;
      var maxAutoLevel;

      if (autoLevelCapping === -1 && levels && levels.length) {
        maxAutoLevel = levels.length - 1;
      } else {
        maxAutoLevel = autoLevelCapping;
      }

      return maxAutoLevel;
    }
    /**
     * next automatically selected quality level
     * @type {number}
     */

  }, {
    key: "nextAutoLevel",
    get: function get() {
      // ensure next auto level is between  min and max auto level
      return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel);
    }
    /**
     * this setter is used to force next auto level.
     * this is useful to force a switch down in auto mode:
     * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
     * forced value is valid for one fragment. upon succesful frag loading at forced level,
     * this value will be resetted to -1 by ABR controller.
     * @type {number}
     */
    ,
    set: function set(nextLevel) {
      this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, nextLevel);
    }
    /**
     * @type {AudioTrack[]}
     */

  }, {
    key: "audioTracks",
    get: function get() {
      var audioTrackController = this.audioTrackController;
      return audioTrackController ? audioTrackController.audioTracks : [];
    }
    /**
     * index of the selected audio track (index in audio track lists)
     * @type {number}
     */

  }, {
    key: "audioTrack",
    get: function get() {
      var audioTrackController = this.audioTrackController;
      return audioTrackController ? audioTrackController.audioTrack : -1;
    }
    /**
     * selects an audio track, based on its index in audio track lists
     * @type {number}
     */
    ,
    set: function set(audioTrackId) {
      var audioTrackController = this.audioTrackController;

      if (audioTrackController) {
        audioTrackController.audioTrack = audioTrackId;
      }
    }
    /**
     * get alternate subtitle tracks list from playlist
     * @type {MediaPlaylist[]}
     */

  }, {
    key: "subtitleTracks",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleTracks : [];
    }
    /**
     * index of the selected subtitle track (index in subtitle track lists)
     * @type {number}
     */

  }, {
    key: "subtitleTrack",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleTrack : -1;
    },
    set:
    /**
     * select an subtitle track, based on its index in subtitle track lists
     * @type {number}
     */
    function set(subtitleTrackId) {
      var subtitleTrackController = this.subtitleTrackController;

      if (subtitleTrackController) {
        subtitleTrackController.subtitleTrack = subtitleTrackId;
      }
    }
    /**
     * @type {boolean}
     */

  }, {
    key: "media",
    get: function get() {
      return this._media;
    }
  }, {
    key: "subtitleDisplay",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleDisplay : false;
    }
    /**
     * Enable/disable subtitle display rendering
     * @type {boolean}
     */
    ,
    set: function set(value) {
      var subtitleTrackController = this.subtitleTrackController;

      if (subtitleTrackController) {
        subtitleTrackController.subtitleDisplay = value;
      }
    }
    /**
     * get mode for Low-Latency HLS loading
     * @type {boolean}
     */

  }, {
    key: "lowLatencyMode",
    get: function get() {
      return this.config.lowLatencyMode;
    }
    /**
     * Enable/disable Low-Latency HLS part playlist and segment loading, and start live streams at playlist PART-HOLD-BACK rather than HOLD-BACK.
     * @type {boolean}
     */
    ,
    set: function set(mode) {
      this.config.lowLatencyMode = mode;
    }
    /**
     * position (in seconds) of live sync point (ie edge of live position minus safety delay defined by ```hls.config.liveSyncDuration```)
     * @type {number}
     */

  }, {
    key: "liveSyncPosition",
    get: function get() {
      return this.latencyController.liveSyncPosition;
    }
    /**
     * estimated position (in seconds) of live edge (ie edge of live playlist plus time sync playlist advanced)
     * returns 0 before first playlist is loaded
     * @type {number}
     */

  }, {
    key: "latency",
    get: function get() {
      return this.latencyController.latency;
    }
    /**
     * maximum distance from the edge before the player seeks forward to ```hls.liveSyncPosition```
     * configured using ```liveMaxLatencyDurationCount``` (multiple of target duration) or ```liveMaxLatencyDuration```
     * returns 0 before first playlist is loaded
     * @type {number}
     */

  }, {
    key: "maxLatency",
    get: function get() {
      return this.latencyController.maxLatency;
    }
    /**
     * target distance from the edge as calculated by the latency controller
     * @type {number}
     */

  }, {
    key: "targetLatency",
    get: function get() {
      return this.latencyController.targetLatency;
    }
    /**
     * the rate at which the edge of the current live playlist is advancing or 1 if there is none
     * @type {number}
     */

  }, {
    key: "drift",
    get: function get() {
      return this.latencyController.drift;
    }
    /**
     * set to true when startLoad is called before MANIFEST_PARSED event
     * @type {boolean}
     */

  }, {
    key: "forceStartLoad",
    get: function get() {
      return this.streamController.forceStartLoad;
    }
  }], [{
    key: "version",
    get: function get() {
      return "1.1.2-0.canary.8054";
    }
  }, {
    key: "Events",
    get: function get() {
      return _events__WEBPACK_IMPORTED_MODULE_12__["Events"];
    }
  }, {
    key: "ErrorTypes",
    get: function get() {
      return _errors__WEBPACK_IMPORTED_MODULE_13__["ErrorTypes"];
    }
  }, {
    key: "ErrorDetails",
    get: function get() {
      return _errors__WEBPACK_IMPORTED_MODULE_13__["ErrorDetails"];
    }
  }, {
    key: "DefaultConfig",
    get: function get() {
      if (!Hls.defaultConfig) {
        return _config__WEBPACK_IMPORTED_MODULE_10__["hlsDefaultConfig"];
      }

      return Hls.defaultConfig;
    }
    /**
     * @type {HlsConfig}
     */
    ,
    set: function set(defaultConfig) {
      Hls.defaultConfig = defaultConfig;
    }
  }]);

  return Hls;
}();

Hls.defaultConfig = void 0;


/***/ }),

/***/ "./src/is-supported.ts":
/*!*****************************!*\
  !*** ./src/is-supported.ts ***!
  \*****************************/
/*! exports provided: isSupported, changeTypeSupported */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupported", function() { return isSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeTypeSupported", function() { return changeTypeSupported; });
/* harmony import */ var _utils_mediasource_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/mediasource-helper */ "./src/utils/mediasource-helper.ts");


function getSourceBuffer() {
  return self.SourceBuffer || self.WebKitSourceBuffer;
}

function isSupported() {
  var mediaSource = Object(_utils_mediasource_helper__WEBPACK_IMPORTED_MODULE_0__["getMediaSource"])();

  if (!mediaSource) {
    return false;
  }

  var sourceBuffer = getSourceBuffer();
  var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'); // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible

  var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
  return !!isTypeSupported && !!sourceBufferValidAPI;
}
function changeTypeSupported() {
  var _sourceBuffer$prototy;

  var sourceBuffer = getSourceBuffer();
  return typeof (sourceBuffer === null || sourceBuffer === void 0 ? void 0 : (_sourceBuffer$prototy = sourceBuffer.prototype) === null || _sourceBuffer$prototy === void 0 ? void 0 : _sourceBuffer$prototy.changeType) === 'function';
}

/***/ }),

/***/ "./src/loader/fragment-loader.ts":
/*!***************************************!*\
  !*** ./src/loader/fragment-loader.ts ***!
  \***************************************/
/*! exports provided: default, LoadError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FragmentLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadError", function() { return LoadError; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var MIN_CHUNK_SIZE = Math.pow(2, 17); // 128kb

var FragmentLoader = /*#__PURE__*/function () {
  function FragmentLoader(config) {
    this.config = void 0;
    this.loader = null;
    this.partLoadTimeout = -1;
    this.config = config;
  }

  var _proto = FragmentLoader.prototype;

  _proto.destroy = function destroy() {
    if (this.loader) {
      this.loader.destroy();
      this.loader = null;
    }
  };

  _proto.abort = function abort() {
    if (this.loader) {
      // Abort the loader for current fragment. Only one may load at any given time
      this.loader.abort();
    }
  };

  _proto.load = function load(frag, _onProgress) {
    var _this = this;

    var url = frag.url;

    if (!url) {
      return Promise.reject(new LoadError({
        type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].FRAG_LOAD_ERROR,
        fatal: false,
        frag: frag,
        networkDetails: null
      }, "Fragment does not have a " + (url ? 'part list' : 'url')));
    }

    this.abort();
    var config = this.config;
    var FragmentILoader = config.fLoader;
    var DefaultILoader = config.loader;
    return new Promise(function (resolve, reject) {
      if (_this.loader) {
        _this.loader.destroy();
      }

      var loader = _this.loader = frag.loader = FragmentILoader ? new FragmentILoader(config) : new DefaultILoader(config);
      var loaderContext = createLoaderContext(frag);
      var loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout,
        highWaterMark: MIN_CHUNK_SIZE
      }; // Assign frag stats to the loader's stats reference

      frag.stats = loader.stats;
      loader.load(loaderContext, loaderConfig, {
        onSuccess: function onSuccess(response, stats, context, networkDetails) {
          _this.resetLoader(frag, loader);

          resolve({
            frag: frag,
            part: null,
            payload: response.data,
            networkDetails: networkDetails
          });
        },
        onError: function onError(response, context, networkDetails) {
          _this.resetLoader(frag, loader);

          reject(new LoadError({
            type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].FRAG_LOAD_ERROR,
            fatal: false,
            frag: frag,
            response: response,
            networkDetails: networkDetails
          }));
        },
        onAbort: function onAbort(stats, context, networkDetails) {
          _this.resetLoader(frag, loader);

          reject(new LoadError({
            type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].INTERNAL_ABORTED,
            fatal: false,
            frag: frag,
            networkDetails: networkDetails
          }));
        },
        onTimeout: function onTimeout(response, context, networkDetails) {
          _this.resetLoader(frag, loader);

          reject(new LoadError({
            type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].FRAG_LOAD_TIMEOUT,
            fatal: false,
            frag: frag,
            networkDetails: networkDetails
          }));
        },
        onProgress: function onProgress(stats, context, data, networkDetails) {
          if (_onProgress) {
            _onProgress({
              frag: frag,
              part: null,
              payload: data,
              networkDetails: networkDetails
            });
          }
        }
      });
    });
  };

  _proto.loadPart = function loadPart(frag, part, onProgress) {
    var _this2 = this;

    this.abort();
    var config = this.config;
    var FragmentILoader = config.fLoader;
    var DefaultILoader = config.loader;
    return new Promise(function (resolve, reject) {
      if (_this2.loader) {
        _this2.loader.destroy();
      }

      var loader = _this2.loader = frag.loader = FragmentILoader ? new FragmentILoader(config) : new DefaultILoader(config);
      var loaderContext = createLoaderContext(frag, part);
      var loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout,
        highWaterMark: MIN_CHUNK_SIZE
      }; // Assign part stats to the loader's stats reference

      part.stats = loader.stats;
      loader.load(loaderContext, loaderConfig, {
        onSuccess: function onSuccess(response, stats, context, networkDetails) {
          _this2.resetLoader(frag, loader);

          _this2.updateStatsFromPart(frag, part);

          var partLoadedData = {
            frag: frag,
            part: part,
            payload: response.data,
            networkDetails: networkDetails
          };
          onProgress(partLoadedData);
          resolve(partLoadedData);
        },
        onError: function onError(response, context, networkDetails) {
          _this2.resetLoader(frag, loader);

          reject(new LoadError({
            type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].FRAG_LOAD_ERROR,
            fatal: false,
            frag: frag,
            part: part,
            response: response,
            networkDetails: networkDetails
          }));
        },
        onAbort: function onAbort(stats, context, networkDetails) {
          frag.stats.aborted = part.stats.aborted;

          _this2.resetLoader(frag, loader);

          reject(new LoadError({
            type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].INTERNAL_ABORTED,
            fatal: false,
            frag: frag,
            part: part,
            networkDetails: networkDetails
          }));
        },
        onTimeout: function onTimeout(response, context, networkDetails) {
          _this2.resetLoader(frag, loader);

          reject(new LoadError({
            type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
            details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].FRAG_LOAD_TIMEOUT,
            fatal: false,
            frag: frag,
            part: part,
            networkDetails: networkDetails
          }));
        }
      });
    });
  };

  _proto.updateStatsFromPart = function updateStatsFromPart(frag, part) {
    var fragStats = frag.stats;
    var partStats = part.stats;
    var partTotal = partStats.total;
    fragStats.loaded += partStats.loaded;

    if (partTotal) {
      var estTotalParts = Math.round(frag.duration / part.duration);
      var estLoadedParts = Math.min(Math.round(fragStats.loaded / partTotal), estTotalParts);
      var estRemainingParts = estTotalParts - estLoadedParts;
      var estRemainingBytes = estRemainingParts * Math.round(fragStats.loaded / estLoadedParts);
      fragStats.total = fragStats.loaded + estRemainingBytes;
    } else {
      fragStats.total = Math.max(fragStats.loaded, fragStats.total);
    }

    var fragLoading = fragStats.loading;
    var partLoading = partStats.loading;

    if (fragLoading.start) {
      // add to fragment loader latency
      fragLoading.first += partLoading.first - partLoading.start;
    } else {
      fragLoading.start = partLoading.start;
      fragLoading.first = partLoading.first;
    }

    fragLoading.end = partLoading.end;
  };

  _proto.resetLoader = function resetLoader(frag, loader) {
    frag.loader = null;

    if (this.loader === loader) {
      self.clearTimeout(this.partLoadTimeout);
      this.loader = null;
    }

    loader.destroy();
  };

  return FragmentLoader;
}();



function createLoaderContext(frag, part) {
  if (part === void 0) {
    part = null;
  }

  var segment = part || frag;
  var loaderContext = {
    frag: frag,
    part: part,
    responseType: 'arraybuffer',
    url: segment.url,
    headers: {},
    rangeStart: 0,
    rangeEnd: 0
  };
  var start = segment.byteRangeStartOffset;
  var end = segment.byteRangeEndOffset;

  if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(start) && Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(end)) {
    loaderContext.rangeStart = start;
    loaderContext.rangeEnd = end;
  }

  return loaderContext;
}

var LoadError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(LoadError, _Error);

  function LoadError(data) {
    var _this3;

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    _this3 = _Error.call.apply(_Error, [this].concat(params)) || this;
    _this3.data = void 0;
    _this3.data = data;
    return _this3;
  }

  return LoadError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/***/ }),

/***/ "./src/loader/fragment.ts":
/*!********************************!*\
  !*** ./src/loader/fragment.ts ***!
  \********************************/
/*! exports provided: ElementaryStreamTypes, BaseSegment, Fragment, Part */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementaryStreamTypes", function() { return ElementaryStreamTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseSegment", function() { return BaseSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Part", function() { return Part; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url-toolkit */ "./node_modules/url-toolkit/src/url-toolkit.js");
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url_toolkit__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _level_key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./level-key */ "./src/loader/level-key.ts");
/* harmony import */ var _load_stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./load-stats */ "./src/loader/load-stats.ts");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var ElementaryStreamTypes;

(function (ElementaryStreamTypes) {
  ElementaryStreamTypes["AUDIO"] = "audio";
  ElementaryStreamTypes["VIDEO"] = "video";
  ElementaryStreamTypes["AUDIOVIDEO"] = "audiovideo";
})(ElementaryStreamTypes || (ElementaryStreamTypes = {}));

var BaseSegment = /*#__PURE__*/function () {
  // baseurl is the URL to the playlist
  // relurl is the portion of the URL that comes from inside the playlist.
  // Holds the types of data this fragment supports
  function BaseSegment(baseurl) {
    var _this$elementaryStrea;

    this._byteRange = null;
    this._url = null;
    this.baseurl = void 0;
    this.relurl = void 0;
    this.elementaryStreams = (_this$elementaryStrea = {}, _this$elementaryStrea[ElementaryStreamTypes.AUDIO] = null, _this$elementaryStrea[ElementaryStreamTypes.VIDEO] = null, _this$elementaryStrea[ElementaryStreamTypes.AUDIOVIDEO] = null, _this$elementaryStrea);
    this.baseurl = baseurl;
  } // setByteRange converts a EXT-X-BYTERANGE attribute into a two element array


  var _proto = BaseSegment.prototype;

  _proto.setByteRange = function setByteRange(value, previous) {
    var params = value.split('@', 2);
    var byteRange = [];

    if (params.length === 1) {
      byteRange[0] = previous ? previous.byteRangeEndOffset : 0;
    } else {
      byteRange[0] = parseInt(params[1]);
    }

    byteRange[1] = parseInt(params[0]) + byteRange[0];
    this._byteRange = byteRange;
  };

  _createClass(BaseSegment, [{
    key: "byteRange",
    get: function get() {
      if (!this._byteRange) {
        return [];
      }

      return this._byteRange;
    }
  }, {
    key: "byteRangeStartOffset",
    get: function get() {
      return this.byteRange[0];
    }
  }, {
    key: "byteRangeEndOffset",
    get: function get() {
      return this.byteRange[1];
    }
  }, {
    key: "url",
    get: function get() {
      if (!this._url && this.baseurl && this.relurl) {
        this._url = Object(url_toolkit__WEBPACK_IMPORTED_MODULE_1__["buildAbsoluteURL"])(this.baseurl, this.relurl, {
          alwaysNormalize: true
        });
      }

      return this._url || '';
    },
    set: function set(value) {
      this._url = value;
    }
  }]);

  return BaseSegment;
}();
var Fragment = /*#__PURE__*/function (_BaseSegment) {
  _inheritsLoose(Fragment, _BaseSegment);

  // EXTINF has to be present for a m38 to be considered valid
  // sn notates the sequence number for a segment, and if set to a string can be 'initSegment'
  // levelkey is the EXT-X-KEY that applies to this segment for decryption
  // core difference from the private field _decryptdata is the lack of the initialized IV
  // _decryptdata will set the IV for this segment based on the segment number in the fragment
  // A string representing the fragment type
  // A reference to the loader. Set while the fragment is loading, and removed afterwards. Used to abort fragment loading
  // The level/track index to which the fragment belongs
  // The continuity counter of the fragment
  // The starting Presentation Time Stamp (PTS) of the fragment. Set after transmux complete.
  // The ending Presentation Time Stamp (PTS) of the fragment. Set after transmux complete.
  // The latest Presentation Time Stamp (PTS) appended to the buffer.
  // The starting Decode Time Stamp (DTS) of the fragment. Set after transmux complete.
  // The ending Decode Time Stamp (DTS) of the fragment. Set after transmux complete.
  // The start time of the fragment, as listed in the manifest. Updated after transmux complete.
  // Set by `updateFragPTSDTS` in level-helper
  // The maximum starting Presentation Time Stamp (audio/video PTS) of the fragment. Set after transmux complete.
  // The minimum ending Presentation Time Stamp (audio/video PTS) of the fragment. Set after transmux complete.
  // Load/parse timing information
  // A flag indicating whether the segment was downloaded in order to test bitrate, and was not buffered
  // #EXTINF  segment title
  // The Media Initialization Section for this segment
  function Fragment(type, baseurl) {
    var _this;

    _this = _BaseSegment.call(this, baseurl) || this;
    _this._decryptdata = null;
    _this.rawProgramDateTime = null;
    _this.programDateTime = null;
    _this.tagList = [];
    _this.duration = 0;
    _this.sn = 0;
    _this.levelkey = void 0;
    _this.type = void 0;
    _this.loader = null;
    _this.level = -1;
    _this.cc = 0;
    _this.startPTS = void 0;
    _this.endPTS = void 0;
    _this.appendedPTS = void 0;
    _this.startDTS = void 0;
    _this.endDTS = void 0;
    _this.start = 0;
    _this.deltaPTS = void 0;
    _this.maxStartPTS = void 0;
    _this.minEndPTS = void 0;
    _this.stats = new _load_stats__WEBPACK_IMPORTED_MODULE_4__["LoadStats"]();
    _this.urlId = 0;
    _this.data = void 0;
    _this.bitrateTest = false;
    _this.title = null;
    _this.initSegment = null;
    _this.type = type;
    return _this;
  }

  var _proto2 = Fragment.prototype;

  /**
   * Utility method for parseLevelPlaylist to create an initialization vector for a given segment
   * @param {number} segmentNumber - segment number to generate IV with
   * @returns {Uint8Array}
   */
  _proto2.createInitializationVector = function createInitializationVector(segmentNumber) {
    var uint8View = new Uint8Array(16);

    for (var i = 12; i < 16; i++) {
      uint8View[i] = segmentNumber >> 8 * (15 - i) & 0xff;
    }

    return uint8View;
  }
  /**
   * Utility method for parseLevelPlaylist to get a fragment's decryption data from the currently parsed encryption key data
   * @param levelkey - a playlist's encryption info
   * @param segmentNumber - the fragment's segment number
   * @returns {LevelKey} - an object to be applied as a fragment's decryptdata
   */
  ;

  _proto2.setDecryptDataFromLevelKey = function setDecryptDataFromLevelKey(levelkey, segmentNumber) {
    var decryptdata = levelkey;

    if ((levelkey === null || levelkey === void 0 ? void 0 : levelkey.method) === 'AES-128' && levelkey.uri && !levelkey.iv) {
      decryptdata = _level_key__WEBPACK_IMPORTED_MODULE_3__["LevelKey"].fromURI(levelkey.uri);
      decryptdata.method = levelkey.method;
      decryptdata.iv = this.createInitializationVector(segmentNumber);
      decryptdata.keyFormat = 'identity';
    }

    return decryptdata;
  };

  _proto2.setElementaryStreamInfo = function setElementaryStreamInfo(type, startPTS, endPTS, startDTS, endDTS, partial) {
    if (partial === void 0) {
      partial = false;
    }

    var elementaryStreams = this.elementaryStreams;
    var info = elementaryStreams[type];

    if (!info) {
      elementaryStreams[type] = {
        startPTS: startPTS,
        endPTS: endPTS,
        startDTS: startDTS,
        endDTS: endDTS,
        partial: partial
      };
      return;
    }

    info.startPTS = Math.min(info.startPTS, startPTS);
    info.endPTS = Math.max(info.endPTS, endPTS);
    info.startDTS = Math.min(info.startDTS, startDTS);
    info.endDTS = Math.max(info.endDTS, endDTS);
  };

  _proto2.clearElementaryStreamInfo = function clearElementaryStreamInfo() {
    var elementaryStreams = this.elementaryStreams;
    elementaryStreams[ElementaryStreamTypes.AUDIO] = null;
    elementaryStreams[ElementaryStreamTypes.VIDEO] = null;
    elementaryStreams[ElementaryStreamTypes.AUDIOVIDEO] = null;
  };

  _createClass(Fragment, [{
    key: "decryptdata",
    get: function get() {
      if (!this.levelkey && !this._decryptdata) {
        return null;
      }

      if (!this._decryptdata && this.levelkey) {
        var sn = this.sn;

        if (typeof sn !== 'number') {
          // We are fetching decryption data for a initialization segment
          // If the segment was encrypted with AES-128
          // It must have an IV defined. We cannot substitute the Segment Number in.
          if (this.levelkey && this.levelkey.method === 'AES-128' && !this.levelkey.iv) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("missing IV for initialization segment with method=\"" + this.levelkey.method + "\" - compliance issue");
          }
          /*
          Be converted to a Number.
          'initSegment' will become NaN.
          NaN, which when converted through ToInt32() -> +0.
          ---
          Explicitly set sn to resulting value from implicit conversions 'initSegment' values for IV generation.
          */


          sn = 0;
        }

        this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, sn);
      }

      return this._decryptdata;
    }
  }, {
    key: "end",
    get: function get() {
      return this.start + this.duration;
    }
  }, {
    key: "endProgramDateTime",
    get: function get() {
      if (this.programDateTime === null) {
        return null;
      }

      if (!Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(this.programDateTime)) {
        return null;
      }

      var duration = !Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(this.duration) ? 0 : this.duration;
      return this.programDateTime + duration * 1000;
    }
  }, {
    key: "encrypted",
    get: function get() {
      var _this$decryptdata;

      // At the m3u8-parser level we need to add support for manifest signalled keyformats
      // when we want the fragment to start reporting that it is encrypted.
      // Currently, keyFormat will only be set for identity keys
      if ((_this$decryptdata = this.decryptdata) !== null && _this$decryptdata !== void 0 && _this$decryptdata.keyFormat && this.decryptdata.uri) {
        return true;
      }

      return false;
    }
  }]);

  return Fragment;
}(BaseSegment);
var Part = /*#__PURE__*/function (_BaseSegment2) {
  _inheritsLoose(Part, _BaseSegment2);

  function Part(partAttrs, frag, baseurl, index, previous) {
    var _this2;

    _this2 = _BaseSegment2.call(this, baseurl) || this;
    _this2.fragOffset = 0;
    _this2.duration = 0;
    _this2.gap = false;
    _this2.independent = false;
    _this2.relurl = void 0;
    _this2.fragment = void 0;
    _this2.index = void 0;
    _this2.stats = new _load_stats__WEBPACK_IMPORTED_MODULE_4__["LoadStats"]();
    _this2.duration = partAttrs.decimalFloatingPoint('DURATION');
    _this2.gap = partAttrs.bool('GAP');
    _this2.independent = partAttrs.bool('INDEPENDENT');
    _this2.relurl = partAttrs.enumeratedString('URI');
    _this2.fragment = frag;
    _this2.index = index;
    var byteRange = partAttrs.enumeratedString('BYTERANGE');

    if (byteRange) {
      _this2.setByteRange(byteRange, previous);
    }

    if (previous) {
      _this2.fragOffset = previous.fragOffset + previous.duration;
    }

    return _this2;
  }

  _createClass(Part, [{
    key: "start",
    get: function get() {
      return this.fragment.start + this.fragOffset;
    }
  }, {
    key: "end",
    get: function get() {
      return this.start + this.duration;
    }
  }, {
    key: "loaded",
    get: function get() {
      var elementaryStreams = this.elementaryStreams;
      return !!(elementaryStreams.audio || elementaryStreams.video || elementaryStreams.audiovideo);
    }
  }]);

  return Part;
}(BaseSegment);

/***/ }),

/***/ "./src/loader/key-loader.ts":
/*!**********************************!*\
  !*** ./src/loader/key-loader.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeyLoader; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/*
 * Decrypt key Loader
 */




var KeyLoader = /*#__PURE__*/function () {
  function KeyLoader(hls) {
    this.hls = void 0;
    this.loaders = {};
    this.decryptkey = null;
    this.decrypturl = null;
    this.hls = hls;

    this._registerListeners();
  }

  var _proto = KeyLoader.prototype;

  _proto._registerListeners = function _registerListeners() {
    this.hls.on(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].KEY_LOADING, this.onKeyLoading, this);
  };

  _proto._unregisterListeners = function _unregisterListeners() {
    this.hls.off(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].KEY_LOADING, this.onKeyLoading);
  };

  _proto.destroy = function destroy() {
    this._unregisterListeners();

    for (var loaderName in this.loaders) {
      var loader = this.loaders[loaderName];

      if (loader) {
        loader.destroy();
      }
    }

    this.loaders = {};
  };

  _proto.onKeyLoading = function onKeyLoading(event, data) {
    var frag = data.frag;
    var type = frag.type;
    var loader = this.loaders[type];

    if (!frag.decryptdata) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn('Missing decryption data on fragment in onKeyLoading');
      return;
    } // Load the key if the uri is different from previous one, or if the decrypt key has not yet been retrieved


    var uri = frag.decryptdata.uri;

    if (uri !== this.decrypturl || this.decryptkey === null) {
      var config = this.hls.config;

      if (loader) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn("abort previous key loader for type:" + type);
        loader.abort();
      }

      if (!uri) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].warn('key uri is falsy');
        return;
      }

      var Loader = config.loader;
      var fragLoader = frag.loader = this.loaders[type] = new Loader(config);
      this.decrypturl = uri;
      this.decryptkey = null;
      var loaderContext = {
        url: uri,
        frag: frag,
        responseType: 'arraybuffer'
      }; // maxRetry is 0 so that instead of retrying the same key on the same variant multiple times,
      // key-loader will trigger an error and rely on stream-controller to handle retry logic.
      // this will also align retry logic with fragment-loader

      var loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: config.fragLoadingRetryDelay,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout,
        highWaterMark: 0
      };
      var loaderCallbacks = {
        onSuccess: this.loadsuccess.bind(this),
        onError: this.loaderror.bind(this),
        onTimeout: this.loadtimeout.bind(this)
      };
      fragLoader.load(loaderContext, loaderConfig, loaderCallbacks);
    } else if (this.decryptkey) {
      // Return the key if it's already been loaded
      frag.decryptdata.key = this.decryptkey;
      this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].KEY_LOADED, {
        frag: frag
      });
    }
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context) {
    var frag = context.frag;

    if (!frag.decryptdata) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].error('after key load, decryptdata unset');
      return;
    }

    this.decryptkey = frag.decryptdata.key = new Uint8Array(response.data); // detach fragment loader on load success

    frag.loader = null;
    delete this.loaders[frag.type];
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].KEY_LOADED, {
      frag: frag
    });
  };

  _proto.loaderror = function loaderror(response, context) {
    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    delete this.loaders[frag.type];
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].ERROR, {
      type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
      details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].KEY_LOAD_ERROR,
      fatal: false,
      frag: frag,
      response: response
    });
  };

  _proto.loadtimeout = function loadtimeout(stats, context) {
    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    delete this.loaders[frag.type];
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_0__["Events"].ERROR, {
      type: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorTypes"].NETWORK_ERROR,
      details: _errors__WEBPACK_IMPORTED_MODULE_1__["ErrorDetails"].KEY_LOAD_TIMEOUT,
      fatal: false,
      frag: frag
    });
  };

  return KeyLoader;
}();



/***/ }),

/***/ "./src/loader/level-details.ts":
/*!*************************************!*\
  !*** ./src/loader/level-details.ts ***!
  \*************************************/
/*! exports provided: LevelDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelDetails", function() { return LevelDetails; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_TARGET_DURATION = 10;
var LevelDetails = /*#__PURE__*/function () {
  // Manifest reload synchronization
  function LevelDetails(baseUrl) {
    this.PTSKnown = false;
    this.alignedSliding = false;
    this.averagetargetduration = void 0;
    this.endCC = 0;
    this.endSN = 0;
    this.fragments = void 0;
    this.fragmentHint = void 0;
    this.partList = null;
    this.live = true;
    this.ageHeader = 0;
    this.advancedDateTime = void 0;
    this.updated = true;
    this.advanced = true;
    this.availabilityDelay = void 0;
    this.misses = 0;
    this.needSidxRanges = false;
    this.startCC = 0;
    this.startSN = 0;
    this.startTimeOffset = null;
    this.targetduration = 0;
    this.totalduration = 0;
    this.type = null;
    this.url = void 0;
    this.m3u8 = '';
    this.version = null;
    this.canBlockReload = false;
    this.canSkipUntil = 0;
    this.canSkipDateRanges = false;
    this.skippedSegments = 0;
    this.recentlyRemovedDateranges = void 0;
    this.partHoldBack = 0;
    this.holdBack = 0;
    this.partTarget = 0;
    this.preloadHint = void 0;
    this.renditionReports = void 0;
    this.tuneInGoal = 0;
    this.deltaUpdateFailed = void 0;
    this.driftStartTime = 0;
    this.driftEndTime = 0;
    this.driftStart = 0;
    this.driftEnd = 0;
    this.fragments = [];
    this.url = baseUrl;
  }

  var _proto = LevelDetails.prototype;

  _proto.reloaded = function reloaded(previous) {
    if (!previous) {
      this.advanced = true;
      this.updated = true;
      return;
    }

    var partSnDiff = this.lastPartSn - previous.lastPartSn;
    var partIndexDiff = this.lastPartIndex - previous.lastPartIndex;
    this.updated = this.endSN !== previous.endSN || !!partIndexDiff || !!partSnDiff;
    this.advanced = this.endSN > previous.endSN || partSnDiff > 0 || partSnDiff === 0 && partIndexDiff > 0;

    if (this.updated || this.advanced) {
      this.misses = Math.floor(previous.misses * 0.6);
    } else {
      this.misses = previous.misses + 1;
    }

    this.availabilityDelay = previous.availabilityDelay;
  };

  _createClass(LevelDetails, [{
    key: "hasProgramDateTime",
    get: function get() {
      if (this.fragments.length) {
        return Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(this.fragments[this.fragments.length - 1].programDateTime);
      }

      return false;
    }
  }, {
    key: "levelTargetDuration",
    get: function get() {
      return this.averagetargetduration || this.targetduration || DEFAULT_TARGET_DURATION;
    }
  }, {
    key: "drift",
    get: function get() {
      var runTime = this.driftEndTime - this.driftStartTime;

      if (runTime > 0) {
        var runDuration = this.driftEnd - this.driftStart;
        return runDuration * 1000 / runTime;
      }

      return 1;
    }
  }, {
    key: "edge",
    get: function get() {
      return this.partEnd || this.fragmentEnd;
    }
  }, {
    key: "partEnd",
    get: function get() {
      var _this$partList;

      if ((_this$partList = this.partList) !== null && _this$partList !== void 0 && _this$partList.length) {
        return this.partList[this.partList.length - 1].end;
      }

      return this.fragmentEnd;
    }
  }, {
    key: "fragmentEnd",
    get: function get() {
      var _this$fragments;

      if ((_this$fragments = this.fragments) !== null && _this$fragments !== void 0 && _this$fragments.length) {
        return this.fragments[this.fragments.length - 1].end;
      }

      return 0;
    }
  }, {
    key: "age",
    get: function get() {
      if (this.advancedDateTime) {
        return Math.max(Date.now() - this.advancedDateTime, 0) / 1000;
      }

      return 0;
    }
  }, {
    key: "lastPartIndex",
    get: function get() {
      var _this$partList2;

      if ((_this$partList2 = this.partList) !== null && _this$partList2 !== void 0 && _this$partList2.length) {
        return this.partList[this.partList.length - 1].index;
      }

      return -1;
    }
  }, {
    key: "lastPartSn",
    get: function get() {
      var _this$partList3;

      if ((_this$partList3 = this.partList) !== null && _this$partList3 !== void 0 && _this$partList3.length) {
        return this.partList[this.partList.length - 1].fragment.sn;
      }

      return this.endSN;
    }
  }]);

  return LevelDetails;
}();

/***/ }),

/***/ "./src/loader/level-key.ts":
/*!*********************************!*\
  !*** ./src/loader/level-key.ts ***!
  \*********************************/
/*! exports provided: LevelKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelKey", function() { return LevelKey; });
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url-toolkit */ "./node_modules/url-toolkit/src/url-toolkit.js");
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url_toolkit__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var LevelKey = /*#__PURE__*/function () {
  LevelKey.fromURL = function fromURL(baseUrl, relativeUrl) {
    return new LevelKey(baseUrl, relativeUrl);
  };

  LevelKey.fromURI = function fromURI(uri) {
    return new LevelKey(uri);
  };

  function LevelKey(absoluteOrBaseURI, relativeURL) {
    this._uri = null;
    this.method = null;
    this.keyFormat = null;
    this.keyFormatVersions = null;
    this.keyID = null;
    this.key = null;
    this.iv = null;

    if (relativeURL) {
      this._uri = Object(url_toolkit__WEBPACK_IMPORTED_MODULE_0__["buildAbsoluteURL"])(absoluteOrBaseURI, relativeURL, {
        alwaysNormalize: true
      });
    } else {
      this._uri = absoluteOrBaseURI;
    }
  }

  _createClass(LevelKey, [{
    key: "uri",
    get: function get() {
      return this._uri;
    }
  }]);

  return LevelKey;
}();

/***/ }),

/***/ "./src/loader/load-stats.ts":
/*!**********************************!*\
  !*** ./src/loader/load-stats.ts ***!
  \**********************************/
/*! exports provided: LoadStats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadStats", function() { return LoadStats; });
var LoadStats = function LoadStats() {
  this.aborted = false;
  this.loaded = 0;
  this.retry = 0;
  this.total = 0;
  this.chunkCount = 0;
  this.bwEstimate = 0;
  this.loading = {
    start: 0,
    first: 0,
    end: 0
  };
  this.parsing = {
    start: 0,
    end: 0
  };
  this.buffering = {
    start: 0,
    first: 0,
    end: 0
  };
};

/***/ }),

/***/ "./src/loader/m3u8-parser.ts":
/*!***********************************!*\
  !*** ./src/loader/m3u8-parser.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return M3U8Parser; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url-toolkit */ "./node_modules/url-toolkit/src/url-toolkit.js");
/* harmony import */ var url_toolkit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url_toolkit__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fragment */ "./src/loader/fragment.ts");
/* harmony import */ var _level_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./level-details */ "./src/loader/level-details.ts");
/* harmony import */ var _level_key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./level-key */ "./src/loader/level-key.ts");
/* harmony import */ var _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/attr-list */ "./src/utils/attr-list.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _utils_codecs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/codecs */ "./src/utils/codecs.ts");











// https://regex101.com is your friend
var MASTER_PLAYLIST_REGEX = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+/g;
var MASTER_PLAYLIST_MEDIA_REGEX = /#EXT-X-MEDIA:(.*)/g;
var LEVEL_PLAYLIST_REGEX_FAST = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
/(?!#) *(\S[\S ]*)/.source, // segment URI, group 3 => the URI (note newline is not eaten)
/#EXT-X-BYTERANGE:*(.+)/.source, // next segment's byterange, group 4 => range spec (x@y)
/#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, // next segment's program date/time group 5 => the datetime spec
/#.*/.source // All other non-segment oriented tags will match with all groups empty
].join('|'), 'g');
var LEVEL_PLAYLIST_REGEX_SLOW = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(PLAYLIST-TYPE):(.+)/.source, /#EXT-X-(MEDIA-SEQUENCE): *(\d+)/.source, /#EXT-X-(SKIP):(.+)/.source, /#EXT-X-(TARGETDURATION): *(\d+)/.source, /#EXT-X-(KEY):(.+)/.source, /#EXT-X-(START):(.+)/.source, /#EXT-X-(ENDLIST)/.source, /#EXT-X-(DISCONTINUITY-SEQ)UENCE: *(\d+)/.source, /#EXT-X-(DIS)CONTINUITY/.source, /#EXT-X-(VERSION):(\d+)/.source, /#EXT-X-(MAP):(.+)/.source, /#EXT-X-(SERVER-CONTROL):(.+)/.source, /#EXT-X-(PART-INF):(.+)/.source, /#EXT-X-(GAP)/.source, /#EXT-X-(BITRATE):\s*(\d+)/.source, /#EXT-X-(PART):(.+)/.source, /#EXT-X-(PRELOAD-HINT):(.+)/.source, /#EXT-X-(RENDITION-REPORT):(.+)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join('|'));
var MP4_REGEX_SUFFIX = /\.(mp4|m4s|m4v|m4a)$/i;

function isMP4Url(url) {
  var _URLToolkit$parseURL$, _URLToolkit$parseURL;

  return MP4_REGEX_SUFFIX.test((_URLToolkit$parseURL$ = (_URLToolkit$parseURL = url_toolkit__WEBPACK_IMPORTED_MODULE_1__["parseURL"](url)) === null || _URLToolkit$parseURL === void 0 ? void 0 : _URLToolkit$parseURL.path) != null ? _URLToolkit$parseURL$ : '');
}

var M3U8Parser = /*#__PURE__*/function () {
  function M3U8Parser() {}

  M3U8Parser.findGroup = function findGroup(groups, mediaGroupId) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];

      if (group.id === mediaGroupId) {
        return group;
      }
    }
  };

  M3U8Parser.convertAVC1ToAVCOTI = function convertAVC1ToAVCOTI(codec) {
    // Convert avc1 codec string from RFC-4281 to RFC-6381 for MediaSource.isTypeSupported
    var avcdata = codec.split('.');

    if (avcdata.length > 2) {
      var result = avcdata.shift() + '.';
      result += parseInt(avcdata.shift()).toString(16);
      result += ('000' + parseInt(avcdata.shift()).toString(16)).substr(-4);
      return result;
    }

    return codec;
  };

  M3U8Parser.resolve = function resolve(url, baseUrl) {
    return url_toolkit__WEBPACK_IMPORTED_MODULE_1__["buildAbsoluteURL"](baseUrl, url, {
      alwaysNormalize: true
    });
  };

  M3U8Parser.parseMasterPlaylist = function parseMasterPlaylist(string, baseurl) {
    var levels = [];
    var sessionData = {};
    var hasSessionData = false;
    MASTER_PLAYLIST_REGEX.lastIndex = 0;
    var result;

    while ((result = MASTER_PLAYLIST_REGEX.exec(string)) != null) {
      if (result[1]) {
        // '#EXT-X-STREAM-INF' is found, parse level tag  in group 1
        var attrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](result[1]);
        var level = {
          attrs: attrs,
          bitrate: attrs.decimalInteger('AVERAGE-BANDWIDTH') || attrs.decimalInteger('BANDWIDTH'),
          name: attrs.NAME,
          url: M3U8Parser.resolve(result[2], baseurl)
        };
        var resolution = attrs.decimalResolution('RESOLUTION');

        if (resolution) {
          level.width = resolution.width;
          level.height = resolution.height;
        }

        setCodecs((attrs.CODECS || '').split(/[ ,]+/).filter(function (c) {
          return c;
        }), level);

        if (level.videoCodec && level.videoCodec.indexOf('avc1') !== -1) {
          level.videoCodec = M3U8Parser.convertAVC1ToAVCOTI(level.videoCodec);
        }

        levels.push(level);
      } else if (result[3]) {
        // '#EXT-X-SESSION-DATA' is found, parse session data in group 3
        var sessionAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](result[3]);

        if (sessionAttrs['DATA-ID']) {
          hasSessionData = true;
          sessionData[sessionAttrs['DATA-ID']] = sessionAttrs;
        }
      }
    }

    return {
      levels: levels,
      sessionData: hasSessionData ? sessionData : null
    };
  };

  M3U8Parser.parseMasterPlaylistMedia = function parseMasterPlaylistMedia(string, baseurl, type, groups) {
    if (groups === void 0) {
      groups = [];
    }

    var result;
    var medias = [];
    var id = 0;
    MASTER_PLAYLIST_MEDIA_REGEX.lastIndex = 0;

    while ((result = MASTER_PLAYLIST_MEDIA_REGEX.exec(string)) !== null) {
      var attrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](result[1]);

      if (attrs.TYPE === type) {
        var media = {
          attrs: attrs,
          bitrate: 0,
          id: id++,
          groupId: attrs['GROUP-ID'],
          instreamId: attrs['INSTREAM-ID'],
          name: attrs.NAME || attrs.LANGUAGE || '',
          type: type,
          default: attrs.bool('DEFAULT'),
          autoselect: attrs.bool('AUTOSELECT'),
          forced: attrs.bool('FORCED'),
          lang: attrs.LANGUAGE,
          url: attrs.URI ? M3U8Parser.resolve(attrs.URI, baseurl) : ''
        };

        if (groups.length) {
          // If there are audio or text groups signalled in the manifest, let's look for a matching codec string for this track
          // If we don't find the track signalled, lets use the first audio groups codec we have
          // Acting as a best guess
          var groupCodec = M3U8Parser.findGroup(groups, media.groupId) || groups[0];
          assignCodec(media, groupCodec, 'audioCodec');
          assignCodec(media, groupCodec, 'textCodec');
        }

        medias.push(media);
      }
    }

    return medias;
  };

  M3U8Parser.parseLevelPlaylist = function parseLevelPlaylist(string, baseurl, id, type, levelUrlId) {
    var level = new _level_details__WEBPACK_IMPORTED_MODULE_3__["LevelDetails"](baseurl);
    var fragments = level.fragments; // The most recent init segment seen (applies to all subsequent segments)

    var currentInitSegment = null;
    var currentSN = 0;
    var currentPart = 0;
    var totalduration = 0;
    var discontinuityCounter = 0;
    var prevFrag = null;
    var frag = new _fragment__WEBPACK_IMPORTED_MODULE_2__["Fragment"](type, baseurl);
    var result;
    var i;
    var levelkey;
    var firstPdtIndex = -1;
    var createNextFrag = false;
    LEVEL_PLAYLIST_REGEX_FAST.lastIndex = 0;
    level.m3u8 = string;

    while ((result = LEVEL_PLAYLIST_REGEX_FAST.exec(string)) !== null) {
      if (createNextFrag) {
        createNextFrag = false;
        frag = new _fragment__WEBPACK_IMPORTED_MODULE_2__["Fragment"](type, baseurl); // setup the next fragment for part loading

        frag.start = totalduration;
        frag.sn = currentSN;
        frag.cc = discontinuityCounter;
        frag.level = id;

        if (currentInitSegment) {
          frag.initSegment = currentInitSegment;
          frag.rawProgramDateTime = currentInitSegment.rawProgramDateTime;
        }
      }

      var duration = result[1];

      if (duration) {
        // INF
        frag.duration = parseFloat(duration); // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939

        var title = (' ' + result[2]).slice(1);
        frag.title = title || null;
        frag.tagList.push(title ? ['INF', duration, title] : ['INF', duration]);
      } else if (result[3]) {
        // url
        if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(frag.duration)) {
          frag.start = totalduration;

          if (levelkey) {
            frag.levelkey = levelkey;
          }

          frag.sn = currentSN;
          frag.level = id;
          frag.cc = discontinuityCounter;
          frag.urlId = levelUrlId;
          fragments.push(frag); // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939

          frag.relurl = (' ' + result[3]).slice(1);
          assignProgramDateTime(frag, prevFrag);
          prevFrag = frag;
          totalduration += frag.duration;
          currentSN++;
          currentPart = 0;
          createNextFrag = true;
        }
      } else if (result[4]) {
        // X-BYTERANGE
        var data = (' ' + result[4]).slice(1);

        if (prevFrag) {
          frag.setByteRange(data, prevFrag);
        } else {
          frag.setByteRange(data);
        }
      } else if (result[5]) {
        // PROGRAM-DATE-TIME
        // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939
        frag.rawProgramDateTime = (' ' + result[5]).slice(1);
        frag.tagList.push(['PROGRAM-DATE-TIME', frag.rawProgramDateTime]);

        if (firstPdtIndex === -1) {
          firstPdtIndex = fragments.length;
        }
      } else {
        result = result[0].match(LEVEL_PLAYLIST_REGEX_SLOW);

        if (!result) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].warn('No matches on slow regex match for level playlist!');
          continue;
        }

        for (i = 1; i < result.length; i++) {
          if (typeof result[i] !== 'undefined') {
            break;
          }
        } // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939


        var tag = (' ' + result[i]).slice(1);
        var value1 = (' ' + result[i + 1]).slice(1);
        var value2 = result[i + 2] ? (' ' + result[i + 2]).slice(1) : '';

        switch (tag) {
          case 'PLAYLIST-TYPE':
            level.type = value1.toUpperCase();
            break;

          case 'MEDIA-SEQUENCE':
            currentSN = level.startSN = parseInt(value1);
            break;

          case 'SKIP':
            {
              var skipAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              var skippedSegments = skipAttrs.decimalInteger('SKIPPED-SEGMENTS');

              if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(skippedSegments)) {
                level.skippedSegments = skippedSegments; // This will result in fragments[] containing undefined values, which we will fill in with `mergeDetails`

                for (var _i = skippedSegments; _i--;) {
                  fragments.unshift(null);
                }

                currentSN += skippedSegments;
              }

              var recentlyRemovedDateranges = skipAttrs.enumeratedString('RECENTLY-REMOVED-DATERANGES');

              if (recentlyRemovedDateranges) {
                level.recentlyRemovedDateranges = recentlyRemovedDateranges.split('\t');
              }

              break;
            }

          case 'TARGETDURATION':
            level.targetduration = parseFloat(value1);
            break;

          case 'VERSION':
            level.version = parseInt(value1);
            break;

          case 'EXTM3U':
            break;

          case 'ENDLIST':
            level.live = false;
            break;

          case '#':
            if (value1 || value2) {
              frag.tagList.push(value2 ? [value1, value2] : [value1]);
            }

            break;

          case 'DIS':
            discontinuityCounter++;

          /* falls through */

          case 'GAP':
            frag.tagList.push([tag]);
            break;

          case 'BITRATE':
            frag.tagList.push([tag, value1]);
            break;

          case 'DISCONTINUITY-SEQ':
            discontinuityCounter = parseInt(value1);
            break;

          case 'KEY':
            {
              var _keyAttrs$enumeratedS;

              // https://tools.ietf.org/html/rfc8216#section-4.3.2.4
              var keyAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              var decryptmethod = keyAttrs.enumeratedString('METHOD');
              var decrypturi = keyAttrs.URI;
              var decryptiv = keyAttrs.hexadecimalInteger('IV');
              var decryptkeyformatversions = keyAttrs.enumeratedString('KEYFORMATVERSIONS');
              var decryptkeyid = keyAttrs.enumeratedString('KEYID'); // From RFC: This attribute is OPTIONAL; its absence indicates an implicit value of "identity".

              var decryptkeyformat = (_keyAttrs$enumeratedS = keyAttrs.enumeratedString('KEYFORMAT')) != null ? _keyAttrs$enumeratedS : 'identity';
              var unsupportedKnownKeyformatsInManifest = ['com.apple.streamingkeydelivery', 'com.microsoft.playready', 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed', // widevine (v2)
              'com.widevine' // earlier widevine (v1)
              ];

              if (unsupportedKnownKeyformatsInManifest.indexOf(decryptkeyformat) > -1) {
                _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].warn("Keyformat " + decryptkeyformat + " is not supported from the manifest");
                continue;
              } else if (decryptkeyformat !== 'identity') {
                // We are supposed to skip keys we don't understand.
                // As we currently only officially support identity keys
                // from the manifest we shouldn't save any other key.
                continue;
              } // TODO: multiple keys can be defined on a fragment, and we need to support this
              // for clients that support both playready and widevine


              if (decryptmethod) {
                // TODO: need to determine if the level key is actually a relative URL
                // if it isn't, then we should instead construct the LevelKey using fromURI.
                levelkey = _level_key__WEBPACK_IMPORTED_MODULE_4__["LevelKey"].fromURL(baseurl, decrypturi);

                if (decrypturi && ['AES-128', 'SAMPLE-AES', 'SAMPLE-AES-CENC'].indexOf(decryptmethod) >= 0) {
                  levelkey.method = decryptmethod;
                  levelkey.keyFormat = decryptkeyformat;

                  if (decryptkeyid) {
                    levelkey.keyID = decryptkeyid;
                  }

                  if (decryptkeyformatversions) {
                    levelkey.keyFormatVersions = decryptkeyformatversions;
                  } // Initialization Vector (IV)


                  levelkey.iv = decryptiv;
                }
              }

              break;
            }

          case 'START':
            {
              var startAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              var startTimeOffset = startAttrs.decimalFloatingPoint('TIME-OFFSET'); // TIME-OFFSET can be 0

              if (Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(startTimeOffset)) {
                level.startTimeOffset = startTimeOffset;
              }

              break;
            }

          case 'MAP':
            {
              var mapAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              frag.relurl = mapAttrs.URI;

              if (mapAttrs.BYTERANGE) {
                frag.setByteRange(mapAttrs.BYTERANGE);
              }

              frag.level = id;
              frag.sn = 'initSegment';

              if (levelkey) {
                frag.levelkey = levelkey;
              }

              frag.initSegment = null;
              currentInitSegment = frag;
              createNextFrag = true;
              break;
            }

          case 'SERVER-CONTROL':
            {
              var serverControlAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              level.canBlockReload = serverControlAttrs.bool('CAN-BLOCK-RELOAD');
              level.canSkipUntil = serverControlAttrs.optionalFloat('CAN-SKIP-UNTIL', 0);
              level.canSkipDateRanges = level.canSkipUntil > 0 && serverControlAttrs.bool('CAN-SKIP-DATERANGES');
              level.partHoldBack = serverControlAttrs.optionalFloat('PART-HOLD-BACK', 0);
              level.holdBack = serverControlAttrs.optionalFloat('HOLD-BACK', 0);
              break;
            }

          case 'PART-INF':
            {
              var partInfAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              level.partTarget = partInfAttrs.decimalFloatingPoint('PART-TARGET');
              break;
            }

          case 'PART':
            {
              var partList = level.partList;

              if (!partList) {
                partList = level.partList = [];
              }

              var previousFragmentPart = currentPart > 0 ? partList[partList.length - 1] : undefined;
              var index = currentPart++;
              var part = new _fragment__WEBPACK_IMPORTED_MODULE_2__["Part"](new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1), frag, baseurl, index, previousFragmentPart);
              partList.push(part);
              frag.duration += part.duration;
              break;
            }

          case 'PRELOAD-HINT':
            {
              var preloadHintAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              level.preloadHint = preloadHintAttrs;
              break;
            }

          case 'RENDITION-REPORT':
            {
              var renditionReportAttrs = new _utils_attr_list__WEBPACK_IMPORTED_MODULE_5__["AttrList"](value1);
              level.renditionReports = level.renditionReports || [];
              level.renditionReports.push(renditionReportAttrs);
              break;
            }

          default:
            _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].warn("line parsed but not handled: " + result);
            break;
        }
      }
    }

    if (prevFrag && !prevFrag.relurl) {
      fragments.pop();
      totalduration -= prevFrag.duration;

      if (level.partList) {
        level.fragmentHint = prevFrag;
      }
    } else if (level.partList) {
      assignProgramDateTime(frag, prevFrag);
      frag.cc = discontinuityCounter;
      level.fragmentHint = frag;
    }

    var fragmentLength = fragments.length;
    var firstFragment = fragments[0];
    var lastFragment = fragments[fragmentLength - 1];
    totalduration += level.skippedSegments * level.targetduration;

    if (totalduration > 0 && fragmentLength && lastFragment) {
      level.averagetargetduration = totalduration / fragmentLength;
      var lastSn = lastFragment.sn;
      level.endSN = lastSn !== 'initSegment' ? lastSn : 0;

      if (firstFragment) {
        level.startCC = firstFragment.cc;

        if (!firstFragment.initSegment) {
          // this is a bit lurky but HLS really has no other way to tell us
          // if the fragments are TS or MP4, except if we download them :/
          // but this is to be able to handle SIDX.
          if (level.fragments.every(function (frag) {
            return frag.relurl && isMP4Url(frag.relurl);
          })) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_6__["logger"].warn('MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX');
            frag = new _fragment__WEBPACK_IMPORTED_MODULE_2__["Fragment"](type, baseurl);
            frag.relurl = lastFragment.relurl;
            frag.level = id;
            frag.sn = 'initSegment';
            firstFragment.initSegment = frag;
            level.needSidxRanges = true;
          }
        }
      }
    } else {
      level.endSN = 0;
      level.startCC = 0;
    }

    if (level.fragmentHint) {
      totalduration += level.fragmentHint.duration;
    }

    level.totalduration = totalduration;
    level.endCC = discontinuityCounter;
    /**
     * Backfill any missing PDT values
     * "If the first EXT-X-PROGRAM-DATE-TIME tag in a Playlist appears after
     * one or more Media Segment URIs, the client SHOULD extrapolate
     * backward from that tag (using EXTINF durations and/or media
     * timestamps) to associate dates with those segments."
     * We have already extrapolated forward, but all fragments up to the first instance of PDT do not have their PDTs
     * computed.
     */

    if (firstPdtIndex > 0) {
      backfillProgramDateTimes(fragments, firstPdtIndex);
    }

    return level;
  };

  return M3U8Parser;
}();



function setCodecs(codecs, level) {
  ['video', 'audio', 'text'].forEach(function (type) {
    var filtered = codecs.filter(function (codec) {
      return Object(_utils_codecs__WEBPACK_IMPORTED_MODULE_7__["isCodecType"])(codec, type);
    });

    if (filtered.length) {
      var preferred = filtered.filter(function (codec) {
        return codec.lastIndexOf('avc1', 0) === 0 || codec.lastIndexOf('mp4a', 0) === 0;
      });
      level[type + "Codec"] = preferred.length > 0 ? preferred[0] : filtered[0]; // remove from list

      codecs = codecs.filter(function (codec) {
        return filtered.indexOf(codec) === -1;
      });
    }
  });
  level.unknownCodecs = codecs;
}

function assignCodec(media, groupItem, codecProperty) {
  var codecValue = groupItem[codecProperty];

  if (codecValue) {
    media[codecProperty] = codecValue;
  }
}

function backfillProgramDateTimes(fragments, firstPdtIndex) {
  var fragPrev = fragments[firstPdtIndex];

  for (var i = firstPdtIndex; i--;) {
    var frag = fragments[i]; // Exit on delta-playlist skipped segments

    if (!frag) {
      return;
    }

    frag.programDateTime = fragPrev.programDateTime - frag.duration * 1000;
    fragPrev = frag;
  }
}

function assignProgramDateTime(frag, prevFrag) {
  if (frag.rawProgramDateTime) {
    frag.programDateTime = Date.parse(frag.rawProgramDateTime);
  } else if (prevFrag !== null && prevFrag !== void 0 && prevFrag.programDateTime) {
    frag.programDateTime = prevFrag.endProgramDateTime;
  }

  if (!Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(frag.programDateTime)) {
    frag.programDateTime = null;
    frag.rawProgramDateTime = null;
  }
}

/***/ }),

/***/ "./src/loader/playlist-loader.ts":
/*!***************************************!*\
  !*** ./src/loader/playlist-loader.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _m3u8_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./m3u8-parser */ "./src/loader/m3u8-parser.ts");
/* harmony import */ var _types_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/loader */ "./src/types/loader.ts");
/* harmony import */ var _utils_attr_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/attr-list */ "./src/utils/attr-list.ts");



/**
 * PlaylistLoader - delegate for media manifest/playlist loading tasks. Takes care of parsing media to internal data-models.
 *
 * Once loaded, dispatches events with parsed data-models of manifest/levels/audio/subtitle tracks.
 *
 * Uses loader(s) set in config to do actual internal loading of resource tasks.
 *
 * @module
 *
 */








function mapContextToLevelType(context) {
  var type = context.type;

  switch (type) {
    case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].AUDIO_TRACK:
      return _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].AUDIO;

    case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].SUBTITLE_TRACK:
      return _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].SUBTITLE;

    default:
      return _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].MAIN;
  }
}

function getResponseUrl(response, context) {
  var url = response.url; // responseURL not supported on some browsers (it is used to detect URL redirection)
  // data-uri mode also not supported (but no need to detect redirection)

  if (url === undefined || url.indexOf('data:') === 0) {
    // fallback to initial URL
    url = context.url;
  }

  return url;
}

var PlaylistLoader = /*#__PURE__*/function () {
  function PlaylistLoader(hls) {
    this.hls = void 0;
    this.loaders = Object.create(null);
    this.hls = hls;
    this.registerListeners();
  }

  var _proto = PlaylistLoader.prototype;

  _proto.registerListeners = function registerListeners() {
    var hls = this.hls;
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADING, this.onManifestLoading, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_LOADING, this.onLevelLoading, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this);
    hls.on(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
  };

  _proto.unregisterListeners = function unregisterListeners() {
    var hls = this.hls;
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADING, this.onManifestLoading, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_LOADING, this.onLevelLoading, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this);
    hls.off(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
  }
  /**
   * Returns defaults or configured loader-type overloads (pLoader and loader config params)
   */
  ;

  _proto.createInternalLoader = function createInternalLoader(context) {
    var config = this.hls.config;
    var PLoader = config.pLoader;
    var Loader = config.loader;
    var InternalLoader = PLoader || Loader;
    var loader = new InternalLoader(config);
    context.loader = loader;
    this.loaders[context.type] = loader;
    return loader;
  };

  _proto.getInternalLoader = function getInternalLoader(context) {
    return this.loaders[context.type];
  };

  _proto.resetInternalLoader = function resetInternalLoader(contextType) {
    if (this.loaders[contextType]) {
      delete this.loaders[contextType];
    }
  }
  /**
   * Call `destroy` on all internal loader instances mapped (one per context type)
   */
  ;

  _proto.destroyInternalLoaders = function destroyInternalLoaders() {
    for (var contextType in this.loaders) {
      var loader = this.loaders[contextType];

      if (loader) {
        loader.destroy();
      }

      this.resetInternalLoader(contextType);
    }
  };

  _proto.destroy = function destroy() {
    this.unregisterListeners();
    this.destroyInternalLoaders();
  };

  _proto.onManifestLoading = function onManifestLoading(event, data) {
    var url = data.url;
    this.load({
      id: null,
      groupId: null,
      level: 0,
      responseType: 'text',
      type: _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].MANIFEST,
      url: url,
      deliveryDirectives: null
    });
  };

  _proto.onLevelLoading = function onLevelLoading(event, data) {
    var id = data.id,
        level = data.level,
        url = data.url,
        deliveryDirectives = data.deliveryDirectives;
    this.load({
      id: id,
      groupId: null,
      level: level,
      responseType: 'text',
      type: _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].LEVEL,
      url: url,
      deliveryDirectives: deliveryDirectives
    });
  };

  _proto.onAudioTrackLoading = function onAudioTrackLoading(event, data) {
    var id = data.id,
        groupId = data.groupId,
        url = data.url,
        deliveryDirectives = data.deliveryDirectives;
    this.load({
      id: id,
      groupId: groupId,
      level: null,
      responseType: 'text',
      type: _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].AUDIO_TRACK,
      url: url,
      deliveryDirectives: deliveryDirectives
    });
  };

  _proto.onSubtitleTrackLoading = function onSubtitleTrackLoading(event, data) {
    var id = data.id,
        groupId = data.groupId,
        url = data.url,
        deliveryDirectives = data.deliveryDirectives;
    this.load({
      id: id,
      groupId: groupId,
      level: null,
      responseType: 'text',
      type: _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].SUBTITLE_TRACK,
      url: url,
      deliveryDirectives: deliveryDirectives
    });
  };

  _proto.load = function load(context) {
    var _context$deliveryDire;

    var config = this.hls.config; // logger.debug(`[playlist-loader]: Loading playlist of type ${context.type}, level: ${context.level}, id: ${context.id}`);
    // Check if a loader for this context already exists

    var loader = this.getInternalLoader(context);

    if (loader) {
      var loaderContext = loader.context;

      if (loaderContext && loaderContext.url === context.url) {
        // same URL can't overlap
        _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].trace('[playlist-loader]: playlist request ongoing');
        return;
      }

      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].log("[playlist-loader]: aborting previous loader for type: " + context.type);
      loader.abort();
    }

    var maxRetry;
    var timeout;
    var retryDelay;
    var maxRetryDelay; // apply different configs for retries depending on
    // context (manifest, level, audio/subs playlist)

    switch (context.type) {
      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].MANIFEST:
        maxRetry = config.manifestLoadingMaxRetry;
        timeout = config.manifestLoadingTimeOut;
        retryDelay = config.manifestLoadingRetryDelay;
        maxRetryDelay = config.manifestLoadingMaxRetryTimeout;
        break;

      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].LEVEL:
      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].AUDIO_TRACK:
      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].SUBTITLE_TRACK:
        // Manage retries in Level/Track Controller
        maxRetry = 0;
        timeout = config.levelLoadingTimeOut;
        break;

      default:
        maxRetry = config.levelLoadingMaxRetry;
        timeout = config.levelLoadingTimeOut;
        retryDelay = config.levelLoadingRetryDelay;
        maxRetryDelay = config.levelLoadingMaxRetryTimeout;
        break;
    }

    loader = this.createInternalLoader(context); // Override level/track timeout for LL-HLS requests
    // (the default of 10000ms is counter productive to blocking playlist reload requests)

    if ((_context$deliveryDire = context.deliveryDirectives) !== null && _context$deliveryDire !== void 0 && _context$deliveryDire.part) {
      var levelDetails;

      if (context.type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].LEVEL && context.level !== null) {
        levelDetails = this.hls.levels[context.level].details;
      } else if (context.type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].AUDIO_TRACK && context.id !== null) {
        levelDetails = this.hls.audioTracks[context.id].details;
      } else if (context.type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].SUBTITLE_TRACK && context.id !== null) {
        levelDetails = this.hls.subtitleTracks[context.id].details;
      }

      if (levelDetails) {
        var partTarget = levelDetails.partTarget;
        var targetDuration = levelDetails.targetduration;

        if (partTarget && targetDuration) {
          timeout = Math.min(Math.max(partTarget * 3, targetDuration * 0.8) * 1000, timeout);
        }
      }
    }

    var loaderConfig = {
      timeout: timeout,
      maxRetry: maxRetry,
      retryDelay: retryDelay,
      maxRetryDelay: maxRetryDelay,
      highWaterMark: 0
    };
    var loaderCallbacks = {
      onSuccess: this.loadsuccess.bind(this),
      onError: this.loaderror.bind(this),
      onTimeout: this.loadtimeout.bind(this)
    }; // logger.debug(`[playlist-loader]: Calling internal loader delegate for URL: ${context.url}`);

    loader.load(context, loaderConfig, loaderCallbacks);
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    if (context.isSidxRequest) {
      this.handleSidxRequest(response, context);
      this.handlePlaylistLoaded(response, stats, context, networkDetails);
      return;
    }

    this.resetInternalLoader(context.type);
    var string = response.data; // Validate if it is an M3U8 at all

    if (string.indexOf('#EXTM3U') !== 0) {
      this.handleManifestParsingError(response, context, 'no EXTM3U delimiter', networkDetails);
      return;
    }

    stats.parsing.start = performance.now(); // Check if chunk-list or master. handle empty chunk list case (first EXTINF not signaled, but TARGETDURATION present)

    if (string.indexOf('#EXTINF:') > 0 || string.indexOf('#EXT-X-TARGETDURATION:') > 0) {
      this.handleTrackOrLevelPlaylist(response, stats, context, networkDetails);
    } else {
      this.handleMasterPlaylist(response, stats, context, networkDetails);
    }
  };

  _proto.loaderror = function loaderror(response, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    this.handleNetworkError(context, networkDetails, false, response);
  };

  _proto.loadtimeout = function loadtimeout(stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    this.handleNetworkError(context, networkDetails, true);
  };

  _proto.handleMasterPlaylist = function handleMasterPlaylist(response, stats, context, networkDetails) {
    var hls = this.hls;
    var string = response.data;
    var url = getResponseUrl(response, context);

    var _M3U8Parser$parseMast = _m3u8_parser__WEBPACK_IMPORTED_MODULE_5__["default"].parseMasterPlaylist(string, url),
        levels = _M3U8Parser$parseMast.levels,
        sessionData = _M3U8Parser$parseMast.sessionData;

    if (!levels.length) {
      this.handleManifestParsingError(response, context, 'no level found in manifest', networkDetails);
      return;
    } // multi level playlist, parse level info


    var audioGroups = levels.map(function (level) {
      return {
        id: level.attrs.AUDIO,
        audioCodec: level.audioCodec
      };
    });
    var subtitleGroups = levels.map(function (level) {
      return {
        id: level.attrs.SUBTITLES,
        textCodec: level.textCodec
      };
    });
    var audioTracks = _m3u8_parser__WEBPACK_IMPORTED_MODULE_5__["default"].parseMasterPlaylistMedia(string, url, 'AUDIO', audioGroups);
    var subtitles = _m3u8_parser__WEBPACK_IMPORTED_MODULE_5__["default"].parseMasterPlaylistMedia(string, url, 'SUBTITLES', subtitleGroups);
    var captions = _m3u8_parser__WEBPACK_IMPORTED_MODULE_5__["default"].parseMasterPlaylistMedia(string, url, 'CLOSED-CAPTIONS');

    if (audioTracks.length) {
      // check if we have found an audio track embedded in main playlist (audio track without URI attribute)
      var embeddedAudioFound = audioTracks.some(function (audioTrack) {
        return !audioTrack.url;
      }); // if no embedded audio track defined, but audio codec signaled in quality level,
      // we need to signal this main audio track this could happen with playlists with
      // alt audio rendition in which quality levels (main)
      // contains both audio+video. but with mixed audio track not signaled

      if (!embeddedAudioFound && levels[0].audioCodec && !levels[0].attrs.AUDIO) {
        _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].log('[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one');
        audioTracks.unshift({
          type: 'main',
          name: 'main',
          default: false,
          autoselect: false,
          forced: false,
          id: -1,
          attrs: new _utils_attr_list__WEBPACK_IMPORTED_MODULE_7__["AttrList"]({}),
          bitrate: 0,
          url: ''
        });
      }
    }

    hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADED, {
      levels: levels,
      audioTracks: audioTracks,
      subtitles: subtitles,
      captions: captions,
      url: url,
      stats: stats,
      networkDetails: networkDetails,
      sessionData: sessionData
    });
  };

  _proto.handleTrackOrLevelPlaylist = function handleTrackOrLevelPlaylist(response, stats, context, networkDetails) {
    var hls = this.hls;
    var id = context.id,
        level = context.level,
        type = context.type;
    var url = getResponseUrl(response, context);
    var levelUrlId = Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(id) ? id : 0;
    var levelId = Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(level) ? level : levelUrlId;
    var levelType = mapContextToLevelType(context);
    var levelDetails = _m3u8_parser__WEBPACK_IMPORTED_MODULE_5__["default"].parseLevelPlaylist(response.data, url, levelId, levelType, levelUrlId);

    if (!levelDetails.fragments.length) {
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
        type: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorTypes"].NETWORK_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].LEVEL_EMPTY_ERROR,
        fatal: false,
        url: url,
        reason: 'no fragments found in level',
        level: typeof context.level === 'number' ? context.level : undefined
      });
      return;
    } // We have done our first request (Manifest-type) and receive
    // not a master playlist but a chunk-list (track/level)
    // We fire the manifest-loaded event anyway with the parsed level-details
    // by creating a single-level structure for it.


    if (type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].MANIFEST) {
      var singleLevel = {
        attrs: new _utils_attr_list__WEBPACK_IMPORTED_MODULE_7__["AttrList"]({}),
        bitrate: 0,
        details: levelDetails,
        name: '',
        url: url
      };
      hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].MANIFEST_LOADED, {
        levels: [singleLevel],
        audioTracks: [],
        url: url,
        stats: stats,
        networkDetails: networkDetails,
        sessionData: null
      });
    } // save parsing time


    stats.parsing.end = performance.now(); // in case we need SIDX ranges
    // return early after calling load for
    // the SIDX box.

    if (levelDetails.needSidxRanges) {
      var _levelDetails$fragmen;

      var sidxUrl = (_levelDetails$fragmen = levelDetails.fragments[0].initSegment) === null || _levelDetails$fragmen === void 0 ? void 0 : _levelDetails$fragmen.url;
      this.load({
        url: sidxUrl,
        isSidxRequest: true,
        type: type,
        level: level,
        levelDetails: levelDetails,
        id: id,
        groupId: null,
        rangeStart: 0,
        rangeEnd: 2048,
        responseType: 'arraybuffer',
        deliveryDirectives: null
      });
      return;
    } // extend the context with the new levelDetails property


    context.levelDetails = levelDetails;
    this.handlePlaylistLoaded(response, stats, context, networkDetails);
  };

  _proto.handleSidxRequest = function handleSidxRequest(response, context) {
    var sidxInfo = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_4__["parseSegmentIndex"])(new Uint8Array(response.data)); // if provided fragment does not contain sidx, early return

    if (!sidxInfo) {
      return;
    }

    var sidxReferences = sidxInfo.references;
    var levelDetails = context.levelDetails;
    sidxReferences.forEach(function (segmentRef, index) {
      var segRefInfo = segmentRef.info;
      var frag = levelDetails.fragments[index];

      if (frag.byteRange.length === 0) {
        frag.setByteRange(String(1 + segRefInfo.end - segRefInfo.start) + '@' + String(segRefInfo.start));
      }

      if (frag.initSegment) {
        frag.initSegment.setByteRange(String(sidxInfo.moovEndOffset) + '@0');
      }
    });
  };

  _proto.handleManifestParsingError = function handleManifestParsingError(response, context, reason, networkDetails) {
    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, {
      type: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorTypes"].NETWORK_ERROR,
      details: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].MANIFEST_PARSING_ERROR,
      fatal: context.type === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].MANIFEST,
      url: response.url,
      reason: reason,
      response: response,
      context: context,
      networkDetails: networkDetails
    });
  };

  _proto.handleNetworkError = function handleNetworkError(context, networkDetails, timeout, response) {
    if (timeout === void 0) {
      timeout = false;
    }

    _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn("[playlist-loader]: A network " + (timeout ? 'timeout' : 'error') + " occurred while loading " + context.type + " level: " + context.level + " id: " + context.id + " group-id: \"" + context.groupId + "\"");
    var details = _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].UNKNOWN;
    var fatal = false;
    var loader = this.getInternalLoader(context);

    switch (context.type) {
      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].MANIFEST:
        details = timeout ? _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].MANIFEST_LOAD_TIMEOUT : _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].MANIFEST_LOAD_ERROR;
        fatal = true;
        break;

      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].LEVEL:
        details = timeout ? _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].LEVEL_LOAD_TIMEOUT : _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].LEVEL_LOAD_ERROR;
        fatal = false;
        break;

      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].AUDIO_TRACK:
        details = timeout ? _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].AUDIO_TRACK_LOAD_TIMEOUT : _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].AUDIO_TRACK_LOAD_ERROR;
        fatal = false;
        break;

      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].SUBTITLE_TRACK:
        details = timeout ? _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].SUBTITLE_TRACK_LOAD_TIMEOUT : _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorDetails"].SUBTITLE_LOAD_ERROR;
        fatal = false;
        break;
    }

    if (loader) {
      this.resetInternalLoader(context.type);
    }

    var errorData = {
      type: _errors__WEBPACK_IMPORTED_MODULE_2__["ErrorTypes"].NETWORK_ERROR,
      details: details,
      fatal: fatal,
      url: context.url,
      loader: loader,
      context: context,
      networkDetails: networkDetails
    };

    if (response) {
      errorData.response = response;
    }

    this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].ERROR, errorData);
  };

  _proto.handlePlaylistLoaded = function handlePlaylistLoaded(response, stats, context, networkDetails) {
    var type = context.type,
        level = context.level,
        id = context.id,
        groupId = context.groupId,
        loader = context.loader,
        levelDetails = context.levelDetails,
        deliveryDirectives = context.deliveryDirectives;

    if (!(levelDetails !== null && levelDetails !== void 0 && levelDetails.targetduration)) {
      this.handleManifestParsingError(response, context, 'invalid target duration', networkDetails);
      return;
    }

    if (!loader) {
      return;
    }

    if (levelDetails.live) {
      if (loader.getCacheAge) {
        levelDetails.ageHeader = loader.getCacheAge() || 0;
      }

      if (!loader.getCacheAge || isNaN(levelDetails.ageHeader)) {
        levelDetails.ageHeader = 0;
      }
    }

    switch (type) {
      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].MANIFEST:
      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].LEVEL:
        this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].LEVEL_LOADED, {
          details: levelDetails,
          level: level || 0,
          id: id || 0,
          stats: stats,
          networkDetails: networkDetails,
          deliveryDirectives: deliveryDirectives
        });
        break;

      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].AUDIO_TRACK:
        this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].AUDIO_TRACK_LOADED, {
          details: levelDetails,
          id: id || 0,
          groupId: groupId || '',
          stats: stats,
          networkDetails: networkDetails,
          deliveryDirectives: deliveryDirectives
        });
        break;

      case _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistContextType"].SUBTITLE_TRACK:
        this.hls.trigger(_events__WEBPACK_IMPORTED_MODULE_1__["Events"].SUBTITLE_TRACK_LOADED, {
          details: levelDetails,
          id: id || 0,
          groupId: groupId || '',
          stats: stats,
          networkDetails: networkDetails,
          deliveryDirectives: deliveryDirectives
        });
        break;
    }
  };

  return PlaylistLoader;
}();

/* harmony default export */ __webpack_exports__["default"] = (PlaylistLoader);

/***/ }),

/***/ "./src/polyfills/number.ts":
/*!*********************************!*\
  !*** ./src/polyfills/number.ts ***!
  \*********************************/
/*! exports provided: isFiniteNumber, MAX_SAFE_INTEGER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFiniteNumber", function() { return isFiniteNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_SAFE_INTEGER", function() { return MAX_SAFE_INTEGER; });
var isFiniteNumber = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
};
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

/***/ }),

/***/ "./src/remux/aac-helper.ts":
/*!*********************************!*\
  !*** ./src/remux/aac-helper.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 *  AAC helper
 */
var AAC = /*#__PURE__*/function () {
  function AAC() {}

  AAC.getSilentFrame = function getSilentFrame(codec, channelCount) {
    switch (codec) {
      case 'mp4a.40.2':
        if (channelCount === 1) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
        } else if (channelCount === 2) {
          return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
        } else if (channelCount === 3) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
        } else if (channelCount === 4) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
        } else if (channelCount === 5) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
        } else if (channelCount === 6) {
          return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
        }

        break;
      // handle HE-AAC below (mp4a.40.5 / mp4a.40.29)

      default:
        if (channelCount === 1) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 2) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 3) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        }

        break;
    }

    return undefined;
  };

  return AAC;
}();

/* harmony default export */ __webpack_exports__["default"] = (AAC);

/***/ }),

/***/ "./src/remux/mp4-generator.ts":
/*!************************************!*\
  !*** ./src/remux/mp4-generator.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Generate MP4 Box
 */
var UINT32_MAX = Math.pow(2, 32) - 1;

var MP4 = /*#__PURE__*/function () {
  function MP4() {}

  MP4.init = function init() {
    MP4.types = {
      avc1: [],
      // codingname
      avcC: [],
      btrt: [],
      dinf: [],
      dref: [],
      esds: [],
      ftyp: [],
      hdlr: [],
      mdat: [],
      mdhd: [],
      mdia: [],
      mfhd: [],
      minf: [],
      moof: [],
      moov: [],
      mp4a: [],
      '.mp3': [],
      mvex: [],
      mvhd: [],
      pasp: [],
      sdtp: [],
      stbl: [],
      stco: [],
      stsc: [],
      stsd: [],
      stsz: [],
      stts: [],
      tfdt: [],
      tfhd: [],
      traf: [],
      trak: [],
      trun: [],
      trex: [],
      tkhd: [],
      vmhd: [],
      smhd: []
    };
    var i;

    for (i in MP4.types) {
      if (MP4.types.hasOwnProperty(i)) {
        MP4.types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
      }
    }

    var videoHdlr = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ]);
    var audioHdlr = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
    ]);
    MP4.HDLR_TYPES = {
      video: videoHdlr,
      audio: audioHdlr
    };
    var dref = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01, // entry_count
    0x00, 0x00, 0x00, 0x0c, // entry_size
    0x75, 0x72, 0x6c, 0x20, // 'url' type
    0x00, // version 0
    0x00, 0x00, 0x01 // entry_flags
    ]);
    var stco = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
    ]);
    MP4.STTS = MP4.STSC = MP4.STCO = stco;
    MP4.STSZ = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // sample_size
    0x00, 0x00, 0x00, 0x00 // sample_count
    ]);
    MP4.VMHD = new Uint8Array([0x00, // version
    0x00, 0x00, 0x01, // flags
    0x00, 0x00, // graphicsmode
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
    ]);
    MP4.SMHD = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, // balance
    0x00, 0x00 // reserved
    ]);
    MP4.STSD = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01]); // entry_count

    var majorBrand = new Uint8Array([105, 115, 111, 109]); // isom

    var avc1Brand = new Uint8Array([97, 118, 99, 49]); // avc1

    var minorVersion = new Uint8Array([0, 0, 0, 1]);
    MP4.FTYP = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
    MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
  };

  MP4.box = function box(type) {
    var size = 8;

    for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      payload[_key - 1] = arguments[_key];
    }

    var i = payload.length;
    var len = i; // calculate the total size we need to allocate

    while (i--) {
      size += payload[i].byteLength;
    }

    var result = new Uint8Array(size);
    result[0] = size >> 24 & 0xff;
    result[1] = size >> 16 & 0xff;
    result[2] = size >> 8 & 0xff;
    result[3] = size & 0xff;
    result.set(type, 4); // copy the payload into the result

    for (i = 0, size = 8; i < len; i++) {
      // copy payload[i] array @ offset size
      result.set(payload[i], size);
      size += payload[i].byteLength;
    }

    return result;
  };

  MP4.hdlr = function hdlr(type) {
    return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
  };

  MP4.mdat = function mdat(data) {
    return MP4.box(MP4.types.mdat, data);
  };

  MP4.mdhd = function mdhd(timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    return MP4.box(MP4.types.mdhd, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    timescale >> 24 & 0xff, timescale >> 16 & 0xff, timescale >> 8 & 0xff, timescale & 0xff, // timescale
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x55, 0xc4, // 'und' language (undetermined)
    0x00, 0x00]));
  };

  MP4.mdia = function mdia(track) {
    return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
  };

  MP4.mfhd = function mfhd(sequenceNumber) {
    return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
    sequenceNumber >> 24, sequenceNumber >> 16 & 0xff, sequenceNumber >> 8 & 0xff, sequenceNumber & 0xff // sequence_number
    ]));
  };

  MP4.minf = function minf(track) {
    if (track.type === 'audio') {
      return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
    } else {
      return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
    }
  };

  MP4.moof = function moof(sn, baseMediaDecodeTime, track) {
    return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
  }
  /**
   * @param tracks... (optional) {array} the tracks associated with this movie
   */
  ;

  MP4.moov = function moov(tracks) {
    var i = tracks.length;
    var boxes = [];

    while (i--) {
      boxes[i] = MP4.trak(tracks[i]);
    }

    return MP4.box.apply(null, [MP4.types.moov, MP4.mvhd(tracks[0].timescale, tracks[0].duration)].concat(boxes).concat(MP4.mvex(tracks)));
  };

  MP4.mvex = function mvex(tracks) {
    var i = tracks.length;
    var boxes = [];

    while (i--) {
      boxes[i] = MP4.trex(tracks[i]);
    }

    return MP4.box.apply(null, [MP4.types.mvex].concat(boxes));
  };

  MP4.mvhd = function mvhd(timescale, duration) {
    duration *= timescale;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    var bytes = new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    timescale >> 24 & 0xff, timescale >> 16 & 0xff, timescale >> 8 & 0xff, timescale & 0xff, // timescale
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x01, 0x00, 0x00, // 1.0 rate
    0x01, 0x00, // 1.0 volume
    0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
    0xff, 0xff, 0xff, 0xff // next_track_ID
    ]);
    return MP4.box(MP4.types.mvhd, bytes);
  };

  MP4.sdtp = function sdtp(track) {
    var samples = track.samples || [];
    var bytes = new Uint8Array(4 + samples.length);
    var i;
    var flags; // leave the full box header (4 bytes) all zero
    // write the sample table

    for (i = 0; i < samples.length; i++) {
      flags = samples[i].flags;
      bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
    }

    return MP4.box(MP4.types.sdtp, bytes);
  };

  MP4.stbl = function stbl(track) {
    return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
  };

  MP4.avc1 = function avc1(track) {
    var sps = [];
    var pps = [];
    var i;
    var data;
    var len; // assemble the SPSs

    for (i = 0; i < track.sps.length; i++) {
      data = track.sps[i];
      len = data.byteLength;
      sps.push(len >>> 8 & 0xff);
      sps.push(len & 0xff); // SPS

      sps = sps.concat(Array.prototype.slice.call(data));
    } // assemble the PPSs


    for (i = 0; i < track.pps.length; i++) {
      data = track.pps[i];
      len = data.byteLength;
      pps.push(len >>> 8 & 0xff);
      pps.push(len & 0xff);
      pps = pps.concat(Array.prototype.slice.call(data));
    }

    var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01, // version
    sps[3], // profile
    sps[4], // profile compat
    sps[5], // level
    0xfc | 3, // lengthSizeMinusOne, hard-coded to 4 bytes
    0xe0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
    ].concat(sps).concat([track.pps.length // numOfPictureParameterSets
    ]).concat(pps))); // "PPS"

    var width = track.width;
    var height = track.height;
    var hSpacing = track.pixelRatio[0];
    var vSpacing = track.pixelRatio[1];
    return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, // pre_defined
    0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
    width >> 8 & 0xff, width & 0xff, // width
    height >> 8 & 0xff, height & 0xff, // height
    0x00, 0x48, 0x00, 0x00, // horizresolution
    0x00, 0x48, 0x00, 0x00, // vertresolution
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // frame_count
    0x12, 0x64, 0x61, 0x69, 0x6c, // dailymotion/hls.js
    0x79, 0x6d, 0x6f, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x68, 0x6c, 0x73, 0x2e, 0x6a, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
    0x00, 0x18, // depth = 24
    0x11, 0x11]), // pre_defined = -1
    avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
    0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
    0x00, 0x2d, 0xc6, 0xc0])), // avgBitrate
    MP4.box(MP4.types.pasp, new Uint8Array([hSpacing >> 24, // hSpacing
    hSpacing >> 16 & 0xff, hSpacing >> 8 & 0xff, hSpacing & 0xff, vSpacing >> 24, // vSpacing
    vSpacing >> 16 & 0xff, vSpacing >> 8 & 0xff, vSpacing & 0xff])));
  };

  MP4.esds = function esds(track) {
    var configlen = track.config.length;
    return new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x03, // descriptor_type
    0x17 + configlen, // length
    0x00, 0x01, // es_id
    0x00, // stream_priority
    0x04, // descriptor_type
    0x0f + configlen, // length
    0x40, // codec : mpeg4_audio
    0x15, // stream_type
    0x00, 0x00, 0x00, // buffer_size
    0x00, 0x00, 0x00, 0x00, // maxBitrate
    0x00, 0x00, 0x00, 0x00, // avgBitrate
    0x05 // descriptor_type
    ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
  };

  MP4.mp4a = function mp4a(track) {
    var samplerate = track.samplerate;
    return MP4.box(MP4.types.mp4a, new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, track.channelCount, // channelcount
    0x00, 0x10, // sampleSize:16bits
    0x00, 0x00, 0x00, 0x00, // reserved2
    samplerate >> 8 & 0xff, samplerate & 0xff, //
    0x00, 0x00]), MP4.box(MP4.types.esds, MP4.esds(track)));
  };

  MP4.mp3 = function mp3(track) {
    var samplerate = track.samplerate;
    return MP4.box(MP4.types['.mp3'], new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, track.channelCount, // channelcount
    0x00, 0x10, // sampleSize:16bits
    0x00, 0x00, 0x00, 0x00, // reserved2
    samplerate >> 8 & 0xff, samplerate & 0xff, //
    0x00, 0x00]));
  };

  MP4.stsd = function stsd(track) {
    if (track.type === 'audio') {
      if (!track.isAAC && track.codec === 'mp3') {
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp3(track));
      }

      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
    } else {
      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
    }
  };

  MP4.tkhd = function tkhd(track) {
    var id = track.id;
    var duration = track.duration * track.timescale;
    var width = track.width;
    var height = track.height;
    var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
    var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
    return MP4.box(MP4.types.tkhd, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x07, // flags
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
    id >> 24 & 0xff, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
    0x00, 0x00, 0x00, 0x00, // reserved
    upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, // layer
    0x00, 0x00, // alternate_group
    0x00, 0x00, // non-audio track volume
    0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    width >> 8 & 0xff, width & 0xff, 0x00, 0x00, // width
    height >> 8 & 0xff, height & 0xff, 0x00, 0x00 // height
    ]));
  };

  MP4.traf = function traf(track, baseMediaDecodeTime) {
    var sampleDependencyTable = MP4.sdtp(track);
    var id = track.id;
    var upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1));
    var lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
    return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff // track_ID
    ])), MP4.box(MP4.types.tfdt, new Uint8Array([0x01, // version 1
    0x00, 0x00, 0x00, // flags
    upperWordBaseMediaDecodeTime >> 24, upperWordBaseMediaDecodeTime >> 16 & 0xff, upperWordBaseMediaDecodeTime >> 8 & 0xff, upperWordBaseMediaDecodeTime & 0xff, lowerWordBaseMediaDecodeTime >> 24, lowerWordBaseMediaDecodeTime >> 16 & 0xff, lowerWordBaseMediaDecodeTime >> 8 & 0xff, lowerWordBaseMediaDecodeTime & 0xff])), MP4.trun(track, sampleDependencyTable.length + 16 + // tfhd
    20 + // tfdt
    8 + // traf header
    16 + // mfhd
    8 + // moof header
    8), // mdat header
    sampleDependencyTable);
  }
  /**
   * Generate a track box.
   * @param track {object} a track definition
   * @return {Uint8Array} the track box
   */
  ;

  MP4.trak = function trak(track) {
    track.duration = track.duration || 0xffffffff;
    return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
  };

  MP4.trex = function trex(track) {
    var id = track.id;
    return MP4.box(MP4.types.trex, new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
    0x00, 0x00, 0x00, 0x01, // default_sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ]));
  };

  MP4.trun = function trun(track, offset) {
    var samples = track.samples || [];
    var len = samples.length;
    var arraylen = 12 + 16 * len;
    var array = new Uint8Array(arraylen);
    var i;
    var sample;
    var duration;
    var size;
    var flags;
    var cts;
    offset += 8 + arraylen;
    array.set([0x00, // version 0
    0x00, 0x0f, 0x01, // flags
    len >>> 24 & 0xff, len >>> 16 & 0xff, len >>> 8 & 0xff, len & 0xff, // sample_count
    offset >>> 24 & 0xff, offset >>> 16 & 0xff, offset >>> 8 & 0xff, offset & 0xff // data_offset
    ], 0);

    for (i = 0; i < len; i++) {
      sample = samples[i];
      duration = sample.duration;
      size = sample.size;
      flags = sample.flags;
      cts = sample.cts;
      array.set([duration >>> 24 & 0xff, duration >>> 16 & 0xff, duration >>> 8 & 0xff, duration & 0xff, // sample_duration
      size >>> 24 & 0xff, size >>> 16 & 0xff, size >>> 8 & 0xff, size & 0xff, // sample_size
      flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.paddingValue << 1 | flags.isNonSync, flags.degradPrio & 0xf0 << 8, flags.degradPrio & 0x0f, // sample_flags
      cts >>> 24 & 0xff, cts >>> 16 & 0xff, cts >>> 8 & 0xff, cts & 0xff // sample_composition_time_offset
      ], 12 + 16 * i);
    }

    return MP4.box(MP4.types.trun, array);
  };

  MP4.initSegment = function initSegment(tracks) {
    if (!MP4.types) {
      MP4.init();
    }

    var movie = MP4.moov(tracks);
    var result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength);
    result.set(MP4.FTYP);
    result.set(movie, MP4.FTYP.byteLength);
    return result;
  };

  return MP4;
}();

MP4.types = void 0;
MP4.HDLR_TYPES = void 0;
MP4.STTS = void 0;
MP4.STSC = void 0;
MP4.STCO = void 0;
MP4.STSZ = void 0;
MP4.VMHD = void 0;
MP4.SMHD = void 0;
MP4.STSD = void 0;
MP4.FTYP = void 0;
MP4.DINF = void 0;
/* harmony default export */ __webpack_exports__["default"] = (MP4);

/***/ }),

/***/ "./src/remux/mp4-remuxer.ts":
/*!**********************************!*\
  !*** ./src/remux/mp4-remuxer.ts ***!
  \**********************************/
/*! exports provided: default, normalizePts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MP4Remuxer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizePts", function() { return normalizePts; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _aac_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aac-helper */ "./src/remux/aac-helper.ts");
/* harmony import */ var _mp4_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mp4-generator */ "./src/remux/mp4-generator.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events */ "./src/events.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors */ "./src/errors.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _types_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types/loader */ "./src/types/loader.ts");
/* harmony import */ var _utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/timescale-conversion */ "./src/utils/timescale-conversion.ts");


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








var MAX_SILENT_FRAME_DURATION = 10 * 1000; // 10 seconds

var AAC_SAMPLES_PER_FRAME = 1024;
var MPEG_AUDIO_SAMPLE_PER_FRAME = 1152;
var chromeVersion = null;
var safariWebkitVersion = null;
var requiresPositiveDts = false;

var MP4Remuxer = /*#__PURE__*/function () {
  function MP4Remuxer(observer, config, typeSupported, vendor) {
    if (vendor === void 0) {
      vendor = '';
    }

    this.observer = void 0;
    this.config = void 0;
    this.typeSupported = void 0;
    this.ISGenerated = false;
    this._initPTS = void 0;
    this._initDTS = void 0;
    this.nextAvcDts = null;
    this.nextAudioPts = null;
    this.isAudioContiguous = false;
    this.isVideoContiguous = false;
    this.observer = observer;
    this.config = config;
    this.typeSupported = typeSupported;
    this.ISGenerated = false;

    if (chromeVersion === null) {
      var userAgent = navigator.userAgent || '';
      var result = userAgent.match(/Chrome\/(\d+)/i);
      chromeVersion = result ? parseInt(result[1]) : 0;
    }

    if (safariWebkitVersion === null) {
      var _result = navigator.userAgent.match(/Safari\/(\d+)/i);

      safariWebkitVersion = _result ? parseInt(_result[1]) : 0;
    }

    requiresPositiveDts = !!chromeVersion && chromeVersion < 75 || !!safariWebkitVersion && safariWebkitVersion < 600;
  }

  var _proto = MP4Remuxer.prototype;

  _proto.destroy = function destroy() {};

  _proto.resetTimeStamp = function resetTimeStamp(defaultTimeStamp) {
    _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].log('[mp4-remuxer]: initPTS & initDTS reset');
    this._initPTS = this._initDTS = defaultTimeStamp;
  };

  _proto.resetNextTimestamp = function resetNextTimestamp() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].log('[mp4-remuxer]: reset next timestamp');
    this.isVideoContiguous = false;
    this.isAudioContiguous = false;
  };

  _proto.resetInitSegment = function resetInitSegment() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].log('[mp4-remuxer]: ISGenerated flag reset');
    this.ISGenerated = false;
  };

  _proto.getVideoStartPts = function getVideoStartPts(videoSamples) {
    var rolloverDetected = false;
    var startPTS = videoSamples.reduce(function (minPTS, sample) {
      var delta = sample.pts - minPTS;

      if (delta < -4294967296) {
        // 2^32, see PTSNormalize for reasoning, but we're hitting a rollover here, and we don't want that to impact the timeOffset calculation
        rolloverDetected = true;
        return normalizePts(minPTS, sample.pts);
      } else if (delta > 0) {
        return minPTS;
      } else {
        return sample.pts;
      }
    }, videoSamples[0].pts);

    if (rolloverDetected) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].debug('PTS rollover detected');
    }

    return startPTS;
  };

  _proto.remux = function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, accurateTimeOffset, flush, playlistType) {
    var video;
    var audio;
    var initSegment;
    var text;
    var id3;
    var independent;
    var audioTimeOffset = timeOffset;
    var videoTimeOffset = timeOffset; // If we're remuxing audio and video progressively, wait until we've received enough samples for each track before proceeding.
    // This is done to synchronize the audio and video streams. We know if the current segment will have samples if the "pid"
    // parameter is greater than -1. The pid is set when the PMT is parsed, which contains the tracks list.
    // However, if the initSegment has already been generated, or we've reached the end of a segment (flush),
    // then we can remux one track without waiting for the other.

    var hasAudio = audioTrack.pid > -1;
    var hasVideo = videoTrack.pid > -1;
    var length = videoTrack.samples.length;
    var enoughAudioSamples = audioTrack.samples.length > 0;
    var enoughVideoSamples = length > 1;
    var canRemuxAvc = (!hasAudio || enoughAudioSamples) && (!hasVideo || enoughVideoSamples) || this.ISGenerated || flush;

    if (canRemuxAvc) {
      if (!this.ISGenerated) {
        initSegment = this.generateIS(audioTrack, videoTrack, timeOffset);
      }

      var isVideoContiguous = this.isVideoContiguous;
      var firstKeyFrameIndex = -1;

      if (enoughVideoSamples) {
        firstKeyFrameIndex = findKeyframeIndex(videoTrack.samples);

        if (!isVideoContiguous && this.config.forceKeyFrameOnDiscontinuity) {
          independent = true;

          if (firstKeyFrameIndex > 0) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("[mp4-remuxer]: Dropped " + firstKeyFrameIndex + " out of " + length + " video samples due to a missing keyframe");
            var startPTS = this.getVideoStartPts(videoTrack.samples);
            videoTrack.samples = videoTrack.samples.slice(firstKeyFrameIndex);
            videoTrack.dropped += firstKeyFrameIndex;
            videoTimeOffset += (videoTrack.samples[0].pts - startPTS) / (videoTrack.timescale || 90000);
          } else if (firstKeyFrameIndex === -1) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("[mp4-remuxer]: No keyframe found out of " + length + " video samples");
            independent = false;
          }
        }
      }

      if (this.ISGenerated) {
        if (enoughAudioSamples && enoughVideoSamples) {
          // timeOffset is expected to be the offset of the first timestamp of this fragment (first DTS)
          // if first audio DTS is not aligned with first video DTS then we need to take that into account
          // when providing timeOffset to remuxAudio / remuxVideo. if we don't do that, there might be a permanent / small
          // drift between audio and video streams
          var _startPTS = this.getVideoStartPts(videoTrack.samples);

          var tsDelta = normalizePts(audioTrack.samples[0].pts, _startPTS) - _startPTS;

          var audiovideoTimestampDelta = tsDelta / videoTrack.inputTimeScale;
          audioTimeOffset += Math.max(0, audiovideoTimestampDelta);
          videoTimeOffset += Math.max(0, -audiovideoTimestampDelta);
        } // Purposefully remuxing audio before video, so that remuxVideo can use nextAudioPts, which is calculated in remuxAudio.


        if (enoughAudioSamples) {
          // if initSegment was generated without audio samples, regenerate it again
          if (!audioTrack.samplerate) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn('[mp4-remuxer]: regenerate InitSegment as audio detected');
            initSegment = this.generateIS(audioTrack, videoTrack, timeOffset);
          }

          audio = this.remuxAudio(audioTrack, audioTimeOffset, this.isAudioContiguous, accurateTimeOffset, hasVideo || enoughVideoSamples || playlistType === _types_loader__WEBPACK_IMPORTED_MODULE_6__["PlaylistLevelType"].AUDIO ? videoTimeOffset : undefined);

          if (enoughVideoSamples) {
            var audioTrackLength = audio ? audio.endPTS - audio.startPTS : 0; // if initSegment was generated without video samples, regenerate it again

            if (!videoTrack.inputTimeScale) {
              _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn('[mp4-remuxer]: regenerate InitSegment as video detected');
              initSegment = this.generateIS(audioTrack, videoTrack, timeOffset);
            }

            video = this.remuxVideo(videoTrack, videoTimeOffset, isVideoContiguous, audioTrackLength);
          }
        } else if (enoughVideoSamples) {
          video = this.remuxVideo(videoTrack, videoTimeOffset, isVideoContiguous, 0);
        }

        if (video) {
          video.firstKeyFrame = firstKeyFrameIndex;
          video.independent = firstKeyFrameIndex !== -1;
        }
      }
    } // Allow ID3 and text to remux, even if more audio/video samples are required


    if (this.ISGenerated) {
      if (id3Track.samples.length) {
        id3 = this.remuxID3(id3Track, timeOffset);
      }

      if (textTrack.samples.length) {
        text = this.remuxText(textTrack, timeOffset);
      }
    }

    return {
      audio: audio,
      video: video,
      initSegment: initSegment,
      independent: independent,
      text: text,
      id3: id3
    };
  };

  _proto.generateIS = function generateIS(audioTrack, videoTrack, timeOffset) {
    var audioSamples = audioTrack.samples;
    var videoSamples = videoTrack.samples;
    var typeSupported = this.typeSupported;
    var tracks = {};
    var computePTSDTS = !Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(this._initPTS);
    var container = 'audio/mp4';
    var initPTS;
    var initDTS;
    var timescale;

    if (computePTSDTS) {
      initPTS = initDTS = Infinity;
    }

    if (audioTrack.config && audioSamples.length) {
      // let's use audio sampling rate as MP4 time scale.
      // rationale is that there is a integer nb of audio frames per audio sample (1024 for AAC)
      // using audio sampling rate here helps having an integer MP4 frame duration
      // this avoids potential rounding issue and AV sync issue
      audioTrack.timescale = audioTrack.samplerate;

      if (!audioTrack.isAAC) {
        if (typeSupported.mpeg) {
          // Chrome and Safari
          container = 'audio/mpeg';
          audioTrack.codec = '';
        } else if (typeSupported.mp3) {
          // Firefox
          audioTrack.codec = 'mp3';
        }
      }

      tracks.audio = {
        id: 'audio',
        container: container,
        codec: audioTrack.codec,
        initSegment: !audioTrack.isAAC && typeSupported.mpeg ? new Uint8Array(0) : _mp4_generator__WEBPACK_IMPORTED_MODULE_2__["default"].initSegment([audioTrack]),
        metadata: {
          channelCount: audioTrack.channelCount
        }
      };

      if (computePTSDTS) {
        timescale = audioTrack.inputTimeScale; // remember first PTS of this demuxing context. for audio, PTS = DTS

        initPTS = initDTS = audioSamples[0].pts - Math.round(timescale * timeOffset);
      }
    }

    if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
      // let's use input time scale as MP4 video timescale
      // we use input time scale straight away to avoid rounding issues on frame duration / cts computation
      videoTrack.timescale = videoTrack.inputTimeScale;
      tracks.video = {
        id: 'main',
        container: 'video/mp4',
        codec: videoTrack.codec,
        initSegment: _mp4_generator__WEBPACK_IMPORTED_MODULE_2__["default"].initSegment([videoTrack]),
        metadata: {
          width: videoTrack.width,
          height: videoTrack.height
        }
      };

      if (computePTSDTS) {
        timescale = videoTrack.inputTimeScale;
        var startPTS = this.getVideoStartPts(videoSamples);
        var startOffset = Math.round(timescale * timeOffset);
        initDTS = Math.min(initDTS, normalizePts(videoSamples[0].dts, startPTS) - startOffset);
        initPTS = Math.min(initPTS, startPTS - startOffset);
      }
    }

    if (Object.keys(tracks).length) {
      this.ISGenerated = true;

      if (computePTSDTS) {
        this._initPTS = initPTS;
        this._initDTS = initDTS;
      }

      return {
        tracks: tracks,
        initPTS: initPTS,
        timescale: timescale
      };
    }
  };

  _proto.remuxVideo = function remuxVideo(track, timeOffset, contiguous, audioTrackLength) {
    var timeScale = track.inputTimeScale;
    var inputSamples = track.samples;
    var outputSamples = [];
    var nbSamples = inputSamples.length;
    var initPTS = this._initPTS;
    var nextAvcDts = this.nextAvcDts;
    var offset = 8;
    var mp4SampleDuration;
    var firstDTS;
    var lastDTS;
    var minPTS = Number.POSITIVE_INFINITY;
    var maxPTS = Number.NEGATIVE_INFINITY;
    var ptsDtsShift = 0;
    var sortSamples = false; // if parsed fragment is contiguous with last one, let's use last DTS value as reference

    if (!contiguous || nextAvcDts === null) {
      var pts = timeOffset * timeScale;
      var cts = inputSamples[0].pts - normalizePts(inputSamples[0].dts, inputSamples[0].pts); // if not contiguous, let's use target timeOffset

      nextAvcDts = pts - cts;
    } // PTS is coded on 33bits, and can loop from -2^32 to 2^32
    // PTSNormalize will make PTS/DTS value monotonic, we use last known DTS value as reference value


    for (var i = 0; i < nbSamples; i++) {
      var sample = inputSamples[i];
      sample.pts = normalizePts(sample.pts - initPTS, nextAvcDts);
      sample.dts = normalizePts(sample.dts - initPTS, nextAvcDts);

      if (sample.dts > sample.pts) {
        var PTS_DTS_SHIFT_TOLERANCE_90KHZ = 90000 * 0.2;
        ptsDtsShift = Math.max(Math.min(ptsDtsShift, sample.pts - sample.dts), -1 * PTS_DTS_SHIFT_TOLERANCE_90KHZ);
      }

      if (sample.dts < inputSamples[i > 0 ? i - 1 : i].dts) {
        sortSamples = true;
      }
    } // sort video samples by DTS then PTS then demux id order


    if (sortSamples) {
      inputSamples.sort(function (a, b) {
        var deltadts = a.dts - b.dts;
        var deltapts = a.pts - b.pts;
        return deltadts || deltapts;
      });
    } // Get first/last DTS


    firstDTS = inputSamples[0].dts;
    lastDTS = inputSamples[inputSamples.length - 1].dts; // on Safari let's signal the same sample duration for all samples
    // sample duration (as expected by trun MP4 boxes), should be the delta between sample DTS
    // set this constant duration as being the avg delta between consecutive DTS.

    var averageSampleDuration = Math.round((lastDTS - firstDTS) / (nbSamples - 1)); // handle broken streams with PTS < DTS, tolerance up 0.2 seconds

    if (ptsDtsShift < 0) {
      if (ptsDtsShift < averageSampleDuration * -2) {
        // Fix for "CNN special report, with CC" in test-streams (including Safari browser)
        // With large PTS < DTS errors such as this, we want to correct CTS while maintaining increasing DTS values
        _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("PTS < DTS detected in video samples, offsetting DTS from PTS by " + Object(_utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__["toMsFromMpegTsClock"])(-averageSampleDuration, true) + " ms");
        var lastDts = ptsDtsShift;

        for (var _i = 0; _i < nbSamples; _i++) {
          inputSamples[_i].dts = lastDts = Math.max(lastDts, inputSamples[_i].pts - averageSampleDuration);
          inputSamples[_i].pts = Math.max(lastDts, inputSamples[_i].pts);
        }
      } else {
        // Fix for "Custom IV with bad PTS DTS" in test-streams
        // With smaller PTS < DTS errors we can simply move all DTS back. This increases CTS without causing buffer gaps or decode errors in Safari
        _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("PTS < DTS detected in video samples, shifting DTS by " + Object(_utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__["toMsFromMpegTsClock"])(ptsDtsShift, true) + " ms to overcome this issue");

        for (var _i2 = 0; _i2 < nbSamples; _i2++) {
          inputSamples[_i2].dts = inputSamples[_i2].dts + ptsDtsShift;
        }
      }

      firstDTS = inputSamples[0].dts;
    } // if fragment are contiguous, detect hole/overlapping between fragments


    if (contiguous) {
      // check timestamp continuity across consecutive fragments (this is to remove inter-fragment gap/hole)
      var delta = firstDTS - nextAvcDts;
      var foundHole = delta > averageSampleDuration;
      var foundOverlap = delta < -1;

      if (foundHole || foundOverlap) {
        if (foundHole) {
          _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("AVC: " + Object(_utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__["toMsFromMpegTsClock"])(delta, true) + " ms (" + delta + "dts) hole between fragments detected, filling it");
        } else {
          _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("AVC: " + Object(_utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__["toMsFromMpegTsClock"])(-delta, true) + " ms (" + delta + "dts) overlapping between fragments detected");
        }

        firstDTS = nextAvcDts;
        var firstPTS = inputSamples[0].pts - delta;
        inputSamples[0].dts = firstDTS;
        inputSamples[0].pts = firstPTS;
        _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].log("Video: First PTS/DTS adjusted: " + Object(_utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__["toMsFromMpegTsClock"])(firstPTS, true) + "/" + Object(_utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__["toMsFromMpegTsClock"])(firstDTS, true) + ", delta: " + Object(_utils_timescale_conversion__WEBPACK_IMPORTED_MODULE_7__["toMsFromMpegTsClock"])(delta, true) + " ms");
      }
    }

    if (requiresPositiveDts) {
      firstDTS = Math.max(0, firstDTS);
    }

    var nbNalu = 0;
    var naluLen = 0;

    for (var _i3 = 0; _i3 < nbSamples; _i3++) {
      // compute total/avc sample length and nb of NAL units
      var _sample = inputSamples[_i3];
      var units = _sample.units;
      var nbUnits = units.length;
      var sampleLen = 0;

      for (var j = 0; j < nbUnits; j++) {
        sampleLen += units[j].data.length;
      }

      naluLen += sampleLen;
      nbNalu += nbUnits;
      _sample.length = sampleLen; // normalize PTS/DTS
      // ensure sample monotonic DTS

      _sample.dts = Math.max(_sample.dts, firstDTS); // ensure that computed value is greater or equal than sample DTS

      _sample.pts = Math.max(_sample.pts, _sample.dts, 0);
      minPTS = Math.min(_sample.pts, minPTS);
      maxPTS = Math.max(_sample.pts, maxPTS);
    }

    lastDTS = inputSamples[nbSamples - 1].dts;
    /* concatenate the video data and construct the mdat in place
      (need 8 more bytes to fill length and mpdat type) */

    var mdatSize = naluLen + 4 * nbNalu + 8;
    var mdat;

    try {
      mdat = new Uint8Array(mdatSize);
    } catch (err) {
      this.observer.emit(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].ERROR, _events__WEBPACK_IMPORTED_MODULE_3__["Events"].ERROR, {
        type: _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorTypes"].MUX_ERROR,
        details: _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorDetails"].REMUX_ALLOC_ERROR,
        fatal: false,
        bytes: mdatSize,
        reason: "fail allocating video mdat " + mdatSize
      });
      return;
    }

    var view = new DataView(mdat.buffer);
    view.setUint32(0, mdatSize);
    mdat.set(_mp4_generator__WEBPACK_IMPORTED_MODULE_2__["default"].types.mdat, 4);

    for (var _i4 = 0; _i4 < nbSamples; _i4++) {
      var avcSample = inputSamples[_i4];
      var avcSampleUnits = avcSample.units;
      var mp4SampleLength = 0; // convert NALU bitstream to MP4 format (prepend NALU with size field)

      for (var _j = 0, _nbUnits = avcSampleUnits.length; _j < _nbUnits; _j++) {
        var unit = avcSampleUnits[_j];
        var unitData = unit.data;
        var unitDataLen = unit.data.byteLength;
        view.setUint32(offset, unitDataLen);
        offset += 4;
        mdat.set(unitData, offset);
        offset += unitDataLen;
        mp4SampleLength += 4 + unitDataLen;
      } // expected sample duration is the Decoding Timestamp diff of consecutive samples


      if (_i4 < nbSamples - 1) {
        mp4SampleDuration = inputSamples[_i4 + 1].dts - avcSample.dts;
      } else {
        var config = this.config;
        var lastFrameDuration = avcSample.dts - inputSamples[_i4 > 0 ? _i4 - 1 : _i4].dts;

        if (config.stretchShortVideoTrack && this.nextAudioPts !== null) {
          // In some cases, a segment's audio track duration may exceed the video track duration.
          // Since we've already remuxed audio, and we know how long the audio track is, we look to
          // see if the delta to the next segment is longer than maxBufferHole.
          // If so, playback would potentially get stuck, so we artificially inflate
          // the duration of the last frame to minimize any potential gap between segments.
          var gapTolerance = Math.floor(config.maxBufferHole * timeScale);
          var deltaToFrameEnd = (audioTrackLength ? minPTS + audioTrackLength * timeScale : this.nextAudioPts) - avcSample.pts;

          if (deltaToFrameEnd > gapTolerance) {
            // We subtract lastFrameDuration from deltaToFrameEnd to try to prevent any video
            // frame overlap. maxBufferHole should be >> lastFrameDuration anyway.
            mp4SampleDuration = deltaToFrameEnd - lastFrameDuration;

            if (mp4SampleDuration < 0) {
              mp4SampleDuration = lastFrameDuration;
            }

            _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].log("[mp4-remuxer]: It is approximately " + deltaToFrameEnd / 90 + " ms to the next segment; using duration " + mp4SampleDuration / 90 + " ms for the last video frame.");
          } else {
            mp4SampleDuration = lastFrameDuration;
          }
        } else {
          mp4SampleDuration = lastFrameDuration;
        }
      }

      var compositionTimeOffset = Math.round(avcSample.pts - avcSample.dts);
      outputSamples.push(new Mp4Sample(avcSample.key, mp4SampleDuration, mp4SampleLength, compositionTimeOffset));
    }

    if (outputSamples.length && chromeVersion && chromeVersion < 70) {
      // Chrome workaround, mark first sample as being a Random Access Point (keyframe) to avoid sourcebuffer append issue
      // https://code.google.com/p/chromium/issues/detail?id=229412
      var flags = outputSamples[0].flags;
      flags.dependsOn = 2;
      flags.isNonSync = 0;
    }

    console.assert(mp4SampleDuration !== undefined, 'mp4SampleDuration must be computed'); // next AVC sample DTS should be equal to last sample DTS + last sample duration (in PES timescale)

    this.nextAvcDts = nextAvcDts = lastDTS + mp4SampleDuration;
    this.isVideoContiguous = true;
    var moof = _mp4_generator__WEBPACK_IMPORTED_MODULE_2__["default"].moof(track.sequenceNumber++, firstDTS, _extends({}, track, {
      samples: outputSamples
    }));
    var type = 'video';
    var data = {
      data1: moof,
      data2: mdat,
      startPTS: minPTS / timeScale,
      endPTS: (maxPTS + mp4SampleDuration) / timeScale,
      startDTS: firstDTS / timeScale,
      endDTS: nextAvcDts / timeScale,
      type: type,
      hasAudio: false,
      hasVideo: true,
      nb: outputSamples.length,
      dropped: track.dropped
    };
    track.samples = [];
    track.dropped = 0;
    console.assert(mdat.length, 'MDAT length must not be zero');
    return data;
  };

  _proto.remuxAudio = function remuxAudio(track, timeOffset, contiguous, accurateTimeOffset, videoTimeOffset) {
    var inputTimeScale = track.inputTimeScale;
    var mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale;
    var scaleFactor = inputTimeScale / mp4timeScale;
    var mp4SampleDuration = track.isAAC ? AAC_SAMPLES_PER_FRAME : MPEG_AUDIO_SAMPLE_PER_FRAME;
    var inputSampleDuration = mp4SampleDuration * scaleFactor;
    var initPTS = this._initPTS;
    var rawMPEG = !track.isAAC && this.typeSupported.mpeg;
    var outputSamples = [];
    var inputSamples = track.samples;
    var offset = rawMPEG ? 0 : 8;
    var nextAudioPts = this.nextAudioPts || -1; // window.audioSamples ? window.audioSamples.push(inputSamples.map(s => s.pts)) : (window.audioSamples = [inputSamples.map(s => s.pts)]);
    // for audio samples, also consider consecutive fragments as being contiguous (even if a level switch occurs),
    // for sake of clarity:
    // consecutive fragments are frags with
    //  - less than 100ms gaps between new time offset (if accurate) and next expected PTS OR
    //  - less than 20 audio frames distance
    // contiguous fragments are consecutive fragments from same quality level (same level, new SN = old SN + 1)
    // this helps ensuring audio continuity
    // and this also avoids audio glitches/cut when switching quality, or reporting wrong duration on first audio frame

    var timeOffsetMpegTS = timeOffset * inputTimeScale;
    this.isAudioContiguous = contiguous = contiguous || inputSamples.length && nextAudioPts > 0 && (accurateTimeOffset && Math.abs(timeOffsetMpegTS - nextAudioPts) < 9000 || Math.abs(normalizePts(inputSamples[0].pts - initPTS, timeOffsetMpegTS) - nextAudioPts) < 20 * inputSampleDuration); // compute normalized PTS

    inputSamples.forEach(function (sample) {
      sample.pts = normalizePts(sample.pts - initPTS, timeOffsetMpegTS);
    });

    if (!contiguous || nextAudioPts < 0) {
      // filter out sample with negative PTS that are not playable anyway
      // if we don't remove these negative samples, they will shift all audio samples forward.
      // leading to audio overlap between current / next fragment
      inputSamples = inputSamples.filter(function (sample) {
        return sample.pts >= 0;
      }); // in case all samples have negative PTS, and have been filtered out, return now

      if (!inputSamples.length) {
        return;
      }

      if (videoTimeOffset === 0) {
        // Set the start to 0 to match video so that start gaps larger than inputSampleDuration are filled with silence
        nextAudioPts = 0;
      } else if (accurateTimeOffset) {
        // When not seeking, not live, and LevelDetails.PTSKnown, use fragment start as predicted next audio PTS
        nextAudioPts = Math.max(0, timeOffsetMpegTS);
      } else {
        // if frags are not contiguous and if we cant trust time offset, let's use first sample PTS as next audio PTS
        nextAudioPts = inputSamples[0].pts;
      }
    } // If the audio track is missing samples, the frames seem to get "left-shifted" within the
    // resulting mp4 segment, causing sync issues and leaving gaps at the end of the audio segment.
    // In an effort to prevent this from happening, we inject frames here where there are gaps.
    // When possible, we inject a silent frame; when that's not possible, we duplicate the last
    // frame.


    if (track.isAAC) {
      var alignedWithVideo = videoTimeOffset !== undefined;
      var maxAudioFramesDrift = this.config.maxAudioFramesDrift;

      for (var i = 0, nextPts = nextAudioPts; i < inputSamples.length; i++) {
        // First, let's see how far off this frame is from where we expect it to be
        var sample = inputSamples[i];
        var pts = sample.pts;
        var delta = pts - nextPts;
        var duration = Math.abs(1000 * delta / inputTimeScale); // When remuxing with video, if we're overlapping by more than a duration, drop this sample to stay in sync

        if (delta <= -maxAudioFramesDrift * inputSampleDuration && alignedWithVideo) {
          if (i === 0) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("Audio frame @ " + (pts / inputTimeScale).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1000 * delta / inputTimeScale) + " ms.");
            this.nextAudioPts = nextAudioPts = nextPts = pts;
          }
        } // eslint-disable-line brace-style
        // Insert missing frames if:
        // 1: We're more than maxAudioFramesDrift frame away
        // 2: Not more than MAX_SILENT_FRAME_DURATION away
        // 3: currentTime (aka nextPtsNorm) is not 0
        // 4: remuxing with video (videoTimeOffset !== undefined)
        else if (delta >= maxAudioFramesDrift * inputSampleDuration && duration < MAX_SILENT_FRAME_DURATION && alignedWithVideo) {
          var missing = Math.round(delta / inputSampleDuration); // Adjust nextPts so that silent samples are aligned with media pts. This will prevent media samples from
          // later being shifted if nextPts is based on timeOffset and delta is not a multiple of inputSampleDuration.

          nextPts = pts - missing * inputSampleDuration;

          if (nextPts < 0) {
            missing--;
            nextPts += inputSampleDuration;
          }

          if (i === 0) {
            this.nextAudioPts = nextAudioPts = nextPts;
          }

          _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn("[mp4-remuxer]: Injecting " + missing + " audio frame @ " + (nextPts / inputTimeScale).toFixed(3) + "s due to " + Math.round(1000 * delta / inputTimeScale) + " ms gap.");

          for (var j = 0; j < missing; j++) {
            var newStamp = Math.max(nextPts, 0);
            var fillFrame = _aac_helper__WEBPACK_IMPORTED_MODULE_1__["default"].getSilentFrame(track.manifestCodec || track.codec, track.channelCount);

            if (!fillFrame) {
              _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].log('[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead.');
              fillFrame = sample.unit.subarray();
            }

            inputSamples.splice(i, 0, {
              unit: fillFrame,
              pts: newStamp
            });
            nextPts += inputSampleDuration;
            i++;
          }
        }

        sample.pts = nextPts;
        nextPts += inputSampleDuration;
      }
    }

    var firstPTS = null;
    var lastPTS = null;
    var mdat;
    var mdatSize = 0;
    var sampleLength = inputSamples.length;

    while (sampleLength--) {
      mdatSize += inputSamples[sampleLength].unit.byteLength;
    }

    for (var _j2 = 0, _nbSamples = inputSamples.length; _j2 < _nbSamples; _j2++) {
      var audioSample = inputSamples[_j2];
      var unit = audioSample.unit;
      var _pts = audioSample.pts;

      if (lastPTS !== null) {
        // If we have more than one sample, set the duration of the sample to the "real" duration; the PTS diff with
        // the previous sample
        var prevSample = outputSamples[_j2 - 1];
        prevSample.duration = Math.round((_pts - lastPTS) / scaleFactor);
      } else {
        if (contiguous && track.isAAC) {
          // set PTS/DTS to expected PTS/DTS
          _pts = nextAudioPts;
        } // remember first PTS of our audioSamples


        firstPTS = _pts;

        if (mdatSize > 0) {
          /* concatenate the audio data and construct the mdat in place
            (need 8 more bytes to fill length and mdat type) */
          mdatSize += offset;

          try {
            mdat = new Uint8Array(mdatSize);
          } catch (err) {
            this.observer.emit(_events__WEBPACK_IMPORTED_MODULE_3__["Events"].ERROR, _events__WEBPACK_IMPORTED_MODULE_3__["Events"].ERROR, {
              type: _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorTypes"].MUX_ERROR,
              details: _errors__WEBPACK_IMPORTED_MODULE_4__["ErrorDetails"].REMUX_ALLOC_ERROR,
              fatal: false,
              bytes: mdatSize,
              reason: "fail allocating audio mdat " + mdatSize
            });
            return;
          }

          if (!rawMPEG) {
            var view = new DataView(mdat.buffer);
            view.setUint32(0, mdatSize);
            mdat.set(_mp4_generator__WEBPACK_IMPORTED_MODULE_2__["default"].types.mdat, 4);
          }
        } else {
          // no audio samples
          return;
        }
      }

      mdat.set(unit, offset);
      var unitLen = unit.byteLength;
      offset += unitLen; // Default the sample's duration to the computed mp4SampleDuration, which will either be 1024 for AAC or 1152 for MPEG
      // In the case that we have 1 sample, this will be the duration. If we have more than one sample, the duration
      // becomes the PTS diff with the previous sample

      outputSamples.push(new Mp4Sample(true, mp4SampleDuration, unitLen, 0));
      lastPTS = _pts;
    } // We could end up with no audio samples if all input samples were overlapping with the previously remuxed ones


    var nbSamples = outputSamples.length;

    if (!nbSamples) {
      return;
    } // The next audio sample PTS should be equal to last sample PTS + duration


    var lastSample = outputSamples[outputSamples.length - 1];
    this.nextAudioPts = nextAudioPts = lastPTS + scaleFactor * lastSample.duration; // Set the track samples from inputSamples to outputSamples before remuxing

    var moof = rawMPEG ? new Uint8Array(0) : _mp4_generator__WEBPACK_IMPORTED_MODULE_2__["default"].moof(track.sequenceNumber++, firstPTS / scaleFactor, _extends({}, track, {
      samples: outputSamples
    })); // Clear the track samples. This also clears the samples array in the demuxer, since the reference is shared

    track.samples = [];
    var start = firstPTS / inputTimeScale;
    var end = nextAudioPts / inputTimeScale;
    var type = 'audio';
    var audioData = {
      data1: moof,
      data2: mdat,
      startPTS: start,
      endPTS: end,
      startDTS: start,
      endDTS: end,
      type: type,
      hasAudio: true,
      hasVideo: false,
      nb: nbSamples
    };
    this.isAudioContiguous = true;
    console.assert(mdat.length, 'MDAT length must not be zero');
    return audioData;
  };

  _proto.remuxEmptyAudio = function remuxEmptyAudio(track, timeOffset, contiguous, videoData) {
    var inputTimeScale = track.inputTimeScale;
    var mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale;
    var scaleFactor = inputTimeScale / mp4timeScale;
    var nextAudioPts = this.nextAudioPts; // sync with video's timestamp

    var startDTS = (nextAudioPts !== null ? nextAudioPts : videoData.startDTS * inputTimeScale) + this._initDTS;
    var endDTS = videoData.endDTS * inputTimeScale + this._initDTS; // one sample's duration value

    var frameDuration = scaleFactor * AAC_SAMPLES_PER_FRAME; // samples count of this segment's duration

    var nbSamples = Math.ceil((endDTS - startDTS) / frameDuration); // silent frame

    var silentFrame = _aac_helper__WEBPACK_IMPORTED_MODULE_1__["default"].getSilentFrame(track.manifestCodec || track.codec, track.channelCount);
    _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].warn('[mp4-remuxer]: remux empty Audio'); // Can't remux if we can't generate a silent frame...

    if (!silentFrame) {
      _utils_logger__WEBPACK_IMPORTED_MODULE_5__["logger"].trace('[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec');
      return;
    }

    var samples = [];

    for (var i = 0; i < nbSamples; i++) {
      var stamp = startDTS + i * frameDuration;
      samples.push({
        unit: silentFrame,
        pts: stamp,
        dts: stamp
      });
    }

    track.samples = samples;
    return this.remuxAudio(track, timeOffset, contiguous, false);
  };

  _proto.remuxID3 = function remuxID3(track, timeOffset) {
    var length = track.samples.length;

    if (!length) {
      return;
    }

    var inputTimeScale = track.inputTimeScale;
    var initPTS = this._initPTS;
    var initDTS = this._initDTS;

    for (var index = 0; index < length; index++) {
      var sample = track.samples[index]; // setting id3 pts, dts to relative time
      // using this._initPTS and this._initDTS to calculate relative time

      sample.pts = normalizePts(sample.pts - initPTS, timeOffset * inputTimeScale) / inputTimeScale;
      sample.dts = normalizePts(sample.dts - initDTS, timeOffset * inputTimeScale) / inputTimeScale;
    }

    var samples = track.samples;
    track.samples = [];
    return {
      samples: samples
    };
  };

  _proto.remuxText = function remuxText(track, timeOffset) {
    var length = track.samples.length;

    if (!length) {
      return;
    }

    var inputTimeScale = track.inputTimeScale;
    var initPTS = this._initPTS;

    for (var index = 0; index < length; index++) {
      var sample = track.samples[index]; // setting text pts, dts to relative time
      // using this._initPTS and this._initDTS to calculate relative time

      sample.pts = normalizePts(sample.pts - initPTS, timeOffset * inputTimeScale) / inputTimeScale;
    }

    track.samples.sort(function (a, b) {
      return a.pts - b.pts;
    });
    var samples = track.samples;
    track.samples = [];
    return {
      samples: samples
    };
  };

  return MP4Remuxer;
}();


function normalizePts(value, reference) {
  var offset;

  if (reference === null) {
    return value;
  }

  if (reference < value) {
    // - 2^33
    offset = -8589934592;
  } else {
    // + 2^33
    offset = 8589934592;
  }
  /* PTS is 33bit (from 0 to 2^33 -1)
    if diff between value and reference is bigger than half of the amplitude (2^32) then it means that
    PTS looping occured. fill the gap */


  while (Math.abs(value - reference) > 4294967296) {
    value += offset;
  }

  return value;
}

function findKeyframeIndex(samples) {
  for (var i = 0; i < samples.length; i++) {
    if (samples[i].key) {
      return i;
    }
  }

  return -1;
}

var Mp4Sample = function Mp4Sample(isKeyframe, duration, size, cts) {
  this.size = void 0;
  this.duration = void 0;
  this.cts = void 0;
  this.flags = void 0;
  this.duration = duration;
  this.size = size;
  this.cts = cts;
  this.flags = new Mp4SampleFlags(isKeyframe);
};

var Mp4SampleFlags = function Mp4SampleFlags(isKeyframe) {
  this.isLeading = 0;
  this.isDependedOn = 0;
  this.hasRedundancy = 0;
  this.degradPrio = 0;
  this.dependsOn = 1;
  this.isNonSync = 1;
  this.dependsOn = isKeyframe ? 2 : 1;
  this.isNonSync = isKeyframe ? 0 : 1;
};

/***/ }),

/***/ "./src/remux/passthrough-remuxer.ts":
/*!******************************************!*\
  !*** ./src/remux/passthrough-remuxer.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _utils_mp4_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/mp4-tools */ "./src/utils/mp4-tools.ts");
/* harmony import */ var _loader_fragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loader/fragment */ "./src/loader/fragment.ts");
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");






var PassThroughRemuxer = /*#__PURE__*/function () {
  function PassThroughRemuxer() {
    this.emitInitSegment = false;
    this.audioCodec = void 0;
    this.videoCodec = void 0;
    this.initData = void 0;
    this.initPTS = void 0;
    this.initTracks = void 0;
    this.lastEndDTS = null;
  }

  var _proto = PassThroughRemuxer.prototype;

  _proto.destroy = function destroy() {};

  _proto.resetTimeStamp = function resetTimeStamp(defaultInitPTS) {
    this.initPTS = defaultInitPTS;
    this.lastEndDTS = null;
  };

  _proto.resetNextTimestamp = function resetNextTimestamp() {
    this.lastEndDTS = null;
  };

  _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec) {
    this.audioCodec = audioCodec;
    this.videoCodec = videoCodec;
    this.generateInitSegment(initSegment);
    this.emitInitSegment = true;
  };

  _proto.generateInitSegment = function generateInitSegment(initSegment) {
    var audioCodec = this.audioCodec,
        videoCodec = this.videoCodec;

    if (!initSegment || !initSegment.byteLength) {
      this.initTracks = undefined;
      this.initData = undefined;
      return;
    }

    var initData = this.initData = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_1__["parseInitSegment"])(initSegment); // Get codec from initSegment or fallback to default

    if (!audioCodec) {
      audioCodec = getParsedTrackCodec(initData.audio, _loader_fragment__WEBPACK_IMPORTED_MODULE_2__["ElementaryStreamTypes"].AUDIO);
    }

    if (!videoCodec) {
      videoCodec = getParsedTrackCodec(initData.video, _loader_fragment__WEBPACK_IMPORTED_MODULE_2__["ElementaryStreamTypes"].VIDEO);
    }

    var tracks = {};

    if (initData.audio && initData.video) {
      tracks.audiovideo = {
        container: 'video/mp4',
        codec: audioCodec + ',' + videoCodec,
        initSegment: initSegment,
        id: 'main'
      };
    } else if (initData.audio) {
      tracks.audio = {
        container: 'audio/mp4',
        codec: audioCodec,
        initSegment: initSegment,
        id: 'audio'
      };
    } else if (initData.video) {
      tracks.video = {
        container: 'video/mp4',
        codec: videoCodec,
        initSegment: initSegment,
        id: 'main'
      };
    } else {
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn('[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes.');
    }

    this.initTracks = tracks;
  };

  _proto.remux = function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset) {
    var initPTS = this.initPTS,
        lastEndDTS = this.lastEndDTS;
    var result = {
      audio: undefined,
      video: undefined,
      text: textTrack,
      id3: id3Track,
      initSegment: undefined
    }; // If we haven't yet set a lastEndDTS, or it was reset, set it to the provided timeOffset. We want to use the
    // lastEndDTS over timeOffset whenever possible; during progressive playback, the media source will not update
    // the media duration (which is what timeOffset is provided as) before we need to process the next chunk.

    if (!Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(lastEndDTS)) {
      lastEndDTS = this.lastEndDTS = timeOffset || 0;
    } // The binary segment data is added to the videoTrack in the mp4demuxer. We don't check to see if the data is only
    // audio or video (or both); adding it to video was an arbitrary choice.


    var data = videoTrack.samples;

    if (!data || !data.length) {
      return result;
    }

    var initSegment = {
      initPTS: undefined,
      timescale: 1
    };
    var initData = this.initData;

    if (!initData || !initData.length) {
      this.generateInitSegment(data);
      initData = this.initData;
    }

    if (!initData || !initData.length) {
      // We can't remux if the initSegment could not be generated
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn('[passthrough-remuxer.ts]: Failed to generate initSegment.');
      return result;
    }

    if (this.emitInitSegment) {
      initSegment.tracks = this.initTracks;
      this.emitInitSegment = false;
    }

    if (!Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(initPTS)) {
      this.initPTS = initSegment.initPTS = initPTS = computeInitPTS(initData, data, lastEndDTS);
    }

    var duration = Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_1__["getDuration"])(data, initData);
    var startDTS = lastEndDTS;
    var endDTS = duration + startDTS;
    Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_1__["offsetStartDTS"])(initData, data, initPTS);

    if (duration > 0) {
      this.lastEndDTS = endDTS;
    } else {
      _utils_logger__WEBPACK_IMPORTED_MODULE_3__["logger"].warn('Duration parsed from mp4 should be greater than zero');
      this.resetNextTimestamp();
    }

    var hasAudio = !!initData.audio;
    var hasVideo = !!initData.video;
    var type = '';

    if (hasAudio) {
      type += 'audio';
    }

    if (hasVideo) {
      type += 'video';
    }

    var track = {
      data1: data,
      startPTS: startDTS,
      startDTS: startDTS,
      endPTS: endDTS,
      endDTS: endDTS,
      type: type,
      hasAudio: hasAudio,
      hasVideo: hasVideo,
      nb: 1,
      dropped: 0
    };
    result.audio = track.type === 'audio' ? track : undefined;
    result.video = track.type !== 'audio' ? track : undefined;
    result.text = textTrack;
    result.id3 = id3Track;
    result.initSegment = initSegment;
    return result;
  };

  return PassThroughRemuxer;
}();

var computeInitPTS = function computeInitPTS(initData, data, timeOffset) {
  return Object(_utils_mp4_tools__WEBPACK_IMPORTED_MODULE_1__["getStartDTS"])(initData, data) - timeOffset;
};

function getParsedTrackCodec(track, type) {
  var parsedCodec = track === null || track === void 0 ? void 0 : track.codec;

  if (parsedCodec && parsedCodec.length > 4) {
    return parsedCodec;
  } // Since mp4-tools cannot parse full codec string (see 'TODO: Parse codec details'... in mp4-tools)
  // Provide defaults based on codec type
  // This allows for some playback of some fmp4 playlists without CODECS defined in manifest


  if (parsedCodec === 'hvc1') {
    return 'hvc1.1.c.L120.90';
  }

  if (parsedCodec === 'av01') {
    return 'av01.0.04M.08';
  }

  if (parsedCodec === 'avc1' || type === _loader_fragment__WEBPACK_IMPORTED_MODULE_2__["ElementaryStreamTypes"].VIDEO) {
    return 'avc1.42e01e';
  }

  return 'mp4a.40.5';
}

/* harmony default export */ __webpack_exports__["default"] = (PassThroughRemuxer);

/***/ }),

/***/ "./src/task-loop.ts":
/*!**************************!*\
  !*** ./src/task-loop.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskLoop; });
/**
 * Sub-class specialization of EventHandler base class.
 *
 * TaskLoop allows to schedule a task function being called (optionnaly repeatedly) on the main loop,
 * scheduled asynchroneously, avoiding recursive calls in the same tick.
 *
 * The task itself is implemented in `doTick`. It can be requested and called for single execution
 * using the `tick` method.
 *
 * It will be assured that the task execution method (`tick`) only gets called once per main loop "tick",
 * no matter how often it gets requested for execution. Execution in further ticks will be scheduled accordingly.
 *
 * If further execution requests have already been scheduled on the next tick, it can be checked with `hasNextTick`,
 * and cancelled with `clearNextTick`.
 *
 * The task can be scheduled as an interval repeatedly with a period as parameter (see `setInterval`, `clearInterval`).
 *
 * Sub-classes need to implement the `doTick` method which will effectively have the task execution routine.
 *
 * Further explanations:
 *
 * The baseclass has a `tick` method that will schedule the doTick call. It may be called synchroneously
 * only for a stack-depth of one. On re-entrant calls, sub-sequent calls are scheduled for next main loop ticks.
 *
 * When the task execution (`tick` method) is called in re-entrant way this is detected and
 * we are limiting the task execution per call stack to exactly one, but scheduling/post-poning further
 * task processing on the next main loop iteration (also known as "next tick" in the Node/JS runtime lingo).
 */
var TaskLoop = /*#__PURE__*/function () {
  function TaskLoop() {
    this._boundTick = void 0;
    this._tickTimer = null;
    this._tickInterval = null;
    this._tickCallCount = 0;
    this._boundTick = this.tick.bind(this);
  }

  var _proto = TaskLoop.prototype;

  _proto.destroy = function destroy() {
    this.onHandlerDestroying();
    this.onHandlerDestroyed();
  };

  _proto.onHandlerDestroying = function onHandlerDestroying() {
    // clear all timers before unregistering from event bus
    this.clearNextTick();
    this.clearInterval();
  };

  _proto.onHandlerDestroyed = function onHandlerDestroyed() {}
  /**
   * @returns {boolean}
   */
  ;

  _proto.hasInterval = function hasInterval() {
    return !!this._tickInterval;
  }
  /**
   * @returns {boolean}
   */
  ;

  _proto.hasNextTick = function hasNextTick() {
    return !!this._tickTimer;
  }
  /**
   * @param {number} millis Interval time (ms)
   * @returns {boolean} True when interval has been scheduled, false when already scheduled (no effect)
   */
  ;

  _proto.setInterval = function setInterval(millis) {
    if (!this._tickInterval) {
      this._tickInterval = self.setInterval(this._boundTick, millis);
      return true;
    }

    return false;
  }
  /**
   * @returns {boolean} True when interval was cleared, false when none was set (no effect)
   */
  ;

  _proto.clearInterval = function clearInterval() {
    if (this._tickInterval) {
      self.clearInterval(this._tickInterval);
      this._tickInterval = null;
      return true;
    }

    return false;
  }
  /**
   * @returns {boolean} True when timeout was cleared, false when none was set (no effect)
   */
  ;

  _proto.clearNextTick = function clearNextTick() {
    if (this._tickTimer) {
      self.clearTimeout(this._tickTimer);
      this._tickTimer = null;
      return true;
    }

    return false;
  }
  /**
   * Will call the subclass doTick implementation in this main loop tick
   * or in the next one (via setTimeout(,0)) in case it has already been called
   * in this tick (in case this is a re-entrant call).
   */
  ;

  _proto.tick = function tick() {
    this._tickCallCount++;

    if (this._tickCallCount === 1) {
      this.doTick(); // re-entrant call to tick from previous doTick call stack
      // -> schedule a call on the next main loop iteration to process this task processing request

      if (this._tickCallCount > 1) {
        // make sure only one timer exists at any time at max
        this.tickImmediate();
      }

      this._tickCallCount = 0;
    }
  };

  _proto.tickImmediate = function tickImmediate() {
    this.clearNextTick();
    this._tickTimer = self.setTimeout(this._boundTick, 0);
  }
  /**
   * For subclass to implement task logic
   * @abstract
   */
  ;

  _proto.doTick = function doTick() {};

  return TaskLoop;
}();



/***/ }),

/***/ "./src/types/level.ts":
/*!****************************!*\
  !*** ./src/types/level.ts ***!
  \****************************/
/*! exports provided: HlsSkip, getSkipValue, HlsUrlParameters, Level */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HlsSkip", function() { return HlsSkip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSkipValue", function() { return getSkipValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HlsUrlParameters", function() { return HlsUrlParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Level", function() { return Level; });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HlsSkip;

(function (HlsSkip) {
  HlsSkip["No"] = "";
  HlsSkip["Yes"] = "YES";
  HlsSkip["v2"] = "v2";
})(HlsSkip || (HlsSkip = {}));

function getSkipValue(details, msn) {
  var canSkipUntil = details.canSkipUntil,
      canSkipDateRanges = details.canSkipDateRanges,
      endSN = details.endSN;
  var snChangeGoal = msn !== undefined ? msn - endSN : 0;

  if (canSkipUntil && snChangeGoal < canSkipUntil) {
    if (canSkipDateRanges) {
      return HlsSkip.v2;
    }

    return HlsSkip.Yes;
  }

  return HlsSkip.No;
}
var HlsUrlParameters = /*#__PURE__*/function () {
  function HlsUrlParameters(msn, part, skip) {
    this.msn = void 0;
    this.part = void 0;
    this.skip = void 0;
    this.msn = msn;
    this.part = part;
    this.skip = skip;
  }

  var _proto = HlsUrlParameters.prototype;

  _proto.addDirectives = function addDirectives(uri) {
    var url = new self.URL(uri);

    if (this.msn !== undefined) {
      url.searchParams.set('_HLS_msn', this.msn.toString());
    }

    if (this.part !== undefined) {
      url.searchParams.set('_HLS_part', this.part.toString());
    }

    if (this.skip) {
      url.searchParams.set('_HLS_skip', this.skip);
    }

    return url.toString();
  };

  return HlsUrlParameters;
}();
var Level = /*#__PURE__*/function () {
  function Level(data) {
    this.attrs = void 0;
    this.audioCodec = void 0;
    this.bitrate = void 0;
    this.codecSet = void 0;
    this.height = void 0;
    this.id = void 0;
    this.name = void 0;
    this.videoCodec = void 0;
    this.width = void 0;
    this.unknownCodecs = void 0;
    this.audioGroupIds = void 0;
    this.details = void 0;
    this.fragmentError = 0;
    this.loadError = 0;
    this.loaded = void 0;
    this.realBitrate = 0;
    this.textGroupIds = void 0;
    this.url = void 0;
    this._urlId = 0;
    this.url = [data.url];
    this.attrs = data.attrs;
    this.bitrate = data.bitrate;

    if (data.details) {
      this.details = data.details;
    }

    this.id = data.id || 0;
    this.name = data.name;
    this.width = data.width || 0;
    this.height = data.height || 0;
    this.audioCodec = data.audioCodec;
    this.videoCodec = data.videoCodec;
    this.unknownCodecs = data.unknownCodecs;
    this.codecSet = [data.videoCodec, data.audioCodec].filter(function (c) {
      return c;
    }).join(',').replace(/\.[^.,]+/g, '');
  }

  _createClass(Level, [{
    key: "maxBitrate",
    get: function get() {
      return Math.max(this.realBitrate, this.bitrate);
    }
  }, {
    key: "uri",
    get: function get() {
      return this.url[this._urlId] || '';
    }
  }, {
    key: "urlId",
    get: function get() {
      return this._urlId;
    },
    set: function set(value) {
      var newValue = value % this.url.length;

      if (this._urlId !== newValue) {
        this.details = undefined;
        this._urlId = newValue;
      }
    }
  }]);

  return Level;
}();

/***/ }),

/***/ "./src/types/loader.ts":
/*!*****************************!*\
  !*** ./src/types/loader.ts ***!
  \*****************************/
/*! exports provided: PlaylistContextType, PlaylistLevelType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistContextType", function() { return PlaylistContextType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaylistLevelType", function() { return PlaylistLevelType; });
var PlaylistContextType;

(function (PlaylistContextType) {
  PlaylistContextType["MANIFEST"] = "manifest";
  PlaylistContextType["LEVEL"] = "level";
  PlaylistContextType["AUDIO_TRACK"] = "audioTrack";
  PlaylistContextType["SUBTITLE_TRACK"] = "subtitleTrack";
})(PlaylistContextType || (PlaylistContextType = {}));

var PlaylistLevelType;

(function (PlaylistLevelType) {
  PlaylistLevelType["MAIN"] = "main";
  PlaylistLevelType["AUDIO"] = "audio";
  PlaylistLevelType["SUBTITLE"] = "subtitle";
})(PlaylistLevelType || (PlaylistLevelType = {}));

/***/ }),

/***/ "./src/types/transmuxer.ts":
/*!*********************************!*\
  !*** ./src/types/transmuxer.ts ***!
  \*********************************/
/*! exports provided: ChunkMetadata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChunkMetadata", function() { return ChunkMetadata; });
var ChunkMetadata = function ChunkMetadata(level, sn, id, size, part, partial) {
  if (size === void 0) {
    size = 0;
  }

  if (part === void 0) {
    part = -1;
  }

  if (partial === void 0) {
    partial = false;
  }

  this.level = void 0;
  this.sn = void 0;
  this.part = void 0;
  this.id = void 0;
  this.size = void 0;
  this.partial = void 0;
  this.transmuxing = getNewPerformanceTiming();
  this.buffering = {
    audio: getNewPerformanceTiming(),
    video: getNewPerformanceTiming(),
    audiovideo: getNewPerformanceTiming()
  };
  this.level = level;
  this.sn = sn;
  this.id = id;
  this.size = size;
  this.part = part;
  this.partial = partial;
};

function getNewPerformanceTiming() {
  return {
    start: 0,
    executeStart: 0,
    executeEnd: 0,
    end: 0
  };
}

/***/ }),

/***/ "./src/utils/attr-list.ts":
/*!********************************!*\
  !*** ./src/utils/attr-list.ts ***!
  \********************************/
/*! exports provided: AttrList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrList", function() { return AttrList; });
var DECIMAL_RESOLUTION_REGEX = /^(\d+)x(\d+)$/; // eslint-disable-line no-useless-escape

var ATTR_LIST_REGEX = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g; // eslint-disable-line no-useless-escape
// adapted from https://github.com/kanongil/node-m3u8parse/blob/master/attrlist.js

var AttrList = /*#__PURE__*/function () {
  function AttrList(attrs) {
    if (typeof attrs === 'string') {
      attrs = AttrList.parseAttrList(attrs);
    }

    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        this[attr] = attrs[attr];
      }
    }
  }

  var _proto = AttrList.prototype;

  _proto.decimalInteger = function decimalInteger(attrName) {
    var intValue = parseInt(this[attrName], 10);

    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity;
    }

    return intValue;
  };

  _proto.hexadecimalInteger = function hexadecimalInteger(attrName) {
    if (this[attrName]) {
      var stringValue = (this[attrName] || '0x').slice(2);
      stringValue = (stringValue.length & 1 ? '0' : '') + stringValue;
      var value = new Uint8Array(stringValue.length / 2);

      for (var i = 0; i < stringValue.length / 2; i++) {
        value[i] = parseInt(stringValue.slice(i * 2, i * 2 + 2), 16);
      }

      return value;
    } else {
      return null;
    }
  };

  _proto.hexadecimalIntegerAsNumber = function hexadecimalIntegerAsNumber(attrName) {
    var intValue = parseInt(this[attrName], 16);

    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity;
    }

    return intValue;
  };

  _proto.decimalFloatingPoint = function decimalFloatingPoint(attrName) {
    return parseFloat(this[attrName]);
  };

  _proto.optionalFloat = function optionalFloat(attrName, defaultValue) {
    var value = this[attrName];
    return value ? parseFloat(value) : defaultValue;
  };

  _proto.enumeratedString = function enumeratedString(attrName) {
    return this[attrName];
  };

  _proto.bool = function bool(attrName) {
    return this[attrName] === 'YES';
  };

  _proto.decimalResolution = function decimalResolution(attrName) {
    var res = DECIMAL_RESOLUTION_REGEX.exec(this[attrName]);

    if (res === null) {
      return undefined;
    }

    return {
      width: parseInt(res[1], 10),
      height: parseInt(res[2], 10)
    };
  };

  AttrList.parseAttrList = function parseAttrList(input) {
    var match;
    var attrs = {};
    var quote = '"';
    ATTR_LIST_REGEX.lastIndex = 0;

    while ((match = ATTR_LIST_REGEX.exec(input)) !== null) {
      var value = match[2];

      if (value.indexOf(quote) === 0 && value.lastIndexOf(quote) === value.length - 1) {
        value = value.slice(1, -1);
      }

      attrs[match[1]] = value;
    }

    return attrs;
  };

  return AttrList;
}();

/***/ }),

/***/ "./src/utils/binary-search.ts":
/*!************************************!*\
  !*** ./src/utils/binary-search.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BinarySearch = {
  /**
   * Searches for an item in an array which matches a certain condition.
   * This requires the condition to only match one item in the array,
   * and for the array to be ordered.
   *
   * @param {Array<T>} list The array to search.
   * @param {BinarySearchComparison<T>} comparisonFn
   *      Called and provided a candidate item as the first argument.
   *      Should return:
   *          > -1 if the item should be located at a lower index than the provided item.
   *          > 1 if the item should be located at a higher index than the provided item.
   *          > 0 if the item is the item you're looking for.
   *
   * @return {T | null} The object if it is found or null otherwise.
   */
  search: function search(list, comparisonFn) {
    var minIndex = 0;
    var maxIndex = list.length - 1;
    var currentIndex = null;
    var currentElement = null;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = list[currentIndex];
      var comparisonResult = comparisonFn(currentElement);

      if (comparisonResult > 0) {
        minIndex = currentIndex + 1;
      } else if (comparisonResult < 0) {
        maxIndex = currentIndex - 1;
      } else {
        return currentElement;
      }
    }

    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (BinarySearch);

/***/ }),

/***/ "./src/utils/buffer-helper.ts":
/*!************************************!*\
  !*** ./src/utils/buffer-helper.ts ***!
  \************************************/
/*! exports provided: BufferHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferHelper", function() { return BufferHelper; });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
/**
 * @module BufferHelper
 *
 * Providing methods dealing with buffer length retrieval for example.
 *
 * In general, a helper around HTML5 MediaElement TimeRanges gathered from `buffered` property.
 *
 * Also @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered
 */

var noopBuffered = {
  length: 0,
  start: function start() {
    return 0;
  },
  end: function end() {
    return 0;
  }
};
var BufferHelper = /*#__PURE__*/function () {
  function BufferHelper() {}

  /**
   * Return true if `media`'s buffered include `position`
   * @param {Bufferable} media
   * @param {number} position
   * @returns {boolean}
   */
  BufferHelper.isBuffered = function isBuffered(media, position) {
    try {
      if (media) {
        var buffered = BufferHelper.getBuffered(media);

        for (var i = 0; i < buffered.length; i++) {
          if (position >= buffered.start(i) && position <= buffered.end(i)) {
            return true;
          }
        }
      }
    } catch (error) {// this is to catch
      // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
      // This SourceBuffer has been removed from the parent media source
    }

    return false;
  };

  BufferHelper.bufferInfo = function bufferInfo(media, pos, maxHoleDuration) {
    try {
      if (media) {
        var vbuffered = BufferHelper.getBuffered(media);
        var buffered = [];
        var i;

        for (i = 0; i < vbuffered.length; i++) {
          buffered.push({
            start: vbuffered.start(i),
            end: vbuffered.end(i)
          });
        }

        return this.bufferedInfo(buffered, pos, maxHoleDuration);
      }
    } catch (error) {// this is to catch
      // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
      // This SourceBuffer has been removed from the parent media source
    }

    return {
      len: 0,
      start: pos,
      end: pos,
      nextStart: undefined
    };
  };

  BufferHelper.bufferedInfo = function bufferedInfo(buffered, pos, maxHoleDuration) {
    pos = Math.max(0, pos); // sort on buffer.start/smaller end (IE does not always return sorted buffered range)

    buffered.sort(function (a, b) {
      var diff = a.start - b.start;

      if (diff) {
        return diff;
      } else {
        return b.end - a.end;
      }
    });
    var buffered2 = [];

    if (maxHoleDuration) {
      // there might be some small holes between buffer time range
      // consider that holes smaller than maxHoleDuration are irrelevant and build another
      // buffer time range representations that discards those holes
      for (var i = 0; i < buffered.length; i++) {
        var buf2len = buffered2.length;

        if (buf2len) {
          var buf2end = buffered2[buf2len - 1].end; // if small hole (value between 0 or maxHoleDuration ) or overlapping (negative)

          if (buffered[i].start - buf2end < maxHoleDuration) {
            // merge overlapping time ranges
            // update lastRange.end only if smaller than item.end
            // e.g.  [ 1, 15] with  [ 2,8] => [ 1,15] (no need to modify lastRange.end)
            // whereas [ 1, 8] with  [ 2,15] => [ 1,15] ( lastRange should switch from [1,8] to [1,15])
            if (buffered[i].end > buf2end) {
              buffered2[buf2len - 1].end = buffered[i].end;
            }
          } else {
            // big hole
            buffered2.push(buffered[i]);
          }
        } else {
          // first value
          buffered2.push(buffered[i]);
        }
      }
    } else {
      buffered2 = buffered;
    }

    var bufferLen = 0; // bufferStartNext can possibly be undefined based on the conditional logic below

    var bufferStartNext; // bufferStart and bufferEnd are buffer boundaries around current video position

    var bufferStart = pos;
    var bufferEnd = pos;

    for (var _i = 0; _i < buffered2.length; _i++) {
      var start = buffered2[_i].start;
      var end = buffered2[_i].end; // logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));

      if (pos + maxHoleDuration >= start && pos < end) {
        // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
        bufferStart = start;
        bufferEnd = end;
        bufferLen = bufferEnd - pos;
      } else if (pos + maxHoleDuration < start) {
        bufferStartNext = start;
        break;
      }
    }

    return {
      len: bufferLen,
      start: bufferStart || 0,
      end: bufferEnd || 0,
      nextStart: bufferStartNext
    };
  }
  /**
   * Safe method to get buffered property.
   * SourceBuffer.buffered may throw if SourceBuffer is removed from it's MediaSource
   */
  ;

  BufferHelper.getBuffered = function getBuffered(media) {
    try {
      return media.buffered;
    } catch (e) {
      _logger__WEBPACK_IMPORTED_MODULE_0__["logger"].log('failed to get media.buffered', e);
      return noopBuffered;
    }
  };

  return BufferHelper;
}();

/***/ }),

/***/ "./src/utils/codecs.ts":
/*!*****************************!*\
  !*** ./src/utils/codecs.ts ***!
  \*****************************/
/*! exports provided: isCodecType, isCodecSupportedInMp4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCodecType", function() { return isCodecType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCodecSupportedInMp4", function() { return isCodecSupportedInMp4; });
// from http://mp4ra.org/codecs.html
var sampleEntryCodesISO = {
  audio: {
    a3ds: true,
    'ac-3': true,
    'ac-4': true,
    alac: true,
    alaw: true,
    dra1: true,
    'dts+': true,
    'dts-': true,
    dtsc: true,
    dtse: true,
    dtsh: true,
    'ec-3': true,
    enca: true,
    g719: true,
    g726: true,
    m4ae: true,
    mha1: true,
    mha2: true,
    mhm1: true,
    mhm2: true,
    mlpa: true,
    mp4a: true,
    'raw ': true,
    Opus: true,
    samr: true,
    sawb: true,
    sawp: true,
    sevc: true,
    sqcp: true,
    ssmv: true,
    twos: true,
    ulaw: true
  },
  video: {
    avc1: true,
    avc2: true,
    avc3: true,
    avc4: true,
    avcp: true,
    av01: true,
    drac: true,
    dvav: true,
    dvhe: true,
    encv: true,
    hev1: true,
    hvc1: true,
    mjp2: true,
    mp4v: true,
    mvc1: true,
    mvc2: true,
    mvc3: true,
    mvc4: true,
    resv: true,
    rv60: true,
    s263: true,
    svc1: true,
    svc2: true,
    'vc-1': true,
    vp08: true,
    vp09: true
  },
  text: {
    stpp: true,
    wvtt: true
  }
};
function isCodecType(codec, type) {
  var typeCodes = sampleEntryCodesISO[type];
  return !!typeCodes && typeCodes[codec.slice(0, 4)] === true;
}
function isCodecSupportedInMp4(codec, type) {
  return MediaSource.isTypeSupported((type || 'video') + "/mp4;codecs=\"" + codec + "\"");
}

/***/ }),

/***/ "./src/utils/discontinuities.ts":
/*!**************************************!*\
  !*** ./src/utils/discontinuities.ts ***!
  \**************************************/
/*! exports provided: findFirstFragWithCC, shouldAlignOnDiscontinuities, findDiscontinuousReferenceFrag, adjustSlidingStart, alignStream, alignPDT, alignFragmentByPDTDelta, alignMediaPlaylistByPDT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findFirstFragWithCC", function() { return findFirstFragWithCC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldAlignOnDiscontinuities", function() { return shouldAlignOnDiscontinuities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDiscontinuousReferenceFrag", function() { return findDiscontinuousReferenceFrag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustSlidingStart", function() { return adjustSlidingStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alignStream", function() { return alignStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alignPDT", function() { return alignPDT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alignFragmentByPDTDelta", function() { return alignFragmentByPDTDelta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alignMediaPlaylistByPDT", function() { return alignMediaPlaylistByPDT; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");
/* harmony import */ var _controller_level_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controller/level-helper */ "./src/controller/level-helper.ts");




function findFirstFragWithCC(fragments, cc) {
  var firstFrag = null;

  for (var i = 0, len = fragments.length; i < len; i++) {
    var currentFrag = fragments[i];

    if (currentFrag && currentFrag.cc === cc) {
      firstFrag = currentFrag;
      break;
    }
  }

  return firstFrag;
}
function shouldAlignOnDiscontinuities(lastFrag, lastLevel, details) {
  if (lastLevel.details) {
    if (details.endCC > details.startCC || lastFrag && lastFrag.cc < details.startCC) {
      return true;
    }
  }

  return false;
} // Find the first frag in the previous level which matches the CC of the first frag of the new level

function findDiscontinuousReferenceFrag(prevDetails, curDetails) {
  var prevFrags = prevDetails.fragments;
  var curFrags = curDetails.fragments;

  if (!curFrags.length || !prevFrags.length) {
    _logger__WEBPACK_IMPORTED_MODULE_1__["logger"].log('No fragments to align');
    return;
  }

  var prevStartFrag = findFirstFragWithCC(prevFrags, curFrags[0].cc);

  if (!prevStartFrag || prevStartFrag && !prevStartFrag.startPTS) {
    _logger__WEBPACK_IMPORTED_MODULE_1__["logger"].log('No frag in previous level to align on');
    return;
  }

  return prevStartFrag;
}

function adjustFragmentStart(frag, sliding) {
  if (frag) {
    var start = frag.start + sliding;
    frag.start = frag.startPTS = start;
    frag.endPTS = start + frag.duration;
  }
}

function adjustSlidingStart(sliding, details) {
  // Update segments
  var fragments = details.fragments;

  for (var i = 0, len = fragments.length; i < len; i++) {
    adjustFragmentStart(fragments[i], sliding);
  } // Update LL-HLS parts at the end of the playlist


  if (details.fragmentHint) {
    adjustFragmentStart(details.fragmentHint, sliding);
  }

  details.alignedSliding = true;
}
/**
 * Using the parameters of the last level, this function computes PTS' of the new fragments so that they form a
 * contiguous stream with the last fragments.
 * The PTS of a fragment lets Hls.js know where it fits into a stream - by knowing every PTS, we know which fragment to
 * download at any given time. PTS is normally computed when the fragment is demuxed, so taking this step saves us time
 * and an extra download.
 * @param lastFrag
 * @param lastLevel
 * @param details
 */

function alignStream(lastFrag, lastLevel, details) {
  if (!lastLevel) {
    return;
  }

  alignDiscontinuities(lastFrag, details, lastLevel);

  if (!details.alignedSliding && lastLevel.details) {
    // If the PTS wasn't figured out via discontinuity sequence that means there was no CC increase within the level.
    // Aligning via Program Date Time should therefore be reliable, since PDT should be the same within the same
    // discontinuity sequence.
    alignPDT(details, lastLevel.details);
  }

  if (!details.alignedSliding && lastLevel.details && !details.skippedSegments) {
    // Try to align on sn so that we pick a better start fragment.
    // Do not perform this on playlists with delta updates as this is only to align levels on switch
    // and adjustSliding only adjusts fragments after skippedSegments.
    Object(_controller_level_helper__WEBPACK_IMPORTED_MODULE_2__["adjustSliding"])(lastLevel.details, details);
  }
}
/**
 * Computes the PTS if a new level's fragments using the PTS of a fragment in the last level which shares the same
 * discontinuity sequence.
 * @param lastFrag - The last Fragment which shares the same discontinuity sequence
 * @param lastLevel - The details of the last loaded level
 * @param details - The details of the new level
 */

function alignDiscontinuities(lastFrag, details, lastLevel) {
  if (shouldAlignOnDiscontinuities(lastFrag, lastLevel, details)) {
    var referenceFrag = findDiscontinuousReferenceFrag(lastLevel.details, details);

    if (referenceFrag && Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(referenceFrag.start)) {
      _logger__WEBPACK_IMPORTED_MODULE_1__["logger"].log("Adjusting PTS using last level due to CC increase within current level " + details.url);
      adjustSlidingStart(referenceFrag.start, details);
    }
  }
}
/**
 * Computes the PTS of a new level's fragments using the difference in Program Date Time from the last level.
 * @param details - The details of the new level
 * @param lastDetails - The details of the last loaded level
 */


function alignPDT(details, lastDetails) {
  // This check protects the unsafe "!" usage below for null program date time access.
  if (!lastDetails.fragments.length || !details.hasProgramDateTime || !lastDetails.hasProgramDateTime) {
    return;
  } // if last level sliding is 1000 and its first frag PROGRAM-DATE-TIME is 2017-08-20 1:10:00 AM
  // and if new details first frag PROGRAM DATE-TIME is 2017-08-20 1:10:08 AM
  // then we can deduce that playlist B sliding is 1000+8 = 1008s


  var lastPDT = lastDetails.fragments[0].programDateTime; // hasProgramDateTime check above makes this safe.

  var newPDT = details.fragments[0].programDateTime; // date diff is in ms. frag.start is in seconds

  var sliding = (newPDT - lastPDT) / 1000 + lastDetails.fragments[0].start;

  if (sliding && Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(sliding)) {
    _logger__WEBPACK_IMPORTED_MODULE_1__["logger"].log("Adjusting PTS using programDateTime delta " + (newPDT - lastPDT) + "ms, sliding:" + sliding.toFixed(3) + " " + details.url + " ");
    adjustSlidingStart(sliding, details);
  }
}
function alignFragmentByPDTDelta(frag, delta) {
  var programDateTime = frag.programDateTime;
  if (!programDateTime) return;
  var start = (programDateTime - delta) / 1000;
  frag.start = frag.startPTS = start;
  frag.endPTS = start + frag.duration;
}
/**
 * Ensures appropriate time-alignment between renditions based on PDT. Unlike `alignPDT`, which adjusts
 * the timeline based on the delta between PDTs of the 0th fragment of two playlists/`LevelDetails`,
 * this function assumes the timelines represented in `refDetails` are accurate, including the PDTs,
 * and uses the "wallclock"/PDT timeline as a cross-reference to `details`, adjusting the presentation
 * times/timelines of `details` accordingly.
 * Given the asynchronous nature of fetches and initial loads of live `main` and audio/subtitle tracks,
 * the primary purpose of this function is to ensure the "local timelines" of audio/subtitle tracks
 * are aligned to the main/video timeline, using PDT as the cross-reference/"anchor" that should
 * be consistent across playlists, per the HLS spec.
 * @param details - The details of the rendition you'd like to time-align (e.g. an audio rendition).
 * @param refDetails - The details of the reference rendition with start and PDT times for alignment.
 */

function alignMediaPlaylistByPDT(details, refDetails) {
  // This check protects the unsafe "!" usage below for null program date time access.
  if (!refDetails.fragments.length || !details.hasProgramDateTime || !refDetails.hasProgramDateTime) {
    return;
  }

  var refPDT = refDetails.fragments[0].programDateTime; // hasProgramDateTime check above makes this safe.

  var refStart = refDetails.fragments[0].start; // Use the delta between the reference details' presentation timeline's start time and its PDT
  // to align the other rendtion's timeline.

  var delta = refPDT - refStart * 1000; // Per spec: "If any Media Playlist in a Master Playlist contains an EXT-X-PROGRAM-DATE-TIME tag, then all
  // Media Playlists in that Master Playlist MUST contain EXT-X-PROGRAM-DATE-TIME tags with consistent mappings
  // of date and time to media timestamps."
  // So we should be able to use each rendition's PDT as a reference time and use the delta to compute our relevant
  // start and end times.
  // NOTE: This code assumes each level/details timelines have already been made "internally consistent"

  details.fragments.forEach(function (frag) {
    alignFragmentByPDTDelta(frag, delta);
  });

  if (details.fragmentHint) {
    alignFragmentByPDTDelta(details.fragmentHint, delta);
  }

  details.alignedSliding = true;
}

/***/ }),

/***/ "./src/utils/ewma-bandwidth-estimator.ts":
/*!***********************************************!*\
  !*** ./src/utils/ewma-bandwidth-estimator.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ewma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ewma */ "./src/utils/ewma.ts");
/*
 * EWMA Bandwidth Estimator
 *  - heavily inspired from shaka-player
 * Tracks bandwidth samples and estimates available bandwidth.
 * Based on the minimum of two exponentially-weighted moving averages with
 * different half-lives.
 */


var EwmaBandWidthEstimator = /*#__PURE__*/function () {
  function EwmaBandWidthEstimator(slow, fast, defaultEstimate) {
    this.defaultEstimate_ = void 0;
    this.minWeight_ = void 0;
    this.minDelayMs_ = void 0;
    this.slow_ = void 0;
    this.fast_ = void 0;
    this.defaultEstimate_ = defaultEstimate;
    this.minWeight_ = 0.001;
    this.minDelayMs_ = 50;
    this.slow_ = new _utils_ewma__WEBPACK_IMPORTED_MODULE_0__["default"](slow);
    this.fast_ = new _utils_ewma__WEBPACK_IMPORTED_MODULE_0__["default"](fast);
  }

  var _proto = EwmaBandWidthEstimator.prototype;

  _proto.update = function update(slow, fast) {
    var slow_ = this.slow_,
        fast_ = this.fast_;

    if (this.slow_.halfLife !== slow) {
      this.slow_ = new _utils_ewma__WEBPACK_IMPORTED_MODULE_0__["default"](slow, slow_.getEstimate(), slow_.getTotalWeight());
    }

    if (this.fast_.halfLife !== fast) {
      this.fast_ = new _utils_ewma__WEBPACK_IMPORTED_MODULE_0__["default"](fast, fast_.getEstimate(), fast_.getTotalWeight());
    }
  };

  _proto.sample = function sample(durationMs, numBytes) {
    durationMs = Math.max(durationMs, this.minDelayMs_);
    var numBits = 8 * numBytes; // weight is duration in seconds

    var durationS = durationMs / 1000; // value is bandwidth in bits/s

    var bandwidthInBps = numBits / durationS;
    this.fast_.sample(durationS, bandwidthInBps);
    this.slow_.sample(durationS, bandwidthInBps);
  };

  _proto.canEstimate = function canEstimate() {
    var fast = this.fast_;
    return fast && fast.getTotalWeight() >= this.minWeight_;
  };

  _proto.getEstimate = function getEstimate() {
    if (this.canEstimate()) {
      // console.log('slow estimate:'+ Math.round(this.slow_.getEstimate()));
      // console.log('fast estimate:'+ Math.round(this.fast_.getEstimate()));
      // Take the minimum of these two estimates.  This should have the effect of
      // adapting down quickly, but up more slowly.
      return Math.min(this.fast_.getEstimate(), this.slow_.getEstimate());
    } else {
      return this.defaultEstimate_;
    }
  };

  _proto.destroy = function destroy() {};

  return EwmaBandWidthEstimator;
}();

/* harmony default export */ __webpack_exports__["default"] = (EwmaBandWidthEstimator);

/***/ }),

/***/ "./src/utils/ewma.ts":
/*!***************************!*\
  !*** ./src/utils/ewma.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * compute an Exponential Weighted moving average
 * - https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 *  - heavily inspired from shaka-player
 */
var EWMA = /*#__PURE__*/function () {
  //  About half of the estimated value will be from the last |halfLife| samples by weight.
  function EWMA(halfLife, estimate, weight) {
    if (estimate === void 0) {
      estimate = 0;
    }

    if (weight === void 0) {
      weight = 0;
    }

    this.halfLife = void 0;
    this.alpha_ = void 0;
    this.estimate_ = void 0;
    this.totalWeight_ = void 0;
    this.halfLife = halfLife; // Larger values of alpha expire historical data more slowly.

    this.alpha_ = halfLife ? Math.exp(Math.log(0.5) / halfLife) : 0;
    this.estimate_ = estimate;
    this.totalWeight_ = weight;
  }

  var _proto = EWMA.prototype;

  _proto.sample = function sample(weight, value) {
    var adjAlpha = Math.pow(this.alpha_, weight);
    this.estimate_ = value * (1 - adjAlpha) + adjAlpha * this.estimate_;
    this.totalWeight_ += weight;
  };

  _proto.getTotalWeight = function getTotalWeight() {
    return this.totalWeight_;
  };

  _proto.getEstimate = function getEstimate() {
    if (this.alpha_) {
      var zeroFactor = 1 - Math.pow(this.alpha_, this.totalWeight_);

      if (zeroFactor) {
        return this.estimate_ / zeroFactor;
      }
    }

    return this.estimate_;
  };

  return EWMA;
}();

/* harmony default export */ __webpack_exports__["default"] = (EWMA);

/***/ }),

/***/ "./src/utils/fetch-loader.ts":
/*!***********************************!*\
  !*** ./src/utils/fetch-loader.ts ***!
  \***********************************/
/*! exports provided: fetchSupported, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSupported", function() { return fetchSupported; });
/* harmony import */ var _home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/polyfills/number */ "./src/polyfills/number.ts");
/* harmony import */ var _loader_load_stats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loader/load-stats */ "./src/loader/load-stats.ts");
/* harmony import */ var _demux_chunk_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../demux/chunk-cache */ "./src/demux/chunk-cache.ts");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function fetchSupported() {
  if ( // @ts-ignore
  self.fetch && self.AbortController && self.ReadableStream && self.Request) {
    try {
      new self.ReadableStream({}); // eslint-disable-line no-new

      return true;
    } catch (e) {
      /* noop */
    }
  }

  return false;
}

var FetchLoader = /*#__PURE__*/function () {
  function FetchLoader(config
  /* HlsConfig */
  ) {
    this.fetchSetup = void 0;
    this.requestTimeout = void 0;
    this.request = void 0;
    this.response = void 0;
    this.controller = void 0;
    this.context = void 0;
    this.config = null;
    this.callbacks = null;
    this.stats = void 0;
    this.loader = null;
    this.fetchSetup = config.fetchSetup || getRequest;
    this.controller = new self.AbortController();
    this.stats = new _loader_load_stats__WEBPACK_IMPORTED_MODULE_1__["LoadStats"]();
  }

  var _proto = FetchLoader.prototype;

  _proto.destroy = function destroy() {
    this.loader = this.callbacks = null;
    this.abortInternal();
  };

  _proto.abortInternal = function abortInternal() {
    var response = this.response;

    if (!response || !response.ok) {
      this.stats.aborted = true;
      this.controller.abort();
    }
  };

  _proto.abort = function abort() {
    var _this$callbacks;

    this.abortInternal();

    if ((_this$callbacks = this.callbacks) !== null && _this$callbacks !== void 0 && _this$callbacks.onAbort) {
      this.callbacks.onAbort(this.stats, this.context, this.response);
    }
  };

  _proto.load = function load(context, config, callbacks) {
    var _this = this;

    var stats = this.stats;

    if (stats.loading.start) {
      throw new Error('Loader can only be used once.');
    }

    stats.loading.start = self.performance.now();
    var initParams = getRequestParameters(context, this.controller.signal);
    var onProgress = callbacks.onProgress;
    var isArrayBuffer = context.responseType === 'arraybuffer';
    var LENGTH = isArrayBuffer ? 'byteLength' : 'length';
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.request = this.fetchSetup(context, initParams);
    self.clearTimeout(this.requestTimeout);
    this.requestTimeout = self.setTimeout(function () {
      _this.abortInternal();

      callbacks.onTimeout(stats, context, _this.response);
    }, config.timeout);
    self.fetch(this.request).then(function (response) {
      _this.response = _this.loader = response;

      if (!response.ok) {
        var status = response.status,
            statusText = response.statusText;
        throw new FetchError(statusText || 'fetch, bad network response', status, response);
      }

      stats.loading.first = Math.max(self.performance.now(), stats.loading.start);
      stats.total = parseInt(response.headers.get('Content-Length') || '0');

      if (onProgress && Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(config.highWaterMark)) {
        return _this.loadProgressively(response, stats, context, config.highWaterMark, onProgress);
      }

      if (isArrayBuffer) {
        return response.arrayBuffer();
      }

      return response.text();
    }).then(function (responseData) {
      var response = _this.response;
      self.clearTimeout(_this.requestTimeout);
      stats.loading.end = Math.max(self.performance.now(), stats.loading.first);
      stats.loaded = stats.total = responseData[LENGTH];
      var loaderResponse = {
        url: response.url,
        data: responseData
      };

      if (onProgress && !Object(_home_runner_work_hls_js_hls_js_src_polyfills_number__WEBPACK_IMPORTED_MODULE_0__["isFiniteNumber"])(config.highWaterMark)) {
        onProgress(stats, context, responseData, response);
      }

      callbacks.onSuccess(loaderResponse, stats, context, response);
    }).catch(function (error) {
      self.clearTimeout(_this.requestTimeout);

      if (stats.aborted) {
        return;
      } // CORS errors result in an undefined code. Set it to 0 here to align with XHR's behavior


      var code = error.code || 0;
      callbacks.onError({
        code: code,
        text: error.message
      }, context, error.details);
    });
  };

  _proto.getCacheAge = function getCacheAge() {
    var result = null;

    if (this.response) {
      var ageHeader = this.response.headers.get('age');
      result = ageHeader ? parseFloat(ageHeader) : null;
    }

    return result;
  };

  _proto.loadProgressively = function loadProgressively(response, stats, context, highWaterMark, onProgress) {
    if (highWaterMark === void 0) {
      highWaterMark = 0;
    }

    var chunkCache = new _demux_chunk_cache__WEBPACK_IMPORTED_MODULE_2__["default"]();
    var reader = response.body.getReader();

    var pump = function pump() {
      return reader.read().then(function (data) {
        if (data.done) {
          if (chunkCache.dataLength) {
            onProgress(stats, context, chunkCache.flush(), response);
          }

          return Promise.resolve(new ArrayBuffer(0));
        }

        var chunk = data.value;
        var len = chunk.length;
        stats.loaded += len;

        if (len < highWaterMark || chunkCache.dataLength) {
          // The current chunk is too small to to be emitted or the cache already has data
          // Push it to the cache
          chunkCache.push(chunk);

          if (chunkCache.dataLength >= highWaterMark) {
            // flush in order to join the typed arrays
            onProgress(stats, context, chunkCache.flush(), response);
          }
        } else {
          // If there's nothing cached already, and the chache is large enough
          // just emit the progress event
          onProgress(stats, context, chunk, response);
        }

        return pump();
      }).catch(function () {
        /* aborted */
        return Promise.reject();
      });
    };

    return pump();
  };

  return FetchLoader;
}();

function getRequestParameters(context, signal) {
  var initParams = {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    signal: signal,
    headers: new self.Headers(_extends({}, context.headers))
  };

  if (context.rangeEnd) {
    initParams.headers.set('Range', 'bytes=' + context.rangeStart + '-' + String(context.rangeEnd - 1));
  }

  return initParams;
}

function getRequest(context, initParams) {
  return new self.Request(context.url, initParams);
}

var FetchError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(FetchError, _Error);

  function FetchError(message, code, details) {
    var _this2;

    _this2 = _Error.call(this, message) || this;
    _this2.code = void 0;
    _this2.details = void 0;
    _this2.code = code;
    _this2.details = details;
    return _this2;
  }

  return FetchError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/* harmony default export */ __webpack_exports__["default"] = (FetchLoader);

/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/*! exports provided: enableLogs, logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableLogs", function() { return enableLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
var noop = function noop() {};

var fakeLogger = {
  trace: noop,
  debug: noop,
  log: noop,
  warn: noop,
  info: noop,
  error: noop
};
var exportedLogger = fakeLogger; // let lastCallTime;
// function formatMsgWithTimeInfo(type, msg) {
//   const now = Date.now();
//   const diff = lastCallTime ? '+' + (now - lastCallTime) : '0';
//   lastCallTime = now;
//   msg = (new Date(now)).toISOString() + ' | [' +  type + '] > ' + msg + ' ( ' + diff + ' ms )';
//   return msg;
// }

function consolePrintFn(type) {
  var func = self.console[type];

  if (func) {
    return func.bind(self.console, "[" + type + "] >");
  }

  return noop;
}

function exportLoggerFunctions(debugConfig) {
  for (var _len = arguments.length, functions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    functions[_key - 1] = arguments[_key];
  }

  functions.forEach(function (type) {
    exportedLogger[type] = debugConfig[type] ? debugConfig[type].bind(debugConfig) : consolePrintFn(type);
  });
}

function enableLogs(debugConfig) {
  // check that console is available
  if (self.console && debugConfig === true || typeof debugConfig === 'object') {
    exportLoggerFunctions(debugConfig, // Remove out from list here to hard-disable a log-level
    // 'trace',
    'debug', 'log', 'info', 'warn', 'error'); // Some browsers don't allow to use bind on console object anyway
    // fallback to default if needed

    try {
      exportedLogger.log();
    } catch (e) {
      exportedLogger = fakeLogger;
    }
  } else {
    exportedLogger = fakeLogger;
  }
}
var logger = exportedLogger;

/***/ }),

/***/ "./src/utils/mediakeys-helper.ts":
/*!***************************************!*\
  !*** ./src/utils/mediakeys-helper.ts ***!
  \***************************************/
/*! exports provided: KeySystems, requestMediaKeySystemAccess */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeySystems", function() { return KeySystems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestMediaKeySystemAccess", function() { return requestMediaKeySystemAccess; });
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
 */
var KeySystems;

(function (KeySystems) {
  KeySystems["WIDEVINE"] = "com.widevine.alpha";
  KeySystems["PLAYREADY"] = "com.microsoft.playready";
})(KeySystems || (KeySystems = {}));

var requestMediaKeySystemAccess = function () {
  if (typeof self !== 'undefined' && self.navigator && self.navigator.requestMediaKeySystemAccess) {
    return self.navigator.requestMediaKeySystemAccess.bind(self.navigator);
  } else {
    return null;
  }
}();



/***/ }),

/***/ "./src/utils/mediasource-helper.ts":
/*!*****************************************!*\
  !*** ./src/utils/mediasource-helper.ts ***!
  \*****************************************/
/*! exports provided: getMediaSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMediaSource", function() { return getMediaSource; });
/**
 * MediaSource helper
 */
function getMediaSource() {
  return self.MediaSource || self.WebKitMediaSource;
}

/***/ }),

/***/ "./src/utils/mp4-tools.ts":
/*!********************************!*\
  !*** ./src/utils/mp4-tools.ts ***!
  \********************************/
/*! exports provided: bin2str, readUint16, readUint32, writeUint32, findBox, parseSegmentIndex, parseInitSegment, getStartDTS, getDuration, computeRawDurationFromSamples, offsetStartDTS, segmentValidRange, appendUint8Array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bin2str", function() { return bin2str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint16", function() { return readUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint32", function() { return readUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint32", function() { return writeUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findBox", function() { return findBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSegmentIndex", function() { return parseSegmentIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseInitSegment", function() { return parseInitSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStartDTS", function() { return getStartDTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDuration", function() { return getDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeRawDurationFromSamples", function() { return computeRawDurationFromSamples; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offsetStartDTS", function() { return offsetStartDTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "segmentValidRange", function() { return segmentValidRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendUint8Array", function() { return appendUint8Array; });
/* harmony import */ var _typed_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typed-array */ "./src/utils/typed-array.ts");
/* harmony import */ var _loader_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loader/fragment */ "./src/loader/fragment.ts");


var UINT32_MAX = Math.pow(2, 32) - 1;
var push = [].push;
function bin2str(data) {
  return String.fromCharCode.apply(null, data);
}
function readUint16(buffer, offset) {
  if ('data' in buffer) {
    offset += buffer.start;
    buffer = buffer.data;
  }

  var val = buffer[offset] << 8 | buffer[offset + 1];
  return val < 0 ? 65536 + val : val;
}
function readUint32(buffer, offset) {
  if ('data' in buffer) {
    offset += buffer.start;
    buffer = buffer.data;
  }

  var val = buffer[offset] << 24 | buffer[offset + 1] << 16 | buffer[offset + 2] << 8 | buffer[offset + 3];
  return val < 0 ? 4294967296 + val : val;
}
function writeUint32(buffer, offset, value) {
  if ('data' in buffer) {
    offset += buffer.start;
    buffer = buffer.data;
  }

  buffer[offset] = value >> 24;
  buffer[offset + 1] = value >> 16 & 0xff;
  buffer[offset + 2] = value >> 8 & 0xff;
  buffer[offset + 3] = value & 0xff;
} // Find the data for a box specified by its path

function findBox(input, path) {
  var results = [];

  if (!path.length) {
    // short-circuit the search for empty paths
    return results;
  }

  var data;
  var start;
  var end;

  if ('data' in input) {
    data = input.data;
    start = input.start;
    end = input.end;
  } else {
    data = input;
    start = 0;
    end = data.byteLength;
  }

  for (var i = start; i < end;) {
    var size = readUint32(data, i);
    var type = bin2str(data.subarray(i + 4, i + 8));
    var endbox = size > 1 ? i + size : end;

    if (type === path[0]) {
      if (path.length === 1) {
        // this is the end of the path and we've found the box we were
        // looking for
        results.push({
          data: data,
          start: i + 8,
          end: endbox
        });
      } else {
        // recursively search for the next box along the path
        var subresults = findBox({
          data: data,
          start: i + 8,
          end: endbox
        }, path.slice(1));

        if (subresults.length) {
          push.apply(results, subresults);
        }
      }
    }

    i = endbox;
  } // we've finished searching all of data


  return results;
}
function parseSegmentIndex(initSegment) {
  var moovBox = findBox(initSegment, ['moov']);
  var moov = moovBox[0];
  var moovEndOffset = moov ? moov.end : null; // we need this in case we need to chop of garbage of the end of current data

  var sidxBox = findBox(initSegment, ['sidx']);

  if (!sidxBox || !sidxBox[0]) {
    return null;
  }

  var references = [];
  var sidx = sidxBox[0];
  var version = sidx.data[0]; // set initial offset, we skip the reference ID (not needed)

  var index = version === 0 ? 8 : 16;
  var timescale = readUint32(sidx, index);
  index += 4; // TODO: parse earliestPresentationTime and firstOffset
  // usually zero in our case

  var earliestPresentationTime = 0;
  var firstOffset = 0;

  if (version === 0) {
    index += 8;
  } else {
    index += 16;
  } // skip reserved


  index += 2;
  var startByte = sidx.end + firstOffset;
  var referencesCount = readUint16(sidx, index);
  index += 2;

  for (var i = 0; i < referencesCount; i++) {
    var referenceIndex = index;
    var referenceInfo = readUint32(sidx, referenceIndex);
    referenceIndex += 4;
    var referenceSize = referenceInfo & 0x7fffffff;
    var referenceType = (referenceInfo & 0x80000000) >>> 31;

    if (referenceType === 1) {
      // eslint-disable-next-line no-console
      console.warn('SIDX has hierarchical references (not supported)');
      return null;
    }

    var subsegmentDuration = readUint32(sidx, referenceIndex);
    referenceIndex += 4;
    references.push({
      referenceSize: referenceSize,
      subsegmentDuration: subsegmentDuration,
      // unscaled
      info: {
        duration: subsegmentDuration / timescale,
        start: startByte,
        end: startByte + referenceSize - 1
      }
    });
    startByte += referenceSize; // Skipping 1 bit for |startsWithSap|, 3 bits for |sapType|, and 28 bits
    // for |sapDelta|.

    referenceIndex += 4; // skip to next ref

    index = referenceIndex;
  }

  return {
    earliestPresentationTime: earliestPresentationTime,
    timescale: timescale,
    version: version,
    referencesCount: referencesCount,
    references: references,
    moovEndOffset: moovEndOffset
  };
}
/**
 * Parses an MP4 initialization segment and extracts stream type and
 * timescale values for any declared tracks. Timescale values indicate the
 * number of clock ticks per second to assume for time-based values
 * elsewhere in the MP4.
 *
 * To determine the start time of an MP4, you need two pieces of
 * information: the timescale unit and the earliest base media decode
 * time. Multiple timescales can be specified within an MP4 but the
 * base media decode time is always expressed in the timescale from
 * the media header box for the track:
 * ```
 * moov > trak > mdia > mdhd.timescale
 * moov > trak > mdia > hdlr
 * ```
 * @param initSegment {Uint8Array} the bytes of the init segment
 * @return {InitData} a hash of track type to timescale values or null if
 * the init segment is malformed.
 */

function parseInitSegment(initSegment) {
  var result = [];
  var traks = findBox(initSegment, ['moov', 'trak']);

  for (var i = 0; i < traks.length; i++) {
    var trak = traks[i];
    var tkhd = findBox(trak, ['tkhd'])[0];

    if (tkhd) {
      var version = tkhd.data[tkhd.start];

      var _index = version === 0 ? 12 : 20;

      var trackId = readUint32(tkhd, _index);
      var mdhd = findBox(trak, ['mdia', 'mdhd'])[0];

      if (mdhd) {
        version = mdhd.data[mdhd.start];
        _index = version === 0 ? 12 : 20;
        var timescale = readUint32(mdhd, _index);
        var hdlr = findBox(trak, ['mdia', 'hdlr'])[0];

        if (hdlr) {
          var hdlrType = bin2str(hdlr.data.subarray(hdlr.start + 8, hdlr.start + 12));
          var type = {
            soun: _loader_fragment__WEBPACK_IMPORTED_MODULE_1__["ElementaryStreamTypes"].AUDIO,
            vide: _loader_fragment__WEBPACK_IMPORTED_MODULE_1__["ElementaryStreamTypes"].VIDEO
          }[hdlrType];

          if (type) {
            // Parse codec details
            var stsd = findBox(trak, ['mdia', 'minf', 'stbl', 'stsd'])[0];
            var codec = void 0;

            if (stsd) {
              codec = bin2str(stsd.data.subarray(stsd.start + 12, stsd.start + 16)); // TODO: Parse codec details to be able to build MIME type.
              // stsd.start += 8;
              // const codecBox = findBox(stsd, [codec])[0];
              // if (codecBox) {
              //   TODO: Codec parsing support for avc1, mp4a, hevc, av01...
              // }
            }

            result[trackId] = {
              timescale: timescale,
              type: type
            };
            result[type] = {
              timescale: timescale,
              id: trackId,
              codec: codec
            };
          }
        }
      }
    }
  }

  var trex = findBox(initSegment, ['moov', 'mvex', 'trex']);
  trex.forEach(function (trex) {
    var trackId = readUint32(trex, 4);
    var track = result[trackId];

    if (track) {
      track.default = {
        duration: readUint32(trex, 12),
        flags: readUint32(trex, 20)
      };
    }
  });
  return result;
}
/**
 * Determine the base media decode start time, in seconds, for an MP4
 * fragment. If multiple fragments are specified, the earliest time is
 * returned.
 *
 * The base media decode time can be parsed from track fragment
 * metadata:
 * ```
 * moof > traf > tfdt.baseMediaDecodeTime
 * ```
 * It requires the timescale value from the mdhd to interpret.
 *
 * @param initData {InitData} a hash of track type to timescale values
 * @param fmp4 {Uint8Array} the bytes of the mp4 fragment
 * @return {number} the earliest base media decode start time for the
 * fragment, in seconds
 */

function getStartDTS(initData, fmp4) {
  // we need info from two children of each track fragment box
  return findBox(fmp4, ['moof', 'traf']).reduce(function (result, traf) {
    var tfdt = findBox(traf, ['tfdt'])[0];
    var version = tfdt.data[tfdt.start];
    var start = findBox(traf, ['tfhd']).reduce(function (result, tfhd) {
      // get the track id from the tfhd
      var id = readUint32(tfhd, 4);
      var track = initData[id];

      if (track) {
        var baseTime = readUint32(tfdt, 4);

        if (version === 1) {
          baseTime *= Math.pow(2, 32);
          baseTime += readUint32(tfdt, 8);
        } // assume a 90kHz clock if no timescale was specified


        var scale = track.timescale || 90e3; // convert base time to seconds

        var startTime = baseTime / scale;

        if (isFinite(startTime) && (result === null || startTime < result)) {
          return startTime;
        }
      }

      return result;
    }, null);

    if (start !== null && isFinite(start) && (result === null || start < result)) {
      return start;
    }

    return result;
  }, null) || 0;
}
/*
  For Reference:
  aligned(8) class TrackFragmentHeaderBox
           extends FullBox(‘tfhd’, 0, tf_flags){
     unsigned int(32)  track_ID;
     // all the following are optional fields
     unsigned int(64)  base_data_offset;
     unsigned int(32)  sample_description_index;
     unsigned int(32)  default_sample_duration;
     unsigned int(32)  default_sample_size;
     unsigned int(32)  default_sample_flags
  }
 */

function getDuration(data, initData) {
  var rawDuration = 0;
  var videoDuration = 0;
  var audioDuration = 0;
  var trafs = findBox(data, ['moof', 'traf']);

  for (var i = 0; i < trafs.length; i++) {
    var traf = trafs[i]; // There is only one tfhd & trun per traf
    // This is true for CMAF style content, and we should perhaps check the ftyp
    // and only look for a single trun then, but for ISOBMFF we should check
    // for multiple track runs.

    var tfhd = findBox(traf, ['tfhd'])[0]; // get the track id from the tfhd

    var id = readUint32(tfhd, 4);
    var track = initData[id];

    if (!track) {
      continue;
    }

    var trackDefault = track.default;
    var tfhdFlags = readUint32(tfhd, 0) | (trackDefault === null || trackDefault === void 0 ? void 0 : trackDefault.flags);
    var sampleDuration = trackDefault === null || trackDefault === void 0 ? void 0 : trackDefault.duration;

    if (tfhdFlags & 0x000008) {
      // 0x000008 indicates the presence of the default_sample_duration field
      if (tfhdFlags & 0x000002) {
        // 0x000002 indicates the presence of the sample_description_index field, which precedes default_sample_duration
        // If present, the default_sample_duration exists at byte offset 12
        sampleDuration = readUint32(tfhd, 12);
      } else {
        // Otherwise, the duration is at byte offset 8
        sampleDuration = readUint32(tfhd, 8);
      }
    } // assume a 90kHz clock if no timescale was specified


    var timescale = track.timescale || 90e3;
    var truns = findBox(traf, ['trun']);

    for (var j = 0; j < truns.length; j++) {
      if (sampleDuration) {
        var sampleCount = readUint32(truns[j], 4);
        rawDuration = sampleDuration * sampleCount;
      } else {
        rawDuration = computeRawDurationFromSamples(truns[j]);
      }

      if (track.type === _loader_fragment__WEBPACK_IMPORTED_MODULE_1__["ElementaryStreamTypes"].VIDEO) {
        videoDuration += rawDuration / timescale;
      } else if (track.type === _loader_fragment__WEBPACK_IMPORTED_MODULE_1__["ElementaryStreamTypes"].AUDIO) {
        audioDuration += rawDuration / timescale;
      }
    }
  }

  if (videoDuration === 0 && audioDuration === 0) {
    // If duration samples are not available in the traf use sidx subsegment_duration
    var sidx = parseSegmentIndex(data);

    if (sidx !== null && sidx !== void 0 && sidx.references) {
      return sidx.references.reduce(function (dur, ref) {
        return dur + ref.info.duration || 0;
      }, 0);
    }
  }

  if (videoDuration) {
    return videoDuration;
  }

  return audioDuration;
}
/*
  For Reference:
  aligned(8) class TrackRunBox
           extends FullBox(‘trun’, version, tr_flags) {
     unsigned int(32)  sample_count;
     // the following are optional fields
     signed int(32) data_offset;
     unsigned int(32)  first_sample_flags;
     // all fields in the following array are optional
     {
        unsigned int(32)  sample_duration;
        unsigned int(32)  sample_size;
        unsigned int(32)  sample_flags
        if (version == 0)
           { unsigned int(32)
        else
           { signed int(32)
     }[ sample_count ]
  }
 */

function computeRawDurationFromSamples(trun) {
  var flags = readUint32(trun, 0); // Flags are at offset 0, non-optional sample_count is at offset 4. Therefore we start 8 bytes in.
  // Each field is an int32, which is 4 bytes

  var offset = 8; // data-offset-present flag

  if (flags & 0x000001) {
    offset += 4;
  } // first-sample-flags-present flag


  if (flags & 0x000004) {
    offset += 4;
  }

  var duration = 0;
  var sampleCount = readUint32(trun, 4);

  for (var i = 0; i < sampleCount; i++) {
    // sample-duration-present flag
    if (flags & 0x000100) {
      var sampleDuration = readUint32(trun, offset);
      duration += sampleDuration;
      offset += 4;
    } // sample-size-present flag


    if (flags & 0x000200) {
      offset += 4;
    } // sample-flags-present flag


    if (flags & 0x000400) {
      offset += 4;
    } // sample-composition-time-offsets-present flag


    if (flags & 0x000800) {
      offset += 4;
    }
  }

  return duration;
}
function offsetStartDTS(initData, fmp4, timeOffset) {
  findBox(fmp4, ['moof', 'traf']).forEach(function (traf) {
    findBox(traf, ['tfhd']).forEach(function (tfhd) {
      // get the track id from the tfhd
      var id = readUint32(tfhd, 4);
      var track = initData[id];

      if (!track) {
        return;
      } // assume a 90kHz clock if no timescale was specified


      var timescale = track.timescale || 90e3; // get the base media decode time from the tfdt

      findBox(traf, ['tfdt']).forEach(function (tfdt) {
        var version = tfdt.data[tfdt.start];
        var baseMediaDecodeTime = readUint32(tfdt, 4);

        if (version === 0) {
          writeUint32(tfdt, 4, baseMediaDecodeTime - timeOffset * timescale);
        } else {
          baseMediaDecodeTime *= Math.pow(2, 32);
          baseMediaDecodeTime += readUint32(tfdt, 8);
          baseMediaDecodeTime -= timeOffset * timescale;
          baseMediaDecodeTime = Math.max(baseMediaDecodeTime, 0);
          var upper = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1));
          var lower = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
          writeUint32(tfdt, 4, upper);
          writeUint32(tfdt, 8, lower);
        }
      });
    });
  });
} // TODO: Check if the last moof+mdat pair is part of the valid range

function segmentValidRange(data) {
  var segmentedRange = {
    valid: null,
    remainder: null
  };
  var moofs = findBox(data, ['moof']);

  if (!moofs) {
    return segmentedRange;
  } else if (moofs.length < 2) {
    segmentedRange.remainder = data;
    return segmentedRange;
  }

  var last = moofs[moofs.length - 1]; // Offset by 8 bytes; findBox offsets the start by as much

  segmentedRange.valid = Object(_typed_array__WEBPACK_IMPORTED_MODULE_0__["sliceUint8"])(data, 0, last.start - 8);
  segmentedRange.remainder = Object(_typed_array__WEBPACK_IMPORTED_MODULE_0__["sliceUint8"])(data, last.start - 8);
  return segmentedRange;
}
function appendUint8Array(data1, data2) {
  var temp = new Uint8Array(data1.length + data2.length);
  temp.set(data1);
  temp.set(data2, data1.length);
  return temp;
}

/***/ }),

/***/ "./src/utils/texttrack-utils.ts":
/*!**************************************!*\
  !*** ./src/utils/texttrack-utils.ts ***!
  \**************************************/
/*! exports provided: sendAddTrackEvent, addCueToTrack, clearCurrentCues, removeCuesInRange, getCuesInRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendAddTrackEvent", function() { return sendAddTrackEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCueToTrack", function() { return addCueToTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCurrentCues", function() { return clearCurrentCues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCuesInRange", function() { return removeCuesInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCuesInRange", function() { return getCuesInRange; });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./src/utils/logger.ts");

function sendAddTrackEvent(track, videoEl) {
  var event;

  try {
    event = new Event('addtrack');
  } catch (err) {
    // for IE11
    event = document.createEvent('Event');
    event.initEvent('addtrack', false, false);
  }

  event.track = track;
  videoEl.dispatchEvent(event);
}
function addCueToTrack(track, cue) {
  // Sometimes there are cue overlaps on segmented vtts so the same
  // cue can appear more than once in different vtt files.
  // This avoid showing duplicated cues with same timecode and text.
  var mode = track.mode;

  if (mode === 'disabled') {
    track.mode = 'hidden';
  }

  if (track.cues && !track.cues.getCueById(cue.id)) {
    try {
      track.addCue(cue);

      if (!track.cues.getCueById(cue.id)) {
        throw new Error("addCue is failed for: " + cue);
      }
    } catch (err) {
      _logger__WEBPACK_IMPORTED_MODULE_0__["logger"].debug("[texttrack-utils]: " + err);
      var textTrackCue = new self.TextTrackCue(cue.startTime, cue.endTime, cue.text);
      textTrackCue.id = cue.id;
      track.addCue(textTrackCue);
    }
  }

  if (mode === 'disabled') {
    track.mode = mode;
  }
}
function clearCurrentCues(track) {
  // When track.mode is disabled, track.cues will be null.
  // To guarantee the removal of cues, we need to temporarily
  // change the mode to hidden
  var mode = track.mode;

  if (mode === 'disabled') {
    track.mode = 'hidden';
  }

  if (track.cues) {
    for (var i = track.cues.length; i--;) {
      track.removeCue(track.cues[i]);
    }
  }

  if (mode === 'disabled') {
    track.mode = mode;
  }
}
function removeCuesInRange(track, start, end) {
  var mode = track.mode;

  if (mode === 'disabled') {
    track.mode = 'hidden';
  }

  if (track.cues && track.cues.length > 0) {
    var cues = getCuesInRange(track.cues, start, end);

    for (var i = 0; i < cues.length; i++) {
      track.removeCue(cues[i]);
    }
  }

  if (mode === 'disabled') {
    track.mode = mode;
  }
} // Find first cue starting after given time.
// Modified version of binary search O(log(n)).

function getFirstCueIndexAfterTime(cues, time) {
  // If first cue starts after time, start there
  if (time < cues[0].startTime) {
    return 0;
  } // If the last cue ends before time there is no overlap


  var len = cues.length - 1;

  if (time > cues[len].endTime) {
    return -1;
  }

  var left = 0;
  var right = len;

  while (left <= right) {
    var mid = Math.floor((right + left) / 2);

    if (time < cues[mid].startTime) {
      right = mid - 1;
    } else if (time > cues[mid].startTime && left < len) {
      left = mid + 1;
    } else {
      // If it's not lower or higher, it must be equal.
      return mid;
    }
  } // At this point, left and right have swapped.
  // No direct match was found, left or right element must be the closest. Check which one has the smallest diff.


  return cues[left].startTime - time < time - cues[right].startTime ? left : right;
}

function getCuesInRange(cues, start, end) {
  var cuesFound = [];
  var firstCueInRange = getFirstCueIndexAfterTime(cues, start);

  if (firstCueInRange > -1) {
    for (var i = firstCueInRange, len = cues.length; i < len; i++) {
      var cue = cues[i];

      if (cue.startTime >= start && cue.endTime <= end) {
        cuesFound.push(cue);
      } else if (cue.startTime > end) {
        return cuesFound;
      }
    }
  }

  return cuesFound;
}

/***/ }),

/***/ "./src/utils/time-ranges.ts":
/*!**********************************!*\
  !*** ./src/utils/time-ranges.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 *  TimeRanges to string helper
 */
var TimeRanges = {
  toString: function toString(r) {
    var log = '';
    var len = r.length;

    for (var i = 0; i < len; i++) {
      log += '[' + r.start(i).toFixed(3) + ',' + r.end(i).toFixed(3) + ']';
    }

    return log;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (TimeRanges);

/***/ }),

/***/ "./src/utils/timescale-conversion.ts":
/*!*******************************************!*\
  !*** ./src/utils/timescale-conversion.ts ***!
  \*******************************************/
/*! exports provided: toTimescaleFromBase, toTimescaleFromScale, toMsFromMpegTsClock, toMpegTsClockFromTimescale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTimescaleFromBase", function() { return toTimescaleFromBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTimescaleFromScale", function() { return toTimescaleFromScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toMsFromMpegTsClock", function() { return toMsFromMpegTsClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toMpegTsClockFromTimescale", function() { return toMpegTsClockFromTimescale; });
var MPEG_TS_CLOCK_FREQ_HZ = 90000;
function toTimescaleFromBase(value, destScale, srcBase, round) {
  if (srcBase === void 0) {
    srcBase = 1;
  }

  if (round === void 0) {
    round = false;
  }

  var result = value * destScale * srcBase; // equivalent to `(value * scale) / (1 / base)`

  return round ? Math.round(result) : result;
}
function toTimescaleFromScale(value, destScale, srcScale, round) {
  if (srcScale === void 0) {
    srcScale = 1;
  }

  if (round === void 0) {
    round = false;
  }

  return toTimescaleFromBase(value, destScale, 1 / srcScale, round);
}
function toMsFromMpegTsClock(value, round) {
  if (round === void 0) {
    round = false;
  }

  return toTimescaleFromBase(value, 1000, 1 / MPEG_TS_CLOCK_FREQ_HZ, round);
}
function toMpegTsClockFromTimescale(value, srcScale) {
  if (srcScale === void 0) {
    srcScale = 1;
  }

  return toTimescaleFromBase(value, MPEG_TS_CLOCK_FREQ_HZ, 1 / srcScale);
}

/***/ }),

/***/ "./src/utils/typed-array.ts":
/*!**********************************!*\
  !*** ./src/utils/typed-array.ts ***!
  \**********************************/
/*! exports provided: sliceUint8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sliceUint8", function() { return sliceUint8; });
function sliceUint8(array, start, end) {
  // @ts-expect-error This polyfills IE11 usage of Uint8Array slice.
  // It always exists in the TypeScript definition so fails, but it fails at runtime on IE11.
  return Uint8Array.prototype.slice ? array.slice(start, end) : new Uint8Array(Array.prototype.slice.call(array, start, end));
}

/***/ }),

/***/ "./src/utils/xhr-loader.ts":
/*!*********************************!*\
  !*** ./src/utils/xhr-loader.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
/* harmony import */ var _loader_load_stats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loader/load-stats */ "./src/loader/load-stats.ts");


var AGE_HEADER_LINE_REGEX = /^age:\s*[\d.]+\s*$/m;

var XhrLoader = /*#__PURE__*/function () {
  function XhrLoader(config
  /* HlsConfig */
  ) {
    this.xhrSetup = void 0;
    this.requestTimeout = void 0;
    this.retryTimeout = void 0;
    this.retryDelay = void 0;
    this.config = null;
    this.callbacks = null;
    this.context = void 0;
    this.loader = null;
    this.stats = void 0;
    this.xhrSetup = config ? config.xhrSetup : null;
    this.stats = new _loader_load_stats__WEBPACK_IMPORTED_MODULE_1__["LoadStats"]();
    this.retryDelay = 0;
  }

  var _proto = XhrLoader.prototype;

  _proto.destroy = function destroy() {
    this.callbacks = null;
    this.abortInternal();
    this.loader = null;
    this.config = null;
  };

  _proto.abortInternal = function abortInternal() {
    var loader = this.loader;
    self.clearTimeout(this.requestTimeout);
    self.clearTimeout(this.retryTimeout);

    if (loader) {
      loader.onreadystatechange = null;
      loader.onprogress = null;

      if (loader.readyState !== 4) {
        this.stats.aborted = true;
        loader.abort();
      }
    }
  };

  _proto.abort = function abort() {
    var _this$callbacks;

    this.abortInternal();

    if ((_this$callbacks = this.callbacks) !== null && _this$callbacks !== void 0 && _this$callbacks.onAbort) {
      this.callbacks.onAbort(this.stats, this.context, this.loader);
    }
  };

  _proto.load = function load(context, config, callbacks) {
    if (this.stats.loading.start) {
      throw new Error('Loader can only be used once.');
    }

    this.stats.loading.start = self.performance.now();
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.retryDelay = config.retryDelay;
    this.loadInternal();
  };

  _proto.loadInternal = function loadInternal() {
    var config = this.config,
        context = this.context;

    if (!config) {
      return;
    }

    var xhr = this.loader = new self.XMLHttpRequest();
    var stats = this.stats;
    stats.loading.first = 0;
    stats.loaded = 0;
    var xhrSetup = this.xhrSetup;

    try {
      if (xhrSetup) {
        try {
          xhrSetup(xhr, context.url);
        } catch (e) {
          // fix xhrSetup: (xhr, url) => {xhr.setRequestHeader("Content-Language", "test");}
          // not working, as xhr.setRequestHeader expects xhr.readyState === OPEN
          xhr.open('GET', context.url, true);
          xhrSetup(xhr, context.url);
        }
      }

      if (!xhr.readyState) {
        xhr.open('GET', context.url, true);
      }

      var headers = this.context.headers;

      if (headers) {
        for (var header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }
    } catch (e) {
      // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
      this.callbacks.onError({
        code: xhr.status,
        text: e.message
      }, context, xhr);
      return;
    }

    if (context.rangeEnd) {
      xhr.setRequestHeader('Range', 'bytes=' + context.rangeStart + '-' + (context.rangeEnd - 1));
    }

    xhr.onreadystatechange = this.readystatechange.bind(this);
    xhr.onprogress = this.loadprogress.bind(this);
    xhr.responseType = context.responseType; // setup timeout before we perform request

    self.clearTimeout(this.requestTimeout);
    this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), config.timeout);
    xhr.send();
  };

  _proto.readystatechange = function readystatechange() {
    var context = this.context,
        xhr = this.loader,
        stats = this.stats;

    if (!context || !xhr) {
      return;
    }

    var readyState = xhr.readyState;
    var config = this.config; // don't proceed if xhr has been aborted

    if (stats.aborted) {
      return;
    } // >= HEADERS_RECEIVED


    if (readyState >= 2) {
      // clear xhr timeout and rearm it if readyState less than 4
      self.clearTimeout(this.requestTimeout);

      if (stats.loading.first === 0) {
        stats.loading.first = Math.max(self.performance.now(), stats.loading.start);
      }

      if (readyState === 4) {
        xhr.onreadystatechange = null;
        xhr.onprogress = null;
        var status = xhr.status; // http status between 200 to 299 are all successful

        if (status >= 200 && status < 300) {
          stats.loading.end = Math.max(self.performance.now(), stats.loading.first);
          var data;
          var len;

          if (context.responseType === 'arraybuffer') {
            data = xhr.response;
            len = data.byteLength;
          } else {
            data = xhr.responseText;
            len = data.length;
          }

          stats.loaded = stats.total = len;

          if (!this.callbacks) {
            return;
          }

          var onProgress = this.callbacks.onProgress;

          if (onProgress) {
            onProgress(stats, context, data, xhr);
          }

          if (!this.callbacks) {
            return;
          }

          var response = {
            url: xhr.responseURL,
            data: data
          };
          this.callbacks.onSuccess(response, stats, context, xhr);
        } else {
          // if max nb of retries reached or if http status between 400 and 499 (such error cannot be recovered, retrying is useless), return error
          if (stats.retry >= config.maxRetry || status >= 400 && status < 499) {
            _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].error(status + " while loading " + context.url);
            this.callbacks.onError({
              code: status,
              text: xhr.statusText
            }, context, xhr);
          } else {
            // retry
            _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].warn(status + " while loading " + context.url + ", retrying in " + this.retryDelay + "..."); // abort and reset internal state

            this.abortInternal();
            this.loader = null; // schedule retry

            self.clearTimeout(this.retryTimeout);
            this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay); // set exponential backoff

            this.retryDelay = Math.min(2 * this.retryDelay, config.maxRetryDelay);
            stats.retry++;
          }
        }
      } else {
        // readyState >= 2 AND readyState !==4 (readyState = HEADERS_RECEIVED || LOADING) rearm timeout as xhr not finished yet
        self.clearTimeout(this.requestTimeout);
        this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), config.timeout);
      }
    }
  };

  _proto.loadtimeout = function loadtimeout() {
    _utils_logger__WEBPACK_IMPORTED_MODULE_0__["logger"].warn("timeout while loading " + this.context.url);
    var callbacks = this.callbacks;

    if (callbacks) {
      this.abortInternal();
      callbacks.onTimeout(this.stats, this.context, this.loader);
    }
  };

  _proto.loadprogress = function loadprogress(event) {
    var stats = this.stats;
    stats.loaded = event.loaded;

    if (event.lengthComputable) {
      stats.total = event.total;
    }
  };

  _proto.getCacheAge = function getCacheAge() {
    var result = null;

    if (this.loader && AGE_HEADER_LINE_REGEX.test(this.loader.getAllResponseHeaders())) {
      var ageHeader = this.loader.getResponseHeader('age');
      result = ageHeader ? parseFloat(ageHeader) : null;
    }

    return result;
  };

  return XhrLoader;
}();

/* harmony default export */ __webpack_exports__["default"] = (XhrLoader);

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=hls.light.js.map