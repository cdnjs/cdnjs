(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HTTPClient"] = factory();
	else
		root["HTTPClient"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.requestInfo = exports.parseJSON = exports.parseText = exports.handleResponse = exports.params = exports.json = exports.body = exports.query = exports.base = exports.accept = exports.auth = exports.header = exports.method = exports.createFetch = exports.createStack = exports.fetch = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _queryString = __webpack_require__(1);

	var globalFetch = typeof fetch !== 'function' ? ( false ? 'undefined' : _typeof(window)) !== 'object' && __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"node-fetch\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) : fetch;

	var resolvePromise = function resolvePromise(promise, callback) {
	  return promise.then(function (value) {
	    return callback(null, value);
	  }, callback);
	};

	var enhanceFetch = function enhanceFetch(fetch) {
	  return function (input, options, callback) {
	    if (typeof callback !== 'function') {
	      if (typeof options === 'function') {
	        callback = options;
	        options = undefined;
	      } else if (typeof input === 'function') {
	        callback = input;
	        input = undefined;
	      }
	    }

	    var promise = fetch(input, options);

	    return typeof callback === 'function' ? resolvePromise(promise, callback) : promise;
	  };
	};

	var enhancedFetch = enhanceFetch(globalFetch);

	var stringifyJSON = function stringifyJSON(json) {
	  return typeof json === 'string' ? json : JSON.stringify(json);
	};

	var stringifyQuery = function stringifyQuery(query) {
	  return typeof query === 'string' ? query : (0, _queryString.stringify)(query);
	};

	var emptyStack = function emptyStack(fetch, input, options) {
	  return fetch(input, options);
	};

	exports.fetch = enhancedFetch;

	/**
	 * Creates a middleware "stack" function using all arguments.
	 */

	var createStack = exports.createStack = function createStack() {
	  for (var _len = arguments.length, middleware = Array(_len), _key = 0; _key < _len; _key++) {
	    middleware[_key] = arguments[_key];
	  }

	  if (middleware.length === 0) return emptyStack;

	  return middleware.reduceRight(function (inner, outer) {
	    return function (fetch, outerInput, outerOptions) {
	      return outer(function (innerInput, innerOptions) {
	        return inner(fetch, innerInput, innerOptions);
	      }, outerInput, outerOptions);
	    };
	  });
	};

	/**
	 * Creates a fetch function using all arguments as middleware.
	 */
	var createFetch = exports.createFetch = function createFetch() {
	  if (arguments.length === 0) return enhancedFetch;

	  var stack = createStack.apply(undefined, arguments);

	  return enhanceFetch(function (input, options) {
	    return stack(globalFetch, input, options);
	  });
	};

	var setHeader = function setHeader(options, name, value) {
	  (options.headers || (options.headers = {}))[name] = value;
	};

	/**
	 * Sets the request method.
	 */
	var method = exports.method = function method(verb) {
	  return function (fetch, input) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    options.method = verb;
	    return fetch(input, options);
	  };
	};

	/**
	 * Adds a header to the request.
	 */
	var header = exports.header = function header(name, value) {
	  return function (fetch, input) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    setHeader(options, name, value);
	    return fetch(input, options);
	  };
	};

	/**
	 * Adds an Authorization header to the request.
	 */
	var auth = exports.auth = function auth(value) {
	  return header('Authorization', value);
	};

	/**
	 * Adds an Accept header to the request.
	 */
	var accept = exports.accept = function accept(contentType) {
	  return header('Accept', contentType);
	};

	/**
	 * Adds the given string at the front of the request URL.
	 */
	var base = exports.base = function base(baseURL) {
	  return function (fetch, input, options) {
	    return fetch(baseURL + (input || ''), options);
	  };
	};

	/**
	 * Adds the given object to the query string in the request.
	 */
	var query = exports.query = function query(object) {
	  var queryString = stringifyQuery(object);

	  return function (fetch, input, options) {
	    return fetch(input + (input.indexOf('?') === -1 ? '?' : '&') + queryString, options);
	  };
	};

	/**
	 * Adds the given content to the request.
	 */
	var body = exports.body = function body(content, contentType) {
	  return function (fetch, input) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    options.body = content;

	    if (content.length != null) setHeader(options, 'Content-Length', content.length);

	    if (contentType) setHeader(options, 'Content-Type', contentType);

	    return fetch(input, options);
	  };
	};

	/**
	 * Adds an application/json payload to the request.
	 */
	var json = exports.json = function json(object) {
	  return body(stringifyJSON(object), 'application/json');
	};

	/**
	 * Adds the given object to the query string of GET/HEAD requests
	 * and as a application/x-www-form-urlencoded payload on all others.
	 */
	var params = exports.params = function params(object) {
	  var queryString = stringifyQuery(object);

	  return function (fetch, input) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var verb = (options.method || 'GET').toUpperCase();
	    var middleware = verb === 'GET' || verb === 'HEAD' ? query(queryString) : body(queryString, 'application/x-www-form-urlencoded');

	    return middleware(fetch, input, options);
	  };
	};

	/**
	 * A helper for creating middleware that handles a successful response.
	 */
	var handleResponse = exports.handleResponse = function handleResponse(callback) {
	  return function (fetch, input, options) {
	    return fetch(input, options).then(callback);
	  };
	};

	/**
	 * Adds the text of the response to response[propertyName].
	 */
	var parseText = exports.parseText = function parseText() {
	  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'textString' : arguments[0];
	  return handleResponse(function (response) {
	    return response.text().then(function (value) {
	      response[propertyName] = value;
	      return response;
	    });
	  });
	};

	/**
	 * Adds the JSON of the response to response[propertyName].
	 */
	var parseJSON = exports.parseJSON = function parseJSON() {
	  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'jsonData' : arguments[0];
	  return handleResponse(function (response) {
	    return response.json().then(function (value) {
	      response[propertyName] = value;
	      return response;
	    }, function (error) {
	      throw new Error('Error parsing JSON: ' + error.stack);
	    });
	  });
	};

	/**
	 * Adds the requestURL and requestOptions properties to the
	 * response/error. Mainly useful in testing/debugging.
	 */
	var requestInfo = exports.requestInfo = function requestInfo() {
	  return function (fetch, input, options) {
	    return fetch(input, options).then(function (response) {
	      response.requestInput = input;
	      response.requestOptions = options;
	      return response;
	    }, function () {
	      var error = arguments.length <= 0 || arguments[0] === undefined ? new Error() : arguments[0];

	      error.requestInput = input;
	      error.requestOptions = options;
	      throw error;
	    });
	  };
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(2);

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return {};
		}

		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret[key]) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, Object.create(null));
	};

	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.slice().sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}

			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ }
/******/ ])
});
;