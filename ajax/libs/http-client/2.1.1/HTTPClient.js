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
	exports.requestInfo = exports.parseJSON = exports.parseText = exports.params = exports.json = exports.body = exports.query = exports.base = exports.accept = exports.auth = exports.header = exports.method = exports.createFetch = exports.createStack = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _queryString = __webpack_require__(1);

	var globalFetch = undefined;
	if (typeof fetch === 'function') {
	  globalFetch = fetch;
	} else if (( false ? 'undefined' : _typeof(window)) !== 'object') {
	  globalFetch = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"node-fetch\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	}

	var stringifyQuery = function stringifyQuery(query) {
	  return typeof query === 'string' ? query : (0, _queryString.stringify)(query);
	};

	var emptyStack = function emptyStack(fetch, url, options) {
	  return fetch(url, options);
	};

	/**
	 * Creates a middleware "stack" function using all arguments.
	 */
	var createStack = exports.createStack = function createStack() {
	  for (var _len = arguments.length, middleware = Array(_len), _key = 0; _key < _len; _key++) {
	    middleware[_key] = arguments[_key];
	  }

	  if (middleware.length === 0) return emptyStack;

	  return middleware.reduceRight(function (inner, outer) {
	    return function (fetch, url, options) {
	      return outer(function (url, options) {
	        return inner(fetch, url, options);
	      }, url, options);
	    };
	  });
	};

	/**
	 * Creates a fetch function using all arguments as middleware.
	 */
	var createFetch = exports.createFetch = function createFetch() {
	  if (arguments.length === 0) return fetch;

	  var stack = createStack.apply(undefined, arguments);

	  return function (url, options) {
	    return stack(globalFetch, url, options);
	  };
	};

	var setHeader = function setHeader(options, name, value) {
	  return (options.headers || (options.headers = {}))[name] = value;
	};

	/**
	 * Sets the request method.
	 */
	var method = exports.method = function method(verb) {
	  return function (fetch, url) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    options.method = verb;
	    return fetch(url, options);
	  };
	};

	/**
	 * Adds a header to the request.
	 */
	var header = exports.header = function header(name, value) {
	  return function (fetch, url) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    setHeader(options, name, value);
	    return fetch(url, options);
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
	  return function (fetch, url, options) {
	    return fetch(baseURL + url, options);
	  };
	};

	/**
	 * Adds the given object to the query string in the request.
	 */
	var query = exports.query = function query(object) {
	  var queryString = stringifyQuery(object);

	  return function (fetch, url, options) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;
	    return fetch(url, options);
	  };
	};

	/**
	 * Adds the given content to the request.
	 */
	var body = exports.body = function body(content, contentType) {
	  return function (fetch, url) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    options.body = content;

	    if (content.length != null) setHeader(options, 'Content-Length', content.length);

	    if (contentType) setHeader(options, 'Content-Type', contentType);

	    return fetch(url, options);
	  };
	};

	/**
	 * Adds an application/json payload to the request.
	 */
	var json = exports.json = function json(object) {
	  return body(typeof object === 'string' ? object : JSON.stringify(object), 'application/json');
	};

	/**
	 * Adds the given object to the query string of GET/HEAD requests
	 * and as a application/x-www-form-urlencoded payload on all others.
	 */
	var params = exports.params = function params(object) {
	  var queryString = stringifyQuery(object);

	  return function (fetch, url) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var method = (options.method || 'GET').toUpperCase();
	    var middleware = method === 'GET' || method === 'HEAD' ? query(queryString) : body(queryString, 'application/x-www-form-urlencoded');

	    return middleware(fetch, url, options);
	  };
	};

	var enhanceResponse = function enhanceResponse(callback) {
	  return function (fetch, url, options) {
	    return fetch(url, options).then(callback);
	  };
	};

	/**
	 * Adds the text of the response to response[propertyName].
	 */
	var parseText = exports.parseText = function parseText() {
	  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'textString' : arguments[0];
	  return enhanceResponse(function (response) {
	    return response.text().then(function (text) {
	      response[propertyName] = text;
	      return response;
	    });
	  });
	};

	/**
	 * Adds the JSON of the response to response[propertyName].
	 */
	var parseJSON = exports.parseJSON = function parseJSON() {
	  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'jsonData' : arguments[0];
	  return enhanceResponse(function (response) {
	    return response.json().then(function (json) {
	      response[propertyName] = json;
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
	  return function (fetch, url, options) {
	    return fetch(url, options).then(function (response) {
	      response.requestURL = url;
	      response.requestOptions = options;
	      return response;
	    }, function (error) {
	      error = error || new Error();
	      error.requestURL = url;
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

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
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