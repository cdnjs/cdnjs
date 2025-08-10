/**
 * XOM SharePoint v0.16.1
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2021
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.xomSharePoint = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var axios$2 = {exports: {}};

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

	var bind$4 = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);

	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    return fn.apply(thisArg, args);
	  };
	};

	var bind$3 = bind$4;
	/*global toString:true*/
	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */

	function isArray$4(val) {
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


	function isBuffer$1(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
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
	  return typeof FormData !== 'undefined' && val instanceof FormData;
	}
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */


	function isArrayBufferView(val) {
	  var result;

	  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
	  }

	  return result;
	}
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */


	function isString$1(val) {
	  return typeof val === 'string';
	}
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */


	function isNumber$1(val) {
	  return typeof val === 'number';
	}
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */


	function isObject(val) {
	  return val !== null && _typeof(val) === 'object';
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


	function isDate$1(val) {
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
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
	    return false;
	  }

	  return typeof window !== 'undefined' && typeof document !== 'undefined';
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
	  } // Force an array if not already something iterable


	  if (_typeof(obj) !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray$4(obj)) {
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


	function merge$1() {
	  var result = {};

	  function assignValue(val, key) {
	    if (isPlainObject(result[key]) && isPlainObject(val)) {
	      result[key] = merge$1(result[key], val);
	    } else if (isPlainObject(val)) {
	      result[key] = merge$1({}, val);
	    } else if (isArray$4(val)) {
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
	      a[key] = bind$3(val, thisArg);
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

	var utils$g = {
	  isArray: isArray$4,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer$1,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString$1,
	  isNumber: isNumber$1,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  isUndefined: isUndefined,
	  isDate: isDate$1,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge$1,
	  extend: extend,
	  trim: trim,
	  stripBOM: stripBOM
	};

	var utils$f = utils$g;

	function encode$1(val) {
	  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
	}
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */


	var buildURL$2 = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;

	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils$f.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	    utils$f.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils$f.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils$f.forEach(val, function parseValue(v) {
	        if (utils$f.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils$f.isObject(v)) {
	          v = JSON.stringify(v);
	        }

	        parts.push(encode$1(key) + '=' + encode$1(v));
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

	var utils$e = utils$g;

	function InterceptorManager$1() {
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


	InterceptorManager$1.prototype.use = function use(fulfilled, rejected) {
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


	InterceptorManager$1.prototype.eject = function eject(id) {
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


	InterceptorManager$1.prototype.forEach = function forEach(fn) {
	  utils$e.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager$1;

	var utils$d = utils$g;
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */

	var transformData$1 = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils$d.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	  return data;
	};

	var isCancel$1 = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};

	var utils$c = utils$g;

	var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
	  utils$c.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

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


	var enhanceError$1 = function enhanceError(error, config, code, request, response) {
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

	var enhanceError = enhanceError$1;
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

	var createError$2 = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};

	var createError$1 = createError$2;
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */

	var settle$1 = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;

	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError$1('Request failed with status code ' + response.status, response.config, null, response.request, response));
	  }
	};

	var utils$b = utils$g;
	var cookies$1 = utils$b.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
	function standardBrowserEnv() {
	  return {
	    write: function write(name, value, expires, path, domain, secure) {
	      var cookie = [];
	      cookie.push(name + '=' + encodeURIComponent(value));

	      if (utils$b.isNumber(expires)) {
	        cookie.push('expires=' + new Date(expires).toGMTString());
	      }

	      if (utils$b.isString(path)) {
	        cookie.push('path=' + path);
	      }

	      if (utils$b.isString(domain)) {
	        cookie.push('domain=' + domain);
	      }

	      if (secure === true) {
	        cookie.push('secure');
	      }

	      document.cookie = cookie.join('; ');
	    },
	    read: function read(name) {
	      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	      return match ? decodeURIComponent(match[3]) : null;
	    },
	    remove: function remove(name) {
	      this.write(name, '', Date.now() - 86400000);
	    }
	  };
	}() : // Non standard browser env (web workers, react-native) lack needed support.
	function nonStandardBrowserEnv() {
	  return {
	    write: function write() {},
	    read: function read() {
	      return null;
	    },
	    remove: function remove() {}
	  };
	}();

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */


	var isAbsoluteURL$1 = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */


	var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
	  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
	};

	var isAbsoluteURL = isAbsoluteURL$1;
	var combineURLs = combineURLs$1;
	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 * @returns {string} The combined full path
	 */

	var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
	  if (baseURL && !isAbsoluteURL(requestedURL)) {
	    return combineURLs(baseURL, requestedURL);
	  }

	  return requestedURL;
	};

	var utils$a = utils$g; // Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers

	var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
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

	var parseHeaders$1 = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) {
	    return parsed;
	  }

	  utils$a.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils$a.trim(line.substr(0, i)).toLowerCase();
	    val = utils$a.trim(line.substr(i + 1));

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

	var utils$9 = utils$g;
	var isURLSameOrigin$1 = utils$9.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
	// whether the request URL is of the same origin as current location.
	function standardBrowserEnv() {
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

	    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

	    return {
	      href: urlParsingNode.href,
	      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	      host: urlParsingNode.host,
	      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	      hostname: urlParsingNode.hostname,
	      port: urlParsingNode.port,
	      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
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
	    var parsed = utils$9.isString(requestURL) ? resolveURL(requestURL) : requestURL;
	    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
	  };
	}() : // Non standard browser envs (web workers, react-native) lack needed support.
	function nonStandardBrowserEnv() {
	  return function isURLSameOrigin() {
	    return true;
	  };
	}();

	var utils$8 = utils$g;
	var settle = settle$1;
	var cookies = cookies$1;
	var buildURL$1 = buildURL$2;
	var buildFullPath = buildFullPath$1;
	var parseHeaders = parseHeaders$1;
	var isURLSameOrigin = isURLSameOrigin$1;
	var createError = createError$2;

	var xhr = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils$8.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest(); // HTTP basic authentication

	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    var fullPath = buildFullPath(config.baseURL, config.url);
	    request.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

	    request.timeout = config.timeout; // Listen for ready state

	    request.onreadystatechange = function handleLoad() {
	      if (!request || request.readyState !== 4) {
	        return;
	      } // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request


	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      } // Prepare the response


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
	      settle(resolve, reject, response); // Clean up request

	      request = null;
	    }; // Handle browser request cancellation (as opposed to a manual cancellation)


	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }

	      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

	      request = null;
	    }; // Handle low level network errors


	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request)); // Clean up request

	      request = null;
	    }; // Handle timeout


	    request.ontimeout = function handleTimeout() {
	      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

	      if (config.timeoutErrorMessage) {
	        timeoutErrorMessage = config.timeoutErrorMessage;
	      }

	      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

	      request = null;
	    }; // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.


	    if (utils$8.isStandardBrowserEnv()) {
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    } // Add headers to the request


	    if ('setRequestHeader' in request) {
	      utils$8.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    } // Add withCredentials to request if needed


	    if (!utils$8.isUndefined(config.withCredentials)) {
	      request.withCredentials = !!config.withCredentials;
	    } // Add responseType to request if needed


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
	    } // Handle progress if needed


	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    } // Not all browsers support upload events


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
	        reject(cancel); // Clean up request

	        request = null;
	      });
	    }

	    if (!requestData) {
	      requestData = null;
	    } // Send the request


	    request.send(requestData);
	  });
	};

	var utils$7 = utils$g;
	var normalizeHeaderName = normalizeHeaderName$1;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils$7.isUndefined(headers) && utils$7.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;

	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = xhr;
	  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = xhr;
	  }

	  return adapter;
	}

	var defaults$4 = {
	  adapter: getDefaultAdapter(),
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept');
	    normalizeHeaderName(headers, 'Content-Type');

	    if (utils$7.isFormData(data) || utils$7.isArrayBuffer(data) || utils$7.isBuffer(data) || utils$7.isStream(data) || utils$7.isFile(data) || utils$7.isBlob(data)) {
	      return data;
	    }

	    if (utils$7.isArrayBufferView(data)) {
	      return data.buffer;
	    }

	    if (utils$7.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }

	    if (utils$7.isObject(data)) {
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
	      } catch (e) {
	        /* Ignore */
	      }
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
	defaults$4.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	utils$7.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults$4.headers[method] = {};
	});
	utils$7.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults$4.headers[method] = utils$7.merge(DEFAULT_CONTENT_TYPE);
	});
	var defaults_1 = defaults$4;

	var utils$6 = utils$g;
	var transformData = transformData$1;
	var isCancel = isCancel$1;
	var defaults$3 = defaults_1;
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


	var dispatchRequest$1 = function dispatchRequest(config) {
	  throwIfCancellationRequested(config); // Ensure headers exist

	  config.headers = config.headers || {}; // Transform request data

	  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

	  config.headers = utils$6.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
	  utils$6.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
	    delete config.headers[method];
	  });
	  var adapter = config.adapter || defaults$3.adapter;
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config); // Transform response data

	    response.data = transformData(response.data, response.headers, config.transformResponse);
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config); // Transform response data

	      if (reason && reason.response) {
	        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	var utils$5 = utils$g;
	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */

	var mergeConfig$2 = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};
	  var valueFromConfig2Keys = ['url', 'method', 'data'];
	  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
	  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
	  var directMergeKeys = ['validateStatus'];

	  function getMergedValue(target, source) {
	    if (utils$5.isPlainObject(target) && utils$5.isPlainObject(source)) {
	      return utils$5.merge(target, source);
	    } else if (utils$5.isPlainObject(source)) {
	      return utils$5.merge({}, source);
	    } else if (utils$5.isArray(source)) {
	      return source.slice();
	    }

	    return source;
	  }

	  function mergeDeepProperties(prop) {
	    if (!utils$5.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (!utils$5.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  }

	  utils$5.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
	    if (!utils$5.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    }
	  });
	  utils$5.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
	  utils$5.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
	    if (!utils$5.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    } else if (!utils$5.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });
	  utils$5.forEach(directMergeKeys, function merge(prop) {
	    if (prop in config2) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (prop in config1) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });
	  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
	  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
	    return axiosKeys.indexOf(key) === -1;
	  });
	  utils$5.forEach(otherKeys, mergeDeepProperties);
	  return config;
	};

	var utils$4 = utils$g;
	var buildURL = buildURL$2;
	var InterceptorManager = InterceptorManager_1;
	var dispatchRequest = dispatchRequest$1;
	var mergeConfig$1 = mergeConfig$2;
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */

	function Axios$1(instanceConfig) {
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


	Axios$1.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }

	  config = mergeConfig$1(this.defaults, config); // Set config.method

	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
	    config.method = 'get';
	  } // Hook up interceptors middleware


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

	Axios$1.prototype.getUri = function getUri(config) {
	  config = mergeConfig$1(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	}; // Provide aliases for supported request methods


	utils$4.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios$1.prototype[method] = function (url, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: (config || {}).data
	    }));
	  };
	});
	utils$4.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios$1.prototype[method] = function (url, data, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	var Axios_1 = Axios$1;

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */


	function Cancel$1(message) {
	  this.message = message;
	}

	Cancel$1.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel$1.prototype.__CANCEL__ = true;
	var Cancel_1 = Cancel$1;

	var Cancel = Cancel_1;
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

	var CancelToken_1 = CancelToken;

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


	var spread = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */


	var isAxiosError = function isAxiosError(payload) {
	  return _typeof(payload) === 'object' && payload.isAxiosError === true;
	};

	var utils$3 = utils$g;
	var bind$2 = bind$4;
	var Axios = Axios_1;
	var mergeConfig = mergeConfig$2;
	var defaults$2 = defaults_1;
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */

	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind$2(Axios.prototype.request, context); // Copy axios.prototype to instance

	  utils$3.extend(instance, Axios.prototype, context); // Copy context to instance

	  utils$3.extend(instance, context);
	  return instance;
	} // Create the default instance to be exported


	var axios$1 = createInstance(defaults$2); // Expose Axios class to allow class inheritance

	axios$1.Axios = Axios; // Factory for creating new instances

	axios$1.create = function create(instanceConfig) {
	  return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
	}; // Expose Cancel & CancelToken


	axios$1.Cancel = Cancel_1;
	axios$1.CancelToken = CancelToken_1;
	axios$1.isCancel = isCancel$1; // Expose all/spread

	axios$1.all = function all(promises) {
	  return Promise.all(promises);
	};

	axios$1.spread = spread; // Expose isAxiosError

	axios$1.isAxiosError = isAxiosError;
	axios$2.exports = axios$1; // Allow use of default import syntax in TypeScript

	axios$2.exports["default"] = axios$1;

	var axios = axios$2.exports;

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	function __spreadArray(to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	}

	/**
	 * Return the base API URI
	 */
	function baseApiUri() {
	    return '/_api/web';
	}

	/* eslint complexity: [2, 18], max-statements: [2, 33] */


	var shams = function hasSymbols() {
	  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
	    return false;
	  }

	  if (_typeof(Symbol.iterator) === 'symbol') {
	    return true;
	  }

	  var obj = {};
	  var sym = Symbol('test');
	  var symObj = Object(sym);

	  if (typeof sym === 'string') {
	    return false;
	  }

	  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
	    return false;
	  }

	  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
	    return false;
	  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
	  // if (sym instanceof Symbol) { return false; }
	  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	  // if (!(symObj instanceof Symbol)) { return false; }
	  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
	  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


	  var symVal = 42;
	  obj[sym] = symVal;

	  for (sym in obj) {
	    return false;
	  } // eslint-disable-line no-restricted-syntax


	  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
	    return false;
	  }

	  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
	    return false;
	  }

	  var syms = Object.getOwnPropertySymbols(obj);

	  if (syms.length !== 1 || syms[0] !== sym) {
	    return false;
	  }

	  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
	    return false;
	  }

	  if (typeof Object.getOwnPropertyDescriptor === 'function') {
	    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

	    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
	      return false;
	    }
	  }

	  return true;
	};

	var origSymbol = commonjsGlobal.Symbol;
	var hasSymbolSham = shams;

	var hasSymbols$1 = function hasNativeSymbols() {
	  if (typeof origSymbol !== 'function') {
	    return false;
	  }

	  if (typeof Symbol !== 'function') {
	    return false;
	  }

	  if (_typeof(origSymbol('foo')) !== 'symbol') {
	    return false;
	  }

	  if (_typeof(Symbol('bar')) !== 'symbol') {
	    return false;
	  }

	  return hasSymbolSham();
	};

	/* eslint no-invalid-this: 1 */


	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr$1 = Object.prototype.toString;
	var funcType = '[object Function]';

	var implementation$1 = function bind(that) {
	  var target = this;

	  if (typeof target !== 'function' || toStr$1.call(target) !== funcType) {
	    throw new TypeError(ERROR_MESSAGE + target);
	  }

	  var args = slice.call(arguments, 1);
	  var bound;

	  var binder = function binder() {
	    if (this instanceof bound) {
	      var result = target.apply(this, args.concat(slice.call(arguments)));

	      if (Object(result) === result) {
	        return result;
	      }

	      return this;
	    } else {
	      return target.apply(that, args.concat(slice.call(arguments)));
	    }
	  };

	  var boundLength = Math.max(0, target.length - args.length);
	  var boundArgs = [];

	  for (var i = 0; i < boundLength; i++) {
	    boundArgs.push('$' + i);
	  }

	  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	  if (target.prototype) {
	    var Empty = function Empty() {};

	    Empty.prototype = target.prototype;
	    bound.prototype = new Empty();
	    Empty.prototype = null;
	  }

	  return bound;
	};

	var implementation = implementation$1;
	var functionBind = Function.prototype.bind || implementation;

	var bind$1 = functionBind;
	var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

	var undefined$1;
	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError$1 = TypeError; // eslint-disable-next-line consistent-return

	var getEvalledConstructor = function getEvalledConstructor(expressionSyntax) {
	  try {
	    return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	  } catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;

	if ($gOPD) {
	  try {
	    $gOPD({}, '');
	  } catch (e) {
	    $gOPD = null; // this is IE 8, which has a broken gOPD
	  }
	}

	var throwTypeError = function throwTypeError() {
	  throw new $TypeError$1();
	};

	var ThrowTypeError = $gOPD ? function () {
	  try {
	    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
	    arguments.callee; // IE 8 does not throw here

	    return throwTypeError;
	  } catch (calleeThrows) {
	    try {
	      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
	      return $gOPD(arguments, 'callee').get;
	    } catch (gOPDthrows) {
	      return throwTypeError;
	    }
	  }
	}() : throwTypeError;
	var hasSymbols = hasSymbols$1();

	var getProto = Object.getPrototypeOf || function (x) {
	  return x.__proto__;
	}; // eslint-disable-line no-proto


	var needsEval = {};
	var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);
	var INTRINSICS = {
	  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	  '%Array%': Array,
	  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	  '%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
	  '%AsyncFromSyncIteratorPrototype%': undefined$1,
	  '%AsyncFunction%': needsEval,
	  '%AsyncGenerator%': needsEval,
	  '%AsyncGeneratorFunction%': needsEval,
	  '%AsyncIteratorPrototype%': needsEval,
	  '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	  '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	  '%Boolean%': Boolean,
	  '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	  '%Date%': Date,
	  '%decodeURI%': decodeURI,
	  '%decodeURIComponent%': decodeURIComponent,
	  '%encodeURI%': encodeURI,
	  '%encodeURIComponent%': encodeURIComponent,
	  '%Error%': Error,
	  '%eval%': eval,
	  // eslint-disable-line no-eval
	  '%EvalError%': EvalError,
	  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	  '%Function%': $Function,
	  '%GeneratorFunction%': needsEval,
	  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	  '%isFinite%': isFinite,
	  '%isNaN%': isNaN,
	  '%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	  '%JSON%': (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) === 'object' ? JSON : undefined$1,
	  '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	  '%Math%': Math,
	  '%Number%': Number,
	  '%Object%': Object,
	  '%parseFloat%': parseFloat,
	  '%parseInt%': parseInt,
	  '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	  '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	  '%RangeError%': RangeError,
	  '%ReferenceError%': ReferenceError,
	  '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	  '%RegExp%': RegExp,
	  '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	  '%String%': String,
	  '%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined$1,
	  '%Symbol%': hasSymbols ? Symbol : undefined$1,
	  '%SyntaxError%': $SyntaxError,
	  '%ThrowTypeError%': ThrowTypeError,
	  '%TypedArray%': TypedArray,
	  '%TypeError%': $TypeError$1,
	  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	  '%URIError%': URIError,
	  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	var doEval = function doEval(name) {
	  var value;

	  if (name === '%AsyncFunction%') {
	    value = getEvalledConstructor('async function () {}');
	  } else if (name === '%GeneratorFunction%') {
	    value = getEvalledConstructor('function* () {}');
	  } else if (name === '%AsyncGeneratorFunction%') {
	    value = getEvalledConstructor('async function* () {}');
	  } else if (name === '%AsyncGenerator%') {
	    var fn = doEval('%AsyncGeneratorFunction%');

	    if (fn) {
	      value = fn.prototype;
	    }
	  } else if (name === '%AsyncIteratorPrototype%') {
	    var gen = doEval('%AsyncGenerator%');

	    if (gen) {
	      value = getProto(gen.prototype);
	    }
	  }

	  INTRINSICS[name] = value;
	  return value;
	};

	var LEGACY_ALIASES = {
	  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	  '%ArrayPrototype%': ['Array', 'prototype'],
	  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
	  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	  '%BooleanPrototype%': ['Boolean', 'prototype'],
	  '%DataViewPrototype%': ['DataView', 'prototype'],
	  '%DatePrototype%': ['Date', 'prototype'],
	  '%ErrorPrototype%': ['Error', 'prototype'],
	  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
	  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	  '%FunctionPrototype%': ['Function', 'prototype'],
	  '%Generator%': ['GeneratorFunction', 'prototype'],
	  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	  '%JSONParse%': ['JSON', 'parse'],
	  '%JSONStringify%': ['JSON', 'stringify'],
	  '%MapPrototype%': ['Map', 'prototype'],
	  '%NumberPrototype%': ['Number', 'prototype'],
	  '%ObjectPrototype%': ['Object', 'prototype'],
	  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	  '%PromisePrototype%': ['Promise', 'prototype'],
	  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	  '%Promise_all%': ['Promise', 'all'],
	  '%Promise_reject%': ['Promise', 'reject'],
	  '%Promise_resolve%': ['Promise', 'resolve'],
	  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
	  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	  '%RegExpPrototype%': ['RegExp', 'prototype'],
	  '%SetPrototype%': ['Set', 'prototype'],
	  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	  '%StringPrototype%': ['String', 'prototype'],
	  '%SymbolPrototype%': ['Symbol', 'prototype'],
	  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
	  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	  '%URIErrorPrototype%': ['URIError', 'prototype'],
	  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
	  '%WeakSetPrototype%': ['WeakSet', 'prototype']
	};
	var bind = functionBind;
	var hasOwn$1 = src;
	var $concat = bind.call(Function.call, Array.prototype.concat);
	var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
	var $replace = bind.call(Function.call, String.prototype.replace);
	var $strSlice = bind.call(Function.call, String.prototype.slice);
	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g;
	/** Used to match backslashes in property paths. */

	var stringToPath = function stringToPath(string) {
	  var first = $strSlice(string, 0, 1);
	  var last = $strSlice(string, -1);

	  if (first === '%' && last !== '%') {
	    throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	  } else if (last === '%' && first !== '%') {
	    throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	  }

	  var result = [];
	  $replace(string, rePropName, function (match, number, quote, subString) {
	    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	  });
	  return result;
	};
	/* end adaptation */


	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	  var intrinsicName = name;
	  var alias;

	  if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
	    alias = LEGACY_ALIASES[intrinsicName];
	    intrinsicName = '%' + alias[0] + '%';
	  }

	  if (hasOwn$1(INTRINSICS, intrinsicName)) {
	    var value = INTRINSICS[intrinsicName];

	    if (value === needsEval) {
	      value = doEval(intrinsicName);
	    }

	    if (typeof value === 'undefined' && !allowMissing) {
	      throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	    }

	    return {
	      alias: alias,
	      name: intrinsicName,
	      value: value
	    };
	  }

	  throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	  if (typeof name !== 'string' || name.length === 0) {
	    throw new $TypeError$1('intrinsic name must be a non-empty string');
	  }

	  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
	    throw new $TypeError$1('"allowMissing" argument must be a boolean');
	  }

	  var parts = stringToPath(name);
	  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
	  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	  var intrinsicRealName = intrinsic.name;
	  var value = intrinsic.value;
	  var skipFurtherCaching = false;
	  var alias = intrinsic.alias;

	  if (alias) {
	    intrinsicBaseName = alias[0];
	    $spliceApply(parts, $concat([0, 1], alias));
	  }

	  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
	    var part = parts[i];
	    var first = $strSlice(part, 0, 1);
	    var last = $strSlice(part, -1);

	    if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
	      throw new $SyntaxError('property names with quotes must have matching quotes');
	    }

	    if (part === 'constructor' || !isOwn) {
	      skipFurtherCaching = true;
	    }

	    intrinsicBaseName += '.' + part;
	    intrinsicRealName = '%' + intrinsicBaseName + '%';

	    if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
	      value = INTRINSICS[intrinsicRealName];
	    } else if (value != null) {
	      if (!(part in value)) {
	        if (!allowMissing) {
	          throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
	        }

	        return void undefined$1;
	      }

	      if ($gOPD && i + 1 >= parts.length) {
	        var desc = $gOPD(value, part);
	        isOwn = !!desc; // By convention, when a data property is converted to an accessor
	        // property to emulate a data property that does not suffer from
	        // the override mistake, that accessor's getter is marked with
	        // an `originalValue` property. Here, when we detect this, we
	        // uphold the illusion by pretending to see that original data
	        // property, i.e., returning the value rather than the getter
	        // itself.

	        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
	          value = desc.get;
	        } else {
	          value = value[part];
	        }
	      } else {
	        isOwn = hasOwn$1(value, part);
	        value = value[part];
	      }

	      if (isOwn && !skipFurtherCaching) {
	        INTRINSICS[intrinsicRealName] = value;
	      }
	    }
	  }

	  return value;
	};

	var callBind$1 = {exports: {}};

	(function (module) {

	  var bind = functionBind;
	  var GetIntrinsic = getIntrinsic;
	  var $apply = GetIntrinsic('%Function.prototype.apply%');
	  var $call = GetIntrinsic('%Function.prototype.call%');
	  var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);
	  var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	  var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	  var $max = GetIntrinsic('%Math.max%');

	  if ($defineProperty) {
	    try {
	      $defineProperty({}, 'a', {
	        value: 1
	      });
	    } catch (e) {
	      // IE 8 has a broken defineProperty
	      $defineProperty = null;
	    }
	  }

	  module.exports = function callBind(originalFunction) {
	    var func = $reflectApply(bind, $call, arguments);

	    if ($gOPD && $defineProperty) {
	      var desc = $gOPD(func, 'length');

	      if (desc.configurable) {
	        // original length, plus the receiver, minus any additional arguments (after the receiver)
	        $defineProperty(func, 'length', {
	          value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
	        });
	      }
	    }

	    return func;
	  };

	  var applyBind = function applyBind() {
	    return $reflectApply(bind, $apply, arguments);
	  };

	  if ($defineProperty) {
	    $defineProperty(module.exports, 'apply', {
	      value: applyBind
	    });
	  } else {
	    module.exports.apply = applyBind;
	  }
	})(callBind$1);

	var GetIntrinsic$1 = getIntrinsic;
	var callBind = callBind$1.exports;
	var $indexOf = callBind(GetIntrinsic$1('String.prototype.indexOf'));

	var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
	  var intrinsic = GetIntrinsic$1(name, !!allowMissing);

	  if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
	    return callBind(intrinsic);
	  }

	  return intrinsic;
	};

	var _nodeResolve_empty = {};

	var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': _nodeResolve_empty
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
	var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
	var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var match = String.prototype.match;
	var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol' ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'object';
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype // eslint-disable-line no-proto
	? function (O) {
	  return O.__proto__; // eslint-disable-line no-proto
	} : null);
	var inspectCustom = require$$0.custom;
	var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
	var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag !== 'undefined' ? Symbol.toStringTag : null;

	var objectInspect = function inspect_(obj, options, depth, seen) {
	  var opts = options || {};

	  if (has$3(opts, 'quoteStyle') && opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double') {
	    throw new TypeError('option "quoteStyle" must be "single" or "double"');
	  }

	  if (has$3(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number' ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
	    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
	  }

	  var customInspect = has$3(opts, 'customInspect') ? opts.customInspect : true;

	  if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
	    throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
	  }

	  if (has$3(opts, 'indent') && opts.indent !== null && opts.indent !== '\t' && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
	    throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
	  }

	  if (typeof obj === 'undefined') {
	    return 'undefined';
	  }

	  if (obj === null) {
	    return 'null';
	  }

	  if (typeof obj === 'boolean') {
	    return obj ? 'true' : 'false';
	  }

	  if (typeof obj === 'string') {
	    return inspectString(obj, opts);
	  }

	  if (typeof obj === 'number') {
	    if (obj === 0) {
	      return Infinity / obj > 0 ? '0' : '-0';
	    }

	    return String(obj);
	  }

	  if (typeof obj === 'bigint') {
	    return String(obj) + 'n';
	  }

	  var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;

	  if (typeof depth === 'undefined') {
	    depth = 0;
	  }

	  if (depth >= maxDepth && maxDepth > 0 && _typeof(obj) === 'object') {
	    return isArray$3(obj) ? '[Array]' : '[Object]';
	  }

	  var indent = getIndent(opts, depth);

	  if (typeof seen === 'undefined') {
	    seen = [];
	  } else if (indexOf(seen, obj) >= 0) {
	    return '[Circular]';
	  }

	  function inspect(value, from, noIndent) {
	    if (from) {
	      seen = seen.slice();
	      seen.push(from);
	    }

	    if (noIndent) {
	      var newOpts = {
	        depth: opts.depth
	      };

	      if (has$3(opts, 'quoteStyle')) {
	        newOpts.quoteStyle = opts.quoteStyle;
	      }

	      return inspect_(value, newOpts, depth + 1, seen);
	    }

	    return inspect_(value, opts, depth + 1, seen);
	  }

	  if (typeof obj === 'function') {
	    var name = nameOf(obj);
	    var keys = arrObjKeys(obj, inspect);
	    return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
	  }

	  if (isSymbol(obj)) {
	    var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
	    return _typeof(obj) === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
	  }

	  if (isElement(obj)) {
	    var s = '<' + String(obj.nodeName).toLowerCase();
	    var attrs = obj.attributes || [];

	    for (var i = 0; i < attrs.length; i++) {
	      s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
	    }

	    s += '>';

	    if (obj.childNodes && obj.childNodes.length) {
	      s += '...';
	    }

	    s += '</' + String(obj.nodeName).toLowerCase() + '>';
	    return s;
	  }

	  if (isArray$3(obj)) {
	    if (obj.length === 0) {
	      return '[]';
	    }

	    var xs = arrObjKeys(obj, inspect);

	    if (indent && !singleLineValues(xs)) {
	      return '[' + indentedJoin(xs, indent) + ']';
	    }

	    return '[ ' + xs.join(', ') + ' ]';
	  }

	  if (isError(obj)) {
	    var parts = arrObjKeys(obj, inspect);

	    if (parts.length === 0) {
	      return '[' + String(obj) + ']';
	    }

	    return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
	  }

	  if (_typeof(obj) === 'object' && customInspect) {
	    if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
	      return obj[inspectSymbol]();
	    } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
	      return obj.inspect();
	    }
	  }

	  if (isMap(obj)) {
	    var mapParts = [];
	    mapForEach.call(obj, function (value, key) {
	      mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
	    });
	    return collectionOf('Map', mapSize.call(obj), mapParts, indent);
	  }

	  if (isSet(obj)) {
	    var setParts = [];
	    setForEach.call(obj, function (value) {
	      setParts.push(inspect(value, obj));
	    });
	    return collectionOf('Set', setSize.call(obj), setParts, indent);
	  }

	  if (isWeakMap(obj)) {
	    return weakCollectionOf('WeakMap');
	  }

	  if (isWeakSet(obj)) {
	    return weakCollectionOf('WeakSet');
	  }

	  if (isWeakRef(obj)) {
	    return weakCollectionOf('WeakRef');
	  }

	  if (isNumber(obj)) {
	    return markBoxed(inspect(Number(obj)));
	  }

	  if (isBigInt(obj)) {
	    return markBoxed(inspect(bigIntValueOf.call(obj)));
	  }

	  if (isBoolean(obj)) {
	    return markBoxed(booleanValueOf.call(obj));
	  }

	  if (isString(obj)) {
	    return markBoxed(inspect(String(obj)));
	  }

	  if (!isDate(obj) && !isRegExp$1(obj)) {
	    var ys = arrObjKeys(obj, inspect);
	    var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
	    var protoTag = obj instanceof Object ? '' : 'null prototype';
	    var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? 'Object' : '';
	    var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
	    var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');

	    if (ys.length === 0) {
	      return tag + '{}';
	    }

	    if (indent) {
	      return tag + '{' + indentedJoin(ys, indent) + '}';
	    }

	    return tag + '{ ' + ys.join(', ') + ' }';
	  }

	  return String(obj);
	};

	function wrapQuotes(s, defaultStyle, opts) {
	  var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
	  return quoteChar + s + quoteChar;
	}

	function quote(s) {
	  return String(s).replace(/"/g, '&quot;');
	}

	function isArray$3(obj) {
	  return toStr(obj) === '[object Array]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
	}

	function isDate(obj) {
	  return toStr(obj) === '[object Date]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
	}

	function isRegExp$1(obj) {
	  return toStr(obj) === '[object RegExp]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
	}

	function isError(obj) {
	  return toStr(obj) === '[object Error]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
	}

	function isString(obj) {
	  return toStr(obj) === '[object String]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
	}

	function isNumber(obj) {
	  return toStr(obj) === '[object Number]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
	}

	function isBoolean(obj) {
	  return toStr(obj) === '[object Boolean]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
	} // Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives


	function isSymbol(obj) {
	  if (hasShammedSymbols) {
	    return obj && _typeof(obj) === 'object' && obj instanceof Symbol;
	  }

	  if (_typeof(obj) === 'symbol') {
	    return true;
	  }

	  if (!obj || _typeof(obj) !== 'object' || !symToString) {
	    return false;
	  }

	  try {
	    symToString.call(obj);
	    return true;
	  } catch (e) {}

	  return false;
	}

	function isBigInt(obj) {
	  if (!obj || _typeof(obj) !== 'object' || !bigIntValueOf) {
	    return false;
	  }

	  try {
	    bigIntValueOf.call(obj);
	    return true;
	  } catch (e) {}

	  return false;
	}

	var hasOwn = Object.prototype.hasOwnProperty || function (key) {
	  return key in this;
	};

	function has$3(obj, key) {
	  return hasOwn.call(obj, key);
	}

	function toStr(obj) {
	  return objectToString.call(obj);
	}

	function nameOf(f) {
	  if (f.name) {
	    return f.name;
	  }

	  var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);

	  if (m) {
	    return m[1];
	  }

	  return null;
	}

	function indexOf(xs, x) {
	  if (xs.indexOf) {
	    return xs.indexOf(x);
	  }

	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) {
	      return i;
	    }
	  }

	  return -1;
	}

	function isMap(x) {
	  if (!mapSize || !x || _typeof(x) !== 'object') {
	    return false;
	  }

	  try {
	    mapSize.call(x);

	    try {
	      setSize.call(x);
	    } catch (s) {
	      return true;
	    }

	    return x instanceof Map; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isWeakMap(x) {
	  if (!weakMapHas || !x || _typeof(x) !== 'object') {
	    return false;
	  }

	  try {
	    weakMapHas.call(x, weakMapHas);

	    try {
	      weakSetHas.call(x, weakSetHas);
	    } catch (s) {
	      return true;
	    }

	    return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isWeakRef(x) {
	  if (!weakRefDeref || !x || _typeof(x) !== 'object') {
	    return false;
	  }

	  try {
	    weakRefDeref.call(x);
	    return true;
	  } catch (e) {}

	  return false;
	}

	function isSet(x) {
	  if (!setSize || !x || _typeof(x) !== 'object') {
	    return false;
	  }

	  try {
	    setSize.call(x);

	    try {
	      mapSize.call(x);
	    } catch (m) {
	      return true;
	    }

	    return x instanceof Set; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isWeakSet(x) {
	  if (!weakSetHas || !x || _typeof(x) !== 'object') {
	    return false;
	  }

	  try {
	    weakSetHas.call(x, weakSetHas);

	    try {
	      weakMapHas.call(x, weakMapHas);
	    } catch (s) {
	      return true;
	    }

	    return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isElement(x) {
	  if (!x || _typeof(x) !== 'object') {
	    return false;
	  }

	  if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	    return true;
	  }

	  return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str, opts) {
	  if (str.length > opts.maxStringLength) {
	    var remaining = str.length - opts.maxStringLength;
	    var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
	    return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
	  } // eslint-disable-next-line no-control-regex


	  var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	  return wrapQuotes(s, 'single', opts);
	}

	function lowbyte(c) {
	  var n = c.charCodeAt(0);
	  var x = {
	    8: 'b',
	    9: 't',
	    10: 'n',
	    12: 'f',
	    13: 'r'
	  }[n];

	  if (x) {
	    return '\\' + x;
	  }

	  return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
	}

	function markBoxed(str) {
	  return 'Object(' + str + ')';
	}

	function weakCollectionOf(type) {
	  return type + ' { ? }';
	}

	function collectionOf(type, size, entries, indent) {
	  var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
	  return type + ' (' + size + ') {' + joinedEntries + '}';
	}

	function singleLineValues(xs) {
	  for (var i = 0; i < xs.length; i++) {
	    if (indexOf(xs[i], '\n') >= 0) {
	      return false;
	    }
	  }

	  return true;
	}

	function getIndent(opts, depth) {
	  var baseIndent;

	  if (opts.indent === '\t') {
	    baseIndent = '\t';
	  } else if (typeof opts.indent === 'number' && opts.indent > 0) {
	    baseIndent = Array(opts.indent + 1).join(' ');
	  } else {
	    return null;
	  }

	  return {
	    base: baseIndent,
	    prev: Array(depth + 1).join(baseIndent)
	  };
	}

	function indentedJoin(xs, indent) {
	  if (xs.length === 0) {
	    return '';
	  }

	  var lineJoiner = '\n' + indent.prev + indent.base;
	  return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
	}

	function arrObjKeys(obj, inspect) {
	  var isArr = isArray$3(obj);
	  var xs = [];

	  if (isArr) {
	    xs.length = obj.length;

	    for (var i = 0; i < obj.length; i++) {
	      xs[i] = has$3(obj, i) ? inspect(obj[i], obj) : '';
	    }
	  }

	  var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
	  var symMap;

	  if (hasShammedSymbols) {
	    symMap = {};

	    for (var k = 0; k < syms.length; k++) {
	      symMap['$' + syms[k]] = syms[k];
	    }
	  }

	  for (var key in obj) {
	    // eslint-disable-line no-restricted-syntax
	    if (!has$3(obj, key)) {
	      continue;
	    } // eslint-disable-line no-restricted-syntax, no-continue


	    if (isArr && String(Number(key)) === key && key < obj.length) {
	      continue;
	    } // eslint-disable-line no-restricted-syntax, no-continue


	    if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
	      // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
	      continue; // eslint-disable-line no-restricted-syntax, no-continue
	    } else if (/[^\w$]/.test(key)) {
	      xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
	    } else {
	      xs.push(key + ': ' + inspect(obj[key], obj));
	    }
	  }

	  if (typeof gOPS === 'function') {
	    for (var j = 0; j < syms.length; j++) {
	      if (isEnumerable.call(obj, syms[j])) {
	        xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
	      }
	    }
	  }

	  return xs;
	}

	var GetIntrinsic = getIntrinsic;
	var callBound = callBound$1;
	var inspect = objectInspect;
	var $TypeError = GetIntrinsic('%TypeError%');
	var $WeakMap = GetIntrinsic('%WeakMap%', true);
	var $Map = GetIntrinsic('%Map%', true);
	var $weakMapGet = callBound('WeakMap.prototype.get', true);
	var $weakMapSet = callBound('WeakMap.prototype.set', true);
	var $weakMapHas = callBound('WeakMap.prototype.has', true);
	var $mapGet = callBound('Map.prototype.get', true);
	var $mapSet = callBound('Map.prototype.set', true);
	var $mapHas = callBound('Map.prototype.has', true);
	/*
	 * This function traverses the list returning the node corresponding to the
	 * given key.
	 *
	 * That node is also moved to the head of the list, so that if it's accessed
	 * again we don't need to traverse the whole list. By doing so, all the recently
	 * used nodes can be accessed relatively quickly.
	 */

	var listGetNode = function listGetNode(list, key) {
	  // eslint-disable-line consistent-return
	  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
	    if (curr.key === key) {
	      prev.next = curr.next;
	      curr.next = list.next;
	      list.next = curr; // eslint-disable-line no-param-reassign

	      return curr;
	    }
	  }
	};

	var listGet = function listGet(objects, key) {
	  var node = listGetNode(objects, key);
	  return node && node.value;
	};

	var listSet = function listSet(objects, key, value) {
	  var node = listGetNode(objects, key);

	  if (node) {
	    node.value = value;
	  } else {
	    // Prepend the new node to the beginning of the list
	    objects.next = {
	      // eslint-disable-line no-param-reassign
	      key: key,
	      next: objects.next,
	      value: value
	    };
	  }
	};

	var listHas = function listHas(objects, key) {
	  return !!listGetNode(objects, key);
	};

	var sideChannel = function getSideChannel() {
	  var $wm;
	  var $m;
	  var $o;
	  var channel = {
	    assert: function assert(key) {
	      if (!channel.has(key)) {
	        throw new $TypeError('Side channel does not contain ' + inspect(key));
	      }
	    },
	    get: function get(key) {
	      // eslint-disable-line consistent-return
	      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
	        if ($wm) {
	          return $weakMapGet($wm, key);
	        }
	      } else if ($Map) {
	        if ($m) {
	          return $mapGet($m, key);
	        }
	      } else {
	        if ($o) {
	          // eslint-disable-line no-lonely-if
	          return listGet($o, key);
	        }
	      }
	    },
	    has: function has(key) {
	      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
	        if ($wm) {
	          return $weakMapHas($wm, key);
	        }
	      } else if ($Map) {
	        if ($m) {
	          return $mapHas($m, key);
	        }
	      } else {
	        if ($o) {
	          // eslint-disable-line no-lonely-if
	          return listHas($o, key);
	        }
	      }

	      return false;
	    },
	    set: function set(key, value) {
	      if ($WeakMap && key && (_typeof(key) === 'object' || typeof key === 'function')) {
	        if (!$wm) {
	          $wm = new $WeakMap();
	        }

	        $weakMapSet($wm, key, value);
	      } else if ($Map) {
	        if (!$m) {
	          $m = new $Map();
	        }

	        $mapSet($m, key, value);
	      } else {
	        if (!$o) {
	          /*
	           * Initialize the linked list as an empty node, so that we don't have
	           * to special-case handling of the first node: we can always refer to
	           * it as (previous node).next, instead of something like (list).head
	           */
	          $o = {
	            key: {},
	            next: null
	          };
	        }

	        listSet($o, key, value);
	      }
	    }
	  };
	  return channel;
	};

	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;
	var Format = {
	  RFC1738: 'RFC1738',
	  RFC3986: 'RFC3986'
	};
	var formats$3 = {
	  'default': Format.RFC3986,
	  formatters: {
	    RFC1738: function RFC1738(value) {
	      return replace.call(value, percentTwenties, '+');
	    },
	    RFC3986: function RFC3986(value) {
	      return String(value);
	    }
	  },
	  RFC1738: Format.RFC1738,
	  RFC3986: Format.RFC3986
	};

	var formats$2 = formats$3;
	var has$2 = Object.prototype.hasOwnProperty;
	var isArray$2 = Array.isArray;

	var hexTable = function () {
	  var array = [];

	  for (var i = 0; i < 256; ++i) {
	    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
	  }

	  return array;
	}();

	var compactQueue = function compactQueue(queue) {
	  while (queue.length > 1) {
	    var item = queue.pop();
	    var obj = item.obj[item.prop];

	    if (isArray$2(obj)) {
	      var compacted = [];

	      for (var j = 0; j < obj.length; ++j) {
	        if (typeof obj[j] !== 'undefined') {
	          compacted.push(obj[j]);
	        }
	      }

	      item.obj[item.prop] = compacted;
	    }
	  }
	};

	var arrayToObject = function arrayToObject(source, options) {
	  var obj = options && options.plainObjects ? Object.create(null) : {};

	  for (var i = 0; i < source.length; ++i) {
	    if (typeof source[i] !== 'undefined') {
	      obj[i] = source[i];
	    }
	  }

	  return obj;
	};

	var merge = function merge(target, source, options) {
	  /* eslint no-param-reassign: 0 */
	  if (!source) {
	    return target;
	  }

	  if (_typeof(source) !== 'object') {
	    if (isArray$2(target)) {
	      target.push(source);
	    } else if (target && _typeof(target) === 'object') {
	      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
	        target[source] = true;
	      }
	    } else {
	      return [target, source];
	    }

	    return target;
	  }

	  if (!target || _typeof(target) !== 'object') {
	    return [target].concat(source);
	  }

	  var mergeTarget = target;

	  if (isArray$2(target) && !isArray$2(source)) {
	    mergeTarget = arrayToObject(target, options);
	  }

	  if (isArray$2(target) && isArray$2(source)) {
	    source.forEach(function (item, i) {
	      if (has$2.call(target, i)) {
	        var targetItem = target[i];

	        if (targetItem && _typeof(targetItem) === 'object' && item && _typeof(item) === 'object') {
	          target[i] = merge(targetItem, item, options);
	        } else {
	          target.push(item);
	        }
	      } else {
	        target[i] = item;
	      }
	    });
	    return target;
	  }

	  return Object.keys(source).reduce(function (acc, key) {
	    var value = source[key];

	    if (has$2.call(acc, key)) {
	      acc[key] = merge(acc[key], value, options);
	    } else {
	      acc[key] = value;
	    }

	    return acc;
	  }, mergeTarget);
	};

	var assign = function assignSingleSource(target, source) {
	  return Object.keys(source).reduce(function (acc, key) {
	    acc[key] = source[key];
	    return acc;
	  }, target);
	};

	var decode = function decode(str, decoder, charset) {
	  var strWithoutPlus = str.replace(/\+/g, ' ');

	  if (charset === 'iso-8859-1') {
	    // unescape never throws, no try...catch needed:
	    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
	  } // utf-8


	  try {
	    return decodeURIComponent(strWithoutPlus);
	  } catch (e) {
	    return strWithoutPlus;
	  }
	};

	var encode = function encode(str, defaultEncoder, charset, kind, format) {
	  // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	  // It has been adapted here for stricter adherence to RFC 3986
	  if (str.length === 0) {
	    return str;
	  }

	  var string = str;

	  if (_typeof(str) === 'symbol') {
	    string = Symbol.prototype.toString.call(str);
	  } else if (typeof str !== 'string') {
	    string = String(str);
	  }

	  if (charset === 'iso-8859-1') {
	    return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
	      return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
	    });
	  }

	  var out = '';

	  for (var i = 0; i < string.length; ++i) {
	    var c = string.charCodeAt(i);

	    if (c === 0x2D // -
	    || c === 0x2E // .
	    || c === 0x5F // _
	    || c === 0x7E // ~
	    || c >= 0x30 && c <= 0x39 // 0-9
	    || c >= 0x41 && c <= 0x5A // a-z
	    || c >= 0x61 && c <= 0x7A // A-Z
	    || format === formats$2.RFC1738 && (c === 0x28 || c === 0x29) // ( )
	    ) {
	      out += string.charAt(i);
	      continue;
	    }

	    if (c < 0x80) {
	      out = out + hexTable[c];
	      continue;
	    }

	    if (c < 0x800) {
	      out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
	      continue;
	    }

	    if (c < 0xD800 || c >= 0xE000) {
	      out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
	      continue;
	    }

	    i += 1;
	    c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
	    out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
	  }

	  return out;
	};

	var compact = function compact(value) {
	  var queue = [{
	    obj: {
	      o: value
	    },
	    prop: 'o'
	  }];
	  var refs = [];

	  for (var i = 0; i < queue.length; ++i) {
	    var item = queue[i];
	    var obj = item.obj[item.prop];
	    var keys = Object.keys(obj);

	    for (var j = 0; j < keys.length; ++j) {
	      var key = keys[j];
	      var val = obj[key];

	      if (_typeof(val) === 'object' && val !== null && refs.indexOf(val) === -1) {
	        queue.push({
	          obj: obj,
	          prop: key
	        });
	        refs.push(val);
	      }
	    }
	  }

	  compactQueue(queue);
	  return value;
	};

	var isRegExp = function isRegExp(obj) {
	  return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	var isBuffer = function isBuffer(obj) {
	  if (!obj || _typeof(obj) !== 'object') {
	    return false;
	  }

	  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};

	var combine = function combine(a, b) {
	  return [].concat(a, b);
	};

	var maybeMap = function maybeMap(val, fn) {
	  if (isArray$2(val)) {
	    var mapped = [];

	    for (var i = 0; i < val.length; i += 1) {
	      mapped.push(fn(val[i]));
	    }

	    return mapped;
	  }

	  return fn(val);
	};

	var utils$2 = {
	  arrayToObject: arrayToObject,
	  assign: assign,
	  combine: combine,
	  compact: compact,
	  decode: decode,
	  encode: encode,
	  isBuffer: isBuffer,
	  isRegExp: isRegExp,
	  maybeMap: maybeMap,
	  merge: merge
	};

	var getSideChannel = sideChannel;
	var utils$1 = utils$2;
	var formats$1 = formats$3;
	var has$1 = Object.prototype.hasOwnProperty;
	var arrayPrefixGenerators = {
	  brackets: function brackets(prefix) {
	    return prefix + '[]';
	  },
	  comma: 'comma',
	  indices: function indices(prefix, key) {
	    return prefix + '[' + key + ']';
	  },
	  repeat: function repeat(prefix) {
	    return prefix;
	  }
	};
	var isArray$1 = Array.isArray;
	var push = Array.prototype.push;

	var pushToArray = function pushToArray(arr, valueOrArray) {
	  push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
	};

	var toISO = Date.prototype.toISOString;
	var defaultFormat = formats$1['default'];
	var defaults$1 = {
	  addQueryPrefix: false,
	  allowDots: false,
	  charset: 'utf-8',
	  charsetSentinel: false,
	  delimiter: '&',
	  encode: true,
	  encoder: utils$1.encode,
	  encodeValuesOnly: false,
	  format: defaultFormat,
	  formatter: formats$1.formatters[defaultFormat],
	  // deprecated
	  indices: false,
	  serializeDate: function serializeDate(date) {
	    return toISO.call(date);
	  },
	  skipNulls: false,
	  strictNullHandling: false
	};

	var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
	  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || _typeof(v) === 'symbol' || typeof v === 'bigint';
	};

	var stringify$1 = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
	  var obj = object;

	  if (sideChannel.has(object)) {
	    throw new RangeError('Cyclic object value');
	  }

	  if (typeof filter === 'function') {
	    obj = filter(prefix, obj);
	  } else if (obj instanceof Date) {
	    obj = serializeDate(obj);
	  } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
	    obj = utils$1.maybeMap(obj, function (value) {
	      if (value instanceof Date) {
	        return serializeDate(value);
	      }

	      return value;
	    });
	  }

	  if (obj === null) {
	    if (strictNullHandling) {
	      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, 'key', format) : prefix;
	    }

	    obj = '';
	  }

	  if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
	    if (encoder) {
	      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, 'key', format);
	      return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset, 'value', format))];
	    }

	    return [formatter(prefix) + '=' + formatter(String(obj))];
	  }

	  var values = [];

	  if (typeof obj === 'undefined') {
	    return values;
	  }

	  var objKeys;

	  if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
	    // we need to join elements in
	    objKeys = [{
	      value: obj.length > 0 ? obj.join(',') || null : undefined
	    }];
	  } else if (isArray$1(filter)) {
	    objKeys = filter;
	  } else {
	    var keys = Object.keys(obj);
	    objKeys = sort ? keys.sort(sort) : keys;
	  }

	  for (var i = 0; i < objKeys.length; ++i) {
	    var key = objKeys[i];
	    var value = _typeof(key) === 'object' && key.value !== undefined ? key.value : obj[key];

	    if (skipNulls && value === null) {
	      continue;
	    }

	    var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? '.' + key : '[' + key + ']');
	    sideChannel.set(object, true);
	    var valueSideChannel = getSideChannel();
	    pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
	  }

	  return values;
	};

	var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
	  if (!opts) {
	    return defaults$1;
	  }

	  if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
	    throw new TypeError('Encoder has to be a function.');
	  }

	  var charset = opts.charset || defaults$1.charset;

	  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	  }

	  var format = formats$1['default'];

	  if (typeof opts.format !== 'undefined') {
	    if (!has$1.call(formats$1.formatters, opts.format)) {
	      throw new TypeError('Unknown format option provided.');
	    }

	    format = opts.format;
	  }

	  var formatter = formats$1.formatters[format];
	  var filter = defaults$1.filter;

	  if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
	    filter = opts.filter;
	  }

	  return {
	    addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
	    allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
	    charset: charset,
	    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
	    delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
	    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
	    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
	    encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
	    filter: filter,
	    format: format,
	    formatter: formatter,
	    serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
	    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
	    sort: typeof opts.sort === 'function' ? opts.sort : null,
	    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
	  };
	};

	var stringify_1 = function stringify_1(object, opts) {
	  var obj = object;
	  var options = normalizeStringifyOptions(opts);
	  var objKeys;
	  var filter;

	  if (typeof options.filter === 'function') {
	    filter = options.filter;
	    obj = filter('', obj);
	  } else if (isArray$1(options.filter)) {
	    filter = options.filter;
	    objKeys = filter;
	  }

	  var keys = [];

	  if (_typeof(obj) !== 'object' || obj === null) {
	    return '';
	  }

	  var arrayFormat;

	  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
	    arrayFormat = opts.arrayFormat;
	  } else if (opts && 'indices' in opts) {
	    arrayFormat = opts.indices ? 'indices' : 'repeat';
	  } else {
	    arrayFormat = 'indices';
	  }

	  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

	  if (!objKeys) {
	    objKeys = Object.keys(obj);
	  }

	  if (options.sort) {
	    objKeys.sort(options.sort);
	  }

	  var sideChannel = getSideChannel();

	  for (var i = 0; i < objKeys.length; ++i) {
	    var key = objKeys[i];

	    if (options.skipNulls && obj[key] === null) {
	      continue;
	    }

	    pushToArray(keys, stringify$1(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
	  }

	  var joined = keys.join(options.delimiter);
	  var prefix = options.addQueryPrefix === true ? '?' : '';

	  if (options.charsetSentinel) {
	    if (options.charset === 'iso-8859-1') {
	      // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
	      prefix += 'utf8=%26%2310003%3B&';
	    } else {
	      // encodeURIComponent('✓')
	      prefix += 'utf8=%E2%9C%93&';
	    }
	  }

	  return joined.length > 0 ? prefix + joined : '';
	};

	var utils = utils$2;
	var has = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;
	var defaults = {
	  allowDots: false,
	  allowPrototypes: false,
	  allowSparse: false,
	  arrayLimit: 20,
	  charset: 'utf-8',
	  charsetSentinel: false,
	  comma: false,
	  decoder: utils.decode,
	  delimiter: '&',
	  depth: 5,
	  ignoreQueryPrefix: false,
	  interpretNumericEntities: false,
	  parameterLimit: 1000,
	  parseArrays: true,
	  plainObjects: false,
	  strictNullHandling: false
	};

	var interpretNumericEntities = function interpretNumericEntities(str) {
	  return str.replace(/&#(\d+);/g, function ($0, numberStr) {
	    return String.fromCharCode(parseInt(numberStr, 10));
	  });
	};

	var parseArrayValue = function parseArrayValue(val, options) {
	  if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
	    return val.split(',');
	  }

	  return val;
	}; // This is what browsers will submit when the ✓ character occurs in an
	// application/x-www-form-urlencoded body and the encoding of the page containing
	// the form is iso-8859-1, or when the submitted form has an accept-charset
	// attribute of iso-8859-1. Presumably also with other charsets that do not contain
	// the ✓ character, such as us-ascii.


	var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
	// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.

	var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

	var parseValues = function parseQueryStringValues(str, options) {
	  var obj = {};
	  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
	  var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
	  var parts = cleanStr.split(options.delimiter, limit);
	  var skipIndex = -1; // Keep track of where the utf8 sentinel was found

	  var i;
	  var charset = options.charset;

	  if (options.charsetSentinel) {
	    for (i = 0; i < parts.length; ++i) {
	      if (parts[i].indexOf('utf8=') === 0) {
	        if (parts[i] === charsetSentinel) {
	          charset = 'utf-8';
	        } else if (parts[i] === isoSentinel) {
	          charset = 'iso-8859-1';
	        }

	        skipIndex = i;
	        i = parts.length; // The eslint settings do not allow break;
	      }
	    }
	  }

	  for (i = 0; i < parts.length; ++i) {
	    if (i === skipIndex) {
	      continue;
	    }

	    var part = parts[i];
	    var bracketEqualsPos = part.indexOf(']=');
	    var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
	    var key, val;

	    if (pos === -1) {
	      key = options.decoder(part, defaults.decoder, charset, 'key');
	      val = options.strictNullHandling ? null : '';
	    } else {
	      key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
	      val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function (encodedVal) {
	        return options.decoder(encodedVal, defaults.decoder, charset, 'value');
	      });
	    }

	    if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
	      val = interpretNumericEntities(val);
	    }

	    if (part.indexOf('[]=') > -1) {
	      val = isArray(val) ? [val] : val;
	    }

	    if (has.call(obj, key)) {
	      obj[key] = utils.combine(obj[key], val);
	    } else {
	      obj[key] = val;
	    }
	  }

	  return obj;
	};

	var parseObject = function parseObject(chain, val, options, valuesParsed) {
	  var leaf = valuesParsed ? val : parseArrayValue(val, options);

	  for (var i = chain.length - 1; i >= 0; --i) {
	    var obj;
	    var root = chain[i];

	    if (root === '[]' && options.parseArrays) {
	      obj = [].concat(leaf);
	    } else {
	      obj = options.plainObjects ? Object.create(null) : {};
	      var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
	      var index = parseInt(cleanRoot, 10);

	      if (!options.parseArrays && cleanRoot === '') {
	        obj = {
	          0: leaf
	        };
	      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
	        obj = [];
	        obj[index] = leaf;
	      } else {
	        obj[cleanRoot] = leaf;
	      }
	    }

	    leaf = obj;
	  }

	  return leaf;
	};

	var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
	  if (!givenKey) {
	    return;
	  } // Transform dot notation to bracket notation


	  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey; // The regex chunks

	  var brackets = /(\[[^[\]]*])/;
	  var child = /(\[[^[\]]*])/g; // Get the parent

	  var segment = options.depth > 0 && brackets.exec(key);
	  var parent = segment ? key.slice(0, segment.index) : key; // Stash the parent if it exists

	  var keys = [];

	  if (parent) {
	    // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
	    if (!options.plainObjects && has.call(Object.prototype, parent)) {
	      if (!options.allowPrototypes) {
	        return;
	      }
	    }

	    keys.push(parent);
	  } // Loop through children appending to the array until we hit depth


	  var i = 0;

	  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
	    i += 1;

	    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
	      if (!options.allowPrototypes) {
	        return;
	      }
	    }

	    keys.push(segment[1]);
	  } // If there's a remainder, just add whatever is left


	  if (segment) {
	    keys.push('[' + key.slice(segment.index) + ']');
	  }

	  return parseObject(keys, val, options, valuesParsed);
	};

	var normalizeParseOptions = function normalizeParseOptions(opts) {
	  if (!opts) {
	    return defaults;
	  }

	  if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
	    throw new TypeError('Decoder has to be a function.');
	  }

	  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	  }

	  var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;
	  return {
	    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
	    allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
	    allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
	    arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
	    charset: charset,
	    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
	    comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
	    decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
	    delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
	    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
	    depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults.depth,
	    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
	    interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
	    parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
	    parseArrays: opts.parseArrays !== false,
	    plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
	    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
	  };
	};

	var parse$1 = function parse(str, opts) {
	  var options = normalizeParseOptions(opts);

	  if (str === '' || str === null || typeof str === 'undefined') {
	    return options.plainObjects ? Object.create(null) : {};
	  }

	  var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	  var obj = options.plainObjects ? Object.create(null) : {}; // Iterate over the keys and setup the new object

	  var keys = Object.keys(tempObj);

	  for (var i = 0; i < keys.length; ++i) {
	    var key = keys[i];
	    var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
	    obj = utils.merge(obj, newObj, options);
	  }

	  if (options.allowSparse === true) {
	    return obj;
	  }

	  return utils.compact(obj);
	};

	var stringify = stringify_1;
	var parse = parse$1;
	var formats = formats$3;
	var lib = {
	  formats: formats,
	  parse: parse,
	  stringify: stringify
	};

	/**
	 * Converts possible query string inputs into
	 */
	function stringifyQuery(query) {
	    if (!query) {
	        return '';
	    }
	    if (typeof query === 'string') {
	        return (query[0] === '$' ? "?" + query : query);
	    }
	    return "?" + lib.stringify(query);
	}

	/**
	 * Return URI for all the libraries
	 */
	function index$1(query) {
	    return baseApiUri() + "/Folders" + stringifyQuery(query);
	}
	/**
	 * Return URI to access folder by relative URL
	 */
	function folderByUrl(relativeUrl) {
	    return baseApiUri() + "/GetFolderByServerRelativeUrl('" + relativeUrl + "')";
	}
	/**
	 * Return URL to list of folders within a given folder
	 */
	function foldersInFolder(relativeUrl, query) {
	    return folderByUrl(relativeUrl) + "/Folders" + stringifyQuery(query);
	}
	/**
	 * Return URL to list of files within a given folder
	 */
	function filesInFolder(relativeUrl, query) {
	    return folderByUrl(relativeUrl) + "/Files" + stringifyQuery(query);
	}
	/**
	 * Return URL to upload a file to a folder
	 */
	function newFileToFolder(relativeUrl, fileName, overwrite) {
	    if (overwrite === void 0) { overwrite = true; }
	    return filesInFolder(relativeUrl) + "/Add(overwrite=" + overwrite + ",url='" + fileName + "')";
	}
	/**
	 * Return URI to access files by relative URL
	 */
	function fileByUrl(relativeUrl) {
	    return baseApiUri() + "/GetFileByServerRelativeUrl('" + relativeUrl + "')";
	}

	/**
	 * Return URI to get all lists metadata
	 */
	function index(query) {
	    return baseApiUri() + "/Lists" + stringifyQuery(query);
	}
	/**
	 * Return URI to get a given list metadata
	 */
	function byTitle(listTitle, query) {
	    return index() + "/GetByTitle('" + listTitle + "')" + stringifyQuery(query);
	}
	/**
	 * Return URI to get a given list fields
	 */
	function fields(listTitle, query) {
	    return byTitle(listTitle) + "/Fields" + stringifyQuery(query);
	}
	/**
	 * Return URI to get a given list items
	 */
	function items(listTitle, query) {
	    return byTitle(listTitle) + "/Items" + stringifyQuery(query);
	}
	/**
	 * Return URI to get an specific list item
	 */
	function itemById(listTitle, itemId, query) {
	    return items(listTitle, "(" + itemId + ")" + stringifyQuery(query));
	}
	/**
	 * Return URI to handle list items attachments
	 */
	function itemAttachments(listTitle, itemId) {
	    return itemById(listTitle, itemId) + "/AttachmentFiles";
	}
	/**
	 * Return URI to handle list items attachments
	 */
	function itemAttachmentByName(listTitle, itemId, fileName) {
	    return itemById(listTitle, itemId) + "/AttachmentFiles/GetByFileName('" + fileName + "')";
	}
	/**
	 * Return URI to handle upload of list items attachments
	 */
	function itemAttachmentsUpload(listTitle, itemId, fileName) {
	    return itemAttachments(listTitle, itemId) + "/Add(filename='" + fileName + "')";
	}
	/**
	 * Return URI to handle renaming of list items attachments
	 */
	function itemAttachmentsRename(oldFileUrl, newFileUrl) {
	    return fileByUrl(oldFileUrl) + "/MoveTo(newurl='" + newFileUrl + "',flags=1)";
	}

	/**
	 * Return URI to get basic information for current user
	 */
	function current() {
	    return baseApiUri() + "/CurrentUser";
	}
	/**
	 * Return URI to get users list metadata
	 */
	function listMetadata() {
	    return baseApiUri() + "/SiteUserInfoList";
	}
	/**
	 * Return URI to get users list fields
	 */
	function listFields(query) {
	    return listMetadata() + "/Fields" + stringifyQuery(query);
	}
	/**
	 * Return URI to get users records
	 */
	function listItems(query) {
	    return listMetadata() + "/Items" + stringifyQuery(query);
	}
	/**
	 * Return URI to get a given user information
	 */
	function byId(id) {
	    return listMetadata() + "/Items(" + id + ")";
	}

	/**
	 * Return URI for site metadata
	 */
	function info() {
	    return baseApiUri();
	}
	/**
	 * Return URI for site context information
	 */
	function contextInfo() {
	    return '/_api/ContextInfo';
	}
	/**
	 * Return URI for site's parent info
	 */
	function parentSite() {
	    return baseApiUri() + "/ParentWeb";
	}
	/**
	 * Return URI for site's recycle bin
	 */
	function recycleBin() {
	    return baseApiUri() + "/RecycleBin";
	}
	/**
	 * Return URI for site regional settings
	 */
	function regionalSettings() {
	    return baseApiUri() + "/RegionalSettings";
	}

	/**
	 * Taxes an AxiosResponse and rewrap it as a XomApiRawResponse object.
	 */
	function rewrapResponse(response) {
	    var data = response.data, metadata = __rest(response, ["data"]);
	    var newResponse = data || {};
	    Object.defineProperty(newResponse, '__response', {
	        value: metadata,
	        writable: true,
	    });
	    return newResponse;
	}

	var SMALL_PICTURE_CODE = '_SThumb';
	var MEDIUM_PICTURE_CODE = '_MThumb';
	var LARGE_PICTURE_CODE = '_LThumb';
	/**
	 * Properly expands picture size URL options for given object property.
	 */
	function expandPictureURL(userObject) {
	    var _a;
	    if (userObject) {
	        var url = (_a = userObject.Picture) === null || _a === void 0 ? void 0 : _a.Url; // encodeURI(userObject.Picture.Url)
	        var targetExpression = new RegExp(SMALL_PICTURE_CODE + "|" + MEDIUM_PICTURE_CODE + "|" + LARGE_PICTURE_CODE, 'i');
	        userObject.Picture = {
	            Small: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, SMALL_PICTURE_CODE)) || null,
	            Medium: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, MEDIUM_PICTURE_CODE)) || null,
	            Large: (url === null || url === void 0 ? void 0 : url.replace(targetExpression, LARGE_PICTURE_CODE)) || null,
	        };
	    }
	    return userObject;
	}

	/**
	 * Fetch site root API
	 */
	function getSite(http) {
	    var uri = info();
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch site context API for the request digest
	 */
	function getRequestDigest(http) {
	    return __awaiter(this, void 0, void 0, function () {
	        var uri, response;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    uri = contextInfo();
	                    return [4 /*yield*/, http
	                            .post(uri, null, { digest: false })
	                            .then(rewrapResponse)];
	                case 1:
	                    response = _a.sent();
	                    return [2 /*return*/, response.FormDigestValue || response.GetContextWebInformation.FormDigestValue];
	            }
	        });
	    });
	}
	/**
	 * Fetch for site parent metadata
	 */
	function getSiteParent(http) {
	    var uri = parentSite();
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch list of content in site Recycle Bin
	 */
	function getSiteRecycleBin(http) {
	    var uri = recycleBin();
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch for site Regional Settings
	 */
	function getSiteRegionalSettings(http) {
	    var uri = regionalSettings();
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch for basic current user information
	 */
	function getSiteCurrentUser(http) {
	    var uri = current();
	    return http
	        .get(uri)
	        .then(rewrapResponse)
	        .then(expandPictureURL);
	}
	/**
	 * Fetch list metadata for site users
	 */
	function getSiteUsersList(http) {
	    var uri = listMetadata();
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch list fields metadata for site users
	 */
	function getSiteUsersListFields(http, query) {
	    var uri = listFields(query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch list items for site users
	 */
	function getSiteUsersListItems(http, query) {
	    return __awaiter(this, void 0, void 0, function () {
	        var uri, users;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    uri = listItems(query);
	                    return [4 /*yield*/, http
	                            .get(uri)
	                            .then(rewrapResponse)];
	                case 1:
	                    users = _a.sent();
	                    users.forEach(expandPictureURL);
	                    return [2 /*return*/, users];
	            }
	        });
	    });
	}
	/**
	 * Fetch a single list item with user information
	 */
	function getSiteUserById(http, id) {
	    var uri = byId(id);
	    return http
	        .get(uri)
	        .then(rewrapResponse)
	        .then(expandPictureURL);
	}
	/**
	 * Fetch list of all site lists
	 */
	function getLists(http, query) {
	    var uri = index(query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Create a new list in the site
	 */
	function createList(http, listTitle) {
	    var uri = index();
	    var metadata = {
	        __metadata: { type: 'SP.List' },
	        BaseTemplate: 100,
	        Title: listTitle,
	    };
	    return http
	        .post(uri, metadata)
	        .then(rewrapResponse);
	}
	/**
	 * Delete an existing list in the site
	 */
	function deleteList(http, listTitle) {
	    var uri = byTitle(listTitle);
	    return http
	        .delete(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch list metadata
	 */
	function getListByTitle(http, listTitle, query) {
	    var uri = byTitle(listTitle, query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch list metadata
	 */
	function getListItemType(http, listTitle) {
	    return __awaiter(this, void 0, void 0, function () {
	        var response;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, getListByTitle(http, listTitle, {
	                        $select: 'ListItemEntityTypeFullName',
	                    })];
	                case 1:
	                    response = _a.sent();
	                    return [2 /*return*/, response.ListItemEntityTypeFullName];
	            }
	        });
	    });
	}
	/**
	 * Fetch list fields metadata
	 */
	function getListFields(http, listTitle, query) {
	    var uri = fields(listTitle, query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch list items
	 */
	function getListItems(http, listTitle, query) {
	    var uri = items(listTitle, query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch a single list item
	 */
	function getListItemById(http, listTitle, itemId, query) {
	    var uri = itemById(listTitle, itemId, query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Create a new record to the list
	 */
	function postListItem(http, listTitle, type, data) {
	    var uri = items(listTitle);
	    var metadata = __assign({ __metadata: { type: type } }, data);
	    return http
	        .post(uri, metadata)
	        .then(rewrapResponse);
	}
	/**
	 * Update an existing record in the list
	 */
	function patchListItem(http, listTitle, itemId, type, data) {
	    return __awaiter(this, void 0, void 0, function () {
	        var uri, metadata, patchResponse, updatedItem;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    uri = itemById(listTitle, itemId);
	                    metadata = __assign({ __metadata: { type: type } }, data);
	                    return [4 /*yield*/, http
	                            .patch(uri, metadata)
	                            .then(rewrapResponse)];
	                case 1:
	                    patchResponse = (_a.sent()).__response;
	                    return [4 /*yield*/, getListItemById(http, listTitle, itemId)];
	                case 2:
	                    updatedItem = _a.sent();
	                    updatedItem.__response = patchResponse;
	                    return [2 /*return*/, updatedItem];
	            }
	        });
	    });
	}
	/**
	 * Update an existing record in the list
	 */
	function deleteListItem(http, listTitle, itemId) {
	    return __awaiter(this, void 0, void 0, function () {
	        var uri, originalItem, deleteResponse;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    uri = itemById(listTitle, itemId);
	                    return [4 /*yield*/, getListItemById(http, listTitle, itemId)];
	                case 1:
	                    originalItem = _a.sent();
	                    return [4 /*yield*/, http
	                            .delete(uri)
	                            .then(rewrapResponse)];
	                case 2:
	                    deleteResponse = (_a.sent()).__response;
	                    originalItem.__response = deleteResponse;
	                    return [2 /*return*/, originalItem];
	            }
	        });
	    });
	}
	/**
	 * Fetch attachments of a given list item
	 */
	function getListItemAttachments(http, listTitle, itemId) {
	    var uri = itemAttachments(listTitle, itemId);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Upload an attachment to a given list item
	 */
	function uploadListItemAttachment(http, listTitle, itemId, fileName, fileBuffer) {
	    var uri = itemAttachmentsUpload(listTitle, itemId, fileName);
	    return http
	        .post(uri, fileBuffer)
	        .then(rewrapResponse);
	}
	/**
	 * Rename an existing attachment from a given list item
	 */
	function renameListItemAttachment(http, listTitle, itemId, currentFileName, newFileName) {
	    return __awaiter(this, void 0, void 0, function () {
	        var attachments, oldFileUrl, newFileUrl, uri;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, getListItemAttachments(http, listTitle, itemId)];
	                case 1:
	                    attachments = _a.sent();
	                    oldFileUrl = attachments.find(function (att) { return att.FileName === currentFileName; }).ServerRelativeUrl;
	                    newFileUrl = oldFileUrl.replace(currentFileName, newFileName);
	                    uri = itemAttachmentsRename(oldFileUrl, newFileUrl);
	                    return [2 /*return*/, http
	                            .patch(uri)
	                            .then(rewrapResponse)];
	            }
	        });
	    });
	}
	/**
	 * Delete an attachment of a given list item
	 */
	function deleteListItemAttachment(http, listTitle, itemId, fileName) {
	    var uri = itemAttachmentByName(listTitle, itemId, fileName);
	    return http
	        .delete(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch list of all site folders/libraries
	 */
	function getFolders(http, query) {
	    var uri = index$1(query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch the content with a given folder/library based on its relative URL
	 */
	function getFolderByUrl(http, relativeUrl) {
	    var uri = folderByUrl(relativeUrl);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch the existing folders within a given folder based on its relative URL
	 */
	function getFoldersInFolder(http, relativeUrl, query) {
	    var uri = foldersInFolder(relativeUrl, query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Creates a new folder given library or folder based on its relative URL
	 */
	function createFolder(http, relativeUrl, folderName) {
	    var uri = index$1();
	    var metadata = {
	        ServerRelativeUrl: relativeUrl + "/" + folderName,
	        __metadata: {
	            type: 'SP.Folder',
	        },
	    };
	    return http
	        .post(uri, metadata)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch the existing folders within a given folder based on its relative URL
	 */
	function getFilesInFolder(http, relativeUrl, query) {
	    var uri = filesInFolder(relativeUrl, query);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch the content with a given file within a library based on its relative URL
	 */
	function getFileByUrl(http, relativeUrl) {
	    var uri = fileByUrl(relativeUrl);
	    return http
	        .get(uri)
	        .then(rewrapResponse);
	}
	/**
	 * Fetch the existing folders within a given folder based on its relative URL
	 */
	function uploadFileToFolder(http, relativeUrl, fileName, fileBuffer) {
	    var uri = newFileToFolder(relativeUrl, fileName);
	    return http
	        .post(uri, fileBuffer)
	        .then(rewrapResponse);
	}

	var requests = /*#__PURE__*/Object.freeze({
		__proto__: null,
		getSite: getSite,
		getRequestDigest: getRequestDigest,
		getSiteParent: getSiteParent,
		getSiteRecycleBin: getSiteRecycleBin,
		getSiteRegionalSettings: getSiteRegionalSettings,
		getSiteCurrentUser: getSiteCurrentUser,
		getSiteUsersList: getSiteUsersList,
		getSiteUsersListFields: getSiteUsersListFields,
		getSiteUsersListItems: getSiteUsersListItems,
		getSiteUserById: getSiteUserById,
		getLists: getLists,
		createList: createList,
		deleteList: deleteList,
		getListByTitle: getListByTitle,
		getListItemType: getListItemType,
		getListFields: getListFields,
		getListItems: getListItems,
		getListItemById: getListItemById,
		postListItem: postListItem,
		patchListItem: patchListItem,
		deleteListItem: deleteListItem,
		getListItemAttachments: getListItemAttachments,
		uploadListItemAttachment: uploadListItemAttachment,
		renameListItemAttachment: renameListItemAttachment,
		deleteListItemAttachment: deleteListItemAttachment,
		getFolders: getFolders,
		getFolderByUrl: getFolderByUrl,
		getFoldersInFolder: getFoldersInFolder,
		createFolder: createFolder,
		getFilesInFolder: getFilesInFolder,
		getFileByUrl: getFileByUrl,
		uploadFileToFolder: uploadFileToFolder
	});

	var headers$2 = {
	    'Accept': 'application/json;odata=verbose',
	    'Access-Control-Allow-Origin': '*',
	    'Access-Control-Allow-Headers': 'Content-Type',
	    'Content-Type': 'application/json;odata=verbose',
	};
	var commonHeaders = Object.freeze(headers$2);

	var defaultTransformers$1 = axios.defaults.transformRequest;
	var requestTransformers = __spreadArray([], defaultTransformers$1);

	function lookForDates(obj) {
	    var SP_DATE_STR_LENGTH = 20;
	    Object.keys(obj).forEach(function (key) {
	        if (typeof obj[key] === 'string'
	            && obj[key].length === SP_DATE_STR_LENGTH
	            && Date.parse(obj[key])) {
	            obj[key] = new Date(obj[key]);
	        }
	    });
	}
	function parseDates(data) {
	    try {
	        if (data instanceof Array) {
	            data.forEach(lookForDates);
	        }
	        else {
	            lookForDates(data);
	        }
	    }
	    catch (e) { /* do nothing */ }
	    return data;
	}

	function exposeDeepData(data) {
	    if (data === null || data === void 0 ? void 0 : data.d) {
	        var d = data.d;
	        /* eslint-disable-next-line no-param-reassign */
	        data = d.results || d;
	        Object.defineProperty(data, '__next', {
	            value: d.__next || null,
	            writable: true,
	        });
	    }
	    return data;
	}

	var defaultTransformers = axios.defaults.transformResponse;
	var responseTransformers = __spreadArray(__spreadArray([], defaultTransformers), [
	    exposeDeepData,
	    parseDates,
	]);

	function addRequestDigest(httpInstance) {
	    var _this = this;
	    return [
	        function (config) { return __awaiter(_this, void 0, void 0, function () {
	            var method, digest, _a, _b, _c;
	            var _d;
	            return __generator(this, function (_e) {
	                switch (_e.label) {
	                    case 0:
	                        method = config.method;
	                        digest = config.digest;
	                        if (!(digest !== false && method.match(/post/i))) return [3 /*break*/, 2];
	                        _a = config;
	                        _b = [__assign({}, config.headers)];
	                        _d = {};
	                        _c = 'X-RequestDigest';
	                        return [4 /*yield*/, httpInstance.defaults.requestDigest];
	                    case 1:
	                        _a.headers = __assign.apply(void 0, _b.concat([(_d[_c] = _e.sent(), _d)]));
	                        _e.label = 2;
	                    case 2: return [2 /*return*/, config];
	                }
	            });
	        }); },
	    ];
	}

	var headers$1 = {
	    'X-Http-Method': 'DELETE',
	    'If-Match': '*',
	};
	var deleteHeaders = Object.freeze(headers$1);

	var onDeleteMethod = [
	    function (config) {
	        var method = config.method;
	        if (method.match(/delete/i)) {
	            config.method = 'post';
	            config.headers = __assign(__assign({}, config.headers), deleteHeaders);
	        }
	        return config;
	    },
	];

	var headers = {
	    'X-Http-Method': 'MERGE',
	    'If-Match': '*',
	};
	var patchHeaders = Object.freeze(headers);

	var onPatchMethod = [
	    function (config) {
	        var method = config.method;
	        if (method.match(/patch/i)) {
	            config.method = 'post';
	            config.headers = __assign(__assign({}, config.headers), patchHeaders);
	        }
	        return config;
	    },
	];

	var requestInterceptors = [
	    addRequestDigest,
	    onDeleteMethod,
	    onPatchMethod,
	];

	var responseInterceptors = [
	// custom functions
	];

	/**
	 * Register the interceptors in the XomApiClient instance.
	 */
	function registerInterceptor(http, at) {
	    return function (events) {
	        var _a;
	        var isFunction = typeof events === 'function';
	        var interceptionEvents = isFunction ? events(http) : events;
	        (_a = http.interceptors[at]).use.apply(_a, interceptionEvents);
	    };
	}

	function httpFactory(siteUrl) {
	    var http = axios.create({
	        headers: commonHeaders,
	        baseURL: siteUrl || '/',
	        withCredentials: true,
	        transformRequest: requestTransformers,
	        transformResponse: responseTransformers,
	    });
	    requestInterceptors.forEach(registerInterceptor(http, 'request'));
	    responseInterceptors.forEach(registerInterceptor(http, 'response'));
	    http.defaults.requestDigest = getRequestDigest(http);
	    return http;
	}

	/**
	 * file-to-arraybuffer v1.2.1
	 *
	 * @author Julio L. Muller.
	 * @license MIT - 2020-2021
	 */

	function fileToArrayBuffer(target) {
	  if (typeof Promise === 'undefined') {
	    throw new ReferenceError('This environment does not support Promises.');
	  } else if (typeof ArrayBuffer === 'undefined') {
	    throw new ReferenceError('This environment does not support ArrayBuffer.');
	  }

	  if (!target) {
	    return Promise.reject(new Error("Empty parameter to convert to ArrayBuffer (value: '" + target + "')."));
	  }

	  if (target.constructor === ArrayBuffer) {
	    return Promise.resolve(target);
	  }

	  if (typeof Blob !== 'undefined' && target instanceof Blob) {
	    if (typeof target.arrayBuffer === 'function') {
	      return target.arrayBuffer();
	    }

	    if (typeof FileReader === 'undefined') {
	      throw new TypeError('This environment does not support FileReader.');
	    }

	    return new Promise(function (resolve, reject) {
	      var reader = new FileReader();

	      reader.onloadend = function (ev) {
	        var _a;

	        return resolve((_a = ev.target) === null || _a === void 0 ? void 0 : _a.result);
	      };

	      reader.onerror = function (ev) {
	        var _a;

	        return reject((_a = ev.target) === null || _a === void 0 ? void 0 : _a.error);
	      };

	      reader.readAsArrayBuffer(target);
	    });
	  }

	  var fileInputRelated = target;

	  if (typeof fileInputRelated === 'string') {
	    fileInputRelated = document.querySelector(fileInputRelated);

	    if (!fileInputRelated) {
	      return Promise.reject(new Error("No HTML found with selector \"" + target + "\"."));
	    }
	  }

	  if (typeof HTMLInputElement !== 'undefined' && fileInputRelated.constructor === HTMLInputElement) {
	    fileInputRelated = fileInputRelated.files;

	    if (!fileInputRelated) {
	      return Promise.reject(new Error('HTML input element reference is not of type "file".'));
	    }
	  }

	  if (typeof FileList !== 'undefined' && fileInputRelated.constructor === FileList) {
	    fileInputRelated = fileInputRelated[0];

	    if (!fileInputRelated) {
	      return Promise.reject(new Error('Object FileList is empty.'));
	    }
	  }

	  if (typeof File !== 'undefined' && fileInputRelated.constructor === File) {
	    return fileToArrayBuffer(fileInputRelated); // will be treated as a Blob
	  }

	  return Promise.reject(new Error('Parameter type must be an instance of HTMLInputElement, FileList, File, String (input selector), Blob or ArrayBuffer'));
	}

	var index_cjs = fileToArrayBuffer;

	/**
	 * Returns an instance of the exception when an item ID is missing.
	 */
	function missingItemId() {
	    return new TypeError('Item ID not provided.');
	}

	/**
	 * Instantiate the object with the necessary information to connect to a SharePoint list through its REST API.
	 */
	var XomSharePointList = /** @class */ (function () {
	    function XomSharePointList(listTitle, httpInstance) {
	        this._title = listTitle;
	        this._http = httpInstance;
	        this._itemsType = getListItemType(this._http, this._title);
	    }
	    Object.defineProperty(XomSharePointList.prototype, "title", {
	        get: function () {
	            return this._title;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Returns the list fields metadata;
	     */
	    XomSharePointList.prototype.getFields = function (params) {
	        return getListFields(this._http, this._title, params);
	    };
	    /**
	     * Returns a list of the items stored in the list.
	     */
	    XomSharePointList.prototype.getItems = function (params) {
	        return getListItems(this._http, this._title, params);
	    };
	    /**
	     * Returns a single list item with the given ID.
	     */
	    XomSharePointList.prototype.findItem = function (itemId, params) {
	        return getListItemById(this._http, this._title, itemId, params);
	    };
	    XomSharePointList.prototype.saveItem = function (param1, param2) {
	        var _a = param2 || param1, id = _a.Id, rest = __rest(_a, ["Id"]);
	        return id
	            ? this.updateItem(id, rest)
	            : this.createItem(rest);
	    };
	    /**
	     * Saves a new record in the SharePoint list.
	     */
	    XomSharePointList.prototype.createItem = function (data) {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a, _b, _c;
	            return __generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0:
	                        _b = (_a = requests).postListItem;
	                        _c = [this._http, this._title];
	                        return [4 /*yield*/, this._itemsType];
	                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), data]))];
	                }
	            });
	        });
	    };
	    XomSharePointList.prototype.updateItem = function (param1, param2) {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a, _b, id, rest, _c, _d, _e;
	            return __generator(this, function (_f) {
	                switch (_f.label) {
	                    case 0:
	                        _a = param2 || param1, _b = _a.Id, id = _b === void 0 ? param1 : _b, rest = __rest(_a, ["Id"]);
	                        if (isNaN(id)) {
	                            throw missingItemId();
	                        }
	                        _d = (_c = requests).patchListItem;
	                        _e = [this._http, this._title, id];
	                        return [4 /*yield*/, this._itemsType];
	                    case 1: return [2 /*return*/, _d.apply(_c, _e.concat([_f.sent(), rest]))];
	                }
	            });
	        });
	    };
	    XomSharePointList.prototype.deleteItem = function (param1) {
	        var _a = param1.Id, id = _a === void 0 ? param1 : _a;
	        if (isNaN(id)) {
	            throw missingItemId();
	        }
	        return deleteListItem(this._http, this._title, id);
	    };
	    XomSharePointList.prototype.getAttachments = function (param1) {
	        var _a = param1.Id, id = _a === void 0 ? param1 : _a;
	        if (isNaN(id)) {
	            throw missingItemId();
	        }
	        return getListItemAttachments(this._http, this._title, id);
	    };
	    XomSharePointList.prototype.addAttachment = function (param1, fileName, fileReference) {
	        return __awaiter(this, void 0, void 0, function () {
	            var fileBufferPromise, _a, id, _b, _c, _d;
	            return __generator(this, function (_e) {
	                switch (_e.label) {
	                    case 0:
	                        fileBufferPromise = index_cjs(fileReference);
	                        _a = param1.Id, id = _a === void 0 ? param1 : _a;
	                        if (isNaN(id)) {
	                            throw missingItemId();
	                        }
	                        _c = (_b = requests).uploadListItemAttachment;
	                        _d = [this._http, this._title, id, fileName];
	                        return [4 /*yield*/, fileBufferPromise];
	                    case 1: return [2 /*return*/, _c.apply(_b, _d.concat([_e.sent()]))];
	                }
	            });
	        });
	    };
	    XomSharePointList.prototype.renameAttachment = function (param1, currentName, newName) {
	        var _a = param1.Id, id = _a === void 0 ? param1 : _a;
	        if (isNaN(id)) {
	            throw missingItemId();
	        }
	        return renameListItemAttachment(this._http, this._title, id, currentName, newName);
	    };
	    XomSharePointList.prototype.deleteAttachment = function (param1, fileName) {
	        var _a = param1.Id, id = _a === void 0 ? param1 : _a;
	        if (isNaN(id)) {
	            throw missingItemId();
	        }
	        return deleteListItemAttachment(this._http, this._title, id, fileName);
	    };
	    return XomSharePointList;
	}());

	/**
	 * Instantiate the object with the necessary information to connect to a SharePoint survey through its REST API.
	 */
	var XomSharePointSurvey = /** @class */ (function () {
	    function XomSharePointSurvey(surveyTitle, httpInstance) {
	        this._title = surveyTitle;
	        this._http = httpInstance;
	        this._itemsType = getListItemType(this._http, this._title);
	    }
	    Object.defineProperty(XomSharePointSurvey.prototype, "title", {
	        get: function () {
	            return this._title;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Gets fields that corresponds to the questions and their choices.
	     */
	    XomSharePointSurvey.prototype.getQuestions = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var response, questions;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, getListFields(this._http, this._title, { $filter: '(CanBeDeleted eq true)' })];
	                    case 1:
	                        response = _a.sent();
	                        questions = response.map(function (field) { return ({
	                            Field: field.InternalName,
	                            Description: field.Description,
	                            Question: field.Title,
	                            Type: field.TypeDisplayName,
	                            Choices: field.Choices && field.Choices.results,
	                            DefaultValue: field.DefaultValue,
	                        }); });
	                        Object.defineProperty(questions, '__response', {
	                            value: response.__response,
	                        });
	                        return [2 /*return*/, questions];
	                }
	            });
	        });
	    };
	    /**
	     * Returns a list of the responses stored in the survey list.
	     */
	    XomSharePointSurvey.prototype.getResponses = function (params) {
	        return getListItems(this._http, this._title, params);
	    };
	    /**
	     * Returns a single response by its ID.
	     */
	    XomSharePointSurvey.prototype.findResponse = function (id, params) {
	        return getListItemById(this._http, this._title, id, params);
	    };
	    /**
	     * Saves a new response in the SharePoint survey list.
	     */
	    XomSharePointSurvey.prototype.submitResponse = function (data) {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a, _b, _c;
	            return __generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0:
	                        _b = (_a = requests).postListItem;
	                        _c = [this._http, this._title];
	                        return [4 /*yield*/, this._itemsType];
	                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), data]))];
	                }
	            });
	        });
	    };
	    /**
	     * Updates an existing response.
	     */
	    XomSharePointSurvey.prototype.changeResponse = function (id, data) {
	        return __awaiter(this, void 0, void 0, function () {
	            var _a, _b, _c;
	            return __generator(this, function (_d) {
	                switch (_d.label) {
	                    case 0:
	                        _b = (_a = requests).patchListItem;
	                        _c = [this._http, this._title, id];
	                        return [4 /*yield*/, this._itemsType];
	                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), data]))];
	                }
	            });
	        });
	    };
	    /**
	     * Deletes an existing response.
	     */
	    XomSharePointSurvey.prototype.delete = function (id) {
	        return deleteListItem(this._http, this._title, id);
	    };
	    return XomSharePointSurvey;
	}());

	/**
	 * Instantiate the object with the necessary information to connect to a SharePoint file library through its REST API.
	 */
	var XomSharePointLibrary = /** @class */ (function () {
	    function XomSharePointLibrary(folderAddress, httpInstance) {
	        this._address = folderAddress;
	        this._http = httpInstance;
	        this._filesType = '';
	    }
	    Object.defineProperty(XomSharePointLibrary.prototype, "relativeUrl", {
	        get: function () {
	            var baseUrl = new URL(this._http.defaults.baseURL);
	            return baseUrl.pathname + "/" + this._address;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Returns a list of the folders within the folder.
	     */
	    XomSharePointLibrary.prototype.listSubfolders = function (params) {
	        return getFoldersInFolder(this._http, this.relativeUrl, params);
	    };
	    /**
	     * Creates a folder within this folder.
	     */
	    XomSharePointLibrary.prototype.createSubfolder = function (folderName) {
	        return createFolder(this._http, this.relativeUrl, folderName);
	    };
	    /**
	     * Returns a list of the files within this folder.
	     */
	    XomSharePointLibrary.prototype.listFiles = function (params) {
	        return getFilesInFolder(this._http, this.relativeUrl, params);
	    };
	    XomSharePointLibrary.prototype.uploadFile = function (fileName, fileReference) {
	        return __awaiter(this, void 0, void 0, function () {
	            var fileBuffer, result;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, index_cjs(fileReference)];
	                    case 1:
	                        fileBuffer = _a.sent();
	                        return [4 /*yield*/, uploadFileToFolder(this._http, this.relativeUrl, fileName, fileBuffer)];
	                    case 2:
	                        result = _a.sent();
	                        this._filesType = this._filesType || result.__metadata.type;
	                        return [2 /*return*/, result];
	                }
	            });
	        });
	    };
	    return XomSharePointLibrary;
	}());

	/**
	 * Provide the query to find searched term with user properties
	 */
	function userSearchQuery(search) {
	    var title = "substringof('" + search + "',Title)";
	    var email = "substringof('" + search + "',EMail)";
	    var lastName = "substringof('" + search + "',LastName)";
	    var firstName = "substringof('" + search + "',FirstName)";
	    var account = "substringof('" + search + "',AccountName)";
	    return { $filter: title + " or " + email + " or " + lastName + " or " + firstName + " or " + account };
	}

	/**
	 * Instantiate the object with the necessary information to connect to a SharePoint site through its REST API.
	 */
	var XomSharePointSite = /** @class */ (function () {
	    function XomSharePointSite(baseSiteUrl) {
	        var _this = this;
	        this._http = httpFactory(baseSiteUrl);
	        this._currUser = getSiteCurrentUser(this._http)
	            .then(function (_a) {
	            var id = _a.Id;
	            return getSiteUserById(_this._http, id);
	        });
	    }
	    Object.defineProperty(XomSharePointSite.prototype, "http", {
	        get: function () {
	            return this._http;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(XomSharePointSite.prototype, "baseUrl", {
	        get: function () {
	            return this._http.defaults.baseURL;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Gets the SharePoint site metadata.
	     */
	    XomSharePointSite.prototype.getInfo = function () {
	        return getSite(this._http);
	    };
	    /**
	     * Queries the SharePoint API to get user information. Inform nothing to get
	     * current user information or pass an specific user ID.
	     */
	    XomSharePointSite.prototype.getUserInfo = function (id) {
	        return id
	            ? getSiteUserById(this._http, id)
	            : this._currUser;
	    };
	    /**
	     * Queries SharePoint API searching for user name.
	     */
	    XomSharePointSite.prototype.searchUser = function (search) {
	        return getSiteUsersListItems(this._http, userSearchQuery(search));
	    };
	    /**
	     * Returns a reference to connect to a SharePoint list.
	     */
	    XomSharePointSite.prototype.getList = function (listTitle) {
	        return new XomSharePointList(listTitle, this._http);
	    };
	    /**
	     * Creates a new SharePoint list.
	     */
	    XomSharePointSite.prototype.createList = function (listTitle) {
	        return createList(this._http, listTitle);
	    };
	    /**
	     * Deletes an existing SharePoint list.
	     */
	    XomSharePointSite.prototype.deleteList = function (listTitle) {
	        return deleteList(this._http, listTitle);
	    };
	    /**
	     * Returns a reference to connect to a SharePoint survey.
	     */
	    XomSharePointSite.prototype.getSurvey = function (surveyTitle) {
	        return new XomSharePointSurvey(surveyTitle, this._http);
	    };
	    /**
	     * Returns a reference to connect to a SharePoint file library.
	     */
	    XomSharePointSite.prototype.getFolder = function (folderAddress) {
	        return new XomSharePointLibrary(folderAddress, this._http);
	    };
	    return XomSharePointSite;
	}());

	/**
	 * Instantiate a XomSharePoint object to connect to a SharePoint site and,
	 * therefore, exchange data with its contents (lists, libraries, permissions)
	 * through SharePoint native REST API
	 */
	function xomSharePoint(baseSiteUrl) {
	    return new XomSharePointSite(baseSiteUrl);
	}

	return xomSharePoint;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG9tLXNoYXJlcG9pbnQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9oYXMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9jYWxsQm91bmQuanMiLCIuLi9ub2RlX21vZHVsZXMvb2JqZWN0LWluc3BlY3QvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvc2lkZS1jaGFubmVsL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eScsICdwYXJhbXMnXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gW1xuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAndGltZW91dE1lc3NhZ2UnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnZGVjb21wcmVzcycsXG4gICAgJ21heENvbnRlbnRMZW5ndGgnLCAnbWF4Qm9keUxlbmd0aCcsICdtYXhSZWRpcmVjdHMnLCAndHJhbnNwb3J0JywgJ2h0dHBBZ2VudCcsXG4gICAgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCcsICdyZXNwb25zZUVuY29kaW5nJ1xuICBdO1xuICB2YXIgZGlyZWN0TWVyZ2VLZXlzID0gWyd2YWxpZGF0ZVN0YXR1cyddO1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKGRpcmVjdE1lcmdlS2V5cywgZnVuY3Rpb24gbWVyZ2UocHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzXG4gICAgLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cylcbiAgICAuY29uY2F0KGRlZmF1bHRUb0NvbmZpZzJLZXlzKVxuICAgIC5jb25jYXQoZGlyZWN0TWVyZ2VLZXlzKTtcblxuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0XG4gICAgLmtleXMoY29uZmlnMSlcbiAgICAuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICAgIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuICh0eXBlb2YgcGF5bG9hZCA9PT0gJ29iamVjdCcpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgY29tcGxleGl0eTogWzIsIDE4XSwgbWF4LXN0YXRlbWVudHM6IFsyLCAzM10gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdHZhciBvYmogPSB7fTtcblx0dmFyIHN5bSA9IFN5bWJvbCgndGVzdCcpO1xuXHR2YXIgc3ltT2JqID0gT2JqZWN0KHN5bSk7XG5cdGlmICh0eXBlb2Ygc3ltID09PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bU9iaikgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvb2JqZWN0LmFzc2lnbi9pc3N1ZXMvMTdcblx0Ly8gaWYgKHN5bSBpbnN0YW5jZW9mIFN5bWJvbCkgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzL2lzc3Vlcy80XG5cdC8vIGlmICghKHN5bU9iaiBpbnN0YW5jZW9mIFN5bWJvbCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gaWYgKHR5cGVvZiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyBpZiAoU3RyaW5nKHN5bSkgIT09IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1WYWwgPSA0Mjtcblx0b2JqW3N5bV0gPSBzeW1WYWw7XG5cdGZvciAoc3ltIGluIG9iaikgeyByZXR1cm4gZmFsc2U7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRpZiAodHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaik7XG5cdGlmIChzeW1zLmxlbmd0aCAhPT0gMSB8fCBzeW1zWzBdICE9PSBzeW0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSk7XG5cdFx0aWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHN5bVZhbCB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUgIT09IHRydWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBoYXNTeW1ib2xTaGFtID0gcmVxdWlyZSgnLi9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbm8taW52YWxpZC10aGlzOiAxICovXG5cbnZhciBFUlJPUl9NRVNTQUdFID0gJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgJztcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY1R5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgYm91bmQ7XG4gICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBib3VuZExlbmd0aCA9IE1hdGgubWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3MucHVzaCgnJCcgKyBpKTtcbiAgICB9XG5cbiAgICBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfScpKGJpbmRlcik7XG5cbiAgICBpZiAodGFyZ2V0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHt9O1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgRW1wdHkoKTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVuZGVmaW5lZDtcblxudmFyICRTeW50YXhFcnJvciA9IFN5bnRheEVycm9yO1xudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGdldEV2YWxsZWRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uU3ludGF4KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuICRGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyAkVHlwZUVycm9yKCk7XG59O1xudmFyIFRocm93VHlwZUVycm9yID0gJGdPUERcblx0PyAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1jYWxsZXIsIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuXHRcdFx0YXJndW1lbnRzLmNhbGxlZTsgLy8gSUUgOCBkb2VzIG5vdCB0aHJvdyBoZXJlXG5cdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0fSBjYXRjaCAoY2FsbGVlVGhyb3dzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJRSA4IHRocm93cyBvbiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJycpXG5cdFx0XHRcdHJldHVybiAkZ09QRChhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7XG5cdFx0XHR9IGNhdGNoIChnT1BEdGhyb3dzKSB7XG5cdFx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0oKSlcblx0OiB0aHJvd1R5cGVFcnJvcjtcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxudmFyIG5lZWRzRXZhbCA9IHt9O1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0JyVBZ2dyZWdhdGVFcnJvciUnOiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQWdncmVnYXRlRXJyb3IsXG5cdCclQXJyYXklJzogQXJyYXksXG5cdCclQXJyYXlCdWZmZXIlJzogdHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFycmF5QnVmZmVyLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBuZWVkc0V2YWwsXG5cdCclQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJUJpZ0ludCUnOiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludCxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnZhciBkb0V2YWwgPSBmdW5jdGlvbiBkb0V2YWwobmFtZSkge1xuXHR2YXIgdmFsdWU7XG5cdGlmIChuYW1lID09PSAnJUFzeW5jRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yJScpIHtcblx0XHR2YXIgZm4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpO1xuXHRcdGlmIChmbikge1xuXHRcdFx0dmFsdWUgPSBmbi5wcm90b3R5cGU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnKSB7XG5cdFx0dmFyIGdlbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yJScpO1xuXHRcdGlmIChnZW4pIHtcblx0XHRcdHZhbHVlID0gZ2V0UHJvdG8oZ2VuLnByb3RvdHlwZSk7XG5cdFx0fVxuXHR9XG5cblx0SU5UUklOU0lDU1tuYW1lXSA9IHZhbHVlO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXMnKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciAkc3RyU2xpY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5zbGljZSk7XG5cbi8qIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iLzQuMTcuMTUvZGlzdC9sb2Rhc2guanMjTDY3MzUtTDY3NDQgKi9cbnZhciByZVByb3BOYW1lID0gL1teJS5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwlJCkpL2c7XG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7IC8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IGZ1bmN0aW9uIHN0cmluZ1RvUGF0aChzdHJpbmcpIHtcblx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHN0cmluZywgMCwgMSk7XG5cdHZhciBsYXN0ID0gJHN0clNsaWNlKHN0cmluZywgLTEpO1xuXHRpZiAoZmlyc3QgPT09ICclJyAmJiBsYXN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIGNsb3NpbmcgYCVgJyk7XG5cdH0gZWxzZSBpZiAobGFzdCA9PT0gJyUnICYmIGZpcnN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIG9wZW5pbmcgYCVgJyk7XG5cdH1cblx0dmFyIHJlc3VsdCA9IFtdO1xuXHQkcmVwbGFjZShzdHJpbmcsIHJlUHJvcE5hbWUsIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG5cdFx0cmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcXVvdGUgPyAkcmVwbGFjZShzdWJTdHJpbmcsIHJlRXNjYXBlQ2hhciwgJyQxJykgOiBudW1iZXIgfHwgbWF0Y2g7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcbi8qIGVuZCBhZGFwdGF0aW9uICovXG5cbnZhciBnZXRCYXNlSW50cmluc2ljID0gZnVuY3Rpb24gZ2V0QmFzZUludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0dmFyIGludHJpbnNpY05hbWUgPSBuYW1lO1xuXHR2YXIgYWxpYXM7XG5cdGlmIChoYXNPd24oTEVHQUNZX0FMSUFTRVMsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0YWxpYXMgPSBMRUdBQ1lfQUxJQVNFU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpbnRyaW5zaWNOYW1lID0gJyUnICsgYWxpYXNbMF0gKyAnJSc7XG5cdH1cblxuXHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0dmFyIHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpZiAodmFsdWUgPT09IG5lZWRzRXZhbCkge1xuXHRcdFx0dmFsdWUgPSBkb0V2YWwoaW50cmluc2ljTmFtZSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmICFhbGxvd01pc3NpbmcpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRhbGlhczogYWxpYXMsXG5cdFx0XHRuYW1lOiBpbnRyaW5zaWNOYW1lLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0fVxuXG5cdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0eXBlb2YgYWxsb3dNaXNzaW5nICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignXCJhbGxvd01pc3NpbmdcIiBhcmd1bWVudCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHR2YXIgZmlyc3QgPSAkc3RyU2xpY2UocGFydCwgMCwgMSk7XG5cdFx0dmFyIGxhc3QgPSAkc3RyU2xpY2UocGFydCwgLTEpO1xuXHRcdGlmIChcblx0XHRcdChcblx0XHRcdFx0KGZpcnN0ID09PSAnXCInIHx8IGZpcnN0ID09PSBcIidcIiB8fCBmaXJzdCA9PT0gJ2AnKVxuXHRcdFx0XHR8fCAobGFzdCA9PT0gJ1wiJyB8fCBsYXN0ID09PSBcIidcIiB8fCBsYXN0ID09PSAnYCcpXG5cdFx0XHQpXG5cdFx0XHQmJiBmaXJzdCAhPT0gbGFzdFxuXHRcdCkge1xuXHRcdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcigncHJvcGVydHkgbmFtZXMgd2l0aCBxdW90ZXMgbXVzdCBoYXZlIG1hdGNoaW5nIHF1b3RlcycpO1xuXHRcdH1cblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoIShwYXJ0IGluIHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoIWFsbG93TWlzc2luZykge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdiYXNlIGludHJpbnNpYyBmb3IgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IHRoZSBwcm9wZXJ0eSBpcyBub3QgYXZhaWxhYmxlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2b2lkIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGlmICgkZ09QRCAmJiAoaSArIDEpID49IHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZGVzYyA9ICRnT1BEKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0aXNPd24gPSAhIWRlc2M7XG5cblx0XHRcdFx0Ly8gQnkgY29udmVudGlvbiwgd2hlbiBhIGRhdGEgcHJvcGVydHkgaXMgY29udmVydGVkIHRvIGFuIGFjY2Vzc29yXG5cdFx0XHRcdC8vIHByb3BlcnR5IHRvIGVtdWxhdGUgYSBkYXRhIHByb3BlcnR5IHRoYXQgZG9lcyBub3Qgc3VmZmVyIGZyb21cblx0XHRcdFx0Ly8gdGhlIG92ZXJyaWRlIG1pc3Rha2UsIHRoYXQgYWNjZXNzb3IncyBnZXR0ZXIgaXMgbWFya2VkIHdpdGhcblx0XHRcdFx0Ly8gYW4gYG9yaWdpbmFsVmFsdWVgIHByb3BlcnR5LiBIZXJlLCB3aGVuIHdlIGRldGVjdCB0aGlzLCB3ZVxuXHRcdFx0XHQvLyB1cGhvbGQgdGhlIGlsbHVzaW9uIGJ5IHByZXRlbmRpbmcgdG8gc2VlIHRoYXQgb3JpZ2luYWwgZGF0YVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSwgaS5lLiwgcmV0dXJuaW5nIHRoZSB2YWx1ZSByYXRoZXIgdGhhbiB0aGUgZ2V0dGVyXG5cdFx0XHRcdC8vIGl0c2VsZi5cblx0XHRcdFx0aWYgKGlzT3duICYmICdnZXQnIGluIGRlc2MgJiYgISgnb3JpZ2luYWxWYWx1ZScgaW4gZGVzYy5nZXQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZXNjLmdldDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc093biA9IGhhc093bih2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc093biAmJiAhc2tpcEZ1cnRoZXJDYWNoaW5nKSB7XG5cdFx0XHRcdElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnLCB0cnVlKTtcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG52YXIgJG1heCA9IEdldEludHJpbnNpYygnJU1hdGgubWF4JScpO1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZChvcmlnaW5hbEZ1bmN0aW9uKSB7XG5cdHZhciBmdW5jID0gJHJlZmxlY3RBcHBseShiaW5kLCAkY2FsbCwgYXJndW1lbnRzKTtcblx0aWYgKCRnT1BEICYmICRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHZhciBkZXNjID0gJGdPUEQoZnVuYywgJ2xlbmd0aCcpO1xuXHRcdGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0Ly8gb3JpZ2luYWwgbGVuZ3RoLCBwbHVzIHRoZSByZWNlaXZlciwgbWludXMgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIChhZnRlciB0aGUgcmVjZWl2ZXIpXG5cdFx0XHQkZGVmaW5lUHJvcGVydHkoXG5cdFx0XHRcdGZ1bmMsXG5cdFx0XHRcdCdsZW5ndGgnLFxuXHRcdFx0XHR7IHZhbHVlOiAxICsgJG1heCgwLCBvcmlnaW5hbEZ1bmN0aW9uLmxlbmd0aCAtIChhcmd1bWVudHMubGVuZ3RoIC0gMSkpIH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmdW5jO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCcuLycpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZChHZXRJbnRyaW5zaWMoJ1N0cmluZy5wcm90b3R5cGUuaW5kZXhPZicpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQm91bmRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWMgPSBHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSA+IC0xKSB7XG5cdFx0cmV0dXJuIGNhbGxCaW5kKGludHJpbnNpYyk7XG5cdH1cblx0cmV0dXJuIGludHJpbnNpYztcbn07XG4iLCJ2YXIgaGFzTWFwID0gdHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBNYXAucHJvdG90eXBlO1xudmFyIG1hcFNpemVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBoYXNNYXAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE1hcC5wcm90b3R5cGUsICdzaXplJykgOiBudWxsO1xudmFyIG1hcFNpemUgPSBoYXNNYXAgJiYgbWFwU2l6ZURlc2NyaXB0b3IgJiYgdHlwZW9mIG1hcFNpemVEZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJyA/IG1hcFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XG52YXIgbWFwRm9yRWFjaCA9IGhhc01hcCAmJiBNYXAucHJvdG90eXBlLmZvckVhY2g7XG52YXIgaGFzU2V0ID0gdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBTZXQucHJvdG90eXBlO1xudmFyIHNldFNpemVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBoYXNTZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFNldC5wcm90b3R5cGUsICdzaXplJykgOiBudWxsO1xudmFyIHNldFNpemUgPSBoYXNTZXQgJiYgc2V0U2l6ZURlc2NyaXB0b3IgJiYgdHlwZW9mIHNldFNpemVEZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJyA/IHNldFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XG52YXIgc2V0Rm9yRWFjaCA9IGhhc1NldCAmJiBTZXQucHJvdG90eXBlLmZvckVhY2g7XG52YXIgaGFzV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIFdlYWtNYXAucHJvdG90eXBlO1xudmFyIHdlYWtNYXBIYXMgPSBoYXNXZWFrTWFwID8gV2Vha01hcC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciBoYXNXZWFrU2V0ID0gdHlwZW9mIFdlYWtTZXQgPT09ICdmdW5jdGlvbicgJiYgV2Vha1NldC5wcm90b3R5cGU7XG52YXIgd2Vha1NldEhhcyA9IGhhc1dlYWtTZXQgPyBXZWFrU2V0LnByb3RvdHlwZS5oYXMgOiBudWxsO1xudmFyIGhhc1dlYWtSZWYgPSB0eXBlb2YgV2Vha1JlZiA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrUmVmLnByb3RvdHlwZTtcbnZhciB3ZWFrUmVmRGVyZWYgPSBoYXNXZWFrUmVmID8gV2Vha1JlZi5wcm90b3R5cGUuZGVyZWYgOiBudWxsO1xudmFyIGJvb2xlYW5WYWx1ZU9mID0gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZjtcbnZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciBtYXRjaCA9IFN0cmluZy5wcm90b3R5cGUubWF0Y2g7XG52YXIgYmlnSW50VmFsdWVPZiA9IHR5cGVvZiBCaWdJbnQgPT09ICdmdW5jdGlvbicgPyBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YgOiBudWxsO1xudmFyIGdPUFMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIHN5bVRvU3RyaW5nID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJyA/IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgOiBudWxsO1xudmFyIGhhc1NoYW1tZWRTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnb2JqZWN0JztcbnZhciBpc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG52YXIgZ1BPID0gKHR5cGVvZiBSZWZsZWN0ID09PSAnZnVuY3Rpb24nID8gUmVmbGVjdC5nZXRQcm90b3R5cGVPZiA6IE9iamVjdC5nZXRQcm90b3R5cGVPZikgfHwgKFxuICAgIFtdLl9fcHJvdG9fXyA9PT0gQXJyYXkucHJvdG90eXBlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cbiAgICAgICAgPyBmdW5jdGlvbiAoTykge1xuICAgICAgICAgICAgcmV0dXJuIE8uX19wcm90b19fOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG4gICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4pO1xuXG52YXIgaW5zcGVjdEN1c3RvbSA9IHJlcXVpcmUoJy4vdXRpbC5pbnNwZWN0JykuY3VzdG9tO1xudmFyIGluc3BlY3RTeW1ib2wgPSBpbnNwZWN0Q3VzdG9tICYmIGlzU3ltYm9sKGluc3BlY3RDdXN0b20pID8gaW5zcGVjdEN1c3RvbSA6IG51bGw7XG52YXIgdG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgIT09ICd1bmRlZmluZWQnID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogbnVsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0XyhvYmosIG9wdGlvbnMsIGRlcHRoLCBzZWVuKSB7XG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKGhhcyhvcHRzLCAncXVvdGVTdHlsZScpICYmIChvcHRzLnF1b3RlU3R5bGUgIT09ICdzaW5nbGUnICYmIG9wdHMucXVvdGVTdHlsZSAhPT0gJ2RvdWJsZScpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcInF1b3RlU3R5bGVcIiBtdXN0IGJlIFwic2luZ2xlXCIgb3IgXCJkb3VibGVcIicpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAgIGhhcyhvcHRzLCAnbWF4U3RyaW5nTGVuZ3RoJykgJiYgKHR5cGVvZiBvcHRzLm1heFN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gb3B0cy5tYXhTdHJpbmdMZW5ndGggPCAwICYmIG9wdHMubWF4U3RyaW5nTGVuZ3RoICE9PSBJbmZpbml0eVxuICAgICAgICAgICAgOiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gbnVsbFxuICAgICAgICApXG4gICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm1heFN0cmluZ0xlbmd0aFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIEluZmluaXR5LCBvciBgbnVsbGAnKTtcbiAgICB9XG4gICAgdmFyIGN1c3RvbUluc3BlY3QgPSBoYXMob3B0cywgJ2N1c3RvbUluc3BlY3QnKSA/IG9wdHMuY3VzdG9tSW5zcGVjdCA6IHRydWU7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21JbnNwZWN0ICE9PSAnYm9vbGVhbicgJiYgY3VzdG9tSW5zcGVjdCAhPT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwiY3VzdG9tSW5zcGVjdFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBgdHJ1ZWAsIGBmYWxzZWAsIG9yIGBcXCdzeW1ib2xcXCdgJyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICBoYXMob3B0cywgJ2luZGVudCcpXG4gICAgICAgICYmIG9wdHMuaW5kZW50ICE9PSBudWxsXG4gICAgICAgICYmIG9wdHMuaW5kZW50ICE9PSAnXFx0J1xuICAgICAgICAmJiAhKHBhcnNlSW50KG9wdHMuaW5kZW50LCAxMCkgPT09IG9wdHMuaW5kZW50ICYmIG9wdHMuaW5kZW50ID4gMClcbiAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9ucyBcImluZGVudFwiIG11c3QgYmUgXCJcXFxcdFwiLCBhbiBpbnRlZ2VyID4gMCwgb3IgYG51bGxgJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiBvYmogPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gaW5zcGVjdFN0cmluZyhvYmosIG9wdHMpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5IC8gb2JqID4gMCA/ICcwJyA6ICctMCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopICsgJ24nO1xuICAgIH1cblxuICAgIHZhciBtYXhEZXB0aCA9IHR5cGVvZiBvcHRzLmRlcHRoID09PSAndW5kZWZpbmVkJyA/IDUgOiBvcHRzLmRlcHRoO1xuICAgIGlmICh0eXBlb2YgZGVwdGggPT09ICd1bmRlZmluZWQnKSB7IGRlcHRoID0gMDsgfVxuICAgIGlmIChkZXB0aCA+PSBtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDAgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdbQXJyYXldJyA6ICdbT2JqZWN0XSc7XG4gICAgfVxuXG4gICAgdmFyIGluZGVudCA9IGdldEluZGVudChvcHRzLCBkZXB0aCk7XG5cbiAgICBpZiAodHlwZW9mIHNlZW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlZW4gPSBbXTtcbiAgICB9IGVsc2UgaWYgKGluZGV4T2Yoc2Vlbiwgb2JqKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zcGVjdCh2YWx1ZSwgZnJvbSwgbm9JbmRlbnQpIHtcbiAgICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgICAgIHNlZW4gPSBzZWVuLnNsaWNlKCk7XG4gICAgICAgICAgICBzZWVuLnB1c2goZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vSW5kZW50KSB7XG4gICAgICAgICAgICB2YXIgbmV3T3B0cyA9IHtcbiAgICAgICAgICAgICAgICBkZXB0aDogb3B0cy5kZXB0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChoYXMob3B0cywgJ3F1b3RlU3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIG5ld09wdHMucXVvdGVTdHlsZSA9IG9wdHMucXVvdGVTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnNwZWN0Xyh2YWx1ZSwgbmV3T3B0cywgZGVwdGggKyAxLCBzZWVuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zcGVjdF8odmFsdWUsIG9wdHMsIGRlcHRoICsgMSwgc2Vlbik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lT2Yob2JqKTtcbiAgICAgICAgdmFyIGtleXMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIHJldHVybiAnW0Z1bmN0aW9uJyArIChuYW1lID8gJzogJyArIG5hbWUgOiAnIChhbm9ueW1vdXMpJykgKyAnXScgKyAoa2V5cy5sZW5ndGggPiAwID8gJyB7ICcgKyBrZXlzLmpvaW4oJywgJykgKyAnIH0nIDogJycpO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wob2JqKSkge1xuICAgICAgICB2YXIgc3ltU3RyaW5nID0gaGFzU2hhbW1lZFN5bWJvbHMgPyBTdHJpbmcob2JqKS5yZXBsYWNlKC9eKFN5bWJvbFxcKC4qXFwpKV9bXildKiQvLCAnJDEnKSA6IHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICFoYXNTaGFtbWVkU3ltYm9scyA/IG1hcmtCb3hlZChzeW1TdHJpbmcpIDogc3ltU3RyaW5nO1xuICAgIH1cbiAgICBpZiAoaXNFbGVtZW50KG9iaikpIHtcbiAgICAgICAgdmFyIHMgPSAnPCcgKyBTdHJpbmcob2JqLm5vZGVOYW1lKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgYXR0cnMgPSBvYmouYXR0cmlidXRlcyB8fCBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcyArPSAnICcgKyBhdHRyc1tpXS5uYW1lICsgJz0nICsgd3JhcFF1b3RlcyhxdW90ZShhdHRyc1tpXS52YWx1ZSksICdkb3VibGUnLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBzICs9ICc+JztcbiAgICAgICAgaWYgKG9iai5jaGlsZE5vZGVzICYmIG9iai5jaGlsZE5vZGVzLmxlbmd0aCkgeyBzICs9ICcuLi4nOyB9XG4gICAgICAgIHMgKz0gJzwvJyArIFN0cmluZyhvYmoubm9kZU5hbWUpLnRvTG93ZXJDYXNlKCkgKyAnPic7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIGlmIChvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiAnW10nOyB9XG4gICAgICAgIHZhciB4cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0KTtcbiAgICAgICAgaWYgKGluZGVudCAmJiAhc2luZ2xlTGluZVZhbHVlcyh4cykpIHtcbiAgICAgICAgICAgIHJldHVybiAnWycgKyBpbmRlbnRlZEpvaW4oeHMsIGluZGVudCkgKyAnXSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdbICcgKyB4cy5qb2luKCcsICcpICsgJyBdJztcbiAgICB9XG4gICAgaWYgKGlzRXJyb3Iob2JqKSkge1xuICAgICAgICB2YXIgcGFydHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHsgcmV0dXJuICdbJyArIFN0cmluZyhvYmopICsgJ10nOyB9XG4gICAgICAgIHJldHVybiAneyBbJyArIFN0cmluZyhvYmopICsgJ10gJyArIHBhcnRzLmpvaW4oJywgJykgKyAnIH0nO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgY3VzdG9tSW5zcGVjdCkge1xuICAgICAgICBpZiAoaW5zcGVjdFN5bWJvbCAmJiB0eXBlb2Ygb2JqW2luc3BlY3RTeW1ib2xdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqW2luc3BlY3RTeW1ib2xdKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tSW5zcGVjdCAhPT0gJ3N5bWJvbCcgJiYgdHlwZW9mIG9iai5pbnNwZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLmluc3BlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNNYXAob2JqKSkge1xuICAgICAgICB2YXIgbWFwUGFydHMgPSBbXTtcbiAgICAgICAgbWFwRm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIG1hcFBhcnRzLnB1c2goaW5zcGVjdChrZXksIG9iaiwgdHJ1ZSkgKyAnID0+ICcgKyBpbnNwZWN0KHZhbHVlLCBvYmopKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uT2YoJ01hcCcsIG1hcFNpemUuY2FsbChvYmopLCBtYXBQYXJ0cywgaW5kZW50KTtcbiAgICB9XG4gICAgaWYgKGlzU2V0KG9iaikpIHtcbiAgICAgICAgdmFyIHNldFBhcnRzID0gW107XG4gICAgICAgIHNldEZvckVhY2guY2FsbChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc2V0UGFydHMucHVzaChpbnNwZWN0KHZhbHVlLCBvYmopKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uT2YoJ1NldCcsIHNldFNpemUuY2FsbChvYmopLCBzZXRQYXJ0cywgaW5kZW50KTtcbiAgICB9XG4gICAgaWYgKGlzV2Vha01hcChvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKCdXZWFrTWFwJyk7XG4gICAgfVxuICAgIGlmIChpc1dlYWtTZXQob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZignV2Vha1NldCcpO1xuICAgIH1cbiAgICBpZiAoaXNXZWFrUmVmKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoJ1dlYWtSZWYnKTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0KE51bWJlcihvYmopKSk7XG4gICAgfVxuICAgIGlmIChpc0JpZ0ludChvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdChiaWdJbnRWYWx1ZU9mLmNhbGwob2JqKSkpO1xuICAgIH1cbiAgICBpZiAoaXNCb29sZWFuKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChib29sZWFuVmFsdWVPZi5jYWxsKG9iaikpO1xuICAgIH1cbiAgICBpZiAoaXNTdHJpbmcob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QoU3RyaW5nKG9iaikpKTtcbiAgICB9XG4gICAgaWYgKCFpc0RhdGUob2JqKSAmJiAhaXNSZWdFeHAob2JqKSkge1xuICAgICAgICB2YXIgeXMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIHZhciBpc1BsYWluT2JqZWN0ID0gZ1BPID8gZ1BPKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGUgOiBvYmogaW5zdGFuY2VvZiBPYmplY3QgfHwgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgICAgIHZhciBwcm90b1RhZyA9IG9iaiBpbnN0YW5jZW9mIE9iamVjdCA/ICcnIDogJ251bGwgcHJvdG90eXBlJztcbiAgICAgICAgdmFyIHN0cmluZ1RhZyA9ICFpc1BsYWluT2JqZWN0ICYmIHRvU3RyaW5nVGFnICYmIE9iamVjdChvYmopID09PSBvYmogJiYgdG9TdHJpbmdUYWcgaW4gb2JqID8gdG9TdHIob2JqKS5zbGljZSg4LCAtMSkgOiBwcm90b1RhZyA/ICdPYmplY3QnIDogJyc7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvclRhZyA9IGlzUGxhaW5PYmplY3QgfHwgdHlwZW9mIG9iai5jb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJyA/ICcnIDogb2JqLmNvbnN0cnVjdG9yLm5hbWUgPyBvYmouY29uc3RydWN0b3IubmFtZSArICcgJyA6ICcnO1xuICAgICAgICB2YXIgdGFnID0gY29uc3RydWN0b3JUYWcgKyAoc3RyaW5nVGFnIHx8IHByb3RvVGFnID8gJ1snICsgW10uY29uY2F0KHN0cmluZ1RhZyB8fCBbXSwgcHJvdG9UYWcgfHwgW10pLmpvaW4oJzogJykgKyAnXSAnIDogJycpO1xuICAgICAgICBpZiAoeXMubGVuZ3RoID09PSAwKSB7IHJldHVybiB0YWcgKyAne30nOyB9XG4gICAgICAgIGlmIChpbmRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0YWcgKyAneycgKyBpbmRlbnRlZEpvaW4oeXMsIGluZGVudCkgKyAnfSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhZyArICd7ICcgKyB5cy5qb2luKCcsICcpICsgJyB9JztcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyhvYmopO1xufTtcblxuZnVuY3Rpb24gd3JhcFF1b3RlcyhzLCBkZWZhdWx0U3R5bGUsIG9wdHMpIHtcbiAgICB2YXIgcXVvdGVDaGFyID0gKG9wdHMucXVvdGVTdHlsZSB8fCBkZWZhdWx0U3R5bGUpID09PSAnZG91YmxlJyA/ICdcIicgOiBcIidcIjtcbiAgICByZXR1cm4gcXVvdGVDaGFyICsgcyArIHF1b3RlQ2hhcjtcbn1cblxuZnVuY3Rpb24gcXVvdGUocykge1xuICAgIHJldHVybiBTdHJpbmcocykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzRGF0ZShvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc0Vycm9yKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc051bWJlcihvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNCb29sZWFuKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuXG4vLyBTeW1ib2wgYW5kIEJpZ0ludCBkbyBoYXZlIFN5bWJvbC50b1N0cmluZ1RhZyBieSBzcGVjLCBzbyB0aGF0IGNhbid0IGJlIHVzZWQgdG8gZWxpbWluYXRlIGZhbHNlIHBvc2l0aXZlc1xuZnVuY3Rpb24gaXNTeW1ib2wob2JqKSB7XG4gICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqIGluc3RhbmNlb2YgU3ltYm9sO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8ICFzeW1Ub1N0cmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzQmlnSW50KG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8ICFiaWdJbnRWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgYmlnSW50VmFsdWVPZi5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSB8fCBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgaW4gdGhpczsgfTtcbmZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd24uY2FsbChvYmosIGtleSk7XG59XG5cbmZ1bmN0aW9uIHRvU3RyKG9iaikge1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKG9iaik7XG59XG5cbmZ1bmN0aW9uIG5hbWVPZihmKSB7XG4gICAgaWYgKGYubmFtZSkgeyByZXR1cm4gZi5uYW1lOyB9XG4gICAgdmFyIG0gPSBtYXRjaC5jYWxsKGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChmKSwgL15mdW5jdGlvblxccyooW1xcdyRdKykvKTtcbiAgICBpZiAobSkgeyByZXR1cm4gbVsxXTsgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpbmRleE9mKHhzLCB4KSB7XG4gICAgaWYgKHhzLmluZGV4T2YpIHsgcmV0dXJuIHhzLmluZGV4T2YoeCk7IH1cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHhzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoeHNbaV0gPT09IHgpIHsgcmV0dXJuIGk7IH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBpc01hcCh4KSB7XG4gICAgaWYgKCFtYXBTaXplIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIG1hcFNpemUuY2FsbCh4KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldFNpemUuY2FsbCh4KTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBNYXA7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuICAgIGlmICghd2Vha01hcEhhcyB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB3ZWFrTWFwSGFzLmNhbGwoeCwgd2Vha01hcEhhcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3ZWFrU2V0SGFzLmNhbGwoeCwgd2Vha1NldEhhcyk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgV2Vha01hcDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzV2Vha1JlZih4KSB7XG4gICAgaWYgKCF3ZWFrUmVmRGVyZWYgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha1JlZkRlcmVmLmNhbGwoeCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1NldCh4KSB7XG4gICAgaWYgKCFzZXRTaXplIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHNldFNpemUuY2FsbCh4KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1hcFNpemUuY2FsbCh4KTtcbiAgICAgICAgfSBjYXRjaCAobSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBTZXQ7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1dlYWtTZXQoeCkge1xuICAgIGlmICghd2Vha1NldEhhcyB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB3ZWFrU2V0SGFzLmNhbGwoeCwgd2Vha1NldEhhcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3ZWFrTWFwSGFzLmNhbGwoeCwgd2Vha01hcEhhcyk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgV2Vha1NldDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCh4KSB7XG4gICAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB4IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgeC5ub2RlTmFtZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHguZ2V0QXR0cmlidXRlID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpbnNwZWN0U3RyaW5nKHN0ciwgb3B0cykge1xuICAgIGlmIChzdHIubGVuZ3RoID4gb3B0cy5tYXhTdHJpbmdMZW5ndGgpIHtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IHN0ci5sZW5ndGggLSBvcHRzLm1heFN0cmluZ0xlbmd0aDtcbiAgICAgICAgdmFyIHRyYWlsZXIgPSAnLi4uICcgKyByZW1haW5pbmcgKyAnIG1vcmUgY2hhcmFjdGVyJyArIChyZW1haW5pbmcgPiAxID8gJ3MnIDogJycpO1xuICAgICAgICByZXR1cm4gaW5zcGVjdFN0cmluZyhzdHIuc2xpY2UoMCwgb3B0cy5tYXhTdHJpbmdMZW5ndGgpLCBvcHRzKSArIHRyYWlsZXI7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICAgdmFyIHMgPSBzdHIucmVwbGFjZSgvKFsnXFxcXF0pL2csICdcXFxcJDEnKS5yZXBsYWNlKC9bXFx4MDAtXFx4MWZdL2csIGxvd2J5dGUpO1xuICAgIHJldHVybiB3cmFwUXVvdGVzKHMsICdzaW5nbGUnLCBvcHRzKTtcbn1cblxuZnVuY3Rpb24gbG93Ynl0ZShjKSB7XG4gICAgdmFyIG4gPSBjLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIHggPSB7XG4gICAgICAgIDg6ICdiJyxcbiAgICAgICAgOTogJ3QnLFxuICAgICAgICAxMDogJ24nLFxuICAgICAgICAxMjogJ2YnLFxuICAgICAgICAxMzogJ3InXG4gICAgfVtuXTtcbiAgICBpZiAoeCkgeyByZXR1cm4gJ1xcXFwnICsgeDsgfVxuICAgIHJldHVybiAnXFxcXHgnICsgKG4gPCAweDEwID8gJzAnIDogJycpICsgbi50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gbWFya0JveGVkKHN0cikge1xuICAgIHJldHVybiAnT2JqZWN0KCcgKyBzdHIgKyAnKSc7XG59XG5cbmZ1bmN0aW9uIHdlYWtDb2xsZWN0aW9uT2YodHlwZSkge1xuICAgIHJldHVybiB0eXBlICsgJyB7ID8gfSc7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3Rpb25PZih0eXBlLCBzaXplLCBlbnRyaWVzLCBpbmRlbnQpIHtcbiAgICB2YXIgam9pbmVkRW50cmllcyA9IGluZGVudCA/IGluZGVudGVkSm9pbihlbnRyaWVzLCBpbmRlbnQpIDogZW50cmllcy5qb2luKCcsICcpO1xuICAgIHJldHVybiB0eXBlICsgJyAoJyArIHNpemUgKyAnKSB7JyArIGpvaW5lZEVudHJpZXMgKyAnfSc7XG59XG5cbmZ1bmN0aW9uIHNpbmdsZUxpbmVWYWx1ZXMoeHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpbmRleE9mKHhzW2ldLCAnXFxuJykgPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRJbmRlbnQob3B0cywgZGVwdGgpIHtcbiAgICB2YXIgYmFzZUluZGVudDtcbiAgICBpZiAob3B0cy5pbmRlbnQgPT09ICdcXHQnKSB7XG4gICAgICAgIGJhc2VJbmRlbnQgPSAnXFx0JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLmluZGVudCA9PT0gJ251bWJlcicgJiYgb3B0cy5pbmRlbnQgPiAwKSB7XG4gICAgICAgIGJhc2VJbmRlbnQgPSBBcnJheShvcHRzLmluZGVudCArIDEpLmpvaW4oJyAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYmFzZTogYmFzZUluZGVudCxcbiAgICAgICAgcHJldjogQXJyYXkoZGVwdGggKyAxKS5qb2luKGJhc2VJbmRlbnQpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaW5kZW50ZWRKb2luKHhzLCBpbmRlbnQpIHtcbiAgICBpZiAoeHMubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJzsgfVxuICAgIHZhciBsaW5lSm9pbmVyID0gJ1xcbicgKyBpbmRlbnQucHJldiArIGluZGVudC5iYXNlO1xuICAgIHJldHVybiBsaW5lSm9pbmVyICsgeHMuam9pbignLCcgKyBsaW5lSm9pbmVyKSArICdcXG4nICsgaW5kZW50LnByZXY7XG59XG5cbmZ1bmN0aW9uIGFyck9iaktleXMob2JqLCBpbnNwZWN0KSB7XG4gICAgdmFyIGlzQXJyID0gaXNBcnJheShvYmopO1xuICAgIHZhciB4cyA9IFtdO1xuICAgIGlmIChpc0Fycikge1xuICAgICAgICB4cy5sZW5ndGggPSBvYmoubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgeHNbaV0gPSBoYXMob2JqLCBpKSA/IGluc3BlY3Qob2JqW2ldLCBvYmopIDogJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHN5bXMgPSB0eXBlb2YgZ09QUyA9PT0gJ2Z1bmN0aW9uJyA/IGdPUFMob2JqKSA6IFtdO1xuICAgIHZhciBzeW1NYXA7XG4gICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzKSB7XG4gICAgICAgIHN5bU1hcCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHN5bXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIHN5bU1hcFsnJCcgKyBzeW1zW2tdXSA9IHN5bXNba107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgICAgaWYgKCFoYXMob2JqLCBrZXkpKSB7IGNvbnRpbnVlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLWNvbnRpbnVlXG4gICAgICAgIGlmIChpc0FyciAmJiBTdHJpbmcoTnVtYmVyKGtleSkpID09PSBrZXkgJiYga2V5IDwgb2JqLmxlbmd0aCkgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby1jb250aW51ZVxuICAgICAgICBpZiAoaGFzU2hhbW1lZFN5bWJvbHMgJiYgc3ltTWFwWyckJyArIGtleV0gaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdG8gcHJldmVudCBzaGFtbWVkIFN5bWJvbHMsIHdoaWNoIGFyZSBzdG9yZWQgYXMgc3RyaW5ncywgZnJvbSBiZWluZyBpbmNsdWRlZCBpbiB0aGUgc3RyaW5nIGtleSBzZWN0aW9uXG4gICAgICAgICAgICBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmICgoL1teXFx3JF0vKS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgIHhzLnB1c2goaW5zcGVjdChrZXksIG9iaikgKyAnOiAnICsgaW5zcGVjdChvYmpba2V5XSwgb2JqKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4cy5wdXNoKGtleSArICc6ICcgKyBpbnNwZWN0KG9ialtrZXldLCBvYmopKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGdPUFMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzeW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoaXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW1zW2pdKSkge1xuICAgICAgICAgICAgICAgIHhzLnB1c2goJ1snICsgaW5zcGVjdChzeW1zW2pdKSArICddOiAnICsgaW5zcGVjdChvYmpbc3ltc1tqXV0sIG9iaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4cztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgaW5zcGVjdCA9IHJlcXVpcmUoJ29iamVjdC1pbnNwZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xudmFyICRXZWFrTWFwID0gR2V0SW50cmluc2ljKCclV2Vha01hcCUnLCB0cnVlKTtcbnZhciAkTWFwID0gR2V0SW50cmluc2ljKCclTWFwJScsIHRydWUpO1xuXG52YXIgJHdlYWtNYXBHZXQgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmdldCcsIHRydWUpO1xudmFyICR3ZWFrTWFwU2V0ID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5zZXQnLCB0cnVlKTtcbnZhciAkd2Vha01hcEhhcyA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG52YXIgJG1hcEdldCA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5nZXQnLCB0cnVlKTtcbnZhciAkbWFwU2V0ID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLnNldCcsIHRydWUpO1xudmFyICRtYXBIYXMgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG5cbi8qXG4gKiBUaGlzIGZ1bmN0aW9uIHRyYXZlcnNlcyB0aGUgbGlzdCByZXR1cm5pbmcgdGhlIG5vZGUgY29ycmVzcG9uZGluZyB0byB0aGVcbiAqIGdpdmVuIGtleS5cbiAqXG4gKiBUaGF0IG5vZGUgaXMgYWxzbyBtb3ZlZCB0byB0aGUgaGVhZCBvZiB0aGUgbGlzdCwgc28gdGhhdCBpZiBpdCdzIGFjY2Vzc2VkXG4gKiBhZ2FpbiB3ZSBkb24ndCBuZWVkIHRvIHRyYXZlcnNlIHRoZSB3aG9sZSBsaXN0LiBCeSBkb2luZyBzbywgYWxsIHRoZSByZWNlbnRseVxuICogdXNlZCBub2RlcyBjYW4gYmUgYWNjZXNzZWQgcmVsYXRpdmVseSBxdWlja2x5LlxuICovXG52YXIgbGlzdEdldE5vZGUgPSBmdW5jdGlvbiAobGlzdCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0Zm9yICh2YXIgcHJldiA9IGxpc3QsIGN1cnI7IChjdXJyID0gcHJldi5uZXh0KSAhPT0gbnVsbDsgcHJldiA9IGN1cnIpIHtcblx0XHRpZiAoY3Vyci5rZXkgPT09IGtleSkge1xuXHRcdFx0cHJldi5uZXh0ID0gY3Vyci5uZXh0O1xuXHRcdFx0Y3Vyci5uZXh0ID0gbGlzdC5uZXh0O1xuXHRcdFx0bGlzdC5uZXh0ID0gY3VycjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHRcdFx0cmV0dXJuIGN1cnI7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgbGlzdEdldCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0dmFyIG5vZGUgPSBsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXkpO1xuXHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlO1xufTtcbnZhciBsaXN0U2V0ID0gZnVuY3Rpb24gKG9iamVjdHMsIGtleSwgdmFsdWUpIHtcblx0dmFyIG5vZGUgPSBsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXkpO1xuXHRpZiAobm9kZSkge1xuXHRcdG5vZGUudmFsdWUgPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHQvLyBQcmVwZW5kIHRoZSBuZXcgbm9kZSB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0XG5cdFx0b2JqZWN0cy5uZXh0ID0geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdG5leHQ6IG9iamVjdHMubmV4dCxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cbn07XG52YXIgbGlzdEhhcyA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0cmV0dXJuICEhbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0U2lkZUNoYW5uZWwoKSB7XG5cdHZhciAkd207XG5cdHZhciAkbTtcblx0dmFyICRvO1xuXHR2YXIgY2hhbm5lbCA9IHtcblx0XHRhc3NlcnQ6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICghY2hhbm5lbC5oYXMoa2V5KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignU2lkZSBjaGFubmVsIGRvZXMgbm90IGNvbnRhaW4gJyArIGluc3BlY3Qoa2V5KSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uIChrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEdldCgkd20sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRyZXR1cm4gJG1hcEdldCgkbSwga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCRvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZWx5LWlmXG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RHZXQoJG8sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGhhczogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEhhcygkd20sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRyZXR1cm4gJG1hcEhhcygkbSwga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCRvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZWx5LWlmXG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RIYXMoJG8sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICghJHdtKSB7XG5cdFx0XHRcdFx0JHdtID0gbmV3ICRXZWFrTWFwKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHdlYWtNYXBTZXQoJHdtLCBrZXksIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoISRtKSB7XG5cdFx0XHRcdFx0JG0gPSBuZXcgJE1hcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRtYXBTZXQoJG0sIGtleSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCEkbykge1xuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogSW5pdGlhbGl6ZSB0aGUgbGlua2VkIGxpc3QgYXMgYW4gZW1wdHkgbm9kZSwgc28gdGhhdCB3ZSBkb24ndCBoYXZlXG5cdFx0XHRcdFx0ICogdG8gc3BlY2lhbC1jYXNlIGhhbmRsaW5nIG9mIHRoZSBmaXJzdCBub2RlOiB3ZSBjYW4gYWx3YXlzIHJlZmVyIHRvXG5cdFx0XHRcdFx0ICogaXQgYXMgKHByZXZpb3VzIG5vZGUpLm5leHQsIGluc3RlYWQgb2Ygc29tZXRoaW5nIGxpa2UgKGxpc3QpLmhlYWRcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHQkbyA9IHsga2V5OiB7fSwgbmV4dDogbnVsbCB9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3RTZXQoJG8sIGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGNoYW5uZWw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbnZhciBGb3JtYXQgPSB7XG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiBGb3JtYXQuUkZDMzk4NixcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBSRkMxNzM4OiBGb3JtYXQuUkZDMTczOCxcbiAgICBSRkMzOTg2OiBGb3JtYXQuUkZDMzk4NlxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiAwICovXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmIGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SXRlbSA9IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSAmJiB0eXBlb2YgdGFyZ2V0SXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICAgIHZhciBzdHJXaXRob3V0UGx1cyA9IHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gICAgfVxuICAgIC8vIHV0Zi04XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0LCBraW5kLCBmb3JtYXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHN0cjtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgc3RyaW5nID0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0cik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICAgICB8fCAoZm9ybWF0ID09PSBmb3JtYXRzLlJGQzE3MzggJiYgKGMgPT09IDB4MjggfHwgYyA9PT0gMHgyOSkpIC8vICggKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgb3V0ICs9IGhleFRhYmxlWzB4RjAgfCAoYyA+PiAxOCldXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gMTIpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG52YXIgY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgICB2YXIgcXVldWUgPSBbeyBvYmo6IHsgbzogdmFsdWUgfSwgcHJvcDogJ28nIH1dO1xuICAgIHZhciByZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCh7IG9iajogb2JqLCBwcm9wOiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wYWN0UXVldWUocXVldWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxudmFyIGlzUmVnRXhwID0gZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cbnZhciBpc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG52YXIgY29tYmluZSA9IGZ1bmN0aW9uIGNvbWJpbmUoYSwgYikge1xuICAgIHJldHVybiBbXS5jb25jYXQoYSwgYik7XG59O1xuXG52YXIgbWF5YmVNYXAgPSBmdW5jdGlvbiBtYXliZU1hcCh2YWwsIGZuKSB7XG4gICAgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgICB2YXIgbWFwcGVkID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBtYXBwZWQucHVzaChmbih2YWxbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwcGVkO1xuICAgIH1cbiAgICByZXR1cm4gZm4odmFsKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgY29tYmluZTogY29tYmluZSxcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWF5YmVNYXA6IG1heWJlTWFwLFxuICAgIG1lcmdlOiBtZXJnZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFNpZGVDaGFubmVsID0gcmVxdWlyZSgnc2lkZS1jaGFubmVsJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGNvbW1hOiAnY29tbWEnLFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkge1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG52YXIgcHVzaFRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyLCB2YWx1ZU9yQXJyYXkpIHtcbiAgICBwdXNoLmFwcGx5KGFyciwgaXNBcnJheSh2YWx1ZU9yQXJyYXkpID8gdmFsdWVPckFycmF5IDogW3ZhbHVlT3JBcnJheV0pO1xufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0Rm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xudmFyIGRlZmF1bHRzID0ge1xuICAgIGFkZFF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGNoYXJzZXQ6ICd1dGYtOCcsXG4gICAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IGZhbHNlLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHMuZm9ybWF0dGVyc1tkZWZhdWx0Rm9ybWF0XSxcbiAgICAvLyBkZXByZWNhdGVkXG4gICAgaW5kaWNlczogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7XG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaXNOb25OdWxsaXNoUHJpbWl0aXZlID0gZnVuY3Rpb24gaXNOb25OdWxsaXNoUHJpbWl0aXZlKHYpIHtcbiAgICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnc3ltYm9sJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ2JpZ2ludCc7XG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KFxuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0LFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXQsXG4gICAgc2lkZUNoYW5uZWxcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG5cbiAgICBpZiAoc2lkZUNoYW5uZWwuaGFzKG9iamVjdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0N5Y2xpYyBvYmplY3QgdmFsdWUnKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSB1dGlscy5tYXliZU1hcChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemVEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5JywgZm9ybWF0KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmIChpc05vbk51bGxpc2hQcmltaXRpdmUob2JqKSB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknLCBmb3JtYXQpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAndmFsdWUnLCBmb3JtYXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGpvaW4gZWxlbWVudHMgaW5cbiAgICAgICAgb2JqS2V5cyA9IFt7IHZhbHVlOiBvYmoubGVuZ3RoID4gMCA/IG9iai5qb2luKCcsJykgfHwgbnVsbCA6IHVuZGVmaW5lZCB9XTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcbiAgICAgICAgdmFyIHZhbHVlID0gdHlwZW9mIGtleSA9PT0gJ29iamVjdCcgJiYga2V5LnZhbHVlICE9PSB1bmRlZmluZWQgPyBrZXkudmFsdWUgOiBvYmpba2V5XTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlQcmVmaXggPSBpc0FycmF5KG9iailcbiAgICAgICAgICAgID8gdHlwZW9mIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdmdW5jdGlvbicgPyBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSA6IHByZWZpeFxuICAgICAgICAgICAgOiBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKTtcblxuICAgICAgICBzaWRlQ2hhbm5lbC5zZXQob2JqZWN0LCB0cnVlKTtcbiAgICAgICAgdmFyIHZhbHVlU2lkZUNoYW5uZWwgPSBnZXRTaWRlQ2hhbm5lbCgpO1xuICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAga2V5UHJlZml4LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIGZvcm1hdCxcbiAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICBjaGFyc2V0LFxuICAgICAgICAgICAgdmFsdWVTaWRlQ2hhbm5lbFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBjaGFyc2V0ID0gb3B0cy5jaGFyc2V0IHx8IGRlZmF1bHRzLmNoYXJzZXQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICB2YXIgZmlsdGVyID0gZGVmYXVsdHMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgaXNBcnJheShvcHRzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHR5cGVvZiBvcHRzLmFkZFF1ZXJ5UHJlZml4ID09PSAnYm9vbGVhbicgPyBvcHRzLmFkZFF1ZXJ5UHJlZml4IDogZGVmYXVsdHMuYWRkUXVlcnlQcmVmaXgsXG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICAgICAgZW5jb2RlcjogdHlwZW9mIG9wdHMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXIsXG4gICAgICAgIHNlcmlhbGl6ZURhdGU6IHR5cGVvZiBvcHRzLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlLFxuICAgICAgICBza2lwTnVsbHM6IHR5cGVvZiBvcHRzLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHMsXG4gICAgICAgIHNvcnQ6IHR5cGVvZiBvcHRzLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNvcnQgOiBudWxsLFxuICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cyk7XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqID0gZmlsdGVyKCcnLCBvYmopO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0cyAmJiBvcHRzLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmIChvcHRzICYmICdpbmRpY2VzJyBpbiBvcHRzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gICAgfVxuXG4gICAgdmFyIHNpZGVDaGFubmVsID0gZ2V0U2lkZUNoYW5uZWwoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcE51bGxzLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLnNvcnQsXG4gICAgICAgICAgICBvcHRpb25zLmFsbG93RG90cyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0LFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXR0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICBvcHRpb25zLmNoYXJzZXQsXG4gICAgICAgICAgICBzaWRlQ2hhbm5lbFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB2YXIgam9pbmVkID0ga2V5cy5qb2luKG9wdGlvbnMuZGVsaW1pdGVyKTtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpLCB0aGUgXCJudW1lcmljIGVudGl0eVwiIHJlcHJlc2VudGF0aW9uIG9mIGEgY2hlY2ttYXJrXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0ImJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lRTIlOUMlOTMmJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhbGxvd1NwYXJzZTogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGNvbW1hOiBmYWxzZSxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgaWdub3JlUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogZmFsc2UsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGFyc2VBcnJheXM6IHRydWUsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uICgkMCwgbnVtYmVyU3RyKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG51bWJlclN0ciwgMTApKTtcbiAgICB9KTtcbn07XG5cbnZhciBwYXJzZUFycmF5VmFsdWUgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmNvbW1hICYmIHZhbC5pbmRleE9mKCcsJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdmFsLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbn07XG5cbi8vIFRoaXMgaXMgd2hhdCBicm93c2VycyB3aWxsIHN1Ym1pdCB3aGVuIHRoZSDinJMgY2hhcmFjdGVyIG9jY3VycyBpbiBhblxuLy8gYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGJvZHkgYW5kIHRoZSBlbmNvZGluZyBvZiB0aGUgcGFnZSBjb250YWluaW5nXG4vLyB0aGUgZm9ybSBpcyBpc28tODg1OS0xLCBvciB3aGVuIHRoZSBzdWJtaXR0ZWQgZm9ybSBoYXMgYW4gYWNjZXB0LWNoYXJzZXRcbi8vIGF0dHJpYnV0ZSBvZiBpc28tODg1OS0xLiBQcmVzdW1hYmx5IGFsc28gd2l0aCBvdGhlciBjaGFyc2V0cyB0aGF0IGRvIG5vdCBjb250YWluXG4vLyB0aGUg4pyTIGNoYXJhY3Rlciwgc3VjaCBhcyB1cy1hc2NpaS5cbnZhciBpc29TZW50aW5lbCA9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpXG5cbi8vIFRoZXNlIGFyZSB0aGUgcGVyY2VudC1lbmNvZGVkIHV0Zi04IG9jdGV0cyByZXByZXNlbnRpbmcgYSBjaGVja21hcmssIGluZGljYXRpbmcgdGhhdCB0aGUgcmVxdWVzdCBhY3R1YWxseSBpcyB1dGYtOCBlbmNvZGVkLlxudmFyIGNoYXJzZXRTZW50aW5lbCA9ICd1dGY4PSVFMiU5QyU5Myc7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIGNsZWFuU3RyID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA/IHN0ci5yZXBsYWNlKC9eXFw/LywgJycpIDogc3RyO1xuICAgIHZhciBsaW1pdCA9IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdDtcbiAgICB2YXIgcGFydHMgPSBjbGVhblN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgbGltaXQpO1xuICAgIHZhciBza2lwSW5kZXggPSAtMTsgLy8gS2VlcCB0cmFjayBvZiB3aGVyZSB0aGUgdXRmOCBzZW50aW5lbCB3YXMgZm91bmRcbiAgICB2YXIgaTtcblxuICAgIHZhciBjaGFyc2V0ID0gb3B0aW9ucy5jaGFyc2V0O1xuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0c1tpXS5pbmRleE9mKCd1dGY4PScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzW2ldID09PSBjaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXSA9PT0gaXNvU2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnNldCA9ICdpc28tODg1OS0xJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2tpcEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBpID0gcGFydHMubGVuZ3RoOyAvLyBUaGUgZXNsaW50IHNldHRpbmdzIGRvIG5vdCBhbGxvdyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoaSA9PT0gc2tpcEluZGV4KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuXG4gICAgICAgIHZhciBicmFja2V0RXF1YWxzUG9zID0gcGFydC5pbmRleE9mKCddPScpO1xuICAgICAgICB2YXIgcG9zID0gYnJhY2tldEVxdWFsc1BvcyA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IGJyYWNrZXRFcXVhbHNQb3MgKyAxO1xuXG4gICAgICAgIHZhciBrZXksIHZhbDtcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA/IG51bGwgOiAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKDAsIHBvcyksIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgICAgICAgIHZhbCA9IHV0aWxzLm1heWJlTWFwKFxuICAgICAgICAgICAgICAgIHBhcnNlQXJyYXlWYWx1ZShwYXJ0LnNsaWNlKHBvcyArIDEpLCBvcHRpb25zKSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZW5jb2RlZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5kZWNvZGVyKGVuY29kZWRWYWwsIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICd2YWx1ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsICYmIG9wdGlvbnMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzICYmIGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAgICAgdmFsID0gaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzKHZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydC5pbmRleE9mKCdbXT0nKSA+IC0xKSB7XG4gICAgICAgICAgICB2YWwgPSBpc0FycmF5KHZhbCkgPyBbdmFsXSA6IHZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdXRpbHMuY29tYmluZShvYmpba2V5XSwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBwYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zLCB2YWx1ZXNQYXJzZWQpIHtcbiAgICB2YXIgbGVhZiA9IHZhbHVlc1BhcnNlZCA/IHZhbCA6IHBhcnNlQXJyYXlWYWx1ZSh2YWwsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgaSA9IGNoYWluLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBvYmo7XG4gICAgICAgIHZhciByb290ID0gY2hhaW5baV07XG5cbiAgICAgICAgaWYgKHJvb3QgPT09ICdbXScgJiYgb3B0aW9ucy5wYXJzZUFycmF5cykge1xuICAgICAgICAgICAgb2JqID0gW10uY29uY2F0KGxlYWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgICAgICAgICB2YXIgY2xlYW5Sb290ID0gcm9vdC5jaGFyQXQoMCkgPT09ICdbJyAmJiByb290LmNoYXJBdChyb290Lmxlbmd0aCAtIDEpID09PSAnXScgPyByb290LnNsaWNlKDEsIC0xKSA6IHJvb3Q7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChjbGVhblJvb3QsIDEwKTtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5wYXJzZUFycmF5cyAmJiBjbGVhblJvb3QgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgb2JqID0geyAwOiBsZWFmIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICFpc05hTihpbmRleClcbiAgICAgICAgICAgICAgICAmJiByb290ICE9PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBTdHJpbmcoaW5kZXgpID09PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBpbmRleCA+PSAwXG4gICAgICAgICAgICAgICAgJiYgKG9wdGlvbnMucGFyc2VBcnJheXMgJiYgaW5kZXggPD0gb3B0aW9ucy5hcnJheUxpbWl0KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICAgICAgb2JqW2luZGV4XSA9IGxlYWY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gbGVhZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxlYWYgPSBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IG9wdGlvbnMuZGVwdGggPiAwICYmIGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChvcHRpb25zLmRlcHRoID4gMCAmJiAoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRzLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYWxsb3dTcGFyc2U6IHR5cGVvZiBvcHRzLmFsbG93U3BhcnNlID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93U3BhcnNlIDogZGVmYXVsdHMuYWxsb3dTcGFyc2UsXG4gICAgICAgIGFycmF5TGltaXQ6IHR5cGVvZiBvcHRzLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0cy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdCxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBjb21tYTogdHlwZW9mIG9wdHMuY29tbWEgPT09ICdib29sZWFuJyA/IG9wdHMuY29tbWEgOiBkZWZhdWx0cy5jb21tYSxcbiAgICAgICAgZGVjb2RlcjogdHlwZW9mIG9wdHMuZGVjb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZGVjb2RlciA6IGRlZmF1bHRzLmRlY29kZXIsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRzLmRlbGltaXRlcikgPyBvcHRzLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcixcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uLCBuby1leHRyYS1wYXJlbnNcbiAgICAgICAgZGVwdGg6ICh0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ251bWJlcicgfHwgb3B0cy5kZXB0aCA9PT0gZmFsc2UpID8gK29wdHMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aCxcbiAgICAgICAgaWdub3JlUXVlcnlQcmVmaXg6IG9wdHMuaWdub3JlUXVlcnlQcmVmaXggPT09IHRydWUsXG4gICAgICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogdHlwZW9mIG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID09PSAnYm9vbGVhbicgPyBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA6IGRlZmF1bHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyxcbiAgICAgICAgcGFyYW1ldGVyTGltaXQ6IHR5cGVvZiBvcHRzLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdCxcbiAgICAgICAgcGFyc2VBcnJheXM6IG9wdHMucGFyc2VBcnJheXMgIT09IGZhbHNlLFxuICAgICAgICBwbGFpbk9iamVjdHM6IHR5cGVvZiBvcHRzLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHMsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyhvcHRzKTtcblxuICAgIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMsIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFsbG93U3BhcnNlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iXSwibmFtZXMiOlsiYmluZCIsImZuIiwidGhpc0FyZyIsIndyYXAiLCJhcmdzIiwiQXJyYXkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJpIiwiYXBwbHkiLCJyZXF1aXJlJCQwIiwidG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJpc0FycmF5IiwidmFsIiwiY2FsbCIsImlzVW5kZWZpbmVkIiwiaXNCdWZmZXIiLCJjb25zdHJ1Y3RvciIsImlzQXJyYXlCdWZmZXIiLCJpc0Zvcm1EYXRhIiwiRm9ybURhdGEiLCJpc0FycmF5QnVmZmVyVmlldyIsInJlc3VsdCIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiYnVmZmVyIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzT2JqZWN0IiwiaXNQbGFpbk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiaXNEYXRlIiwiaXNGaWxlIiwiaXNCbG9iIiwiaXNGdW5jdGlvbiIsImlzU3RyZWFtIiwicGlwZSIsImlzVVJMU2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwidHJpbSIsInN0ciIsInJlcGxhY2UiLCJpc1N0YW5kYXJkQnJvd3NlckVudiIsIm5hdmlnYXRvciIsInByb2R1Y3QiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImZvckVhY2giLCJvYmoiLCJsIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJtZXJnZSIsImFzc2lnblZhbHVlIiwic2xpY2UiLCJleHRlbmQiLCJhIiwiYiIsInN0cmlwQk9NIiwiY29udGVudCIsImNoYXJDb2RlQXQiLCJ1dGlscyIsImVuY29kZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImJ1aWxkVVJMIiwidXJsIiwicGFyYW1zIiwicGFyYW1zU2VyaWFsaXplciIsInNlcmlhbGl6ZWRQYXJhbXMiLCJwYXJ0cyIsInNlcmlhbGl6ZSIsInBhcnNlVmFsdWUiLCJ2IiwidG9JU09TdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwicHVzaCIsImpvaW4iLCJoYXNobWFya0luZGV4IiwiaW5kZXhPZiIsIkludGVyY2VwdG9yTWFuYWdlciIsImhhbmRsZXJzIiwidXNlIiwiZnVsZmlsbGVkIiwicmVqZWN0ZWQiLCJlamVjdCIsImlkIiwiZm9yRWFjaEhhbmRsZXIiLCJoIiwiSW50ZXJjZXB0b3JNYW5hZ2VyXzEiLCJ0cmFuc2Zvcm1EYXRhIiwiZGF0YSIsImhlYWRlcnMiLCJmbnMiLCJ0cmFuc2Zvcm0iLCJpc0NhbmNlbCIsInZhbHVlIiwiX19DQU5DRUxfXyIsIm5vcm1hbGl6ZUhlYWRlck5hbWUiLCJub3JtYWxpemVkTmFtZSIsInByb2Nlc3NIZWFkZXIiLCJuYW1lIiwidG9VcHBlckNhc2UiLCJlbmhhbmNlRXJyb3IiLCJlcnJvciIsImNvbmZpZyIsImNvZGUiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJpc0F4aW9zRXJyb3IiLCJ0b0pTT04iLCJtZXNzYWdlIiwiZGVzY3JpcHRpb24iLCJudW1iZXIiLCJmaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJzdGFjayIsImNyZWF0ZUVycm9yIiwiRXJyb3IiLCJzZXR0bGUiLCJyZXNvbHZlIiwicmVqZWN0IiwidmFsaWRhdGVTdGF0dXMiLCJzdGF0dXMiLCJjb29raWVzIiwic3RhbmRhcmRCcm93c2VyRW52Iiwid3JpdGUiLCJleHBpcmVzIiwicGF0aCIsImRvbWFpbiIsInNlY3VyZSIsImNvb2tpZSIsIkRhdGUiLCJ0b0dNVFN0cmluZyIsInJlYWQiLCJtYXRjaCIsIlJlZ0V4cCIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlbW92ZSIsIm5vdyIsIm5vblN0YW5kYXJkQnJvd3NlckVudiIsImlzQWJzb2x1dGVVUkwiLCJ0ZXN0IiwiY29tYmluZVVSTHMiLCJiYXNlVVJMIiwicmVsYXRpdmVVUkwiLCJyZXF1aXJlJCQxIiwiYnVpbGRGdWxsUGF0aCIsInJlcXVlc3RlZFVSTCIsImlnbm9yZUR1cGxpY2F0ZU9mIiwicGFyc2VIZWFkZXJzIiwicGFyc2VkIiwic3BsaXQiLCJwYXJzZXIiLCJsaW5lIiwic3Vic3RyIiwidG9Mb3dlckNhc2UiLCJjb25jYXQiLCJpc1VSTFNhbWVPcmlnaW4iLCJtc2llIiwidXNlckFnZW50IiwidXJsUGFyc2luZ05vZGUiLCJjcmVhdGVFbGVtZW50Iiwib3JpZ2luVVJMIiwicmVzb2x2ZVVSTCIsImhyZWYiLCJzZXRBdHRyaWJ1dGUiLCJwcm90b2NvbCIsImhvc3QiLCJzZWFyY2giLCJoYXNoIiwiaG9zdG5hbWUiLCJwb3J0IiwicGF0aG5hbWUiLCJjaGFyQXQiLCJsb2NhdGlvbiIsInJlcXVlc3RVUkwiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDQiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkNiIsInJlcXVpcmUkJDciLCJ4aHIiLCJ4aHJBZGFwdGVyIiwiUHJvbWlzZSIsImRpc3BhdGNoWGhyUmVxdWVzdCIsInJlcXVlc3REYXRhIiwicmVxdWVzdEhlYWRlcnMiLCJYTUxIdHRwUmVxdWVzdCIsImF1dGgiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwidW5lc2NhcGUiLCJBdXRob3JpemF0aW9uIiwiYnRvYSIsImZ1bGxQYXRoIiwib3BlbiIsIm1ldGhvZCIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJoYW5kbGVMb2FkIiwicmVhZHlTdGF0ZSIsInJlc3BvbnNlVVJMIiwicmVzcG9uc2VIZWFkZXJzIiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwicmVzcG9uc2VEYXRhIiwicmVzcG9uc2VUeXBlIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsIm9uYWJvcnQiLCJoYW5kbGVBYm9ydCIsIm9uZXJyb3IiLCJoYW5kbGVFcnJvciIsIm9udGltZW91dCIsImhhbmRsZVRpbWVvdXQiLCJ0aW1lb3V0RXJyb3JNZXNzYWdlIiwieHNyZlZhbHVlIiwid2l0aENyZWRlbnRpYWxzIiwieHNyZkNvb2tpZU5hbWUiLCJ1bmRlZmluZWQiLCJ4c3JmSGVhZGVyTmFtZSIsInNldFJlcXVlc3RIZWFkZXIiLCJlIiwib25Eb3dubG9hZFByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWQiLCJjYW5jZWxUb2tlbiIsInByb21pc2UiLCJ0aGVuIiwib25DYW5jZWxlZCIsImNhbmNlbCIsImFib3J0Iiwic2VuZCIsIkRFRkFVTFRfQ09OVEVOVF9UWVBFIiwic2V0Q29udGVudFR5cGVJZlVuc2V0IiwiZ2V0RGVmYXVsdEFkYXB0ZXIiLCJhZGFwdGVyIiwicHJvY2VzcyIsImRlZmF1bHRzIiwidHJhbnNmb3JtUmVxdWVzdCIsInRyYW5zZm9ybVJlc3BvbnNlIiwicGFyc2UiLCJtYXhDb250ZW50TGVuZ3RoIiwibWF4Qm9keUxlbmd0aCIsImNvbW1vbiIsImZvckVhY2hNZXRob2ROb0RhdGEiLCJmb3JFYWNoTWV0aG9kV2l0aERhdGEiLCJkZWZhdWx0c18xIiwidGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZCIsInRocm93SWZSZXF1ZXN0ZWQiLCJkaXNwYXRjaFJlcXVlc3QiLCJjbGVhbkhlYWRlckNvbmZpZyIsIm9uQWRhcHRlclJlc29sdXRpb24iLCJvbkFkYXB0ZXJSZWplY3Rpb24iLCJyZWFzb24iLCJtZXJnZUNvbmZpZyIsImNvbmZpZzEiLCJjb25maWcyIiwidmFsdWVGcm9tQ29uZmlnMktleXMiLCJtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyIsImRlZmF1bHRUb0NvbmZpZzJLZXlzIiwiZGlyZWN0TWVyZ2VLZXlzIiwiZ2V0TWVyZ2VkVmFsdWUiLCJ0YXJnZXQiLCJzb3VyY2UiLCJtZXJnZURlZXBQcm9wZXJ0aWVzIiwicHJvcCIsInZhbHVlRnJvbUNvbmZpZzIiLCJkZWZhdWx0VG9Db25maWcyIiwiYXhpb3NLZXlzIiwib3RoZXJLZXlzIiwia2V5cyIsImZpbHRlciIsImZpbHRlckF4aW9zS2V5cyIsIkF4aW9zIiwiaW5zdGFuY2VDb25maWciLCJpbnRlcmNlcHRvcnMiLCJjaGFpbiIsInVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzIiwiaW50ZXJjZXB0b3IiLCJ1bnNoaWZ0IiwicHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzIiwic2hpZnQiLCJnZXRVcmkiLCJBeGlvc18xIiwiQ2FuY2VsIiwiQ2FuY2VsXzEiLCJDYW5jZWxUb2tlbiIsImV4ZWN1dG9yIiwiVHlwZUVycm9yIiwicmVzb2x2ZVByb21pc2UiLCJwcm9taXNlRXhlY3V0b3IiLCJ0b2tlbiIsImMiLCJDYW5jZWxUb2tlbl8xIiwic3ByZWFkIiwiY2FsbGJhY2siLCJhcnIiLCJwYXlsb2FkIiwiY3JlYXRlSW5zdGFuY2UiLCJkZWZhdWx0Q29uZmlnIiwiY29udGV4dCIsImluc3RhbmNlIiwiYXhpb3MiLCJjcmVhdGUiLCJhbGwiLCJwcm9taXNlcyIsInJlcXVpcmUkJDgiLCJyZXF1aXJlJCQ5IiwiYXhpb3NNb2R1bGUiLCJzaGFtcyIsImhhc1N5bWJvbHMiLCJTeW1ib2wiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJpdGVyYXRvciIsInN5bSIsInN5bU9iaiIsInN5bVZhbCIsImdldE93blByb3BlcnR5TmFtZXMiLCJzeW1zIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsIm9yaWdTeW1ib2wiLCJnbG9iYWwiLCJoYXNTeW1ib2xTaGFtIiwiaGFzTmF0aXZlU3ltYm9scyIsIkVSUk9SX01FU1NBR0UiLCJ0b1N0ciIsImZ1bmNUeXBlIiwiaW1wbGVtZW50YXRpb24iLCJ0aGF0IiwiYm91bmQiLCJiaW5kZXIiLCJib3VuZExlbmd0aCIsIk1hdGgiLCJtYXgiLCJib3VuZEFyZ3MiLCJGdW5jdGlvbiIsIkVtcHR5IiwiZnVuY3Rpb25CaW5kIiwic3JjIiwiJFN5bnRheEVycm9yIiwiU3ludGF4RXJyb3IiLCIkRnVuY3Rpb24iLCIkVHlwZUVycm9yIiwiZ2V0RXZhbGxlZENvbnN0cnVjdG9yIiwiZXhwcmVzc2lvblN5bnRheCIsIiRnT1BEIiwidGhyb3dUeXBlRXJyb3IiLCJUaHJvd1R5cGVFcnJvciIsImNhbGxlZSIsImNhbGxlZVRocm93cyIsImdldCIsImdPUER0aHJvd3MiLCJnZXRQcm90byIsIngiLCJfX3Byb3RvX18iLCJuZWVkc0V2YWwiLCJUeXBlZEFycmF5IiwiVWludDhBcnJheSIsIklOVFJJTlNJQ1MiLCJBZ2dyZWdhdGVFcnJvciIsIkF0b21pY3MiLCJCaWdJbnQiLCJCb29sZWFuIiwiRGF0YVZpZXciLCJkZWNvZGVVUkkiLCJlbmNvZGVVUkkiLCJldmFsIiwiRXZhbEVycm9yIiwiRmxvYXQzMkFycmF5IiwiRmxvYXQ2NEFycmF5IiwiRmluYWxpemF0aW9uUmVnaXN0cnkiLCJJbnQ4QXJyYXkiLCJJbnQxNkFycmF5IiwiSW50MzJBcnJheSIsImlzRmluaXRlIiwiaXNOYU4iLCJNYXAiLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJQcm94eSIsIlJhbmdlRXJyb3IiLCJSZWZlcmVuY2VFcnJvciIsIlJlZmxlY3QiLCJTZXQiLCJTaGFyZWRBcnJheUJ1ZmZlciIsIlN0cmluZyIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiVWludDE2QXJyYXkiLCJVaW50MzJBcnJheSIsIlVSSUVycm9yIiwiV2Vha01hcCIsIldlYWtSZWYiLCJXZWFrU2V0IiwiZG9FdmFsIiwiZ2VuIiwiTEVHQUNZX0FMSUFTRVMiLCJoYXNPd24iLCIkY29uY2F0IiwiJHNwbGljZUFwcGx5Iiwic3BsaWNlIiwiJHJlcGxhY2UiLCIkc3RyU2xpY2UiLCJyZVByb3BOYW1lIiwicmVFc2NhcGVDaGFyIiwic3RyaW5nVG9QYXRoIiwic3RyaW5nIiwiZmlyc3QiLCJsYXN0IiwicXVvdGUiLCJzdWJTdHJpbmciLCJnZXRCYXNlSW50cmluc2ljIiwiYWxsb3dNaXNzaW5nIiwiaW50cmluc2ljTmFtZSIsImFsaWFzIiwiZ2V0SW50cmluc2ljIiwiR2V0SW50cmluc2ljIiwiaW50cmluc2ljQmFzZU5hbWUiLCJpbnRyaW5zaWMiLCJpbnRyaW5zaWNSZWFsTmFtZSIsInNraXBGdXJ0aGVyQ2FjaGluZyIsImlzT3duIiwicGFydCIsImRlc2MiLCIkYXBwbHkiLCIkY2FsbCIsIiRyZWZsZWN0QXBwbHkiLCIkZGVmaW5lUHJvcGVydHkiLCIkbWF4IiwibW9kdWxlIiwiY2FsbEJpbmQiLCJvcmlnaW5hbEZ1bmN0aW9uIiwiZnVuYyIsImNvbmZpZ3VyYWJsZSIsImFwcGx5QmluZCIsImV4cG9ydHMiLCIkaW5kZXhPZiIsImNhbGxCb3VuZCIsImNhbGxCb3VuZEludHJpbnNpYyIsImhhc01hcCIsIm1hcFNpemVEZXNjcmlwdG9yIiwibWFwU2l6ZSIsIm1hcEZvckVhY2giLCJoYXNTZXQiLCJzZXRTaXplRGVzY3JpcHRvciIsInNldFNpemUiLCJzZXRGb3JFYWNoIiwiaGFzV2Vha01hcCIsIndlYWtNYXBIYXMiLCJoYXMiLCJoYXNXZWFrU2V0Iiwid2Vha1NldEhhcyIsImhhc1dlYWtSZWYiLCJ3ZWFrUmVmRGVyZWYiLCJkZXJlZiIsImJvb2xlYW5WYWx1ZU9mIiwidmFsdWVPZiIsIm9iamVjdFRvU3RyaW5nIiwiZnVuY3Rpb25Ub1N0cmluZyIsImJpZ0ludFZhbHVlT2YiLCJnT1BTIiwic3ltVG9TdHJpbmciLCJoYXNTaGFtbWVkU3ltYm9scyIsImlzRW51bWVyYWJsZSIsImdQTyIsIk8iLCJpbnNwZWN0Q3VzdG9tIiwiY3VzdG9tIiwiaW5zcGVjdFN5bWJvbCIsImlzU3ltYm9sIiwidG9TdHJpbmdUYWciLCJvYmplY3RJbnNwZWN0IiwiaW5zcGVjdF8iLCJvcHRpb25zIiwiZGVwdGgiLCJzZWVuIiwib3B0cyIsInF1b3RlU3R5bGUiLCJtYXhTdHJpbmdMZW5ndGgiLCJJbmZpbml0eSIsImN1c3RvbUluc3BlY3QiLCJpbmRlbnQiLCJpbnNwZWN0U3RyaW5nIiwibWF4RGVwdGgiLCJnZXRJbmRlbnQiLCJpbnNwZWN0IiwiZnJvbSIsIm5vSW5kZW50IiwibmV3T3B0cyIsIm5hbWVPZiIsImFyck9iaktleXMiLCJzeW1TdHJpbmciLCJtYXJrQm94ZWQiLCJpc0VsZW1lbnQiLCJzIiwibm9kZU5hbWUiLCJhdHRycyIsImF0dHJpYnV0ZXMiLCJ3cmFwUXVvdGVzIiwiY2hpbGROb2RlcyIsInhzIiwic2luZ2xlTGluZVZhbHVlcyIsImluZGVudGVkSm9pbiIsImlzRXJyb3IiLCJpc01hcCIsIm1hcFBhcnRzIiwiY29sbGVjdGlvbk9mIiwiaXNTZXQiLCJzZXRQYXJ0cyIsImlzV2Vha01hcCIsIndlYWtDb2xsZWN0aW9uT2YiLCJpc1dlYWtTZXQiLCJpc1dlYWtSZWYiLCJpc0JpZ0ludCIsImlzQm9vbGVhbiIsImlzUmVnRXhwIiwieXMiLCJwcm90b1RhZyIsInN0cmluZ1RhZyIsImNvbnN0cnVjdG9yVGFnIiwidGFnIiwiZGVmYXVsdFN0eWxlIiwicXVvdGVDaGFyIiwiZiIsIm0iLCJIVE1MRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInJlbWFpbmluZyIsInRyYWlsZXIiLCJsb3dieXRlIiwibiIsInR5cGUiLCJzaXplIiwiZW50cmllcyIsImpvaW5lZEVudHJpZXMiLCJiYXNlSW5kZW50IiwiYmFzZSIsInByZXYiLCJsaW5lSm9pbmVyIiwiaXNBcnIiLCJzeW1NYXAiLCJrIiwiaiIsIiRXZWFrTWFwIiwiJE1hcCIsIiR3ZWFrTWFwR2V0IiwiJHdlYWtNYXBTZXQiLCIkd2Vha01hcEhhcyIsIiRtYXBHZXQiLCIkbWFwU2V0IiwiJG1hcEhhcyIsImxpc3RHZXROb2RlIiwibGlzdCIsImN1cnIiLCJuZXh0IiwibGlzdEdldCIsIm9iamVjdHMiLCJub2RlIiwibGlzdFNldCIsImxpc3RIYXMiLCJzaWRlQ2hhbm5lbCIsImdldFNpZGVDaGFubmVsIiwiJHdtIiwiJG0iLCIkbyIsImNoYW5uZWwiLCJhc3NlcnQiLCJzZXQiLCJwZXJjZW50VHdlbnRpZXMiLCJGb3JtYXQiLCJSRkMxNzM4IiwiUkZDMzk4NiIsImZvcm1hdHMiLCJmb3JtYXR0ZXJzIiwiaGV4VGFibGUiLCJhcnJheSIsImNvbXBhY3RRdWV1ZSIsInF1ZXVlIiwiaXRlbSIsInBvcCIsImNvbXBhY3RlZCIsImFycmF5VG9PYmplY3QiLCJwbGFpbk9iamVjdHMiLCJhbGxvd1Byb3RvdHlwZXMiLCJtZXJnZVRhcmdldCIsInRhcmdldEl0ZW0iLCJyZWR1Y2UiLCJhY2MiLCJhc3NpZ24iLCJhc3NpZ25TaW5nbGVTb3VyY2UiLCJkZWNvZGUiLCJkZWNvZGVyIiwiY2hhcnNldCIsInN0cldpdGhvdXRQbHVzIiwiZGVmYXVsdEVuY29kZXIiLCJraW5kIiwiZm9ybWF0IiwiZXNjYXBlIiwiJDAiLCJvdXQiLCJjb21wYWN0IiwibyIsInJlZnMiLCJjb21iaW5lIiwibWF5YmVNYXAiLCJtYXBwZWQiLCJhcnJheVByZWZpeEdlbmVyYXRvcnMiLCJicmFja2V0cyIsInByZWZpeCIsImNvbW1hIiwiaW5kaWNlcyIsInJlcGVhdCIsInB1c2hUb0FycmF5IiwidmFsdWVPckFycmF5IiwidG9JU08iLCJkZWZhdWx0Rm9ybWF0IiwiYWRkUXVlcnlQcmVmaXgiLCJhbGxvd0RvdHMiLCJjaGFyc2V0U2VudGluZWwiLCJkZWxpbWl0ZXIiLCJlbmNvZGVyIiwiZW5jb2RlVmFsdWVzT25seSIsImZvcm1hdHRlciIsInNlcmlhbGl6ZURhdGUiLCJkYXRlIiwic2tpcE51bGxzIiwic3RyaWN0TnVsbEhhbmRsaW5nIiwiaXNOb25OdWxsaXNoUHJpbWl0aXZlIiwib2JqZWN0IiwiZ2VuZXJhdGVBcnJheVByZWZpeCIsInNvcnQiLCJrZXlWYWx1ZSIsInZhbHVlcyIsIm9iaktleXMiLCJrZXlQcmVmaXgiLCJ2YWx1ZVNpZGVDaGFubmVsIiwibm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyIsInN0cmluZ2lmeV8xIiwiYXJyYXlGb3JtYXQiLCJqb2luZWQiLCJhbGxvd1NwYXJzZSIsImFycmF5TGltaXQiLCJpZ25vcmVRdWVyeVByZWZpeCIsImludGVycHJldE51bWVyaWNFbnRpdGllcyIsInBhcmFtZXRlckxpbWl0IiwicGFyc2VBcnJheXMiLCJudW1iZXJTdHIiLCJmcm9tQ2hhckNvZGUiLCJwYXJzZUFycmF5VmFsdWUiLCJpc29TZW50aW5lbCIsInBhcnNlVmFsdWVzIiwicGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyIsImNsZWFuU3RyIiwibGltaXQiLCJza2lwSW5kZXgiLCJicmFja2V0RXF1YWxzUG9zIiwicG9zIiwiZW5jb2RlZFZhbCIsInBhcnNlT2JqZWN0IiwidmFsdWVzUGFyc2VkIiwibGVhZiIsInJvb3QiLCJjbGVhblJvb3QiLCJpbmRleCIsInBhcnNlS2V5cyIsInBhcnNlUXVlcnlTdHJpbmdLZXlzIiwiZ2l2ZW5LZXkiLCJjaGlsZCIsInNlZ21lbnQiLCJleGVjIiwicGFyZW50Iiwibm9ybWFsaXplUGFyc2VPcHRpb25zIiwidGVtcE9iaiIsIm5ld09iaiIsImxpYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBRUFBLE1BQWMsR0FBRyxTQUFTQSxJQUFULENBQWNDLEVBQWQsRUFBa0JDLE9BQWxCLEVBQTJCO0NBQzFDLFNBQU8sU0FBU0MsSUFBVCxHQUFnQjtDQUNyQixRQUFJQyxJQUFJLEdBQUcsSUFBSUMsS0FBSixDQUFVQyxTQUFTLENBQUNDLE1BQXBCLENBQVg7O0NBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixJQUFJLENBQUNHLE1BQXpCLEVBQWlDQyxDQUFDLEVBQWxDLEVBQXNDO0NBQ3BDSixNQUFBQSxJQUFJLENBQUNJLENBQUQsQ0FBSixHQUFVRixTQUFTLENBQUNFLENBQUQsQ0FBbkI7Q0FDRDs7Q0FDRCxXQUFPUCxFQUFFLENBQUNRLEtBQUgsQ0FBU1AsT0FBVCxFQUFrQkUsSUFBbEIsQ0FBUDtDQUNELEdBTkQ7Q0FPRDs7Q0NSRCxJQUFJSixNQUFJLEdBQUdVLE1BQVg7Q0FFQTtDQUVBOztDQUVBLElBQUlDLFFBQVEsR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCRixRQUFoQztDQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Q0FDQSxTQUFTRyxTQUFULENBQWlCQyxHQUFqQixFQUFzQjtDQUNwQixTQUFPSixRQUFRLENBQUNLLElBQVQsQ0FBY0QsR0FBZCxNQUF1QixnQkFBOUI7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU0UsV0FBVCxDQUFxQkYsR0FBckIsRUFBMEI7Q0FDeEIsU0FBTyxPQUFPQSxHQUFQLEtBQWUsV0FBdEI7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU0csVUFBVCxDQUFrQkgsR0FBbEIsRUFBdUI7Q0FDckIsU0FBT0EsR0FBRyxLQUFLLElBQVIsSUFBZ0IsQ0FBQ0UsV0FBVyxDQUFDRixHQUFELENBQTVCLElBQXFDQSxHQUFHLENBQUNJLFdBQUosS0FBb0IsSUFBekQsSUFBaUUsQ0FBQ0YsV0FBVyxDQUFDRixHQUFHLENBQUNJLFdBQUwsQ0FBN0UsSUFDRixPQUFPSixHQUFHLENBQUNJLFdBQUosQ0FBZ0JELFFBQXZCLEtBQW9DLFVBRGxDLElBQ2dESCxHQUFHLENBQUNJLFdBQUosQ0FBZ0JELFFBQWhCLENBQXlCSCxHQUF6QixDQUR2RDtDQUVEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTSyxhQUFULENBQXVCTCxHQUF2QixFQUE0QjtDQUMxQixTQUFPSixRQUFRLENBQUNLLElBQVQsQ0FBY0QsR0FBZCxNQUF1QixzQkFBOUI7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU00sVUFBVCxDQUFvQk4sR0FBcEIsRUFBeUI7Q0FDdkIsU0FBUSxPQUFPTyxRQUFQLEtBQW9CLFdBQXJCLElBQXNDUCxHQUFHLFlBQVlPLFFBQTVEO0NBQ0Q7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztDQUNBLFNBQVNDLGlCQUFULENBQTJCUixHQUEzQixFQUFnQztDQUM5QixNQUFJUyxNQUFKOztDQUNBLE1BQUssT0FBT0MsV0FBUCxLQUF1QixXQUF4QixJQUF5Q0EsV0FBVyxDQUFDQyxNQUF6RCxFQUFrRTtDQUNoRUYsSUFBQUEsTUFBTSxHQUFHQyxXQUFXLENBQUNDLE1BQVosQ0FBbUJYLEdBQW5CLENBQVQ7Q0FDRCxHQUZELE1BRU87Q0FDTFMsSUFBQUEsTUFBTSxHQUFJVCxHQUFELElBQVVBLEdBQUcsQ0FBQ1ksTUFBZCxJQUEwQlosR0FBRyxDQUFDWSxNQUFKLFlBQXNCRixXQUF6RDtDQUNEOztDQUNELFNBQU9ELE1BQVA7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU0ksVUFBVCxDQUFrQmIsR0FBbEIsRUFBdUI7Q0FDckIsU0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEI7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU2MsVUFBVCxDQUFrQmQsR0FBbEIsRUFBdUI7Q0FDckIsU0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEI7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU2UsUUFBVCxDQUFrQmYsR0FBbEIsRUFBdUI7Q0FDckIsU0FBT0EsR0FBRyxLQUFLLElBQVIsSUFBZ0IsUUFBT0EsR0FBUCxNQUFlLFFBQXRDO0NBQ0Q7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztDQUNBLFNBQVNnQixhQUFULENBQXVCaEIsR0FBdkIsRUFBNEI7Q0FDMUIsTUFBSUosUUFBUSxDQUFDSyxJQUFULENBQWNELEdBQWQsTUFBdUIsaUJBQTNCLEVBQThDO0NBQzVDLFdBQU8sS0FBUDtDQUNEOztDQUVELE1BQUlGLFNBQVMsR0FBR0QsTUFBTSxDQUFDb0IsY0FBUCxDQUFzQmpCLEdBQXRCLENBQWhCO0NBQ0EsU0FBT0YsU0FBUyxLQUFLLElBQWQsSUFBc0JBLFNBQVMsS0FBS0QsTUFBTSxDQUFDQyxTQUFsRDtDQUNEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTb0IsUUFBVCxDQUFnQmxCLEdBQWhCLEVBQXFCO0NBQ25CLFNBQU9KLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjRCxHQUFkLE1BQXVCLGVBQTlCO0NBQ0Q7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztDQUNBLFNBQVNtQixNQUFULENBQWdCbkIsR0FBaEIsRUFBcUI7Q0FDbkIsU0FBT0osUUFBUSxDQUFDSyxJQUFULENBQWNELEdBQWQsTUFBdUIsZUFBOUI7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU29CLE1BQVQsQ0FBZ0JwQixHQUFoQixFQUFxQjtDQUNuQixTQUFPSixRQUFRLENBQUNLLElBQVQsQ0FBY0QsR0FBZCxNQUF1QixlQUE5QjtDQUNEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTcUIsVUFBVCxDQUFvQnJCLEdBQXBCLEVBQXlCO0NBQ3ZCLFNBQU9KLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjRCxHQUFkLE1BQXVCLG1CQUE5QjtDQUNEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTc0IsUUFBVCxDQUFrQnRCLEdBQWxCLEVBQXVCO0NBQ3JCLFNBQU9lLFFBQVEsQ0FBQ2YsR0FBRCxDQUFSLElBQWlCcUIsVUFBVSxDQUFDckIsR0FBRyxDQUFDdUIsSUFBTCxDQUFsQztDQUNEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTQyxpQkFBVCxDQUEyQnhCLEdBQTNCLEVBQWdDO0NBQzlCLFNBQU8sT0FBT3lCLGVBQVAsS0FBMkIsV0FBM0IsSUFBMEN6QixHQUFHLFlBQVl5QixlQUFoRTtDQUNEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTQyxJQUFULENBQWNDLEdBQWQsRUFBbUI7Q0FDakIsU0FBT0EsR0FBRyxDQUFDQyxPQUFKLENBQVksTUFBWixFQUFvQixFQUFwQixFQUF3QkEsT0FBeEIsQ0FBZ0MsTUFBaEMsRUFBd0MsRUFBeEMsQ0FBUDtDQUNEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTQyxvQkFBVCxHQUFnQztDQUM5QixNQUFJLE9BQU9DLFNBQVAsS0FBcUIsV0FBckIsS0FBcUNBLFNBQVMsQ0FBQ0MsT0FBVixLQUFzQixhQUF0QixJQUNBRCxTQUFTLENBQUNDLE9BQVYsS0FBc0IsY0FEdEIsSUFFQUQsU0FBUyxDQUFDQyxPQUFWLEtBQXNCLElBRjNELENBQUosRUFFc0U7Q0FDcEUsV0FBTyxLQUFQO0NBQ0Q7O0NBQ0QsU0FDRSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLElBQ0EsT0FBT0MsUUFBUCxLQUFvQixXQUZ0QjtDQUlEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTQyxPQUFULENBQWlCQyxHQUFqQixFQUFzQmpELEVBQXRCLEVBQTBCOztDQUV4QixNQUFJaUQsR0FBRyxLQUFLLElBQVIsSUFBZ0IsT0FBT0EsR0FBUCxLQUFlLFdBQW5DLEVBQWdEO0NBQzlDO0NBQ0QsR0FKdUI7OztDQU94QixNQUFJLFFBQU9BLEdBQVAsTUFBZSxRQUFuQixFQUE2Qjs7Q0FFM0JBLElBQUFBLEdBQUcsR0FBRyxDQUFDQSxHQUFELENBQU47Q0FDRDs7Q0FFRCxNQUFJcEMsU0FBTyxDQUFDb0MsR0FBRCxDQUFYLEVBQWtCOztDQUVoQixTQUFLLElBQUkxQyxDQUFDLEdBQUcsQ0FBUixFQUFXMkMsQ0FBQyxHQUFHRCxHQUFHLENBQUMzQyxNQUF4QixFQUFnQ0MsQ0FBQyxHQUFHMkMsQ0FBcEMsRUFBdUMzQyxDQUFDLEVBQXhDLEVBQTRDO0NBQzFDUCxNQUFBQSxFQUFFLENBQUNlLElBQUgsQ0FBUSxJQUFSLEVBQWNrQyxHQUFHLENBQUMxQyxDQUFELENBQWpCLEVBQXNCQSxDQUF0QixFQUF5QjBDLEdBQXpCO0NBQ0Q7Q0FDRixHQUxELE1BS087O0NBRUwsU0FBSyxJQUFJRSxHQUFULElBQWdCRixHQUFoQixFQUFxQjtDQUNuQixVQUFJdEMsTUFBTSxDQUFDQyxTQUFQLENBQWlCd0MsY0FBakIsQ0FBZ0NyQyxJQUFoQyxDQUFxQ2tDLEdBQXJDLEVBQTBDRSxHQUExQyxDQUFKLEVBQW9EO0NBQ2xEbkQsUUFBQUEsRUFBRSxDQUFDZSxJQUFILENBQVEsSUFBUixFQUFja0MsR0FBRyxDQUFDRSxHQUFELENBQWpCLEVBQXdCQSxHQUF4QixFQUE2QkYsR0FBN0I7Q0FDRDtDQUNGO0NBQ0Y7Q0FDRjtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztDQUNBLFNBQVNJLE9BQVQsR0FBNEM7Q0FDMUMsTUFBSTlCLE1BQU0sR0FBRyxFQUFiOztDQUNBLFdBQVMrQixXQUFULENBQXFCeEMsR0FBckIsRUFBMEJxQyxHQUExQixFQUErQjtDQUM3QixRQUFJckIsYUFBYSxDQUFDUCxNQUFNLENBQUM0QixHQUFELENBQVAsQ0FBYixJQUE4QnJCLGFBQWEsQ0FBQ2hCLEdBQUQsQ0FBL0MsRUFBc0Q7Q0FDcERTLE1BQUFBLE1BQU0sQ0FBQzRCLEdBQUQsQ0FBTixHQUFjRSxPQUFLLENBQUM5QixNQUFNLENBQUM0QixHQUFELENBQVAsRUFBY3JDLEdBQWQsQ0FBbkI7Q0FDRCxLQUZELE1BRU8sSUFBSWdCLGFBQWEsQ0FBQ2hCLEdBQUQsQ0FBakIsRUFBd0I7Q0FDN0JTLE1BQUFBLE1BQU0sQ0FBQzRCLEdBQUQsQ0FBTixHQUFjRSxPQUFLLENBQUMsRUFBRCxFQUFLdkMsR0FBTCxDQUFuQjtDQUNELEtBRk0sTUFFQSxJQUFJRCxTQUFPLENBQUNDLEdBQUQsQ0FBWCxFQUFrQjtDQUN2QlMsTUFBQUEsTUFBTSxDQUFDNEIsR0FBRCxDQUFOLEdBQWNyQyxHQUFHLENBQUN5QyxLQUFKLEVBQWQ7Q0FDRCxLQUZNLE1BRUE7Q0FDTGhDLE1BQUFBLE1BQU0sQ0FBQzRCLEdBQUQsQ0FBTixHQUFjckMsR0FBZDtDQUNEO0NBQ0Y7O0NBRUQsT0FBSyxJQUFJUCxDQUFDLEdBQUcsQ0FBUixFQUFXMkMsQ0FBQyxHQUFHN0MsU0FBUyxDQUFDQyxNQUE5QixFQUFzQ0MsQ0FBQyxHQUFHMkMsQ0FBMUMsRUFBNkMzQyxDQUFDLEVBQTlDLEVBQWtEO0NBQ2hEeUMsSUFBQUEsT0FBTyxDQUFDM0MsU0FBUyxDQUFDRSxDQUFELENBQVYsRUFBZStDLFdBQWYsQ0FBUDtDQUNEOztDQUNELFNBQU8vQixNQUFQO0NBQ0Q7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQSxTQUFTaUMsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCekQsT0FBdEIsRUFBK0I7Q0FDN0IrQyxFQUFBQSxPQUFPLENBQUNVLENBQUQsRUFBSSxTQUFTSixXQUFULENBQXFCeEMsR0FBckIsRUFBMEJxQyxHQUExQixFQUErQjtDQUN4QyxRQUFJbEQsT0FBTyxJQUFJLE9BQU9hLEdBQVAsS0FBZSxVQUE5QixFQUEwQztDQUN4QzJDLE1BQUFBLENBQUMsQ0FBQ04sR0FBRCxDQUFELEdBQVNwRCxNQUFJLENBQUNlLEdBQUQsRUFBTWIsT0FBTixDQUFiO0NBQ0QsS0FGRCxNQUVPO0NBQ0x3RCxNQUFBQSxDQUFDLENBQUNOLEdBQUQsQ0FBRCxHQUFTckMsR0FBVDtDQUNEO0NBQ0YsR0FOTSxDQUFQO0NBT0EsU0FBTzJDLENBQVA7Q0FDRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsU0FBU0UsUUFBVCxDQUFrQkMsT0FBbEIsRUFBMkI7Q0FDekIsTUFBSUEsT0FBTyxDQUFDQyxVQUFSLENBQW1CLENBQW5CLE1BQTBCLE1BQTlCLEVBQXNDO0NBQ3BDRCxJQUFBQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQ0wsS0FBUixDQUFjLENBQWQsQ0FBVjtDQUNEOztDQUNELFNBQU9LLE9BQVA7Q0FDRDs7S0FFREUsT0FBYyxHQUFHO0NBQ2ZqRCxFQUFBQSxPQUFPLEVBQUVBLFNBRE07Q0FFZk0sRUFBQUEsYUFBYSxFQUFFQSxhQUZBO0NBR2ZGLEVBQUFBLFFBQVEsRUFBRUEsVUFISztDQUlmRyxFQUFBQSxVQUFVLEVBQUVBLFVBSkc7Q0FLZkUsRUFBQUEsaUJBQWlCLEVBQUVBLGlCQUxKO0NBTWZLLEVBQUFBLFFBQVEsRUFBRUEsVUFOSztDQU9mQyxFQUFBQSxRQUFRLEVBQUVBLFVBUEs7Q0FRZkMsRUFBQUEsUUFBUSxFQUFFQSxRQVJLO0NBU2ZDLEVBQUFBLGFBQWEsRUFBRUEsYUFUQTtDQVVmZCxFQUFBQSxXQUFXLEVBQUVBLFdBVkU7Q0FXZmdCLEVBQUFBLE1BQU0sRUFBRUEsUUFYTztDQVlmQyxFQUFBQSxNQUFNLEVBQUVBLE1BWk87Q0FhZkMsRUFBQUEsTUFBTSxFQUFFQSxNQWJPO0NBY2ZDLEVBQUFBLFVBQVUsRUFBRUEsVUFkRztDQWVmQyxFQUFBQSxRQUFRLEVBQUVBLFFBZks7Q0FnQmZFLEVBQUFBLGlCQUFpQixFQUFFQSxpQkFoQko7Q0FpQmZLLEVBQUFBLG9CQUFvQixFQUFFQSxvQkFqQlA7Q0FrQmZLLEVBQUFBLE9BQU8sRUFBRUEsT0FsQk07Q0FtQmZLLEVBQUFBLEtBQUssRUFBRUEsT0FuQlE7Q0FvQmZHLEVBQUFBLE1BQU0sRUFBRUEsTUFwQk87Q0FxQmZoQixFQUFBQSxJQUFJLEVBQUVBLElBckJTO0NBc0JmbUIsRUFBQUEsUUFBUSxFQUFFQTtDQXRCSzs7Q0NyVWpCLElBQUlHLE9BQUssR0FBR3JELE9BQVo7O0NBRUEsU0FBU3NELFFBQVQsQ0FBZ0JqRCxHQUFoQixFQUFxQjtDQUNuQixTQUFPa0Qsa0JBQWtCLENBQUNsRCxHQUFELENBQWxCLENBQ0w0QixPQURLLENBQ0csT0FESCxFQUNZLEdBRFosRUFFTEEsT0FGSyxDQUVHLE1BRkgsRUFFVyxHQUZYLEVBR0xBLE9BSEssQ0FHRyxPQUhILEVBR1ksR0FIWixFQUlMQSxPQUpLLENBSUcsTUFKSCxFQUlXLEdBSlgsRUFLTEEsT0FMSyxDQUtHLE9BTEgsRUFLWSxHQUxaLEVBTUxBLE9BTkssQ0FNRyxPQU5ILEVBTVksR0FOWixDQUFQO0NBT0Q7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0tBQ0F1QixVQUFjLEdBQUcsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUJDLE1BQXZCLEVBQStCQyxnQkFBL0IsRUFBaUQ7O0NBRWhFLE1BQUksQ0FBQ0QsTUFBTCxFQUFhO0NBQ1gsV0FBT0QsR0FBUDtDQUNEOztDQUVELE1BQUlHLGdCQUFKOztDQUNBLE1BQUlELGdCQUFKLEVBQXNCO0NBQ3BCQyxJQUFBQSxnQkFBZ0IsR0FBR0QsZ0JBQWdCLENBQUNELE1BQUQsQ0FBbkM7Q0FDRCxHQUZELE1BRU8sSUFBSUwsT0FBSyxDQUFDeEIsaUJBQU4sQ0FBd0I2QixNQUF4QixDQUFKLEVBQXFDO0NBQzFDRSxJQUFBQSxnQkFBZ0IsR0FBR0YsTUFBTSxDQUFDekQsUUFBUCxFQUFuQjtDQUNELEdBRk0sTUFFQTtDQUNMLFFBQUk0RCxLQUFLLEdBQUcsRUFBWjtDQUVBUixJQUFBQSxPQUFLLENBQUNkLE9BQU4sQ0FBY21CLE1BQWQsRUFBc0IsU0FBU0ksU0FBVCxDQUFtQnpELEdBQW5CLEVBQXdCcUMsR0FBeEIsRUFBNkI7Q0FDakQsVUFBSXJDLEdBQUcsS0FBSyxJQUFSLElBQWdCLE9BQU9BLEdBQVAsS0FBZSxXQUFuQyxFQUFnRDtDQUM5QztDQUNEOztDQUVELFVBQUlnRCxPQUFLLENBQUNqRCxPQUFOLENBQWNDLEdBQWQsQ0FBSixFQUF3QjtDQUN0QnFDLFFBQUFBLEdBQUcsR0FBR0EsR0FBRyxHQUFHLElBQVo7Q0FDRCxPQUZELE1BRU87Q0FDTHJDLFFBQUFBLEdBQUcsR0FBRyxDQUFDQSxHQUFELENBQU47Q0FDRDs7Q0FFRGdELE1BQUFBLE9BQUssQ0FBQ2QsT0FBTixDQUFjbEMsR0FBZCxFQUFtQixTQUFTMEQsVUFBVCxDQUFvQkMsQ0FBcEIsRUFBdUI7Q0FDeEMsWUFBSVgsT0FBSyxDQUFDOUIsTUFBTixDQUFheUMsQ0FBYixDQUFKLEVBQXFCO0NBQ25CQSxVQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0MsV0FBRixFQUFKO0NBQ0QsU0FGRCxNQUVPLElBQUlaLE9BQUssQ0FBQ2pDLFFBQU4sQ0FBZTRDLENBQWYsQ0FBSixFQUF1QjtDQUM1QkEsVUFBQUEsQ0FBQyxHQUFHRSxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsQ0FBZixDQUFKO0NBQ0Q7O0NBQ0RILFFBQUFBLEtBQUssQ0FBQ08sSUFBTixDQUFXZCxRQUFNLENBQUNaLEdBQUQsQ0FBTixHQUFjLEdBQWQsR0FBb0JZLFFBQU0sQ0FBQ1UsQ0FBRCxDQUFyQztDQUNELE9BUEQ7Q0FRRCxLQW5CRDtDQXFCQUosSUFBQUEsZ0JBQWdCLEdBQUdDLEtBQUssQ0FBQ1EsSUFBTixDQUFXLEdBQVgsQ0FBbkI7Q0FDRDs7Q0FFRCxNQUFJVCxnQkFBSixFQUFzQjtDQUNwQixRQUFJVSxhQUFhLEdBQUdiLEdBQUcsQ0FBQ2MsT0FBSixDQUFZLEdBQVosQ0FBcEI7O0NBQ0EsUUFBSUQsYUFBYSxLQUFLLENBQUMsQ0FBdkIsRUFBMEI7Q0FDeEJiLE1BQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDWCxLQUFKLENBQVUsQ0FBVixFQUFhd0IsYUFBYixDQUFOO0NBQ0Q7O0NBRURiLElBQUFBLEdBQUcsSUFBSSxDQUFDQSxHQUFHLENBQUNjLE9BQUosQ0FBWSxHQUFaLE1BQXFCLENBQUMsQ0FBdEIsR0FBMEIsR0FBMUIsR0FBZ0MsR0FBakMsSUFBd0NYLGdCQUEvQztDQUNEOztDQUVELFNBQU9ILEdBQVA7Q0FDRDs7Q0NuRUQsSUFBSUosT0FBSyxHQUFHckQsT0FBWjs7Q0FFQSxTQUFTd0Usb0JBQVQsR0FBOEI7Q0FDNUIsT0FBS0MsUUFBTCxHQUFnQixFQUFoQjtDQUNEO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0FBQ0FELHFCQUFrQixDQUFDckUsU0FBbkIsQ0FBNkJ1RSxHQUE3QixHQUFtQyxTQUFTQSxHQUFULENBQWFDLFNBQWIsRUFBd0JDLFFBQXhCLEVBQWtDO0NBQ25FLE9BQUtILFFBQUwsQ0FBY0wsSUFBZCxDQUFtQjtDQUNqQk8sSUFBQUEsU0FBUyxFQUFFQSxTQURNO0NBRWpCQyxJQUFBQSxRQUFRLEVBQUVBO0NBRk8sR0FBbkI7Q0FJQSxTQUFPLEtBQUtILFFBQUwsQ0FBYzVFLE1BQWQsR0FBdUIsQ0FBOUI7Q0FDRCxDQU5EO0NBUUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0FBQ0EyRSxxQkFBa0IsQ0FBQ3JFLFNBQW5CLENBQTZCMEUsS0FBN0IsR0FBcUMsU0FBU0EsS0FBVCxDQUFlQyxFQUFmLEVBQW1CO0NBQ3RELE1BQUksS0FBS0wsUUFBTCxDQUFjSyxFQUFkLENBQUosRUFBdUI7Q0FDckIsU0FBS0wsUUFBTCxDQUFjSyxFQUFkLElBQW9CLElBQXBCO0NBQ0Q7Q0FDRixDQUpEO0NBTUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0FBQ0FOLHFCQUFrQixDQUFDckUsU0FBbkIsQ0FBNkJvQyxPQUE3QixHQUF1QyxTQUFTQSxPQUFULENBQWlCaEQsRUFBakIsRUFBcUI7Q0FDMUQ4RCxFQUFBQSxPQUFLLENBQUNkLE9BQU4sQ0FBYyxLQUFLa0MsUUFBbkIsRUFBNkIsU0FBU00sY0FBVCxDQUF3QkMsQ0FBeEIsRUFBMkI7Q0FDdEQsUUFBSUEsQ0FBQyxLQUFLLElBQVYsRUFBZ0I7Q0FDZHpGLE1BQUFBLEVBQUUsQ0FBQ3lGLENBQUQsQ0FBRjtDQUNEO0NBQ0YsR0FKRDtDQUtELENBTkQ7O0tBUUFDLG9CQUFjLEdBQUdUOztDQ2pEakIsSUFBSW5CLE9BQUssR0FBR3JELE9BQVo7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztLQUNBa0YsZUFBYyxHQUFHLFNBQVNBLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxPQUE3QixFQUFzQ0MsR0FBdEMsRUFBMkM7O0NBRTFEaEMsRUFBQUEsT0FBSyxDQUFDZCxPQUFOLENBQWM4QyxHQUFkLEVBQW1CLFNBQVNDLFNBQVQsQ0FBbUIvRixFQUFuQixFQUF1QjtDQUN4QzRGLElBQUFBLElBQUksR0FBRzVGLEVBQUUsQ0FBQzRGLElBQUQsRUFBT0MsT0FBUCxDQUFUO0NBQ0QsR0FGRDtDQUlBLFNBQU9ELElBQVA7Q0FDRDs7S0NqQkRJLFVBQWMsR0FBRyxTQUFTQSxRQUFULENBQWtCQyxLQUFsQixFQUF5QjtDQUN4QyxTQUFPLENBQUMsRUFBRUEsS0FBSyxJQUFJQSxLQUFLLENBQUNDLFVBQWpCLENBQVI7Q0FDRDs7Q0NGRCxJQUFJcEMsT0FBSyxHQUFHckQsT0FBWjs7S0FFQTBGLHFCQUFjLEdBQUcsU0FBU0EsbUJBQVQsQ0FBNkJOLE9BQTdCLEVBQXNDTyxjQUF0QyxFQUFzRDtDQUNyRXRDLEVBQUFBLE9BQUssQ0FBQ2QsT0FBTixDQUFjNkMsT0FBZCxFQUF1QixTQUFTUSxhQUFULENBQXVCSixLQUF2QixFQUE4QkssSUFBOUIsRUFBb0M7Q0FDekQsUUFBSUEsSUFBSSxLQUFLRixjQUFULElBQTJCRSxJQUFJLENBQUNDLFdBQUwsT0FBdUJILGNBQWMsQ0FBQ0csV0FBZixFQUF0RCxFQUFvRjtDQUNsRlYsTUFBQUEsT0FBTyxDQUFDTyxjQUFELENBQVAsR0FBMEJILEtBQTFCO0NBQ0EsYUFBT0osT0FBTyxDQUFDUyxJQUFELENBQWQ7Q0FDRDtDQUNGLEdBTEQ7Q0FNRDs7Q0NURDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0tBQ0FFLGNBQWMsR0FBRyxTQUFTQSxZQUFULENBQXNCQyxLQUF0QixFQUE2QkMsTUFBN0IsRUFBcUNDLElBQXJDLEVBQTJDQyxPQUEzQyxFQUFvREMsUUFBcEQsRUFBOEQ7Q0FDN0VKLEVBQUFBLEtBQUssQ0FBQ0MsTUFBTixHQUFlQSxNQUFmOztDQUNBLE1BQUlDLElBQUosRUFBVTtDQUNSRixJQUFBQSxLQUFLLENBQUNFLElBQU4sR0FBYUEsSUFBYjtDQUNEOztDQUVERixFQUFBQSxLQUFLLENBQUNHLE9BQU4sR0FBZ0JBLE9BQWhCO0NBQ0FILEVBQUFBLEtBQUssQ0FBQ0ksUUFBTixHQUFpQkEsUUFBakI7Q0FDQUosRUFBQUEsS0FBSyxDQUFDSyxZQUFOLEdBQXFCLElBQXJCOztDQUVBTCxFQUFBQSxLQUFLLENBQUNNLE1BQU4sR0FBZSxTQUFTQSxNQUFULEdBQWtCO0NBQy9CLFdBQU87O0NBRUxDLE1BQUFBLE9BQU8sRUFBRSxLQUFLQSxPQUZUO0NBR0xWLE1BQUFBLElBQUksRUFBRSxLQUFLQSxJQUhOOztDQUtMVyxNQUFBQSxXQUFXLEVBQUUsS0FBS0EsV0FMYjtDQU1MQyxNQUFBQSxNQUFNLEVBQUUsS0FBS0EsTUFOUjs7Q0FRTEMsTUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBUlY7Q0FTTEMsTUFBQUEsVUFBVSxFQUFFLEtBQUtBLFVBVFo7Q0FVTEMsTUFBQUEsWUFBWSxFQUFFLEtBQUtBLFlBVmQ7Q0FXTEMsTUFBQUEsS0FBSyxFQUFFLEtBQUtBLEtBWFA7O0NBYUxaLE1BQUFBLE1BQU0sRUFBRSxLQUFLQSxNQWJSO0NBY0xDLE1BQUFBLElBQUksRUFBRSxLQUFLQTtDQWROLEtBQVA7Q0FnQkQsR0FqQkQ7O0NBa0JBLFNBQU9GLEtBQVA7Q0FDRDs7Q0N2Q0QsSUFBSUQsWUFBWSxHQUFHL0YsY0FBbkI7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7S0FDQThHLGFBQWMsR0FBRyxTQUFTQSxXQUFULENBQXFCUCxPQUFyQixFQUE4Qk4sTUFBOUIsRUFBc0NDLElBQXRDLEVBQTRDQyxPQUE1QyxFQUFxREMsUUFBckQsRUFBK0Q7Q0FDOUUsTUFBSUosS0FBSyxHQUFHLElBQUllLEtBQUosQ0FBVVIsT0FBVixDQUFaO0NBQ0EsU0FBT1IsWUFBWSxDQUFDQyxLQUFELEVBQVFDLE1BQVIsRUFBZ0JDLElBQWhCLEVBQXNCQyxPQUF0QixFQUErQkMsUUFBL0IsQ0FBbkI7Q0FDRDs7Q0NmRCxJQUFJVSxhQUFXLEdBQUc5RyxhQUFsQjtDQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztLQUNBZ0gsUUFBYyxHQUFHLFNBQVNBLE1BQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCQyxNQUF6QixFQUFpQ2QsUUFBakMsRUFBMkM7Q0FDMUQsTUFBSWUsY0FBYyxHQUFHZixRQUFRLENBQUNILE1BQVQsQ0FBZ0JrQixjQUFyQzs7Q0FDQSxNQUFJLENBQUNmLFFBQVEsQ0FBQ2dCLE1BQVYsSUFBb0IsQ0FBQ0QsY0FBckIsSUFBdUNBLGNBQWMsQ0FBQ2YsUUFBUSxDQUFDZ0IsTUFBVixDQUF6RCxFQUE0RTtDQUMxRUgsSUFBQUEsT0FBTyxDQUFDYixRQUFELENBQVA7Q0FDRCxHQUZELE1BRU87Q0FDTGMsSUFBQUEsTUFBTSxDQUFDSixhQUFXLENBQ2hCLHFDQUFxQ1YsUUFBUSxDQUFDZ0IsTUFEOUIsRUFFaEJoQixRQUFRLENBQUNILE1BRk8sRUFHaEIsSUFIZ0IsRUFJaEJHLFFBQVEsQ0FBQ0QsT0FKTyxFQUtoQkMsUUFMZ0IsQ0FBWixDQUFOO0NBT0Q7Q0FDRjs7Q0N0QkQsSUFBSS9DLE9BQUssR0FBR3JELE9BQVo7S0FFQXFILFNBQWMsR0FDWmhFLE9BQUssQ0FBQ25CLG9CQUFOO0NBR0csU0FBU29GLGtCQUFULEdBQThCO0NBQzdCLFNBQU87Q0FDTEMsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZTFCLElBQWYsRUFBcUJMLEtBQXJCLEVBQTRCZ0MsT0FBNUIsRUFBcUNDLElBQXJDLEVBQTJDQyxNQUEzQyxFQUFtREMsTUFBbkQsRUFBMkQ7Q0FDaEUsVUFBSUMsTUFBTSxHQUFHLEVBQWI7Q0FDQUEsTUFBQUEsTUFBTSxDQUFDeEQsSUFBUCxDQUFZeUIsSUFBSSxHQUFHLEdBQVAsR0FBYXRDLGtCQUFrQixDQUFDaUMsS0FBRCxDQUEzQzs7Q0FFQSxVQUFJbkMsT0FBSyxDQUFDbEMsUUFBTixDQUFlcUcsT0FBZixDQUFKLEVBQTZCO0NBQzNCSSxRQUFBQSxNQUFNLENBQUN4RCxJQUFQLENBQVksYUFBYSxJQUFJeUQsSUFBSixDQUFTTCxPQUFULEVBQWtCTSxXQUFsQixFQUF6QjtDQUNEOztDQUVELFVBQUl6RSxPQUFLLENBQUNuQyxRQUFOLENBQWV1RyxJQUFmLENBQUosRUFBMEI7Q0FDeEJHLFFBQUFBLE1BQU0sQ0FBQ3hELElBQVAsQ0FBWSxVQUFVcUQsSUFBdEI7Q0FDRDs7Q0FFRCxVQUFJcEUsT0FBSyxDQUFDbkMsUUFBTixDQUFld0csTUFBZixDQUFKLEVBQTRCO0NBQzFCRSxRQUFBQSxNQUFNLENBQUN4RCxJQUFQLENBQVksWUFBWXNELE1BQXhCO0NBQ0Q7O0NBRUQsVUFBSUMsTUFBTSxLQUFLLElBQWYsRUFBcUI7Q0FDbkJDLFFBQUFBLE1BQU0sQ0FBQ3hELElBQVAsQ0FBWSxRQUFaO0NBQ0Q7O0NBRUQ5QixNQUFBQSxRQUFRLENBQUNzRixNQUFULEdBQWtCQSxNQUFNLENBQUN2RCxJQUFQLENBQVksSUFBWixDQUFsQjtDQUNELEtBdEJJO0NBd0JMMEQsSUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsQ0FBY2xDLElBQWQsRUFBb0I7Q0FDeEIsVUFBSW1DLEtBQUssR0FBRzFGLFFBQVEsQ0FBQ3NGLE1BQVQsQ0FBZ0JJLEtBQWhCLENBQXNCLElBQUlDLE1BQUosQ0FBVyxlQUFlcEMsSUFBZixHQUFzQixXQUFqQyxDQUF0QixDQUFaO0NBQ0EsYUFBUW1DLEtBQUssR0FBR0Usa0JBQWtCLENBQUNGLEtBQUssQ0FBQyxDQUFELENBQU4sQ0FBckIsR0FBa0MsSUFBL0M7Q0FDRCxLQTNCSTtDQTZCTEcsSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsQ0FBZ0J0QyxJQUFoQixFQUFzQjtDQUM1QixXQUFLMEIsS0FBTCxDQUFXMUIsSUFBWCxFQUFpQixFQUFqQixFQUFxQmdDLElBQUksQ0FBQ08sR0FBTCxLQUFhLFFBQWxDO0NBQ0Q7Q0EvQkksR0FBUDtDQWlDRCxDQWxDRCxFQUhGO0NBd0NHLFNBQVNDLHFCQUFULEdBQWlDO0NBQ2hDLFNBQU87Q0FDTGQsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsR0FBaUIsRUFEbkI7Q0FFTFEsSUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7Q0FBRSxhQUFPLElBQVA7Q0FBYyxLQUZqQztDQUdMSSxJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtDQUhyQixHQUFQO0NBS0QsQ0FORDs7Q0MzQ0o7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7S0FDQUcsZUFBYyxHQUFHLFNBQVNBLGFBQVQsQ0FBdUI3RSxHQUF2QixFQUE0Qjs7OztDQUkzQyxTQUFPLGdDQUFnQzhFLElBQWhDLENBQXFDOUUsR0FBckMsQ0FBUDtDQUNEOztDQ1hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7S0FDQStFLGFBQWMsR0FBRyxTQUFTQSxXQUFULENBQXFCQyxPQUFyQixFQUE4QkMsV0FBOUIsRUFBMkM7Q0FDMUQsU0FBT0EsV0FBVyxHQUNkRCxPQUFPLENBQUN4RyxPQUFSLENBQWdCLE1BQWhCLEVBQXdCLEVBQXhCLElBQThCLEdBQTlCLEdBQW9DeUcsV0FBVyxDQUFDekcsT0FBWixDQUFvQixNQUFwQixFQUE0QixFQUE1QixDQUR0QixHQUVkd0csT0FGSjtDQUdEOztDQ1hELElBQUlILGFBQWEsR0FBR3RJLGVBQXBCO0NBQ0EsSUFBSXdJLFdBQVcsR0FBR0csYUFBbEI7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0tBQ0FDLGVBQWMsR0FBRyxTQUFTQSxhQUFULENBQXVCSCxPQUF2QixFQUFnQ0ksWUFBaEMsRUFBOEM7Q0FDN0QsTUFBSUosT0FBTyxJQUFJLENBQUNILGFBQWEsQ0FBQ08sWUFBRCxDQUE3QixFQUE2QztDQUMzQyxXQUFPTCxXQUFXLENBQUNDLE9BQUQsRUFBVUksWUFBVixDQUFsQjtDQUNEOztDQUNELFNBQU9BLFlBQVA7Q0FDRDs7Q0NqQkQsSUFBSXhGLE9BQUssR0FBR3JELE9BQVo7Q0FHQTs7Q0FDQSxJQUFJOEksaUJBQWlCLEdBQUcsQ0FDdEIsS0FEc0IsRUFDZixlQURlLEVBQ0UsZ0JBREYsRUFDb0IsY0FEcEIsRUFDb0MsTUFEcEMsRUFFdEIsU0FGc0IsRUFFWCxNQUZXLEVBRUgsTUFGRyxFQUVLLG1CQUZMLEVBRTBCLHFCQUYxQixFQUd0QixlQUhzQixFQUdMLFVBSEssRUFHTyxjQUhQLEVBR3VCLHFCQUh2QixFQUl0QixTQUpzQixFQUlYLGFBSlcsRUFJSSxZQUpKLENBQXhCO0NBT0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0tBQ0FDLGNBQWMsR0FBRyxTQUFTQSxZQUFULENBQXNCM0QsT0FBdEIsRUFBK0I7Q0FDOUMsTUFBSTRELE1BQU0sR0FBRyxFQUFiO0NBQ0EsTUFBSXRHLEdBQUo7Q0FDQSxNQUFJckMsR0FBSjtDQUNBLE1BQUlQLENBQUo7O0NBRUEsTUFBSSxDQUFDc0YsT0FBTCxFQUFjO0NBQUUsV0FBTzRELE1BQVA7Q0FBZ0I7O0NBRWhDM0YsRUFBQUEsT0FBSyxDQUFDZCxPQUFOLENBQWM2QyxPQUFPLENBQUM2RCxLQUFSLENBQWMsSUFBZCxDQUFkLEVBQW1DLFNBQVNDLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCO0NBQ3ZEckosSUFBQUEsQ0FBQyxHQUFHcUosSUFBSSxDQUFDNUUsT0FBTCxDQUFhLEdBQWIsQ0FBSjtDQUNBN0IsSUFBQUEsR0FBRyxHQUFHVyxPQUFLLENBQUN0QixJQUFOLENBQVdvSCxJQUFJLENBQUNDLE1BQUwsQ0FBWSxDQUFaLEVBQWV0SixDQUFmLENBQVgsRUFBOEJ1SixXQUE5QixFQUFOO0NBQ0FoSixJQUFBQSxHQUFHLEdBQUdnRCxPQUFLLENBQUN0QixJQUFOLENBQVdvSCxJQUFJLENBQUNDLE1BQUwsQ0FBWXRKLENBQUMsR0FBRyxDQUFoQixDQUFYLENBQU47O0NBRUEsUUFBSTRDLEdBQUosRUFBUztDQUNQLFVBQUlzRyxNQUFNLENBQUN0RyxHQUFELENBQU4sSUFBZW9HLGlCQUFpQixDQUFDdkUsT0FBbEIsQ0FBMEI3QixHQUExQixLQUFrQyxDQUFyRCxFQUF3RDtDQUN0RDtDQUNEOztDQUNELFVBQUlBLEdBQUcsS0FBSyxZQUFaLEVBQTBCO0NBQ3hCc0csUUFBQUEsTUFBTSxDQUFDdEcsR0FBRCxDQUFOLEdBQWMsQ0FBQ3NHLE1BQU0sQ0FBQ3RHLEdBQUQsQ0FBTixHQUFjc0csTUFBTSxDQUFDdEcsR0FBRCxDQUFwQixHQUE0QixFQUE3QixFQUFpQzRHLE1BQWpDLENBQXdDLENBQUNqSixHQUFELENBQXhDLENBQWQ7Q0FDRCxPQUZELE1BRU87Q0FDTDJJLFFBQUFBLE1BQU0sQ0FBQ3RHLEdBQUQsQ0FBTixHQUFjc0csTUFBTSxDQUFDdEcsR0FBRCxDQUFOLEdBQWNzRyxNQUFNLENBQUN0RyxHQUFELENBQU4sR0FBYyxJQUFkLEdBQXFCckMsR0FBbkMsR0FBeUNBLEdBQXZEO0NBQ0Q7Q0FDRjtDQUNGLEdBZkQ7Q0FpQkEsU0FBTzJJLE1BQVA7Q0FDRDs7Q0NsREQsSUFBSTNGLE9BQUssR0FBR3JELE9BQVo7S0FFQXVKLGlCQUFjLEdBQ1psRyxPQUFLLENBQUNuQixvQkFBTjs7Q0FJRyxTQUFTb0Ysa0JBQVQsR0FBOEI7Q0FDN0IsTUFBSWtDLElBQUksR0FBRyxrQkFBa0JqQixJQUFsQixDQUF1QnBHLFNBQVMsQ0FBQ3NILFNBQWpDLENBQVg7Q0FDQSxNQUFJQyxjQUFjLEdBQUdwSCxRQUFRLENBQUNxSCxhQUFULENBQXVCLEdBQXZCLENBQXJCO0NBQ0EsTUFBSUMsU0FBSjs7Q0FHTjtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztDQUNNLFdBQVNDLFVBQVQsQ0FBb0JwRyxHQUFwQixFQUF5QjtDQUN2QixRQUFJcUcsSUFBSSxHQUFHckcsR0FBWDs7Q0FFQSxRQUFJK0YsSUFBSixFQUFVOztDQUVSRSxNQUFBQSxjQUFjLENBQUNLLFlBQWYsQ0FBNEIsTUFBNUIsRUFBb0NELElBQXBDO0NBQ0FBLE1BQUFBLElBQUksR0FBR0osY0FBYyxDQUFDSSxJQUF0QjtDQUNEOztDQUVESixJQUFBQSxjQUFjLENBQUNLLFlBQWYsQ0FBNEIsTUFBNUIsRUFBb0NELElBQXBDLEVBVHVCOztDQVl2QixXQUFPO0NBQ0xBLE1BQUFBLElBQUksRUFBRUosY0FBYyxDQUFDSSxJQURoQjtDQUVMRSxNQUFBQSxRQUFRLEVBQUVOLGNBQWMsQ0FBQ00sUUFBZixHQUEwQk4sY0FBYyxDQUFDTSxRQUFmLENBQXdCL0gsT0FBeEIsQ0FBZ0MsSUFBaEMsRUFBc0MsRUFBdEMsQ0FBMUIsR0FBc0UsRUFGM0U7Q0FHTGdJLE1BQUFBLElBQUksRUFBRVAsY0FBYyxDQUFDTyxJQUhoQjtDQUlMQyxNQUFBQSxNQUFNLEVBQUVSLGNBQWMsQ0FBQ1EsTUFBZixHQUF3QlIsY0FBYyxDQUFDUSxNQUFmLENBQXNCakksT0FBdEIsQ0FBOEIsS0FBOUIsRUFBcUMsRUFBckMsQ0FBeEIsR0FBbUUsRUFKdEU7Q0FLTGtJLE1BQUFBLElBQUksRUFBRVQsY0FBYyxDQUFDUyxJQUFmLEdBQXNCVCxjQUFjLENBQUNTLElBQWYsQ0FBb0JsSSxPQUFwQixDQUE0QixJQUE1QixFQUFrQyxFQUFsQyxDQUF0QixHQUE4RCxFQUwvRDtDQU1MbUksTUFBQUEsUUFBUSxFQUFFVixjQUFjLENBQUNVLFFBTnBCO0NBT0xDLE1BQUFBLElBQUksRUFBRVgsY0FBYyxDQUFDVyxJQVBoQjtDQVFMQyxNQUFBQSxRQUFRLEVBQUdaLGNBQWMsQ0FBQ1ksUUFBZixDQUF3QkMsTUFBeEIsQ0FBK0IsQ0FBL0IsTUFBc0MsR0FBdkMsR0FDUmIsY0FBYyxDQUFDWSxRQURQLEdBRVIsTUFBTVosY0FBYyxDQUFDWTtDQVZsQixLQUFQO0NBWUQ7O0NBRURWLEVBQUFBLFNBQVMsR0FBR0MsVUFBVSxDQUFDeEgsTUFBTSxDQUFDbUksUUFBUCxDQUFnQlYsSUFBakIsQ0FBdEI7O0NBR047Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Q0FDTSxTQUFPLFNBQVNQLGVBQVQsQ0FBeUJrQixVQUF6QixFQUFxQztDQUMxQyxRQUFJekIsTUFBTSxHQUFJM0YsT0FBSyxDQUFDbkMsUUFBTixDQUFldUosVUFBZixDQUFELEdBQStCWixVQUFVLENBQUNZLFVBQUQsQ0FBekMsR0FBd0RBLFVBQXJFO0NBQ0EsV0FBUXpCLE1BQU0sQ0FBQ2dCLFFBQVAsS0FBb0JKLFNBQVMsQ0FBQ0ksUUFBOUIsSUFDSmhCLE1BQU0sQ0FBQ2lCLElBQVAsS0FBZ0JMLFNBQVMsQ0FBQ0ssSUFEOUI7Q0FFRCxHQUpEO0NBS0QsQ0FsREQsRUFKRjtDQXlERyxTQUFTNUIscUJBQVQsR0FBaUM7Q0FDaEMsU0FBTyxTQUFTa0IsZUFBVCxHQUEyQjtDQUNoQyxXQUFPLElBQVA7Q0FDRCxHQUZEO0NBR0QsQ0FKRDs7Q0M1REosSUFBSWxHLE9BQUssR0FBR3JELE9BQVo7Q0FDQSxJQUFJZ0gsTUFBTSxHQUFHMkIsUUFBYjtDQUNBLElBQUl0QixPQUFPLEdBQUdxRCxTQUFkO0NBQ0EsSUFBSWxILFVBQVEsR0FBR21ILFVBQWY7Q0FDQSxJQUFJL0IsYUFBYSxHQUFHZ0MsZUFBcEI7Q0FDQSxJQUFJN0IsWUFBWSxHQUFHOEIsY0FBbkI7Q0FDQSxJQUFJdEIsZUFBZSxHQUFHdUIsaUJBQXRCO0NBQ0EsSUFBSWhFLFdBQVcsR0FBR2lFLGFBQWxCOztLQUVBQyxHQUFjLEdBQUcsU0FBU0MsVUFBVCxDQUFvQmhGLE1BQXBCLEVBQTRCO0NBQzNDLFNBQU8sSUFBSWlGLE9BQUosQ0FBWSxTQUFTQyxrQkFBVCxDQUE0QmxFLE9BQTVCLEVBQXFDQyxNQUFyQyxFQUE2QztDQUM5RCxRQUFJa0UsV0FBVyxHQUFHbkYsTUFBTSxDQUFDZCxJQUF6QjtDQUNBLFFBQUlrRyxjQUFjLEdBQUdwRixNQUFNLENBQUNiLE9BQTVCOztDQUVBLFFBQUkvQixPQUFLLENBQUMxQyxVQUFOLENBQWlCeUssV0FBakIsQ0FBSixFQUFtQztDQUNqQyxhQUFPQyxjQUFjLENBQUMsY0FBRCxDQUFyQixDQURpQztDQUVsQzs7Q0FFRCxRQUFJbEYsT0FBTyxHQUFHLElBQUltRixjQUFKLEVBQWQsQ0FSOEQ7O0NBVzlELFFBQUlyRixNQUFNLENBQUNzRixJQUFYLEVBQWlCO0NBQ2YsVUFBSUMsUUFBUSxHQUFHdkYsTUFBTSxDQUFDc0YsSUFBUCxDQUFZQyxRQUFaLElBQXdCLEVBQXZDO0NBQ0EsVUFBSUMsUUFBUSxHQUFHeEYsTUFBTSxDQUFDc0YsSUFBUCxDQUFZRSxRQUFaLEdBQXVCQyxRQUFRLENBQUNuSSxrQkFBa0IsQ0FBQzBDLE1BQU0sQ0FBQ3NGLElBQVAsQ0FBWUUsUUFBYixDQUFuQixDQUEvQixHQUE0RSxFQUEzRjtDQUNBSixNQUFBQSxjQUFjLENBQUNNLGFBQWYsR0FBK0IsV0FBV0MsSUFBSSxDQUFDSixRQUFRLEdBQUcsR0FBWCxHQUFpQkMsUUFBbEIsQ0FBOUM7Q0FDRDs7Q0FFRCxRQUFJSSxRQUFRLEdBQUdqRCxhQUFhLENBQUMzQyxNQUFNLENBQUN3QyxPQUFSLEVBQWlCeEMsTUFBTSxDQUFDeEMsR0FBeEIsQ0FBNUI7Q0FDQTBDLElBQUFBLE9BQU8sQ0FBQzJGLElBQVIsQ0FBYTdGLE1BQU0sQ0FBQzhGLE1BQVAsQ0FBY2pHLFdBQWQsRUFBYixFQUEwQ3RDLFVBQVEsQ0FBQ3FJLFFBQUQsRUFBVzVGLE1BQU0sQ0FBQ3ZDLE1BQWxCLEVBQTBCdUMsTUFBTSxDQUFDdEMsZ0JBQWpDLENBQWxELEVBQXNHLElBQXRHLEVBbEI4RDs7Q0FxQjlEd0MsSUFBQUEsT0FBTyxDQUFDNkYsT0FBUixHQUFrQi9GLE1BQU0sQ0FBQytGLE9BQXpCLENBckI4RDs7Q0F3QjlEN0YsSUFBQUEsT0FBTyxDQUFDOEYsa0JBQVIsR0FBNkIsU0FBU0MsVUFBVCxHQUFzQjtDQUNqRCxVQUFJLENBQUMvRixPQUFELElBQVlBLE9BQU8sQ0FBQ2dHLFVBQVIsS0FBdUIsQ0FBdkMsRUFBMEM7Q0FDeEM7Q0FDRCxPQUhnRDs7Ozs7O0NBU2pELFVBQUloRyxPQUFPLENBQUNpQixNQUFSLEtBQW1CLENBQW5CLElBQXdCLEVBQUVqQixPQUFPLENBQUNpRyxXQUFSLElBQXVCakcsT0FBTyxDQUFDaUcsV0FBUixDQUFvQjdILE9BQXBCLENBQTRCLE9BQTVCLE1BQXlDLENBQWxFLENBQTVCLEVBQWtHO0NBQ2hHO0NBQ0QsT0FYZ0Q7OztDQWNqRCxVQUFJOEgsZUFBZSxHQUFHLDJCQUEyQmxHLE9BQTNCLEdBQXFDNEMsWUFBWSxDQUFDNUMsT0FBTyxDQUFDbUcscUJBQVIsRUFBRCxDQUFqRCxHQUFxRixJQUEzRztDQUNBLFVBQUlDLFlBQVksR0FBRyxDQUFDdEcsTUFBTSxDQUFDdUcsWUFBUixJQUF3QnZHLE1BQU0sQ0FBQ3VHLFlBQVAsS0FBd0IsTUFBaEQsR0FBeURyRyxPQUFPLENBQUNzRyxZQUFqRSxHQUFnRnRHLE9BQU8sQ0FBQ0MsUUFBM0c7Q0FDQSxVQUFJQSxRQUFRLEdBQUc7Q0FDYmpCLFFBQUFBLElBQUksRUFBRW9ILFlBRE87Q0FFYm5GLFFBQUFBLE1BQU0sRUFBRWpCLE9BQU8sQ0FBQ2lCLE1BRkg7Q0FHYnNGLFFBQUFBLFVBQVUsRUFBRXZHLE9BQU8sQ0FBQ3VHLFVBSFA7Q0FJYnRILFFBQUFBLE9BQU8sRUFBRWlILGVBSkk7Q0FLYnBHLFFBQUFBLE1BQU0sRUFBRUEsTUFMSztDQU1iRSxRQUFBQSxPQUFPLEVBQUVBO0NBTkksT0FBZjtDQVNBYSxNQUFBQSxNQUFNLENBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFrQmQsUUFBbEIsQ0FBTixDQXpCaUQ7O0NBNEJqREQsTUFBQUEsT0FBTyxHQUFHLElBQVY7Q0FDRCxLQTdCRCxDQXhCOEQ7OztDQXdEOURBLElBQUFBLE9BQU8sQ0FBQ3dHLE9BQVIsR0FBa0IsU0FBU0MsV0FBVCxHQUF1QjtDQUN2QyxVQUFJLENBQUN6RyxPQUFMLEVBQWM7Q0FDWjtDQUNEOztDQUVEZSxNQUFBQSxNQUFNLENBQUNKLFdBQVcsQ0FBQyxpQkFBRCxFQUFvQmIsTUFBcEIsRUFBNEIsY0FBNUIsRUFBNENFLE9BQTVDLENBQVosQ0FBTixDQUx1Qzs7Q0FRdkNBLE1BQUFBLE9BQU8sR0FBRyxJQUFWO0NBQ0QsS0FURCxDQXhEOEQ7OztDQW9FOURBLElBQUFBLE9BQU8sQ0FBQzBHLE9BQVIsR0FBa0IsU0FBU0MsV0FBVCxHQUF1Qjs7O0NBR3ZDNUYsTUFBQUEsTUFBTSxDQUFDSixXQUFXLENBQUMsZUFBRCxFQUFrQmIsTUFBbEIsRUFBMEIsSUFBMUIsRUFBZ0NFLE9BQWhDLENBQVosQ0FBTixDQUh1Qzs7Q0FNdkNBLE1BQUFBLE9BQU8sR0FBRyxJQUFWO0NBQ0QsS0FQRCxDQXBFOEQ7OztDQThFOURBLElBQUFBLE9BQU8sQ0FBQzRHLFNBQVIsR0FBb0IsU0FBU0MsYUFBVCxHQUF5QjtDQUMzQyxVQUFJQyxtQkFBbUIsR0FBRyxnQkFBZ0JoSCxNQUFNLENBQUMrRixPQUF2QixHQUFpQyxhQUEzRDs7Q0FDQSxVQUFJL0YsTUFBTSxDQUFDZ0gsbUJBQVgsRUFBZ0M7Q0FDOUJBLFFBQUFBLG1CQUFtQixHQUFHaEgsTUFBTSxDQUFDZ0gsbUJBQTdCO0NBQ0Q7O0NBQ0QvRixNQUFBQSxNQUFNLENBQUNKLFdBQVcsQ0FBQ21HLG1CQUFELEVBQXNCaEgsTUFBdEIsRUFBOEIsY0FBOUIsRUFDaEJFLE9BRGdCLENBQVosQ0FBTixDQUwyQzs7Q0FTM0NBLE1BQUFBLE9BQU8sR0FBRyxJQUFWO0NBQ0QsS0FWRCxDQTlFOEQ7Ozs7O0NBNkY5RCxRQUFJOUMsT0FBSyxDQUFDbkIsb0JBQU4sRUFBSixFQUFrQzs7Q0FFaEMsVUFBSWdMLFNBQVMsR0FBRyxDQUFDakgsTUFBTSxDQUFDa0gsZUFBUCxJQUEwQjVELGVBQWUsQ0FBQ3NDLFFBQUQsQ0FBMUMsS0FBeUQ1RixNQUFNLENBQUNtSCxjQUFoRSxHQUNkL0YsT0FBTyxDQUFDVSxJQUFSLENBQWE5QixNQUFNLENBQUNtSCxjQUFwQixDQURjLEdBRWRDLFNBRkY7O0NBSUEsVUFBSUgsU0FBSixFQUFlO0NBQ2I3QixRQUFBQSxjQUFjLENBQUNwRixNQUFNLENBQUNxSCxjQUFSLENBQWQsR0FBd0NKLFNBQXhDO0NBQ0Q7Q0FDRixLQXRHNkQ7OztDQXlHOUQsUUFBSSxzQkFBc0IvRyxPQUExQixFQUFtQztDQUNqQzlDLE1BQUFBLE9BQUssQ0FBQ2QsT0FBTixDQUFjOEksY0FBZCxFQUE4QixTQUFTa0MsZ0JBQVQsQ0FBMEJsTixHQUExQixFQUErQnFDLEdBQS9CLEVBQW9DO0NBQ2hFLFlBQUksT0FBTzBJLFdBQVAsS0FBdUIsV0FBdkIsSUFBc0MxSSxHQUFHLENBQUMyRyxXQUFKLE9BQXNCLGNBQWhFLEVBQWdGOztDQUU5RSxpQkFBT2dDLGNBQWMsQ0FBQzNJLEdBQUQsQ0FBckI7Q0FDRCxTQUhELE1BR087O0NBRUx5RCxVQUFBQSxPQUFPLENBQUNvSCxnQkFBUixDQUF5QjdLLEdBQXpCLEVBQThCckMsR0FBOUI7Q0FDRDtDQUNGLE9BUkQ7Q0FTRCxLQW5INkQ7OztDQXNIOUQsUUFBSSxDQUFDZ0QsT0FBSyxDQUFDOUMsV0FBTixDQUFrQjBGLE1BQU0sQ0FBQ2tILGVBQXpCLENBQUwsRUFBZ0Q7Q0FDOUNoSCxNQUFBQSxPQUFPLENBQUNnSCxlQUFSLEdBQTBCLENBQUMsQ0FBQ2xILE1BQU0sQ0FBQ2tILGVBQW5DO0NBQ0QsS0F4SDZEOzs7Q0EySDlELFFBQUlsSCxNQUFNLENBQUN1RyxZQUFYLEVBQXlCO0NBQ3ZCLFVBQUk7Q0FDRnJHLFFBQUFBLE9BQU8sQ0FBQ3FHLFlBQVIsR0FBdUJ2RyxNQUFNLENBQUN1RyxZQUE5QjtDQUNELE9BRkQsQ0FFRSxPQUFPZ0IsQ0FBUCxFQUFVOzs7Q0FHVixZQUFJdkgsTUFBTSxDQUFDdUcsWUFBUCxLQUF3QixNQUE1QixFQUFvQztDQUNsQyxnQkFBTWdCLENBQU47Q0FDRDtDQUNGO0NBQ0YsS0FySTZEOzs7Q0F3STlELFFBQUksT0FBT3ZILE1BQU0sQ0FBQ3dILGtCQUFkLEtBQXFDLFVBQXpDLEVBQXFEO0NBQ25EdEgsTUFBQUEsT0FBTyxDQUFDdUgsZ0JBQVIsQ0FBeUIsVUFBekIsRUFBcUN6SCxNQUFNLENBQUN3SCxrQkFBNUM7Q0FDRCxLQTFJNkQ7OztDQTZJOUQsUUFBSSxPQUFPeEgsTUFBTSxDQUFDMEgsZ0JBQWQsS0FBbUMsVUFBbkMsSUFBaUR4SCxPQUFPLENBQUN5SCxNQUE3RCxFQUFxRTtDQUNuRXpILE1BQUFBLE9BQU8sQ0FBQ3lILE1BQVIsQ0FBZUYsZ0JBQWYsQ0FBZ0MsVUFBaEMsRUFBNEN6SCxNQUFNLENBQUMwSCxnQkFBbkQ7Q0FDRDs7Q0FFRCxRQUFJMUgsTUFBTSxDQUFDNEgsV0FBWCxFQUF3Qjs7Q0FFdEI1SCxNQUFBQSxNQUFNLENBQUM0SCxXQUFQLENBQW1CQyxPQUFuQixDQUEyQkMsSUFBM0IsQ0FBZ0MsU0FBU0MsVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEI7Q0FDMUQsWUFBSSxDQUFDOUgsT0FBTCxFQUFjO0NBQ1o7Q0FDRDs7Q0FFREEsUUFBQUEsT0FBTyxDQUFDK0gsS0FBUjtDQUNBaEgsUUFBQUEsTUFBTSxDQUFDK0csTUFBRCxDQUFOLENBTjBEOztDQVExRDlILFFBQUFBLE9BQU8sR0FBRyxJQUFWO0NBQ0QsT0FURDtDQVVEOztDQUVELFFBQUksQ0FBQ2lGLFdBQUwsRUFBa0I7Q0FDaEJBLE1BQUFBLFdBQVcsR0FBRyxJQUFkO0NBQ0QsS0FqSzZEOzs7Q0FvSzlEakYsSUFBQUEsT0FBTyxDQUFDZ0ksSUFBUixDQUFhL0MsV0FBYjtDQUNELEdBcktNLENBQVA7Q0FzS0Q7O0NDaExELElBQUkvSCxPQUFLLEdBQUdyRCxPQUFaO0NBQ0EsSUFBSTBGLG1CQUFtQixHQUFHaUQscUJBQTFCO0NBRUEsSUFBSXlGLG9CQUFvQixHQUFHO0NBQ3pCLGtCQUFnQjtDQURTLENBQTNCOztDQUlBLFNBQVNDLHFCQUFULENBQStCakosT0FBL0IsRUFBd0NJLEtBQXhDLEVBQStDO0NBQzdDLE1BQUksQ0FBQ25DLE9BQUssQ0FBQzlDLFdBQU4sQ0FBa0I2RSxPQUFsQixDQUFELElBQStCL0IsT0FBSyxDQUFDOUMsV0FBTixDQUFrQjZFLE9BQU8sQ0FBQyxjQUFELENBQXpCLENBQW5DLEVBQStFO0NBQzdFQSxJQUFBQSxPQUFPLENBQUMsY0FBRCxDQUFQLEdBQTBCSSxLQUExQjtDQUNEO0NBQ0Y7O0NBRUQsU0FBUzhJLGlCQUFULEdBQTZCO0NBQzNCLE1BQUlDLE9BQUo7O0NBQ0EsTUFBSSxPQUFPakQsY0FBUCxLQUEwQixXQUE5QixFQUEyQzs7Q0FFekNpRCxJQUFBQSxPQUFPLEdBQUc3RCxHQUFWO0NBQ0QsR0FIRCxNQUdPLElBQUksT0FBTzhELE9BQVAsS0FBbUIsV0FBbkIsSUFBa0N0TyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJGLFFBQWpCLENBQTBCSyxJQUExQixDQUErQmtPLE9BQS9CLE1BQTRDLGtCQUFsRixFQUFzRzs7Q0FFM0dELElBQUFBLE9BQU8sR0FBRzVELEdBQVY7Q0FDRDs7Q0FDRCxTQUFPNEQsT0FBUDtDQUNEOztDQUVELElBQUlFLFVBQVEsR0FBRztDQUNiRixFQUFBQSxPQUFPLEVBQUVELGlCQUFpQixFQURiO0NBR2JJLEVBQUFBLGdCQUFnQixFQUFFLENBQUMsU0FBU0EsZ0JBQVQsQ0FBMEJ2SixJQUExQixFQUFnQ0MsT0FBaEMsRUFBeUM7Q0FDMURNLElBQUFBLG1CQUFtQixDQUFDTixPQUFELEVBQVUsUUFBVixDQUFuQjtDQUNBTSxJQUFBQSxtQkFBbUIsQ0FBQ04sT0FBRCxFQUFVLGNBQVYsQ0FBbkI7O0NBQ0EsUUFBSS9CLE9BQUssQ0FBQzFDLFVBQU4sQ0FBaUJ3RSxJQUFqQixLQUNGOUIsT0FBSyxDQUFDM0MsYUFBTixDQUFvQnlFLElBQXBCLENBREUsSUFFRjlCLE9BQUssQ0FBQzdDLFFBQU4sQ0FBZTJFLElBQWYsQ0FGRSxJQUdGOUIsT0FBSyxDQUFDMUIsUUFBTixDQUFld0QsSUFBZixDQUhFLElBSUY5QixPQUFLLENBQUM3QixNQUFOLENBQWEyRCxJQUFiLENBSkUsSUFLRjlCLE9BQUssQ0FBQzVCLE1BQU4sQ0FBYTBELElBQWIsQ0FMRixFQU1FO0NBQ0EsYUFBT0EsSUFBUDtDQUNEOztDQUNELFFBQUk5QixPQUFLLENBQUN4QyxpQkFBTixDQUF3QnNFLElBQXhCLENBQUosRUFBbUM7Q0FDakMsYUFBT0EsSUFBSSxDQUFDbEUsTUFBWjtDQUNEOztDQUNELFFBQUlvQyxPQUFLLENBQUN4QixpQkFBTixDQUF3QnNELElBQXhCLENBQUosRUFBbUM7Q0FDakNrSixNQUFBQSxxQkFBcUIsQ0FBQ2pKLE9BQUQsRUFBVSxpREFBVixDQUFyQjtDQUNBLGFBQU9ELElBQUksQ0FBQ2xGLFFBQUwsRUFBUDtDQUNEOztDQUNELFFBQUlvRCxPQUFLLENBQUNqQyxRQUFOLENBQWUrRCxJQUFmLENBQUosRUFBMEI7Q0FDeEJrSixNQUFBQSxxQkFBcUIsQ0FBQ2pKLE9BQUQsRUFBVSxnQ0FBVixDQUFyQjtDQUNBLGFBQU9sQixJQUFJLENBQUNDLFNBQUwsQ0FBZWdCLElBQWYsQ0FBUDtDQUNEOztDQUNELFdBQU9BLElBQVA7Q0FDRCxHQXhCaUIsQ0FITDtDQTZCYndKLEVBQUFBLGlCQUFpQixFQUFFLENBQUMsU0FBU0EsaUJBQVQsQ0FBMkJ4SixJQUEzQixFQUFpQzs7Q0FFbkQsUUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0NBQzVCLFVBQUk7Q0FDRkEsUUFBQUEsSUFBSSxHQUFHakIsSUFBSSxDQUFDMEssS0FBTCxDQUFXekosSUFBWCxDQUFQO0NBQ0QsT0FGRCxDQUVFLE9BQU9xSSxDQUFQLEVBQVU7O0NBQWdCO0NBQzdCOztDQUNELFdBQU9ySSxJQUFQO0NBQ0QsR0FSa0IsQ0E3Qk47OztDQXdDZjtDQUNBO0NBQ0E7Q0FDRTZHLEVBQUFBLE9BQU8sRUFBRSxDQTNDSTtDQTZDYm9CLEVBQUFBLGNBQWMsRUFBRSxZQTdDSDtDQThDYkUsRUFBQUEsY0FBYyxFQUFFLGNBOUNIO0NBZ0RidUIsRUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQyxDQWhETjtDQWlEYkMsRUFBQUEsYUFBYSxFQUFFLENBQUMsQ0FqREg7Q0FtRGIzSCxFQUFBQSxjQUFjLEVBQUUsU0FBU0EsY0FBVCxDQUF3QkMsTUFBeEIsRUFBZ0M7Q0FDOUMsV0FBT0EsTUFBTSxJQUFJLEdBQVYsSUFBaUJBLE1BQU0sR0FBRyxHQUFqQztDQUNEO0NBckRZLENBQWY7QUF3REFxSCxXQUFRLENBQUNySixPQUFULEdBQW1CO0NBQ2pCMkosRUFBQUEsTUFBTSxFQUFFO0NBQ04sY0FBVTtDQURKO0NBRFMsQ0FBbkI7QUFNQTFMLFFBQUssQ0FBQ2QsT0FBTixDQUFjLENBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsTUFBbEIsQ0FBZCxFQUF5QyxTQUFTeU0sbUJBQVQsQ0FBNkJqRCxNQUE3QixFQUFxQztDQUM1RTBDLEVBQUFBLFVBQVEsQ0FBQ3JKLE9BQVQsQ0FBaUIyRyxNQUFqQixJQUEyQixFQUEzQjtDQUNELENBRkQ7QUFJQTFJLFFBQUssQ0FBQ2QsT0FBTixDQUFjLENBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsT0FBaEIsQ0FBZCxFQUF3QyxTQUFTME0scUJBQVQsQ0FBK0JsRCxNQUEvQixFQUF1QztDQUM3RTBDLEVBQUFBLFVBQVEsQ0FBQ3JKLE9BQVQsQ0FBaUIyRyxNQUFqQixJQUEyQjFJLE9BQUssQ0FBQ1QsS0FBTixDQUFZd0wsb0JBQVosQ0FBM0I7Q0FDRCxDQUZEO0tBSUFjLFVBQWMsR0FBR1Q7O0NDL0ZqQixJQUFJcEwsT0FBSyxHQUFHckQsT0FBWjtDQUNBLElBQUlrRixhQUFhLEdBQUd5RCxlQUFwQjtDQUNBLElBQUlwRCxRQUFRLEdBQUdtRixVQUFmO0NBQ0EsSUFBSStELFVBQVEsR0FBRzlELFVBQWY7Q0FFQTtDQUNBO0NBQ0E7O0NBQ0EsU0FBU3dFLDRCQUFULENBQXNDbEosTUFBdEMsRUFBOEM7Q0FDNUMsTUFBSUEsTUFBTSxDQUFDNEgsV0FBWCxFQUF3QjtDQUN0QjVILElBQUFBLE1BQU0sQ0FBQzRILFdBQVAsQ0FBbUJ1QixnQkFBbkI7Q0FDRDtDQUNGO0NBRUQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOzs7S0FDQUMsaUJBQWMsR0FBRyxTQUFTQSxlQUFULENBQXlCcEosTUFBekIsRUFBaUM7Q0FDaERrSixFQUFBQSw0QkFBNEIsQ0FBQ2xKLE1BQUQsQ0FBNUIsQ0FEZ0Q7O0NBSWhEQSxFQUFBQSxNQUFNLENBQUNiLE9BQVAsR0FBaUJhLE1BQU0sQ0FBQ2IsT0FBUCxJQUFrQixFQUFuQyxDQUpnRDs7Q0FPaERhLEVBQUFBLE1BQU0sQ0FBQ2QsSUFBUCxHQUFjRCxhQUFhLENBQ3pCZSxNQUFNLENBQUNkLElBRGtCLEVBRXpCYyxNQUFNLENBQUNiLE9BRmtCLEVBR3pCYSxNQUFNLENBQUN5SSxnQkFIa0IsQ0FBM0IsQ0FQZ0Q7O0NBY2hEekksRUFBQUEsTUFBTSxDQUFDYixPQUFQLEdBQWlCL0IsT0FBSyxDQUFDVCxLQUFOLENBQ2ZxRCxNQUFNLENBQUNiLE9BQVAsQ0FBZTJKLE1BQWYsSUFBeUIsRUFEVixFQUVmOUksTUFBTSxDQUFDYixPQUFQLENBQWVhLE1BQU0sQ0FBQzhGLE1BQXRCLEtBQWlDLEVBRmxCLEVBR2Y5RixNQUFNLENBQUNiLE9BSFEsQ0FBakI7Q0FNQS9CLEVBQUFBLE9BQUssQ0FBQ2QsT0FBTixDQUNFLENBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsTUFBbEIsRUFBMEIsTUFBMUIsRUFBa0MsS0FBbEMsRUFBeUMsT0FBekMsRUFBa0QsUUFBbEQsQ0FERixFQUVFLFNBQVMrTSxpQkFBVCxDQUEyQnZELE1BQTNCLEVBQW1DO0NBQ2pDLFdBQU85RixNQUFNLENBQUNiLE9BQVAsQ0FBZTJHLE1BQWYsQ0FBUDtDQUNELEdBSkg7Q0FPQSxNQUFJd0MsT0FBTyxHQUFHdEksTUFBTSxDQUFDc0ksT0FBUCxJQUFrQkUsVUFBUSxDQUFDRixPQUF6QztDQUVBLFNBQU9BLE9BQU8sQ0FBQ3RJLE1BQUQsQ0FBUCxDQUFnQjhILElBQWhCLENBQXFCLFNBQVN3QixtQkFBVCxDQUE2Qm5KLFFBQTdCLEVBQXVDO0NBQ2pFK0ksSUFBQUEsNEJBQTRCLENBQUNsSixNQUFELENBQTVCLENBRGlFOztDQUlqRUcsSUFBQUEsUUFBUSxDQUFDakIsSUFBVCxHQUFnQkQsYUFBYSxDQUMzQmtCLFFBQVEsQ0FBQ2pCLElBRGtCLEVBRTNCaUIsUUFBUSxDQUFDaEIsT0FGa0IsRUFHM0JhLE1BQU0sQ0FBQzBJLGlCQUhvQixDQUE3QjtDQU1BLFdBQU92SSxRQUFQO0NBQ0QsR0FYTSxFQVdKLFNBQVNvSixrQkFBVCxDQUE0QkMsTUFBNUIsRUFBb0M7Q0FDckMsUUFBSSxDQUFDbEssUUFBUSxDQUFDa0ssTUFBRCxDQUFiLEVBQXVCO0NBQ3JCTixNQUFBQSw0QkFBNEIsQ0FBQ2xKLE1BQUQsQ0FBNUIsQ0FEcUI7O0NBSXJCLFVBQUl3SixNQUFNLElBQUlBLE1BQU0sQ0FBQ3JKLFFBQXJCLEVBQStCO0NBQzdCcUosUUFBQUEsTUFBTSxDQUFDckosUUFBUCxDQUFnQmpCLElBQWhCLEdBQXVCRCxhQUFhLENBQ2xDdUssTUFBTSxDQUFDckosUUFBUCxDQUFnQmpCLElBRGtCLEVBRWxDc0ssTUFBTSxDQUFDckosUUFBUCxDQUFnQmhCLE9BRmtCLEVBR2xDYSxNQUFNLENBQUMwSSxpQkFIMkIsQ0FBcEM7Q0FLRDtDQUNGOztDQUVELFdBQU96RCxPQUFPLENBQUNoRSxNQUFSLENBQWV1SSxNQUFmLENBQVA7Q0FDRCxHQTFCTSxDQUFQO0NBMkJEOztDQzVFRCxJQUFJcE0sT0FBSyxHQUFHckQsT0FBWjtDQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0tBQ0EwUCxhQUFjLEdBQUcsU0FBU0EsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEJDLE9BQTlCLEVBQXVDOztDQUV0REEsRUFBQUEsT0FBTyxHQUFHQSxPQUFPLElBQUksRUFBckI7Q0FDQSxNQUFJM0osTUFBTSxHQUFHLEVBQWI7Q0FFQSxNQUFJNEosb0JBQW9CLEdBQUcsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixNQUFsQixDQUEzQjtDQUNBLE1BQUlDLHVCQUF1QixHQUFHLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsT0FBcEIsRUFBNkIsUUFBN0IsQ0FBOUI7Q0FDQSxNQUFJQyxvQkFBb0IsR0FBRyxDQUN6QixTQUR5QixFQUNkLGtCQURjLEVBQ00sbUJBRE4sRUFDMkIsa0JBRDNCLEVBRXpCLFNBRnlCLEVBRWQsZ0JBRmMsRUFFSSxpQkFGSixFQUV1QixTQUZ2QixFQUVrQyxjQUZsQyxFQUVrRCxnQkFGbEQsRUFHekIsZ0JBSHlCLEVBR1Asa0JBSE8sRUFHYSxvQkFIYixFQUdtQyxZQUhuQyxFQUl6QixrQkFKeUIsRUFJTCxlQUpLLEVBSVksY0FKWixFQUk0QixXQUo1QixFQUl5QyxXQUp6QyxFQUt6QixZQUx5QixFQUtYLGFBTFcsRUFLSSxZQUxKLEVBS2tCLGtCQUxsQixDQUEzQjtDQU9BLE1BQUlDLGVBQWUsR0FBRyxDQUFDLGdCQUFELENBQXRCOztDQUVBLFdBQVNDLGNBQVQsQ0FBd0JDLE1BQXhCLEVBQWdDQyxNQUFoQyxFQUF3QztDQUN0QyxRQUFJOU0sT0FBSyxDQUFDaEMsYUFBTixDQUFvQjZPLE1BQXBCLEtBQStCN00sT0FBSyxDQUFDaEMsYUFBTixDQUFvQjhPLE1BQXBCLENBQW5DLEVBQWdFO0NBQzlELGFBQU85TSxPQUFLLENBQUNULEtBQU4sQ0FBWXNOLE1BQVosRUFBb0JDLE1BQXBCLENBQVA7Q0FDRCxLQUZELE1BRU8sSUFBSTlNLE9BQUssQ0FBQ2hDLGFBQU4sQ0FBb0I4TyxNQUFwQixDQUFKLEVBQWlDO0NBQ3RDLGFBQU85TSxPQUFLLENBQUNULEtBQU4sQ0FBWSxFQUFaLEVBQWdCdU4sTUFBaEIsQ0FBUDtDQUNELEtBRk0sTUFFQSxJQUFJOU0sT0FBSyxDQUFDakQsT0FBTixDQUFjK1AsTUFBZCxDQUFKLEVBQTJCO0NBQ2hDLGFBQU9BLE1BQU0sQ0FBQ3JOLEtBQVAsRUFBUDtDQUNEOztDQUNELFdBQU9xTixNQUFQO0NBQ0Q7O0NBRUQsV0FBU0MsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DO0NBQ2pDLFFBQUksQ0FBQ2hOLE9BQUssQ0FBQzlDLFdBQU4sQ0FBa0JxUCxPQUFPLENBQUNTLElBQUQsQ0FBekIsQ0FBTCxFQUF1QztDQUNyQ3BLLE1BQUFBLE1BQU0sQ0FBQ29LLElBQUQsQ0FBTixHQUFlSixjQUFjLENBQUNOLE9BQU8sQ0FBQ1UsSUFBRCxDQUFSLEVBQWdCVCxPQUFPLENBQUNTLElBQUQsQ0FBdkIsQ0FBN0I7Q0FDRCxLQUZELE1BRU8sSUFBSSxDQUFDaE4sT0FBSyxDQUFDOUMsV0FBTixDQUFrQm9QLE9BQU8sQ0FBQ1UsSUFBRCxDQUF6QixDQUFMLEVBQXVDO0NBQzVDcEssTUFBQUEsTUFBTSxDQUFDb0ssSUFBRCxDQUFOLEdBQWVKLGNBQWMsQ0FBQzVDLFNBQUQsRUFBWXNDLE9BQU8sQ0FBQ1UsSUFBRCxDQUFuQixDQUE3QjtDQUNEO0NBQ0Y7O0NBRURoTixFQUFBQSxPQUFLLENBQUNkLE9BQU4sQ0FBY3NOLG9CQUFkLEVBQW9DLFNBQVNTLGdCQUFULENBQTBCRCxJQUExQixFQUFnQztDQUNsRSxRQUFJLENBQUNoTixPQUFLLENBQUM5QyxXQUFOLENBQWtCcVAsT0FBTyxDQUFDUyxJQUFELENBQXpCLENBQUwsRUFBdUM7Q0FDckNwSyxNQUFBQSxNQUFNLENBQUNvSyxJQUFELENBQU4sR0FBZUosY0FBYyxDQUFDNUMsU0FBRCxFQUFZdUMsT0FBTyxDQUFDUyxJQUFELENBQW5CLENBQTdCO0NBQ0Q7Q0FDRixHQUpEO0NBTUFoTixFQUFBQSxPQUFLLENBQUNkLE9BQU4sQ0FBY3VOLHVCQUFkLEVBQXVDTSxtQkFBdkM7Q0FFQS9NLEVBQUFBLE9BQUssQ0FBQ2QsT0FBTixDQUFjd04sb0JBQWQsRUFBb0MsU0FBU1EsZ0JBQVQsQ0FBMEJGLElBQTFCLEVBQWdDO0NBQ2xFLFFBQUksQ0FBQ2hOLE9BQUssQ0FBQzlDLFdBQU4sQ0FBa0JxUCxPQUFPLENBQUNTLElBQUQsQ0FBekIsQ0FBTCxFQUF1QztDQUNyQ3BLLE1BQUFBLE1BQU0sQ0FBQ29LLElBQUQsQ0FBTixHQUFlSixjQUFjLENBQUM1QyxTQUFELEVBQVl1QyxPQUFPLENBQUNTLElBQUQsQ0FBbkIsQ0FBN0I7Q0FDRCxLQUZELE1BRU8sSUFBSSxDQUFDaE4sT0FBSyxDQUFDOUMsV0FBTixDQUFrQm9QLE9BQU8sQ0FBQ1UsSUFBRCxDQUF6QixDQUFMLEVBQXVDO0NBQzVDcEssTUFBQUEsTUFBTSxDQUFDb0ssSUFBRCxDQUFOLEdBQWVKLGNBQWMsQ0FBQzVDLFNBQUQsRUFBWXNDLE9BQU8sQ0FBQ1UsSUFBRCxDQUFuQixDQUE3QjtDQUNEO0NBQ0YsR0FORDtDQVFBaE4sRUFBQUEsT0FBSyxDQUFDZCxPQUFOLENBQWN5TixlQUFkLEVBQStCLFNBQVNwTixLQUFULENBQWV5TixJQUFmLEVBQXFCO0NBQ2xELFFBQUlBLElBQUksSUFBSVQsT0FBWixFQUFxQjtDQUNuQjNKLE1BQUFBLE1BQU0sQ0FBQ29LLElBQUQsQ0FBTixHQUFlSixjQUFjLENBQUNOLE9BQU8sQ0FBQ1UsSUFBRCxDQUFSLEVBQWdCVCxPQUFPLENBQUNTLElBQUQsQ0FBdkIsQ0FBN0I7Q0FDRCxLQUZELE1BRU8sSUFBSUEsSUFBSSxJQUFJVixPQUFaLEVBQXFCO0NBQzFCMUosTUFBQUEsTUFBTSxDQUFDb0ssSUFBRCxDQUFOLEdBQWVKLGNBQWMsQ0FBQzVDLFNBQUQsRUFBWXNDLE9BQU8sQ0FBQ1UsSUFBRCxDQUFuQixDQUE3QjtDQUNEO0NBQ0YsR0FORDtDQVFBLE1BQUlHLFNBQVMsR0FBR1gsb0JBQW9CLENBQ2pDdkcsTUFEYSxDQUNOd0csdUJBRE0sRUFFYnhHLE1BRmEsQ0FFTnlHLG9CQUZNLEVBR2J6RyxNQUhhLENBR04wRyxlQUhNLENBQWhCO0NBS0EsTUFBSVMsU0FBUyxHQUFHdlEsTUFBTSxDQUNuQndRLElBRGEsQ0FDUmYsT0FEUSxFQUVickcsTUFGYSxDQUVOcEosTUFBTSxDQUFDd1EsSUFBUCxDQUFZZCxPQUFaLENBRk0sRUFHYmUsTUFIYSxDQUdOLFNBQVNDLGVBQVQsQ0FBeUJsTyxHQUF6QixFQUE4QjtDQUNwQyxXQUFPOE4sU0FBUyxDQUFDak0sT0FBVixDQUFrQjdCLEdBQWxCLE1BQTJCLENBQUMsQ0FBbkM7Q0FDRCxHQUxhLENBQWhCO0NBT0FXLEVBQUFBLE9BQUssQ0FBQ2QsT0FBTixDQUFja08sU0FBZCxFQUF5QkwsbUJBQXpCO0NBRUEsU0FBT25LLE1BQVA7Q0FDRDs7Q0NwRkQsSUFBSTVDLE9BQUssR0FBR3JELE9BQVo7Q0FDQSxJQUFJd0QsUUFBUSxHQUFHbUYsVUFBZjtDQUNBLElBQUluRSxrQkFBa0IsR0FBR2tHLG9CQUF6QjtDQUNBLElBQUkyRSxlQUFlLEdBQUcxRSxpQkFBdEI7Q0FDQSxJQUFJK0UsYUFBVyxHQUFHOUUsYUFBbEI7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztDQUNBLFNBQVNpRyxPQUFULENBQWVDLGNBQWYsRUFBK0I7Q0FDN0IsT0FBS3JDLFFBQUwsR0FBZ0JxQyxjQUFoQjtDQUNBLE9BQUtDLFlBQUwsR0FBb0I7Q0FDbEI1SyxJQUFBQSxPQUFPLEVBQUUsSUFBSTNCLGtCQUFKLEVBRFM7Q0FFbEI0QixJQUFBQSxRQUFRLEVBQUUsSUFBSTVCLGtCQUFKO0NBRlEsR0FBcEI7Q0FJRDtDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztBQUNBcU0sUUFBSyxDQUFDMVEsU0FBTixDQUFnQmdHLE9BQWhCLEdBQTBCLFNBQVNBLE9BQVQsQ0FBaUJGLE1BQWpCLEVBQXlCOzs7Q0FHakQsTUFBSSxPQUFPQSxNQUFQLEtBQWtCLFFBQXRCLEVBQWdDO0NBQzlCQSxJQUFBQSxNQUFNLEdBQUdyRyxTQUFTLENBQUMsQ0FBRCxDQUFULElBQWdCLEVBQXpCO0NBQ0FxRyxJQUFBQSxNQUFNLENBQUN4QyxHQUFQLEdBQWE3RCxTQUFTLENBQUMsQ0FBRCxDQUF0QjtDQUNELEdBSEQsTUFHTztDQUNMcUcsSUFBQUEsTUFBTSxHQUFHQSxNQUFNLElBQUksRUFBbkI7Q0FDRDs7Q0FFREEsRUFBQUEsTUFBTSxHQUFHeUosYUFBVyxDQUFDLEtBQUtqQixRQUFOLEVBQWdCeEksTUFBaEIsQ0FBcEIsQ0FWaUQ7O0NBYWpELE1BQUlBLE1BQU0sQ0FBQzhGLE1BQVgsRUFBbUI7Q0FDakI5RixJQUFBQSxNQUFNLENBQUM4RixNQUFQLEdBQWdCOUYsTUFBTSxDQUFDOEYsTUFBUCxDQUFjMUMsV0FBZCxFQUFoQjtDQUNELEdBRkQsTUFFTyxJQUFJLEtBQUtvRixRQUFMLENBQWMxQyxNQUFsQixFQUEwQjtDQUMvQjlGLElBQUFBLE1BQU0sQ0FBQzhGLE1BQVAsR0FBZ0IsS0FBSzBDLFFBQUwsQ0FBYzFDLE1BQWQsQ0FBcUIxQyxXQUFyQixFQUFoQjtDQUNELEdBRk0sTUFFQTtDQUNMcEQsSUFBQUEsTUFBTSxDQUFDOEYsTUFBUCxHQUFnQixLQUFoQjtDQUNELEdBbkJnRDs7O0NBc0JqRCxNQUFJaUYsS0FBSyxHQUFHLENBQUMzQixlQUFELEVBQWtCaEMsU0FBbEIsQ0FBWjtDQUNBLE1BQUlTLE9BQU8sR0FBRzVDLE9BQU8sQ0FBQ2pFLE9BQVIsQ0FBZ0JoQixNQUFoQixDQUFkO0NBRUEsT0FBSzhLLFlBQUwsQ0FBa0I1SyxPQUFsQixDQUEwQjVELE9BQTFCLENBQWtDLFNBQVMwTywwQkFBVCxDQUFvQ0MsV0FBcEMsRUFBaUQ7Q0FDakZGLElBQUFBLEtBQUssQ0FBQ0csT0FBTixDQUFjRCxXQUFXLENBQUN2TSxTQUExQixFQUFxQ3VNLFdBQVcsQ0FBQ3RNLFFBQWpEO0NBQ0QsR0FGRDtDQUlBLE9BQUttTSxZQUFMLENBQWtCM0ssUUFBbEIsQ0FBMkI3RCxPQUEzQixDQUFtQyxTQUFTNk8sd0JBQVQsQ0FBa0NGLFdBQWxDLEVBQStDO0NBQ2hGRixJQUFBQSxLQUFLLENBQUM1TSxJQUFOLENBQVc4TSxXQUFXLENBQUN2TSxTQUF2QixFQUFrQ3VNLFdBQVcsQ0FBQ3RNLFFBQTlDO0NBQ0QsR0FGRDs7Q0FJQSxTQUFPb00sS0FBSyxDQUFDblIsTUFBYixFQUFxQjtDQUNuQmlPLElBQUFBLE9BQU8sR0FBR0EsT0FBTyxDQUFDQyxJQUFSLENBQWFpRCxLQUFLLENBQUNLLEtBQU4sRUFBYixFQUE0QkwsS0FBSyxDQUFDSyxLQUFOLEVBQTVCLENBQVY7Q0FDRDs7Q0FFRCxTQUFPdkQsT0FBUDtDQUNELENBdENEOztBQXdDQStDLFFBQUssQ0FBQzFRLFNBQU4sQ0FBZ0JtUixNQUFoQixHQUF5QixTQUFTQSxNQUFULENBQWdCckwsTUFBaEIsRUFBd0I7Q0FDL0NBLEVBQUFBLE1BQU0sR0FBR3lKLGFBQVcsQ0FBQyxLQUFLakIsUUFBTixFQUFnQnhJLE1BQWhCLENBQXBCO0NBQ0EsU0FBT3pDLFFBQVEsQ0FBQ3lDLE1BQU0sQ0FBQ3hDLEdBQVIsRUFBYXdDLE1BQU0sQ0FBQ3ZDLE1BQXBCLEVBQTRCdUMsTUFBTSxDQUFDdEMsZ0JBQW5DLENBQVIsQ0FBNkQxQixPQUE3RCxDQUFxRSxLQUFyRSxFQUE0RSxFQUE1RSxDQUFQO0NBQ0QsQ0FIRDs7O0FBTUFvQixRQUFLLENBQUNkLE9BQU4sQ0FBYyxDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLE1BQWxCLEVBQTBCLFNBQTFCLENBQWQsRUFBb0QsU0FBU3lNLG1CQUFULENBQTZCakQsTUFBN0IsRUFBcUM7O0NBRXZGOEUsRUFBQUEsT0FBSyxDQUFDMVEsU0FBTixDQUFnQjRMLE1BQWhCLElBQTBCLFVBQVN0SSxHQUFULEVBQWN3QyxNQUFkLEVBQXNCO0NBQzlDLFdBQU8sS0FBS0UsT0FBTCxDQUFhdUosYUFBVyxDQUFDekosTUFBTSxJQUFJLEVBQVgsRUFBZTtDQUM1QzhGLE1BQUFBLE1BQU0sRUFBRUEsTUFEb0M7Q0FFNUN0SSxNQUFBQSxHQUFHLEVBQUVBLEdBRnVDO0NBRzVDMEIsTUFBQUEsSUFBSSxFQUFFLENBQUNjLE1BQU0sSUFBSSxFQUFYLEVBQWVkO0NBSHVCLEtBQWYsQ0FBeEIsQ0FBUDtDQUtELEdBTkQ7Q0FPRCxDQVREO0FBV0E5QixRQUFLLENBQUNkLE9BQU4sQ0FBYyxDQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLE9BQWhCLENBQWQsRUFBd0MsU0FBUzBNLHFCQUFULENBQStCbEQsTUFBL0IsRUFBdUM7O0NBRTdFOEUsRUFBQUEsT0FBSyxDQUFDMVEsU0FBTixDQUFnQjRMLE1BQWhCLElBQTBCLFVBQVN0SSxHQUFULEVBQWMwQixJQUFkLEVBQW9CYyxNQUFwQixFQUE0QjtDQUNwRCxXQUFPLEtBQUtFLE9BQUwsQ0FBYXVKLGFBQVcsQ0FBQ3pKLE1BQU0sSUFBSSxFQUFYLEVBQWU7Q0FDNUM4RixNQUFBQSxNQUFNLEVBQUVBLE1BRG9DO0NBRTVDdEksTUFBQUEsR0FBRyxFQUFFQSxHQUZ1QztDQUc1QzBCLE1BQUFBLElBQUksRUFBRUE7Q0FIc0MsS0FBZixDQUF4QixDQUFQO0NBS0QsR0FORDtDQU9ELENBVEQ7S0FXQW9NLE9BQWMsR0FBR1Y7O0NDNUZqQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztDQUNBLFNBQVNXLFFBQVQsQ0FBZ0JqTCxPQUFoQixFQUF5QjtDQUN2QixPQUFLQSxPQUFMLEdBQWVBLE9BQWY7Q0FDRDs7QUFFRGlMLFNBQU0sQ0FBQ3JSLFNBQVAsQ0FBaUJGLFFBQWpCLEdBQTRCLFNBQVNBLFFBQVQsR0FBb0I7Q0FDOUMsU0FBTyxZQUFZLEtBQUtzRyxPQUFMLEdBQWUsT0FBTyxLQUFLQSxPQUEzQixHQUFxQyxFQUFqRCxDQUFQO0NBQ0QsQ0FGRDs7QUFJQWlMLFNBQU0sQ0FBQ3JSLFNBQVAsQ0FBaUJzRixVQUFqQixHQUE4QixJQUE5QjtLQUVBZ00sUUFBYyxHQUFHRDs7Q0NoQmpCLElBQUlBLE1BQU0sR0FBR3hSLFFBQWI7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0NBQ0EsU0FBUzBSLFdBQVQsQ0FBcUJDLFFBQXJCLEVBQStCO0NBQzdCLE1BQUksT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztDQUNsQyxVQUFNLElBQUlDLFNBQUosQ0FBYyw4QkFBZCxDQUFOO0NBQ0Q7O0NBRUQsTUFBSUMsY0FBSjtDQUNBLE9BQUsvRCxPQUFMLEdBQWUsSUFBSTVDLE9BQUosQ0FBWSxTQUFTNEcsZUFBVCxDQUF5QjdLLE9BQXpCLEVBQWtDO0NBQzNENEssSUFBQUEsY0FBYyxHQUFHNUssT0FBakI7Q0FDRCxHQUZjLENBQWY7Q0FJQSxNQUFJOEssS0FBSyxHQUFHLElBQVo7Q0FDQUosRUFBQUEsUUFBUSxDQUFDLFNBQVMxRCxNQUFULENBQWdCMUgsT0FBaEIsRUFBeUI7Q0FDaEMsUUFBSXdMLEtBQUssQ0FBQ3RDLE1BQVYsRUFBa0I7O0NBRWhCO0NBQ0Q7O0NBRURzQyxJQUFBQSxLQUFLLENBQUN0QyxNQUFOLEdBQWUsSUFBSStCLE1BQUosQ0FBV2pMLE9BQVgsQ0FBZjtDQUNBc0wsSUFBQUEsY0FBYyxDQUFDRSxLQUFLLENBQUN0QyxNQUFQLENBQWQ7Q0FDRCxHQVJPLENBQVI7Q0FTRDtDQUVEO0NBQ0E7Q0FDQTs7O0NBQ0FpQyxXQUFXLENBQUN2UixTQUFaLENBQXNCaVAsZ0JBQXRCLEdBQXlDLFNBQVNBLGdCQUFULEdBQTRCO0NBQ25FLE1BQUksS0FBS0ssTUFBVCxFQUFpQjtDQUNmLFVBQU0sS0FBS0EsTUFBWDtDQUNEO0NBQ0YsQ0FKRDtDQU1BO0NBQ0E7Q0FDQTtDQUNBOzs7Q0FDQWlDLFdBQVcsQ0FBQ3ZCLE1BQVosR0FBcUIsU0FBU0EsTUFBVCxHQUFrQjtDQUNyQyxNQUFJbEMsTUFBSjtDQUNBLE1BQUk4RCxLQUFLLEdBQUcsSUFBSUwsV0FBSixDQUFnQixTQUFTQyxRQUFULENBQWtCSyxDQUFsQixFQUFxQjtDQUMvQy9ELElBQUFBLE1BQU0sR0FBRytELENBQVQ7Q0FDRCxHQUZXLENBQVo7Q0FHQSxTQUFPO0NBQ0xELElBQUFBLEtBQUssRUFBRUEsS0FERjtDQUVMOUQsSUFBQUEsTUFBTSxFQUFFQTtDQUZILEdBQVA7Q0FJRCxDQVREOztLQVdBZ0UsYUFBYyxHQUFHUDs7Q0N0RGpCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztLQUNBUSxNQUFjLEdBQUcsU0FBU0EsTUFBVCxDQUFnQkMsUUFBaEIsRUFBMEI7Q0FDekMsU0FBTyxTQUFTMVMsSUFBVCxDQUFjMlMsR0FBZCxFQUFtQjtDQUN4QixXQUFPRCxRQUFRLENBQUNwUyxLQUFULENBQWUsSUFBZixFQUFxQnFTLEdBQXJCLENBQVA7Q0FDRCxHQUZEO0NBR0Q7O0NDeEJEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7O0tBQ0EvTCxZQUFjLEdBQUcsU0FBU0EsWUFBVCxDQUFzQmdNLE9BQXRCLEVBQStCO0NBQzlDLFNBQVEsUUFBT0EsT0FBUCxNQUFtQixRQUFwQixJQUFrQ0EsT0FBTyxDQUFDaE0sWUFBUixLQUF5QixJQUFsRTtDQUNEOztDQ1JELElBQUloRCxPQUFLLEdBQUdyRCxPQUFaO0NBQ0EsSUFBSVYsTUFBSSxHQUFHcUosTUFBWDtDQUNBLElBQUlrSSxLQUFLLEdBQUduRyxPQUFaO0NBQ0EsSUFBSWdGLFdBQVcsR0FBRy9FLGFBQWxCO0NBQ0EsSUFBSThELFVBQVEsR0FBRzdELFVBQWY7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0NBQ0EsU0FBUzBILGNBQVQsQ0FBd0JDLGFBQXhCLEVBQXVDO0NBQ3JDLE1BQUlDLE9BQU8sR0FBRyxJQUFJM0IsS0FBSixDQUFVMEIsYUFBVixDQUFkO0NBQ0EsTUFBSUUsUUFBUSxHQUFHblQsTUFBSSxDQUFDdVIsS0FBSyxDQUFDMVEsU0FBTixDQUFnQmdHLE9BQWpCLEVBQTBCcU0sT0FBMUIsQ0FBbkIsQ0FGcUM7O0NBS3JDblAsRUFBQUEsT0FBSyxDQUFDTixNQUFOLENBQWEwUCxRQUFiLEVBQXVCNUIsS0FBSyxDQUFDMVEsU0FBN0IsRUFBd0NxUyxPQUF4QyxFQUxxQzs7Q0FRckNuUCxFQUFBQSxPQUFLLENBQUNOLE1BQU4sQ0FBYTBQLFFBQWIsRUFBdUJELE9BQXZCO0NBRUEsU0FBT0MsUUFBUDtDQUNEOzs7Q0FHRCxJQUFJQyxPQUFLLEdBQUdKLGNBQWMsQ0FBQzdELFVBQUQsQ0FBMUI7O0FBR0FpRSxRQUFLLENBQUM3QixLQUFOLEdBQWNBLEtBQWQ7O0FBR0E2QixRQUFLLENBQUNDLE1BQU4sR0FBZSxTQUFTQSxNQUFULENBQWdCN0IsY0FBaEIsRUFBZ0M7Q0FDN0MsU0FBT3dCLGNBQWMsQ0FBQzVDLFdBQVcsQ0FBQ2dELE9BQUssQ0FBQ2pFLFFBQVAsRUFBaUJxQyxjQUFqQixDQUFaLENBQXJCO0NBQ0QsQ0FGRDs7O0FBS0E0QixRQUFLLENBQUNsQixNQUFOLEdBQWUzRyxRQUFmO0FBQ0E2SCxRQUFLLENBQUNoQixXQUFOLEdBQW9CNUcsYUFBcEI7QUFDQTRILFFBQUssQ0FBQ25OLFFBQU4sR0FBaUJ3RixVQUFqQjs7QUFHQTJILFFBQUssQ0FBQ0UsR0FBTixHQUFZLFNBQVNBLEdBQVQsQ0FBYUMsUUFBYixFQUF1QjtDQUNqQyxTQUFPM0gsT0FBTyxDQUFDMEgsR0FBUixDQUFZQyxRQUFaLENBQVA7Q0FDRCxDQUZEOztBQUdBSCxRQUFLLENBQUNSLE1BQU4sR0FBZVksTUFBZjs7QUFHQUosUUFBSyxDQUFDck0sWUFBTixHQUFxQjBNLFlBQXJCO0FBRUFDLGdCQUFBLEdBQWlCTixPQUFqQjs7OEJBR3lCQTs7S0N2RHpCQSxLQUFjLEdBQUcxUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQ0VqQjs7O0tBQ0FpVCxLQUFjLEdBQUcsU0FBU0MsVUFBVCxHQUFzQjtDQUN0QyxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsT0FBT2pULE1BQU0sQ0FBQ2tULHFCQUFkLEtBQXdDLFVBQTVFLEVBQXdGO0NBQUUsV0FBTyxLQUFQO0NBQWU7O0NBQ3pHLE1BQUksUUFBT0QsTUFBTSxDQUFDRSxRQUFkLE1BQTJCLFFBQS9CLEVBQXlDO0NBQUUsV0FBTyxJQUFQO0NBQWM7O0NBRXpELE1BQUk3USxHQUFHLEdBQUcsRUFBVjtDQUNBLE1BQUk4USxHQUFHLEdBQUdILE1BQU0sQ0FBQyxNQUFELENBQWhCO0NBQ0EsTUFBSUksTUFBTSxHQUFHclQsTUFBTSxDQUFDb1QsR0FBRCxDQUFuQjs7Q0FDQSxNQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtDQUFFLFdBQU8sS0FBUDtDQUFlOztDQUU5QyxNQUFJcFQsTUFBTSxDQUFDQyxTQUFQLENBQWlCRixRQUFqQixDQUEwQkssSUFBMUIsQ0FBK0JnVCxHQUEvQixNQUF3QyxpQkFBNUMsRUFBK0Q7Q0FBRSxXQUFPLEtBQVA7Q0FBZTs7Q0FDaEYsTUFBSXBULE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkYsUUFBakIsQ0FBMEJLLElBQTFCLENBQStCaVQsTUFBL0IsTUFBMkMsaUJBQS9DLEVBQWtFO0NBQUUsV0FBTyxLQUFQO0NBQWUsR0FWN0M7Ozs7Ozs7O0NBb0J0QyxNQUFJQyxNQUFNLEdBQUcsRUFBYjtDQUNBaFIsRUFBQUEsR0FBRyxDQUFDOFEsR0FBRCxDQUFILEdBQVdFLE1BQVg7O0NBQ0EsT0FBS0YsR0FBTCxJQUFZOVEsR0FBWixFQUFpQjtDQUFFLFdBQU8sS0FBUDtDQUFlLEdBdEJJOzs7Q0F1QnRDLE1BQUksT0FBT3RDLE1BQU0sQ0FBQ3dRLElBQWQsS0FBdUIsVUFBdkIsSUFBcUN4USxNQUFNLENBQUN3USxJQUFQLENBQVlsTyxHQUFaLEVBQWlCM0MsTUFBakIsS0FBNEIsQ0FBckUsRUFBd0U7Q0FBRSxXQUFPLEtBQVA7Q0FBZTs7Q0FFekYsTUFBSSxPQUFPSyxNQUFNLENBQUN1VCxtQkFBZCxLQUFzQyxVQUF0QyxJQUFvRHZULE1BQU0sQ0FBQ3VULG1CQUFQLENBQTJCalIsR0FBM0IsRUFBZ0MzQyxNQUFoQyxLQUEyQyxDQUFuRyxFQUFzRztDQUFFLFdBQU8sS0FBUDtDQUFlOztDQUV2SCxNQUFJNlQsSUFBSSxHQUFHeFQsTUFBTSxDQUFDa1QscUJBQVAsQ0FBNkI1USxHQUE3QixDQUFYOztDQUNBLE1BQUlrUixJQUFJLENBQUM3VCxNQUFMLEtBQWdCLENBQWhCLElBQXFCNlQsSUFBSSxDQUFDLENBQUQsQ0FBSixLQUFZSixHQUFyQyxFQUEwQztDQUFFLFdBQU8sS0FBUDtDQUFlOztDQUUzRCxNQUFJLENBQUNwVCxNQUFNLENBQUNDLFNBQVAsQ0FBaUJ3VCxvQkFBakIsQ0FBc0NyVCxJQUF0QyxDQUEyQ2tDLEdBQTNDLEVBQWdEOFEsR0FBaEQsQ0FBTCxFQUEyRDtDQUFFLFdBQU8sS0FBUDtDQUFlOztDQUU1RSxNQUFJLE9BQU9wVCxNQUFNLENBQUMwVCx3QkFBZCxLQUEyQyxVQUEvQyxFQUEyRDtDQUMxRCxRQUFJQyxVQUFVLEdBQUczVCxNQUFNLENBQUMwVCx3QkFBUCxDQUFnQ3BSLEdBQWhDLEVBQXFDOFEsR0FBckMsQ0FBakI7O0NBQ0EsUUFBSU8sVUFBVSxDQUFDck8sS0FBWCxLQUFxQmdPLE1BQXJCLElBQStCSyxVQUFVLENBQUNDLFVBQVgsS0FBMEIsSUFBN0QsRUFBbUU7Q0FBRSxhQUFPLEtBQVA7Q0FBZTtDQUNwRjs7Q0FFRCxTQUFPLElBQVA7Q0FDQTs7Q0N2Q0QsSUFBSUMsVUFBVSxHQUFHQyxjQUFBQSxDQUFPYixNQUF4QjtDQUNBLElBQUljLGFBQWEsR0FBR2pVLEtBQXBCOztLQUVBa1QsWUFBYyxHQUFHLFNBQVNnQixnQkFBVCxHQUE0QjtDQUM1QyxNQUFJLE9BQU9ILFVBQVAsS0FBc0IsVUFBMUIsRUFBc0M7Q0FBRSxXQUFPLEtBQVA7Q0FBZTs7Q0FDdkQsTUFBSSxPQUFPWixNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0NBQUUsV0FBTyxLQUFQO0NBQWU7O0NBQ25ELE1BQUksUUFBT1ksVUFBVSxDQUFDLEtBQUQsQ0FBakIsTUFBNkIsUUFBakMsRUFBMkM7Q0FBRSxXQUFPLEtBQVA7Q0FBZTs7Q0FDNUQsTUFBSSxRQUFPWixNQUFNLENBQUMsS0FBRCxDQUFiLE1BQXlCLFFBQTdCLEVBQXVDO0NBQUUsV0FBTyxLQUFQO0NBQWU7O0NBRXhELFNBQU9jLGFBQWEsRUFBcEI7Q0FDQTs7Q0NWRDs7O0NBRUEsSUFBSUUsYUFBYSxHQUFHLGlEQUFwQjtDQUNBLElBQUlyUixLQUFLLEdBQUduRCxLQUFLLENBQUNRLFNBQU4sQ0FBZ0IyQyxLQUE1QjtDQUNBLElBQUlzUixPQUFLLEdBQUdsVSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJGLFFBQTdCO0NBQ0EsSUFBSW9VLFFBQVEsR0FBRyxtQkFBZjs7S0FFQUMsZ0JBQWMsR0FBRyxTQUFTaFYsSUFBVCxDQUFjaVYsSUFBZCxFQUFvQjtDQUNqQyxNQUFJckUsTUFBTSxHQUFHLElBQWI7O0NBQ0EsTUFBSSxPQUFPQSxNQUFQLEtBQWtCLFVBQWxCLElBQWdDa0UsT0FBSyxDQUFDOVQsSUFBTixDQUFXNFAsTUFBWCxNQUF1Qm1FLFFBQTNELEVBQXFFO0NBQ2pFLFVBQU0sSUFBSXpDLFNBQUosQ0FBY3VDLGFBQWEsR0FBR2pFLE1BQTlCLENBQU47Q0FDSDs7Q0FDRCxNQUFJeFEsSUFBSSxHQUFHb0QsS0FBSyxDQUFDeEMsSUFBTixDQUFXVixTQUFYLEVBQXNCLENBQXRCLENBQVg7Q0FFQSxNQUFJNFUsS0FBSjs7Q0FDQSxNQUFJQyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFZO0NBQ3JCLFFBQUksZ0JBQWdCRCxLQUFwQixFQUEyQjtDQUN2QixVQUFJMVQsTUFBTSxHQUFHb1AsTUFBTSxDQUFDblEsS0FBUCxDQUNULElBRFMsRUFFVEwsSUFBSSxDQUFDNEosTUFBTCxDQUFZeEcsS0FBSyxDQUFDeEMsSUFBTixDQUFXVixTQUFYLENBQVosQ0FGUyxDQUFiOztDQUlBLFVBQUlNLE1BQU0sQ0FBQ1ksTUFBRCxDQUFOLEtBQW1CQSxNQUF2QixFQUErQjtDQUMzQixlQUFPQSxNQUFQO0NBQ0g7O0NBQ0QsYUFBTyxJQUFQO0NBQ0gsS0FURCxNQVNPO0NBQ0gsYUFBT29QLE1BQU0sQ0FBQ25RLEtBQVAsQ0FDSHdVLElBREcsRUFFSDdVLElBQUksQ0FBQzRKLE1BQUwsQ0FBWXhHLEtBQUssQ0FBQ3hDLElBQU4sQ0FBV1YsU0FBWCxDQUFaLENBRkcsQ0FBUDtDQUlIO0NBQ0osR0FoQkQ7O0NBa0JBLE1BQUk4VSxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLENBQVQsRUFBWTFFLE1BQU0sQ0FBQ3JRLE1BQVAsR0FBZ0JILElBQUksQ0FBQ0csTUFBakMsQ0FBbEI7Q0FDQSxNQUFJZ1YsU0FBUyxHQUFHLEVBQWhCOztDQUNBLE9BQUssSUFBSS9VLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc0VSxXQUFwQixFQUFpQzVVLENBQUMsRUFBbEMsRUFBc0M7Q0FDbEMrVSxJQUFBQSxTQUFTLENBQUN6USxJQUFWLENBQWUsTUFBTXRFLENBQXJCO0NBQ0g7O0NBRUQwVSxFQUFBQSxLQUFLLEdBQUdNLFFBQVEsQ0FBQyxRQUFELEVBQVcsc0JBQXNCRCxTQUFTLENBQUN4USxJQUFWLENBQWUsR0FBZixDQUF0QixHQUE0QywyQ0FBdkQsQ0FBUixDQUE0R29RLE1BQTVHLENBQVI7O0NBRUEsTUFBSXZFLE1BQU0sQ0FBQy9QLFNBQVgsRUFBc0I7Q0FDbEIsUUFBSTRVLEtBQUssR0FBRyxTQUFTQSxLQUFULEdBQWlCLEVBQTdCOztDQUNBQSxJQUFBQSxLQUFLLENBQUM1VSxTQUFOLEdBQWtCK1AsTUFBTSxDQUFDL1AsU0FBekI7Q0FDQXFVLElBQUFBLEtBQUssQ0FBQ3JVLFNBQU4sR0FBa0IsSUFBSTRVLEtBQUosRUFBbEI7Q0FDQUEsSUFBQUEsS0FBSyxDQUFDNVUsU0FBTixHQUFrQixJQUFsQjtDQUNIOztDQUVELFNBQU9xVSxLQUFQO0NBQ0g7O0NDakRELElBQUlGLGNBQWMsR0FBR3RVLGdCQUFyQjtLQUVBZ1YsWUFBYyxHQUFHRixRQUFRLENBQUMzVSxTQUFULENBQW1CYixJQUFuQixJQUEyQmdWOztDQ0Y1QyxJQUFJaFYsTUFBSSxHQUFHVSxZQUFYO0tBRUFpVixHQUFjLEdBQUczVixNQUFJLENBQUNnQixJQUFMLENBQVV3VSxRQUFRLENBQUN4VSxJQUFuQixFQUF5QkosTUFBTSxDQUFDQyxTQUFQLENBQWlCd0MsY0FBMUM7O0NDRmpCLElBQUkwSyxXQUFKO0NBRUEsSUFBSTZILFlBQVksR0FBR0MsV0FBbkI7Q0FDQSxJQUFJQyxTQUFTLEdBQUdOLFFBQWhCO0NBQ0EsSUFBSU8sWUFBVSxHQUFHekQsU0FBakI7O0NBR0EsSUFBSTBELHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBVUMsZ0JBQVYsRUFBNEI7Q0FDdkQsTUFBSTtDQUNILFdBQU9ILFNBQVMsQ0FBQywyQkFBMkJHLGdCQUEzQixHQUE4QyxnQkFBL0MsQ0FBVCxFQUFQO0NBQ0EsR0FGRCxDQUVFLE9BQU8vSCxDQUFQLEVBQVU7Q0FDWixDQUpEOztDQU1BLElBQUlnSSxLQUFLLEdBQUd0VixNQUFNLENBQUMwVCx3QkFBbkI7O0NBQ0EsSUFBSTRCLEtBQUosRUFBVztDQUNWLE1BQUk7Q0FDSEEsSUFBQUEsS0FBSyxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQUw7Q0FDQSxHQUZELENBRUUsT0FBT2hJLENBQVAsRUFBVTtDQUNYZ0ksSUFBQUEsS0FBSyxHQUFHLElBQVIsQ0FEVztDQUVYO0NBQ0Q7O0NBRUQsSUFBSUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFZO0NBQ2hDLFFBQU0sSUFBSUosWUFBSixFQUFOO0NBQ0EsQ0FGRDs7Q0FHQSxJQUFJSyxjQUFjLEdBQUdGLEtBQUssR0FDdEIsWUFBWTtDQUNkLE1BQUk7O0NBRUg1VixJQUFBQSxTQUFTLENBQUMrVixNQUFWLENBRkc7O0NBR0gsV0FBT0YsY0FBUDtDQUNBLEdBSkQsQ0FJRSxPQUFPRyxZQUFQLEVBQXFCO0NBQ3RCLFFBQUk7O0NBRUgsYUFBT0osS0FBSyxDQUFDNVYsU0FBRCxFQUFZLFFBQVosQ0FBTCxDQUEyQmlXLEdBQWxDO0NBQ0EsS0FIRCxDQUdFLE9BQU9DLFVBQVAsRUFBbUI7Q0FDcEIsYUFBT0wsY0FBUDtDQUNBO0NBQ0Q7Q0FDRCxDQWJFLEVBRHNCLEdBZXZCQSxjQWZIO0NBaUJBLElBQUl2QyxVQUFVLEdBQUdsVCxZQUFzQixFQUF2Qzs7Q0FFQSxJQUFJK1YsUUFBUSxHQUFHN1YsTUFBTSxDQUFDb0IsY0FBUCxJQUF5QixVQUFVMFUsQ0FBVixFQUFhO0NBQUUsU0FBT0EsQ0FBQyxDQUFDQyxTQUFUO0NBQXFCLENBQTVFOzs7Q0FFQSxJQUFJQyxTQUFTLEdBQUcsRUFBaEI7Q0FFQSxJQUFJQyxVQUFVLEdBQUcsT0FBT0MsVUFBUCxLQUFzQixXQUF0QixHQUFvQy9JLFdBQXBDLEdBQWdEMEksUUFBUSxDQUFDSyxVQUFELENBQXpFO0NBRUEsSUFBSUMsVUFBVSxHQUFHO0NBQ2hCLHNCQUFvQixPQUFPQyxjQUFQLEtBQTBCLFdBQTFCLEdBQXdDakosV0FBeEMsR0FBb0RpSixjQUR4RDtDQUVoQixhQUFXM1csS0FGSztDQUdoQixtQkFBaUIsT0FBT29CLFdBQVAsS0FBdUIsV0FBdkIsR0FBcUNzTSxXQUFyQyxHQUFpRHRNLFdBSGxEO0NBSWhCLDhCQUE0Qm1TLFVBQVUsR0FBRzZDLFFBQVEsQ0FBQyxHQUFHNUMsTUFBTSxDQUFDRSxRQUFWLEdBQUQsQ0FBWCxHQUFxQ2hHLFdBSjNEO0NBS2hCLHNDQUFvQ0EsV0FMcEI7Q0FNaEIscUJBQW1CNkksU0FOSDtDQU9oQixzQkFBb0JBLFNBUEo7Q0FRaEIsOEJBQTRCQSxTQVJaO0NBU2hCLDhCQUE0QkEsU0FUWjtDQVVoQixlQUFhLE9BQU9LLE9BQVAsS0FBbUIsV0FBbkIsR0FBaUNsSixXQUFqQyxHQUE2Q2tKLE9BVjFDO0NBV2hCLGNBQVksT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ25KLFdBQWhDLEdBQTRDbUosTUFYeEM7Q0FZaEIsZUFBYUMsT0FaRztDQWFoQixnQkFBYyxPQUFPQyxRQUFQLEtBQW9CLFdBQXBCLEdBQWtDckosV0FBbEMsR0FBOENxSixRQWI1QztDQWNoQixZQUFVN08sSUFkTTtDQWVoQixpQkFBZThPLFNBZkM7Q0FnQmhCLDBCQUF3QnpPLGtCQWhCUjtDQWlCaEIsaUJBQWUwTyxTQWpCQztDQWtCaEIsMEJBQXdCclQsa0JBbEJSO0NBbUJoQixhQUFXd0QsS0FuQks7Q0FvQmhCLFlBQVU4UCxJQXBCTTs7Q0FxQmhCLGlCQUFlQyxTQXJCQztDQXNCaEIsb0JBQWtCLE9BQU9DLFlBQVAsS0FBd0IsV0FBeEIsR0FBc0MxSixXQUF0QyxHQUFrRDBKLFlBdEJwRDtDQXVCaEIsb0JBQWtCLE9BQU9DLFlBQVAsS0FBd0IsV0FBeEIsR0FBc0MzSixXQUF0QyxHQUFrRDJKLFlBdkJwRDtDQXdCaEIsNEJBQTBCLE9BQU9DLG9CQUFQLEtBQWdDLFdBQWhDLEdBQThDNUosV0FBOUMsR0FBMEQ0SixvQkF4QnBFO0NBeUJoQixnQkFBYzdCLFNBekJFO0NBMEJoQix5QkFBdUJjLFNBMUJQO0NBMkJoQixpQkFBZSxPQUFPZ0IsU0FBUCxLQUFxQixXQUFyQixHQUFtQzdKLFdBQW5DLEdBQStDNkosU0EzQjlDO0NBNEJoQixrQkFBZ0IsT0FBT0MsVUFBUCxLQUFzQixXQUF0QixHQUFvQzlKLFdBQXBDLEdBQWdEOEosVUE1QmhEO0NBNkJoQixrQkFBZ0IsT0FBT0MsVUFBUCxLQUFzQixXQUF0QixHQUFvQy9KLFdBQXBDLEdBQWdEK0osVUE3QmhEO0NBOEJoQixnQkFBY0MsUUE5QkU7Q0ErQmhCLGFBQVdDLEtBL0JLO0NBZ0NoQix5QkFBdUJwRSxVQUFVLEdBQUc2QyxRQUFRLENBQUNBLFFBQVEsQ0FBQyxHQUFHNUMsTUFBTSxDQUFDRSxRQUFWLEdBQUQsQ0FBVCxDQUFYLEdBQStDaEcsV0FoQ2hFO0NBaUNoQixZQUFVLFFBQU9uSixJQUFQLHlDQUFPQSxJQUFQLE9BQWdCLFFBQWhCLEdBQTJCQSxJQUEzQixHQUFrQ21KLFdBakM1QjtDQWtDaEIsV0FBUyxPQUFPa0ssR0FBUCxLQUFlLFdBQWYsR0FBNkJsSyxXQUE3QixHQUF5Q2tLLEdBbENsQztDQW1DaEIsNEJBQTBCLE9BQU9BLEdBQVAsS0FBZSxXQUFmLElBQThCLENBQUNyRSxVQUEvQixHQUE0QzdGLFdBQTVDLEdBQXdEMEksUUFBUSxDQUFDLElBQUl3QixHQUFKLEdBQVVwRSxNQUFNLENBQUNFLFFBQWpCLEdBQUQsQ0FuQzFFO0NBb0NoQixZQUFVc0IsSUFwQ007Q0FxQ2hCLGNBQVk2QyxNQXJDSTtDQXNDaEIsY0FBWXRYLE1BdENJO0NBdUNoQixrQkFBZ0J1WCxVQXZDQTtDQXdDaEIsZ0JBQWNDLFFBeENFO0NBeUNoQixlQUFhLE9BQU94TSxPQUFQLEtBQW1CLFdBQW5CLEdBQWlDbUMsV0FBakMsR0FBNkNuQyxPQXpDMUM7Q0EwQ2hCLGFBQVcsT0FBT3lNLEtBQVAsS0FBaUIsV0FBakIsR0FBK0J0SyxXQUEvQixHQUEyQ3NLLEtBMUN0QztDQTJDaEIsa0JBQWdCQyxVQTNDQTtDQTRDaEIsc0JBQW9CQyxjQTVDSjtDQTZDaEIsZUFBYSxPQUFPQyxPQUFQLEtBQW1CLFdBQW5CLEdBQWlDekssV0FBakMsR0FBNkN5SyxPQTdDMUM7Q0E4Q2hCLGNBQVk3UCxNQTlDSTtDQStDaEIsV0FBUyxPQUFPOFAsR0FBUCxLQUFlLFdBQWYsR0FBNkIxSyxXQUE3QixHQUF5QzBLLEdBL0NsQztDQWdEaEIsNEJBQTBCLE9BQU9BLEdBQVAsS0FBZSxXQUFmLElBQThCLENBQUM3RSxVQUEvQixHQUE0QzdGLFdBQTVDLEdBQXdEMEksUUFBUSxDQUFDLElBQUlnQyxHQUFKLEdBQVU1RSxNQUFNLENBQUNFLFFBQWpCLEdBQUQsQ0FoRDFFO0NBaURoQix5QkFBdUIsT0FBTzJFLGlCQUFQLEtBQTZCLFdBQTdCLEdBQTJDM0ssV0FBM0MsR0FBdUQySyxpQkFqRDlEO0NBa0RoQixjQUFZQyxNQWxESTtDQW1EaEIsK0JBQTZCL0UsVUFBVSxHQUFHNkMsUUFBUSxDQUFDLEdBQUc1QyxNQUFNLENBQUNFLFFBQVYsR0FBRCxDQUFYLEdBQXFDaEcsV0FuRDVEO0NBb0RoQixjQUFZNkYsVUFBVSxHQUFHQyxNQUFILEdBQVk5RixXQXBEbEI7Q0FxRGhCLG1CQUFpQjZILFlBckREO0NBc0RoQixzQkFBb0JRLGNBdERKO0NBdURoQixrQkFBZ0JTLFVBdkRBO0NBd0RoQixpQkFBZWQsWUF4REM7Q0F5RGhCLGtCQUFnQixPQUFPZSxVQUFQLEtBQXNCLFdBQXRCLEdBQW9DL0ksV0FBcEMsR0FBZ0QrSSxVQXpEaEQ7Q0EwRGhCLHlCQUF1QixPQUFPOEIsaUJBQVAsS0FBNkIsV0FBN0IsR0FBMkM3SyxXQUEzQyxHQUF1RDZLLGlCQTFEOUQ7Q0EyRGhCLG1CQUFpQixPQUFPQyxXQUFQLEtBQXVCLFdBQXZCLEdBQXFDOUssV0FBckMsR0FBaUQ4SyxXQTNEbEQ7Q0E0RGhCLG1CQUFpQixPQUFPQyxXQUFQLEtBQXVCLFdBQXZCLEdBQXFDL0ssV0FBckMsR0FBaUQrSyxXQTVEbEQ7Q0E2RGhCLGdCQUFjQyxRQTdERTtDQThEaEIsZUFBYSxPQUFPQyxPQUFQLEtBQW1CLFdBQW5CLEdBQWlDakwsV0FBakMsR0FBNkNpTCxPQTlEMUM7Q0ErRGhCLGVBQWEsT0FBT0MsT0FBUCxLQUFtQixXQUFuQixHQUFpQ2xMLFdBQWpDLEdBQTZDa0wsT0EvRDFDO0NBZ0VoQixlQUFhLE9BQU9DLE9BQVAsS0FBbUIsV0FBbkIsR0FBaUNuTCxXQUFqQyxHQUE2Q21MO0NBaEUxQyxDQUFqQjs7Q0FtRUEsSUFBSUMsTUFBTSxHQUFHLFNBQVNBLE1BQVQsQ0FBZ0I1UyxJQUFoQixFQUFzQjtDQUNsQyxNQUFJTCxLQUFKOztDQUNBLE1BQUlLLElBQUksS0FBSyxpQkFBYixFQUFnQztDQUMvQkwsSUFBQUEsS0FBSyxHQUFHOFAscUJBQXFCLENBQUMsc0JBQUQsQ0FBN0I7Q0FDQSxHQUZELE1BRU8sSUFBSXpQLElBQUksS0FBSyxxQkFBYixFQUFvQztDQUMxQ0wsSUFBQUEsS0FBSyxHQUFHOFAscUJBQXFCLENBQUMsaUJBQUQsQ0FBN0I7Q0FDQSxHQUZNLE1BRUEsSUFBSXpQLElBQUksS0FBSywwQkFBYixFQUF5QztDQUMvQ0wsSUFBQUEsS0FBSyxHQUFHOFAscUJBQXFCLENBQUMsdUJBQUQsQ0FBN0I7Q0FDQSxHQUZNLE1BRUEsSUFBSXpQLElBQUksS0FBSyxrQkFBYixFQUFpQztDQUN2QyxRQUFJdEcsRUFBRSxHQUFHa1osTUFBTSxDQUFDLDBCQUFELENBQWY7O0NBQ0EsUUFBSWxaLEVBQUosRUFBUTtDQUNQaUcsTUFBQUEsS0FBSyxHQUFHakcsRUFBRSxDQUFDWSxTQUFYO0NBQ0E7Q0FDRCxHQUxNLE1BS0EsSUFBSTBGLElBQUksS0FBSywwQkFBYixFQUF5QztDQUMvQyxRQUFJNlMsR0FBRyxHQUFHRCxNQUFNLENBQUMsa0JBQUQsQ0FBaEI7O0NBQ0EsUUFBSUMsR0FBSixFQUFTO0NBQ1JsVCxNQUFBQSxLQUFLLEdBQUd1USxRQUFRLENBQUMyQyxHQUFHLENBQUN2WSxTQUFMLENBQWhCO0NBQ0E7Q0FDRDs7Q0FFRGtXLEVBQUFBLFVBQVUsQ0FBQ3hRLElBQUQsQ0FBVixHQUFtQkwsS0FBbkI7Q0FFQSxTQUFPQSxLQUFQO0NBQ0EsQ0F2QkQ7O0NBeUJBLElBQUltVCxjQUFjLEdBQUc7Q0FDcEIsNEJBQTBCLENBQUMsYUFBRCxFQUFnQixXQUFoQixDQUROO0NBRXBCLHNCQUFvQixDQUFDLE9BQUQsRUFBVSxXQUFWLENBRkE7Q0FHcEIsMEJBQXdCLENBQUMsT0FBRCxFQUFVLFdBQVYsRUFBdUIsU0FBdkIsQ0FISjtDQUlwQiwwQkFBd0IsQ0FBQyxPQUFELEVBQVUsV0FBVixFQUF1QixTQUF2QixDQUpKO0NBS3BCLHVCQUFxQixDQUFDLE9BQUQsRUFBVSxXQUFWLEVBQXVCLE1BQXZCLENBTEQ7Q0FNcEIseUJBQXVCLENBQUMsT0FBRCxFQUFVLFdBQVYsRUFBdUIsUUFBdkIsQ0FOSDtDQU9wQiw4QkFBNEIsQ0FBQyxlQUFELEVBQWtCLFdBQWxCLENBUFI7Q0FRcEIsc0JBQW9CLENBQUMsd0JBQUQsRUFBMkIsV0FBM0IsQ0FSQTtDQVNwQiwrQkFBNkIsQ0FBQyx3QkFBRCxFQUEyQixXQUEzQixFQUF3QyxXQUF4QyxDQVRUO0NBVXBCLHdCQUFzQixDQUFDLFNBQUQsRUFBWSxXQUFaLENBVkY7Q0FXcEIseUJBQXVCLENBQUMsVUFBRCxFQUFhLFdBQWIsQ0FYSDtDQVlwQixxQkFBbUIsQ0FBQyxNQUFELEVBQVMsV0FBVCxDQVpDO0NBYXBCLHNCQUFvQixDQUFDLE9BQUQsRUFBVSxXQUFWLENBYkE7Q0FjcEIsMEJBQXdCLENBQUMsV0FBRCxFQUFjLFdBQWQsQ0FkSjtDQWVwQiw2QkFBMkIsQ0FBQyxjQUFELEVBQWlCLFdBQWpCLENBZlA7Q0FnQnBCLDZCQUEyQixDQUFDLGNBQUQsRUFBaUIsV0FBakIsQ0FoQlA7Q0FpQnBCLHlCQUF1QixDQUFDLFVBQUQsRUFBYSxXQUFiLENBakJIO0NBa0JwQixpQkFBZSxDQUFDLG1CQUFELEVBQXNCLFdBQXRCLENBbEJLO0NBbUJwQiwwQkFBd0IsQ0FBQyxtQkFBRCxFQUFzQixXQUF0QixFQUFtQyxXQUFuQyxDQW5CSjtDQW9CcEIsMEJBQXdCLENBQUMsV0FBRCxFQUFjLFdBQWQsQ0FwQko7Q0FxQnBCLDJCQUF5QixDQUFDLFlBQUQsRUFBZSxXQUFmLENBckJMO0NBc0JwQiwyQkFBeUIsQ0FBQyxZQUFELEVBQWUsV0FBZixDQXRCTDtDQXVCcEIsaUJBQWUsQ0FBQyxNQUFELEVBQVMsT0FBVCxDQXZCSztDQXdCcEIscUJBQW1CLENBQUMsTUFBRCxFQUFTLFdBQVQsQ0F4QkM7Q0F5QnBCLG9CQUFrQixDQUFDLEtBQUQsRUFBUSxXQUFSLENBekJFO0NBMEJwQix1QkFBcUIsQ0FBQyxRQUFELEVBQVcsV0FBWCxDQTFCRDtDQTJCcEIsdUJBQXFCLENBQUMsUUFBRCxFQUFXLFdBQVgsQ0EzQkQ7Q0E0QnBCLHlCQUF1QixDQUFDLFFBQUQsRUFBVyxXQUFYLEVBQXdCLFVBQXhCLENBNUJIO0NBNkJwQix3QkFBc0IsQ0FBQyxRQUFELEVBQVcsV0FBWCxFQUF3QixTQUF4QixDQTdCRjtDQThCcEIsd0JBQXNCLENBQUMsU0FBRCxFQUFZLFdBQVosQ0E5QkY7Q0ErQnBCLHlCQUF1QixDQUFDLFNBQUQsRUFBWSxXQUFaLEVBQXlCLE1BQXpCLENBL0JIO0NBZ0NwQixtQkFBaUIsQ0FBQyxTQUFELEVBQVksS0FBWixDQWhDRztDQWlDcEIsc0JBQW9CLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FqQ0E7Q0FrQ3BCLHVCQUFxQixDQUFDLFNBQUQsRUFBWSxTQUFaLENBbENEO0NBbUNwQiwyQkFBeUIsQ0FBQyxZQUFELEVBQWUsV0FBZixDQW5DTDtDQW9DcEIsK0JBQTZCLENBQUMsZ0JBQUQsRUFBbUIsV0FBbkIsQ0FwQ1Q7Q0FxQ3BCLHVCQUFxQixDQUFDLFFBQUQsRUFBVyxXQUFYLENBckNEO0NBc0NwQixvQkFBa0IsQ0FBQyxLQUFELEVBQVEsV0FBUixDQXRDRTtDQXVDcEIsa0NBQWdDLENBQUMsbUJBQUQsRUFBc0IsV0FBdEIsQ0F2Q1o7Q0F3Q3BCLHVCQUFxQixDQUFDLFFBQUQsRUFBVyxXQUFYLENBeENEO0NBeUNwQix1QkFBcUIsQ0FBQyxRQUFELEVBQVcsV0FBWCxDQXpDRDtDQTBDcEIsNEJBQTBCLENBQUMsYUFBRCxFQUFnQixXQUFoQixDQTFDTjtDQTJDcEIsMkJBQXlCLENBQUMsWUFBRCxFQUFlLFdBQWYsQ0EzQ0w7Q0E0Q3BCLDBCQUF3QixDQUFDLFdBQUQsRUFBYyxXQUFkLENBNUNKO0NBNkNwQiwyQkFBeUIsQ0FBQyxZQUFELEVBQWUsV0FBZixDQTdDTDtDQThDcEIsa0NBQWdDLENBQUMsbUJBQUQsRUFBc0IsV0FBdEIsQ0E5Q1o7Q0ErQ3BCLDRCQUEwQixDQUFDLGFBQUQsRUFBZ0IsV0FBaEIsQ0EvQ047Q0FnRHBCLDRCQUEwQixDQUFDLGFBQUQsRUFBZ0IsV0FBaEIsQ0FoRE47Q0FpRHBCLHlCQUF1QixDQUFDLFVBQUQsRUFBYSxXQUFiLENBakRIO0NBa0RwQix3QkFBc0IsQ0FBQyxTQUFELEVBQVksV0FBWixDQWxERjtDQW1EcEIsd0JBQXNCLENBQUMsU0FBRCxFQUFZLFdBQVo7Q0FuREYsQ0FBckI7Q0FzREEsSUFBSXJaLElBQUksR0FBR3FKLFlBQVg7Q0FDQSxJQUFJaVEsUUFBTSxHQUFHbE8sR0FBYjtDQUNBLElBQUltTyxPQUFPLEdBQUd2WixJQUFJLENBQUNnQixJQUFMLENBQVV3VSxRQUFRLENBQUN4VSxJQUFuQixFQUF5QlgsS0FBSyxDQUFDUSxTQUFOLENBQWdCbUosTUFBekMsQ0FBZDtDQUNBLElBQUl3UCxZQUFZLEdBQUd4WixJQUFJLENBQUNnQixJQUFMLENBQVV3VSxRQUFRLENBQUMvVSxLQUFuQixFQUEwQkosS0FBSyxDQUFDUSxTQUFOLENBQWdCNFksTUFBMUMsQ0FBbkI7Q0FDQSxJQUFJQyxRQUFRLEdBQUcxWixJQUFJLENBQUNnQixJQUFMLENBQVV3VSxRQUFRLENBQUN4VSxJQUFuQixFQUF5QjJYLE1BQU0sQ0FBQzlYLFNBQVAsQ0FBaUI4QixPQUExQyxDQUFmO0NBQ0EsSUFBSWdYLFNBQVMsR0FBRzNaLElBQUksQ0FBQ2dCLElBQUwsQ0FBVXdVLFFBQVEsQ0FBQ3hVLElBQW5CLEVBQXlCMlgsTUFBTSxDQUFDOVgsU0FBUCxDQUFpQjJDLEtBQTFDLENBQWhCO0NBRUE7O0NBQ0EsSUFBSW9XLFVBQVUsR0FBRyxvR0FBakI7Q0FDQSxJQUFJQyxZQUFZLEdBQUcsVUFBbkI7OztDQUNBLElBQUlDLFlBQVksR0FBRyxTQUFTQSxZQUFULENBQXNCQyxNQUF0QixFQUE4QjtDQUNoRCxNQUFJQyxLQUFLLEdBQUdMLFNBQVMsQ0FBQ0ksTUFBRCxFQUFTLENBQVQsRUFBWSxDQUFaLENBQXJCO0NBQ0EsTUFBSUUsSUFBSSxHQUFHTixTQUFTLENBQUNJLE1BQUQsRUFBUyxDQUFDLENBQVYsQ0FBcEI7O0NBQ0EsTUFBSUMsS0FBSyxLQUFLLEdBQVYsSUFBaUJDLElBQUksS0FBSyxHQUE5QixFQUFtQztDQUNsQyxVQUFNLElBQUlyRSxZQUFKLENBQWlCLGdEQUFqQixDQUFOO0NBQ0EsR0FGRCxNQUVPLElBQUlxRSxJQUFJLEtBQUssR0FBVCxJQUFnQkQsS0FBSyxLQUFLLEdBQTlCLEVBQW1DO0NBQ3pDLFVBQU0sSUFBSXBFLFlBQUosQ0FBaUIsZ0RBQWpCLENBQU47Q0FDQTs7Q0FDRCxNQUFJcFUsTUFBTSxHQUFHLEVBQWI7Q0FDQWtZLEVBQUFBLFFBQVEsQ0FBQ0ssTUFBRCxFQUFTSCxVQUFULEVBQXFCLFVBQVVsUixLQUFWLEVBQWlCdkIsTUFBakIsRUFBeUIrUyxLQUF6QixFQUFnQ0MsU0FBaEMsRUFBMkM7Q0FDdkUzWSxJQUFBQSxNQUFNLENBQUNBLE1BQU0sQ0FBQ2pCLE1BQVIsQ0FBTixHQUF3QjJaLEtBQUssR0FBR1IsUUFBUSxDQUFDUyxTQUFELEVBQVlOLFlBQVosRUFBMEIsSUFBMUIsQ0FBWCxHQUE2QzFTLE1BQU0sSUFBSXVCLEtBQXBGO0NBQ0EsR0FGTyxDQUFSO0NBR0EsU0FBT2xILE1BQVA7Q0FDQSxDQWJEO0NBY0E7OztDQUVBLElBQUk0WSxnQkFBZ0IsR0FBRyxTQUFTQSxnQkFBVCxDQUEwQjdULElBQTFCLEVBQWdDOFQsWUFBaEMsRUFBOEM7Q0FDcEUsTUFBSUMsYUFBYSxHQUFHL1QsSUFBcEI7Q0FDQSxNQUFJZ1UsS0FBSjs7Q0FDQSxNQUFJakIsUUFBTSxDQUFDRCxjQUFELEVBQWlCaUIsYUFBakIsQ0FBVixFQUEyQztDQUMxQ0MsSUFBQUEsS0FBSyxHQUFHbEIsY0FBYyxDQUFDaUIsYUFBRCxDQUF0QjtDQUNBQSxJQUFBQSxhQUFhLEdBQUcsTUFBTUMsS0FBSyxDQUFDLENBQUQsQ0FBWCxHQUFpQixHQUFqQztDQUNBOztDQUVELE1BQUlqQixRQUFNLENBQUN2QyxVQUFELEVBQWF1RCxhQUFiLENBQVYsRUFBdUM7Q0FDdEMsUUFBSXBVLEtBQUssR0FBRzZRLFVBQVUsQ0FBQ3VELGFBQUQsQ0FBdEI7O0NBQ0EsUUFBSXBVLEtBQUssS0FBSzBRLFNBQWQsRUFBeUI7Q0FDeEIxUSxNQUFBQSxLQUFLLEdBQUdpVCxNQUFNLENBQUNtQixhQUFELENBQWQ7Q0FDQTs7Q0FDRCxRQUFJLE9BQU9wVSxLQUFQLEtBQWlCLFdBQWpCLElBQWdDLENBQUNtVSxZQUFyQyxFQUFtRDtDQUNsRCxZQUFNLElBQUl0RSxZQUFKLENBQWUsZUFBZXhQLElBQWYsR0FBc0Isc0RBQXJDLENBQU47Q0FDQTs7Q0FFRCxXQUFPO0NBQ05nVSxNQUFBQSxLQUFLLEVBQUVBLEtBREQ7Q0FFTmhVLE1BQUFBLElBQUksRUFBRStULGFBRkE7Q0FHTnBVLE1BQUFBLEtBQUssRUFBRUE7Q0FIRCxLQUFQO0NBS0E7O0NBRUQsUUFBTSxJQUFJMFAsWUFBSixDQUFpQixlQUFlclAsSUFBZixHQUFzQixrQkFBdkMsQ0FBTjtDQUNBLENBekJEOztLQTJCQWlVLFlBQWMsR0FBRyxTQUFTQyxZQUFULENBQXNCbFUsSUFBdEIsRUFBNEI4VCxZQUE1QixFQUEwQztDQUMxRCxNQUFJLE9BQU85VCxJQUFQLEtBQWdCLFFBQWhCLElBQTRCQSxJQUFJLENBQUNoRyxNQUFMLEtBQWdCLENBQWhELEVBQW1EO0NBQ2xELFVBQU0sSUFBSXdWLFlBQUosQ0FBZSwyQ0FBZixDQUFOO0NBQ0E7O0NBQ0QsTUFBSXpWLFNBQVMsQ0FBQ0MsTUFBVixHQUFtQixDQUFuQixJQUF3QixPQUFPOFosWUFBUCxLQUF3QixTQUFwRCxFQUErRDtDQUM5RCxVQUFNLElBQUl0RSxZQUFKLENBQWUsMkNBQWYsQ0FBTjtDQUNBOztDQUVELE1BQUl4UixLQUFLLEdBQUd1VixZQUFZLENBQUN2VCxJQUFELENBQXhCO0NBQ0EsTUFBSW1VLGlCQUFpQixHQUFHblcsS0FBSyxDQUFDaEUsTUFBTixHQUFlLENBQWYsR0FBbUJnRSxLQUFLLENBQUMsQ0FBRCxDQUF4QixHQUE4QixFQUF0RDtDQUVBLE1BQUlvVyxTQUFTLEdBQUdQLGdCQUFnQixDQUFDLE1BQU1NLGlCQUFOLEdBQTBCLEdBQTNCLEVBQWdDTCxZQUFoQyxDQUFoQztDQUNBLE1BQUlPLGlCQUFpQixHQUFHRCxTQUFTLENBQUNwVSxJQUFsQztDQUNBLE1BQUlMLEtBQUssR0FBR3lVLFNBQVMsQ0FBQ3pVLEtBQXRCO0NBQ0EsTUFBSTJVLGtCQUFrQixHQUFHLEtBQXpCO0NBRUEsTUFBSU4sS0FBSyxHQUFHSSxTQUFTLENBQUNKLEtBQXRCOztDQUNBLE1BQUlBLEtBQUosRUFBVztDQUNWRyxJQUFBQSxpQkFBaUIsR0FBR0gsS0FBSyxDQUFDLENBQUQsQ0FBekI7Q0FDQWYsSUFBQUEsWUFBWSxDQUFDalYsS0FBRCxFQUFRZ1YsT0FBTyxDQUFDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBRCxFQUFTZ0IsS0FBVCxDQUFmLENBQVo7Q0FDQTs7Q0FFRCxPQUFLLElBQUkvWixDQUFDLEdBQUcsQ0FBUixFQUFXc2EsS0FBSyxHQUFHLElBQXhCLEVBQThCdGEsQ0FBQyxHQUFHK0QsS0FBSyxDQUFDaEUsTUFBeEMsRUFBZ0RDLENBQUMsSUFBSSxDQUFyRCxFQUF3RDtDQUN2RCxRQUFJdWEsSUFBSSxHQUFHeFcsS0FBSyxDQUFDL0QsQ0FBRCxDQUFoQjtDQUNBLFFBQUl3WixLQUFLLEdBQUdMLFNBQVMsQ0FBQ29CLElBQUQsRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUFyQjtDQUNBLFFBQUlkLElBQUksR0FBR04sU0FBUyxDQUFDb0IsSUFBRCxFQUFPLENBQUMsQ0FBUixDQUFwQjs7Q0FDQSxRQUNDLENBQ0VmLEtBQUssS0FBSyxHQUFWLElBQWlCQSxLQUFLLEtBQUssR0FBM0IsSUFBa0NBLEtBQUssS0FBSyxHQUE3QyxJQUNJQyxJQUFJLEtBQUssR0FBVCxJQUFnQkEsSUFBSSxLQUFLLEdBQXpCLElBQWdDQSxJQUFJLEtBQUssR0FGOUMsS0FJR0QsS0FBSyxLQUFLQyxJQUxkLEVBTUU7Q0FDRCxZQUFNLElBQUlyRSxZQUFKLENBQWlCLHNEQUFqQixDQUFOO0NBQ0E7O0NBQ0QsUUFBSW1GLElBQUksS0FBSyxhQUFULElBQTBCLENBQUNELEtBQS9CLEVBQXNDO0NBQ3JDRCxNQUFBQSxrQkFBa0IsR0FBRyxJQUFyQjtDQUNBOztDQUVESCxJQUFBQSxpQkFBaUIsSUFBSSxNQUFNSyxJQUEzQjtDQUNBSCxJQUFBQSxpQkFBaUIsR0FBRyxNQUFNRixpQkFBTixHQUEwQixHQUE5Qzs7Q0FFQSxRQUFJcEIsUUFBTSxDQUFDdkMsVUFBRCxFQUFhNkQsaUJBQWIsQ0FBVixFQUEyQztDQUMxQzFVLE1BQUFBLEtBQUssR0FBRzZRLFVBQVUsQ0FBQzZELGlCQUFELENBQWxCO0NBQ0EsS0FGRCxNQUVPLElBQUkxVSxLQUFLLElBQUksSUFBYixFQUFtQjtDQUN6QixVQUFJLEVBQUU2VSxJQUFJLElBQUk3VSxLQUFWLENBQUosRUFBc0I7Q0FDckIsWUFBSSxDQUFDbVUsWUFBTCxFQUFtQjtDQUNsQixnQkFBTSxJQUFJdEUsWUFBSixDQUFlLHdCQUF3QnhQLElBQXhCLEdBQStCLDZDQUE5QyxDQUFOO0NBQ0E7O0NBQ0QsZUFBTyxLQUFLd0gsV0FBWjtDQUNBOztDQUNELFVBQUltSSxLQUFLLElBQUsxVixDQUFDLEdBQUcsQ0FBTCxJQUFXK0QsS0FBSyxDQUFDaEUsTUFBOUIsRUFBc0M7Q0FDckMsWUFBSXlhLElBQUksR0FBRzlFLEtBQUssQ0FBQ2hRLEtBQUQsRUFBUTZVLElBQVIsQ0FBaEI7Q0FDQUQsUUFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBQ0UsSUFBVixDQUZxQzs7Ozs7Ozs7Q0FXckMsWUFBSUYsS0FBSyxJQUFJLFNBQVNFLElBQWxCLElBQTBCLEVBQUUsbUJBQW1CQSxJQUFJLENBQUN6RSxHQUExQixDQUE5QixFQUE4RDtDQUM3RHJRLFVBQUFBLEtBQUssR0FBRzhVLElBQUksQ0FBQ3pFLEdBQWI7Q0FDQSxTQUZELE1BRU87Q0FDTnJRLFVBQUFBLEtBQUssR0FBR0EsS0FBSyxDQUFDNlUsSUFBRCxDQUFiO0NBQ0E7Q0FDRCxPQWhCRCxNQWdCTztDQUNORCxRQUFBQSxLQUFLLEdBQUd4QixRQUFNLENBQUNwVCxLQUFELEVBQVE2VSxJQUFSLENBQWQ7Q0FDQTdVLFFBQUFBLEtBQUssR0FBR0EsS0FBSyxDQUFDNlUsSUFBRCxDQUFiO0NBQ0E7O0NBRUQsVUFBSUQsS0FBSyxJQUFJLENBQUNELGtCQUFkLEVBQWtDO0NBQ2pDOUQsUUFBQUEsVUFBVSxDQUFDNkQsaUJBQUQsQ0FBVixHQUFnQzFVLEtBQWhDO0NBQ0E7Q0FDRDtDQUNEOztDQUNELFNBQU9BLEtBQVA7Q0FDQTs7Ozs7O0NDdlVELE1BQUlsRyxJQUFJLEdBQUdVLFlBQVg7Q0FDQSxNQUFJK1osWUFBWSxHQUFHcFIsWUFBbkI7Q0FFQSxNQUFJNFIsTUFBTSxHQUFHUixZQUFZLENBQUMsNEJBQUQsQ0FBekI7Q0FDQSxNQUFJUyxLQUFLLEdBQUdULFlBQVksQ0FBQywyQkFBRCxDQUF4QjtDQUNBLE1BQUlVLGFBQWEsR0FBR1YsWUFBWSxDQUFDLGlCQUFELEVBQW9CLElBQXBCLENBQVosSUFBeUN6YSxJQUFJLENBQUNnQixJQUFMLENBQVVrYSxLQUFWLEVBQWlCRCxNQUFqQixDQUE3RDtDQUVBLE1BQUkvRSxLQUFLLEdBQUd1RSxZQUFZLENBQUMsbUNBQUQsRUFBc0MsSUFBdEMsQ0FBeEI7Q0FDQSxNQUFJVyxlQUFlLEdBQUdYLFlBQVksQ0FBQyx5QkFBRCxFQUE0QixJQUE1QixDQUFsQztDQUNBLE1BQUlZLElBQUksR0FBR1osWUFBWSxDQUFDLFlBQUQsQ0FBdkI7O0NBRUEsTUFBSVcsZUFBSixFQUFxQjtDQUNwQixRQUFJO0NBQ0hBLE1BQUFBLGVBQWUsQ0FBQyxFQUFELEVBQUssR0FBTCxFQUFVO0NBQUVsVixRQUFBQSxLQUFLLEVBQUU7Q0FBVCxPQUFWLENBQWY7Q0FDQSxLQUZELENBRUUsT0FBT2dJLENBQVAsRUFBVTs7Q0FFWGtOLE1BQUFBLGVBQWUsR0FBRyxJQUFsQjtDQUNBO0NBQ0Q7O0NBRURFLEVBQUFBLGNBQUEsR0FBaUIsU0FBU0MsUUFBVCxDQUFrQkMsZ0JBQWxCLEVBQW9DO0NBQ3BELFFBQUlDLElBQUksR0FBR04sYUFBYSxDQUFDbmIsSUFBRCxFQUFPa2IsS0FBUCxFQUFjNWEsU0FBZCxDQUF4Qjs7Q0FDQSxRQUFJNFYsS0FBSyxJQUFJa0YsZUFBYixFQUE4QjtDQUM3QixVQUFJSixJQUFJLEdBQUc5RSxLQUFLLENBQUN1RixJQUFELEVBQU8sUUFBUCxDQUFoQjs7Q0FDQSxVQUFJVCxJQUFJLENBQUNVLFlBQVQsRUFBdUI7O0NBRXRCTixRQUFBQSxlQUFlLENBQ2RLLElBRGMsRUFFZCxRQUZjLEVBR2Q7Q0FBRXZWLFVBQUFBLEtBQUssRUFBRSxJQUFJbVYsSUFBSSxDQUFDLENBQUQsRUFBSUcsZ0JBQWdCLENBQUNqYixNQUFqQixJQUEyQkQsU0FBUyxDQUFDQyxNQUFWLEdBQW1CLENBQTlDLENBQUo7Q0FBakIsU0FIYyxDQUFmO0NBS0E7Q0FDRDs7Q0FDRCxXQUFPa2IsSUFBUDtDQUNBLEdBZEQ7O0NBZ0JBLE1BQUlFLFNBQVMsR0FBRyxTQUFTQSxTQUFULEdBQXFCO0NBQ3BDLFdBQU9SLGFBQWEsQ0FBQ25iLElBQUQsRUFBT2liLE1BQVAsRUFBZTNhLFNBQWYsQ0FBcEI7Q0FDQSxHQUZEOztDQUlBLE1BQUk4YSxlQUFKLEVBQXFCO0NBQ3BCQSxJQUFBQSxlQUFlLENBQUNFLE1BQU0sQ0FBQ00sT0FBUixFQUFpQixPQUFqQixFQUEwQjtDQUFFMVYsTUFBQUEsS0FBSyxFQUFFeVY7Q0FBVCxLQUExQixDQUFmO0NBQ0EsR0FGRCxNQUVPO0NBQ05MLElBQUFBLGNBQUEsTUFBQSxHQUF1QkssU0FBdkI7Ozs7Q0MzQ0QsSUFBSWxCLGNBQVksR0FBRy9aLFlBQW5CO0NBRUEsSUFBSTZhLFFBQVEsR0FBR2xTLGtCQUFmO0NBRUEsSUFBSXdTLFFBQVEsR0FBR04sUUFBUSxDQUFDZCxjQUFZLENBQUMsMEJBQUQsQ0FBYixDQUF2Qjs7S0FFQXFCLFdBQWMsR0FBRyxTQUFTQyxrQkFBVCxDQUE0QnhWLElBQTVCLEVBQWtDOFQsWUFBbEMsRUFBZ0Q7Q0FDaEUsTUFBSU0sU0FBUyxHQUFHRixjQUFZLENBQUNsVSxJQUFELEVBQU8sQ0FBQyxDQUFDOFQsWUFBVCxDQUE1Qjs7Q0FDQSxNQUFJLE9BQU9NLFNBQVAsS0FBcUIsVUFBckIsSUFBbUNrQixRQUFRLENBQUN0VixJQUFELEVBQU8sYUFBUCxDQUFSLEdBQWdDLENBQUMsQ0FBeEUsRUFBMkU7Q0FDMUUsV0FBT2dWLFFBQVEsQ0FBQ1osU0FBRCxDQUFmO0NBQ0E7O0NBQ0QsU0FBT0EsU0FBUDtDQUNBOzs7Ozs7Ozs7OztDQ2RELElBQUlxQixNQUFNLEdBQUcsT0FBTy9ELEdBQVAsS0FBZSxVQUFmLElBQTZCQSxHQUFHLENBQUNwWCxTQUE5QztDQUNBLElBQUlvYixpQkFBaUIsR0FBR3JiLE1BQU0sQ0FBQzBULHdCQUFQLElBQW1DMEgsTUFBbkMsR0FBNENwYixNQUFNLENBQUMwVCx3QkFBUCxDQUFnQzJELEdBQUcsQ0FBQ3BYLFNBQXBDLEVBQStDLE1BQS9DLENBQTVDLEdBQXFHLElBQTdIO0NBQ0EsSUFBSXFiLE9BQU8sR0FBR0YsTUFBTSxJQUFJQyxpQkFBVixJQUErQixPQUFPQSxpQkFBaUIsQ0FBQzFGLEdBQXpCLEtBQWlDLFVBQWhFLEdBQTZFMEYsaUJBQWlCLENBQUMxRixHQUEvRixHQUFxRyxJQUFuSDtDQUNBLElBQUk0RixVQUFVLEdBQUdILE1BQU0sSUFBSS9ELEdBQUcsQ0FBQ3BYLFNBQUosQ0FBY29DLE9BQXpDO0NBQ0EsSUFBSW1aLE1BQU0sR0FBRyxPQUFPM0QsR0FBUCxLQUFlLFVBQWYsSUFBNkJBLEdBQUcsQ0FBQzVYLFNBQTlDO0NBQ0EsSUFBSXdiLGlCQUFpQixHQUFHemIsTUFBTSxDQUFDMFQsd0JBQVAsSUFBbUM4SCxNQUFuQyxHQUE0Q3hiLE1BQU0sQ0FBQzBULHdCQUFQLENBQWdDbUUsR0FBRyxDQUFDNVgsU0FBcEMsRUFBK0MsTUFBL0MsQ0FBNUMsR0FBcUcsSUFBN0g7Q0FDQSxJQUFJeWIsT0FBTyxHQUFHRixNQUFNLElBQUlDLGlCQUFWLElBQStCLE9BQU9BLGlCQUFpQixDQUFDOUYsR0FBekIsS0FBaUMsVUFBaEUsR0FBNkU4RixpQkFBaUIsQ0FBQzlGLEdBQS9GLEdBQXFHLElBQW5IO0NBQ0EsSUFBSWdHLFVBQVUsR0FBR0gsTUFBTSxJQUFJM0QsR0FBRyxDQUFDNVgsU0FBSixDQUFjb0MsT0FBekM7Q0FDQSxJQUFJdVosVUFBVSxHQUFHLE9BQU94RCxPQUFQLEtBQW1CLFVBQW5CLElBQWlDQSxPQUFPLENBQUNuWSxTQUExRDtDQUNBLElBQUk0YixVQUFVLEdBQUdELFVBQVUsR0FBR3hELE9BQU8sQ0FBQ25ZLFNBQVIsQ0FBa0I2YixHQUFyQixHQUEyQixJQUF0RDtDQUNBLElBQUlDLFVBQVUsR0FBRyxPQUFPekQsT0FBUCxLQUFtQixVQUFuQixJQUFpQ0EsT0FBTyxDQUFDclksU0FBMUQ7Q0FDQSxJQUFJK2IsVUFBVSxHQUFHRCxVQUFVLEdBQUd6RCxPQUFPLENBQUNyWSxTQUFSLENBQWtCNmIsR0FBckIsR0FBMkIsSUFBdEQ7Q0FDQSxJQUFJRyxVQUFVLEdBQUcsT0FBTzVELE9BQVAsS0FBbUIsVUFBbkIsSUFBaUNBLE9BQU8sQ0FBQ3BZLFNBQTFEO0NBQ0EsSUFBSWljLFlBQVksR0FBR0QsVUFBVSxHQUFHNUQsT0FBTyxDQUFDcFksU0FBUixDQUFrQmtjLEtBQXJCLEdBQTZCLElBQTFEO0NBQ0EsSUFBSUMsY0FBYyxHQUFHN0YsT0FBTyxDQUFDdFcsU0FBUixDQUFrQm9jLE9BQXZDO0NBQ0EsSUFBSUMsY0FBYyxHQUFHdGMsTUFBTSxDQUFDQyxTQUFQLENBQWlCRixRQUF0QztDQUNBLElBQUl3YyxnQkFBZ0IsR0FBRzNILFFBQVEsQ0FBQzNVLFNBQVQsQ0FBbUJGLFFBQTFDO0NBQ0EsSUFBSStILEtBQUssR0FBR2lRLE1BQU0sQ0FBQzlYLFNBQVAsQ0FBaUI2SCxLQUE3QjtDQUNBLElBQUkwVSxhQUFhLEdBQUcsT0FBT2xHLE1BQVAsS0FBa0IsVUFBbEIsR0FBK0JBLE1BQU0sQ0FBQ3JXLFNBQVAsQ0FBaUJvYyxPQUFoRCxHQUEwRCxJQUE5RTtDQUNBLElBQUlJLElBQUksR0FBR3pjLE1BQU0sQ0FBQ2tULHFCQUFsQjtDQUNBLElBQUl3SixXQUFXLEdBQUcsT0FBT3pKLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsUUFBT0EsTUFBTSxDQUFDRSxRQUFkLE1BQTJCLFFBQTNELEdBQXNFRixNQUFNLENBQUNoVCxTQUFQLENBQWlCRixRQUF2RixHQUFrRyxJQUFwSDtDQUNBLElBQUk0YyxpQkFBaUIsR0FBRyxPQUFPMUosTUFBUCxLQUFrQixVQUFsQixJQUFnQyxRQUFPQSxNQUFNLENBQUNFLFFBQWQsTUFBMkIsUUFBbkY7Q0FDQSxJQUFJeUosWUFBWSxHQUFHNWMsTUFBTSxDQUFDQyxTQUFQLENBQWlCd1Qsb0JBQXBDO0NBRUEsSUFBSW9KLEdBQUcsR0FBRyxDQUFDLE9BQU9qRixPQUFQLEtBQW1CLFVBQW5CLEdBQWdDQSxPQUFPLENBQUN4VyxjQUF4QyxHQUF5RHBCLE1BQU0sQ0FBQ29CLGNBQWpFLE1BQ04sR0FBRzJVLFNBQUgsS0FBaUJ0VyxLQUFLLENBQUNRLFNBQXZCO0NBQUEsRUFDTSxVQUFVNmMsQ0FBVixFQUFhO0NBQ1gsU0FBT0EsQ0FBQyxDQUFDL0csU0FBVCxDQURXO0NBRWQsQ0FITCxHQUlNLElBTEEsQ0FBVjtDQVFBLElBQUlnSCxhQUFhLEdBQUdqZCxVQUF5QixDQUFDa2QsTUFBOUM7Q0FDQSxJQUFJQyxhQUFhLEdBQUdGLGFBQWEsSUFBSUcsUUFBUSxDQUFDSCxhQUFELENBQXpCLEdBQTJDQSxhQUEzQyxHQUEyRCxJQUEvRTtDQUNBLElBQUlJLFdBQVcsR0FBRyxPQUFPbEssTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPQSxNQUFNLENBQUNrSyxXQUFkLEtBQThCLFdBQTlELEdBQTRFbEssTUFBTSxDQUFDa0ssV0FBbkYsR0FBaUcsSUFBbkg7O0tBRUFDLGFBQWMsR0FBRyxTQUFTQyxRQUFULENBQWtCL2EsR0FBbEIsRUFBdUJnYixPQUF2QixFQUFnQ0MsS0FBaEMsRUFBdUNDLElBQXZDLEVBQTZDO0NBQzFELE1BQUlDLElBQUksR0FBR0gsT0FBTyxJQUFJLEVBQXRCOztDQUVBLE1BQUl4QixLQUFHLENBQUMyQixJQUFELEVBQU8sWUFBUCxDQUFILElBQTRCQSxJQUFJLENBQUNDLFVBQUwsS0FBb0IsUUFBcEIsSUFBZ0NELElBQUksQ0FBQ0MsVUFBTCxLQUFvQixRQUFwRixFQUErRjtDQUMzRixVQUFNLElBQUloTSxTQUFKLENBQWMsa0RBQWQsQ0FBTjtDQUNIOztDQUNELE1BQ0lvSyxLQUFHLENBQUMyQixJQUFELEVBQU8saUJBQVAsQ0FBSCxLQUFpQyxPQUFPQSxJQUFJLENBQUNFLGVBQVosS0FBZ0MsUUFBaEMsR0FDM0JGLElBQUksQ0FBQ0UsZUFBTCxHQUF1QixDQUF2QixJQUE0QkYsSUFBSSxDQUFDRSxlQUFMLEtBQXlCQyxRQUQxQixHQUUzQkgsSUFBSSxDQUFDRSxlQUFMLEtBQXlCLElBRi9CLENBREosRUFLRTtDQUNFLFVBQU0sSUFBSWpNLFNBQUosQ0FBYyx3RkFBZCxDQUFOO0NBQ0g7O0NBQ0QsTUFBSW1NLGFBQWEsR0FBRy9CLEtBQUcsQ0FBQzJCLElBQUQsRUFBTyxlQUFQLENBQUgsR0FBNkJBLElBQUksQ0FBQ0ksYUFBbEMsR0FBa0QsSUFBdEU7O0NBQ0EsTUFBSSxPQUFPQSxhQUFQLEtBQXlCLFNBQXpCLElBQXNDQSxhQUFhLEtBQUssUUFBNUQsRUFBc0U7Q0FDbEUsVUFBTSxJQUFJbk0sU0FBSixDQUFjLCtFQUFkLENBQU47Q0FDSDs7Q0FFRCxNQUNJb0ssS0FBRyxDQUFDMkIsSUFBRCxFQUFPLFFBQVAsQ0FBSCxJQUNHQSxJQUFJLENBQUNLLE1BQUwsS0FBZ0IsSUFEbkIsSUFFR0wsSUFBSSxDQUFDSyxNQUFMLEtBQWdCLElBRm5CLElBR0csRUFBRXRHLFFBQVEsQ0FBQ2lHLElBQUksQ0FBQ0ssTUFBTixFQUFjLEVBQWQsQ0FBUixLQUE4QkwsSUFBSSxDQUFDSyxNQUFuQyxJQUE2Q0wsSUFBSSxDQUFDSyxNQUFMLEdBQWMsQ0FBN0QsQ0FKUCxFQUtFO0NBQ0UsVUFBTSxJQUFJcE0sU0FBSixDQUFjLDJEQUFkLENBQU47Q0FDSDs7Q0FFRCxNQUFJLE9BQU9wUCxHQUFQLEtBQWUsV0FBbkIsRUFBZ0M7Q0FDNUIsV0FBTyxXQUFQO0NBQ0g7O0NBQ0QsTUFBSUEsR0FBRyxLQUFLLElBQVosRUFBa0I7Q0FDZCxXQUFPLE1BQVA7Q0FDSDs7Q0FDRCxNQUFJLE9BQU9BLEdBQVAsS0FBZSxTQUFuQixFQUE4QjtDQUMxQixXQUFPQSxHQUFHLEdBQUcsTUFBSCxHQUFZLE9BQXRCO0NBQ0g7O0NBRUQsTUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7Q0FDekIsV0FBT3liLGFBQWEsQ0FBQ3piLEdBQUQsRUFBTW1iLElBQU4sQ0FBcEI7Q0FDSDs7Q0FDRCxNQUFJLE9BQU9uYixHQUFQLEtBQWUsUUFBbkIsRUFBNkI7Q0FDekIsUUFBSUEsR0FBRyxLQUFLLENBQVosRUFBZTtDQUNYLGFBQU9zYixRQUFRLEdBQUd0YixHQUFYLEdBQWlCLENBQWpCLEdBQXFCLEdBQXJCLEdBQTJCLElBQWxDO0NBQ0g7O0NBQ0QsV0FBT3lWLE1BQU0sQ0FBQ3pWLEdBQUQsQ0FBYjtDQUNIOztDQUNELE1BQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0NBQ3pCLFdBQU95VixNQUFNLENBQUN6VixHQUFELENBQU4sR0FBYyxHQUFyQjtDQUNIOztDQUVELE1BQUkwYixRQUFRLEdBQUcsT0FBT1AsSUFBSSxDQUFDRixLQUFaLEtBQXNCLFdBQXRCLEdBQW9DLENBQXBDLEdBQXdDRSxJQUFJLENBQUNGLEtBQTVEOztDQUNBLE1BQUksT0FBT0EsS0FBUCxLQUFpQixXQUFyQixFQUFrQztDQUFFQSxJQUFBQSxLQUFLLEdBQUcsQ0FBUjtDQUFZOztDQUNoRCxNQUFJQSxLQUFLLElBQUlTLFFBQVQsSUFBcUJBLFFBQVEsR0FBRyxDQUFoQyxJQUFxQyxRQUFPMWIsR0FBUCxNQUFlLFFBQXhELEVBQWtFO0NBQzlELFdBQU9wQyxTQUFPLENBQUNvQyxHQUFELENBQVAsR0FBZSxTQUFmLEdBQTJCLFVBQWxDO0NBQ0g7O0NBRUQsTUFBSXdiLE1BQU0sR0FBR0csU0FBUyxDQUFDUixJQUFELEVBQU9GLEtBQVAsQ0FBdEI7O0NBRUEsTUFBSSxPQUFPQyxJQUFQLEtBQWdCLFdBQXBCLEVBQWlDO0NBQzdCQSxJQUFBQSxJQUFJLEdBQUcsRUFBUDtDQUNILEdBRkQsTUFFTyxJQUFJblosT0FBTyxDQUFDbVosSUFBRCxFQUFPbGIsR0FBUCxDQUFQLElBQXNCLENBQTFCLEVBQTZCO0NBQ2hDLFdBQU8sWUFBUDtDQUNIOztDQUVELFdBQVM0YixPQUFULENBQWlCNVksS0FBakIsRUFBd0I2WSxJQUF4QixFQUE4QkMsUUFBOUIsRUFBd0M7Q0FDcEMsUUFBSUQsSUFBSixFQUFVO0NBQ05YLE1BQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDNWEsS0FBTCxFQUFQO0NBQ0E0YSxNQUFBQSxJQUFJLENBQUN0WixJQUFMLENBQVVpYSxJQUFWO0NBQ0g7O0NBQ0QsUUFBSUMsUUFBSixFQUFjO0NBQ1YsVUFBSUMsT0FBTyxHQUFHO0NBQ1ZkLFFBQUFBLEtBQUssRUFBRUUsSUFBSSxDQUFDRjtDQURGLE9BQWQ7O0NBR0EsVUFBSXpCLEtBQUcsQ0FBQzJCLElBQUQsRUFBTyxZQUFQLENBQVAsRUFBNkI7Q0FDekJZLFFBQUFBLE9BQU8sQ0FBQ1gsVUFBUixHQUFxQkQsSUFBSSxDQUFDQyxVQUExQjtDQUNIOztDQUNELGFBQU9MLFFBQVEsQ0FBQy9YLEtBQUQsRUFBUStZLE9BQVIsRUFBaUJkLEtBQUssR0FBRyxDQUF6QixFQUE0QkMsSUFBNUIsQ0FBZjtDQUNIOztDQUNELFdBQU9ILFFBQVEsQ0FBQy9YLEtBQUQsRUFBUW1ZLElBQVIsRUFBY0YsS0FBSyxHQUFHLENBQXRCLEVBQXlCQyxJQUF6QixDQUFmO0NBQ0g7O0NBRUQsTUFBSSxPQUFPbGIsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0NBQzNCLFFBQUlxRCxJQUFJLEdBQUcyWSxNQUFNLENBQUNoYyxHQUFELENBQWpCO0NBQ0EsUUFBSWtPLElBQUksR0FBRytOLFVBQVUsQ0FBQ2pjLEdBQUQsRUFBTTRiLE9BQU4sQ0FBckI7Q0FDQSxXQUFPLGVBQWV2WSxJQUFJLEdBQUcsT0FBT0EsSUFBVixHQUFpQixjQUFwQyxJQUFzRCxHQUF0RCxJQUE2RDZLLElBQUksQ0FBQzdRLE1BQUwsR0FBYyxDQUFkLEdBQWtCLFFBQVE2USxJQUFJLENBQUNyTSxJQUFMLENBQVUsSUFBVixDQUFSLEdBQTBCLElBQTVDLEdBQW1ELEVBQWhILENBQVA7Q0FDSDs7Q0FDRCxNQUFJK1ksUUFBUSxDQUFDNWEsR0FBRCxDQUFaLEVBQW1CO0NBQ2YsUUFBSWtjLFNBQVMsR0FBRzdCLGlCQUFpQixHQUFHNUUsTUFBTSxDQUFDelYsR0FBRCxDQUFOLENBQVlQLE9BQVosQ0FBb0Isd0JBQXBCLEVBQThDLElBQTlDLENBQUgsR0FBeUQyYSxXQUFXLENBQUN0YyxJQUFaLENBQWlCa0MsR0FBakIsQ0FBMUY7Q0FDQSxXQUFPLFFBQU9BLEdBQVAsTUFBZSxRQUFmLElBQTJCLENBQUNxYSxpQkFBNUIsR0FBZ0Q4QixTQUFTLENBQUNELFNBQUQsQ0FBekQsR0FBdUVBLFNBQTlFO0NBQ0g7O0NBQ0QsTUFBSUUsU0FBUyxDQUFDcGMsR0FBRCxDQUFiLEVBQW9CO0NBQ2hCLFFBQUlxYyxDQUFDLEdBQUcsTUFBTTVHLE1BQU0sQ0FBQ3pWLEdBQUcsQ0FBQ3NjLFFBQUwsQ0FBTixDQUFxQnpWLFdBQXJCLEVBQWQ7Q0FDQSxRQUFJMFYsS0FBSyxHQUFHdmMsR0FBRyxDQUFDd2MsVUFBSixJQUFrQixFQUE5Qjs7Q0FDQSxTQUFLLElBQUlsZixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaWYsS0FBSyxDQUFDbGYsTUFBMUIsRUFBa0NDLENBQUMsRUFBbkMsRUFBdUM7Q0FDbkMrZSxNQUFBQSxDQUFDLElBQUksTUFBTUUsS0FBSyxDQUFDamYsQ0FBRCxDQUFMLENBQVMrRixJQUFmLEdBQXNCLEdBQXRCLEdBQTRCb1osVUFBVSxDQUFDekYsS0FBSyxDQUFDdUYsS0FBSyxDQUFDamYsQ0FBRCxDQUFMLENBQVMwRixLQUFWLENBQU4sRUFBd0IsUUFBeEIsRUFBa0NtWSxJQUFsQyxDQUEzQztDQUNIOztDQUNEa0IsSUFBQUEsQ0FBQyxJQUFJLEdBQUw7O0NBQ0EsUUFBSXJjLEdBQUcsQ0FBQzBjLFVBQUosSUFBa0IxYyxHQUFHLENBQUMwYyxVQUFKLENBQWVyZixNQUFyQyxFQUE2QztDQUFFZ2YsTUFBQUEsQ0FBQyxJQUFJLEtBQUw7Q0FBYTs7Q0FDNURBLElBQUFBLENBQUMsSUFBSSxPQUFPNUcsTUFBTSxDQUFDelYsR0FBRyxDQUFDc2MsUUFBTCxDQUFOLENBQXFCelYsV0FBckIsRUFBUCxHQUE0QyxHQUFqRDtDQUNBLFdBQU93VixDQUFQO0NBQ0g7O0NBQ0QsTUFBSXplLFNBQU8sQ0FBQ29DLEdBQUQsQ0FBWCxFQUFrQjtDQUNkLFFBQUlBLEdBQUcsQ0FBQzNDLE1BQUosS0FBZSxDQUFuQixFQUFzQjtDQUFFLGFBQU8sSUFBUDtDQUFjOztDQUN0QyxRQUFJc2YsRUFBRSxHQUFHVixVQUFVLENBQUNqYyxHQUFELEVBQU00YixPQUFOLENBQW5COztDQUNBLFFBQUlKLE1BQU0sSUFBSSxDQUFDb0IsZ0JBQWdCLENBQUNELEVBQUQsQ0FBL0IsRUFBcUM7Q0FDakMsYUFBTyxNQUFNRSxZQUFZLENBQUNGLEVBQUQsRUFBS25CLE1BQUwsQ0FBbEIsR0FBaUMsR0FBeEM7Q0FDSDs7Q0FDRCxXQUFPLE9BQU9tQixFQUFFLENBQUM5YSxJQUFILENBQVEsSUFBUixDQUFQLEdBQXVCLElBQTlCO0NBQ0g7O0NBQ0QsTUFBSWliLE9BQU8sQ0FBQzljLEdBQUQsQ0FBWCxFQUFrQjtDQUNkLFFBQUlxQixLQUFLLEdBQUc0YSxVQUFVLENBQUNqYyxHQUFELEVBQU00YixPQUFOLENBQXRCOztDQUNBLFFBQUl2YSxLQUFLLENBQUNoRSxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0NBQUUsYUFBTyxNQUFNb1ksTUFBTSxDQUFDelYsR0FBRCxDQUFaLEdBQW9CLEdBQTNCO0NBQWlDOztDQUMzRCxXQUFPLFFBQVF5VixNQUFNLENBQUN6VixHQUFELENBQWQsR0FBc0IsSUFBdEIsR0FBNkJxQixLQUFLLENBQUNRLElBQU4sQ0FBVyxJQUFYLENBQTdCLEdBQWdELElBQXZEO0NBQ0g7O0NBQ0QsTUFBSSxRQUFPN0IsR0FBUCxNQUFlLFFBQWYsSUFBMkJ1YixhQUEvQixFQUE4QztDQUMxQyxRQUFJWixhQUFhLElBQUksT0FBTzNhLEdBQUcsQ0FBQzJhLGFBQUQsQ0FBVixLQUE4QixVQUFuRCxFQUErRDtDQUMzRCxhQUFPM2EsR0FBRyxDQUFDMmEsYUFBRCxDQUFILEVBQVA7Q0FDSCxLQUZELE1BRU8sSUFBSVksYUFBYSxLQUFLLFFBQWxCLElBQThCLE9BQU92YixHQUFHLENBQUM0YixPQUFYLEtBQXVCLFVBQXpELEVBQXFFO0NBQ3hFLGFBQU81YixHQUFHLENBQUM0YixPQUFKLEVBQVA7Q0FDSDtDQUNKOztDQUNELE1BQUltQixLQUFLLENBQUMvYyxHQUFELENBQVQsRUFBZ0I7Q0FDWixRQUFJZ2QsUUFBUSxHQUFHLEVBQWY7Q0FDQS9ELElBQUFBLFVBQVUsQ0FBQ25iLElBQVgsQ0FBZ0JrQyxHQUFoQixFQUFxQixVQUFVZ0QsS0FBVixFQUFpQjlDLEdBQWpCLEVBQXNCO0NBQ3ZDOGMsTUFBQUEsUUFBUSxDQUFDcGIsSUFBVCxDQUFjZ2EsT0FBTyxDQUFDMWIsR0FBRCxFQUFNRixHQUFOLEVBQVcsSUFBWCxDQUFQLEdBQTBCLE1BQTFCLEdBQW1DNGIsT0FBTyxDQUFDNVksS0FBRCxFQUFRaEQsR0FBUixDQUF4RDtDQUNILEtBRkQ7Q0FHQSxXQUFPaWQsWUFBWSxDQUFDLEtBQUQsRUFBUWpFLE9BQU8sQ0FBQ2xiLElBQVIsQ0FBYWtDLEdBQWIsQ0FBUixFQUEyQmdkLFFBQTNCLEVBQXFDeEIsTUFBckMsQ0FBbkI7Q0FDSDs7Q0FDRCxNQUFJMEIsS0FBSyxDQUFDbGQsR0FBRCxDQUFULEVBQWdCO0NBQ1osUUFBSW1kLFFBQVEsR0FBRyxFQUFmO0NBQ0E5RCxJQUFBQSxVQUFVLENBQUN2YixJQUFYLENBQWdCa0MsR0FBaEIsRUFBcUIsVUFBVWdELEtBQVYsRUFBaUI7Q0FDbENtYSxNQUFBQSxRQUFRLENBQUN2YixJQUFULENBQWNnYSxPQUFPLENBQUM1WSxLQUFELEVBQVFoRCxHQUFSLENBQXJCO0NBQ0gsS0FGRDtDQUdBLFdBQU9pZCxZQUFZLENBQUMsS0FBRCxFQUFRN0QsT0FBTyxDQUFDdGIsSUFBUixDQUFha0MsR0FBYixDQUFSLEVBQTJCbWQsUUFBM0IsRUFBcUMzQixNQUFyQyxDQUFuQjtDQUNIOztDQUNELE1BQUk0QixTQUFTLENBQUNwZCxHQUFELENBQWIsRUFBb0I7Q0FDaEIsV0FBT3FkLGdCQUFnQixDQUFDLFNBQUQsQ0FBdkI7Q0FDSDs7Q0FDRCxNQUFJQyxTQUFTLENBQUN0ZCxHQUFELENBQWIsRUFBb0I7Q0FDaEIsV0FBT3FkLGdCQUFnQixDQUFDLFNBQUQsQ0FBdkI7Q0FDSDs7Q0FDRCxNQUFJRSxTQUFTLENBQUN2ZCxHQUFELENBQWIsRUFBb0I7Q0FDaEIsV0FBT3FkLGdCQUFnQixDQUFDLFNBQUQsQ0FBdkI7Q0FDSDs7Q0FDRCxNQUFJMWUsUUFBUSxDQUFDcUIsR0FBRCxDQUFaLEVBQW1CO0NBQ2YsV0FBT21jLFNBQVMsQ0FBQ1AsT0FBTyxDQUFDNUcsTUFBTSxDQUFDaFYsR0FBRCxDQUFQLENBQVIsQ0FBaEI7Q0FDSDs7Q0FDRCxNQUFJd2QsUUFBUSxDQUFDeGQsR0FBRCxDQUFaLEVBQW1CO0NBQ2YsV0FBT21jLFNBQVMsQ0FBQ1AsT0FBTyxDQUFDMUIsYUFBYSxDQUFDcGMsSUFBZCxDQUFtQmtDLEdBQW5CLENBQUQsQ0FBUixDQUFoQjtDQUNIOztDQUNELE1BQUl5ZCxTQUFTLENBQUN6ZCxHQUFELENBQWIsRUFBb0I7Q0FDaEIsV0FBT21jLFNBQVMsQ0FBQ3JDLGNBQWMsQ0FBQ2hjLElBQWYsQ0FBb0JrQyxHQUFwQixDQUFELENBQWhCO0NBQ0g7O0NBQ0QsTUFBSXRCLFFBQVEsQ0FBQ3NCLEdBQUQsQ0FBWixFQUFtQjtDQUNmLFdBQU9tYyxTQUFTLENBQUNQLE9BQU8sQ0FBQ25HLE1BQU0sQ0FBQ3pWLEdBQUQsQ0FBUCxDQUFSLENBQWhCO0NBQ0g7O0NBQ0QsTUFBSSxDQUFDakIsTUFBTSxDQUFDaUIsR0FBRCxDQUFQLElBQWdCLENBQUMwZCxVQUFRLENBQUMxZCxHQUFELENBQTdCLEVBQW9DO0NBQ2hDLFFBQUkyZCxFQUFFLEdBQUcxQixVQUFVLENBQUNqYyxHQUFELEVBQU00YixPQUFOLENBQW5CO0NBQ0EsUUFBSS9jLGFBQWEsR0FBRzBiLEdBQUcsR0FBR0EsR0FBRyxDQUFDdmEsR0FBRCxDQUFILEtBQWF0QyxNQUFNLENBQUNDLFNBQXZCLEdBQW1DcUMsR0FBRyxZQUFZdEMsTUFBZixJQUF5QnNDLEdBQUcsQ0FBQy9CLFdBQUosS0FBb0JQLE1BQXZHO0NBQ0EsUUFBSWtnQixRQUFRLEdBQUc1ZCxHQUFHLFlBQVl0QyxNQUFmLEdBQXdCLEVBQXhCLEdBQTZCLGdCQUE1QztDQUNBLFFBQUltZ0IsU0FBUyxHQUFHLENBQUNoZixhQUFELElBQWtCZ2MsV0FBbEIsSUFBaUNuZCxNQUFNLENBQUNzQyxHQUFELENBQU4sS0FBZ0JBLEdBQWpELElBQXdENmEsV0FBVyxJQUFJN2EsR0FBdkUsR0FBNkU0UixLQUFLLENBQUM1UixHQUFELENBQUwsQ0FBV00sS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFDLENBQXJCLENBQTdFLEdBQXVHc2QsUUFBUSxHQUFHLFFBQUgsR0FBYyxFQUE3STtDQUNBLFFBQUlFLGNBQWMsR0FBR2pmLGFBQWEsSUFBSSxPQUFPbUIsR0FBRyxDQUFDL0IsV0FBWCxLQUEyQixVQUE1QyxHQUF5RCxFQUF6RCxHQUE4RCtCLEdBQUcsQ0FBQy9CLFdBQUosQ0FBZ0JvRixJQUFoQixHQUF1QnJELEdBQUcsQ0FBQy9CLFdBQUosQ0FBZ0JvRixJQUFoQixHQUF1QixHQUE5QyxHQUFvRCxFQUF2STtDQUNBLFFBQUkwYSxHQUFHLEdBQUdELGNBQWMsSUFBSUQsU0FBUyxJQUFJRCxRQUFiLEdBQXdCLE1BQU0sR0FBRzlXLE1BQUgsQ0FBVStXLFNBQVMsSUFBSSxFQUF2QixFQUEyQkQsUUFBUSxJQUFJLEVBQXZDLEVBQTJDL2IsSUFBM0MsQ0FBZ0QsSUFBaEQsQ0FBTixHQUE4RCxJQUF0RixHQUE2RixFQUFqRyxDQUF4Qjs7Q0FDQSxRQUFJOGIsRUFBRSxDQUFDdGdCLE1BQUgsS0FBYyxDQUFsQixFQUFxQjtDQUFFLGFBQU8wZ0IsR0FBRyxHQUFHLElBQWI7Q0FBb0I7O0NBQzNDLFFBQUl2QyxNQUFKLEVBQVk7Q0FDUixhQUFPdUMsR0FBRyxHQUFHLEdBQU4sR0FBWWxCLFlBQVksQ0FBQ2MsRUFBRCxFQUFLbkMsTUFBTCxDQUF4QixHQUF1QyxHQUE5QztDQUNIOztDQUNELFdBQU91QyxHQUFHLEdBQUcsSUFBTixHQUFhSixFQUFFLENBQUM5YixJQUFILENBQVEsSUFBUixDQUFiLEdBQTZCLElBQXBDO0NBQ0g7O0NBQ0QsU0FBTzRULE1BQU0sQ0FBQ3pWLEdBQUQsQ0FBYjtDQUNIOztDQUVELFNBQVN5YyxVQUFULENBQW9CSixDQUFwQixFQUF1QjJCLFlBQXZCLEVBQXFDN0MsSUFBckMsRUFBMkM7Q0FDdkMsTUFBSThDLFNBQVMsR0FBRyxDQUFDOUMsSUFBSSxDQUFDQyxVQUFMLElBQW1CNEMsWUFBcEIsTUFBc0MsUUFBdEMsR0FBaUQsR0FBakQsR0FBdUQsR0FBdkU7Q0FDQSxTQUFPQyxTQUFTLEdBQUc1QixDQUFaLEdBQWdCNEIsU0FBdkI7Q0FDSDs7Q0FFRCxTQUFTakgsS0FBVCxDQUFlcUYsQ0FBZixFQUFrQjtDQUNkLFNBQU81RyxNQUFNLENBQUM0RyxDQUFELENBQU4sQ0FBVTVjLE9BQVYsQ0FBa0IsSUFBbEIsRUFBd0IsUUFBeEIsQ0FBUDtDQUNIOztDQUVELFNBQVM3QixTQUFULENBQWlCb0MsR0FBakIsRUFBc0I7Q0FBRSxTQUFPNFIsS0FBSyxDQUFDNVIsR0FBRCxDQUFMLEtBQWUsZ0JBQWYsS0FBb0MsQ0FBQzZhLFdBQUQsSUFBZ0IsRUFBRSxRQUFPN2EsR0FBUCxNQUFlLFFBQWYsSUFBMkI2YSxXQUFXLElBQUk3YSxHQUE1QyxDQUFwRCxDQUFQO0NBQStHOztDQUN2SSxTQUFTakIsTUFBVCxDQUFnQmlCLEdBQWhCLEVBQXFCO0NBQUUsU0FBTzRSLEtBQUssQ0FBQzVSLEdBQUQsQ0FBTCxLQUFlLGVBQWYsS0FBbUMsQ0FBQzZhLFdBQUQsSUFBZ0IsRUFBRSxRQUFPN2EsR0FBUCxNQUFlLFFBQWYsSUFBMkI2YSxXQUFXLElBQUk3YSxHQUE1QyxDQUFuRCxDQUFQO0NBQThHOztDQUNySSxTQUFTMGQsVUFBVCxDQUFrQjFkLEdBQWxCLEVBQXVCO0NBQUUsU0FBTzRSLEtBQUssQ0FBQzVSLEdBQUQsQ0FBTCxLQUFlLGlCQUFmLEtBQXFDLENBQUM2YSxXQUFELElBQWdCLEVBQUUsUUFBTzdhLEdBQVAsTUFBZSxRQUFmLElBQTJCNmEsV0FBVyxJQUFJN2EsR0FBNUMsQ0FBckQsQ0FBUDtDQUFnSDs7Q0FDekksU0FBUzhjLE9BQVQsQ0FBaUI5YyxHQUFqQixFQUFzQjtDQUFFLFNBQU80UixLQUFLLENBQUM1UixHQUFELENBQUwsS0FBZSxnQkFBZixLQUFvQyxDQUFDNmEsV0FBRCxJQUFnQixFQUFFLFFBQU83YSxHQUFQLE1BQWUsUUFBZixJQUEyQjZhLFdBQVcsSUFBSTdhLEdBQTVDLENBQXBELENBQVA7Q0FBK0c7O0NBQ3ZJLFNBQVN0QixRQUFULENBQWtCc0IsR0FBbEIsRUFBdUI7Q0FBRSxTQUFPNFIsS0FBSyxDQUFDNVIsR0FBRCxDQUFMLEtBQWUsaUJBQWYsS0FBcUMsQ0FBQzZhLFdBQUQsSUFBZ0IsRUFBRSxRQUFPN2EsR0FBUCxNQUFlLFFBQWYsSUFBMkI2YSxXQUFXLElBQUk3YSxHQUE1QyxDQUFyRCxDQUFQO0NBQWdIOztDQUN6SSxTQUFTckIsUUFBVCxDQUFrQnFCLEdBQWxCLEVBQXVCO0NBQUUsU0FBTzRSLEtBQUssQ0FBQzVSLEdBQUQsQ0FBTCxLQUFlLGlCQUFmLEtBQXFDLENBQUM2YSxXQUFELElBQWdCLEVBQUUsUUFBTzdhLEdBQVAsTUFBZSxRQUFmLElBQTJCNmEsV0FBVyxJQUFJN2EsR0FBNUMsQ0FBckQsQ0FBUDtDQUFnSDs7Q0FDekksU0FBU3lkLFNBQVQsQ0FBbUJ6ZCxHQUFuQixFQUF3QjtDQUFFLFNBQU80UixLQUFLLENBQUM1UixHQUFELENBQUwsS0FBZSxrQkFBZixLQUFzQyxDQUFDNmEsV0FBRCxJQUFnQixFQUFFLFFBQU83YSxHQUFQLE1BQWUsUUFBZixJQUEyQjZhLFdBQVcsSUFBSTdhLEdBQTVDLENBQXRELENBQVA7Q0FBaUg7OztDQUczSSxTQUFTNGEsUUFBVCxDQUFrQjVhLEdBQWxCLEVBQXVCO0NBQ25CLE1BQUlxYSxpQkFBSixFQUF1QjtDQUNuQixXQUFPcmEsR0FBRyxJQUFJLFFBQU9BLEdBQVAsTUFBZSxRQUF0QixJQUFrQ0EsR0FBRyxZQUFZMlEsTUFBeEQ7Q0FDSDs7Q0FDRCxNQUFJLFFBQU8zUSxHQUFQLE1BQWUsUUFBbkIsRUFBNkI7Q0FDekIsV0FBTyxJQUFQO0NBQ0g7O0NBQ0QsTUFBSSxDQUFDQSxHQUFELElBQVEsUUFBT0EsR0FBUCxNQUFlLFFBQXZCLElBQW1DLENBQUNvYSxXQUF4QyxFQUFxRDtDQUNqRCxXQUFPLEtBQVA7Q0FDSDs7Q0FDRCxNQUFJO0NBQ0FBLElBQUFBLFdBQVcsQ0FBQ3RjLElBQVosQ0FBaUJrQyxHQUFqQjtDQUNBLFdBQU8sSUFBUDtDQUNILEdBSEQsQ0FHRSxPQUFPZ0wsQ0FBUCxFQUFVOztDQUNaLFNBQU8sS0FBUDtDQUNIOztDQUVELFNBQVN3UyxRQUFULENBQWtCeGQsR0FBbEIsRUFBdUI7Q0FDbkIsTUFBSSxDQUFDQSxHQUFELElBQVEsUUFBT0EsR0FBUCxNQUFlLFFBQXZCLElBQW1DLENBQUNrYSxhQUF4QyxFQUF1RDtDQUNuRCxXQUFPLEtBQVA7Q0FDSDs7Q0FDRCxNQUFJO0NBQ0FBLElBQUFBLGFBQWEsQ0FBQ3BjLElBQWQsQ0FBbUJrQyxHQUFuQjtDQUNBLFdBQU8sSUFBUDtDQUNILEdBSEQsQ0FHRSxPQUFPZ0wsQ0FBUCxFQUFVOztDQUNaLFNBQU8sS0FBUDtDQUNIOztDQUVELElBQUlvTCxNQUFNLEdBQUcxWSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJ3QyxjQUFqQixJQUFtQyxVQUFVRCxHQUFWLEVBQWU7Q0FBRSxTQUFPQSxHQUFHLElBQUksSUFBZDtDQUFxQixDQUF0Rjs7Q0FDQSxTQUFTc1osS0FBVCxDQUFheFosR0FBYixFQUFrQkUsR0FBbEIsRUFBdUI7Q0FDbkIsU0FBT2tXLE1BQU0sQ0FBQ3RZLElBQVAsQ0FBWWtDLEdBQVosRUFBaUJFLEdBQWpCLENBQVA7Q0FDSDs7Q0FFRCxTQUFTMFIsS0FBVCxDQUFlNVIsR0FBZixFQUFvQjtDQUNoQixTQUFPZ2EsY0FBYyxDQUFDbGMsSUFBZixDQUFvQmtDLEdBQXBCLENBQVA7Q0FDSDs7Q0FFRCxTQUFTZ2MsTUFBVCxDQUFnQmtDLENBQWhCLEVBQW1CO0NBQ2YsTUFBSUEsQ0FBQyxDQUFDN2EsSUFBTixFQUFZO0NBQUUsV0FBTzZhLENBQUMsQ0FBQzdhLElBQVQ7Q0FBZ0I7O0NBQzlCLE1BQUk4YSxDQUFDLEdBQUczWSxLQUFLLENBQUMxSCxJQUFOLENBQVdtYyxnQkFBZ0IsQ0FBQ25jLElBQWpCLENBQXNCb2dCLENBQXRCLENBQVgsRUFBcUMsc0JBQXJDLENBQVI7O0NBQ0EsTUFBSUMsQ0FBSixFQUFPO0NBQUUsV0FBT0EsQ0FBQyxDQUFDLENBQUQsQ0FBUjtDQUFjOztDQUN2QixTQUFPLElBQVA7Q0FDSDs7Q0FFRCxTQUFTcGMsT0FBVCxDQUFpQjRhLEVBQWpCLEVBQXFCbkosQ0FBckIsRUFBd0I7Q0FDcEIsTUFBSW1KLEVBQUUsQ0FBQzVhLE9BQVAsRUFBZ0I7Q0FBRSxXQUFPNGEsRUFBRSxDQUFDNWEsT0FBSCxDQUFXeVIsQ0FBWCxDQUFQO0NBQXVCOztDQUN6QyxPQUFLLElBQUlsVyxDQUFDLEdBQUcsQ0FBUixFQUFXMkMsQ0FBQyxHQUFHMGMsRUFBRSxDQUFDdGYsTUFBdkIsRUFBK0JDLENBQUMsR0FBRzJDLENBQW5DLEVBQXNDM0MsQ0FBQyxFQUF2QyxFQUEyQztDQUN2QyxRQUFJcWYsRUFBRSxDQUFDcmYsQ0FBRCxDQUFGLEtBQVVrVyxDQUFkLEVBQWlCO0NBQUUsYUFBT2xXLENBQVA7Q0FBVztDQUNqQzs7Q0FDRCxTQUFPLENBQUMsQ0FBUjtDQUNIOztDQUVELFNBQVN5ZixLQUFULENBQWV2SixDQUFmLEVBQWtCO0NBQ2QsTUFBSSxDQUFDd0YsT0FBRCxJQUFZLENBQUN4RixDQUFiLElBQWtCLFFBQU9BLENBQVAsTUFBYSxRQUFuQyxFQUE2QztDQUN6QyxXQUFPLEtBQVA7Q0FDSDs7Q0FDRCxNQUFJO0NBQ0F3RixJQUFBQSxPQUFPLENBQUNsYixJQUFSLENBQWEwVixDQUFiOztDQUNBLFFBQUk7Q0FDQTRGLE1BQUFBLE9BQU8sQ0FBQ3RiLElBQVIsQ0FBYTBWLENBQWI7Q0FDSCxLQUZELENBRUUsT0FBTzZJLENBQVAsRUFBVTtDQUNSLGFBQU8sSUFBUDtDQUNIOztDQUNELFdBQU83SSxDQUFDLFlBQVl1QixHQUFwQixDQVBBO0NBUUgsR0FSRCxDQVFFLE9BQU8vSixDQUFQLEVBQVU7O0NBQ1osU0FBTyxLQUFQO0NBQ0g7O0NBRUQsU0FBU29TLFNBQVQsQ0FBbUI1SixDQUFuQixFQUFzQjtDQUNsQixNQUFJLENBQUMrRixVQUFELElBQWUsQ0FBQy9GLENBQWhCLElBQXFCLFFBQU9BLENBQVAsTUFBYSxRQUF0QyxFQUFnRDtDQUM1QyxXQUFPLEtBQVA7Q0FDSDs7Q0FDRCxNQUFJO0NBQ0ErRixJQUFBQSxVQUFVLENBQUN6YixJQUFYLENBQWdCMFYsQ0FBaEIsRUFBbUIrRixVQUFuQjs7Q0FDQSxRQUFJO0NBQ0FHLE1BQUFBLFVBQVUsQ0FBQzViLElBQVgsQ0FBZ0IwVixDQUFoQixFQUFtQmtHLFVBQW5CO0NBQ0gsS0FGRCxDQUVFLE9BQU8yQyxDQUFQLEVBQVU7Q0FDUixhQUFPLElBQVA7Q0FDSDs7Q0FDRCxXQUFPN0ksQ0FBQyxZQUFZc0MsT0FBcEIsQ0FQQTtDQVFILEdBUkQsQ0FRRSxPQUFPOUssQ0FBUCxFQUFVOztDQUNaLFNBQU8sS0FBUDtDQUNIOztDQUVELFNBQVN1UyxTQUFULENBQW1CL0osQ0FBbkIsRUFBc0I7Q0FDbEIsTUFBSSxDQUFDb0csWUFBRCxJQUFpQixDQUFDcEcsQ0FBbEIsSUFBdUIsUUFBT0EsQ0FBUCxNQUFhLFFBQXhDLEVBQWtEO0NBQzlDLFdBQU8sS0FBUDtDQUNIOztDQUNELE1BQUk7Q0FDQW9HLElBQUFBLFlBQVksQ0FBQzliLElBQWIsQ0FBa0IwVixDQUFsQjtDQUNBLFdBQU8sSUFBUDtDQUNILEdBSEQsQ0FHRSxPQUFPeEksQ0FBUCxFQUFVOztDQUNaLFNBQU8sS0FBUDtDQUNIOztDQUVELFNBQVNrUyxLQUFULENBQWUxSixDQUFmLEVBQWtCO0NBQ2QsTUFBSSxDQUFDNEYsT0FBRCxJQUFZLENBQUM1RixDQUFiLElBQWtCLFFBQU9BLENBQVAsTUFBYSxRQUFuQyxFQUE2QztDQUN6QyxXQUFPLEtBQVA7Q0FDSDs7Q0FDRCxNQUFJO0NBQ0E0RixJQUFBQSxPQUFPLENBQUN0YixJQUFSLENBQWEwVixDQUFiOztDQUNBLFFBQUk7Q0FDQXdGLE1BQUFBLE9BQU8sQ0FBQ2xiLElBQVIsQ0FBYTBWLENBQWI7Q0FDSCxLQUZELENBRUUsT0FBTzJLLENBQVAsRUFBVTtDQUNSLGFBQU8sSUFBUDtDQUNIOztDQUNELFdBQU8zSyxDQUFDLFlBQVkrQixHQUFwQixDQVBBO0NBUUgsR0FSRCxDQVFFLE9BQU92SyxDQUFQLEVBQVU7O0NBQ1osU0FBTyxLQUFQO0NBQ0g7O0NBRUQsU0FBU3NTLFNBQVQsQ0FBbUI5SixDQUFuQixFQUFzQjtDQUNsQixNQUFJLENBQUNrRyxVQUFELElBQWUsQ0FBQ2xHLENBQWhCLElBQXFCLFFBQU9BLENBQVAsTUFBYSxRQUF0QyxFQUFnRDtDQUM1QyxXQUFPLEtBQVA7Q0FDSDs7Q0FDRCxNQUFJO0NBQ0FrRyxJQUFBQSxVQUFVLENBQUM1YixJQUFYLENBQWdCMFYsQ0FBaEIsRUFBbUJrRyxVQUFuQjs7Q0FDQSxRQUFJO0NBQ0FILE1BQUFBLFVBQVUsQ0FBQ3piLElBQVgsQ0FBZ0IwVixDQUFoQixFQUFtQitGLFVBQW5CO0NBQ0gsS0FGRCxDQUVFLE9BQU84QyxDQUFQLEVBQVU7Q0FDUixhQUFPLElBQVA7Q0FDSDs7Q0FDRCxXQUFPN0ksQ0FBQyxZQUFZd0MsT0FBcEIsQ0FQQTtDQVFILEdBUkQsQ0FRRSxPQUFPaEwsQ0FBUCxFQUFVOztDQUNaLFNBQU8sS0FBUDtDQUNIOztDQUVELFNBQVNvUixTQUFULENBQW1CNUksQ0FBbkIsRUFBc0I7Q0FDbEIsTUFBSSxDQUFDQSxDQUFELElBQU0sUUFBT0EsQ0FBUCxNQUFhLFFBQXZCLEVBQWlDO0NBQUUsV0FBTyxLQUFQO0NBQWU7O0NBQ2xELE1BQUksT0FBTzRLLFdBQVAsS0FBdUIsV0FBdkIsSUFBc0M1SyxDQUFDLFlBQVk0SyxXQUF2RCxFQUFvRTtDQUNoRSxXQUFPLElBQVA7Q0FDSDs7Q0FDRCxTQUFPLE9BQU81SyxDQUFDLENBQUM4SSxRQUFULEtBQXNCLFFBQXRCLElBQWtDLE9BQU85SSxDQUFDLENBQUM2SyxZQUFULEtBQTBCLFVBQW5FO0NBQ0g7O0NBRUQsU0FBUzVDLGFBQVQsQ0FBdUJqYyxHQUF2QixFQUE0QjJiLElBQTVCLEVBQWtDO0NBQzlCLE1BQUkzYixHQUFHLENBQUNuQyxNQUFKLEdBQWE4ZCxJQUFJLENBQUNFLGVBQXRCLEVBQXVDO0NBQ25DLFFBQUlpRCxTQUFTLEdBQUc5ZSxHQUFHLENBQUNuQyxNQUFKLEdBQWE4ZCxJQUFJLENBQUNFLGVBQWxDO0NBQ0EsUUFBSWtELE9BQU8sR0FBRyxTQUFTRCxTQUFULEdBQXFCLGlCQUFyQixJQUEwQ0EsU0FBUyxHQUFHLENBQVosR0FBZ0IsR0FBaEIsR0FBc0IsRUFBaEUsQ0FBZDtDQUNBLFdBQU83QyxhQUFhLENBQUNqYyxHQUFHLENBQUNjLEtBQUosQ0FBVSxDQUFWLEVBQWE2YSxJQUFJLENBQUNFLGVBQWxCLENBQUQsRUFBcUNGLElBQXJDLENBQWIsR0FBMERvRCxPQUFqRTtDQUNILEdBTDZCOzs7Q0FPOUIsTUFBSWxDLENBQUMsR0FBRzdjLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLFVBQVosRUFBd0IsTUFBeEIsRUFBZ0NBLE9BQWhDLENBQXdDLGNBQXhDLEVBQXdEK2UsT0FBeEQsQ0FBUjtDQUNBLFNBQU8vQixVQUFVLENBQUNKLENBQUQsRUFBSSxRQUFKLEVBQWNsQixJQUFkLENBQWpCO0NBQ0g7O0NBRUQsU0FBU3FELE9BQVQsQ0FBaUJoUCxDQUFqQixFQUFvQjtDQUNoQixNQUFJaVAsQ0FBQyxHQUFHalAsQ0FBQyxDQUFDNU8sVUFBRixDQUFhLENBQWIsQ0FBUjtDQUNBLE1BQUk0UyxDQUFDLEdBQUc7Q0FDSixPQUFHLEdBREM7Q0FFSixPQUFHLEdBRkM7Q0FHSixRQUFJLEdBSEE7Q0FJSixRQUFJLEdBSkE7Q0FLSixRQUFJO0NBTEEsSUFNTmlMLENBTk0sQ0FBUjs7Q0FPQSxNQUFJakwsQ0FBSixFQUFPO0NBQUUsV0FBTyxPQUFPQSxDQUFkO0NBQWtCOztDQUMzQixTQUFPLFNBQVNpTCxDQUFDLEdBQUcsSUFBSixHQUFXLEdBQVgsR0FBaUIsRUFBMUIsSUFBZ0NBLENBQUMsQ0FBQ2hoQixRQUFGLENBQVcsRUFBWCxFQUFlNkYsV0FBZixFQUF2QztDQUNIOztDQUVELFNBQVM2WSxTQUFULENBQW1CM2MsR0FBbkIsRUFBd0I7Q0FDcEIsU0FBTyxZQUFZQSxHQUFaLEdBQWtCLEdBQXpCO0NBQ0g7O0NBRUQsU0FBUzZkLGdCQUFULENBQTBCcUIsSUFBMUIsRUFBZ0M7Q0FDNUIsU0FBT0EsSUFBSSxHQUFHLFFBQWQ7Q0FDSDs7Q0FFRCxTQUFTekIsWUFBVCxDQUFzQnlCLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQ0MsT0FBbEMsRUFBMkNwRCxNQUEzQyxFQUFtRDtDQUMvQyxNQUFJcUQsYUFBYSxHQUFHckQsTUFBTSxHQUFHcUIsWUFBWSxDQUFDK0IsT0FBRCxFQUFVcEQsTUFBVixDQUFmLEdBQW1Db0QsT0FBTyxDQUFDL2MsSUFBUixDQUFhLElBQWIsQ0FBN0Q7Q0FDQSxTQUFPNmMsSUFBSSxHQUFHLElBQVAsR0FBY0MsSUFBZCxHQUFxQixLQUFyQixHQUE2QkUsYUFBN0IsR0FBNkMsR0FBcEQ7Q0FDSDs7Q0FFRCxTQUFTakMsZ0JBQVQsQ0FBMEJELEVBQTFCLEVBQThCO0NBQzFCLE9BQUssSUFBSXJmLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxZixFQUFFLENBQUN0ZixNQUF2QixFQUErQkMsQ0FBQyxFQUFoQyxFQUFvQztDQUNoQyxRQUFJeUUsT0FBTyxDQUFDNGEsRUFBRSxDQUFDcmYsQ0FBRCxDQUFILEVBQVEsSUFBUixDQUFQLElBQXdCLENBQTVCLEVBQStCO0NBQzNCLGFBQU8sS0FBUDtDQUNIO0NBQ0o7O0NBQ0QsU0FBTyxJQUFQO0NBQ0g7O0NBRUQsU0FBU3FlLFNBQVQsQ0FBbUJSLElBQW5CLEVBQXlCRixLQUF6QixFQUFnQztDQUM1QixNQUFJNkQsVUFBSjs7Q0FDQSxNQUFJM0QsSUFBSSxDQUFDSyxNQUFMLEtBQWdCLElBQXBCLEVBQTBCO0NBQ3RCc0QsSUFBQUEsVUFBVSxHQUFHLElBQWI7Q0FDSCxHQUZELE1BRU8sSUFBSSxPQUFPM0QsSUFBSSxDQUFDSyxNQUFaLEtBQXVCLFFBQXZCLElBQW1DTCxJQUFJLENBQUNLLE1BQUwsR0FBYyxDQUFyRCxFQUF3RDtDQUMzRHNELElBQUFBLFVBQVUsR0FBRzNoQixLQUFLLENBQUNnZSxJQUFJLENBQUNLLE1BQUwsR0FBYyxDQUFmLENBQUwsQ0FBdUIzWixJQUF2QixDQUE0QixHQUE1QixDQUFiO0NBQ0gsR0FGTSxNQUVBO0NBQ0gsV0FBTyxJQUFQO0NBQ0g7O0NBQ0QsU0FBTztDQUNIa2QsSUFBQUEsSUFBSSxFQUFFRCxVQURIO0NBRUhFLElBQUFBLElBQUksRUFBRTdoQixLQUFLLENBQUM4ZCxLQUFLLEdBQUcsQ0FBVCxDQUFMLENBQWlCcFosSUFBakIsQ0FBc0JpZCxVQUF0QjtDQUZILEdBQVA7Q0FJSDs7Q0FFRCxTQUFTakMsWUFBVCxDQUFzQkYsRUFBdEIsRUFBMEJuQixNQUExQixFQUFrQztDQUM5QixNQUFJbUIsRUFBRSxDQUFDdGYsTUFBSCxLQUFjLENBQWxCLEVBQXFCO0NBQUUsV0FBTyxFQUFQO0NBQVk7O0NBQ25DLE1BQUk0aEIsVUFBVSxHQUFHLE9BQU96RCxNQUFNLENBQUN3RCxJQUFkLEdBQXFCeEQsTUFBTSxDQUFDdUQsSUFBN0M7Q0FDQSxTQUFPRSxVQUFVLEdBQUd0QyxFQUFFLENBQUM5YSxJQUFILENBQVEsTUFBTW9kLFVBQWQsQ0FBYixHQUF5QyxJQUF6QyxHQUFnRHpELE1BQU0sQ0FBQ3dELElBQTlEO0NBQ0g7O0NBRUQsU0FBUy9DLFVBQVQsQ0FBb0JqYyxHQUFwQixFQUF5QjRiLE9BQXpCLEVBQWtDO0NBQzlCLE1BQUlzRCxLQUFLLEdBQUd0aEIsU0FBTyxDQUFDb0MsR0FBRCxDQUFuQjtDQUNBLE1BQUkyYyxFQUFFLEdBQUcsRUFBVDs7Q0FDQSxNQUFJdUMsS0FBSixFQUFXO0NBQ1B2QyxJQUFBQSxFQUFFLENBQUN0ZixNQUFILEdBQVkyQyxHQUFHLENBQUMzQyxNQUFoQjs7Q0FDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcwQyxHQUFHLENBQUMzQyxNQUF4QixFQUFnQ0MsQ0FBQyxFQUFqQyxFQUFxQztDQUNqQ3FmLE1BQUFBLEVBQUUsQ0FBQ3JmLENBQUQsQ0FBRixHQUFRa2MsS0FBRyxDQUFDeFosR0FBRCxFQUFNMUMsQ0FBTixDQUFILEdBQWNzZSxPQUFPLENBQUM1YixHQUFHLENBQUMxQyxDQUFELENBQUosRUFBUzBDLEdBQVQsQ0FBckIsR0FBcUMsRUFBN0M7Q0FDSDtDQUNKOztDQUNELE1BQUlrUixJQUFJLEdBQUcsT0FBT2lKLElBQVAsS0FBZ0IsVUFBaEIsR0FBNkJBLElBQUksQ0FBQ25hLEdBQUQsQ0FBakMsR0FBeUMsRUFBcEQ7Q0FDQSxNQUFJbWYsTUFBSjs7Q0FDQSxNQUFJOUUsaUJBQUosRUFBdUI7Q0FDbkI4RSxJQUFBQSxNQUFNLEdBQUcsRUFBVDs7Q0FDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdsTyxJQUFJLENBQUM3VCxNQUF6QixFQUFpQytoQixDQUFDLEVBQWxDLEVBQXNDO0NBQ2xDRCxNQUFBQSxNQUFNLENBQUMsTUFBTWpPLElBQUksQ0FBQ2tPLENBQUQsQ0FBWCxDQUFOLEdBQXdCbE8sSUFBSSxDQUFDa08sQ0FBRCxDQUE1QjtDQUNIO0NBQ0o7O0NBRUQsT0FBSyxJQUFJbGYsR0FBVCxJQUFnQkYsR0FBaEIsRUFBcUI7O0NBQ2pCLFFBQUksQ0FBQ3daLEtBQUcsQ0FBQ3haLEdBQUQsRUFBTUUsR0FBTixDQUFSLEVBQW9CO0NBQUU7Q0FBVyxLQURoQjs7O0NBRWpCLFFBQUlnZixLQUFLLElBQUl6SixNQUFNLENBQUNULE1BQU0sQ0FBQzlVLEdBQUQsQ0FBUCxDQUFOLEtBQXdCQSxHQUFqQyxJQUF3Q0EsR0FBRyxHQUFHRixHQUFHLENBQUMzQyxNQUF0RCxFQUE4RDtDQUFFO0NBQVcsS0FGMUQ7OztDQUdqQixRQUFJZ2QsaUJBQWlCLElBQUk4RSxNQUFNLENBQUMsTUFBTWpmLEdBQVAsQ0FBTixZQUE2QnlRLE1BQXRELEVBQThEOztDQUUxRCxlQUYwRDtDQUc3RCxLQUhELE1BR08sSUFBSyxRQUFELENBQVc1SyxJQUFYLENBQWdCN0YsR0FBaEIsQ0FBSixFQUEwQjtDQUM3QnljLE1BQUFBLEVBQUUsQ0FBQy9hLElBQUgsQ0FBUWdhLE9BQU8sQ0FBQzFiLEdBQUQsRUFBTUYsR0FBTixDQUFQLEdBQW9CLElBQXBCLEdBQTJCNGIsT0FBTyxDQUFDNWIsR0FBRyxDQUFDRSxHQUFELENBQUosRUFBV0YsR0FBWCxDQUExQztDQUNILEtBRk0sTUFFQTtDQUNIMmMsTUFBQUEsRUFBRSxDQUFDL2EsSUFBSCxDQUFRMUIsR0FBRyxHQUFHLElBQU4sR0FBYTBiLE9BQU8sQ0FBQzViLEdBQUcsQ0FBQ0UsR0FBRCxDQUFKLEVBQVdGLEdBQVgsQ0FBNUI7Q0FDSDtDQUNKOztDQUNELE1BQUksT0FBT21hLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7Q0FDNUIsU0FBSyxJQUFJa0YsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR25PLElBQUksQ0FBQzdULE1BQXpCLEVBQWlDZ2lCLENBQUMsRUFBbEMsRUFBc0M7Q0FDbEMsVUFBSS9FLFlBQVksQ0FBQ3hjLElBQWIsQ0FBa0JrQyxHQUFsQixFQUF1QmtSLElBQUksQ0FBQ21PLENBQUQsQ0FBM0IsQ0FBSixFQUFxQztDQUNqQzFDLFFBQUFBLEVBQUUsQ0FBQy9hLElBQUgsQ0FBUSxNQUFNZ2EsT0FBTyxDQUFDMUssSUFBSSxDQUFDbU8sQ0FBRCxDQUFMLENBQWIsR0FBeUIsS0FBekIsR0FBaUN6RCxPQUFPLENBQUM1YixHQUFHLENBQUNrUixJQUFJLENBQUNtTyxDQUFELENBQUwsQ0FBSixFQUFlcmYsR0FBZixDQUFoRDtDQUNIO0NBQ0o7Q0FDSjs7Q0FDRCxTQUFPMmMsRUFBUDs7O0NDaGRKLElBQUlwRixZQUFZLEdBQUcvWixZQUFuQjtDQUNBLElBQUlvYixTQUFTLEdBQUd6UyxXQUFoQjtDQUNBLElBQUl5VixPQUFPLEdBQUcxVCxhQUFkO0NBRUEsSUFBSTJLLFVBQVUsR0FBRzBFLFlBQVksQ0FBQyxhQUFELENBQTdCO0NBQ0EsSUFBSStILFFBQVEsR0FBRy9ILFlBQVksQ0FBQyxXQUFELEVBQWMsSUFBZCxDQUEzQjtDQUNBLElBQUlnSSxJQUFJLEdBQUdoSSxZQUFZLENBQUMsT0FBRCxFQUFVLElBQVYsQ0FBdkI7Q0FFQSxJQUFJaUksV0FBVyxHQUFHNUcsU0FBUyxDQUFDLHVCQUFELEVBQTBCLElBQTFCLENBQTNCO0NBQ0EsSUFBSTZHLFdBQVcsR0FBRzdHLFNBQVMsQ0FBQyx1QkFBRCxFQUEwQixJQUExQixDQUEzQjtDQUNBLElBQUk4RyxXQUFXLEdBQUc5RyxTQUFTLENBQUMsdUJBQUQsRUFBMEIsSUFBMUIsQ0FBM0I7Q0FDQSxJQUFJK0csT0FBTyxHQUFHL0csU0FBUyxDQUFDLG1CQUFELEVBQXNCLElBQXRCLENBQXZCO0NBQ0EsSUFBSWdILE9BQU8sR0FBR2hILFNBQVMsQ0FBQyxtQkFBRCxFQUFzQixJQUF0QixDQUF2QjtDQUNBLElBQUlpSCxPQUFPLEdBQUdqSCxTQUFTLENBQUMsbUJBQUQsRUFBc0IsSUFBdEIsQ0FBdkI7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztDQUNBLElBQUlrSCxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFVQyxJQUFWLEVBQWdCN2YsR0FBaEIsRUFBcUI7O0NBQ3RDLE9BQUssSUFBSThlLElBQUksR0FBR2UsSUFBWCxFQUFpQkMsSUFBdEIsRUFBNEIsQ0FBQ0EsSUFBSSxHQUFHaEIsSUFBSSxDQUFDaUIsSUFBYixNQUF1QixJQUFuRCxFQUF5RGpCLElBQUksR0FBR2dCLElBQWhFLEVBQXNFO0NBQ3JFLFFBQUlBLElBQUksQ0FBQzlmLEdBQUwsS0FBYUEsR0FBakIsRUFBc0I7Q0FDckI4ZSxNQUFBQSxJQUFJLENBQUNpQixJQUFMLEdBQVlELElBQUksQ0FBQ0MsSUFBakI7Q0FDQUQsTUFBQUEsSUFBSSxDQUFDQyxJQUFMLEdBQVlGLElBQUksQ0FBQ0UsSUFBakI7Q0FDQUYsTUFBQUEsSUFBSSxDQUFDRSxJQUFMLEdBQVlELElBQVosQ0FIcUI7O0NBSXJCLGFBQU9BLElBQVA7Q0FDQTtDQUNEO0NBQ0QsQ0FURDs7Q0FXQSxJQUFJRSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFVQyxPQUFWLEVBQW1CamdCLEdBQW5CLEVBQXdCO0NBQ3JDLE1BQUlrZ0IsSUFBSSxHQUFHTixXQUFXLENBQUNLLE9BQUQsRUFBVWpnQixHQUFWLENBQXRCO0NBQ0EsU0FBT2tnQixJQUFJLElBQUlBLElBQUksQ0FBQ3BkLEtBQXBCO0NBQ0EsQ0FIRDs7Q0FJQSxJQUFJcWQsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBVUYsT0FBVixFQUFtQmpnQixHQUFuQixFQUF3QjhDLEtBQXhCLEVBQStCO0NBQzVDLE1BQUlvZCxJQUFJLEdBQUdOLFdBQVcsQ0FBQ0ssT0FBRCxFQUFVamdCLEdBQVYsQ0FBdEI7O0NBQ0EsTUFBSWtnQixJQUFKLEVBQVU7Q0FDVEEsSUFBQUEsSUFBSSxDQUFDcGQsS0FBTCxHQUFhQSxLQUFiO0NBQ0EsR0FGRCxNQUVPOztDQUVObWQsSUFBQUEsT0FBTyxDQUFDRixJQUFSLEdBQWU7O0NBQ2QvZixNQUFBQSxHQUFHLEVBQUVBLEdBRFM7Q0FFZCtmLE1BQUFBLElBQUksRUFBRUUsT0FBTyxDQUFDRixJQUZBO0NBR2RqZCxNQUFBQSxLQUFLLEVBQUVBO0NBSE8sS0FBZjtDQUtBO0NBQ0QsQ0FaRDs7Q0FhQSxJQUFJc2QsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBVUgsT0FBVixFQUFtQmpnQixHQUFuQixFQUF3QjtDQUNyQyxTQUFPLENBQUMsQ0FBQzRmLFdBQVcsQ0FBQ0ssT0FBRCxFQUFVamdCLEdBQVYsQ0FBcEI7Q0FDQSxDQUZEOztLQUlBcWdCLFdBQWMsR0FBRyxTQUFTQyxjQUFULEdBQTBCO0NBQzFDLE1BQUlDLEdBQUo7Q0FDQSxNQUFJQyxFQUFKO0NBQ0EsTUFBSUMsRUFBSjtDQUNBLE1BQUlDLE9BQU8sR0FBRztDQUNiQyxJQUFBQSxNQUFNLEVBQUUsZ0JBQVUzZ0IsR0FBVixFQUFlO0NBQ3RCLFVBQUksQ0FBQzBnQixPQUFPLENBQUNwSCxHQUFSLENBQVl0WixHQUFaLENBQUwsRUFBdUI7Q0FDdEIsY0FBTSxJQUFJMlMsVUFBSixDQUFlLG1DQUFtQytJLE9BQU8sQ0FBQzFiLEdBQUQsQ0FBekQsQ0FBTjtDQUNBO0NBQ0QsS0FMWTtDQU1ibVQsSUFBQUEsR0FBRyxFQUFFLGFBQVVuVCxHQUFWLEVBQWU7O0NBQ25CLFVBQUlvZixRQUFRLElBQUlwZixHQUFaLEtBQW9CLFFBQU9BLEdBQVAsTUFBZSxRQUFmLElBQTJCLE9BQU9BLEdBQVAsS0FBZSxVQUE5RCxDQUFKLEVBQStFO0NBQzlFLFlBQUl1Z0IsR0FBSixFQUFTO0NBQ1IsaUJBQU9qQixXQUFXLENBQUNpQixHQUFELEVBQU12Z0IsR0FBTixDQUFsQjtDQUNBO0NBQ0QsT0FKRCxNQUlPLElBQUlxZixJQUFKLEVBQVU7Q0FDaEIsWUFBSW1CLEVBQUosRUFBUTtDQUNQLGlCQUFPZixPQUFPLENBQUNlLEVBQUQsRUFBS3hnQixHQUFMLENBQWQ7Q0FDQTtDQUNELE9BSk0sTUFJQTtDQUNOLFlBQUl5Z0IsRUFBSixFQUFROztDQUNQLGlCQUFPVCxPQUFPLENBQUNTLEVBQUQsRUFBS3pnQixHQUFMLENBQWQ7Q0FDQTtDQUNEO0NBQ0QsS0FwQlk7Q0FxQmJzWixJQUFBQSxHQUFHLEVBQUUsYUFBVXRaLEdBQVYsRUFBZTtDQUNuQixVQUFJb2YsUUFBUSxJQUFJcGYsR0FBWixLQUFvQixRQUFPQSxHQUFQLE1BQWUsUUFBZixJQUEyQixPQUFPQSxHQUFQLEtBQWUsVUFBOUQsQ0FBSixFQUErRTtDQUM5RSxZQUFJdWdCLEdBQUosRUFBUztDQUNSLGlCQUFPZixXQUFXLENBQUNlLEdBQUQsRUFBTXZnQixHQUFOLENBQWxCO0NBQ0E7Q0FDRCxPQUpELE1BSU8sSUFBSXFmLElBQUosRUFBVTtDQUNoQixZQUFJbUIsRUFBSixFQUFRO0NBQ1AsaUJBQU9iLE9BQU8sQ0FBQ2EsRUFBRCxFQUFLeGdCLEdBQUwsQ0FBZDtDQUNBO0NBQ0QsT0FKTSxNQUlBO0NBQ04sWUFBSXlnQixFQUFKLEVBQVE7O0NBQ1AsaUJBQU9MLE9BQU8sQ0FBQ0ssRUFBRCxFQUFLemdCLEdBQUwsQ0FBZDtDQUNBO0NBQ0Q7O0NBQ0QsYUFBTyxLQUFQO0NBQ0EsS0FwQ1k7Q0FxQ2I0Z0IsSUFBQUEsR0FBRyxFQUFFLGFBQVU1Z0IsR0FBVixFQUFlOEMsS0FBZixFQUFzQjtDQUMxQixVQUFJc2MsUUFBUSxJQUFJcGYsR0FBWixLQUFvQixRQUFPQSxHQUFQLE1BQWUsUUFBZixJQUEyQixPQUFPQSxHQUFQLEtBQWUsVUFBOUQsQ0FBSixFQUErRTtDQUM5RSxZQUFJLENBQUN1Z0IsR0FBTCxFQUFVO0NBQ1RBLFVBQUFBLEdBQUcsR0FBRyxJQUFJbkIsUUFBSixFQUFOO0NBQ0E7O0NBQ0RHLFFBQUFBLFdBQVcsQ0FBQ2dCLEdBQUQsRUFBTXZnQixHQUFOLEVBQVc4QyxLQUFYLENBQVg7Q0FDQSxPQUxELE1BS08sSUFBSXVjLElBQUosRUFBVTtDQUNoQixZQUFJLENBQUNtQixFQUFMLEVBQVM7Q0FDUkEsVUFBQUEsRUFBRSxHQUFHLElBQUluQixJQUFKLEVBQUw7Q0FDQTs7Q0FDREssUUFBQUEsT0FBTyxDQUFDYyxFQUFELEVBQUt4Z0IsR0FBTCxFQUFVOEMsS0FBVixDQUFQO0NBQ0EsT0FMTSxNQUtBO0NBQ04sWUFBSSxDQUFDMmQsRUFBTCxFQUFTOztDQUViO0NBQ0E7Q0FDQTtDQUNBO0NBQ0tBLFVBQUFBLEVBQUUsR0FBRztDQUFFemdCLFlBQUFBLEdBQUcsRUFBRSxFQUFQO0NBQVcrZixZQUFBQSxJQUFJLEVBQUU7Q0FBakIsV0FBTDtDQUNBOztDQUNESSxRQUFBQSxPQUFPLENBQUNNLEVBQUQsRUFBS3pnQixHQUFMLEVBQVU4QyxLQUFWLENBQVA7Q0FDQTtDQUNEO0NBM0RZLEdBQWQ7Q0E2REEsU0FBTzRkLE9BQVA7Q0FDQTs7Q0N6SEQsSUFBSW5oQixPQUFPLEdBQUdnVyxNQUFNLENBQUM5WCxTQUFQLENBQWlCOEIsT0FBL0I7Q0FDQSxJQUFJc2hCLGVBQWUsR0FBRyxNQUF0QjtDQUVBLElBQUlDLE1BQU0sR0FBRztDQUNUQyxFQUFBQSxPQUFPLEVBQUUsU0FEQTtDQUVUQyxFQUFBQSxPQUFPLEVBQUU7Q0FGQSxDQUFiO0tBS0FDLFNBQWMsR0FBRztDQUNiLGFBQVdILE1BQU0sQ0FBQ0UsT0FETDtDQUViRSxFQUFBQSxVQUFVLEVBQUU7Q0FDUkgsSUFBQUEsT0FBTyxFQUFFLGlCQUFVamUsS0FBVixFQUFpQjtDQUN0QixhQUFPdkQsT0FBTyxDQUFDM0IsSUFBUixDQUFha0YsS0FBYixFQUFvQitkLGVBQXBCLEVBQXFDLEdBQXJDLENBQVA7Q0FDSCxLQUhPO0NBSVJHLElBQUFBLE9BQU8sRUFBRSxpQkFBVWxlLEtBQVYsRUFBaUI7Q0FDdEIsYUFBT3lTLE1BQU0sQ0FBQ3pTLEtBQUQsQ0FBYjtDQUNIO0NBTk8sR0FGQztDQVViaWUsRUFBQUEsT0FBTyxFQUFFRCxNQUFNLENBQUNDLE9BVkg7Q0FXYkMsRUFBQUEsT0FBTyxFQUFFRixNQUFNLENBQUNFO0NBWEg7O0NDUmpCLElBQUlDLFNBQU8sR0FBRzNqQixTQUFkO0NBRUEsSUFBSWdjLEtBQUcsR0FBRzliLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQndDLGNBQTNCO0NBQ0EsSUFBSXZDLFNBQU8sR0FBR1QsS0FBSyxDQUFDUyxPQUFwQjs7Q0FFQSxJQUFJeWpCLFFBQVEsR0FBSSxZQUFZO0NBQ3hCLE1BQUlDLEtBQUssR0FBRyxFQUFaOztDQUNBLE9BQUssSUFBSWhrQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEdBQXBCLEVBQXlCLEVBQUVBLENBQTNCLEVBQThCO0NBQzFCZ2tCLElBQUFBLEtBQUssQ0FBQzFmLElBQU4sQ0FBVyxNQUFNLENBQUMsQ0FBQ3RFLENBQUMsR0FBRyxFQUFKLEdBQVMsR0FBVCxHQUFlLEVBQWhCLElBQXNCQSxDQUFDLENBQUNHLFFBQUYsQ0FBVyxFQUFYLENBQXZCLEVBQXVDNkYsV0FBdkMsRUFBakI7Q0FDSDs7Q0FFRCxTQUFPZ2UsS0FBUDtDQUNILENBUGUsRUFBaEI7O0NBU0EsSUFBSUMsWUFBWSxHQUFHLFNBQVNBLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCO0NBQzVDLFNBQU9BLEtBQUssQ0FBQ25rQixNQUFOLEdBQWUsQ0FBdEIsRUFBeUI7Q0FDckIsUUFBSW9rQixJQUFJLEdBQUdELEtBQUssQ0FBQ0UsR0FBTixFQUFYO0NBQ0EsUUFBSTFoQixHQUFHLEdBQUd5aEIsSUFBSSxDQUFDemhCLEdBQUwsQ0FBU3loQixJQUFJLENBQUM1VCxJQUFkLENBQVY7O0NBRUEsUUFBSWpRLFNBQU8sQ0FBQ29DLEdBQUQsQ0FBWCxFQUFrQjtDQUNkLFVBQUkyaEIsU0FBUyxHQUFHLEVBQWhCOztDQUVBLFdBQUssSUFBSXRDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdyZixHQUFHLENBQUMzQyxNQUF4QixFQUFnQyxFQUFFZ2lCLENBQWxDLEVBQXFDO0NBQ2pDLFlBQUksT0FBT3JmLEdBQUcsQ0FBQ3FmLENBQUQsQ0FBVixLQUFrQixXQUF0QixFQUFtQztDQUMvQnNDLFVBQUFBLFNBQVMsQ0FBQy9mLElBQVYsQ0FBZTVCLEdBQUcsQ0FBQ3FmLENBQUQsQ0FBbEI7Q0FDSDtDQUNKOztDQUVEb0MsTUFBQUEsSUFBSSxDQUFDemhCLEdBQUwsQ0FBU3loQixJQUFJLENBQUM1VCxJQUFkLElBQXNCOFQsU0FBdEI7Q0FDSDtDQUNKO0NBQ0osQ0FqQkQ7O0NBbUJBLElBQUlDLGFBQWEsR0FBRyxTQUFTQSxhQUFULENBQXVCalUsTUFBdkIsRUFBK0JxTixPQUEvQixFQUF3QztDQUN4RCxNQUFJaGIsR0FBRyxHQUFHZ2IsT0FBTyxJQUFJQSxPQUFPLENBQUM2RyxZQUFuQixHQUFrQ25rQixNQUFNLENBQUN5UyxNQUFQLENBQWMsSUFBZCxDQUFsQyxHQUF3RCxFQUFsRTs7Q0FDQSxPQUFLLElBQUk3UyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcVEsTUFBTSxDQUFDdFEsTUFBM0IsRUFBbUMsRUFBRUMsQ0FBckMsRUFBd0M7Q0FDcEMsUUFBSSxPQUFPcVEsTUFBTSxDQUFDclEsQ0FBRCxDQUFiLEtBQXFCLFdBQXpCLEVBQXNDO0NBQ2xDMEMsTUFBQUEsR0FBRyxDQUFDMUMsQ0FBRCxDQUFILEdBQVNxUSxNQUFNLENBQUNyUSxDQUFELENBQWY7Q0FDSDtDQUNKOztDQUVELFNBQU8wQyxHQUFQO0NBQ0gsQ0FURDs7Q0FXQSxJQUFJSSxLQUFLLEdBQUcsU0FBU0EsS0FBVCxDQUFlc04sTUFBZixFQUF1QkMsTUFBdkIsRUFBK0JxTixPQUEvQixFQUF3Qzs7Q0FFaEQsTUFBSSxDQUFDck4sTUFBTCxFQUFhO0NBQ1QsV0FBT0QsTUFBUDtDQUNIOztDQUVELE1BQUksUUFBT0MsTUFBUCxNQUFrQixRQUF0QixFQUFnQztDQUM1QixRQUFJL1AsU0FBTyxDQUFDOFAsTUFBRCxDQUFYLEVBQXFCO0NBQ2pCQSxNQUFBQSxNQUFNLENBQUM5TCxJQUFQLENBQVkrTCxNQUFaO0NBQ0gsS0FGRCxNQUVPLElBQUlELE1BQU0sSUFBSSxRQUFPQSxNQUFQLE1BQWtCLFFBQWhDLEVBQTBDO0NBQzdDLFVBQUtzTixPQUFPLEtBQUtBLE9BQU8sQ0FBQzZHLFlBQVIsSUFBd0I3RyxPQUFPLENBQUM4RyxlQUFyQyxDQUFSLElBQWtFLENBQUN0SSxLQUFHLENBQUMxYixJQUFKLENBQVNKLE1BQU0sQ0FBQ0MsU0FBaEIsRUFBMkJnUSxNQUEzQixDQUF2RSxFQUEyRztDQUN2R0QsUUFBQUEsTUFBTSxDQUFDQyxNQUFELENBQU4sR0FBaUIsSUFBakI7Q0FDSDtDQUNKLEtBSk0sTUFJQTtDQUNILGFBQU8sQ0FBQ0QsTUFBRCxFQUFTQyxNQUFULENBQVA7Q0FDSDs7Q0FFRCxXQUFPRCxNQUFQO0NBQ0g7O0NBRUQsTUFBSSxDQUFDQSxNQUFELElBQVcsUUFBT0EsTUFBUCxNQUFrQixRQUFqQyxFQUEyQztDQUN2QyxXQUFPLENBQUNBLE1BQUQsRUFBUzVHLE1BQVQsQ0FBZ0I2RyxNQUFoQixDQUFQO0NBQ0g7O0NBRUQsTUFBSW9VLFdBQVcsR0FBR3JVLE1BQWxCOztDQUNBLE1BQUk5UCxTQUFPLENBQUM4UCxNQUFELENBQVAsSUFBbUIsQ0FBQzlQLFNBQU8sQ0FBQytQLE1BQUQsQ0FBL0IsRUFBeUM7Q0FDckNvVSxJQUFBQSxXQUFXLEdBQUdILGFBQWEsQ0FBQ2xVLE1BQUQsRUFBU3NOLE9BQVQsQ0FBM0I7Q0FDSDs7Q0FFRCxNQUFJcGQsU0FBTyxDQUFDOFAsTUFBRCxDQUFQLElBQW1COVAsU0FBTyxDQUFDK1AsTUFBRCxDQUE5QixFQUF3QztDQUNwQ0EsSUFBQUEsTUFBTSxDQUFDNU4sT0FBUCxDQUFlLFVBQVUwaEIsSUFBVixFQUFnQm5rQixDQUFoQixFQUFtQjtDQUM5QixVQUFJa2MsS0FBRyxDQUFDMWIsSUFBSixDQUFTNFAsTUFBVCxFQUFpQnBRLENBQWpCLENBQUosRUFBeUI7Q0FDckIsWUFBSTBrQixVQUFVLEdBQUd0VSxNQUFNLENBQUNwUSxDQUFELENBQXZCOztDQUNBLFlBQUkwa0IsVUFBVSxJQUFJLFFBQU9BLFVBQVAsTUFBc0IsUUFBcEMsSUFBZ0RQLElBQWhELElBQXdELFFBQU9BLElBQVAsTUFBZ0IsUUFBNUUsRUFBc0Y7Q0FDbEYvVCxVQUFBQSxNQUFNLENBQUNwUSxDQUFELENBQU4sR0FBWThDLEtBQUssQ0FBQzRoQixVQUFELEVBQWFQLElBQWIsRUFBbUJ6RyxPQUFuQixDQUFqQjtDQUNILFNBRkQsTUFFTztDQUNIdE4sVUFBQUEsTUFBTSxDQUFDOUwsSUFBUCxDQUFZNmYsSUFBWjtDQUNIO0NBQ0osT0FQRCxNQU9PO0NBQ0gvVCxRQUFBQSxNQUFNLENBQUNwUSxDQUFELENBQU4sR0FBWW1rQixJQUFaO0NBQ0g7Q0FDSixLQVhEO0NBWUEsV0FBTy9ULE1BQVA7Q0FDSDs7Q0FFRCxTQUFPaFEsTUFBTSxDQUFDd1EsSUFBUCxDQUFZUCxNQUFaLEVBQW9Cc1UsTUFBcEIsQ0FBMkIsVUFBVUMsR0FBVixFQUFlaGlCLEdBQWYsRUFBb0I7Q0FDbEQsUUFBSThDLEtBQUssR0FBRzJLLE1BQU0sQ0FBQ3pOLEdBQUQsQ0FBbEI7O0NBRUEsUUFBSXNaLEtBQUcsQ0FBQzFiLElBQUosQ0FBU29rQixHQUFULEVBQWNoaUIsR0FBZCxDQUFKLEVBQXdCO0NBQ3BCZ2lCLE1BQUFBLEdBQUcsQ0FBQ2hpQixHQUFELENBQUgsR0FBV0UsS0FBSyxDQUFDOGhCLEdBQUcsQ0FBQ2hpQixHQUFELENBQUosRUFBVzhDLEtBQVgsRUFBa0JnWSxPQUFsQixDQUFoQjtDQUNILEtBRkQsTUFFTztDQUNIa0gsTUFBQUEsR0FBRyxDQUFDaGlCLEdBQUQsQ0FBSCxHQUFXOEMsS0FBWDtDQUNIOztDQUNELFdBQU9rZixHQUFQO0NBQ0gsR0FUTSxFQVNKSCxXQVRJLENBQVA7Q0FVSCxDQXZERDs7Q0F5REEsSUFBSUksTUFBTSxHQUFHLFNBQVNDLGtCQUFULENBQTRCMVUsTUFBNUIsRUFBb0NDLE1BQXBDLEVBQTRDO0NBQ3JELFNBQU9qUSxNQUFNLENBQUN3USxJQUFQLENBQVlQLE1BQVosRUFBb0JzVSxNQUFwQixDQUEyQixVQUFVQyxHQUFWLEVBQWVoaUIsR0FBZixFQUFvQjtDQUNsRGdpQixJQUFBQSxHQUFHLENBQUNoaUIsR0FBRCxDQUFILEdBQVd5TixNQUFNLENBQUN6TixHQUFELENBQWpCO0NBQ0EsV0FBT2dpQixHQUFQO0NBQ0gsR0FITSxFQUdKeFUsTUFISSxDQUFQO0NBSUgsQ0FMRDs7Q0FPQSxJQUFJMlUsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBVTdpQixHQUFWLEVBQWU4aUIsT0FBZixFQUF3QkMsT0FBeEIsRUFBaUM7Q0FDMUMsTUFBSUMsY0FBYyxHQUFHaGpCLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLEtBQVosRUFBbUIsR0FBbkIsQ0FBckI7O0NBQ0EsTUFBSThpQixPQUFPLEtBQUssWUFBaEIsRUFBOEI7O0NBRTFCLFdBQU9DLGNBQWMsQ0FBQy9pQixPQUFmLENBQXVCLGdCQUF2QixFQUF5Q3lKLFFBQXpDLENBQVA7Q0FDSCxHQUx5Qzs7O0NBTzFDLE1BQUk7Q0FDQSxXQUFPeEQsa0JBQWtCLENBQUM4YyxjQUFELENBQXpCO0NBQ0gsR0FGRCxDQUVFLE9BQU94WCxDQUFQLEVBQVU7Q0FDUixXQUFPd1gsY0FBUDtDQUNIO0NBQ0osQ0FaRDs7Q0FjQSxJQUFJMWhCLE1BQU0sR0FBRyxTQUFTQSxNQUFULENBQWdCdEIsR0FBaEIsRUFBcUJpakIsY0FBckIsRUFBcUNGLE9BQXJDLEVBQThDRyxJQUE5QyxFQUFvREMsTUFBcEQsRUFBNEQ7OztDQUdyRSxNQUFJbmpCLEdBQUcsQ0FBQ25DLE1BQUosS0FBZSxDQUFuQixFQUFzQjtDQUNsQixXQUFPbUMsR0FBUDtDQUNIOztDQUVELE1BQUlxWCxNQUFNLEdBQUdyWCxHQUFiOztDQUNBLE1BQUksUUFBT0EsR0FBUCxNQUFlLFFBQW5CLEVBQTZCO0NBQ3pCcVgsSUFBQUEsTUFBTSxHQUFHbEcsTUFBTSxDQUFDaFQsU0FBUCxDQUFpQkYsUUFBakIsQ0FBMEJLLElBQTFCLENBQStCMEIsR0FBL0IsQ0FBVDtDQUNILEdBRkQsTUFFTyxJQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtDQUNoQ3FYLElBQUFBLE1BQU0sR0FBR3BCLE1BQU0sQ0FBQ2pXLEdBQUQsQ0FBZjtDQUNIOztDQUVELE1BQUkraUIsT0FBTyxLQUFLLFlBQWhCLEVBQThCO0NBQzFCLFdBQU9LLE1BQU0sQ0FBQy9MLE1BQUQsQ0FBTixDQUFlcFgsT0FBZixDQUF1QixpQkFBdkIsRUFBMEMsVUFBVW9qQixFQUFWLEVBQWM7Q0FDM0QsYUFBTyxXQUFXM04sUUFBUSxDQUFDMk4sRUFBRSxDQUFDdmlCLEtBQUgsQ0FBUyxDQUFULENBQUQsRUFBYyxFQUFkLENBQW5CLEdBQXVDLEtBQTlDO0NBQ0gsS0FGTSxDQUFQO0NBR0g7O0NBRUQsTUFBSXdpQixHQUFHLEdBQUcsRUFBVjs7Q0FDQSxPQUFLLElBQUl4bEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3VaLE1BQU0sQ0FBQ3haLE1BQTNCLEVBQW1DLEVBQUVDLENBQXJDLEVBQXdDO0NBQ3BDLFFBQUlrUyxDQUFDLEdBQUdxSCxNQUFNLENBQUNqVyxVQUFQLENBQWtCdEQsQ0FBbEIsQ0FBUjs7Q0FFQSxRQUNJa1MsQ0FBQyxLQUFLLElBQU47Q0FBQSxPQUNHQSxDQUFDLEtBQUssSUFEVDtDQUFBLE9BRUdBLENBQUMsS0FBSyxJQUZUO0NBQUEsT0FHR0EsQ0FBQyxLQUFLLElBSFQ7Q0FBQSxPQUlJQSxDQUFDLElBQUksSUFBTCxJQUFhQSxDQUFDLElBQUksSUFKdEI7Q0FBQSxPQUtJQSxDQUFDLElBQUksSUFBTCxJQUFhQSxDQUFDLElBQUksSUFMdEI7Q0FBQSxPQU1JQSxDQUFDLElBQUksSUFBTCxJQUFhQSxDQUFDLElBQUksSUFOdEI7Q0FBQSxPQU9JbVQsTUFBTSxLQUFLeEIsU0FBTyxDQUFDRixPQUFuQixLQUErQnpSLENBQUMsS0FBSyxJQUFOLElBQWNBLENBQUMsS0FBSyxJQUFuRCxDQVJSO0NBQUEsTUFTRTtDQUNFc1QsTUFBQUEsR0FBRyxJQUFJak0sTUFBTSxDQUFDOU8sTUFBUCxDQUFjekssQ0FBZCxDQUFQO0NBQ0E7Q0FDSDs7Q0FFRCxRQUFJa1MsQ0FBQyxHQUFHLElBQVIsRUFBYztDQUNWc1QsTUFBQUEsR0FBRyxHQUFHQSxHQUFHLEdBQUd6QixRQUFRLENBQUM3UixDQUFELENBQXBCO0NBQ0E7Q0FDSDs7Q0FFRCxRQUFJQSxDQUFDLEdBQUcsS0FBUixFQUFlO0NBQ1hzVCxNQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSXpCLFFBQVEsQ0FBQyxPQUFRN1IsQ0FBQyxJQUFJLENBQWQsQ0FBUixHQUE0QjZSLFFBQVEsQ0FBQyxPQUFRN1IsQ0FBQyxHQUFHLElBQWIsQ0FBeEMsQ0FBVDtDQUNBO0NBQ0g7O0NBRUQsUUFBSUEsQ0FBQyxHQUFHLE1BQUosSUFBY0EsQ0FBQyxJQUFJLE1BQXZCLEVBQStCO0NBQzNCc1QsTUFBQUEsR0FBRyxHQUFHQSxHQUFHLElBQUl6QixRQUFRLENBQUMsT0FBUTdSLENBQUMsSUFBSSxFQUFkLENBQVIsR0FBNkI2UixRQUFRLENBQUMsT0FBUzdSLENBQUMsSUFBSSxDQUFOLEdBQVcsSUFBcEIsQ0FBckMsR0FBa0U2UixRQUFRLENBQUMsT0FBUTdSLENBQUMsR0FBRyxJQUFiLENBQTlFLENBQVQ7Q0FDQTtDQUNIOztDQUVEbFMsSUFBQUEsQ0FBQyxJQUFJLENBQUw7Q0FDQWtTLElBQUFBLENBQUMsR0FBRyxXQUFZLENBQUNBLENBQUMsR0FBRyxLQUFMLEtBQWUsRUFBaEIsR0FBdUJxSCxNQUFNLENBQUNqVyxVQUFQLENBQWtCdEQsQ0FBbEIsSUFBdUIsS0FBekQsQ0FBSjtDQUNBd2xCLElBQUFBLEdBQUcsSUFBSXpCLFFBQVEsQ0FBQyxPQUFRN1IsQ0FBQyxJQUFJLEVBQWQsQ0FBUixHQUNENlIsUUFBUSxDQUFDLE9BQVM3UixDQUFDLElBQUksRUFBTixHQUFZLElBQXJCLENBRFAsR0FFRDZSLFFBQVEsQ0FBQyxPQUFTN1IsQ0FBQyxJQUFJLENBQU4sR0FBVyxJQUFwQixDQUZQLEdBR0Q2UixRQUFRLENBQUMsT0FBUTdSLENBQUMsR0FBRyxJQUFiLENBSGQ7Q0FJSDs7Q0FFRCxTQUFPc1QsR0FBUDtDQUNILENBOUREOztDQWdFQSxJQUFJQyxPQUFPLEdBQUcsU0FBU0EsT0FBVCxDQUFpQi9mLEtBQWpCLEVBQXdCO0NBQ2xDLE1BQUl3ZSxLQUFLLEdBQUcsQ0FBQztDQUFFeGhCLElBQUFBLEdBQUcsRUFBRTtDQUFFZ2pCLE1BQUFBLENBQUMsRUFBRWhnQjtDQUFMLEtBQVA7Q0FBcUI2SyxJQUFBQSxJQUFJLEVBQUU7Q0FBM0IsR0FBRCxDQUFaO0NBQ0EsTUFBSW9WLElBQUksR0FBRyxFQUFYOztDQUVBLE9BQUssSUFBSTNsQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHa2tCLEtBQUssQ0FBQ25rQixNQUExQixFQUFrQyxFQUFFQyxDQUFwQyxFQUF1QztDQUNuQyxRQUFJbWtCLElBQUksR0FBR0QsS0FBSyxDQUFDbGtCLENBQUQsQ0FBaEI7Q0FDQSxRQUFJMEMsR0FBRyxHQUFHeWhCLElBQUksQ0FBQ3poQixHQUFMLENBQVN5aEIsSUFBSSxDQUFDNVQsSUFBZCxDQUFWO0NBRUEsUUFBSUssSUFBSSxHQUFHeFEsTUFBTSxDQUFDd1EsSUFBUCxDQUFZbE8sR0FBWixDQUFYOztDQUNBLFNBQUssSUFBSXFmLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUduUixJQUFJLENBQUM3USxNQUF6QixFQUFpQyxFQUFFZ2lCLENBQW5DLEVBQXNDO0NBQ2xDLFVBQUluZixHQUFHLEdBQUdnTyxJQUFJLENBQUNtUixDQUFELENBQWQ7Q0FDQSxVQUFJeGhCLEdBQUcsR0FBR21DLEdBQUcsQ0FBQ0UsR0FBRCxDQUFiOztDQUNBLFVBQUksUUFBT3JDLEdBQVAsTUFBZSxRQUFmLElBQTJCQSxHQUFHLEtBQUssSUFBbkMsSUFBMkNvbEIsSUFBSSxDQUFDbGhCLE9BQUwsQ0FBYWxFLEdBQWIsTUFBc0IsQ0FBQyxDQUF0RSxFQUF5RTtDQUNyRTJqQixRQUFBQSxLQUFLLENBQUM1ZixJQUFOLENBQVc7Q0FBRTVCLFVBQUFBLEdBQUcsRUFBRUEsR0FBUDtDQUFZNk4sVUFBQUEsSUFBSSxFQUFFM047Q0FBbEIsU0FBWDtDQUNBK2lCLFFBQUFBLElBQUksQ0FBQ3JoQixJQUFMLENBQVUvRCxHQUFWO0NBQ0g7Q0FDSjtDQUNKOztDQUVEMGpCLEVBQUFBLFlBQVksQ0FBQ0MsS0FBRCxDQUFaO0NBRUEsU0FBT3hlLEtBQVA7Q0FDSCxDQXRCRDs7Q0F3QkEsSUFBSTBhLFFBQVEsR0FBRyxTQUFTQSxRQUFULENBQWtCMWQsR0FBbEIsRUFBdUI7Q0FDbEMsU0FBT3RDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkYsUUFBakIsQ0FBMEJLLElBQTFCLENBQStCa0MsR0FBL0IsTUFBd0MsaUJBQS9DO0NBQ0gsQ0FGRDs7Q0FJQSxJQUFJaEMsUUFBUSxHQUFHLFNBQVNBLFFBQVQsQ0FBa0JnQyxHQUFsQixFQUF1QjtDQUNsQyxNQUFJLENBQUNBLEdBQUQsSUFBUSxRQUFPQSxHQUFQLE1BQWUsUUFBM0IsRUFBcUM7Q0FDakMsV0FBTyxLQUFQO0NBQ0g7O0NBRUQsU0FBTyxDQUFDLEVBQUVBLEdBQUcsQ0FBQy9CLFdBQUosSUFBbUIrQixHQUFHLENBQUMvQixXQUFKLENBQWdCRCxRQUFuQyxJQUErQ2dDLEdBQUcsQ0FBQy9CLFdBQUosQ0FBZ0JELFFBQWhCLENBQXlCZ0MsR0FBekIsQ0FBakQsQ0FBUjtDQUNILENBTkQ7O0NBUUEsSUFBSWtqQixPQUFPLEdBQUcsU0FBU0EsT0FBVCxDQUFpQjFpQixDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUI7Q0FDakMsU0FBTyxHQUFHcUcsTUFBSCxDQUFVdEcsQ0FBVixFQUFhQyxDQUFiLENBQVA7Q0FDSCxDQUZEOztDQUlBLElBQUkwaUIsUUFBUSxHQUFHLFNBQVNBLFFBQVQsQ0FBa0J0bEIsR0FBbEIsRUFBdUJkLEVBQXZCLEVBQTJCO0NBQ3RDLE1BQUlhLFNBQU8sQ0FBQ0MsR0FBRCxDQUFYLEVBQWtCO0NBQ2QsUUFBSXVsQixNQUFNLEdBQUcsRUFBYjs7Q0FDQSxTQUFLLElBQUk5bEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR08sR0FBRyxDQUFDUixNQUF4QixFQUFnQ0MsQ0FBQyxJQUFJLENBQXJDLEVBQXdDO0NBQ3BDOGxCLE1BQUFBLE1BQU0sQ0FBQ3hoQixJQUFQLENBQVk3RSxFQUFFLENBQUNjLEdBQUcsQ0FBQ1AsQ0FBRCxDQUFKLENBQWQ7Q0FDSDs7Q0FDRCxXQUFPOGxCLE1BQVA7Q0FDSDs7Q0FDRCxTQUFPcm1CLEVBQUUsQ0FBQ2MsR0FBRCxDQUFUO0NBQ0gsQ0FURDs7S0FXQWdELE9BQWMsR0FBRztDQUNiK2dCLEVBQUFBLGFBQWEsRUFBRUEsYUFERjtDQUViTyxFQUFBQSxNQUFNLEVBQUVBLE1BRks7Q0FHYmUsRUFBQUEsT0FBTyxFQUFFQSxPQUhJO0NBSWJILEVBQUFBLE9BQU8sRUFBRUEsT0FKSTtDQUtiVixFQUFBQSxNQUFNLEVBQUVBLE1BTEs7Q0FNYnZoQixFQUFBQSxNQUFNLEVBQUVBLE1BTks7Q0FPYjlDLEVBQUFBLFFBQVEsRUFBRUEsUUFQRztDQVFiMGYsRUFBQUEsUUFBUSxFQUFFQSxRQVJHO0NBU2J5RixFQUFBQSxRQUFRLEVBQUVBLFFBVEc7Q0FVYi9pQixFQUFBQSxLQUFLLEVBQUVBO0NBVk07O0NDN09qQixJQUFJb2dCLGNBQWMsR0FBR2hqQixXQUFyQjtDQUNBLElBQUlxRCxPQUFLLEdBQUdzRixPQUFaO0NBQ0EsSUFBSWdiLFNBQU8sR0FBR2paLFNBQWQ7Q0FDQSxJQUFJc1IsS0FBRyxHQUFHOWIsTUFBTSxDQUFDQyxTQUFQLENBQWlCd0MsY0FBM0I7Q0FFQSxJQUFJa2pCLHFCQUFxQixHQUFHO0NBQ3hCQyxFQUFBQSxRQUFRLEVBQUUsU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7Q0FDaEMsV0FBT0EsTUFBTSxHQUFHLElBQWhCO0NBQ0gsR0FIdUI7Q0FJeEJDLEVBQUFBLEtBQUssRUFBRSxPQUppQjtDQUt4QkMsRUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUJGLE1BQWpCLEVBQXlCcmpCLEdBQXpCLEVBQThCO0NBQ25DLFdBQU9xakIsTUFBTSxHQUFHLEdBQVQsR0FBZXJqQixHQUFmLEdBQXFCLEdBQTVCO0NBQ0gsR0FQdUI7Q0FReEJ3akIsRUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsQ0FBZ0JILE1BQWhCLEVBQXdCO0NBQzVCLFdBQU9BLE1BQVA7Q0FDSDtDQVZ1QixDQUE1QjtDQWFBLElBQUkzbEIsU0FBTyxHQUFHVCxLQUFLLENBQUNTLE9BQXBCO0NBQ0EsSUFBSWdFLElBQUksR0FBR3pFLEtBQUssQ0FBQ1EsU0FBTixDQUFnQmlFLElBQTNCOztDQUNBLElBQUkraEIsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBVS9ULEdBQVYsRUFBZWdVLFlBQWYsRUFBNkI7Q0FDM0NoaUIsRUFBQUEsSUFBSSxDQUFDckUsS0FBTCxDQUFXcVMsR0FBWCxFQUFnQmhTLFNBQU8sQ0FBQ2dtQixZQUFELENBQVAsR0FBd0JBLFlBQXhCLEdBQXVDLENBQUNBLFlBQUQsQ0FBdkQ7Q0FDSCxDQUZEOztDQUlBLElBQUlDLEtBQUssR0FBR3hlLElBQUksQ0FBQzFILFNBQUwsQ0FBZThELFdBQTNCO0NBRUEsSUFBSXFpQixhQUFhLEdBQUczQyxTQUFPLENBQUMsU0FBRCxDQUEzQjtDQUNBLElBQUlsVixVQUFRLEdBQUc7Q0FDWDhYLEVBQUFBLGNBQWMsRUFBRSxLQURMO0NBRVhDLEVBQUFBLFNBQVMsRUFBRSxLQUZBO0NBR1h6QixFQUFBQSxPQUFPLEVBQUUsT0FIRTtDQUlYMEIsRUFBQUEsZUFBZSxFQUFFLEtBSk47Q0FLWEMsRUFBQUEsU0FBUyxFQUFFLEdBTEE7Q0FNWHBqQixFQUFBQSxNQUFNLEVBQUUsSUFORztDQU9YcWpCLEVBQUFBLE9BQU8sRUFBRXRqQixPQUFLLENBQUNDLE1BUEo7Q0FRWHNqQixFQUFBQSxnQkFBZ0IsRUFBRSxLQVJQO0NBU1h6QixFQUFBQSxNQUFNLEVBQUVtQixhQVRHO0NBVVhPLEVBQUFBLFNBQVMsRUFBRWxELFNBQU8sQ0FBQ0MsVUFBUixDQUFtQjBDLGFBQW5CLENBVkE7O0NBWVhMLEVBQUFBLE9BQU8sRUFBRSxLQVpFO0NBYVhhLEVBQUFBLGFBQWEsRUFBRSxTQUFTQSxhQUFULENBQXVCQyxJQUF2QixFQUE2QjtDQUN4QyxXQUFPVixLQUFLLENBQUMvbEIsSUFBTixDQUFXeW1CLElBQVgsQ0FBUDtDQUNILEdBZlU7Q0FnQlhDLEVBQUFBLFNBQVMsRUFBRSxLQWhCQTtDQWlCWEMsRUFBQUEsa0JBQWtCLEVBQUU7Q0FqQlQsQ0FBZjs7Q0FvQkEsSUFBSUMscUJBQXFCLEdBQUcsU0FBU0EscUJBQVQsQ0FBK0JsakIsQ0FBL0IsRUFBa0M7Q0FDMUQsU0FBTyxPQUFPQSxDQUFQLEtBQWEsUUFBYixJQUNBLE9BQU9BLENBQVAsS0FBYSxRQURiLElBRUEsT0FBT0EsQ0FBUCxLQUFhLFNBRmIsSUFHQSxRQUFPQSxDQUFQLE1BQWEsUUFIYixJQUlBLE9BQU9BLENBQVAsS0FBYSxRQUpwQjtDQUtILENBTkQ7O0NBUUEsSUFBSUcsV0FBUyxHQUFHLFNBQVNBLFNBQVQsQ0FDWmdqQixNQURZLEVBRVpwQixNQUZZLEVBR1pxQixtQkFIWSxFQUlaSCxrQkFKWSxFQUtaRCxTQUxZLEVBTVpMLE9BTlksRUFPWmhXLE1BUFksRUFRWjBXLElBUlksRUFTWmIsU0FUWSxFQVVaTSxhQVZZLEVBV1ozQixNQVhZLEVBWVowQixTQVpZLEVBYVpELGdCQWJZLEVBY1o3QixPQWRZLEVBZVpoQyxXQWZZLEVBZ0JkO0NBQ0UsTUFBSXZnQixHQUFHLEdBQUcya0IsTUFBVjs7Q0FFQSxNQUFJcEUsV0FBVyxDQUFDL0csR0FBWixDQUFnQm1MLE1BQWhCLENBQUosRUFBNkI7Q0FDekIsVUFBTSxJQUFJdlAsVUFBSixDQUFlLHFCQUFmLENBQU47Q0FDSDs7Q0FFRCxNQUFJLE9BQU9qSCxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0NBQzlCbk8sSUFBQUEsR0FBRyxHQUFHbU8sTUFBTSxDQUFDb1YsTUFBRCxFQUFTdmpCLEdBQVQsQ0FBWjtDQUNILEdBRkQsTUFFTyxJQUFJQSxHQUFHLFlBQVlxRixJQUFuQixFQUF5QjtDQUM1QnJGLElBQUFBLEdBQUcsR0FBR3NrQixhQUFhLENBQUN0a0IsR0FBRCxDQUFuQjtDQUNILEdBRk0sTUFFQSxJQUFJNGtCLG1CQUFtQixLQUFLLE9BQXhCLElBQW1DaG5CLFNBQU8sQ0FBQ29DLEdBQUQsQ0FBOUMsRUFBcUQ7Q0FDeERBLElBQUFBLEdBQUcsR0FBR2EsT0FBSyxDQUFDc2lCLFFBQU4sQ0FBZW5qQixHQUFmLEVBQW9CLFVBQVVnRCxLQUFWLEVBQWlCO0NBQ3ZDLFVBQUlBLEtBQUssWUFBWXFDLElBQXJCLEVBQTJCO0NBQ3ZCLGVBQU9pZixhQUFhLENBQUN0aEIsS0FBRCxDQUFwQjtDQUNIOztDQUNELGFBQU9BLEtBQVA7Q0FDSCxLQUxLLENBQU47Q0FNSDs7Q0FFRCxNQUFJaEQsR0FBRyxLQUFLLElBQVosRUFBa0I7Q0FDZCxRQUFJeWtCLGtCQUFKLEVBQXdCO0NBQ3BCLGFBQU9OLE9BQU8sSUFBSSxDQUFDQyxnQkFBWixHQUErQkQsT0FBTyxDQUFDWixNQUFELEVBQVN0WCxVQUFRLENBQUNrWSxPQUFsQixFQUEyQjVCLE9BQTNCLEVBQW9DLEtBQXBDLEVBQTJDSSxNQUEzQyxDQUF0QyxHQUEyRlksTUFBbEc7Q0FDSDs7Q0FFRHZqQixJQUFBQSxHQUFHLEdBQUcsRUFBTjtDQUNIOztDQUVELE1BQUkwa0IscUJBQXFCLENBQUMxa0IsR0FBRCxDQUFyQixJQUE4QmEsT0FBSyxDQUFDN0MsUUFBTixDQUFlZ0MsR0FBZixDQUFsQyxFQUF1RDtDQUNuRCxRQUFJbWtCLE9BQUosRUFBYTtDQUNULFVBQUlXLFFBQVEsR0FBR1YsZ0JBQWdCLEdBQUdiLE1BQUgsR0FBWVksT0FBTyxDQUFDWixNQUFELEVBQVN0WCxVQUFRLENBQUNrWSxPQUFsQixFQUEyQjVCLE9BQTNCLEVBQW9DLEtBQXBDLEVBQTJDSSxNQUEzQyxDQUFsRDtDQUNBLGFBQU8sQ0FBQzBCLFNBQVMsQ0FBQ1MsUUFBRCxDQUFULEdBQXNCLEdBQXRCLEdBQTRCVCxTQUFTLENBQUNGLE9BQU8sQ0FBQ25rQixHQUFELEVBQU1pTSxVQUFRLENBQUNrWSxPQUFmLEVBQXdCNUIsT0FBeEIsRUFBaUMsT0FBakMsRUFBMENJLE1BQTFDLENBQVIsQ0FBdEMsQ0FBUDtDQUNIOztDQUNELFdBQU8sQ0FBQzBCLFNBQVMsQ0FBQ2QsTUFBRCxDQUFULEdBQW9CLEdBQXBCLEdBQTBCYyxTQUFTLENBQUM1TyxNQUFNLENBQUN6VixHQUFELENBQVAsQ0FBcEMsQ0FBUDtDQUNIOztDQUVELE1BQUkra0IsTUFBTSxHQUFHLEVBQWI7O0NBRUEsTUFBSSxPQUFPL2tCLEdBQVAsS0FBZSxXQUFuQixFQUFnQztDQUM1QixXQUFPK2tCLE1BQVA7Q0FDSDs7Q0FFRCxNQUFJQyxPQUFKOztDQUNBLE1BQUlKLG1CQUFtQixLQUFLLE9BQXhCLElBQW1DaG5CLFNBQU8sQ0FBQ29DLEdBQUQsQ0FBOUMsRUFBcUQ7O0NBRWpEZ2xCLElBQUFBLE9BQU8sR0FBRyxDQUFDO0NBQUVoaUIsTUFBQUEsS0FBSyxFQUFFaEQsR0FBRyxDQUFDM0MsTUFBSixHQUFhLENBQWIsR0FBaUIyQyxHQUFHLENBQUM2QixJQUFKLENBQVMsR0FBVCxLQUFpQixJQUFsQyxHQUF5Q2dKO0NBQWxELEtBQUQsQ0FBVjtDQUNILEdBSEQsTUFHTyxJQUFJak4sU0FBTyxDQUFDdVEsTUFBRCxDQUFYLEVBQXFCO0NBQ3hCNlcsSUFBQUEsT0FBTyxHQUFHN1csTUFBVjtDQUNILEdBRk0sTUFFQTtDQUNILFFBQUlELElBQUksR0FBR3hRLE1BQU0sQ0FBQ3dRLElBQVAsQ0FBWWxPLEdBQVosQ0FBWDtDQUNBZ2xCLElBQUFBLE9BQU8sR0FBR0gsSUFBSSxHQUFHM1csSUFBSSxDQUFDMlcsSUFBTCxDQUFVQSxJQUFWLENBQUgsR0FBcUIzVyxJQUFuQztDQUNIOztDQUVELE9BQUssSUFBSTVRLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcwbkIsT0FBTyxDQUFDM25CLE1BQTVCLEVBQW9DLEVBQUVDLENBQXRDLEVBQXlDO0NBQ3JDLFFBQUk0QyxHQUFHLEdBQUc4a0IsT0FBTyxDQUFDMW5CLENBQUQsQ0FBakI7Q0FDQSxRQUFJMEYsS0FBSyxHQUFHLFFBQU85QyxHQUFQLE1BQWUsUUFBZixJQUEyQkEsR0FBRyxDQUFDOEMsS0FBSixLQUFjNkgsU0FBekMsR0FBcUQzSyxHQUFHLENBQUM4QyxLQUF6RCxHQUFpRWhELEdBQUcsQ0FBQ0UsR0FBRCxDQUFoRjs7Q0FFQSxRQUFJc2tCLFNBQVMsSUFBSXhoQixLQUFLLEtBQUssSUFBM0IsRUFBaUM7Q0FDN0I7Q0FDSDs7Q0FFRCxRQUFJaWlCLFNBQVMsR0FBR3JuQixTQUFPLENBQUNvQyxHQUFELENBQVAsR0FDVixPQUFPNGtCLG1CQUFQLEtBQStCLFVBQS9CLEdBQTRDQSxtQkFBbUIsQ0FBQ3JCLE1BQUQsRUFBU3JqQixHQUFULENBQS9ELEdBQStFcWpCLE1BRHJFLEdBRVZBLE1BQU0sSUFBSVMsU0FBUyxHQUFHLE1BQU05akIsR0FBVCxHQUFlLE1BQU1BLEdBQU4sR0FBWSxHQUF4QyxDQUZaO0NBSUFxZ0IsSUFBQUEsV0FBVyxDQUFDTyxHQUFaLENBQWdCNkQsTUFBaEIsRUFBd0IsSUFBeEI7Q0FDQSxRQUFJTyxnQkFBZ0IsR0FBRzFFLGNBQWMsRUFBckM7Q0FDQW1ELElBQUFBLFdBQVcsQ0FBQ29CLE1BQUQsRUFBU3BqQixTQUFTLENBQ3pCcUIsS0FEeUIsRUFFekJpaUIsU0FGeUIsRUFHekJMLG1CQUh5QixFQUl6Qkgsa0JBSnlCLEVBS3pCRCxTQUx5QixFQU16QkwsT0FOeUIsRUFPekJoVyxNQVB5QixFQVF6QjBXLElBUnlCLEVBU3pCYixTQVR5QixFQVV6Qk0sYUFWeUIsRUFXekIzQixNQVh5QixFQVl6QjBCLFNBWnlCLEVBYXpCRCxnQkFieUIsRUFjekI3QixPQWR5QixFQWV6QjJDLGdCQWZ5QixDQUFsQixDQUFYO0NBaUJIOztDQUVELFNBQU9ILE1BQVA7Q0FDSCxDQXZHRDs7Q0F5R0EsSUFBSUkseUJBQXlCLEdBQUcsU0FBU0EseUJBQVQsQ0FBbUNoSyxJQUFuQyxFQUF5QztDQUNyRSxNQUFJLENBQUNBLElBQUwsRUFBVztDQUNQLFdBQU9sUCxVQUFQO0NBQ0g7O0NBRUQsTUFBSWtQLElBQUksQ0FBQ2dKLE9BQUwsS0FBaUIsSUFBakIsSUFBeUJoSixJQUFJLENBQUNnSixPQUFMLEtBQWlCdFosU0FBMUMsSUFBdUQsT0FBT3NRLElBQUksQ0FBQ2dKLE9BQVosS0FBd0IsVUFBbkYsRUFBK0Y7Q0FDM0YsVUFBTSxJQUFJL1UsU0FBSixDQUFjLCtCQUFkLENBQU47Q0FDSDs7Q0FFRCxNQUFJbVQsT0FBTyxHQUFHcEgsSUFBSSxDQUFDb0gsT0FBTCxJQUFnQnRXLFVBQVEsQ0FBQ3NXLE9BQXZDOztDQUNBLE1BQUksT0FBT3BILElBQUksQ0FBQ29ILE9BQVosS0FBd0IsV0FBeEIsSUFBdUNwSCxJQUFJLENBQUNvSCxPQUFMLEtBQWlCLE9BQXhELElBQW1FcEgsSUFBSSxDQUFDb0gsT0FBTCxLQUFpQixZQUF4RixFQUFzRztDQUNsRyxVQUFNLElBQUluVCxTQUFKLENBQWMsbUVBQWQsQ0FBTjtDQUNIOztDQUVELE1BQUl1VCxNQUFNLEdBQUd4QixTQUFPLENBQUMsU0FBRCxDQUFwQjs7Q0FDQSxNQUFJLE9BQU9oRyxJQUFJLENBQUN3SCxNQUFaLEtBQXVCLFdBQTNCLEVBQXdDO0NBQ3BDLFFBQUksQ0FBQ25KLEtBQUcsQ0FBQzFiLElBQUosQ0FBU3FqQixTQUFPLENBQUNDLFVBQWpCLEVBQTZCakcsSUFBSSxDQUFDd0gsTUFBbEMsQ0FBTCxFQUFnRDtDQUM1QyxZQUFNLElBQUl2VCxTQUFKLENBQWMsaUNBQWQsQ0FBTjtDQUNIOztDQUNEdVQsSUFBQUEsTUFBTSxHQUFHeEgsSUFBSSxDQUFDd0gsTUFBZDtDQUNIOztDQUNELE1BQUkwQixTQUFTLEdBQUdsRCxTQUFPLENBQUNDLFVBQVIsQ0FBbUJ1QixNQUFuQixDQUFoQjtDQUVBLE1BQUl4VSxNQUFNLEdBQUdsQyxVQUFRLENBQUNrQyxNQUF0Qjs7Q0FDQSxNQUFJLE9BQU9nTixJQUFJLENBQUNoTixNQUFaLEtBQXVCLFVBQXZCLElBQXFDdlEsU0FBTyxDQUFDdWQsSUFBSSxDQUFDaE4sTUFBTixDQUFoRCxFQUErRDtDQUMzREEsSUFBQUEsTUFBTSxHQUFHZ04sSUFBSSxDQUFDaE4sTUFBZDtDQUNIOztDQUVELFNBQU87Q0FDSDRWLElBQUFBLGNBQWMsRUFBRSxPQUFPNUksSUFBSSxDQUFDNEksY0FBWixLQUErQixTQUEvQixHQUEyQzVJLElBQUksQ0FBQzRJLGNBQWhELEdBQWlFOVgsVUFBUSxDQUFDOFgsY0FEdkY7Q0FFSEMsSUFBQUEsU0FBUyxFQUFFLE9BQU83SSxJQUFJLENBQUM2SSxTQUFaLEtBQTBCLFdBQTFCLEdBQXdDL1gsVUFBUSxDQUFDK1gsU0FBakQsR0FBNkQsQ0FBQyxDQUFDN0ksSUFBSSxDQUFDNkksU0FGNUU7Q0FHSHpCLElBQUFBLE9BQU8sRUFBRUEsT0FITjtDQUlIMEIsSUFBQUEsZUFBZSxFQUFFLE9BQU85SSxJQUFJLENBQUM4SSxlQUFaLEtBQWdDLFNBQWhDLEdBQTRDOUksSUFBSSxDQUFDOEksZUFBakQsR0FBbUVoWSxVQUFRLENBQUNnWSxlQUoxRjtDQUtIQyxJQUFBQSxTQUFTLEVBQUUsT0FBTy9JLElBQUksQ0FBQytJLFNBQVosS0FBMEIsV0FBMUIsR0FBd0NqWSxVQUFRLENBQUNpWSxTQUFqRCxHQUE2RC9JLElBQUksQ0FBQytJLFNBTDFFO0NBTUhwakIsSUFBQUEsTUFBTSxFQUFFLE9BQU9xYSxJQUFJLENBQUNyYSxNQUFaLEtBQXVCLFNBQXZCLEdBQW1DcWEsSUFBSSxDQUFDcmEsTUFBeEMsR0FBaURtTCxVQUFRLENBQUNuTCxNQU4vRDtDQU9IcWpCLElBQUFBLE9BQU8sRUFBRSxPQUFPaEosSUFBSSxDQUFDZ0osT0FBWixLQUF3QixVQUF4QixHQUFxQ2hKLElBQUksQ0FBQ2dKLE9BQTFDLEdBQW9EbFksVUFBUSxDQUFDa1ksT0FQbkU7Q0FRSEMsSUFBQUEsZ0JBQWdCLEVBQUUsT0FBT2pKLElBQUksQ0FBQ2lKLGdCQUFaLEtBQWlDLFNBQWpDLEdBQTZDakosSUFBSSxDQUFDaUosZ0JBQWxELEdBQXFFblksVUFBUSxDQUFDbVksZ0JBUjdGO0NBU0hqVyxJQUFBQSxNQUFNLEVBQUVBLE1BVEw7Q0FVSHdVLElBQUFBLE1BQU0sRUFBRUEsTUFWTDtDQVdIMEIsSUFBQUEsU0FBUyxFQUFFQSxTQVhSO0NBWUhDLElBQUFBLGFBQWEsRUFBRSxPQUFPbkosSUFBSSxDQUFDbUosYUFBWixLQUE4QixVQUE5QixHQUEyQ25KLElBQUksQ0FBQ21KLGFBQWhELEdBQWdFclksVUFBUSxDQUFDcVksYUFackY7Q0FhSEUsSUFBQUEsU0FBUyxFQUFFLE9BQU9ySixJQUFJLENBQUNxSixTQUFaLEtBQTBCLFNBQTFCLEdBQXNDckosSUFBSSxDQUFDcUosU0FBM0MsR0FBdUR2WSxVQUFRLENBQUN1WSxTQWJ4RTtDQWNISyxJQUFBQSxJQUFJLEVBQUUsT0FBTzFKLElBQUksQ0FBQzBKLElBQVosS0FBcUIsVUFBckIsR0FBa0MxSixJQUFJLENBQUMwSixJQUF2QyxHQUE4QyxJQWRqRDtDQWVISixJQUFBQSxrQkFBa0IsRUFBRSxPQUFPdEosSUFBSSxDQUFDc0osa0JBQVosS0FBbUMsU0FBbkMsR0FBK0N0SixJQUFJLENBQUNzSixrQkFBcEQsR0FBeUV4WSxVQUFRLENBQUN3WTtDQWZuRyxHQUFQO0NBaUJILENBN0NEOztLQStDQVcsV0FBYyxHQUFHLFNBQWpCQSxXQUFpQixDQUFVVCxNQUFWLEVBQWtCeEosSUFBbEIsRUFBd0I7Q0FDckMsTUFBSW5iLEdBQUcsR0FBRzJrQixNQUFWO0NBQ0EsTUFBSTNKLE9BQU8sR0FBR21LLHlCQUF5QixDQUFDaEssSUFBRCxDQUF2QztDQUVBLE1BQUk2SixPQUFKO0NBQ0EsTUFBSTdXLE1BQUo7O0NBRUEsTUFBSSxPQUFPNk0sT0FBTyxDQUFDN00sTUFBZixLQUEwQixVQUE5QixFQUEwQztDQUN0Q0EsSUFBQUEsTUFBTSxHQUFHNk0sT0FBTyxDQUFDN00sTUFBakI7Q0FDQW5PLElBQUFBLEdBQUcsR0FBR21PLE1BQU0sQ0FBQyxFQUFELEVBQUtuTyxHQUFMLENBQVo7Q0FDSCxHQUhELE1BR08sSUFBSXBDLFNBQU8sQ0FBQ29kLE9BQU8sQ0FBQzdNLE1BQVQsQ0FBWCxFQUE2QjtDQUNoQ0EsSUFBQUEsTUFBTSxHQUFHNk0sT0FBTyxDQUFDN00sTUFBakI7Q0FDQTZXLElBQUFBLE9BQU8sR0FBRzdXLE1BQVY7Q0FDSDs7Q0FFRCxNQUFJRCxJQUFJLEdBQUcsRUFBWDs7Q0FFQSxNQUFJLFFBQU9sTyxHQUFQLE1BQWUsUUFBZixJQUEyQkEsR0FBRyxLQUFLLElBQXZDLEVBQTZDO0NBQ3pDLFdBQU8sRUFBUDtDQUNIOztDQUVELE1BQUlxbEIsV0FBSjs7Q0FDQSxNQUFJbEssSUFBSSxJQUFJQSxJQUFJLENBQUNrSyxXQUFMLElBQW9CaEMscUJBQWhDLEVBQXVEO0NBQ25EZ0MsSUFBQUEsV0FBVyxHQUFHbEssSUFBSSxDQUFDa0ssV0FBbkI7Q0FDSCxHQUZELE1BRU8sSUFBSWxLLElBQUksSUFBSSxhQUFhQSxJQUF6QixFQUErQjtDQUNsQ2tLLElBQUFBLFdBQVcsR0FBR2xLLElBQUksQ0FBQ3NJLE9BQUwsR0FBZSxTQUFmLEdBQTJCLFFBQXpDO0NBQ0gsR0FGTSxNQUVBO0NBQ0g0QixJQUFBQSxXQUFXLEdBQUcsU0FBZDtDQUNIOztDQUVELE1BQUlULG1CQUFtQixHQUFHdkIscUJBQXFCLENBQUNnQyxXQUFELENBQS9DOztDQUVBLE1BQUksQ0FBQ0wsT0FBTCxFQUFjO0NBQ1ZBLElBQUFBLE9BQU8sR0FBR3RuQixNQUFNLENBQUN3USxJQUFQLENBQVlsTyxHQUFaLENBQVY7Q0FDSDs7Q0FFRCxNQUFJZ2IsT0FBTyxDQUFDNkosSUFBWixFQUFrQjtDQUNkRyxJQUFBQSxPQUFPLENBQUNILElBQVIsQ0FBYTdKLE9BQU8sQ0FBQzZKLElBQXJCO0NBQ0g7O0NBRUQsTUFBSXRFLFdBQVcsR0FBR0MsY0FBYyxFQUFoQzs7Q0FDQSxPQUFLLElBQUlsakIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzBuQixPQUFPLENBQUMzbkIsTUFBNUIsRUFBb0MsRUFBRUMsQ0FBdEMsRUFBeUM7Q0FDckMsUUFBSTRDLEdBQUcsR0FBRzhrQixPQUFPLENBQUMxbkIsQ0FBRCxDQUFqQjs7Q0FFQSxRQUFJMGQsT0FBTyxDQUFDd0osU0FBUixJQUFxQnhrQixHQUFHLENBQUNFLEdBQUQsQ0FBSCxLQUFhLElBQXRDLEVBQTRDO0NBQ3hDO0NBQ0g7O0NBQ0R5akIsSUFBQUEsV0FBVyxDQUFDelYsSUFBRCxFQUFPdk0sV0FBUyxDQUN2QjNCLEdBQUcsQ0FBQ0UsR0FBRCxDQURvQixFQUV2QkEsR0FGdUIsRUFHdkIwa0IsbUJBSHVCLEVBSXZCNUosT0FBTyxDQUFDeUosa0JBSmUsRUFLdkJ6SixPQUFPLENBQUN3SixTQUxlLEVBTXZCeEosT0FBTyxDQUFDbGEsTUFBUixHQUFpQmthLE9BQU8sQ0FBQ21KLE9BQXpCLEdBQW1DLElBTlosRUFPdkJuSixPQUFPLENBQUM3TSxNQVBlLEVBUXZCNk0sT0FBTyxDQUFDNkosSUFSZSxFQVN2QjdKLE9BQU8sQ0FBQ2dKLFNBVGUsRUFVdkJoSixPQUFPLENBQUNzSixhQVZlLEVBV3ZCdEosT0FBTyxDQUFDMkgsTUFYZSxFQVl2QjNILE9BQU8sQ0FBQ3FKLFNBWmUsRUFhdkJySixPQUFPLENBQUNvSixnQkFiZSxFQWN2QnBKLE9BQU8sQ0FBQ3VILE9BZGUsRUFldkJoQyxXQWZ1QixDQUFoQixDQUFYO0NBaUJIOztDQUVELE1BQUkrRSxNQUFNLEdBQUdwWCxJQUFJLENBQUNyTSxJQUFMLENBQVVtWixPQUFPLENBQUNrSixTQUFsQixDQUFiO0NBQ0EsTUFBSVgsTUFBTSxHQUFHdkksT0FBTyxDQUFDK0ksY0FBUixLQUEyQixJQUEzQixHQUFrQyxHQUFsQyxHQUF3QyxFQUFyRDs7Q0FFQSxNQUFJL0ksT0FBTyxDQUFDaUosZUFBWixFQUE2QjtDQUN6QixRQUFJakosT0FBTyxDQUFDdUgsT0FBUixLQUFvQixZQUF4QixFQUFzQzs7Q0FFbENnQixNQUFBQSxNQUFNLElBQUksc0JBQVY7Q0FDSCxLQUhELE1BR087O0NBRUhBLE1BQUFBLE1BQU0sSUFBSSxpQkFBVjtDQUNIO0NBQ0o7O0NBRUQsU0FBTytCLE1BQU0sQ0FBQ2pvQixNQUFQLEdBQWdCLENBQWhCLEdBQW9Ca21CLE1BQU0sR0FBRytCLE1BQTdCLEdBQXNDLEVBQTdDO0NBQ0g7O0NDL1JELElBQUl6a0IsS0FBSyxHQUFHckQsT0FBWjtDQUVBLElBQUlnYyxHQUFHLEdBQUc5YixNQUFNLENBQUNDLFNBQVAsQ0FBaUJ3QyxjQUEzQjtDQUNBLElBQUl2QyxPQUFPLEdBQUdULEtBQUssQ0FBQ1MsT0FBcEI7Q0FFQSxJQUFJcU8sUUFBUSxHQUFHO0NBQ1grWCxFQUFBQSxTQUFTLEVBQUUsS0FEQTtDQUVYbEMsRUFBQUEsZUFBZSxFQUFFLEtBRk47Q0FHWHlELEVBQUFBLFdBQVcsRUFBRSxLQUhGO0NBSVhDLEVBQUFBLFVBQVUsRUFBRSxFQUpEO0NBS1hqRCxFQUFBQSxPQUFPLEVBQUUsT0FMRTtDQU1YMEIsRUFBQUEsZUFBZSxFQUFFLEtBTk47Q0FPWFQsRUFBQUEsS0FBSyxFQUFFLEtBUEk7Q0FRWGxCLEVBQUFBLE9BQU8sRUFBRXpoQixLQUFLLENBQUN3aEIsTUFSSjtDQVNYNkIsRUFBQUEsU0FBUyxFQUFFLEdBVEE7Q0FVWGpKLEVBQUFBLEtBQUssRUFBRSxDQVZJO0NBV1h3SyxFQUFBQSxpQkFBaUIsRUFBRSxLQVhSO0NBWVhDLEVBQUFBLHdCQUF3QixFQUFFLEtBWmY7Q0FhWEMsRUFBQUEsY0FBYyxFQUFFLElBYkw7Q0FjWEMsRUFBQUEsV0FBVyxFQUFFLElBZEY7Q0FlWC9ELEVBQUFBLFlBQVksRUFBRSxLQWZIO0NBZ0JYNEMsRUFBQUEsa0JBQWtCLEVBQUU7Q0FoQlQsQ0FBZjs7Q0FtQkEsSUFBSWlCLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsQ0FBVWxtQixHQUFWLEVBQWU7Q0FDMUMsU0FBT0EsR0FBRyxDQUFDQyxPQUFKLENBQVksV0FBWixFQUF5QixVQUFVb2pCLEVBQVYsRUFBY2dELFNBQWQsRUFBeUI7Q0FDckQsV0FBT3BRLE1BQU0sQ0FBQ3FRLFlBQVAsQ0FBb0I1USxRQUFRLENBQUMyUSxTQUFELEVBQVksRUFBWixDQUE1QixDQUFQO0NBQ0gsR0FGTSxDQUFQO0NBR0gsQ0FKRDs7Q0FNQSxJQUFJRSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQVVsb0IsR0FBVixFQUFlbWQsT0FBZixFQUF3QjtDQUMxQyxNQUFJbmQsR0FBRyxJQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUF0QixJQUFrQ21kLE9BQU8sQ0FBQ3dJLEtBQTFDLElBQW1EM2xCLEdBQUcsQ0FBQ2tFLE9BQUosQ0FBWSxHQUFaLElBQW1CLENBQUMsQ0FBM0UsRUFBOEU7Q0FDMUUsV0FBT2xFLEdBQUcsQ0FBQzRJLEtBQUosQ0FBVSxHQUFWLENBQVA7Q0FDSDs7Q0FFRCxTQUFPNUksR0FBUDtDQUNILENBTkQ7Q0FTQTtDQUNBO0NBQ0E7Q0FDQTs7O0NBQ0EsSUFBSW1vQixXQUFXLEdBQUcscUJBQWxCO0NBRUE7O0NBQ0EsSUFBSS9CLGVBQWUsR0FBRyxnQkFBdEI7O0NBRUEsSUFBSWdDLFdBQVcsR0FBRyxTQUFTQyxzQkFBVCxDQUFnQzFtQixHQUFoQyxFQUFxQ3diLE9BQXJDLEVBQThDO0NBQzVELE1BQUloYixHQUFHLEdBQUcsRUFBVjtDQUNBLE1BQUltbUIsUUFBUSxHQUFHbkwsT0FBTyxDQUFDeUssaUJBQVIsR0FBNEJqbUIsR0FBRyxDQUFDQyxPQUFKLENBQVksS0FBWixFQUFtQixFQUFuQixDQUE1QixHQUFxREQsR0FBcEU7Q0FDQSxNQUFJNG1CLEtBQUssR0FBR3BMLE9BQU8sQ0FBQzJLLGNBQVIsS0FBMkJySyxRQUEzQixHQUFzQ3pRLFNBQXRDLEdBQWtEbVEsT0FBTyxDQUFDMkssY0FBdEU7Q0FDQSxNQUFJdGtCLEtBQUssR0FBRzhrQixRQUFRLENBQUMxZixLQUFULENBQWV1VSxPQUFPLENBQUNrSixTQUF2QixFQUFrQ2tDLEtBQWxDLENBQVo7Q0FDQSxNQUFJQyxTQUFTLEdBQUcsQ0FBQyxDQUFqQixDQUw0RDs7Q0FNNUQsTUFBSS9vQixDQUFKO0NBRUEsTUFBSWlsQixPQUFPLEdBQUd2SCxPQUFPLENBQUN1SCxPQUF0Qjs7Q0FDQSxNQUFJdkgsT0FBTyxDQUFDaUosZUFBWixFQUE2QjtDQUN6QixTQUFLM21CLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRytELEtBQUssQ0FBQ2hFLE1BQXRCLEVBQThCLEVBQUVDLENBQWhDLEVBQW1DO0NBQy9CLFVBQUkrRCxLQUFLLENBQUMvRCxDQUFELENBQUwsQ0FBU3lFLE9BQVQsQ0FBaUIsT0FBakIsTUFBOEIsQ0FBbEMsRUFBcUM7Q0FDakMsWUFBSVYsS0FBSyxDQUFDL0QsQ0FBRCxDQUFMLEtBQWEybUIsZUFBakIsRUFBa0M7Q0FDOUIxQixVQUFBQSxPQUFPLEdBQUcsT0FBVjtDQUNILFNBRkQsTUFFTyxJQUFJbGhCLEtBQUssQ0FBQy9ELENBQUQsQ0FBTCxLQUFhMG9CLFdBQWpCLEVBQThCO0NBQ2pDekQsVUFBQUEsT0FBTyxHQUFHLFlBQVY7Q0FDSDs7Q0FDRDhELFFBQUFBLFNBQVMsR0FBRy9vQixDQUFaO0NBQ0FBLFFBQUFBLENBQUMsR0FBRytELEtBQUssQ0FBQ2hFLE1BQVYsQ0FQaUM7Q0FRcEM7Q0FDSjtDQUNKOztDQUVELE9BQUtDLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRytELEtBQUssQ0FBQ2hFLE1BQXRCLEVBQThCLEVBQUVDLENBQWhDLEVBQW1DO0NBQy9CLFFBQUlBLENBQUMsS0FBSytvQixTQUFWLEVBQXFCO0NBQ2pCO0NBQ0g7O0NBQ0QsUUFBSXhPLElBQUksR0FBR3hXLEtBQUssQ0FBQy9ELENBQUQsQ0FBaEI7Q0FFQSxRQUFJZ3BCLGdCQUFnQixHQUFHek8sSUFBSSxDQUFDOVYsT0FBTCxDQUFhLElBQWIsQ0FBdkI7Q0FDQSxRQUFJd2tCLEdBQUcsR0FBR0QsZ0JBQWdCLEtBQUssQ0FBQyxDQUF0QixHQUEwQnpPLElBQUksQ0FBQzlWLE9BQUwsQ0FBYSxHQUFiLENBQTFCLEdBQThDdWtCLGdCQUFnQixHQUFHLENBQTNFO0NBRUEsUUFBSXBtQixHQUFKLEVBQVNyQyxHQUFUOztDQUNBLFFBQUkwb0IsR0FBRyxLQUFLLENBQUMsQ0FBYixFQUFnQjtDQUNacm1CLE1BQUFBLEdBQUcsR0FBRzhhLE9BQU8sQ0FBQ3NILE9BQVIsQ0FBZ0J6SyxJQUFoQixFQUFzQjVMLFFBQVEsQ0FBQ3FXLE9BQS9CLEVBQXdDQyxPQUF4QyxFQUFpRCxLQUFqRCxDQUFOO0NBQ0Exa0IsTUFBQUEsR0FBRyxHQUFHbWQsT0FBTyxDQUFDeUosa0JBQVIsR0FBNkIsSUFBN0IsR0FBb0MsRUFBMUM7Q0FDSCxLQUhELE1BR087Q0FDSHZrQixNQUFBQSxHQUFHLEdBQUc4YSxPQUFPLENBQUNzSCxPQUFSLENBQWdCekssSUFBSSxDQUFDdlgsS0FBTCxDQUFXLENBQVgsRUFBY2ltQixHQUFkLENBQWhCLEVBQW9DdGEsUUFBUSxDQUFDcVcsT0FBN0MsRUFBc0RDLE9BQXRELEVBQStELEtBQS9ELENBQU47Q0FDQTFrQixNQUFBQSxHQUFHLEdBQUdnRCxLQUFLLENBQUNzaUIsUUFBTixDQUNGNEMsZUFBZSxDQUFDbE8sSUFBSSxDQUFDdlgsS0FBTCxDQUFXaW1CLEdBQUcsR0FBRyxDQUFqQixDQUFELEVBQXNCdkwsT0FBdEIsQ0FEYixFQUVGLFVBQVV3TCxVQUFWLEVBQXNCO0NBQ2xCLGVBQU94TCxPQUFPLENBQUNzSCxPQUFSLENBQWdCa0UsVUFBaEIsRUFBNEJ2YSxRQUFRLENBQUNxVyxPQUFyQyxFQUE4Q0MsT0FBOUMsRUFBdUQsT0FBdkQsQ0FBUDtDQUNILE9BSkMsQ0FBTjtDQU1IOztDQUVELFFBQUkxa0IsR0FBRyxJQUFJbWQsT0FBTyxDQUFDMEssd0JBQWYsSUFBMkNuRCxPQUFPLEtBQUssWUFBM0QsRUFBeUU7Q0FDckUxa0IsTUFBQUEsR0FBRyxHQUFHNm5CLHdCQUF3QixDQUFDN25CLEdBQUQsQ0FBOUI7Q0FDSDs7Q0FFRCxRQUFJZ2EsSUFBSSxDQUFDOVYsT0FBTCxDQUFhLEtBQWIsSUFBc0IsQ0FBQyxDQUEzQixFQUE4QjtDQUMxQmxFLE1BQUFBLEdBQUcsR0FBR0QsT0FBTyxDQUFDQyxHQUFELENBQVAsR0FBZSxDQUFDQSxHQUFELENBQWYsR0FBdUJBLEdBQTdCO0NBQ0g7O0NBRUQsUUFBSTJiLEdBQUcsQ0FBQzFiLElBQUosQ0FBU2tDLEdBQVQsRUFBY0UsR0FBZCxDQUFKLEVBQXdCO0NBQ3BCRixNQUFBQSxHQUFHLENBQUNFLEdBQUQsQ0FBSCxHQUFXVyxLQUFLLENBQUNxaUIsT0FBTixDQUFjbGpCLEdBQUcsQ0FBQ0UsR0FBRCxDQUFqQixFQUF3QnJDLEdBQXhCLENBQVg7Q0FDSCxLQUZELE1BRU87Q0FDSG1DLE1BQUFBLEdBQUcsQ0FBQ0UsR0FBRCxDQUFILEdBQVdyQyxHQUFYO0NBQ0g7Q0FDSjs7Q0FFRCxTQUFPbUMsR0FBUDtDQUNILENBOUREOztDQWdFQSxJQUFJeW1CLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQVVqWSxLQUFWLEVBQWlCM1EsR0FBakIsRUFBc0JtZCxPQUF0QixFQUErQjBMLFlBQS9CLEVBQTZDO0NBQzNELE1BQUlDLElBQUksR0FBR0QsWUFBWSxHQUFHN29CLEdBQUgsR0FBU2tvQixlQUFlLENBQUNsb0IsR0FBRCxFQUFNbWQsT0FBTixDQUEvQzs7Q0FFQSxPQUFLLElBQUkxZCxDQUFDLEdBQUdrUixLQUFLLENBQUNuUixNQUFOLEdBQWUsQ0FBNUIsRUFBK0JDLENBQUMsSUFBSSxDQUFwQyxFQUF1QyxFQUFFQSxDQUF6QyxFQUE0QztDQUN4QyxRQUFJMEMsR0FBSjtDQUNBLFFBQUk0bUIsSUFBSSxHQUFHcFksS0FBSyxDQUFDbFIsQ0FBRCxDQUFoQjs7Q0FFQSxRQUFJc3BCLElBQUksS0FBSyxJQUFULElBQWlCNUwsT0FBTyxDQUFDNEssV0FBN0IsRUFBMEM7Q0FDdEM1bEIsTUFBQUEsR0FBRyxHQUFHLEdBQUc4RyxNQUFILENBQVU2ZixJQUFWLENBQU47Q0FDSCxLQUZELE1BRU87Q0FDSDNtQixNQUFBQSxHQUFHLEdBQUdnYixPQUFPLENBQUM2RyxZQUFSLEdBQXVCbmtCLE1BQU0sQ0FBQ3lTLE1BQVAsQ0FBYyxJQUFkLENBQXZCLEdBQTZDLEVBQW5EO0NBQ0EsVUFBSTBXLFNBQVMsR0FBR0QsSUFBSSxDQUFDN2UsTUFBTCxDQUFZLENBQVosTUFBbUIsR0FBbkIsSUFBMEI2ZSxJQUFJLENBQUM3ZSxNQUFMLENBQVk2ZSxJQUFJLENBQUN2cEIsTUFBTCxHQUFjLENBQTFCLE1BQWlDLEdBQTNELEdBQWlFdXBCLElBQUksQ0FBQ3RtQixLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsQ0FBZixDQUFqRSxHQUFxRnNtQixJQUFyRztDQUNBLFVBQUlFLEtBQUssR0FBRzVSLFFBQVEsQ0FBQzJSLFNBQUQsRUFBWSxFQUFaLENBQXBCOztDQUNBLFVBQUksQ0FBQzdMLE9BQU8sQ0FBQzRLLFdBQVQsSUFBd0JpQixTQUFTLEtBQUssRUFBMUMsRUFBOEM7Q0FDMUM3bUIsUUFBQUEsR0FBRyxHQUFHO0NBQUUsYUFBRzJtQjtDQUFMLFNBQU47Q0FDSCxPQUZELE1BRU8sSUFDSCxDQUFDN1IsS0FBSyxDQUFDZ1MsS0FBRCxDQUFOLElBQ0dGLElBQUksS0FBS0MsU0FEWixJQUVHcFIsTUFBTSxDQUFDcVIsS0FBRCxDQUFOLEtBQWtCRCxTQUZyQixJQUdHQyxLQUFLLElBQUksQ0FIWixJQUlJOUwsT0FBTyxDQUFDNEssV0FBUixJQUF1QmtCLEtBQUssSUFBSTlMLE9BQU8sQ0FBQ3dLLFVBTHpDLEVBTUw7Q0FDRXhsQixRQUFBQSxHQUFHLEdBQUcsRUFBTjtDQUNBQSxRQUFBQSxHQUFHLENBQUM4bUIsS0FBRCxDQUFILEdBQWFILElBQWI7Q0FDSCxPQVRNLE1BU0E7Q0FDSDNtQixRQUFBQSxHQUFHLENBQUM2bUIsU0FBRCxDQUFILEdBQWlCRixJQUFqQjtDQUNIO0NBQ0o7O0NBRURBLElBQUFBLElBQUksR0FBRzNtQixHQUFQO0NBQ0g7O0NBRUQsU0FBTzJtQixJQUFQO0NBQ0gsQ0FqQ0Q7O0NBbUNBLElBQUlJLFNBQVMsR0FBRyxTQUFTQyxvQkFBVCxDQUE4QkMsUUFBOUIsRUFBd0NwcEIsR0FBeEMsRUFBNkNtZCxPQUE3QyxFQUFzRDBMLFlBQXRELEVBQW9FO0NBQ2hGLE1BQUksQ0FBQ08sUUFBTCxFQUFlO0NBQ1g7Q0FDSCxHQUgrRTs7O0NBTWhGLE1BQUkvbUIsR0FBRyxHQUFHOGEsT0FBTyxDQUFDZ0osU0FBUixHQUFvQmlELFFBQVEsQ0FBQ3huQixPQUFULENBQWlCLGFBQWpCLEVBQWdDLE1BQWhDLENBQXBCLEdBQThEd25CLFFBQXhFLENBTmdGOztDQVVoRixNQUFJM0QsUUFBUSxHQUFHLGNBQWY7Q0FDQSxNQUFJNEQsS0FBSyxHQUFHLGVBQVosQ0FYZ0Y7O0NBZWhGLE1BQUlDLE9BQU8sR0FBR25NLE9BQU8sQ0FBQ0MsS0FBUixHQUFnQixDQUFoQixJQUFxQnFJLFFBQVEsQ0FBQzhELElBQVQsQ0FBY2xuQixHQUFkLENBQW5DO0NBQ0EsTUFBSW1uQixNQUFNLEdBQUdGLE9BQU8sR0FBR2puQixHQUFHLENBQUNJLEtBQUosQ0FBVSxDQUFWLEVBQWE2bUIsT0FBTyxDQUFDTCxLQUFyQixDQUFILEdBQWlDNW1CLEdBQXJELENBaEJnRjs7Q0FvQmhGLE1BQUlnTyxJQUFJLEdBQUcsRUFBWDs7Q0FDQSxNQUFJbVosTUFBSixFQUFZOztDQUVSLFFBQUksQ0FBQ3JNLE9BQU8sQ0FBQzZHLFlBQVQsSUFBeUJySSxHQUFHLENBQUMxYixJQUFKLENBQVNKLE1BQU0sQ0FBQ0MsU0FBaEIsRUFBMkIwcEIsTUFBM0IsQ0FBN0IsRUFBaUU7Q0FDN0QsVUFBSSxDQUFDck0sT0FBTyxDQUFDOEcsZUFBYixFQUE4QjtDQUMxQjtDQUNIO0NBQ0o7O0NBRUQ1VCxJQUFBQSxJQUFJLENBQUN0TSxJQUFMLENBQVV5bEIsTUFBVjtDQUNILEdBOUIrRTs7O0NBa0NoRixNQUFJL3BCLENBQUMsR0FBRyxDQUFSOztDQUNBLFNBQU8wZCxPQUFPLENBQUNDLEtBQVIsR0FBZ0IsQ0FBaEIsSUFBcUIsQ0FBQ2tNLE9BQU8sR0FBR0QsS0FBSyxDQUFDRSxJQUFOLENBQVdsbkIsR0FBWCxDQUFYLE1BQWdDLElBQXJELElBQTZENUMsQ0FBQyxHQUFHMGQsT0FBTyxDQUFDQyxLQUFoRixFQUF1RjtDQUNuRjNkLElBQUFBLENBQUMsSUFBSSxDQUFMOztDQUNBLFFBQUksQ0FBQzBkLE9BQU8sQ0FBQzZHLFlBQVQsSUFBeUJySSxHQUFHLENBQUMxYixJQUFKLENBQVNKLE1BQU0sQ0FBQ0MsU0FBaEIsRUFBMkJ3cEIsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXN21CLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBQyxDQUFyQixDQUEzQixDQUE3QixFQUFrRjtDQUM5RSxVQUFJLENBQUMwYSxPQUFPLENBQUM4RyxlQUFiLEVBQThCO0NBQzFCO0NBQ0g7Q0FDSjs7Q0FDRDVULElBQUFBLElBQUksQ0FBQ3RNLElBQUwsQ0FBVXVsQixPQUFPLENBQUMsQ0FBRCxDQUFqQjtDQUNILEdBM0MrRTs7O0NBK0NoRixNQUFJQSxPQUFKLEVBQWE7Q0FDVGpaLElBQUFBLElBQUksQ0FBQ3RNLElBQUwsQ0FBVSxNQUFNMUIsR0FBRyxDQUFDSSxLQUFKLENBQVU2bUIsT0FBTyxDQUFDTCxLQUFsQixDQUFOLEdBQWlDLEdBQTNDO0NBQ0g7O0NBRUQsU0FBT0wsV0FBVyxDQUFDdlksSUFBRCxFQUFPclEsR0FBUCxFQUFZbWQsT0FBWixFQUFxQjBMLFlBQXJCLENBQWxCO0NBQ0gsQ0FwREQ7O0NBc0RBLElBQUlZLHFCQUFxQixHQUFHLFNBQVNBLHFCQUFULENBQStCbk0sSUFBL0IsRUFBcUM7Q0FDN0QsTUFBSSxDQUFDQSxJQUFMLEVBQVc7Q0FDUCxXQUFPbFAsUUFBUDtDQUNIOztDQUVELE1BQUlrUCxJQUFJLENBQUNtSCxPQUFMLEtBQWlCLElBQWpCLElBQXlCbkgsSUFBSSxDQUFDbUgsT0FBTCxLQUFpQnpYLFNBQTFDLElBQXVELE9BQU9zUSxJQUFJLENBQUNtSCxPQUFaLEtBQXdCLFVBQW5GLEVBQStGO0NBQzNGLFVBQU0sSUFBSWxULFNBQUosQ0FBYywrQkFBZCxDQUFOO0NBQ0g7O0NBRUQsTUFBSSxPQUFPK0wsSUFBSSxDQUFDb0gsT0FBWixLQUF3QixXQUF4QixJQUF1Q3BILElBQUksQ0FBQ29ILE9BQUwsS0FBaUIsT0FBeEQsSUFBbUVwSCxJQUFJLENBQUNvSCxPQUFMLEtBQWlCLFlBQXhGLEVBQXNHO0NBQ2xHLFVBQU0sSUFBSW5ULFNBQUosQ0FBYyxtRUFBZCxDQUFOO0NBQ0g7O0NBQ0QsTUFBSW1ULE9BQU8sR0FBRyxPQUFPcEgsSUFBSSxDQUFDb0gsT0FBWixLQUF3QixXQUF4QixHQUFzQ3RXLFFBQVEsQ0FBQ3NXLE9BQS9DLEdBQXlEcEgsSUFBSSxDQUFDb0gsT0FBNUU7Q0FFQSxTQUFPO0NBQ0h5QixJQUFBQSxTQUFTLEVBQUUsT0FBTzdJLElBQUksQ0FBQzZJLFNBQVosS0FBMEIsV0FBMUIsR0FBd0MvWCxRQUFRLENBQUMrWCxTQUFqRCxHQUE2RCxDQUFDLENBQUM3SSxJQUFJLENBQUM2SSxTQUQ1RTtDQUVIbEMsSUFBQUEsZUFBZSxFQUFFLE9BQU8zRyxJQUFJLENBQUMyRyxlQUFaLEtBQWdDLFNBQWhDLEdBQTRDM0csSUFBSSxDQUFDMkcsZUFBakQsR0FBbUU3VixRQUFRLENBQUM2VixlQUYxRjtDQUdIeUQsSUFBQUEsV0FBVyxFQUFFLE9BQU9wSyxJQUFJLENBQUNvSyxXQUFaLEtBQTRCLFNBQTVCLEdBQXdDcEssSUFBSSxDQUFDb0ssV0FBN0MsR0FBMkR0WixRQUFRLENBQUNzWixXQUg5RTtDQUlIQyxJQUFBQSxVQUFVLEVBQUUsT0FBT3JLLElBQUksQ0FBQ3FLLFVBQVosS0FBMkIsUUFBM0IsR0FBc0NySyxJQUFJLENBQUNxSyxVQUEzQyxHQUF3RHZaLFFBQVEsQ0FBQ3VaLFVBSjFFO0NBS0hqRCxJQUFBQSxPQUFPLEVBQUVBLE9BTE47Q0FNSDBCLElBQUFBLGVBQWUsRUFBRSxPQUFPOUksSUFBSSxDQUFDOEksZUFBWixLQUFnQyxTQUFoQyxHQUE0QzlJLElBQUksQ0FBQzhJLGVBQWpELEdBQW1FaFksUUFBUSxDQUFDZ1ksZUFOMUY7Q0FPSFQsSUFBQUEsS0FBSyxFQUFFLE9BQU9ySSxJQUFJLENBQUNxSSxLQUFaLEtBQXNCLFNBQXRCLEdBQWtDckksSUFBSSxDQUFDcUksS0FBdkMsR0FBK0N2WCxRQUFRLENBQUN1WCxLQVA1RDtDQVFIbEIsSUFBQUEsT0FBTyxFQUFFLE9BQU9uSCxJQUFJLENBQUNtSCxPQUFaLEtBQXdCLFVBQXhCLEdBQXFDbkgsSUFBSSxDQUFDbUgsT0FBMUMsR0FBb0RyVyxRQUFRLENBQUNxVyxPQVJuRTtDQVNINEIsSUFBQUEsU0FBUyxFQUFFLE9BQU8vSSxJQUFJLENBQUMrSSxTQUFaLEtBQTBCLFFBQTFCLElBQXNDcmpCLEtBQUssQ0FBQzZjLFFBQU4sQ0FBZXZDLElBQUksQ0FBQytJLFNBQXBCLENBQXRDLEdBQXVFL0ksSUFBSSxDQUFDK0ksU0FBNUUsR0FBd0ZqWSxRQUFRLENBQUNpWSxTQVR6Rzs7Q0FXSGpKLElBQUFBLEtBQUssRUFBRyxPQUFPRSxJQUFJLENBQUNGLEtBQVosS0FBc0IsUUFBdEIsSUFBa0NFLElBQUksQ0FBQ0YsS0FBTCxLQUFlLEtBQWxELEdBQTJELENBQUNFLElBQUksQ0FBQ0YsS0FBakUsR0FBeUVoUCxRQUFRLENBQUNnUCxLQVh0RjtDQVlId0ssSUFBQUEsaUJBQWlCLEVBQUV0SyxJQUFJLENBQUNzSyxpQkFBTCxLQUEyQixJQVozQztDQWFIQyxJQUFBQSx3QkFBd0IsRUFBRSxPQUFPdkssSUFBSSxDQUFDdUssd0JBQVosS0FBeUMsU0FBekMsR0FBcUR2SyxJQUFJLENBQUN1Syx3QkFBMUQsR0FBcUZ6WixRQUFRLENBQUN5Wix3QkFickg7Q0FjSEMsSUFBQUEsY0FBYyxFQUFFLE9BQU94SyxJQUFJLENBQUN3SyxjQUFaLEtBQStCLFFBQS9CLEdBQTBDeEssSUFBSSxDQUFDd0ssY0FBL0MsR0FBZ0UxWixRQUFRLENBQUMwWixjQWR0RjtDQWVIQyxJQUFBQSxXQUFXLEVBQUV6SyxJQUFJLENBQUN5SyxXQUFMLEtBQXFCLEtBZi9CO0NBZ0JIL0QsSUFBQUEsWUFBWSxFQUFFLE9BQU8xRyxJQUFJLENBQUMwRyxZQUFaLEtBQTZCLFNBQTdCLEdBQXlDMUcsSUFBSSxDQUFDMEcsWUFBOUMsR0FBNkQ1VixRQUFRLENBQUM0VixZQWhCakY7Q0FpQkg0QyxJQUFBQSxrQkFBa0IsRUFBRSxPQUFPdEosSUFBSSxDQUFDc0osa0JBQVosS0FBbUMsU0FBbkMsR0FBK0N0SixJQUFJLENBQUNzSixrQkFBcEQsR0FBeUV4WSxRQUFRLENBQUN3WTtDQWpCbkcsR0FBUDtDQW1CSCxDQWpDRDs7S0FtQ0FyWSxPQUFjLEdBQUcsU0FBakJBLEtBQWlCLENBQVU1TSxHQUFWLEVBQWUyYixJQUFmLEVBQXFCO0NBQ2xDLE1BQUlILE9BQU8sR0FBR3NNLHFCQUFxQixDQUFDbk0sSUFBRCxDQUFuQzs7Q0FFQSxNQUFJM2IsR0FBRyxLQUFLLEVBQVIsSUFBY0EsR0FBRyxLQUFLLElBQXRCLElBQThCLE9BQU9BLEdBQVAsS0FBZSxXQUFqRCxFQUE4RDtDQUMxRCxXQUFPd2IsT0FBTyxDQUFDNkcsWUFBUixHQUF1Qm5rQixNQUFNLENBQUN5UyxNQUFQLENBQWMsSUFBZCxDQUF2QixHQUE2QyxFQUFwRDtDQUNIOztDQUVELE1BQUlvWCxPQUFPLEdBQUcsT0FBTy9uQixHQUFQLEtBQWUsUUFBZixHQUEwQnltQixXQUFXLENBQUN6bUIsR0FBRCxFQUFNd2IsT0FBTixDQUFyQyxHQUFzRHhiLEdBQXBFO0NBQ0EsTUFBSVEsR0FBRyxHQUFHZ2IsT0FBTyxDQUFDNkcsWUFBUixHQUF1Qm5rQixNQUFNLENBQUN5UyxNQUFQLENBQWMsSUFBZCxDQUF2QixHQUE2QyxFQUF2RCxDQVJrQzs7Q0FZbEMsTUFBSWpDLElBQUksR0FBR3hRLE1BQU0sQ0FBQ3dRLElBQVAsQ0FBWXFaLE9BQVosQ0FBWDs7Q0FDQSxPQUFLLElBQUlqcUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzRRLElBQUksQ0FBQzdRLE1BQXpCLEVBQWlDLEVBQUVDLENBQW5DLEVBQXNDO0NBQ2xDLFFBQUk0QyxHQUFHLEdBQUdnTyxJQUFJLENBQUM1USxDQUFELENBQWQ7Q0FDQSxRQUFJa3FCLE1BQU0sR0FBR1QsU0FBUyxDQUFDN21CLEdBQUQsRUFBTXFuQixPQUFPLENBQUNybkIsR0FBRCxDQUFiLEVBQW9COGEsT0FBcEIsRUFBNkIsT0FBT3hiLEdBQVAsS0FBZSxRQUE1QyxDQUF0QjtDQUNBUSxJQUFBQSxHQUFHLEdBQUdhLEtBQUssQ0FBQ1QsS0FBTixDQUFZSixHQUFaLEVBQWlCd25CLE1BQWpCLEVBQXlCeE0sT0FBekIsQ0FBTjtDQUNIOztDQUVELE1BQUlBLE9BQU8sQ0FBQ3VLLFdBQVIsS0FBd0IsSUFBNUIsRUFBa0M7Q0FDOUIsV0FBT3ZsQixHQUFQO0NBQ0g7O0NBRUQsU0FBT2EsS0FBSyxDQUFDa2lCLE9BQU4sQ0FBYy9pQixHQUFkLENBQVA7Q0FDSDs7Q0NwUUQsSUFBSTJCLFNBQVMsR0FBR25FLFdBQWhCO0NBQ0EsSUFBSTRPLEtBQUssR0FBR2pHLE9BQVo7Q0FDQSxJQUFJZ2IsT0FBTyxHQUFHalosU0FBZDtLQUVBdWYsR0FBYyxHQUFHO0NBQ2J0RyxFQUFBQSxPQUFPLEVBQUVBLE9BREk7Q0FFYi9VLEVBQUFBLEtBQUssRUFBRUEsS0FGTTtDQUdiekssRUFBQUEsU0FBUyxFQUFFQTtDQUhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
