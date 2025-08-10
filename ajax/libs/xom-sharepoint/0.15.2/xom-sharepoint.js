// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"fcMS":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"P8NW":[function(require,module,exports) {
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

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"IxO8":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"EDTP":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"S1cf":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":"EDTP"}],"H6Qo":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"S1cf"}],"rj2i":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"S1cf"}],"woEt":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"S1cf"}],"V30M":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"M8l6":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"S1cf"}],"YdsM":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"bIiH":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"YdsM"}],"aS8y":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"bIiH"}],"dn2M":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"S1cf"}],"YZjV":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"a2Uu":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"KxkP":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"YZjV","../helpers/combineURLs":"a2Uu"}],"ZeD7":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"S1cf"}],"w7LF":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"S1cf"}],"KRuG":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"S1cf","./../core/settle":"aS8y","./../helpers/cookies":"dn2M","./../helpers/buildURL":"H6Qo","../core/buildFullPath":"KxkP","./../helpers/parseHeaders":"ZeD7","./../helpers/isURLSameOrigin":"w7LF","../core/createError":"bIiH"}],"pBGv":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
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
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
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

  while (len) {
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
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
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

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"BXyq":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"S1cf","./helpers/normalizeHeaderName":"M8l6","./adapters/xhr":"KRuG","./adapters/http":"KRuG","process":"pBGv"}],"uz6X":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"S1cf","./transformData":"woEt","../cancel/isCancel":"V30M","../defaults":"BXyq"}],"OHvn":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":"S1cf"}],"OvAf":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"S1cf","../helpers/buildURL":"H6Qo","./InterceptorManager":"rj2i","./dispatchRequest":"uz6X","./mergeConfig":"OHvn"}],"mIKj":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"tsWd":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"mIKj"}],"X8jb":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"wICU":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],"nUiQ":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"S1cf","./helpers/bind":"EDTP","./core/Axios":"OvAf","./core/mergeConfig":"OHvn","./defaults":"BXyq","./cancel/Cancel":"mIKj","./cancel/CancelToken":"tsWd","./cancel/isCancel":"V30M","./helpers/spread":"X8jb","./helpers/isAxiosError":"wICU"}],"dZBD":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"nUiQ"}],"agGE":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"QVnC":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"PMvg":[function(require,module,exports) {
module.exports = require("regenerator-runtime");
},{"regenerator-runtime":"QVnC"}],"IHXa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseApiUri = void 0;
/**
 * Return the base API URI
 */

function baseApiUri() {
  return '/_api/web';
}

exports.baseApiUri = baseApiUri;
},{}],"J6GP":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict'; // If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;

  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};
},{}],"bvhO":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }

  return res;
};
},{}],"fk5h":[function(require,module,exports) {
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');
},{"./decode":"J6GP","./encode":"bvhO"}],"YTeX":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var querystring_1 = __importDefault(require("querystring"));
/**
 * Converts possible query string inputs into
 */


function stringifyQuery(query) {
  if (!query) {
    return '';
  }

  if (typeof query === 'string') {
    return query[0] === '$' ? "?".concat(query) : query;
  }

  return "?".concat(querystring_1.default.stringify(query));
}

exports.default = stringifyQuery;
},{"querystring":"fk5h"}],"KYSm":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileByUrl = exports.newFileToFolder = exports.filesInFolder = exports.foldersInFolder = exports.folderByUrl = exports.index = void 0;

var common_1 = require("./common");

var stringifyQuery_1 = __importDefault(require("../utils/stringifyQuery"));
/**
 * Return URI for all the libraries
 */


function index(query) {
  return "".concat(common_1.baseApiUri(), "/Folders").concat(stringifyQuery_1.default(query));
}

exports.index = index;
/**
 * Return URI to access folder by relative URL
 */

function folderByUrl(relativeUrl) {
  return "".concat(common_1.baseApiUri(), "/GetFolderByServerRelativeUrl('").concat(relativeUrl, "')");
}

exports.folderByUrl = folderByUrl;
/**
 * Return URL to list of folders within a given folder
 */

function foldersInFolder(relativeUrl, query) {
  return "".concat(folderByUrl(relativeUrl), "/Folders").concat(stringifyQuery_1.default(query));
}

exports.foldersInFolder = foldersInFolder;
/**
 * Return URL to list of files within a given folder
 */

function filesInFolder(relativeUrl, query) {
  return "".concat(folderByUrl(relativeUrl), "/Files").concat(stringifyQuery_1.default(query));
}

exports.filesInFolder = filesInFolder;
/**
 * Return URL to upload a file to a folder
 */

function newFileToFolder(relativeUrl, fileName) {
  var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return "".concat(filesInFolder(relativeUrl), "/Add(overwrite=").concat(overwrite, ",url='").concat(fileName, "')");
}

exports.newFileToFolder = newFileToFolder;
/**
 * Return URI to access files by relative URL
 */

function fileByUrl(relativeUrl) {
  return "".concat(common_1.baseApiUri(), "/GetFileByServerRelativeUrl('").concat(relativeUrl, "')");
}

exports.fileByUrl = fileByUrl;
},{"./common":"IHXa","../utils/stringifyQuery":"YTeX"}],"Moj9":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemAttachmentsRename = exports.itemAttachmentsUpload = exports.itemAttachmentByName = exports.itemAttachments = exports.itemById = exports.items = exports.fields = exports.byTitle = exports.index = void 0;

var common_1 = require("./common");

var folders = __importStar(require("./folders"));

var stringifyQuery_1 = __importDefault(require("../utils/stringifyQuery"));
/**
 * Return URI to get all lists metadata
 */


function index(query) {
  return "".concat(common_1.baseApiUri(), "/Lists").concat(stringifyQuery_1.default(query));
}

exports.index = index;
/**
 * Return URI to get a given list metadata
 */

function byTitle(listTitle, query) {
  return "".concat(index(), "/GetByTitle('").concat(listTitle, "')").concat(stringifyQuery_1.default(query));
}

exports.byTitle = byTitle;
/**
 * Return URI to get a given list fields
 */

function fields(listTitle, query) {
  return "".concat(byTitle(listTitle), "/Fields").concat(stringifyQuery_1.default(query));
}

exports.fields = fields;
/**
 * Return URI to get a given list items
 */

function items(listTitle, query) {
  return "".concat(byTitle(listTitle), "/Items").concat(stringifyQuery_1.default(query));
}

exports.items = items;
/**
 * Return URI to get an specific list item
 */

function itemById(listTitle, itemId, query) {
  return items(listTitle, "(".concat(itemId, ")").concat(stringifyQuery_1.default(query)));
}

exports.itemById = itemById;
/**
 * Return URI to handle list items attachments
 */

function itemAttachments(listTitle, itemId) {
  return "".concat(itemById(listTitle, itemId), "/AttachmentFiles");
}

exports.itemAttachments = itemAttachments;
/**
 * Return URI to handle list items attachments
 */

function itemAttachmentByName(listTitle, itemId, fileName) {
  return "".concat(itemById(listTitle, itemId), "/AttachmentFiles/GetByFileName('").concat(fileName, "')");
}

exports.itemAttachmentByName = itemAttachmentByName;
/**
 * Return URI to handle upload of list items attachments
 */

function itemAttachmentsUpload(listTitle, itemId, fileName) {
  return "".concat(itemAttachments(listTitle, itemId), "/Add(filename='").concat(fileName, "')");
}

exports.itemAttachmentsUpload = itemAttachmentsUpload;
/**
 * Return URI to handle renaming of list items attachments
 */

function itemAttachmentsRename(oldFileUrl, newFileUrl) {
  return "".concat(folders.fileByUrl(oldFileUrl), "/MoveTo(newurl='").concat(newFileUrl, "',flags=1)");
}

exports.itemAttachmentsRename = itemAttachmentsRename;
},{"./common":"IHXa","./folders":"KYSm","../utils/stringifyQuery":"YTeX"}],"LEc5":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byId = exports.listItems = exports.listFields = exports.listMetadata = exports.current = void 0;

var common_1 = require("./common");

var stringifyQuery_1 = __importDefault(require("../utils/stringifyQuery"));
/**
 * Return URI to get basic information for current user
 */


function current() {
  return "".concat(common_1.baseApiUri(), "/CurrentUser");
}

exports.current = current;
/**
 * Return URI to get users list metadata
 */

function listMetadata() {
  return "".concat(common_1.baseApiUri(), "/SiteUserInfoList");
}

exports.listMetadata = listMetadata;
/**
 * Return URI to get users list fields
 */

function listFields(query) {
  return "".concat(listMetadata(), "/Fields").concat(stringifyQuery_1.default(query));
}

exports.listFields = listFields;
/**
 * Return URI to get users records
 */

function listItems(query) {
  return "".concat(listMetadata(), "/Items").concat(stringifyQuery_1.default(query));
}

exports.listItems = listItems;
/**
 * Return URI to get a given user information
 */

function byId(id) {
  return "".concat(listMetadata(), "/Items(").concat(id, ")");
}

exports.byId = byId;
},{"./common":"IHXa","../utils/stringifyQuery":"YTeX"}],"Nvoz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regionalSettings = exports.recycleBin = exports.parentSite = exports.contextInfo = exports.resources = exports.info = void 0;

var common_1 = require("./common");
/**
 * Return URI for site metadata
 */


function info() {
  return common_1.baseApiUri();
}

exports.info = info;
/**
 * Return URI for site metadata
 */

function resources() {
  return common_1.baseApiUri();
}

exports.resources = resources;
/**
 * Return URI for site context information
 */

function contextInfo() {
  return '/_api/ContextInfo';
}

exports.contextInfo = contextInfo;
/**
 * Return URI for site's parent info
 */

function parentSite() {
  return "".concat(common_1.baseApiUri(), "/ParentWeb");
}

exports.parentSite = parentSite;
/**
 * Return URI for site's recycle bin
 */

function recycleBin() {
  return "".concat(common_1.baseApiUri(), "/RecycleBin");
}

exports.recycleBin = recycleBin;
/**
 * Return URI for site regional settings
 */

function regionalSettings() {
  return "".concat(common_1.baseApiUri(), "/RegionalSettings");
}

exports.regionalSettings = regionalSettings;
},{"./common":"IHXa"}],"D7Ve":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.site = exports.users = exports.lists = exports.folders = void 0;
exports.folders = __importStar(require("./folders"));
exports.lists = __importStar(require("./lists"));
exports.users = __importStar(require("./users"));
exports.site = __importStar(require("./site"));
},{"./folders":"KYSm","./lists":"Moj9","./users":"LEc5","./site":"Nvoz"}],"t2zx":[function(require,module,exports) {
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"U8F3":[function(require,module,exports) {
var objectWithoutPropertiesLoose = require("./objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./objectWithoutPropertiesLoose.js":"t2zx"}],"HzIh":[function(require,module,exports) {
"use strict";

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _excluded = ["data"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Taxes an AxiosResponse and rewrap it as a XomApiRawResponse object.
 */

function rewrapResponse(response) {
  var data = response.data,
      metadata = (0, _objectWithoutProperties2.default)(response, _excluded);
  var newResponse = data || {};
  Object.defineProperty(newResponse, '__response', {
    value: metadata,
    writable: true
  });
  return newResponse;
}

exports.default = rewrapResponse;
},{"@babel/runtime/helpers/objectWithoutProperties":"U8F3"}],"mdjm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SMALL_PICTURE_CODE = '_SThumb';
var MEDIUM_PICTURE_CODE = '_MThumb';
var LARGE_PICTURE_CODE = '_LThumb';
/**
 * Properly expands picture size URL options for given object property.
 */

function expandPictureURL(userObject) {
  if (userObject) {
    var _userObject$Picture;

    var url = (_userObject$Picture = userObject.Picture) === null || _userObject$Picture === void 0 ? void 0 : _userObject$Picture.Url; // encodeURI(userObject.Picture.Url)

    var targetExpression = new RegExp("".concat(SMALL_PICTURE_CODE, "|").concat(MEDIUM_PICTURE_CODE, "|").concat(LARGE_PICTURE_CODE), 'i');
    userObject.Picture = {
      Small: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, SMALL_PICTURE_CODE)) || null,
      Medium: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, MEDIUM_PICTURE_CODE)) || null,
      Large: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, LARGE_PICTURE_CODE)) || null
    };
  }

  return userObject;
}

exports.default = expandPictureURL;
},{}],"IVdQ":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileToFolder = exports.getFileByUrl = exports.getFilesInFolder = exports.createFolder = exports.getFoldersInFolder = exports.getFolderByUrl = exports.getFolders = exports.deleteListItemAttachment = exports.renameListItemAttachment = exports.uploadListItemAttachment = exports.getListItemAttachments = exports.deleteListItem = exports.patchListItem = exports.postListItem = exports.getListItemById = exports.getListItems = exports.getListFields = exports.getListItemType = exports.getListByTitle = exports.deleteList = exports.createList = exports.getLists = exports.getSiteUserById = exports.getSiteUsersListItems = exports.getSiteUsersListFields = exports.getSiteUsersList = exports.getSiteCurrentUser = exports.getSiteRegionalSettings = exports.getSiteRecycleBin = exports.getSiteParent = exports.getRequestDigest = exports.getSite = void 0;

var endpoints = __importStar(require("../endpoints"));

var rewrapResponse_1 = __importDefault(require("../utils/rewrapResponse"));

var expandPictureURL_1 = __importDefault(require("../utils/expandPictureURL"));
/**
 * Fetch site root API
 */


function getSite(http) {
  var uri = endpoints.site.info();
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getSite = getSite;
/**
 * Fetch site context API for the request digest
 */

function getRequestDigest(_x) {
  return _getRequestDigest.apply(this, arguments);
}

function _getRequestDigest() {
  _getRequestDigest = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(http) {
    var uri, response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uri = endpoints.site.contextInfo();
            _context.next = 3;
            return http.post(uri, null, {
              digest: false
            }).then(rewrapResponse_1.default);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.FormDigestValue || response.GetContextWebInformation.FormDigestValue);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getRequestDigest.apply(this, arguments);
}

exports.getRequestDigest = getRequestDigest;
/**
 * Fetch for site parent metadata
 */

function getSiteParent(http) {
  var uri = endpoints.site.parentSite();
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getSiteParent = getSiteParent;
/**
 * Fetch list of content in site Recycle Bin
 */

function getSiteRecycleBin(http) {
  var uri = endpoints.site.recycleBin();
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getSiteRecycleBin = getSiteRecycleBin;
/**
 * Fetch for site Regional Settings
 */

function getSiteRegionalSettings(http) {
  var uri = endpoints.site.regionalSettings();
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getSiteRegionalSettings = getSiteRegionalSettings;
/**
 * Fetch for basic current user information
 */

function getSiteCurrentUser(http) {
  var uri = endpoints.users.current();
  return http.get(uri).then(rewrapResponse_1.default).then(expandPictureURL_1.default);
}

exports.getSiteCurrentUser = getSiteCurrentUser;
/**
 * Fetch list metadata for site users
 */

function getSiteUsersList(http) {
  var uri = endpoints.users.listMetadata();
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getSiteUsersList = getSiteUsersList;
/**
 * Fetch list fields metadata for site users
 */

function getSiteUsersListFields(http, query) {
  var uri = endpoints.users.listFields(query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getSiteUsersListFields = getSiteUsersListFields;
/**
 * Fetch list items for site users
 */

function getSiteUsersListItems(_x2, _x3) {
  return _getSiteUsersListItems.apply(this, arguments);
}

function _getSiteUsersListItems() {
  _getSiteUsersListItems = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(http, query) {
    var uri, users;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uri = endpoints.users.listItems(query);
            _context2.next = 3;
            return http.get(uri).then(rewrapResponse_1.default);

          case 3:
            users = _context2.sent;
            users.forEach(expandPictureURL_1.default);
            return _context2.abrupt("return", users);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getSiteUsersListItems.apply(this, arguments);
}

exports.getSiteUsersListItems = getSiteUsersListItems;
/**
 * Fetch a single list item with user information
 */

function getSiteUserById(http, id) {
  var uri = endpoints.users.byId(id);
  return http.get(uri).then(rewrapResponse_1.default).then(expandPictureURL_1.default);
}

exports.getSiteUserById = getSiteUserById;
/**
 * Fetch list of all site lists
 */

function getLists(http, query) {
  var uri = endpoints.lists.index(query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getLists = getLists;
/**
 * Create a new list in the site
 */

function createList(http, listTitle) {
  var uri = endpoints.lists.index();
  var metadata = {
    __metadata: {
      type: 'SP.List'
    },
    BaseTemplate: 100,
    Title: listTitle
  };
  return http.post(uri, metadata).then(rewrapResponse_1.default);
}

exports.createList = createList;
/**
 * Delete an existing list in the site
 */

function deleteList(http, listTitle) {
  var uri = endpoints.lists.byTitle(listTitle);
  return http.delete(uri).then(rewrapResponse_1.default);
}

exports.deleteList = deleteList;
/**
 * Fetch list metadata
 */

function getListByTitle(http, listTitle, query) {
  var uri = endpoints.lists.byTitle(listTitle, query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getListByTitle = getListByTitle;
/**
 * Fetch list metadata
 */

function getListItemType(_x4, _x5) {
  return _getListItemType.apply(this, arguments);
}

function _getListItemType() {
  _getListItemType = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(http, listTitle) {
    var response;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getListByTitle(http, listTitle, {
              $select: 'ListItemEntityTypeFullName'
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", response.ListItemEntityTypeFullName);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getListItemType.apply(this, arguments);
}

exports.getListItemType = getListItemType;
/**
 * Fetch list fields metadata
 */

function getListFields(http, listTitle, query) {
  var uri = endpoints.lists.fields(listTitle, query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getListFields = getListFields;
/**
 * Fetch list items
 */

function getListItems(http, listTitle, query) {
  var uri = endpoints.lists.items(listTitle, query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getListItems = getListItems;
/**
 * Fetch a single list item
 */

function getListItemById(http, listTitle, itemId, query) {
  var uri = endpoints.lists.itemById(listTitle, itemId, query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getListItemById = getListItemById;
/**
 * Create a new record to the list
 */

function postListItem(http, listTitle, type, data) {
  var uri = endpoints.lists.items(listTitle);

  var metadata = _objectSpread({
    __metadata: {
      type: type
    }
  }, data);

  return http.post(uri, metadata).then(rewrapResponse_1.default);
}

exports.postListItem = postListItem;
/**
 * Update an existing record in the list
 */

function patchListItem(_x6, _x7, _x8, _x9, _x10) {
  return _patchListItem.apply(this, arguments);
}

function _patchListItem() {
  _patchListItem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(http, listTitle, itemId, type, data) {
    var uri, metadata, _yield$http$patch$the, patchResponse, updatedItem;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            uri = endpoints.lists.itemById(listTitle, itemId);
            metadata = _objectSpread({
              __metadata: {
                type: type
              }
            }, data);
            _context4.next = 4;
            return http.patch(uri, metadata).then(rewrapResponse_1.default);

          case 4:
            _yield$http$patch$the = _context4.sent;
            patchResponse = _yield$http$patch$the.__response;
            _context4.next = 8;
            return getListItemById(http, listTitle, itemId);

          case 8:
            updatedItem = _context4.sent;
            updatedItem.__response = patchResponse;
            return _context4.abrupt("return", updatedItem);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _patchListItem.apply(this, arguments);
}

exports.patchListItem = patchListItem;
/**
 * Update an existing record in the list
 */

function deleteListItem(_x11, _x12, _x13) {
  return _deleteListItem.apply(this, arguments);
}

function _deleteListItem() {
  _deleteListItem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(http, listTitle, itemId) {
    var uri, originalItem, _yield$http$delete$th, deleteResponse;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            uri = endpoints.lists.itemById(listTitle, itemId);
            _context5.next = 3;
            return getListItemById(http, listTitle, itemId);

          case 3:
            originalItem = _context5.sent;
            _context5.next = 6;
            return http.delete(uri).then(rewrapResponse_1.default);

          case 6:
            _yield$http$delete$th = _context5.sent;
            deleteResponse = _yield$http$delete$th.__response;
            originalItem.__response = deleteResponse;
            return _context5.abrupt("return", originalItem);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _deleteListItem.apply(this, arguments);
}

exports.deleteListItem = deleteListItem;
/**
 * Fetch attachments of a given list item
 */

function getListItemAttachments(http, listTitle, itemId) {
  var uri = endpoints.lists.itemAttachments(listTitle, itemId);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getListItemAttachments = getListItemAttachments;
/**
 * Upload an attachment to a given list item
 */

function uploadListItemAttachment(http, listTitle, itemId, fileName, fileBuffer) {
  var uri = endpoints.lists.itemAttachmentsUpload(listTitle, itemId, fileName);
  return http.post(uri, fileBuffer).then(rewrapResponse_1.default);
}

exports.uploadListItemAttachment = uploadListItemAttachment;
/**
 * Rename an existing attachment from a given list item
 */

function renameListItemAttachment(_x14, _x15, _x16, _x17, _x18) {
  return _renameListItemAttachment.apply(this, arguments);
}

function _renameListItemAttachment() {
  _renameListItemAttachment = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(http, listTitle, itemId, currentFileName, newFileName) {
    var attachments, oldFileUrl, newFileUrl, uri;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getListItemAttachments(http, listTitle, itemId);

          case 2:
            attachments = _context6.sent;
            oldFileUrl = attachments.find(function (att) {
              return att.FileName === currentFileName;
            }).ServerRelativeUrl;
            newFileUrl = oldFileUrl.replace(currentFileName, newFileName);
            uri = endpoints.lists.itemAttachmentsRename(oldFileUrl, newFileUrl);
            return _context6.abrupt("return", http.patch(uri).then(rewrapResponse_1.default));

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _renameListItemAttachment.apply(this, arguments);
}

exports.renameListItemAttachment = renameListItemAttachment;
/**
 * Delete an attachment of a given list item
 */

function deleteListItemAttachment(http, listTitle, itemId, fileName) {
  var uri = endpoints.lists.itemAttachmentByName(listTitle, itemId, fileName);
  return http.delete(uri).then(rewrapResponse_1.default);
}

exports.deleteListItemAttachment = deleteListItemAttachment;
/**
 * Fetch list of all site folders/libraries
 */

function getFolders(http, query) {
  var uri = endpoints.folders.index(query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getFolders = getFolders;
/**
 * Fetch the content with a given folder/library based on its relative URL
 */

function getFolderByUrl(http, relativeUrl) {
  var uri = endpoints.folders.folderByUrl(relativeUrl);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getFolderByUrl = getFolderByUrl;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */

function getFoldersInFolder(http, relativeUrl, query) {
  var uri = endpoints.folders.foldersInFolder(relativeUrl, query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getFoldersInFolder = getFoldersInFolder;
/**
 * Creates a new folder given library or folder based on its relative URL
 */

function createFolder(http, relativeUrl, folderName) {
  var uri = endpoints.folders.index();
  var metadata = {
    ServerRelativeUrl: "".concat(relativeUrl, "/").concat(folderName),
    __metadata: {
      type: 'SP.Folder'
    }
  };
  return http.post(uri, metadata).then(rewrapResponse_1.default);
}

exports.createFolder = createFolder;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */

function getFilesInFolder(http, relativeUrl, query) {
  var uri = endpoints.folders.filesInFolder(relativeUrl, query);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getFilesInFolder = getFilesInFolder;
/**
 * Fetch the content with a given file within a library based on its relative URL
 */

function getFileByUrl(http, relativeUrl) {
  var uri = endpoints.folders.fileByUrl(relativeUrl);
  return http.get(uri).then(rewrapResponse_1.default);
}

exports.getFileByUrl = getFileByUrl;
/**
 * Fetch the existing folders within a given folder based on its relative URL
 */

function uploadFileToFolder(http, relativeUrl, fileName, fileBuffer) {
  var uri = endpoints.folders.newFileToFolder(relativeUrl, fileName);
  return http.post(uri, fileBuffer).then(rewrapResponse_1.default);
}

exports.uploadFileToFolder = uploadFileToFolder;
},{"@babel/runtime/helpers/defineProperty":"IxO8","@babel/runtime/helpers/asyncToGenerator":"agGE","@babel/runtime/regenerator":"PMvg","../endpoints":"D7Ve","../utils/rewrapResponse":"HzIh","../utils/expandPictureURL":"mdjm"}],"b10l":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var headers = {
  'Accept': 'application/json;odata=verbose',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json;odata=verbose'
};
exports.default = Object.freeze(headers);
},{}],"NVR6":[function(require,module,exports) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"XfJI":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./arrayLikeToArray.js":"NVR6"}],"OMTj":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"UyFj":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./arrayLikeToArray.js":"NVR6"}],"wFNi":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"Fhqp":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles.js");

var iterableToArray = require("./iterableToArray.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableSpread = require("./nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./arrayWithoutHoles.js":"XfJI","./iterableToArray.js":"OMTj","./unsupportedIterableToArray.js":"UyFj","./nonIterableSpread.js":"wFNi"}],"nyMW":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var axios_1 = __importDefault(require("axios"));

var defaultTransformers = axios_1.default.defaults.transformRequest;
var requestTransformers = (0, _toConsumableArray2.default)(defaultTransformers);
exports.default = requestTransformers;
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","axios":"dZBD"}],"f1U4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function lookForDates(obj) {
  var SP_DATE_STR_LENGTH = 20;
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === 'string' && obj[key].length === SP_DATE_STR_LENGTH && Date.parse(obj[key])) {
      obj[key] = new Date(obj[key]);
    }
  });
}

function parseDates(data) {
  try {
    if (data instanceof Array) {
      data.forEach(lookForDates);
    } else {
      lookForDates(data);
    }
  } catch (e) {
    /* do nothing */
  }

  return data;
}

exports.default = parseDates;
},{}],"kcRE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function exposeDeepData(data) {
  var _data;

  if ((_data = data) !== null && _data !== void 0 && _data.d) {
    var _data2 = data,
        d = _data2.d;
    /* eslint-disable-next-line no-param-reassign */

    data = d.results || d;
    Object.defineProperty(data, '__next', {
      value: d.__next || null,
      writable: true
    });
  }

  return data;
}

exports.default = exposeDeepData;
},{}],"ame5":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var axios_1 = __importDefault(require("axios"));

var parseDate_1 = __importDefault(require("./parseDate"));

var exposeDeepData_1 = __importDefault(require("./exposeDeepData"));

var defaultTransformers = axios_1.default.defaults.transformResponse;
var responseTransformers = [].concat((0, _toConsumableArray2.default)(defaultTransformers), [exposeDeepData_1.default, parseDate_1.default]);
exports.default = responseTransformers;
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","axios":"dZBD","./parseDate":"f1U4","./exposeDeepData":"kcRE"}],"AGkc":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

function addRequestDigest(httpInstance) {
  return [/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(config) {
      var method, digest;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              method = config.method;
              digest = config.digest;

              if (!(digest !== false && method.match(/post/i))) {
                _context.next = 11;
                break;
              }

              _context.t0 = _objectSpread;
              _context.t1 = _objectSpread({}, config.headers);
              _context.t2 = {};
              _context.next = 8;
              return httpInstance.defaults.requestDigest;

            case 8:
              _context.t3 = _context.sent;
              _context.t4 = {
                'X-RequestDigest': _context.t3
              };
              config.headers = (0, _context.t0)(_context.t1, _context.t2, _context.t4);

            case 11:
              return _context.abrupt("return", config);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()];
}

exports.default = addRequestDigest;
},{"@babel/runtime/helpers/defineProperty":"IxO8","@babel/runtime/helpers/asyncToGenerator":"agGE","@babel/runtime/regenerator":"PMvg"}],"HmwT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var headers = {
  'X-Http-Method': 'DELETE',
  'If-Match': '*'
};
exports.default = Object.freeze(headers);
},{}],"xrtM":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var deleteHeaders_1 = __importDefault(require("../../config/deleteHeaders"));

var onDeleteMethod = [function (config) {
  var method = config.method;

  if (method.match(/delete/i)) {
    config.method = 'post';
    config.headers = _objectSpread(_objectSpread({}, config.headers), deleteHeaders_1.default);
  }

  return config;
}];
exports.default = onDeleteMethod;
},{"@babel/runtime/helpers/defineProperty":"IxO8","../../config/deleteHeaders":"HmwT"}],"uf6s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var headers = {
  'X-Http-Method': 'MERGE',
  'If-Match': '*'
};
exports.default = Object.freeze(headers);
},{}],"Sj6z":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var patchHeaders_1 = __importDefault(require("../../config//patchHeaders"));

var onPatchMethod = [function (config) {
  var method = config.method;

  if (method.match(/patch/i)) {
    config.method = 'post';
    config.headers = _objectSpread(_objectSpread({}, config.headers), patchHeaders_1.default);
  }

  return config;
}];
exports.default = onPatchMethod;
},{"@babel/runtime/helpers/defineProperty":"IxO8","../../config//patchHeaders":"uf6s"}],"OK0w":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var addRequestDigest_1 = __importDefault(require("./addRequestDigest"));

var onDeleteMethod_1 = __importDefault(require("./onDeleteMethod"));

var onPatchMethod_1 = __importDefault(require("./onPatchMethod"));

var requestInterceptors = [addRequestDigest_1.default, onDeleteMethod_1.default, onPatchMethod_1.default];
exports.default = requestInterceptors;
},{"./addRequestDigest":"AGkc","./onDeleteMethod":"xrtM","./onPatchMethod":"Sj6z"}],"nqEY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var responseInterceptors = [// custom functions
];
exports.default = responseInterceptors;
},{}],"fzNL":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Register the interceptors in the XomApiClient instance.
 */

function registerInterceptor(http, at) {
  return function (events) {
    var _http$interceptors$at;

    var isFunction = typeof events === 'function';
    var interceptionEvents = isFunction ? events(http) : events;

    (_http$interceptors$at = http.interceptors[at]).use.apply(_http$interceptors$at, (0, _toConsumableArray2.default)(interceptionEvents));
  };
}

exports.default = registerInterceptor;
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp"}],"Un8L":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var axios_1 = __importDefault(require("axios"));

var requests = __importStar(require("../facades/requests"));

var commonHeaders_1 = __importDefault(require("./config/commonHeaders"));

var request_1 = __importDefault(require("./transformers/request"));

var response_1 = __importDefault(require("./transformers/response"));

var request_2 = __importDefault(require("./interceptors/request"));

var response_2 = __importDefault(require("./interceptors/response"));

var registerInterceptor_1 = __importDefault(require("../utils/registerInterceptor"));

function httpFactory(siteUrl) {
  var http = axios_1.default.create({
    headers: commonHeaders_1.default,
    baseURL: siteUrl || '/',
    withCredentials: true,
    transformRequest: request_1.default,
    transformResponse: response_1.default
  });
  request_2.default.forEach(registerInterceptor_1.default(http, 'request'));
  response_2.default.forEach(registerInterceptor_1.default(http, 'response'));
  http.defaults.requestDigest = requests.getRequestDigest(http);
  return http;
}

exports.default = httpFactory;
},{"axios":"dZBD","../facades/requests":"IVdQ","./config/commonHeaders":"b10l","./transformers/request":"nyMW","./transformers/response":"ame5","./interceptors/request":"OK0w","./interceptors/response":"nqEY","../utils/registerInterceptor":"fzNL"}],"VhfZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Generate the Array Buffer object for target reference provided as parameter.
 *
 * @param {string | HTMLInputElement | FileList | File | ArrayBuffer | Blob} target
 * @return {Promise<ArrayBuffer>}
 */
var toArrayBuffer = function toArrayBuffer(target) {
  if (typeof Promise === 'undefined') {
    throw new ReferenceError('Your environment does not support Promises.');
  } else if (typeof ArrayBuffer === 'undefined') {
    throw new ReferenceError('Your environment does not support ArrayBuffer.');
  }

  if (!target) {
    return Promise.reject(new Error("Parameter to convert to ArrayBuffer is empty (value: '".concat(target, "').")));
  }

  if (target.constructor === ArrayBuffer) {
    return Promise.resolve(target);
  }

  if (typeof Blob !== 'undefined' && target.constructor === Blob) {
    return target.toArrayBuffer();
  }

  if (typeof target === 'string') {
    var el = document.querySelector(target);

    if (!el) {
      return Promise.reject(new Error("No HTML found with selector \"".concat(target, "\".")));
    }

    target = el;
  }

  if (typeof HTMLInputElement !== 'undefined' && target.constructor === HTMLInputElement) {
    if (!target.files) {
      return Promise.reject(new Error('HTML input element reference is not of type "file".'));
    }

    target = target.files;
  }

  if (typeof FileList !== 'undefined' && target.constructor === FileList) {
    if (target.length === 0) {
      return Promise.reject(new Error('Object FileList is empty.'));
    }

    target = target[0];
  }

  if (typeof File !== 'undefined' && target.constructor === File) {
    if (typeof FileReader === 'undefined') {
      throw new TypeError('Your environment does not support FileReader.');
    }

    return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      reader.onloadend = function (ev) {
        return resolve(ev.target.result);
      };

      reader.onerror = function (ev) {
        return reject(ev.target.error);
      };

      reader.readAsArrayBuffer(target);
    });
  }

  return Promise.reject(new Error('Parameter type must be an instance of HTMLInputElement, FileList, File, String (input selector), Blob or ArrayBuffer'));
};

var _default = toArrayBuffer;
exports["default"] = _default;
},{}],"MjOT":[function(require,module,exports) {
"use strict";

/* eslint-env node */
var toArrayBuffer = require('./to-arraybuffer')["default"];

module.exports = toArrayBuffer; // Allow use of default import with ES module syntax

module.exports["default"] = toArrayBuffer;
},{"./to-arraybuffer":"VhfZ"}],"kliy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.missingItemId = void 0;
/**
 * Returns an instance of the exception when an item ID is missing.
 */

function missingItemId() {
  return new TypeError('Item ID not provided.');
}

exports.missingItemId = missingItemId;
},{}],"Jl5U":[function(require,module,exports) {
"use strict";

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _excluded = ["Id"],
    _excluded2 = ["Id"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var to_arraybuffer_1 = __importDefault(require("@lacussoft/to-arraybuffer"));

var exceptions = __importStar(require("./facades/exceptions"));

var requests = __importStar(require("./facades/requests"));
/**
 * Instantiate the object with the necessary information to connect to a SharePoint list through its REST API.
 */


var XomSharePointList = /*#__PURE__*/function () {
  function XomSharePointList(listTitle, httpInstance) {
    (0, _classCallCheck2.default)(this, XomSharePointList);
    (0, _defineProperty2.default)(this, "_title", void 0);
    (0, _defineProperty2.default)(this, "_http", void 0);
    (0, _defineProperty2.default)(this, "_itemsType", void 0);
    this._title = listTitle;
    this._http = httpInstance;
    this._itemsType = requests.getListItemType(this._http, this._title);
  }

  (0, _createClass2.default)(XomSharePointList, [{
    key: "title",
    get: function get() {
      return this._title;
    }
    /**
     * Returns the list fields metadata;
     */

  }, {
    key: "getFields",
    value: function getFields(params) {
      return requests.getListFields(this._http, this._title, params);
    }
    /**
     * Returns a list of the items stored in the list.
     */

  }, {
    key: "getItems",
    value: function getItems(params) {
      return requests.getListItems(this._http, this._title, params);
    }
    /**
     * Returns a single list item with the given ID.
     */

  }, {
    key: "findItem",
    value: function findItem(itemId, params) {
      return requests.getListItemById(this._http, this._title, itemId, params);
    }
  }, {
    key: "saveItem",
    value: function saveItem(param1, param2) {
      var _ref = param2 || param1,
          id = _ref.Id,
          rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);

      return id ? this.updateItem(id, rest) : this.createItem(rest);
    }
    /**
     * Saves a new record in the SharePoint list.
     */

  }, {
    key: "createItem",
    value: function () {
      var _createItem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(data) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = requests;
                _context.t1 = this._http;
                _context.t2 = this._title;
                _context.next = 5;
                return this._itemsType;

              case 5:
                _context.t3 = _context.sent;
                _context.t4 = data;
                return _context.abrupt("return", _context.t0.postListItem.call(_context.t0, _context.t1, _context.t2, _context.t3, _context.t4));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createItem(_x) {
        return _createItem.apply(this, arguments);
      }

      return createItem;
    }()
  }, {
    key: "updateItem",
    value: function () {
      var _updateItem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(param1, param2) {
        var _ref2, _ref2$Id, id, rest;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2 = param2 || param1, _ref2$Id = _ref2.Id, id = _ref2$Id === void 0 ? param1 : _ref2$Id, rest = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);

                if (!isNaN(id)) {
                  _context2.next = 3;
                  break;
                }

                throw exceptions.missingItemId();

              case 3:
                _context2.t0 = requests;
                _context2.t1 = this._http;
                _context2.t2 = this._title;
                _context2.t3 = id;
                _context2.next = 9;
                return this._itemsType;

              case 9:
                _context2.t4 = _context2.sent;
                _context2.t5 = rest;
                return _context2.abrupt("return", _context2.t0.patchListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4, _context2.t5));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateItem(_x2, _x3) {
        return _updateItem.apply(this, arguments);
      }

      return updateItem;
    }()
  }, {
    key: "deleteItem",
    value: function deleteItem(param1) {
      var _param1$Id = param1.Id,
          id = _param1$Id === void 0 ? param1 : _param1$Id;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.deleteListItem(this._http, this._title, id);
    }
  }, {
    key: "getAttachments",
    value: function getAttachments(param1) {
      var _param1$Id2 = param1.Id,
          id = _param1$Id2 === void 0 ? param1 : _param1$Id2;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.getListItemAttachments(this._http, this._title, id);
    }
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(param1, fileName, fileReference) {
        var fileBuffer, _param1$Id3, id;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return to_arraybuffer_1.default(fileReference);

              case 2:
                fileBuffer = _context3.sent;
                _param1$Id3 = param1.Id, id = _param1$Id3 === void 0 ? param1 : _param1$Id3;

                if (!isNaN(id)) {
                  _context3.next = 6;
                  break;
                }

                throw exceptions.missingItemId();

              case 6:
                return _context3.abrupt("return", requests.uploadListItemAttachment(this._http, this._title, id, fileName, fileBuffer));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addAttachment(_x4, _x5, _x6) {
        return _addAttachment.apply(this, arguments);
      }

      return addAttachment;
    }()
  }, {
    key: "renameAttachment",
    value: function renameAttachment(param1, currentName, newName) {
      var _param1$Id4 = param1.Id,
          id = _param1$Id4 === void 0 ? param1 : _param1$Id4;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.renameListItemAttachment(this._http, this._title, id, currentName, newName);
    }
  }, {
    key: "deleteAttachment",
    value: function deleteAttachment(param1, fileName) {
      var _param1$Id5 = param1.Id,
          id = _param1$Id5 === void 0 ? param1 : _param1$Id5;

      if (isNaN(id)) {
        throw exceptions.missingItemId();
      }

      return requests.deleteListItemAttachment(this._http, this._title, id, fileName);
    }
  }]);
  return XomSharePointList;
}();

exports.default = XomSharePointList;
},{"@babel/runtime/helpers/asyncToGenerator":"agGE","@babel/runtime/helpers/objectWithoutProperties":"U8F3","@babel/runtime/helpers/classCallCheck":"fcMS","@babel/runtime/helpers/createClass":"P8NW","@babel/runtime/helpers/defineProperty":"IxO8","@babel/runtime/regenerator":"PMvg","@lacussoft/to-arraybuffer":"MjOT","./facades/exceptions":"kliy","./facades/requests":"IVdQ"}],"PJsR":[function(require,module,exports) {
"use strict";

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var requests = __importStar(require("./facades/requests"));
/**
 * Instantiate the object with the necessary information to connect to a SharePoint survey through its REST API.
 */


var XomSharePointSurvey = /*#__PURE__*/function () {
  function XomSharePointSurvey(surveyTitle, httpInstance) {
    (0, _classCallCheck2.default)(this, XomSharePointSurvey);
    (0, _defineProperty2.default)(this, "_title", void 0);
    (0, _defineProperty2.default)(this, "_http", void 0);
    (0, _defineProperty2.default)(this, "_itemsType", void 0);
    this._title = surveyTitle;
    this._http = httpInstance;
    this._itemsType = requests.getListItemType(this._http, this._title);
  }

  (0, _createClass2.default)(XomSharePointSurvey, [{
    key: "title",
    get: function get() {
      return this._title;
    }
    /**
     * Gets fields that corresponds to the questions and their choices.
     */

  }, {
    key: "getQuestions",
    value: function () {
      var _getQuestions = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var response, questions;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return requests.getListFields(this._http, this._title, {
                  $filter: '(CanBeDeleted eq true)'
                });

              case 2:
                response = _context.sent;
                questions = response.map(function (field) {
                  return {
                    Field: field.InternalName,
                    Description: field.Description,
                    Question: field.Title,
                    Type: field.TypeDisplayName,
                    Choices: field.Choices && field.Choices.results,
                    DefaultValue: field.DefaultValue
                  };
                });
                Object.defineProperty(questions, '__response', {
                  value: response.__response
                });
                return _context.abrupt("return", questions);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getQuestions() {
        return _getQuestions.apply(this, arguments);
      }

      return getQuestions;
    }()
    /**
     * Returns a list of the responses stored in the survey list.
     */

  }, {
    key: "getResponses",
    value: function getResponses(params) {
      return requests.getListItems(this._http, this._title, params);
    }
    /**
     * Returns a single response by its ID.
     */

  }, {
    key: "findResponse",
    value: function findResponse(id, params) {
      return requests.getListItemById(this._http, this._title, id, params);
    }
    /**
     * Saves a new response in the SharePoint survey list.
     */

  }, {
    key: "submitResponse",
    value: function () {
      var _submitResponse = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(data) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = requests;
                _context2.t1 = this._http;
                _context2.t2 = this._title;
                _context2.next = 5;
                return this._itemsType;

              case 5:
                _context2.t3 = _context2.sent;
                _context2.t4 = data;
                return _context2.abrupt("return", _context2.t0.postListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submitResponse(_x) {
        return _submitResponse.apply(this, arguments);
      }

      return submitResponse;
    }()
    /**
     * Updates an existing response.
     */

  }, {
    key: "changeResponse",
    value: function () {
      var _changeResponse = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(id, data) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = requests;
                _context3.t1 = this._http;
                _context3.t2 = this._title;
                _context3.t3 = id;
                _context3.next = 6;
                return this._itemsType;

              case 6:
                _context3.t4 = _context3.sent;
                _context3.t5 = data;
                return _context3.abrupt("return", _context3.t0.patchListItem.call(_context3.t0, _context3.t1, _context3.t2, _context3.t3, _context3.t4, _context3.t5));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function changeResponse(_x2, _x3) {
        return _changeResponse.apply(this, arguments);
      }

      return changeResponse;
    }()
    /**
     * Deletes an existing response.
     */

  }, {
    key: "delete",
    value: function _delete(id) {
      return requests.deleteListItem(this._http, this._title, id);
    }
  }]);
  return XomSharePointSurvey;
}();

exports.default = XomSharePointSurvey;
},{"@babel/runtime/helpers/asyncToGenerator":"agGE","@babel/runtime/helpers/classCallCheck":"fcMS","@babel/runtime/helpers/createClass":"P8NW","@babel/runtime/helpers/defineProperty":"IxO8","@babel/runtime/regenerator":"PMvg","./facades/requests":"IVdQ"}],"iNb7":[function(require,module,exports) {
"use strict";

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var to_arraybuffer_1 = __importDefault(require("@lacussoft/to-arraybuffer"));

var requests = __importStar(require("./facades/requests"));
/**
 * Instantiate the object with the necessary information to connect to a SharePoint file library through its REST API.
 */


var XomSharePointLibrary = /*#__PURE__*/function () {
  function XomSharePointLibrary(folderAddress, httpInstance) {
    (0, _classCallCheck2.default)(this, XomSharePointLibrary);
    (0, _defineProperty2.default)(this, "_address", void 0);
    (0, _defineProperty2.default)(this, "_http", void 0);
    (0, _defineProperty2.default)(this, "_filesType", void 0);
    this._address = folderAddress;
    this._http = httpInstance;
    this._filesType = '';
  }

  (0, _createClass2.default)(XomSharePointLibrary, [{
    key: "relativeUrl",
    get: function get() {
      var baseUrl = new URL(this._http.defaults.baseURL);
      return "".concat(baseUrl.pathname, "/").concat(this._address);
    }
    /**
     * Returns a list of the folders within the folder.
     */

  }, {
    key: "listSubfolders",
    value: function listSubfolders(params) {
      return requests.getFoldersInFolder(this._http, this.relativeUrl, params);
    }
    /**
     * Creates a folder within this folder.
     */

  }, {
    key: "createSubfolder",
    value: function createSubfolder(folderName) {
      return requests.createFolder(this._http, this.relativeUrl, folderName);
    }
    /**
     * Returns a list of the files within this folder.
     */

  }, {
    key: "listFiles",
    value: function listFiles(params) {
      return requests.getFilesInFolder(this._http, this.relativeUrl, params);
    }
    /**
     * Uploads a file into the folder.
     */

  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(fileName, fileReference) {
        var fileBuffer, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return to_arraybuffer_1.default(fileReference);

              case 2:
                fileBuffer = _context.sent;
                _context.next = 5;
                return requests.uploadFileToFolder(this._http, this.relativeUrl, fileName, fileBuffer);

              case 5:
                result = _context.sent;
                this._filesType = this._filesType || result.__metadata.type;
                return _context.abrupt("return", result);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function uploadFile(_x, _x2) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
  }]);
  return XomSharePointLibrary;
}();

exports.default = XomSharePointLibrary;
},{"@babel/runtime/helpers/asyncToGenerator":"agGE","@babel/runtime/helpers/classCallCheck":"fcMS","@babel/runtime/helpers/createClass":"P8NW","@babel/runtime/helpers/defineProperty":"IxO8","@babel/runtime/regenerator":"PMvg","@lacussoft/to-arraybuffer":"MjOT","./facades/requests":"IVdQ"}],"Knm4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Provide the query to find searched term with user properties
 */

function userSearchQuery(search) {
  var title = "substringof('".concat(search, "',Title)");
  var email = "substringof('".concat(search, "',EMail)");
  var lastName = "substringof('".concat(search, "',LastName)");
  var firstName = "substringof('".concat(search, "',FirstName)");
  var account = "substringof('".concat(search, "',AccountName)");
  return {
    $filter: "".concat(title, " or ").concat(email, " or ").concat(lastName, " or ").concat(firstName, " or ").concat(account)
  };
}

exports.default = userSearchQuery;
},{}],"wIRH":[function(require,module,exports) {
"use strict";

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var httpFactory_1 = __importDefault(require("./http/httpFactory"));

var requests = __importStar(require("./facades/requests"));

var XomSharePointList_1 = __importDefault(require("./XomSharePointList"));

var XomSharePointSurvey_1 = __importDefault(require("./XomSharePointSurvey"));

var XomSharePointFolder_1 = __importDefault(require("./XomSharePointFolder"));

var userSearchQuery_1 = __importDefault(require("./utils/userSearchQuery"));
/**
 * Instantiate the object with the necessary information to connect to a SharePoint site through its REST API.
 */


var XomSharePointSite = /*#__PURE__*/function () {
  function XomSharePointSite(baseSiteUrl) {
    var _this = this;

    (0, _classCallCheck2.default)(this, XomSharePointSite);
    (0, _defineProperty2.default)(this, "_http", void 0);
    (0, _defineProperty2.default)(this, "_currUser", void 0);
    this._http = httpFactory_1.default(baseSiteUrl);
    this._currUser = requests.getSiteCurrentUser(this._http).then(function (_ref) {
      var id = _ref.Id;
      return requests.getSiteUserById(_this._http, id);
    });
  }

  (0, _createClass2.default)(XomSharePointSite, [{
    key: "http",
    get: function get() {
      return this._http;
    }
  }, {
    key: "baseUrl",
    get: function get() {
      return this._http.defaults.baseURL;
    }
    /**
     * Gets the SharePoint site metadata.
     */

  }, {
    key: "getInfo",
    value: function getInfo() {
      return requests.getSite(this._http);
    }
    /**
     * Queries the SharePoint API to get user information. Inform nothing to get
     * current user information or pass an specific user ID.
     */

  }, {
    key: "getUserInfo",
    value: function getUserInfo(id) {
      return id ? requests.getSiteUserById(this._http, id) : this._currUser;
    }
    /**
     * Queries SharePoint API searching for user name.
     */

  }, {
    key: "searchUser",
    value: function searchUser(search) {
      return requests.getSiteUsersListItems(this._http, userSearchQuery_1.default(search));
    }
    /**
     * Returns a reference to connect to a SharePoint list.
     */

  }, {
    key: "getList",
    value: function getList(listTitle) {
      return new XomSharePointList_1.default(listTitle, this._http);
    }
    /**
     * Creates a new SharePoint list.
     */

  }, {
    key: "createList",
    value: function createList(listTitle) {
      return requests.createList(this._http, listTitle);
    }
    /**
     * Deletes an existing SharePoint list.
     */

  }, {
    key: "deleteList",
    value: function deleteList(listTitle) {
      return requests.deleteList(this._http, listTitle);
    }
    /**
     * Returns a reference to connect to a SharePoint survey.
     */

  }, {
    key: "getSurvey",
    value: function getSurvey(surveyTitle) {
      return new XomSharePointSurvey_1.default(surveyTitle, this._http);
    }
    /**
     * Returns a reference to connect to a SharePoint file library.
     */

  }, {
    key: "getFolder",
    value: function getFolder(folderAddress) {
      return new XomSharePointFolder_1.default(folderAddress, this._http);
    }
  }]);
  return XomSharePointSite;
}();

exports.default = XomSharePointSite;
},{"@babel/runtime/helpers/classCallCheck":"fcMS","@babel/runtime/helpers/createClass":"P8NW","@babel/runtime/helpers/defineProperty":"IxO8","./http/httpFactory":"Un8L","./facades/requests":"IVdQ","./XomSharePointList":"Jl5U","./XomSharePointSurvey":"PJsR","./XomSharePointFolder":"iNb7","./utils/userSearchQuery":"Knm4"}],"QCba":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var XomSharePointSite_1 = __importDefault(require("./XomSharePointSite"));
/**
 * Instantiate a XomSharePoint object to connect to a SharePoint site and,
 * therefore, exchange data with its contents (lists, libraries, permissions)
 * through SharePoint native REST API
 */


function xomSharePoint(baseSiteUrl) {
  return new XomSharePointSite_1.default(baseSiteUrl);
}

exports.default = xomSharePoint;
},{"./XomSharePointSite":"wIRH"}],"UeJd":[function(require,module,exports) {
/* global window */

/**
 * Entry point for browser version
 */
window.xomSharePoint = require('./index').default;
},{"./index":"QCba"}]},{},["UeJd"], null)
//# sourceMappingURL=/xom-sharepoint.js.map