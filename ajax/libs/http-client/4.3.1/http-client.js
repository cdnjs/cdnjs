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
	exports.requestInfo = exports.debug = exports.parseText = exports.parseJSON = exports.parse = exports.onResponse = exports.handleResponse = exports.recv = exports.params = exports.json = exports.body = exports.query = exports.base = exports.accept = exports.auth = exports.header = exports.method = exports.init = exports.fetch = exports.createFetch = exports.createStack = exports.enhanceFetch = exports.enableRecv = undefined;

	var _queryString = __webpack_require__(1);

	var _byteLength = __webpack_require__(4);

	var _byteLength2 = _interopRequireDefault(_byteLength);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var global = (1, eval)('this');

	var stringifyQuery = function stringifyQuery(query) {
	  return typeof query === 'string' ? query : (0, _queryString.stringify)(query);
	};

	var stringifyJSON = function stringifyJSON(json) {
	  return typeof json === 'string' ? json : JSON.stringify(json);
	};

	var processResponse = function processResponse(response, handlers) {
	  return handlers.reduce(function (promise, handler) {
	    return promise.then(handler);
	  }, Promise.resolve(response));
	};

	/**
	 * Returns a new fetch function that knows how to execute
	 * options.responseHandlers on the response.
	 */
	var enableRecv = exports.enableRecv = function enableRecv(fetch) {
	  return function (input) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    return fetch(input, options).then(function (response) {
	      var responseHandlers = options.responseHandlers;

	      return responseHandlers && responseHandlers.length ? processResponse(response, responseHandlers) : response;
	    });
	  };
	};

	// Deprecated.
	var enhanceFetch = exports.enhanceFetch = enableRecv;

	var emptyStack = function emptyStack(fetch, input, options) {
	  return fetch(input, options);
	};

	/**
	 * Creates a middleware "stack" function using all arguments.
	 * A "stack" is essentially a bunch of middleware composed into
	 * a single middleware function. Since all middleware share the
	 * same signature, stacks may further be combined to create more
	 * stacks with different characteristics.
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
	 * This function is a "stack" that uses the global fetch, so the
	 * following two examples are equivalent:
	 *
	 *   const stack = createStack(middleware)
	 *   stack(global.fetch, input, options)
	 *
	 *   const fetch = createFetch(middleware)
	 *   fetch(input, options)
	 *
	 * Thus, createFetch essentially eliminates some boilerplate code
	 * when you just want to use the global fetch function.
	 */
	var createFetch = exports.createFetch = function createFetch() {
	  if (arguments.length === 0) return global.fetch;

	  var stack = createStack.apply(undefined, arguments);

	  return enableRecv(function (input) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    return stack(global.fetch, input, options);
	  });
	};

	// Deprecated.
	var mainFetch = enableRecv(global.fetch);
	exports.fetch = mainFetch;

	/**
	 * Sets a property name and value in the options object.
	 */

	var init = exports.init = function init(propertyName, value) {
	  return function (fetch, input) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    options[propertyName] = value;
	    return fetch(input, options);
	  };
	};

	/**
	 * Sets the request method.
	 */
	var method = exports.method = function method(verb) {
	  return init('method', verb);
	};

	var setHeader = function setHeader(options, name, value) {
	  (options.headers || (options.headers = {}))[name] = value;
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
	var accept = exports.accept = function accept(value) {
	  return header('Accept', value);
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

	    if (content.length != null) setHeader(options, 'Content-Length', (0, _byteLength2.default)(content));

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
	var recv = exports.recv = function recv(handler) {
	  return function (fetch, input) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    (options.responseHandlers || (options.responseHandlers = [])).push(handler);
	    return fetch(input, options);
	  };
	};

	// Deprecated.
	var handleResponse = exports.handleResponse = recv;
	var onResponse = exports.onResponse = recv;

	/**
	 * Reads the response stream to completion, parses its content
	 * using the given parser, and adds the result to response.body.
	 */
	var parse = exports.parse = function parse(parser) {
	  var as = arguments.length <= 1 || arguments[1] === undefined ? 'body' : arguments[1];
	  return recv(function (response) {
	    if (as in response) return response[as];

	    return response[parser]().then(function (body) {
	      response[as] = body;
	      return response;
	    }, function (error) {
	      throw new Error('parse(\'' + parser + '\') error: ' + error.stack);
	    });
	  });
	};

	// Deprecated.
	var parseJSON = exports.parseJSON = function parseJSON() {
	  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'jsonData' : arguments[0];
	  return parse('json', propertyName);
	};

	// Deprecated.
	var parseText = exports.parseText = function parseText() {
	  var propertyName = arguments.length <= 0 || arguments[0] === undefined ? 'textString' : arguments[0];
	  return parse('text', propertyName);
	};

	/**
	 * Adds a debug property to the response/error that contains
	 * the input and options used in the request. Mainly useful in
	 * testing and debugging.
	 */
	var debug = exports.debug = function debug() {
	  return function (fetch, input, options) {
	    return fetch(input, options).then(function (response) {
	      response.debug = { input: input, options: options };
	      return response;
	    }, function () {
	      var error = arguments.length <= 0 || arguments[0] === undefined ? new Error() : arguments[0];

	      error.debug = { input: input, options: options };
	      throw error;
	    });
	  };
	};

	// Deprecated.
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
	var objectAssign = __webpack_require__(3);

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}

		return value;
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});

		return ret;
	};

	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};

		opts = objectAssign(defaults, opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/*
	 * Calculate the byte lengths for utf8 encoded strings.
	 *
	 * @param {String} str
	 * @return {Number}
	 */
	module.exports = function byteLength (str) {
	  var i, len;
	  if (!str) return 0;
	  str = str.toString();

	  for (i = len = str.length; i--;) {
	    var code = str[i].charCodeAt();
	    if (0xDC00 <= code && code <= 0xDFFF) i--;
	    if (0x7f < code && code <= 0x7ff) len++;
	    else if (0x7ff < code && code <= 0xffff) len += 2;
	  }

	  return len;
	};


/***/ }
/******/ ])
});
;