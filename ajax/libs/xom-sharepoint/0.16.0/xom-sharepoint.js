/**
 * XOM SharePoint v0.16.0
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


	function merge$1()
	/* obj1, obj2, obj3, ... */
	{
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

	var build = {exports: {}};

	var toArraybuffer = {};

	(function (exports) {

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
	})(toArraybuffer);

	(function (module) {
	  /* eslint-env node */

	  var toArrayBuffer = toArraybuffer["default"];
	  module.exports = toArrayBuffer; // Allow use of default import with ES module syntax

	  module.exports["default"] = toArrayBuffer;
	})(build);

	var genFileBuffer = build.exports;

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
	            var fileBuffer, _a, id;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0: return [4 /*yield*/, genFileBuffer(fileReference)];
	                    case 1:
	                        fileBuffer = _b.sent();
	                        _a = param1.Id, id = _a === void 0 ? param1 : _a;
	                        if (isNaN(id)) {
	                            throw missingItemId();
	                        }
	                        return [2 /*return*/, uploadListItemAttachment(this._http, this._title, id, fileName, fileBuffer)];
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
	    /**
	     * Uploads a file into the folder.
	     */
	    XomSharePointLibrary.prototype.uploadFile = function (fileName, fileReference) {
	        return __awaiter(this, void 0, void 0, function () {
	            var fileBuffer, result;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, genFileBuffer(fileReference)];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG9tLXNoYXJlcG9pbnQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9oYXMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9jYWxsQm91bmQuanMiLCIuLi9ub2RlX21vZHVsZXMvb2JqZWN0LWluc3BlY3QvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvc2lkZS1jaGFubmVsL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvQGxhY3Vzc29mdC90by1hcnJheWJ1ZmZlci9idWlsZC90by1hcnJheWJ1ZmZlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbGFjdXNzb2Z0L3RvLWFycmF5YnVmZmVyL2J1aWxkL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAodG9TdHJpbmcuY2FsbCh2YWwpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W2tleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuZnVuY3Rpb24gc3RyaXBCT00oY29udGVudCkge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSA6ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFyZXF1ZXN0RGF0YSkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknLCAncGFyYW1zJ107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3RpbWVvdXRNZXNzYWdlJywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnLCAncmVzcG9uc2VFbmNvZGluZydcbiAgXTtcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkaXJlY3RNZXJnZUtleXMsIGZ1bmN0aW9uIG1lcmdlKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzEpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiAodHlwZW9mIHBheWxvYWQgPT09ICdvYmplY3QnKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IGNvbXBsZXhpdHk6IFsyLCAxOF0sIG1heC1zdGF0ZW1lbnRzOiBbMiwgMzNdICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1N5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcpIHsgcmV0dXJuIHRydWU7IH1cblxuXHR2YXIgb2JqID0ge307XG5cdHZhciBzeW0gPSBTeW1ib2woJ3Rlc3QnKTtcblx0dmFyIHN5bU9iaiA9IE9iamVjdChzeW0pO1xuXHRpZiAodHlwZW9mIHN5bSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW1PYmopICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL29iamVjdC5hc3NpZ24vaXNzdWVzLzE3XG5cdC8vIGlmIChzeW0gaW5zdGFuY2VvZiBTeW1ib2wpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL2dldC1vd24tcHJvcGVydHktc3ltYm9scy9pc3N1ZXMvNFxuXHQvLyBpZiAoIShzeW1PYmogaW5zdGFuY2VvZiBTeW1ib2wpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIGlmICh0eXBlb2YgU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gaWYgKFN0cmluZyhzeW0pICE9PSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltVmFsID0gNDI7XG5cdG9ialtzeW1dID0gc3ltVmFsO1xuXHRmb3IgKHN5bSBpbiBvYmopIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0aWYgKHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1zID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopO1xuXHRpZiAoc3ltcy5sZW5ndGggIT09IDEgfHwgc3ltc1swXSAhPT0gc3ltKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pO1xuXHRcdGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSBzeW1WYWwgfHwgZGVzY3JpcHRvci5lbnVtZXJhYmxlICE9PSB0cnVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3JpZ1N5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgaGFzU3ltYm9sU2hhbSA9IHJlcXVpcmUoJy4vc2hhbXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNOYXRpdmVTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2woJ2ZvbycpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2woJ2JhcicpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRyZXR1cm4gaGFzU3ltYm9sU2hhbSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKHRhcmdldCkgIT09IGZ1bmNUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJST1JfTUVTU0FHRSArIHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHZhciBib3VuZEFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgfVxuXG4gICAgYm91bmQgPSBGdW5jdGlvbignYmluZGVyJywgJ3JldHVybiBmdW5jdGlvbiAoJyArIGJvdW5kQXJncy5qb2luKCcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGltcGxlbWVudGF0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdHJldHVybiAkRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOyByZXR1cm4gKCcgKyBleHByZXNzaW9uU3ludGF4ICsgJykuY29uc3RydWN0b3I7JykoKTtcblx0fSBjYXRjaCAoZSkge31cbn07XG5cbnZhciAkZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRCh7fSwgJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0JGdPUEQgPSBudWxsOyAvLyB0aGlzIGlzIElFIDgsIHdoaWNoIGhhcyBhIGJyb2tlbiBnT1BEXG5cdH1cbn1cblxudmFyIHRocm93VHlwZUVycm9yID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgJFR5cGVFcnJvcigpO1xufTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBuZWVkc0V2YWwgPSB7fTtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogbmVlZHNFdmFsLFxuXHQnJUF0b21pY3MlJzogdHlwZW9mIEF0b21pY3MgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXRvbWljcyxcblx0JyVCaWdJbnQlJzogdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQsXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiBFcnJvcixcblx0JyVldmFsJSc6IGV2YWwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuXHQnJUV2YWxFcnJvciUnOiBFdmFsRXJyb3IsXG5cdCclRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGaW5hbGl6YXRpb25SZWdpc3RyeSUnOiB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmluYWxpemF0aW9uUmVnaXN0cnksXG5cdCclRnVuY3Rpb24lJzogJEZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVpc0Zpbml0ZSUnOiBpc0Zpbml0ZSxcblx0JyVpc05hTiUnOiBpc05hTixcblx0JyVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCclSlNPTiUnOiB0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgPyBKU09OIDogdW5kZWZpbmVkLFxuXHQnJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyVNYXBJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBNYXAoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJU1hdGglJzogTWF0aCxcblx0JyVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJU9iamVjdCUnOiBPYmplY3QsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJVJlZmVyZW5jZUVycm9yJSc6IFJlZmVyZW5jZUVycm9yLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlcixcblx0JyVTdHJpbmclJzogU3RyaW5nLFxuXHQnJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90bygnJ1tTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJVN5bWJvbCUnOiBoYXNTeW1ib2xzID8gU3ltYm9sIDogdW5kZWZpbmVkLFxuXHQnJVN5bnRheEVycm9yJSc6ICRTeW50YXhFcnJvcixcblx0JyVUaHJvd1R5cGVFcnJvciUnOiBUaHJvd1R5cGVFcnJvcixcblx0JyVUeXBlZEFycmF5JSc6IFR5cGVkQXJyYXksXG5cdCclVHlwZUVycm9yJSc6ICRUeXBlRXJyb3IsXG5cdCclVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5JSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheSxcblx0JyVVaW50MTZBcnJheSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXksXG5cdCclVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJVVSSUVycm9yJSc6IFVSSUVycm9yLFxuXHQnJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyVXZWFrUmVmJSc6IHR5cGVvZiBXZWFrUmVmID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtSZWYsXG5cdCclV2Vha1NldCUnOiB0eXBlb2YgV2Vha1NldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrU2V0XG59O1xuXG52YXIgZG9FdmFsID0gZnVuY3Rpb24gZG9FdmFsKG5hbWUpIHtcblx0dmFyIHZhbHVlO1xuXHRpZiAobmFtZSA9PT0gJyVBc3luY0Z1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24gKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUdlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvciUnKSB7XG5cdFx0dmFyIGZuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKTtcblx0XHRpZiAoZm4pIHtcblx0XHRcdHZhbHVlID0gZm4ucHJvdG90eXBlO1xuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJykge1xuXHRcdHZhciBnZW4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvciUnKTtcblx0XHRpZiAoZ2VuKSB7XG5cdFx0XHR2YWx1ZSA9IGdldFByb3RvKGdlbi5wcm90b3R5cGUpO1xuXHRcdH1cblx0fVxuXG5cdElOVFJJTlNJQ1NbbmFtZV0gPSB2YWx1ZTtcblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgTEVHQUNZX0FMSUFTRVMgPSB7XG5cdCclQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvdHlwZSUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdlbnRyaWVzJ10sXG5cdCclQXJyYXlQcm90b19mb3JFYWNoJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2ZvckVhY2gnXSxcblx0JyVBcnJheVByb3RvX2tleXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAna2V5cyddLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ3ZhbHVlcyddLFxuXHQnJUFzeW5jRnVuY3Rpb25Qcm90b3R5cGUlJzogWydBc3luY0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogWydCb29sZWFuJywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IFsnRGF0YVZpZXcnLCAncHJvdG90eXBlJ10sXG5cdCclRGF0ZVByb3RvdHlwZSUnOiBbJ0RhdGUnLCAncHJvdG90eXBlJ10sXG5cdCclRXJyb3JQcm90b3R5cGUlJzogWydFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVFdmFsRXJyb3JQcm90b3R5cGUlJzogWydFdmFsRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0NjRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvciUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQ4QXJyYXlQcm90b3R5cGUlJzogWydJbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ0ludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ0ludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSlNPTlBhcnNlJSc6IFsnSlNPTicsICdwYXJzZSddLFxuXHQnJUpTT05TdHJpbmdpZnklJzogWydKU09OJywgJ3N0cmluZ2lmeSddLFxuXHQnJU1hcFByb3RvdHlwZSUnOiBbJ01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogWydOdW1iZXInLCAncHJvdG90eXBlJ10sXG5cdCclT2JqZWN0UHJvdG90eXBlJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZSddLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd0b1N0cmluZyddLFxuXHQnJU9ialByb3RvX3ZhbHVlT2YlJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3ZhbHVlT2YnXSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnXSxcblx0JyVQcm9taXNlUHJvdG9fdGhlbiUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJywgJ3RoZW4nXSxcblx0JyVQcm9taXNlX2FsbCUnOiBbJ1Byb21pc2UnLCAnYWxsJ10sXG5cdCclUHJvbWlzZV9yZWplY3QlJzogWydQcm9taXNlJywgJ3JlamVjdCddLFxuXHQnJVByb21pc2VfcmVzb2x2ZSUnOiBbJ1Byb21pc2UnLCAncmVzb2x2ZSddLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogWydSYW5nZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZmVyZW5jZUVycm9yUHJvdG90eXBlJSc6IFsnUmVmZXJlbmNlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVnRXhwUHJvdG90eXBlJSc6IFsnUmVnRXhwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVNldFByb3RvdHlwZSUnOiBbJ1NldCcsICdwcm90b3R5cGUnXSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ1NoYXJlZEFycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN0cmluZ1Byb3RvdHlwZSUnOiBbJ1N0cmluZycsICdwcm90b3R5cGUnXSxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogWydTeW1ib2wnLCAncHJvdG90eXBlJ10sXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogWydTeW50YXhFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVHlwZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogWydUeXBlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhDbGFtcGVkQXJyYXlQcm90b3R5cGUlJzogWydVaW50OENsYW1wZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnVWludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogWydVUklFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IFsnV2Vha01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IFsnV2Vha1NldCcsICdwcm90b3R5cGUnXVxufTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzJyk7XG52YXIgJGNvbmNhdCA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBBcnJheS5wcm90b3R5cGUuY29uY2F0KTtcbnZhciAkc3BsaWNlQXBwbHkgPSBiaW5kLmNhbGwoRnVuY3Rpb24uYXBwbHksIEFycmF5LnByb3RvdHlwZS5zcGxpY2UpO1xudmFyICRyZXBsYWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG52YXIgJHN0clNsaWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUuc2xpY2UpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciBmaXJzdCA9ICRzdHJTbGljZShzdHJpbmcsIDAsIDEpO1xuXHR2YXIgbGFzdCA9ICRzdHJTbGljZShzdHJpbmcsIC0xKTtcblx0aWYgKGZpcnN0ID09PSAnJScgJiYgbGFzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBjbG9zaW5nIGAlYCcpO1xuXHR9IGVsc2UgaWYgKGxhc3QgPT09ICclJyAmJiBmaXJzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBvcGVuaW5nIGAlYCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHZhbHVlID09PSBuZWVkc0V2YWwpIHtcblx0XHRcdHZhbHVlID0gZG9FdmFsKGludHJpbnNpY05hbWUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblx0dmFyIGludHJpbnNpY0Jhc2VOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzWzBdIDogJyc7XG5cblx0dmFyIGludHJpbnNpYyA9IGdldEJhc2VJbnRyaW5zaWMoJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdHZhciBpbnRyaW5zaWNSZWFsTmFtZSA9IGludHJpbnNpYy5uYW1lO1xuXHR2YXIgdmFsdWUgPSBpbnRyaW5zaWMudmFsdWU7XG5cdHZhciBza2lwRnVydGhlckNhY2hpbmcgPSBmYWxzZTtcblxuXHR2YXIgYWxpYXMgPSBpbnRyaW5zaWMuYWxpYXM7XG5cdGlmIChhbGlhcykge1xuXHRcdGludHJpbnNpY0Jhc2VOYW1lID0gYWxpYXNbMF07XG5cdFx0JHNwbGljZUFwcGx5KHBhcnRzLCAkY29uY2F0KFswLCAxXSwgYWxpYXMpKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAxLCBpc093biA9IHRydWU7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHNbaV07XG5cdFx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHBhcnQsIDAsIDEpO1xuXHRcdHZhciBsYXN0ID0gJHN0clNsaWNlKHBhcnQsIC0xKTtcblx0XHRpZiAoXG5cdFx0XHQoXG5cdFx0XHRcdChmaXJzdCA9PT0gJ1wiJyB8fCBmaXJzdCA9PT0gXCInXCIgfHwgZmlyc3QgPT09ICdgJylcblx0XHRcdFx0fHwgKGxhc3QgPT09ICdcIicgfHwgbGFzdCA9PT0gXCInXCIgfHwgbGFzdCA9PT0gJ2AnKVxuXHRcdFx0KVxuXHRcdFx0JiYgZmlyc3QgIT09IGxhc3Rcblx0XHQpIHtcblx0XHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ3Byb3BlcnR5IG5hbWVzIHdpdGggcXVvdGVzIG11c3QgaGF2ZSBtYXRjaGluZyBxdW90ZXMnKTtcblx0XHR9XG5cdFx0aWYgKHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWlzT3duKSB7XG5cdFx0XHRza2lwRnVydGhlckNhY2hpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGludHJpbnNpY0Jhc2VOYW1lICs9ICcuJyArIHBhcnQ7XG5cdFx0aW50cmluc2ljUmVhbE5hbWUgPSAnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJztcblxuXHRcdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljUmVhbE5hbWUpKSB7XG5cdFx0XHR2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdm9pZCB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdC8vIEJ5IGNvbnZlbnRpb24sIHdoZW4gYSBkYXRhIHByb3BlcnR5IGlzIGNvbnZlcnRlZCB0byBhbiBhY2Nlc3NvclxuXHRcdFx0XHQvLyBwcm9wZXJ0eSB0byBlbXVsYXRlIGEgZGF0YSBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IHN1ZmZlciBmcm9tXG5cdFx0XHRcdC8vIHRoZSBvdmVycmlkZSBtaXN0YWtlLCB0aGF0IGFjY2Vzc29yJ3MgZ2V0dGVyIGlzIG1hcmtlZCB3aXRoXG5cdFx0XHRcdC8vIGFuIGBvcmlnaW5hbFZhbHVlYCBwcm9wZXJ0eS4gSGVyZSwgd2hlbiB3ZSBkZXRlY3QgdGhpcywgd2Vcblx0XHRcdFx0Ly8gdXBob2xkIHRoZSBpbGx1c2lvbiBieSBwcmV0ZW5kaW5nIHRvIHNlZSB0aGF0IG9yaWdpbmFsIGRhdGFcblx0XHRcdFx0Ly8gcHJvcGVydHksIGkuZS4sIHJldHVybmluZyB0aGUgdmFsdWUgcmF0aGVyIHRoYW4gdGhlIGdldHRlclxuXHRcdFx0XHQvLyBpdHNlbGYuXG5cdFx0XHRcdGlmIChpc093biAmJiAnZ2V0JyBpbiBkZXNjICYmICEoJ29yaWdpbmFsVmFsdWUnIGluIGRlc2MuZ2V0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVzYy5nZXQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNPd24gPSBoYXNPd24odmFsdWUsIHBhcnQpO1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPd24gJiYgIXNraXBGdXJ0aGVyQ2FjaGluZykge1xuXHRcdFx0XHRJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkYXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJyk7XG52YXIgJGNhbGwgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gR2V0SW50cmluc2ljKCclUmVmbGVjdC5hcHBseSUnLCB0cnVlKSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xudmFyICRtYXggPSBHZXRJbnRyaW5zaWMoJyVNYXRoLm1heCUnKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQob3JpZ2luYWxGdW5jdGlvbikge1xuXHR2YXIgZnVuYyA9ICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG5cdGlmICgkZ09QRCAmJiAkZGVmaW5lUHJvcGVydHkpIHtcblx0XHR2YXIgZGVzYyA9ICRnT1BEKGZ1bmMsICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdC8vIG9yaWdpbmFsIGxlbmd0aCwgcGx1cyB0aGUgcmVjZWl2ZXIsIG1pbnVzIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyAoYWZ0ZXIgdGhlIHJlY2VpdmVyKVxuXHRcdFx0JGRlZmluZVByb3BlcnR5KFxuXHRcdFx0XHRmdW5jLFxuXHRcdFx0XHQnbGVuZ3RoJyxcblx0XHRcdFx0eyB2YWx1ZTogMSArICRtYXgoMCwgb3JpZ2luYWxGdW5jdGlvbi5sZW5ndGggLSAoYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB9XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuYztcbn07XG5cbnZhciBhcHBseUJpbmQgPSBmdW5jdGlvbiBhcHBseUJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRhcHBseSwgYXJndW1lbnRzKTtcbn07XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0JGRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnYXBwbHknLCB7IHZhbHVlOiBhcHBseUJpbmQgfSk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cy5hcHBseSA9IGFwcGx5QmluZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwidmFyIGhhc01hcCA9IHR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgTWFwLnByb3RvdHlwZTtcbnZhciBtYXBTaXplRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgaGFzTWFwID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihNYXAucHJvdG90eXBlLCAnc2l6ZScpIDogbnVsbDtcbnZhciBtYXBTaXplID0gaGFzTWFwICYmIG1hcFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBtYXBTaXplRGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgPyBtYXBTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xudmFyIG1hcEZvckVhY2ggPSBoYXNNYXAgJiYgTWFwLnByb3RvdHlwZS5mb3JFYWNoO1xudmFyIGhhc1NldCA9IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgU2V0LnByb3RvdHlwZTtcbnZhciBzZXRTaXplRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgaGFzU2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihTZXQucHJvdG90eXBlLCAnc2l6ZScpIDogbnVsbDtcbnZhciBzZXRTaXplID0gaGFzU2V0ICYmIHNldFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBzZXRTaXplRGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgPyBzZXRTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xudmFyIHNldEZvckVhY2ggPSBoYXNTZXQgJiYgU2V0LnByb3RvdHlwZS5mb3JFYWNoO1xudmFyIGhhc1dlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrTWFwLnByb3RvdHlwZTtcbnZhciB3ZWFrTWFwSGFzID0gaGFzV2Vha01hcCA/IFdlYWtNYXAucHJvdG90eXBlLmhhcyA6IG51bGw7XG52YXIgaGFzV2Vha1NldCA9IHR5cGVvZiBXZWFrU2V0ID09PSAnZnVuY3Rpb24nICYmIFdlYWtTZXQucHJvdG90eXBlO1xudmFyIHdlYWtTZXRIYXMgPSBoYXNXZWFrU2V0ID8gV2Vha1NldC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciBoYXNXZWFrUmVmID0gdHlwZW9mIFdlYWtSZWYgPT09ICdmdW5jdGlvbicgJiYgV2Vha1JlZi5wcm90b3R5cGU7XG52YXIgd2Vha1JlZkRlcmVmID0gaGFzV2Vha1JlZiA/IFdlYWtSZWYucHJvdG90eXBlLmRlcmVmIDogbnVsbDtcbnZhciBib29sZWFuVmFsdWVPZiA9IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2Y7XG52YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgbWF0Y2ggPSBTdHJpbmcucHJvdG90eXBlLm1hdGNoO1xudmFyIGJpZ0ludFZhbHVlT2YgPSB0eXBlb2YgQmlnSW50ID09PSAnZnVuY3Rpb24nID8gQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mIDogbnVsbDtcbnZhciBnT1BTID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBzeW1Ub1N0cmluZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcgPyBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nIDogbnVsbDtcbnZhciBoYXNTaGFtbWVkU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ29iamVjdCc7XG52YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxudmFyIGdQTyA9ICh0eXBlb2YgUmVmbGVjdCA9PT0gJ2Z1bmN0aW9uJyA/IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YgOiBPYmplY3QuZ2V0UHJvdG90eXBlT2YpIHx8IChcbiAgICBbXS5fX3Byb3RvX18gPT09IEFycmF5LnByb3RvdHlwZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG4gICAgICAgID8gZnVuY3Rpb24gKE8pIHtcbiAgICAgICAgICAgIHJldHVybiBPLl9fcHJvdG9fXzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuKTtcblxudmFyIGluc3BlY3RDdXN0b20gPSByZXF1aXJlKCcuL3V0aWwuaW5zcGVjdCcpLmN1c3RvbTtcbnZhciBpbnNwZWN0U3ltYm9sID0gaW5zcGVjdEN1c3RvbSAmJiBpc1N5bWJvbChpbnNwZWN0Q3VzdG9tKSA/IGluc3BlY3RDdXN0b20gOiBudWxsO1xudmFyIHRvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5zcGVjdF8ob2JqLCBvcHRpb25zLCBkZXB0aCwgc2Vlbikge1xuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGlmIChoYXMob3B0cywgJ3F1b3RlU3R5bGUnKSAmJiAob3B0cy5xdW90ZVN0eWxlICE9PSAnc2luZ2xlJyAmJiBvcHRzLnF1b3RlU3R5bGUgIT09ICdkb3VibGUnKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJxdW90ZVN0eWxlXCIgbXVzdCBiZSBcInNpbmdsZVwiIG9yIFwiZG91YmxlXCInKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgICBoYXMob3B0cywgJ21heFN0cmluZ0xlbmd0aCcpICYmICh0eXBlb2Ygb3B0cy5tYXhTdHJpbmdMZW5ndGggPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IG9wdHMubWF4U3RyaW5nTGVuZ3RoIDwgMCAmJiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gSW5maW5pdHlcbiAgICAgICAgICAgIDogb3B0cy5tYXhTdHJpbmdMZW5ndGggIT09IG51bGxcbiAgICAgICAgKVxuICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJtYXhTdHJpbmdMZW5ndGhcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLCBJbmZpbml0eSwgb3IgYG51bGxgJyk7XG4gICAgfVxuICAgIHZhciBjdXN0b21JbnNwZWN0ID0gaGFzKG9wdHMsICdjdXN0b21JbnNwZWN0JykgPyBvcHRzLmN1c3RvbUluc3BlY3QgOiB0cnVlO1xuICAgIGlmICh0eXBlb2YgY3VzdG9tSW5zcGVjdCAhPT0gJ2Jvb2xlYW4nICYmIGN1c3RvbUluc3BlY3QgIT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcImN1c3RvbUluc3BlY3RcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYHRydWVgLCBgZmFsc2VgLCBvciBgXFwnc3ltYm9sXFwnYCcpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgaGFzKG9wdHMsICdpbmRlbnQnKVxuICAgICAgICAmJiBvcHRzLmluZGVudCAhPT0gbnVsbFxuICAgICAgICAmJiBvcHRzLmluZGVudCAhPT0gJ1xcdCdcbiAgICAgICAgJiYgIShwYXJzZUludChvcHRzLmluZGVudCwgMTApID09PSBvcHRzLmluZGVudCAmJiBvcHRzLmluZGVudCA+IDApXG4gICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgXCJpbmRlbnRcIiBtdXN0IGJlIFwiXFxcXHRcIiwgYW4gaW50ZWdlciA+IDAsIG9yIGBudWxsYCcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gb2JqID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcob2JqLCBvcHRzKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmIChvYmogPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eSAvIG9iaiA+IDAgPyAnMCcgOiAnLTAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdiaWdpbnQnKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcob2JqKSArICduJztcbiAgICB9XG5cbiAgICB2YXIgbWF4RGVwdGggPSB0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ3VuZGVmaW5lZCcgPyA1IDogb3B0cy5kZXB0aDtcbiAgICBpZiAodHlwZW9mIGRlcHRoID09PSAndW5kZWZpbmVkJykgeyBkZXB0aCA9IDA7IH1cbiAgICBpZiAoZGVwdGggPj0gbWF4RGVwdGggJiYgbWF4RGVwdGggPiAwICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnW0FycmF5XScgOiAnW09iamVjdF0nO1xuICAgIH1cblxuICAgIHZhciBpbmRlbnQgPSBnZXRJbmRlbnQob3B0cywgZGVwdGgpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWVuID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzZWVuID0gW107XG4gICAgfSBlbHNlIGlmIChpbmRleE9mKHNlZW4sIG9iaikgPj0gMCkge1xuICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3BlY3QodmFsdWUsIGZyb20sIG5vSW5kZW50KSB7XG4gICAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgICAgICBzZWVuID0gc2Vlbi5zbGljZSgpO1xuICAgICAgICAgICAgc2Vlbi5wdXNoKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub0luZGVudCkge1xuICAgICAgICAgICAgdmFyIG5ld09wdHMgPSB7XG4gICAgICAgICAgICAgICAgZGVwdGg6IG9wdHMuZGVwdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaGFzKG9wdHMsICdxdW90ZVN0eWxlJykpIHtcbiAgICAgICAgICAgICAgICBuZXdPcHRzLnF1b3RlU3R5bGUgPSBvcHRzLnF1b3RlU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5zcGVjdF8odmFsdWUsIG5ld09wdHMsIGRlcHRoICsgMSwgc2Vlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3BlY3RfKHZhbHVlLCBvcHRzLCBkZXB0aCArIDEsIHNlZW4pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBuYW1lID0gbmFtZU9mKG9iaik7XG4gICAgICAgIHZhciBrZXlzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICByZXR1cm4gJ1tGdW5jdGlvbicgKyAobmFtZSA/ICc6ICcgKyBuYW1lIDogJyAoYW5vbnltb3VzKScpICsgJ10nICsgKGtleXMubGVuZ3RoID4gMCA/ICcgeyAnICsga2V5cy5qb2luKCcsICcpICsgJyB9JyA6ICcnKTtcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKG9iaikpIHtcbiAgICAgICAgdmFyIHN5bVN0cmluZyA9IGhhc1NoYW1tZWRTeW1ib2xzID8gU3RyaW5nKG9iaikucmVwbGFjZSgvXihTeW1ib2xcXCguKlxcKSlfW14pXSokLywgJyQxJykgOiBzeW1Ub1N0cmluZy5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhaGFzU2hhbW1lZFN5bWJvbHMgPyBtYXJrQm94ZWQoc3ltU3RyaW5nKSA6IHN5bVN0cmluZztcbiAgICB9XG4gICAgaWYgKGlzRWxlbWVudChvYmopKSB7XG4gICAgICAgIHZhciBzID0gJzwnICsgU3RyaW5nKG9iai5ub2RlTmFtZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIGF0dHJzID0gb2JqLmF0dHJpYnV0ZXMgfHwgW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHMgKz0gJyAnICsgYXR0cnNbaV0ubmFtZSArICc9JyArIHdyYXBRdW90ZXMocXVvdGUoYXR0cnNbaV0udmFsdWUpLCAnZG91YmxlJywgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgcyArPSAnPic7XG4gICAgICAgIGlmIChvYmouY2hpbGROb2RlcyAmJiBvYmouY2hpbGROb2Rlcy5sZW5ndGgpIHsgcyArPSAnLi4uJzsgfVxuICAgICAgICBzICs9ICc8LycgKyBTdHJpbmcob2JqLm5vZGVOYW1lKS50b0xvd2VyQ2FzZSgpICsgJz4nO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJ1tdJzsgfVxuICAgICAgICB2YXIgeHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIGlmIChpbmRlbnQgJiYgIXNpbmdsZUxpbmVWYWx1ZXMoeHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1snICsgaW5kZW50ZWRKb2luKHhzLCBpbmRlbnQpICsgJ10nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnWyAnICsgeHMuam9pbignLCAnKSArICcgXSc7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKG9iaikpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSB7IHJldHVybiAnWycgKyBTdHJpbmcob2JqKSArICddJzsgfVxuICAgICAgICByZXR1cm4gJ3sgWycgKyBTdHJpbmcob2JqKSArICddICcgKyBwYXJ0cy5qb2luKCcsICcpICsgJyB9JztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIGN1c3RvbUluc3BlY3QpIHtcbiAgICAgICAgaWYgKGluc3BlY3RTeW1ib2wgJiYgdHlwZW9mIG9ialtpbnNwZWN0U3ltYm9sXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIG9ialtpbnNwZWN0U3ltYm9sXSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUluc3BlY3QgIT09ICdzeW1ib2wnICYmIHR5cGVvZiBvYmouaW5zcGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5pbnNwZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzTWFwKG9iaikpIHtcbiAgICAgICAgdmFyIG1hcFBhcnRzID0gW107XG4gICAgICAgIG1hcEZvckVhY2guY2FsbChvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBtYXBQYXJ0cy5wdXNoKGluc3BlY3Qoa2V5LCBvYmosIHRydWUpICsgJyA9PiAnICsgaW5zcGVjdCh2YWx1ZSwgb2JqKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk9mKCdNYXAnLCBtYXBTaXplLmNhbGwob2JqKSwgbWFwUGFydHMsIGluZGVudCk7XG4gICAgfVxuICAgIGlmIChpc1NldChvYmopKSB7XG4gICAgICAgIHZhciBzZXRQYXJ0cyA9IFtdO1xuICAgICAgICBzZXRGb3JFYWNoLmNhbGwob2JqLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHNldFBhcnRzLnB1c2goaW5zcGVjdCh2YWx1ZSwgb2JqKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk9mKCdTZXQnLCBzZXRTaXplLmNhbGwob2JqKSwgc2V0UGFydHMsIGluZGVudCk7XG4gICAgfVxuICAgIGlmIChpc1dlYWtNYXAob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZignV2Vha01hcCcpO1xuICAgIH1cbiAgICBpZiAoaXNXZWFrU2V0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoJ1dlYWtTZXQnKTtcbiAgICB9XG4gICAgaWYgKGlzV2Vha1JlZihvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKCdXZWFrUmVmJyk7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdChOdW1iZXIob2JqKSkpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdJbnQob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QoYmlnSW50VmFsdWVPZi5jYWxsKG9iaikpKTtcbiAgICB9XG4gICAgaWYgKGlzQm9vbGVhbihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoYm9vbGVhblZhbHVlT2YuY2FsbChvYmopKTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0KFN0cmluZyhvYmopKSk7XG4gICAgfVxuICAgIGlmICghaXNEYXRlKG9iaikgJiYgIWlzUmVnRXhwKG9iaikpIHtcbiAgICAgICAgdmFyIHlzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICB2YXIgaXNQbGFpbk9iamVjdCA9IGdQTyA/IGdQTyhvYmopID09PSBPYmplY3QucHJvdG90eXBlIDogb2JqIGluc3RhbmNlb2YgT2JqZWN0IHx8IG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgICAgICB2YXIgcHJvdG9UYWcgPSBvYmogaW5zdGFuY2VvZiBPYmplY3QgPyAnJyA6ICdudWxsIHByb3RvdHlwZSc7XG4gICAgICAgIHZhciBzdHJpbmdUYWcgPSAhaXNQbGFpbk9iamVjdCAmJiB0b1N0cmluZ1RhZyAmJiBPYmplY3Qob2JqKSA9PT0gb2JqICYmIHRvU3RyaW5nVGFnIGluIG9iaiA/IHRvU3RyKG9iaikuc2xpY2UoOCwgLTEpIDogcHJvdG9UYWcgPyAnT2JqZWN0JyA6ICcnO1xuICAgICAgICB2YXIgY29uc3RydWN0b3JUYWcgPSBpc1BsYWluT2JqZWN0IHx8IHR5cGVvZiBvYmouY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicgPyAnJyA6IG9iai5jb25zdHJ1Y3Rvci5uYW1lID8gb2JqLmNvbnN0cnVjdG9yLm5hbWUgKyAnICcgOiAnJztcbiAgICAgICAgdmFyIHRhZyA9IGNvbnN0cnVjdG9yVGFnICsgKHN0cmluZ1RhZyB8fCBwcm90b1RhZyA/ICdbJyArIFtdLmNvbmNhdChzdHJpbmdUYWcgfHwgW10sIHByb3RvVGFnIHx8IFtdKS5qb2luKCc6ICcpICsgJ10gJyA6ICcnKTtcbiAgICAgICAgaWYgKHlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdGFnICsgJ3t9JzsgfVxuICAgICAgICBpZiAoaW5kZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGFnICsgJ3snICsgaW5kZW50ZWRKb2luKHlzLCBpbmRlbnQpICsgJ30nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YWcgKyAneyAnICsgeXMuam9pbignLCAnKSArICcgfSc7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcob2JqKTtcbn07XG5cbmZ1bmN0aW9uIHdyYXBRdW90ZXMocywgZGVmYXVsdFN0eWxlLCBvcHRzKSB7XG4gICAgdmFyIHF1b3RlQ2hhciA9IChvcHRzLnF1b3RlU3R5bGUgfHwgZGVmYXVsdFN0eWxlKSA9PT0gJ2RvdWJsZScgPyAnXCInIDogXCInXCI7XG4gICAgcmV0dXJuIHF1b3RlQ2hhciArIHMgKyBxdW90ZUNoYXI7XG59XG5cbmZ1bmN0aW9uIHF1b3RlKHMpIHtcbiAgICByZXR1cm4gU3RyaW5nKHMpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheShvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc0RhdGUob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBEYXRlXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IEVycm9yXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzQm9vbGVhbihvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cblxuLy8gU3ltYm9sIGFuZCBCaWdJbnQgZG8gaGF2ZSBTeW1ib2wudG9TdHJpbmdUYWcgYnkgc3BlYywgc28gdGhhdCBjYW4ndCBiZSB1c2VkIHRvIGVsaW1pbmF0ZSBmYWxzZSBwb3NpdGl2ZXNcbmZ1bmN0aW9uIGlzU3ltYm9sKG9iaikge1xuICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scykge1xuICAgICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiBpbnN0YW5jZW9mIFN5bWJvbDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCAhc3ltVG9TdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBzeW1Ub1N0cmluZy5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0JpZ0ludChvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCAhYmlnSW50VmFsdWVPZikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGJpZ0ludFZhbHVlT2YuY2FsbChvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgfHwgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5IGluIHRoaXM7IH07XG5mdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufVxuXG5mdW5jdGlvbiB0b1N0cihvYmopIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmopO1xufVxuXG5mdW5jdGlvbiBuYW1lT2YoZikge1xuICAgIGlmIChmLm5hbWUpIHsgcmV0dXJuIGYubmFtZTsgfVxuICAgIHZhciBtID0gbWF0Y2guY2FsbChmdW5jdGlvblRvU3RyaW5nLmNhbGwoZiksIC9eZnVuY3Rpb25cXHMqKFtcXHckXSspLyk7XG4gICAgaWYgKG0pIHsgcmV0dXJuIG1bMV07IH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xuICAgIGlmICh4cy5pbmRleE9mKSB7IHJldHVybiB4cy5pbmRleE9mKHgpOyB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKHhzW2ldID09PSB4KSB7IHJldHVybiBpOyB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gaXNNYXAoeCkge1xuICAgIGlmICghbWFwU2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgTWFwOyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrTWFwKHgpIHtcbiAgICBpZiAoIXdlYWtNYXBIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtNYXA7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1dlYWtSZWYoeCkge1xuICAgIGlmICghd2Vha1JlZkRlcmVmIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHdlYWtSZWZEZXJlZi5jYWxsKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNTZXQoeCkge1xuICAgIGlmICghc2V0U2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKG0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgU2V0OyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcbiAgICBpZiAoIXdlYWtTZXRIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtTZXQ7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0VsZW1lbnQoeCkge1xuICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHgubm9kZU5hbWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB4LmdldEF0dHJpYnV0ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaW5zcGVjdFN0cmluZyhzdHIsIG9wdHMpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA+IG9wdHMubWF4U3RyaW5nTGVuZ3RoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmcgPSBzdHIubGVuZ3RoIC0gb3B0cy5tYXhTdHJpbmdMZW5ndGg7XG4gICAgICAgIHZhciB0cmFpbGVyID0gJy4uLiAnICsgcmVtYWluaW5nICsgJyBtb3JlIGNoYXJhY3RlcicgKyAocmVtYWluaW5nID4gMSA/ICdzJyA6ICcnKTtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcoc3RyLnNsaWNlKDAsIG9wdHMubWF4U3RyaW5nTGVuZ3RoKSwgb3B0cykgKyB0cmFpbGVyO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuICAgIHZhciBzID0gc3RyLnJlcGxhY2UoLyhbJ1xcXFxdKS9nLCAnXFxcXCQxJykucmVwbGFjZSgvW1xceDAwLVxceDFmXS9nLCBsb3dieXRlKTtcbiAgICByZXR1cm4gd3JhcFF1b3RlcyhzLCAnc2luZ2xlJywgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIGxvd2J5dGUoYykge1xuICAgIHZhciBuID0gYy5jaGFyQ29kZUF0KDApO1xuICAgIHZhciB4ID0ge1xuICAgICAgICA4OiAnYicsXG4gICAgICAgIDk6ICd0JyxcbiAgICAgICAgMTA6ICduJyxcbiAgICAgICAgMTI6ICdmJyxcbiAgICAgICAgMTM6ICdyJ1xuICAgIH1bbl07XG4gICAgaWYgKHgpIHsgcmV0dXJuICdcXFxcJyArIHg7IH1cbiAgICByZXR1cm4gJ1xcXFx4JyArIChuIDwgMHgxMCA/ICcwJyA6ICcnKSArIG4udG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG1hcmtCb3hlZChzdHIpIHtcbiAgICByZXR1cm4gJ09iamVjdCgnICsgc3RyICsgJyknO1xufVxuXG5mdW5jdGlvbiB3ZWFrQ29sbGVjdGlvbk9mKHR5cGUpIHtcbiAgICByZXR1cm4gdHlwZSArICcgeyA/IH0nO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0aW9uT2YodHlwZSwgc2l6ZSwgZW50cmllcywgaW5kZW50KSB7XG4gICAgdmFyIGpvaW5lZEVudHJpZXMgPSBpbmRlbnQgPyBpbmRlbnRlZEpvaW4oZW50cmllcywgaW5kZW50KSA6IGVudHJpZXMuam9pbignLCAnKTtcbiAgICByZXR1cm4gdHlwZSArICcgKCcgKyBzaXplICsgJykgeycgKyBqb2luZWRFbnRyaWVzICsgJ30nO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVMaW5lVmFsdWVzKHhzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaW5kZXhPZih4c1tpXSwgJ1xcbicpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5kZW50KG9wdHMsIGRlcHRoKSB7XG4gICAgdmFyIGJhc2VJbmRlbnQ7XG4gICAgaWYgKG9wdHMuaW5kZW50ID09PSAnXFx0Jykge1xuICAgICAgICBiYXNlSW5kZW50ID0gJ1xcdCc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5pbmRlbnQgPT09ICdudW1iZXInICYmIG9wdHMuaW5kZW50ID4gMCkge1xuICAgICAgICBiYXNlSW5kZW50ID0gQXJyYXkob3B0cy5pbmRlbnQgKyAxKS5qb2luKCcgJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGJhc2U6IGJhc2VJbmRlbnQsXG4gICAgICAgIHByZXY6IEFycmF5KGRlcHRoICsgMSkuam9pbihiYXNlSW5kZW50KVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGluZGVudGVkSm9pbih4cywgaW5kZW50KSB7XG4gICAgaWYgKHhzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cbiAgICB2YXIgbGluZUpvaW5lciA9ICdcXG4nICsgaW5kZW50LnByZXYgKyBpbmRlbnQuYmFzZTtcbiAgICByZXR1cm4gbGluZUpvaW5lciArIHhzLmpvaW4oJywnICsgbGluZUpvaW5lcikgKyAnXFxuJyArIGluZGVudC5wcmV2O1xufVxuXG5mdW5jdGlvbiBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCkge1xuICAgIHZhciBpc0FyciA9IGlzQXJyYXkob2JqKTtcbiAgICB2YXIgeHMgPSBbXTtcbiAgICBpZiAoaXNBcnIpIHtcbiAgICAgICAgeHMubGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHhzW2ldID0gaGFzKG9iaiwgaSkgPyBpbnNwZWN0KG9ialtpXSwgb2JqKSA6ICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzeW1zID0gdHlwZW9mIGdPUFMgPT09ICdmdW5jdGlvbicgPyBnT1BTKG9iaikgOiBbXTtcbiAgICB2YXIgc3ltTWFwO1xuICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scykge1xuICAgICAgICBzeW1NYXAgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzeW1zLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBzeW1NYXBbJyQnICsgc3ltc1trXV0gPSBzeW1zW2tdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICAgIGlmICghaGFzKG9iaiwga2V5KSkgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby1jb250aW51ZVxuICAgICAgICBpZiAoaXNBcnIgJiYgU3RyaW5nKE51bWJlcihrZXkpKSA9PT0ga2V5ICYmIGtleSA8IG9iai5sZW5ndGgpIHsgY29udGludWU7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tY29udGludWVcbiAgICAgICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzICYmIHN5bU1hcFsnJCcgKyBrZXldIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIHRvIHByZXZlbnQgc2hhbW1lZCBTeW1ib2xzLCB3aGljaCBhcmUgc3RvcmVkIGFzIHN0cmluZ3MsIGZyb20gYmVpbmcgaW5jbHVkZWQgaW4gdGhlIHN0cmluZyBrZXkgc2VjdGlvblxuICAgICAgICAgICAgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLWNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoKC9bXlxcdyRdLykudGVzdChrZXkpKSB7XG4gICAgICAgICAgICB4cy5wdXNoKGluc3BlY3Qoa2V5LCBvYmopICsgJzogJyArIGluc3BlY3Qob2JqW2tleV0sIG9iaikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeHMucHVzaChrZXkgKyAnOiAnICsgaW5zcGVjdChvYmpba2V5XSwgb2JqKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBnT1BTID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3ltcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKGlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltc1tqXSkpIHtcbiAgICAgICAgICAgICAgICB4cy5wdXNoKCdbJyArIGluc3BlY3Qoc3ltc1tqXSkgKyAnXTogJyArIGluc3BlY3Qob2JqW3N5bXNbal1dLCBvYmopKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geHM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xudmFyIGluc3BlY3QgPSByZXF1aXJlKCdvYmplY3QtaW5zcGVjdCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IEdldEludHJpbnNpYygnJVR5cGVFcnJvciUnKTtcbnZhciAkV2Vha01hcCA9IEdldEludHJpbnNpYygnJVdlYWtNYXAlJywgdHJ1ZSk7XG52YXIgJE1hcCA9IEdldEludHJpbnNpYygnJU1hcCUnLCB0cnVlKTtcblxudmFyICR3ZWFrTWFwR2V0ID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5nZXQnLCB0cnVlKTtcbnZhciAkd2Vha01hcFNldCA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuc2V0JywgdHJ1ZSk7XG52YXIgJHdlYWtNYXBIYXMgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmhhcycsIHRydWUpO1xudmFyICRtYXBHZXQgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuZ2V0JywgdHJ1ZSk7XG52YXIgJG1hcFNldCA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5zZXQnLCB0cnVlKTtcbnZhciAkbWFwSGFzID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLmhhcycsIHRydWUpO1xuXG4vKlxuICogVGhpcyBmdW5jdGlvbiB0cmF2ZXJzZXMgdGhlIGxpc3QgcmV0dXJuaW5nIHRoZSBub2RlIGNvcnJlc3BvbmRpbmcgdG8gdGhlXG4gKiBnaXZlbiBrZXkuXG4gKlxuICogVGhhdCBub2RlIGlzIGFsc28gbW92ZWQgdG8gdGhlIGhlYWQgb2YgdGhlIGxpc3QsIHNvIHRoYXQgaWYgaXQncyBhY2Nlc3NlZFxuICogYWdhaW4gd2UgZG9uJ3QgbmVlZCB0byB0cmF2ZXJzZSB0aGUgd2hvbGUgbGlzdC4gQnkgZG9pbmcgc28sIGFsbCB0aGUgcmVjZW50bHlcbiAqIHVzZWQgbm9kZXMgY2FuIGJlIGFjY2Vzc2VkIHJlbGF0aXZlbHkgcXVpY2tseS5cbiAqL1xudmFyIGxpc3RHZXROb2RlID0gZnVuY3Rpb24gKGxpc3QsIGtleSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG5cdGZvciAodmFyIHByZXYgPSBsaXN0LCBjdXJyOyAoY3VyciA9IHByZXYubmV4dCkgIT09IG51bGw7IHByZXYgPSBjdXJyKSB7XG5cdFx0aWYgKGN1cnIua2V5ID09PSBrZXkpIHtcblx0XHRcdHByZXYubmV4dCA9IGN1cnIubmV4dDtcblx0XHRcdGN1cnIubmV4dCA9IGxpc3QubmV4dDtcblx0XHRcdGxpc3QubmV4dCA9IGN1cnI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0XHRcdHJldHVybiBjdXJyO1xuXHRcdH1cblx0fVxufTtcblxudmFyIGxpc3RHZXQgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5KSB7XG5cdHZhciBub2RlID0gbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcblx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZTtcbn07XG52YXIgbGlzdFNldCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXksIHZhbHVlKSB7XG5cdHZhciBub2RlID0gbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcblx0aWYgKG5vZGUpIHtcblx0XHRub2RlLnZhbHVlID0gdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gUHJlcGVuZCB0aGUgbmV3IG5vZGUgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdFxuXHRcdG9iamVjdHMubmV4dCA9IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHRcdFx0a2V5OiBrZXksXG5cdFx0XHRuZXh0OiBvYmplY3RzLm5leHQsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG59O1xudmFyIGxpc3RIYXMgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5KSB7XG5cdHJldHVybiAhIWxpc3RHZXROb2RlKG9iamVjdHMsIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFNpZGVDaGFubmVsKCkge1xuXHR2YXIgJHdtO1xuXHR2YXIgJG07XG5cdHZhciAkbztcblx0dmFyIGNoYW5uZWwgPSB7XG5cdFx0YXNzZXJ0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRpZiAoIWNoYW5uZWwuaGFzKGtleSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1NpZGUgY2hhbm5lbCBkb2VzIG5vdCBjb250YWluICcgKyBpbnNwZWN0KGtleSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbiAoa2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICgkd20pIHtcblx0XHRcdFx0XHRyZXR1cm4gJHdlYWtNYXBHZXQoJHdtLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKCRNYXApIHtcblx0XHRcdFx0aWYgKCRtKSB7XG5cdFx0XHRcdFx0cmV0dXJuICRtYXBHZXQoJG0sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICgkbykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmVseS1pZlxuXHRcdFx0XHRcdHJldHVybiBsaXN0R2V0KCRvLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRoYXM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICgkd20pIHtcblx0XHRcdFx0XHRyZXR1cm4gJHdlYWtNYXBIYXMoJHdtLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKCRNYXApIHtcblx0XHRcdFx0aWYgKCRtKSB7XG5cdFx0XHRcdFx0cmV0dXJuICRtYXBIYXMoJG0sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICgkbykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmVseS1pZlxuXHRcdFx0XHRcdHJldHVybiBsaXN0SGFzKCRvLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRpZiAoJFdlYWtNYXAgJiYga2V5ICYmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyB8fCB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHRpZiAoISR3bSkge1xuXHRcdFx0XHRcdCR3bSA9IG5ldyAkV2Vha01hcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCR3ZWFrTWFwU2V0KCR3bSwga2V5LCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2UgaWYgKCRNYXApIHtcblx0XHRcdFx0aWYgKCEkbSkge1xuXHRcdFx0XHRcdCRtID0gbmV3ICRNYXAoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbWFwU2V0KCRtLCBrZXksIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghJG8pIHtcblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdCAqIEluaXRpYWxpemUgdGhlIGxpbmtlZCBsaXN0IGFzIGFuIGVtcHR5IG5vZGUsIHNvIHRoYXQgd2UgZG9uJ3QgaGF2ZVxuXHRcdFx0XHRcdCAqIHRvIHNwZWNpYWwtY2FzZSBoYW5kbGluZyBvZiB0aGUgZmlyc3Qgbm9kZTogd2UgY2FuIGFsd2F5cyByZWZlciB0b1xuXHRcdFx0XHRcdCAqIGl0IGFzIChwcmV2aW91cyBub2RlKS5uZXh0LCBpbnN0ZWFkIG9mIHNvbWV0aGluZyBsaWtlIChsaXN0KS5oZWFkXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0JG8gPSB7IGtleToge30sIG5leHQ6IG51bGwgfTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0U2V0KCRvLCBrZXksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBjaGFubmVsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG52YXIgRm9ybWF0ID0ge1xuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdkZWZhdWx0JzogRm9ybWF0LlJGQzM5ODYsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogRm9ybWF0LlJGQzE3MzgsXG4gICAgUkZDMzk4NjogRm9ybWF0LlJGQzM5ODZcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iai5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBhcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gYXJyYXlUb09iamVjdChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0gb3B0aW9ucyAmJiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIC8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjogMCAqL1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoKG9wdGlvbnMgJiYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSkgfHwgIWhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RhcmdldCwgc291cmNlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmICFpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgbWVyZ2VUYXJnZXQgPSBhcnJheVRvT2JqZWN0KHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiBpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0YXJnZXQsIGkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEl0ZW0gPSB0YXJnZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEl0ZW0gJiYgdHlwZW9mIHRhcmdldEl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldEl0ZW0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IG1lcmdlKGFjY1trZXldLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbWVyZ2VUYXJnZXQpO1xufTtcblxudmFyIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxudmFyIGRlY29kZSA9IGZ1bmN0aW9uIChzdHIsIGRlY29kZXIsIGNoYXJzZXQpIHtcbiAgICB2YXIgc3RyV2l0aG91dFBsdXMgPSBzdHIucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAvLyB1bmVzY2FwZSBuZXZlciB0aHJvd3MsIG5vIHRyeS4uLmNhdGNoIG5lZWRlZDpcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzLnJlcGxhY2UoLyVbMC05YS1mXXsyfS9naSwgdW5lc2NhcGUpO1xuICAgIH1cbiAgICAvLyB1dGYtOFxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyV2l0aG91dFBsdXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzO1xuICAgIH1cbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoc3RyLCBkZWZhdWx0RW5jb2RlciwgY2hhcnNldCwga2luZCwgZm9ybWF0KSB7XG4gICAgLy8gVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgQnJpYW4gV2hpdGUgKG1zY2RleCkgZm9yIHRoZSBpby5qcyBjb3JlIHF1ZXJ5c3RyaW5nIGxpYnJhcnkuXG4gICAgLy8gSXQgaGFzIGJlZW4gYWRhcHRlZCBoZXJlIGZvciBzdHJpY3RlciBhZGhlcmVuY2UgdG8gUkZDIDM5ODZcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmcgPSBzdHI7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHN0cmluZyA9IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdHIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc3RyaW5nID0gU3RyaW5nKHN0cik7XG4gICAgfVxuXG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICByZXR1cm4gZXNjYXBlKHN0cmluZykucmVwbGFjZSgvJXVbMC05YS1mXXs0fS9naSwgZnVuY3Rpb24gKCQwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyUyNiUyMycgKyBwYXJzZUludCgkMC5zbGljZSgyKSwgMTYpICsgJyUzQic7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGMgPT09IDB4MkQgLy8gLVxuICAgICAgICAgICAgfHwgYyA9PT0gMHgyRSAvLyAuXG4gICAgICAgICAgICB8fCBjID09PSAweDVGIC8vIF9cbiAgICAgICAgICAgIHx8IGMgPT09IDB4N0UgLy8gflxuICAgICAgICAgICAgfHwgKGMgPj0gMHgzMCAmJiBjIDw9IDB4MzkpIC8vIDAtOVxuICAgICAgICAgICAgfHwgKGMgPj0gMHg0MSAmJiBjIDw9IDB4NUEpIC8vIGEtelxuICAgICAgICAgICAgfHwgKGMgPj0gMHg2MSAmJiBjIDw9IDB4N0EpIC8vIEEtWlxuICAgICAgICAgICAgfHwgKGZvcm1hdCA9PT0gZm9ybWF0cy5SRkMxNzM4ICYmIChjID09PSAweDI4IHx8IGMgPT09IDB4MjkpKSAvLyAoIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxudmFyIG1heWJlTWFwID0gZnVuY3Rpb24gbWF5YmVNYXAodmFsLCBmbikge1xuICAgIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgICAgdmFyIG1hcHBlZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgbWFwcGVkLnB1c2goZm4odmFsW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcHBlZDtcbiAgICB9XG4gICAgcmV0dXJuIGZuKHZhbCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbWJpbmU6IGNvbWJpbmUsXG4gICAgY29tcGFjdDogY29tcGFjdCxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gICAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICAgIG1heWJlTWFwOiBtYXliZU1hcCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTaWRlQ2hhbm5lbCA9IHJlcXVpcmUoJ3NpZGUtY2hhbm5lbCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdEZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZGVmYXVsdEZvcm1hdF0sXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGluZGljZXM6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkge1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSA9IGZ1bmN0aW9uIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSh2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdib29sZWFuJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ3N5bWJvbCdcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdiaWdpbnQnO1xufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdCxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICBjaGFyc2V0LFxuICAgIHNpZGVDaGFubmVsXG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuXG4gICAgaWYgKHNpZGVDaGFubmVsLmhhcyhvYmplY3QpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdDeWNsaWMgb2JqZWN0IHZhbHVlJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAoZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBpc0FycmF5KG9iaikpIHtcbiAgICAgICAgb2JqID0gdXRpbHMubWF5YmVNYXAob2JqLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWFsaXplRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ2tleScsIGZvcm1hdCkgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAoaXNOb25OdWxsaXNoUHJpbWl0aXZlKG9iaikgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5JywgZm9ybWF0KTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ3ZhbHVlJywgZm9ybWF0KSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBpc0FycmF5KG9iaikpIHtcbiAgICAgICAgLy8gd2UgbmVlZCB0byBqb2luIGVsZW1lbnRzIGluXG4gICAgICAgIG9iaktleXMgPSBbeyB2YWx1ZTogb2JqLmxlbmd0aCA+IDAgPyBvYmouam9pbignLCcpIHx8IG51bGwgOiB1bmRlZmluZWQgfV07XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG4gICAgICAgIHZhciB2YWx1ZSA9IHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIGtleS52YWx1ZSAhPT0gdW5kZWZpbmVkID8ga2V5LnZhbHVlIDogb2JqW2tleV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5UHJlZml4ID0gaXNBcnJheShvYmopXG4gICAgICAgICAgICA/IHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSkgOiBwcmVmaXhcbiAgICAgICAgICAgIDogcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyk7XG5cbiAgICAgICAgc2lkZUNoYW5uZWwuc2V0KG9iamVjdCwgdHJ1ZSk7XG4gICAgICAgIHZhciB2YWx1ZVNpZGVDaGFubmVsID0gZ2V0U2lkZUNoYW5uZWwoKTtcbiAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGtleVByZWZpeCxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXQsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgY2hhcnNldCxcbiAgICAgICAgICAgIHZhbHVlU2lkZUNoYW5uZWxcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbnZhciBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5lbmNvZGVyICE9PSBudWxsICYmIG9wdHMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdHMuY2hhcnNldCB8fCBkZWZhdWx0cy5jaGFyc2V0O1xuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5mb3JtYXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghaGFzLmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtYXQgPSBvcHRzLmZvcm1hdDtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXG4gICAgdmFyIGZpbHRlciA9IGRlZmF1bHRzLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIG9wdHMuZmlsdGVyID09PSAnZnVuY3Rpb24nIHx8IGlzQXJyYXkob3B0cy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdHMuZmlsdGVyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFF1ZXJ5UHJlZml4OiB0eXBlb2Ygb3B0cy5hZGRRdWVyeVByZWZpeCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hZGRRdWVyeVByZWZpeCA6IGRlZmF1bHRzLmFkZFF1ZXJ5UHJlZml4LFxuICAgICAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdHMuZGVsaW1pdGVyLFxuICAgICAgICBlbmNvZGU6IHR5cGVvZiBvcHRzLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGUsXG4gICAgICAgIGVuY29kZXI6IHR5cGVvZiBvcHRzLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyLFxuICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5OiB0eXBlb2Ygb3B0cy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgICAgICBzZXJpYWxpemVEYXRlOiB0eXBlb2Ygb3B0cy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0cy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgc2tpcE51bGxzOiB0eXBlb2Ygb3B0cy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdHMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzLFxuICAgICAgICBzb3J0OiB0eXBlb2Ygb3B0cy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5zb3J0IDogbnVsbCxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpO1xuXG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAob3B0cyAmJiAnaW5kaWNlcycgaW4gb3B0cykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChvcHRpb25zLnNvcnQpO1xuICAgIH1cblxuICAgIHZhciBzaWRlQ2hhbm5lbCA9IGdldFNpZGVDaGFubmVsKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVzaFRvQXJyYXkoa2V5cywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBvcHRpb25zLnNraXBOdWxscyxcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlID8gb3B0aW9ucy5lbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsdGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5zb3J0LFxuICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0RvdHMsXG4gICAgICAgICAgICBvcHRpb25zLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdCxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0LFxuICAgICAgICAgICAgc2lkZUNoYW5uZWxcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihvcHRpb25zLmRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5jaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKSwgdGhlIFwibnVtZXJpYyBlbnRpdHlcIiByZXByZXNlbnRhdGlvbiBvZiBhIGNoZWNrbWFya1xuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JUUyJTlDJTkzJic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGFsbG93UHJvdG90eXBlczogZmFsc2UsXG4gICAgYWxsb3dTcGFyc2U6IGZhbHNlLFxuICAgIGFycmF5TGltaXQ6IDIwLFxuICAgIGNoYXJzZXQ6ICd1dGYtOCcsXG4gICAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgICBjb21tYTogZmFsc2UsXG4gICAgZGVjb2RlcjogdXRpbHMuZGVjb2RlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGRlcHRoOiA1LFxuICAgIGlnbm9yZVF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgICBpbnRlcnByZXROdW1lcmljRW50aXRpZXM6IGZhbHNlLFxuICAgIHBhcmFtZXRlckxpbWl0OiAxMDAwLFxuICAgIHBhcnNlQXJyYXlzOiB0cnVlLFxuICAgIHBsYWluT2JqZWN0czogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIGludGVycHJldE51bWVyaWNFbnRpdGllcyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYjKFxcZCspOy9nLCBmdW5jdGlvbiAoJDAsIG51bWJlclN0cikge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChudW1iZXJTdHIsIDEwKSk7XG4gICAgfSk7XG59O1xuXG52YXIgcGFyc2VBcnJheVZhbHVlID0gZnVuY3Rpb24gKHZhbCwgb3B0aW9ucykge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgb3B0aW9ucy5jb21tYSAmJiB2YWwuaW5kZXhPZignLCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG59O1xuXG4vLyBUaGlzIGlzIHdoYXQgYnJvd3NlcnMgd2lsbCBzdWJtaXQgd2hlbiB0aGUg4pyTIGNoYXJhY3RlciBvY2N1cnMgaW4gYW5cbi8vIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCBib2R5IGFuZCB0aGUgZW5jb2Rpbmcgb2YgdGhlIHBhZ2UgY29udGFpbmluZ1xuLy8gdGhlIGZvcm0gaXMgaXNvLTg4NTktMSwgb3Igd2hlbiB0aGUgc3VibWl0dGVkIGZvcm0gaGFzIGFuIGFjY2VwdC1jaGFyc2V0XG4vLyBhdHRyaWJ1dGUgb2YgaXNvLTg4NTktMS4gUHJlc3VtYWJseSBhbHNvIHdpdGggb3RoZXIgY2hhcnNldHMgdGhhdCBkbyBub3QgY29udGFpblxuLy8gdGhlIOKckyBjaGFyYWN0ZXIsIHN1Y2ggYXMgdXMtYXNjaWkuXG52YXIgaXNvU2VudGluZWwgPSAndXRmOD0lMjYlMjMxMDAwMyUzQic7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKVxuXG4vLyBUaGVzZSBhcmUgdGhlIHBlcmNlbnQtZW5jb2RlZCB1dGYtOCBvY3RldHMgcmVwcmVzZW50aW5nIGEgY2hlY2ttYXJrLCBpbmRpY2F0aW5nIHRoYXQgdGhlIHJlcXVlc3QgYWN0dWFsbHkgaXMgdXRmLTggZW5jb2RlZC5cbnZhciBjaGFyc2V0U2VudGluZWwgPSAndXRmOD0lRTIlOUMlOTMnOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG5cbnZhciBwYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdWYWx1ZXMoc3RyLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gICAgdmFyIHBhcnRzID0gY2xlYW5TdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIGxpbWl0KTtcbiAgICB2YXIgc2tpcEluZGV4ID0gLTE7IC8vIEtlZXAgdHJhY2sgb2Ygd2hlcmUgdGhlIHV0Zjggc2VudGluZWwgd2FzIGZvdW5kXG4gICAgdmFyIGk7XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdGlvbnMuY2hhcnNldDtcbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFydHNbaV0uaW5kZXhPZigndXRmOD0nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXSA9PT0gY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV0gPT09IGlzb1NlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAnaXNvLTg4NTktMSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNraXBJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaSA9IHBhcnRzLmxlbmd0aDsgLy8gVGhlIGVzbGludCBzZXR0aW5ncyBkbyBub3QgYWxsb3cgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGkgPT09IHNraXBJbmRleCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcblxuICAgICAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICAgICAgdmFyIHBvcyA9IGJyYWNrZXRFcXVhbHNQb3MgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBicmFja2V0RXF1YWxzUG9zICsgMTtcblxuICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICAgICAgICB2YWwgPSB1dGlscy5tYXliZU1hcChcbiAgICAgICAgICAgICAgICBwYXJzZUFycmF5VmFsdWUocGFydC5zbGljZShwb3MgKyAxKSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVuY29kZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZGVjb2RlcihlbmNvZGVkVmFsLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAndmFsdWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCAmJiBvcHRpb25zLmludGVycHJldE51bWVyaWNFbnRpdGllcyAmJiBjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIHZhbCA9IGludGVycHJldE51bWVyaWNFbnRpdGllcyh2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnQuaW5kZXhPZignW109JykgPiAtMSkge1xuICAgICAgICAgICAgdmFsID0gaXNBcnJheSh2YWwpID8gW3ZhbF0gOiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHV0aWxzLmNvbWJpbmUob2JqW2tleV0sIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgdmFyIGxlYWYgPSB2YWx1ZXNQYXJzZWQgPyB2YWwgOiBwYXJzZUFycmF5VmFsdWUodmFsLCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nICYmIG9wdGlvbnMucGFyc2VBcnJheXMpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IHsgMDogbGVhZiB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZWFmID0gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBsZWFmO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMsIHZhbHVlc1BhcnNlZCkge1xuICAgIGlmICghZ2l2ZW5LZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRyYW5zZm9ybSBkb3Qgbm90YXRpb24gdG8gYnJhY2tldCBub3RhdGlvblxuICAgIHZhciBrZXkgPSBvcHRpb25zLmFsbG93RG90cyA/IGdpdmVuS2V5LnJlcGxhY2UoL1xcLihbXi5bXSspL2csICdbJDFdJykgOiBnaXZlbktleTtcblxuICAgIC8vIFRoZSByZWdleCBjaHVua3NcblxuICAgIHZhciBicmFja2V0cyA9IC8oXFxbW15bXFxdXSpdKS87XG4gICAgdmFyIGNoaWxkID0gLyhcXFtbXltcXF1dKl0pL2c7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmVudFxuXG4gICAgdmFyIHNlZ21lbnQgPSBvcHRpb25zLmRlcHRoID4gMCAmJiBicmFja2V0cy5leGVjKGtleSk7XG4gICAgdmFyIHBhcmVudCA9IHNlZ21lbnQgPyBrZXkuc2xpY2UoMCwgc2VnbWVudC5pbmRleCkgOiBrZXk7XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIC8vIElmIHdlIGFyZW4ndCB1c2luZyBwbGFpbiBvYmplY3RzLCBvcHRpb25hbGx5IHByZWZpeCBrZXlzIHRoYXQgd291bGQgb3ZlcndyaXRlIG9iamVjdCBwcm90b3R5cGUgcHJvcGVydGllc1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHBhcmVudCkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzLnB1c2gocGFyZW50KTtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggY2hpbGRyZW4gYXBwZW5kaW5nIHRvIHRoZSBhcnJheSB1bnRpbCB3ZSBoaXQgZGVwdGhcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAob3B0aW9ucy5kZXB0aCA+IDAgJiYgKHNlZ21lbnQgPSBjaGlsZC5leGVjKGtleSkpICE9PSBudWxsICYmIGkgPCBvcHRpb25zLmRlcHRoKSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzZWdtZW50WzFdLnNsaWNlKDEsIC0xKSkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlJ3MgYSByZW1haW5kZXIsIGp1c3QgYWRkIHdoYXRldmVyIGlzIGxlZnRcblxuICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgIGtleXMucHVzaCgnWycgKyBrZXkuc2xpY2Uoc2VnbWVudC5pbmRleCkgKyAnXScpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMsIHZhbHVlc1BhcnNlZCk7XG59O1xuXG52YXIgbm9ybWFsaXplUGFyc2VPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRlY29kZXIgIT09IG51bGwgJiYgb3B0cy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG4gICAgdmFyIGNoYXJzZXQgPSB0eXBlb2Ygb3B0cy5jaGFyc2V0ID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmNoYXJzZXQgOiBvcHRzLmNoYXJzZXQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgICAgICBhbGxvd1Byb3RvdHlwZXM6IHR5cGVvZiBvcHRzLmFsbG93UHJvdG90eXBlcyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hbGxvd1Byb3RvdHlwZXMgOiBkZWZhdWx0cy5hbGxvd1Byb3RvdHlwZXMsXG4gICAgICAgIGFsbG93U3BhcnNlOiB0eXBlb2Ygb3B0cy5hbGxvd1NwYXJzZSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hbGxvd1NwYXJzZSA6IGRlZmF1bHRzLmFsbG93U3BhcnNlLFxuICAgICAgICBhcnJheUxpbWl0OiB0eXBlb2Ygb3B0cy5hcnJheUxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMuYXJyYXlMaW1pdCA6IGRlZmF1bHRzLmFycmF5TGltaXQsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgY29tbWE6IHR5cGVvZiBvcHRzLmNvbW1hID09PSAnYm9vbGVhbicgPyBvcHRzLmNvbW1hIDogZGVmYXVsdHMuY29tbWEsXG4gICAgICAgIGRlY29kZXI6IHR5cGVvZiBvcHRzLmRlY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmRlY29kZXIgOiBkZWZhdWx0cy5kZWNvZGVyLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgdXRpbHMuaXNSZWdFeHAob3B0cy5kZWxpbWl0ZXIpID8gb3B0cy5kZWxpbWl0ZXIgOiBkZWZhdWx0cy5kZWxpbWl0ZXIsXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvbiwgbm8tZXh0cmEtcGFyZW5zXG4gICAgICAgIGRlcHRoOiAodHlwZW9mIG9wdHMuZGVwdGggPT09ICdudW1iZXInIHx8IG9wdHMuZGVwdGggPT09IGZhbHNlKSA/ICtvcHRzLmRlcHRoIDogZGVmYXVsdHMuZGVwdGgsXG4gICAgICAgIGlnbm9yZVF1ZXJ5UHJlZml4OiBvcHRzLmlnbm9yZVF1ZXJ5UHJlZml4ID09PSB0cnVlLFxuICAgICAgICBpbnRlcnByZXROdW1lcmljRW50aXRpZXM6IHR5cGVvZiBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgOiBkZWZhdWx0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMsXG4gICAgICAgIHBhcmFtZXRlckxpbWl0OiB0eXBlb2Ygb3B0cy5wYXJhbWV0ZXJMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLnBhcmFtZXRlckxpbWl0IDogZGVmYXVsdHMucGFyYW1ldGVyTGltaXQsXG4gICAgICAgIHBhcnNlQXJyYXlzOiBvcHRzLnBhcnNlQXJyYXlzICE9PSBmYWxzZSxcbiAgICAgICAgcGxhaW5PYmplY3RzOiB0eXBlb2Ygb3B0cy5wbGFpbk9iamVjdHMgPT09ICdib29sZWFuJyA/IG9wdHMucGxhaW5PYmplY3RzIDogZGVmYXVsdHMucGxhaW5PYmplY3RzLFxuICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cyk7XG5cbiAgICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09IG51bGwgfHwgdHlwZW9mIHN0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBwYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICAgIHZhciBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgbmV3T2JqID0gcGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zLCB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyk7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5hbGxvd1NwYXJzZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1hdHM6IGZvcm1hdHMsXG4gICAgcGFyc2U6IHBhcnNlLFxuICAgIHN0cmluZ2lmeTogc3RyaW5naWZ5XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxuLyoqXHJcbiAqIEdlbmVyYXRlIHRoZSBBcnJheSBCdWZmZXIgb2JqZWN0IGZvciB0YXJnZXQgcmVmZXJlbmNlIHByb3ZpZGVkIGFzIHBhcmFtZXRlci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmcgfCBIVE1MSW5wdXRFbGVtZW50IHwgRmlsZUxpc3QgfCBGaWxlIHwgQXJyYXlCdWZmZXIgfCBCbG9ifSB0YXJnZXRcclxuICogQHJldHVybiB7UHJvbWlzZTxBcnJheUJ1ZmZlcj59XHJcbiAqL1xudmFyIHRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiB0b0FycmF5QnVmZmVyKHRhcmdldCkge1xuICBpZiAodHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdZb3VyIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgUHJvbWlzZXMuJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignWW91ciBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IEFycmF5QnVmZmVyLicpO1xuICB9XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiUGFyYW1ldGVyIHRvIGNvbnZlcnQgdG8gQXJyYXlCdWZmZXIgaXMgZW1wdHkgKHZhbHVlOiAnXCIuY29uY2F0KHRhcmdldCwgXCInKS5cIikpKTtcbiAgfVxuXG4gIGlmICh0YXJnZXQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0YXJnZXQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB0YXJnZXQuY29uc3RydWN0b3IgPT09IEJsb2IpIHtcbiAgICByZXR1cm4gdGFyZ2V0LnRvQXJyYXlCdWZmZXIoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBIVE1MIGZvdW5kIHdpdGggc2VsZWN0b3IgXFxcIlwiLmNvbmNhdCh0YXJnZXQsIFwiXFxcIi5cIikpKTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBlbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgSFRNTElucHV0RWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGFyZ2V0LmNvbnN0cnVjdG9yID09PSBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgaWYgKCF0YXJnZXQuZmlsZXMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0hUTUwgaW5wdXQgZWxlbWVudCByZWZlcmVuY2UgaXMgbm90IG9mIHR5cGUgXCJmaWxlXCIuJykpO1xuICAgIH1cblxuICAgIHRhcmdldCA9IHRhcmdldC5maWxlcztcbiAgfVxuXG4gIGlmICh0eXBlb2YgRmlsZUxpc3QgIT09ICd1bmRlZmluZWQnICYmIHRhcmdldC5jb25zdHJ1Y3RvciA9PT0gRmlsZUxpc3QpIHtcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignT2JqZWN0IEZpbGVMaXN0IGlzIGVtcHR5LicpKTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSB0YXJnZXRbMF07XG4gIH1cblxuICBpZiAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHRhcmdldC5jb25zdHJ1Y3RvciA9PT0gRmlsZSkge1xuICAgIGlmICh0eXBlb2YgRmlsZVJlYWRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdXIgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBGaWxlUmVhZGVyLicpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShldi50YXJnZXQucmVzdWx0KTtcbiAgICAgIH07XG5cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgIHJldHVybiByZWplY3QoZXYudGFyZ2V0LmVycm9yKTtcbiAgICAgIH07XG5cbiAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih0YXJnZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignUGFyYW1ldGVyIHR5cGUgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBIVE1MSW5wdXRFbGVtZW50LCBGaWxlTGlzdCwgRmlsZSwgU3RyaW5nIChpbnB1dCBzZWxlY3RvciksIEJsb2Igb3IgQXJyYXlCdWZmZXInKSk7XG59O1xuXG52YXIgX2RlZmF1bHQgPSB0b0FycmF5QnVmZmVyO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWVudiBub2RlICovXG52YXIgdG9BcnJheUJ1ZmZlciA9IHJlcXVpcmUoJy4vdG8tYXJyYXlidWZmZXInKVtcImRlZmF1bHRcIl07XG5cbm1vZHVsZS5leHBvcnRzID0gdG9BcnJheUJ1ZmZlcjsgLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHdpdGggRVMgbW9kdWxlIHN5bnRheFxuXG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB0b0FycmF5QnVmZmVyOyJdLCJuYW1lcyI6WyJiaW5kIiwiZm4iLCJ0aGlzQXJnIiwid3JhcCIsImFyZ3MiLCJBcnJheSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImkiLCJhcHBseSIsInJlcXVpcmUkJDAiLCJ0b1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsImlzQXJyYXkiLCJ2YWwiLCJjYWxsIiwiaXNVbmRlZmluZWQiLCJpc0J1ZmZlciIsImNvbnN0cnVjdG9yIiwiaXNBcnJheUJ1ZmZlciIsImlzRm9ybURhdGEiLCJGb3JtRGF0YSIsImlzQXJyYXlCdWZmZXJWaWV3IiwicmVzdWx0IiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJidWZmZXIiLCJpc1N0cmluZyIsImlzTnVtYmVyIiwiaXNPYmplY3QiLCJpc1BsYWluT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJpc0RhdGUiLCJpc0ZpbGUiLCJpc0Jsb2IiLCJpc0Z1bmN0aW9uIiwiaXNTdHJlYW0iLCJwaXBlIiwiaXNVUkxTZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ0cmltIiwic3RyIiwicmVwbGFjZSIsImlzU3RhbmRhcmRCcm93c2VyRW52IiwibmF2aWdhdG9yIiwicHJvZHVjdCIsIndpbmRvdyIsImRvY3VtZW50IiwiZm9yRWFjaCIsIm9iaiIsImwiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm1lcmdlIiwiYXNzaWduVmFsdWUiLCJzbGljZSIsImV4dGVuZCIsImEiLCJiIiwic3RyaXBCT00iLCJjb250ZW50IiwiY2hhckNvZGVBdCIsInV0aWxzIiwiZW5jb2RlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiYnVpbGRVUkwiLCJ1cmwiLCJwYXJhbXMiLCJwYXJhbXNTZXJpYWxpemVyIiwic2VyaWFsaXplZFBhcmFtcyIsInBhcnRzIiwic2VyaWFsaXplIiwicGFyc2VWYWx1ZSIsInYiLCJ0b0lTT1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdXNoIiwiam9pbiIsImhhc2htYXJrSW5kZXgiLCJpbmRleE9mIiwiSW50ZXJjZXB0b3JNYW5hZ2VyIiwiaGFuZGxlcnMiLCJ1c2UiLCJmdWxmaWxsZWQiLCJyZWplY3RlZCIsImVqZWN0IiwiaWQiLCJmb3JFYWNoSGFuZGxlciIsImgiLCJJbnRlcmNlcHRvck1hbmFnZXJfMSIsInRyYW5zZm9ybURhdGEiLCJkYXRhIiwiaGVhZGVycyIsImZucyIsInRyYW5zZm9ybSIsImlzQ2FuY2VsIiwidmFsdWUiLCJfX0NBTkNFTF9fIiwibm9ybWFsaXplSGVhZGVyTmFtZSIsIm5vcm1hbGl6ZWROYW1lIiwicHJvY2Vzc0hlYWRlciIsIm5hbWUiLCJ0b1VwcGVyQ2FzZSIsImVuaGFuY2VFcnJvciIsImVycm9yIiwiY29uZmlnIiwiY29kZSIsInJlcXVlc3QiLCJyZXNwb25zZSIsImlzQXhpb3NFcnJvciIsInRvSlNPTiIsIm1lc3NhZ2UiLCJkZXNjcmlwdGlvbiIsIm51bWJlciIsImZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsInN0YWNrIiwiY3JlYXRlRXJyb3IiLCJFcnJvciIsInNldHRsZSIsInJlc29sdmUiLCJyZWplY3QiLCJ2YWxpZGF0ZVN0YXR1cyIsInN0YXR1cyIsImNvb2tpZXMiLCJzdGFuZGFyZEJyb3dzZXJFbnYiLCJ3cml0ZSIsImV4cGlyZXMiLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiY29va2llIiwiRGF0ZSIsInRvR01UU3RyaW5nIiwicmVhZCIsIm1hdGNoIiwiUmVnRXhwIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVtb3ZlIiwibm93Iiwibm9uU3RhbmRhcmRCcm93c2VyRW52IiwiaXNBYnNvbHV0ZVVSTCIsInRlc3QiLCJjb21iaW5lVVJMcyIsImJhc2VVUkwiLCJyZWxhdGl2ZVVSTCIsInJlcXVpcmUkJDEiLCJidWlsZEZ1bGxQYXRoIiwicmVxdWVzdGVkVVJMIiwiaWdub3JlRHVwbGljYXRlT2YiLCJwYXJzZUhlYWRlcnMiLCJwYXJzZWQiLCJzcGxpdCIsInBhcnNlciIsImxpbmUiLCJzdWJzdHIiLCJ0b0xvd2VyQ2FzZSIsImNvbmNhdCIsImlzVVJMU2FtZU9yaWdpbiIsIm1zaWUiLCJ1c2VyQWdlbnQiLCJ1cmxQYXJzaW5nTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJvcmlnaW5VUkwiLCJyZXNvbHZlVVJMIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsInByb3RvY29sIiwiaG9zdCIsInNlYXJjaCIsImhhc2giLCJob3N0bmFtZSIsInBvcnQiLCJwYXRobmFtZSIsImNoYXJBdCIsImxvY2F0aW9uIiwicmVxdWVzdFVSTCIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwicmVxdWlyZSQkNCIsInJlcXVpcmUkJDUiLCJyZXF1aXJlJCQ2IiwicmVxdWlyZSQkNyIsInhociIsInhockFkYXB0ZXIiLCJQcm9taXNlIiwiZGlzcGF0Y2hYaHJSZXF1ZXN0IiwicmVxdWVzdERhdGEiLCJyZXF1ZXN0SGVhZGVycyIsIlhNTEh0dHBSZXF1ZXN0IiwiYXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ1bmVzY2FwZSIsIkF1dGhvcml6YXRpb24iLCJidG9hIiwiZnVsbFBhdGgiLCJvcGVuIiwibWV0aG9kIiwidGltZW91dCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImhhbmRsZUxvYWQiLCJyZWFkeVN0YXRlIiwicmVzcG9uc2VVUkwiLCJyZXNwb25zZUhlYWRlcnMiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJyZXNwb25zZURhdGEiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0Iiwib25hYm9ydCIsImhhbmRsZUFib3J0Iiwib25lcnJvciIsImhhbmRsZUVycm9yIiwib250aW1lb3V0IiwiaGFuZGxlVGltZW91dCIsInRpbWVvdXRFcnJvck1lc3NhZ2UiLCJ4c3JmVmFsdWUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ4c3JmQ29va2llTmFtZSIsInVuZGVmaW5lZCIsInhzcmZIZWFkZXJOYW1lIiwic2V0UmVxdWVzdEhlYWRlciIsImUiLCJvbkRvd25sb2FkUHJvZ3Jlc3MiLCJhZGRFdmVudExpc3RlbmVyIiwib25VcGxvYWRQcm9ncmVzcyIsInVwbG9hZCIsImNhbmNlbFRva2VuIiwicHJvbWlzZSIsInRoZW4iLCJvbkNhbmNlbGVkIiwiY2FuY2VsIiwiYWJvcnQiLCJzZW5kIiwiREVGQVVMVF9DT05URU5UX1RZUEUiLCJzZXRDb250ZW50VHlwZUlmVW5zZXQiLCJnZXREZWZhdWx0QWRhcHRlciIsImFkYXB0ZXIiLCJwcm9jZXNzIiwiZGVmYXVsdHMiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwidHJhbnNmb3JtUmVzcG9uc2UiLCJwYXJzZSIsIm1heENvbnRlbnRMZW5ndGgiLCJtYXhCb2R5TGVuZ3RoIiwiY29tbW9uIiwiZm9yRWFjaE1ldGhvZE5vRGF0YSIsImZvckVhY2hNZXRob2RXaXRoRGF0YSIsImRlZmF1bHRzXzEiLCJ0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkIiwidGhyb3dJZlJlcXVlc3RlZCIsImRpc3BhdGNoUmVxdWVzdCIsImNsZWFuSGVhZGVyQ29uZmlnIiwib25BZGFwdGVyUmVzb2x1dGlvbiIsIm9uQWRhcHRlclJlamVjdGlvbiIsInJlYXNvbiIsIm1lcmdlQ29uZmlnIiwiY29uZmlnMSIsImNvbmZpZzIiLCJ2YWx1ZUZyb21Db25maWcyS2V5cyIsIm1lcmdlRGVlcFByb3BlcnRpZXNLZXlzIiwiZGVmYXVsdFRvQ29uZmlnMktleXMiLCJkaXJlY3RNZXJnZUtleXMiLCJnZXRNZXJnZWRWYWx1ZSIsInRhcmdldCIsInNvdXJjZSIsIm1lcmdlRGVlcFByb3BlcnRpZXMiLCJwcm9wIiwidmFsdWVGcm9tQ29uZmlnMiIsImRlZmF1bHRUb0NvbmZpZzIiLCJheGlvc0tleXMiLCJvdGhlcktleXMiLCJrZXlzIiwiZmlsdGVyIiwiZmlsdGVyQXhpb3NLZXlzIiwiQXhpb3MiLCJpbnN0YW5jZUNvbmZpZyIsImludGVyY2VwdG9ycyIsImNoYWluIiwidW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMiLCJpbnRlcmNlcHRvciIsInVuc2hpZnQiLCJwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJzaGlmdCIsImdldFVyaSIsIkF4aW9zXzEiLCJDYW5jZWwiLCJDYW5jZWxfMSIsIkNhbmNlbFRva2VuIiwiZXhlY3V0b3IiLCJUeXBlRXJyb3IiLCJyZXNvbHZlUHJvbWlzZSIsInByb21pc2VFeGVjdXRvciIsInRva2VuIiwiYyIsIkNhbmNlbFRva2VuXzEiLCJzcHJlYWQiLCJjYWxsYmFjayIsImFyciIsInBheWxvYWQiLCJjcmVhdGVJbnN0YW5jZSIsImRlZmF1bHRDb25maWciLCJjb250ZXh0IiwiaW5zdGFuY2UiLCJheGlvcyIsImNyZWF0ZSIsImFsbCIsInByb21pc2VzIiwicmVxdWlyZSQkOCIsInJlcXVpcmUkJDkiLCJheGlvc01vZHVsZSIsInNoYW1zIiwiaGFzU3ltYm9scyIsIlN5bWJvbCIsImdldE93blByb3BlcnR5U3ltYm9scyIsIml0ZXJhdG9yIiwic3ltIiwic3ltT2JqIiwic3ltVmFsIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInN5bXMiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwib3JpZ1N5bWJvbCIsImdsb2JhbCIsImhhc1N5bWJvbFNoYW0iLCJoYXNOYXRpdmVTeW1ib2xzIiwiRVJST1JfTUVTU0FHRSIsInRvU3RyIiwiZnVuY1R5cGUiLCJpbXBsZW1lbnRhdGlvbiIsInRoYXQiLCJib3VuZCIsImJpbmRlciIsImJvdW5kTGVuZ3RoIiwiTWF0aCIsIm1heCIsImJvdW5kQXJncyIsIkZ1bmN0aW9uIiwiRW1wdHkiLCJmdW5jdGlvbkJpbmQiLCJzcmMiLCIkU3ludGF4RXJyb3IiLCJTeW50YXhFcnJvciIsIiRGdW5jdGlvbiIsIiRUeXBlRXJyb3IiLCJnZXRFdmFsbGVkQ29uc3RydWN0b3IiLCJleHByZXNzaW9uU3ludGF4IiwiJGdPUEQiLCJ0aHJvd1R5cGVFcnJvciIsIlRocm93VHlwZUVycm9yIiwiY2FsbGVlIiwiY2FsbGVlVGhyb3dzIiwiZ2V0IiwiZ09QRHRocm93cyIsImdldFByb3RvIiwieCIsIl9fcHJvdG9fXyIsIm5lZWRzRXZhbCIsIlR5cGVkQXJyYXkiLCJVaW50OEFycmF5IiwiSU5UUklOU0lDUyIsIkFnZ3JlZ2F0ZUVycm9yIiwiQXRvbWljcyIsIkJpZ0ludCIsIkJvb2xlYW4iLCJEYXRhVmlldyIsImRlY29kZVVSSSIsImVuY29kZVVSSSIsImV2YWwiLCJFdmFsRXJyb3IiLCJGbG9hdDMyQXJyYXkiLCJGbG9hdDY0QXJyYXkiLCJGaW5hbGl6YXRpb25SZWdpc3RyeSIsIkludDhBcnJheSIsIkludDE2QXJyYXkiLCJJbnQzMkFycmF5IiwiaXNGaW5pdGUiLCJpc05hTiIsIk1hcCIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJwYXJzZUludCIsIlByb3h5IiwiUmFuZ2VFcnJvciIsIlJlZmVyZW5jZUVycm9yIiwiUmVmbGVjdCIsIlNldCIsIlNoYXJlZEFycmF5QnVmZmVyIiwiU3RyaW5nIiwiVWludDhDbGFtcGVkQXJyYXkiLCJVaW50MTZBcnJheSIsIlVpbnQzMkFycmF5IiwiVVJJRXJyb3IiLCJXZWFrTWFwIiwiV2Vha1JlZiIsIldlYWtTZXQiLCJkb0V2YWwiLCJnZW4iLCJMRUdBQ1lfQUxJQVNFUyIsImhhc093biIsIiRjb25jYXQiLCIkc3BsaWNlQXBwbHkiLCJzcGxpY2UiLCIkcmVwbGFjZSIsIiRzdHJTbGljZSIsInJlUHJvcE5hbWUiLCJyZUVzY2FwZUNoYXIiLCJzdHJpbmdUb1BhdGgiLCJzdHJpbmciLCJmaXJzdCIsImxhc3QiLCJxdW90ZSIsInN1YlN0cmluZyIsImdldEJhc2VJbnRyaW5zaWMiLCJhbGxvd01pc3NpbmciLCJpbnRyaW5zaWNOYW1lIiwiYWxpYXMiLCJnZXRJbnRyaW5zaWMiLCJHZXRJbnRyaW5zaWMiLCJpbnRyaW5zaWNCYXNlTmFtZSIsImludHJpbnNpYyIsImludHJpbnNpY1JlYWxOYW1lIiwic2tpcEZ1cnRoZXJDYWNoaW5nIiwiaXNPd24iLCJwYXJ0IiwiZGVzYyIsIiRhcHBseSIsIiRjYWxsIiwiJHJlZmxlY3RBcHBseSIsIiRkZWZpbmVQcm9wZXJ0eSIsIiRtYXgiLCJtb2R1bGUiLCJjYWxsQmluZCIsIm9yaWdpbmFsRnVuY3Rpb24iLCJmdW5jIiwiY29uZmlndXJhYmxlIiwiYXBwbHlCaW5kIiwiZXhwb3J0cyIsIiRpbmRleE9mIiwiY2FsbEJvdW5kIiwiY2FsbEJvdW5kSW50cmluc2ljIiwiaGFzTWFwIiwibWFwU2l6ZURlc2NyaXB0b3IiLCJtYXBTaXplIiwibWFwRm9yRWFjaCIsImhhc1NldCIsInNldFNpemVEZXNjcmlwdG9yIiwic2V0U2l6ZSIsInNldEZvckVhY2giLCJoYXNXZWFrTWFwIiwid2Vha01hcEhhcyIsImhhcyIsImhhc1dlYWtTZXQiLCJ3ZWFrU2V0SGFzIiwiaGFzV2Vha1JlZiIsIndlYWtSZWZEZXJlZiIsImRlcmVmIiwiYm9vbGVhblZhbHVlT2YiLCJ2YWx1ZU9mIiwib2JqZWN0VG9TdHJpbmciLCJmdW5jdGlvblRvU3RyaW5nIiwiYmlnSW50VmFsdWVPZiIsImdPUFMiLCJzeW1Ub1N0cmluZyIsImhhc1NoYW1tZWRTeW1ib2xzIiwiaXNFbnVtZXJhYmxlIiwiZ1BPIiwiTyIsImluc3BlY3RDdXN0b20iLCJjdXN0b20iLCJpbnNwZWN0U3ltYm9sIiwiaXNTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIm9iamVjdEluc3BlY3QiLCJpbnNwZWN0XyIsIm9wdGlvbnMiLCJkZXB0aCIsInNlZW4iLCJvcHRzIiwicXVvdGVTdHlsZSIsIm1heFN0cmluZ0xlbmd0aCIsIkluZmluaXR5IiwiY3VzdG9tSW5zcGVjdCIsImluZGVudCIsImluc3BlY3RTdHJpbmciLCJtYXhEZXB0aCIsImdldEluZGVudCIsImluc3BlY3QiLCJmcm9tIiwibm9JbmRlbnQiLCJuZXdPcHRzIiwibmFtZU9mIiwiYXJyT2JqS2V5cyIsInN5bVN0cmluZyIsIm1hcmtCb3hlZCIsImlzRWxlbWVudCIsInMiLCJub2RlTmFtZSIsImF0dHJzIiwiYXR0cmlidXRlcyIsIndyYXBRdW90ZXMiLCJjaGlsZE5vZGVzIiwieHMiLCJzaW5nbGVMaW5lVmFsdWVzIiwiaW5kZW50ZWRKb2luIiwiaXNFcnJvciIsImlzTWFwIiwibWFwUGFydHMiLCJjb2xsZWN0aW9uT2YiLCJpc1NldCIsInNldFBhcnRzIiwiaXNXZWFrTWFwIiwid2Vha0NvbGxlY3Rpb25PZiIsImlzV2Vha1NldCIsImlzV2Vha1JlZiIsImlzQmlnSW50IiwiaXNCb29sZWFuIiwiaXNSZWdFeHAiLCJ5cyIsInByb3RvVGFnIiwic3RyaW5nVGFnIiwiY29uc3RydWN0b3JUYWciLCJ0YWciLCJkZWZhdWx0U3R5bGUiLCJxdW90ZUNoYXIiLCJmIiwibSIsIkhUTUxFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwicmVtYWluaW5nIiwidHJhaWxlciIsImxvd2J5dGUiLCJuIiwidHlwZSIsInNpemUiLCJlbnRyaWVzIiwiam9pbmVkRW50cmllcyIsImJhc2VJbmRlbnQiLCJiYXNlIiwicHJldiIsImxpbmVKb2luZXIiLCJpc0FyciIsInN5bU1hcCIsImsiLCJqIiwiJFdlYWtNYXAiLCIkTWFwIiwiJHdlYWtNYXBHZXQiLCIkd2Vha01hcFNldCIsIiR3ZWFrTWFwSGFzIiwiJG1hcEdldCIsIiRtYXBTZXQiLCIkbWFwSGFzIiwibGlzdEdldE5vZGUiLCJsaXN0IiwiY3VyciIsIm5leHQiLCJsaXN0R2V0Iiwib2JqZWN0cyIsIm5vZGUiLCJsaXN0U2V0IiwibGlzdEhhcyIsInNpZGVDaGFubmVsIiwiZ2V0U2lkZUNoYW5uZWwiLCIkd20iLCIkbSIsIiRvIiwiY2hhbm5lbCIsImFzc2VydCIsInNldCIsInBlcmNlbnRUd2VudGllcyIsIkZvcm1hdCIsIlJGQzE3MzgiLCJSRkMzOTg2IiwiZm9ybWF0cyIsImZvcm1hdHRlcnMiLCJoZXhUYWJsZSIsImFycmF5IiwiY29tcGFjdFF1ZXVlIiwicXVldWUiLCJpdGVtIiwicG9wIiwiY29tcGFjdGVkIiwiYXJyYXlUb09iamVjdCIsInBsYWluT2JqZWN0cyIsImFsbG93UHJvdG90eXBlcyIsIm1lcmdlVGFyZ2V0IiwidGFyZ2V0SXRlbSIsInJlZHVjZSIsImFjYyIsImFzc2lnbiIsImFzc2lnblNpbmdsZVNvdXJjZSIsImRlY29kZSIsImRlY29kZXIiLCJjaGFyc2V0Iiwic3RyV2l0aG91dFBsdXMiLCJkZWZhdWx0RW5jb2RlciIsImtpbmQiLCJmb3JtYXQiLCJlc2NhcGUiLCIkMCIsIm91dCIsImNvbXBhY3QiLCJvIiwicmVmcyIsImNvbWJpbmUiLCJtYXliZU1hcCIsIm1hcHBlZCIsImFycmF5UHJlZml4R2VuZXJhdG9ycyIsImJyYWNrZXRzIiwicHJlZml4IiwiY29tbWEiLCJpbmRpY2VzIiwicmVwZWF0IiwicHVzaFRvQXJyYXkiLCJ2YWx1ZU9yQXJyYXkiLCJ0b0lTTyIsImRlZmF1bHRGb3JtYXQiLCJhZGRRdWVyeVByZWZpeCIsImFsbG93RG90cyIsImNoYXJzZXRTZW50aW5lbCIsImRlbGltaXRlciIsImVuY29kZXIiLCJlbmNvZGVWYWx1ZXNPbmx5IiwiZm9ybWF0dGVyIiwic2VyaWFsaXplRGF0ZSIsImRhdGUiLCJza2lwTnVsbHMiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJpc05vbk51bGxpc2hQcmltaXRpdmUiLCJvYmplY3QiLCJnZW5lcmF0ZUFycmF5UHJlZml4Iiwic29ydCIsImtleVZhbHVlIiwidmFsdWVzIiwib2JqS2V5cyIsImtleVByZWZpeCIsInZhbHVlU2lkZUNoYW5uZWwiLCJub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zIiwic3RyaW5naWZ5XzEiLCJhcnJheUZvcm1hdCIsImpvaW5lZCIsImFsbG93U3BhcnNlIiwiYXJyYXlMaW1pdCIsImlnbm9yZVF1ZXJ5UHJlZml4IiwiaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIiwicGFyYW1ldGVyTGltaXQiLCJwYXJzZUFycmF5cyIsIm51bWJlclN0ciIsImZyb21DaGFyQ29kZSIsInBhcnNlQXJyYXlWYWx1ZSIsImlzb1NlbnRpbmVsIiwicGFyc2VWYWx1ZXMiLCJwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzIiwiY2xlYW5TdHIiLCJsaW1pdCIsInNraXBJbmRleCIsImJyYWNrZXRFcXVhbHNQb3MiLCJwb3MiLCJlbmNvZGVkVmFsIiwicGFyc2VPYmplY3QiLCJ2YWx1ZXNQYXJzZWQiLCJsZWFmIiwicm9vdCIsImNsZWFuUm9vdCIsImluZGV4IiwicGFyc2VLZXlzIiwicGFyc2VRdWVyeVN0cmluZ0tleXMiLCJnaXZlbktleSIsImNoaWxkIiwic2VnbWVudCIsImV4ZWMiLCJwYXJlbnQiLCJub3JtYWxpemVQYXJzZU9wdGlvbnMiLCJ0ZW1wT2JqIiwibmV3T2JqIiwibGliIiwiZGVmaW5lUHJvcGVydHkiLCJ0b0FycmF5QnVmZmVyIiwiQmxvYiIsImVsIiwicXVlcnlTZWxlY3RvciIsIkhUTUxJbnB1dEVsZW1lbnQiLCJmaWxlcyIsIkZpbGVMaXN0IiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJyZWFkZXIiLCJvbmxvYWRlbmQiLCJldiIsInJlYWRBc0FycmF5QnVmZmVyIiwiX2RlZmF1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQUVBQSxNQUFjLEdBQUcsU0FBU0EsSUFBVCxDQUFjQyxFQUFkLEVBQWtCQyxPQUFsQixFQUEyQjtDQUMxQyxTQUFPLFNBQVNDLElBQVQsR0FBZ0I7Q0FDckIsUUFBSUMsSUFBSSxHQUFHLElBQUlDLEtBQUosQ0FBVUMsU0FBUyxDQUFDQyxNQUFwQixDQUFYOztDQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osSUFBSSxDQUFDRyxNQUF6QixFQUFpQ0MsQ0FBQyxFQUFsQyxFQUFzQztDQUNwQ0osTUFBQUEsSUFBSSxDQUFDSSxDQUFELENBQUosR0FBVUYsU0FBUyxDQUFDRSxDQUFELENBQW5CO0NBQ0Q7O0NBQ0QsV0FBT1AsRUFBRSxDQUFDUSxLQUFILENBQVNQLE9BQVQsRUFBa0JFLElBQWxCLENBQVA7Q0FDRCxHQU5EO0NBT0Q7O0NDUkQsSUFBSUosTUFBSSxHQUFHVSxNQUFYO0NBRUE7Q0FFQTs7Q0FFQSxJQUFJQyxRQUFRLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkYsUUFBaEM7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0NBQ0EsU0FBU0csU0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7Q0FDcEIsU0FBT0osUUFBUSxDQUFDSyxJQUFULENBQWNELEdBQWQsTUFBdUIsZ0JBQTlCO0NBQ0Q7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztDQUNBLFNBQVNFLFdBQVQsQ0FBcUJGLEdBQXJCLEVBQTBCO0NBQ3hCLFNBQU8sT0FBT0EsR0FBUCxLQUFlLFdBQXRCO0NBQ0Q7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7OztD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ckMsY0FBTSxJQUFJL1ksU0FBSixDQUFjLCtDQUFkLENBQU47Q0FDRDs7Q0FFRCxhQUFPLElBQUkxRyxPQUFKLENBQVksVUFBVWpFLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0NBQzVDLFlBQUkwakIsTUFBTSxHQUFHLElBQUlELFVBQUosRUFBYjs7Q0FFQUMsUUFBQUEsTUFBTSxDQUFDQyxTQUFQLEdBQW1CLFVBQVVDLEVBQVYsRUFBYztDQUMvQixpQkFBTzdqQixPQUFPLENBQUM2akIsRUFBRSxDQUFDNWEsTUFBSCxDQUFVcFAsTUFBWCxDQUFkO0NBQ0QsU0FGRDs7Q0FJQThwQixRQUFBQSxNQUFNLENBQUMvZCxPQUFQLEdBQWlCLFVBQVVpZSxFQUFWLEVBQWM7Q0FDN0IsaUJBQU81akIsTUFBTSxDQUFDNGpCLEVBQUUsQ0FBQzVhLE1BQUgsQ0FBVWxLLEtBQVgsQ0FBYjtDQUNELFNBRkQ7O0NBSUE0a0IsUUFBQUEsTUFBTSxDQUFDRyxpQkFBUCxDQUF5QjdhLE1BQXpCO0NBQ0QsT0FaTSxDQUFQO0NBYUQ7O0NBRUQsV0FBT2hGLE9BQU8sQ0FBQ2hFLE1BQVIsQ0FBZSxJQUFJSCxLQUFKLENBQVUsc0hBQVYsQ0FBZixDQUFQO0NBQ0QsR0FsRUQ7O0NBb0VBLE1BQUlpa0IsUUFBUSxHQUFHYixhQUFmO0NBQ0FqUCxFQUFBQSxPQUFPLENBQUMsU0FBRCxDQUFQLEdBQXFCOFAsUUFBckI7Ozs7Q0NoRkE7O0NBQ0EsTUFBSWIsYUFBYSxHQUFHbnFCLGFBQTJCLENBQUMsU0FBRCxDQUEvQztDQUVBNGEsRUFBQUEsY0FBQSxHQUFpQnVQLGFBQWpCOztDQUVBdlAsRUFBQUEsTUFBTSxDQUFDTSxPQUFQLENBQWUsU0FBZixJQUE0QmlQLGFBQTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
