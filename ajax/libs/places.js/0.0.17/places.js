/*! places 0.0.17 | © Algolia | github.com/algolia/places */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["places"] = factory();
	else
		root["places"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _places = __webpack_require__(1);
	
	var _places2 = _interopRequireDefault(_places);
	
	var _version = __webpack_require__(126);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// must use module.exports to be commonJS compatible
	module.exports = _places2.default;
	module.exports.version = _version2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-console:0 */
	
	
	exports.default = places;
	
	var _events = __webpack_require__(2);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _algoliasearch = __webpack_require__(3);
	
	var _algoliasearch2 = _interopRequireDefault(_algoliasearch);
	
	var _autocomplete = __webpack_require__(95);
	
	var _autocomplete2 = _interopRequireDefault(_autocomplete);
	
	var _formatHit = __webpack_require__(112);
	
	var _formatHit2 = _interopRequireDefault(_formatHit);
	
	__webpack_require__(119);
	
	var _clear = __webpack_require__(123);
	
	var _clear2 = _interopRequireDefault(_clear);
	
	var _address = __webpack_require__(117);
	
	var _address2 = _interopRequireDefault(_address);
	
	var _algolia = __webpack_require__(124);
	
	var _algolia2 = _interopRequireDefault(_algolia);
	
	var _osm = __webpack_require__(125);
	
	var _osm2 = _interopRequireDefault(_osm);
	
	var _version = __webpack_require__(126);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var footerTemplate = '<div class="ap-footer">\nBuilt by <a href="https://www.algolia.com/?UTMFIXME" title="Search by Algolia" class="ap-footer-algolia">' + _algolia2.default.trim() + '</a>\nusing <a href="https://community.algolia.com/places/documentation.html#license" class="ap-footer-osm" title="Algolia Places data © OpenStreetMap contributors">' + _osm2.default.trim() + ' <span>data</span></a>\n</div>';
	
	var filterSuggestionData = function filterSuggestionData(suggestion) {
	  return _extends({}, suggestion, {
	    // omit _dropdownValue and _index,
	    // _dropdownValue is not needed user side
	    // _index is sent at the root of the element
	    _dropdownValue: undefined,
	    _index: undefined
	  });
	};
	
	function places(_ref) {
	  var countries = _ref.countries;
	  var _ref$language = _ref.language;
	  var language = _ref$language === undefined ? navigator.language.split('-')[0] : _ref$language;
	  var container = _ref.container;
	  var types = _ref.types;
	  var style = _ref.style;
	
	  var placesInstance = new _events2.default();
	  var client = _algoliasearch2.default.initPlaces('  ', '  ', { hosts: ['c3-test-1.algolia.net'] } // use staging for now, FIXME
	  );
	  client.as._computeRequestHeaders = function () {
	    return { targetIndexingIndexes: true }; // no need for any appid or key
	  };
	  client.as.setExtraHeader('targetIndexingIndexes', true);
	  client.as.addAlgoliaAgent += 'Algolia Places ' + _version2.default;
	
	  // https://github.com/algolia/autocomplete.js#options
	  var autocompleteOptions = {
	    autoselect: true,
	    hint: false,
	    cssClasses: {
	      root: 'algolia-places' + (style === false ? '' : ' algolia-places-styled'),
	      prefix: 'ap'
	    }
	  };
	
	  if (false) {
	    autocompleteOptions.debug = true;
	  }
	
	  var templates = {
	    suggestion: function suggestion(hit) {
	      return hit._dropdownValue;
	    },
	    footer: footerTemplate
	  };
	
	  var autocompleteInstance = (0, _autocomplete2.default)(container, autocompleteOptions, {
	    // https://github.com/algolia/autocomplete.js#sources
	    source: function source(query, cb) {
	      return client.search({ query: query, language: language, countries: countries, tagFilters: types, hitsPerPage: 5 }).then(function (_ref2) {
	        var hits = _ref2.hits;
	        return hits.map(_formatHit2.default);
	      }).then(function (suggestions) {
	        placesInstance.emit('suggestions', {
	          suggestions: suggestions.map(filterSuggestionData),
	          query: autocompleteInstance.val()
	        });
	        return suggestions;
	      }).then(cb).catch(function (err) {
	        return console.error(err);
	      });
	    },
	    templates: templates,
	    displayKey: 'value'
	  });
	
	  var autocompleteContainer = container.parentNode;
	
	  var autocompleteChangeEvents = ['selected', 'autocompleted'];
	  autocompleteChangeEvents.forEach(function (eventName) {
	    autocompleteInstance.on('autocomplete:' + eventName, function (_, suggestion) {
	      placesInstance.emit('change', {
	        suggestion: filterSuggestionData(suggestion),
	        query: autocompleteInstance.val(),
	        suggestionIndex: suggestion._index
	      });
	    });
	  });
	  autocompleteInstance.on('autocomplete:cursorchanged', function (_, suggestion) {
	    placesInstance.emit('cursorchanged', {
	      suggestion: filterSuggestionData(suggestion),
	      query: autocompleteInstance.val(),
	      suggestionIndex: suggestion._index
	    });
	  });
	
	  var clear = document.createElement('button');
	  clear.setAttribute('type', 'button');
	  clear.classList.add('ap-input-icon');
	  clear.innerHTML = _clear2.default;
	  autocompleteContainer.appendChild(clear);
	  clear.style.display = 'none';
	
	  var pin = document.createElement('button');
	  pin.setAttribute('type', 'button');
	  pin.classList.add('ap-input-icon');
	  pin.innerHTML = _address2.default;
	  autocompleteContainer.appendChild(pin);
	
	  pin.addEventListener('click', function () {
	    return autocompleteInstance.focus();
	  });
	  clear.addEventListener('click', function () {
	    autocompleteInstance.autocomplete.setVal('');
	    autocompleteInstance.focus();
	    clear.style.display = 'none';
	    pin.style.display = '';
	  });
	
	  var previousQuery = '';
	  autocompleteContainer.querySelector('.ap-input').addEventListener('input', function () {
	    var query = autocompleteInstance.val();
	    if (query === '') {
	      pin.style.display = '';
	      clear.style.display = 'none';
	      if (previousQuery !== query) {
	        placesInstance.emit('change', { query: query });
	      }
	    } else {
	      clear.style.display = '';
	      pin.style.display = 'none';
	    }
	    previousQuery = query;
	  });
	
	  return placesInstance;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

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
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This is the standalone browser build entry point
	// Browser implementation of the Algolia Search JavaScript client,
	// using XMLHttpRequest, XDomainRequest and JSONP as fallback
	module.exports = algoliasearch;
	
	var inherits = __webpack_require__(4);
	var Promise = window.Promise || __webpack_require__(5).Promise;
	
	var AlgoliaSearch = __webpack_require__(10);
	var errors = __webpack_require__(11);
	var inlineHeaders = __webpack_require__(86);
	var jsonpRequest = __webpack_require__(90);
	var places = __webpack_require__(91);
	
	if (({"NODE_ENV":"production"}).APP_ENV === 'development') {
	  __webpack_require__(39).enable('algoliasearch*');
	}
	
	function algoliasearch(applicationID, apiKey, opts) {
	  var cloneDeep = __webpack_require__(92);
	
	  var getDocumentProtocol = __webpack_require__(93);
	
	  opts = cloneDeep(opts || {});
	
	  if (opts.protocol === undefined) {
	    opts.protocol = getDocumentProtocol();
	  }
	
	  opts._ua = opts._ua || algoliasearch.ua;
	
	  return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
	}
	
	algoliasearch.version = __webpack_require__(94);
	algoliasearch.ua = 'Algolia for vanilla JavaScript ' + algoliasearch.version;
	algoliasearch.initPlaces = places(algoliasearch);
	
	// we expose into window no matter how we are used, this will allow
	// us to easily debug any website running algolia
	window.__algolia = {
	  debug: __webpack_require__(39),
	  algoliasearch: algoliasearch
	};
	
	var support = {
	  hasXMLHttpRequest: 'XMLHttpRequest' in window,
	  hasXDomainRequest: 'XDomainRequest' in window,
	  cors: 'withCredentials' in new XMLHttpRequest(),
	  timeout: 'timeout' in new XMLHttpRequest()
	};
	
	function AlgoliaSearchBrowser() {
	  // call AlgoliaSearch constructor
	  AlgoliaSearch.apply(this, arguments);
	}
	
	inherits(AlgoliaSearchBrowser, AlgoliaSearch);
	
	AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
	  return new Promise(function wrapRequest(resolve, reject) {
	    // no cors or XDomainRequest, no request
	    if (!support.cors && !support.hasXDomainRequest) {
	      // very old browser, not supported
	      reject(new errors.Network('CORS not supported'));
	      return;
	    }
	
	    url = inlineHeaders(url, opts.headers);
	
	    var body = opts.body;
	    var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
	    var ontimeout;
	    var timedOut;
	
	    // do not rely on default XHR async flag, as some analytics code like hotjar
	    // breaks it and set it to false by default
	    if (req instanceof XMLHttpRequest) {
	      req.open(opts.method, url, true);
	    } else {
	      req.open(opts.method, url);
	    }
	
	    if (support.cors) {
	      if (body) {
	        if (opts.method === 'POST') {
	          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
	          req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	        } else {
	          req.setRequestHeader('content-type', 'application/json');
	        }
	      }
	      req.setRequestHeader('accept', 'application/json');
	    }
	
	    // we set an empty onprogress listener
	    // so that XDomainRequest on IE9 is not aborted
	    // refs:
	    //  - https://github.com/algolia/algoliasearch-client-js/issues/76
	    //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
	    req.onprogress = function noop() {};
	
	    req.onload = load;
	    req.onerror = error;
	
	    if (support.timeout) {
	      // .timeout supported by both XHR and XDR,
	      // we do receive timeout event, tested
	      req.timeout = opts.timeout;
	
	      req.ontimeout = timeout;
	    } else {
	      ontimeout = setTimeout(timeout, opts.timeout);
	    }
	
	    req.send(body);
	
	    // event object not received in IE8, at least
	    // but we do not use it, still important to note
	    function load(/* event */) {
	      // When browser does not supports req.timeout, we can
	      // have both a load and timeout event, since handled by a dumb setTimeout
	      if (timedOut) {
	        return;
	      }
	
	      if (!support.timeout) {
	        clearTimeout(ontimeout);
	      }
	
	      var out;
	
	      try {
	        out = {
	          body: JSON.parse(req.responseText),
	          responseText: req.responseText,
	          statusCode: req.status,
	          // XDomainRequest does not have any response headers
	          headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
	        };
	      } catch (e) {
	        out = new errors.UnparsableJSON({
	          more: req.responseText
	        });
	      }
	
	      if (out instanceof errors.UnparsableJSON) {
	        reject(out);
	      } else {
	        resolve(out);
	      }
	    }
	
	    function error(event) {
	      if (timedOut) {
	        return;
	      }
	
	      if (!support.timeout) {
	        clearTimeout(ontimeout);
	      }
	
	      // error event is trigerred both with XDR/XHR on:
	      //   - DNS error
	      //   - unallowed cross domain request
	      reject(
	        new errors.Network({
	          more: event
	        })
	      );
	    }
	
	    function timeout() {
	      if (!support.timeout) {
	        timedOut = true;
	        req.abort();
	      }
	
	      reject(new errors.RequestTimeout());
	    }
	  });
	};
	
	AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
	  url = inlineHeaders(url, opts.headers);
	
	  return new Promise(function wrapJsonpRequest(resolve, reject) {
	    jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
	      if (err) {
	        reject(err);
	        return;
	      }
	
	      resolve(content);
	    });
	  });
	};
	
	AlgoliaSearchBrowser.prototype._promise = {
	  reject: function rejectPromise(val) {
	    return Promise.reject(val);
	  },
	  resolve: function resolvePromise(val) {
	    return Promise.resolve(val);
	  },
	  delay: function delayPromise(ms) {
	    return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
	      setTimeout(resolve, ms);
	    });
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(8);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	      var state = parent._state;
	
	      if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	        return this;
	      }
	
	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	      var result = parent._result;
	
	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }
	
	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	    var lib$es6$promise$promise$$counter = 0;
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (Array.isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._result = new Array(this.length);
	
	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, this._validationError());
	      }
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;
	
	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;
	
	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);
	
	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }
	
	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(9)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), (function() { return this; }()), __webpack_require__(7)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
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
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = AlgoliaSearch;
	
	var errors = __webpack_require__(11);
	var buildSearchMethod = __webpack_require__(38);
	
	// We will always put the API KEY in the JSON body in case of too long API KEY
	var MAX_API_KEY_LENGTH = 500;
	
	/*
	 * Algolia Search library initialization
	 * https://www.algolia.com/
	 *
	 * @param {string} applicationID - Your applicationID, found in your dashboard
	 * @param {string} apiKey - Your API key, found in your dashboard
	 * @param {Object} [opts]
	 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
	 * another request will be issued after this timeout
	 * @param {string} [opts.protocol='http:'] - The protocol used to query Algolia Search API.
	 *                                        Set to 'https:' to force using https.
	 *                                        Default to document.location.protocol in browsers
	 * @param {Object|Array} [opts.hosts={
	 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
	 *             this.applicationID + '-1.algolianet.com',
	 *             this.applicationID + '-2.algolianet.com',
	 *             this.applicationID + '-3.algolianet.com']
	 *           ]),
	 *           write: [this.applicationID + '.algolia.net'].concat([
	 *             this.applicationID + '-1.algolianet.com',
	 *             this.applicationID + '-2.algolianet.com',
	 *             this.applicationID + '-3.algolianet.com']
	 *           ]) - The hosts to use for Algolia Search API.
	 *           If you provide them, you will less benefit from our HA implementation
	 */
	function AlgoliaSearch(applicationID, apiKey, opts) {
	  var debug = __webpack_require__(39)('algoliasearch');
	
	  var clone = __webpack_require__(42);
	  var isArray = __webpack_require__(31);
	  var map = __webpack_require__(52);
	
	  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';
	
	  if (!applicationID) {
	    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
	  }
	
	  if (!apiKey) {
	    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
	  }
	
	  this.applicationID = applicationID;
	  this.apiKey = apiKey;
	
	  var defaultHosts = [
	    this.applicationID + '-1.algolianet.com',
	    this.applicationID + '-2.algolianet.com',
	    this.applicationID + '-3.algolianet.com'
	  ];
	  this.hosts = {
	    read: [],
	    write: []
	  };
	
	  this.hostIndex = {
	    read: 0,
	    write: 0
	  };
	
	  opts = opts || {};
	
	  var protocol = opts.protocol || 'https:';
	  var timeout = opts.timeout === undefined ? 2000 : opts.timeout;
	
	  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
	  // we also accept `http` and `https`. It's a common error.
	  if (!/:$/.test(protocol)) {
	    protocol = protocol + ':';
	  }
	
	  if (opts.protocol !== 'http:' && opts.protocol !== 'https:') {
	    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
	  }
	
	  // no hosts given, add defaults
	  if (!opts.hosts) {
	    this.hosts.read = [this.applicationID + '-dsn.algolia.net'].concat(defaultHosts);
	    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
	  } else if (isArray(opts.hosts)) {
	    this.hosts.read = clone(opts.hosts);
	    this.hosts.write = clone(opts.hosts);
	  } else {
	    this.hosts.read = clone(opts.hosts.read);
	    this.hosts.write = clone(opts.hosts.write);
	  }
	
	  // add protocol and lowercase hosts
	  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
	  this.hosts.write = map(this.hosts.write, prepareHost(protocol));
	  this.requestTimeout = timeout;
	
	  this.extraHeaders = [];
	
	  // In some situations you might want to warm the cache
	  this.cache = opts._cache || {};
	
	  this._ua = opts._ua;
	  this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
	  this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;
	
	  this._setTimeout = opts._setTimeout;
	
	  debug('init done, %j', this);
	}
	
	AlgoliaSearch.prototype = {
	  /*
	   * Delete an index
	   *
	   * @param indexName the name of index to delete
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  deleteIndex: function(indexName, callback) {
	    return this._jsonRequest({
	      method: 'DELETE',
	      url: '/1/indexes/' + encodeURIComponent(indexName),
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /**
	   * Move an existing index.
	   * @param srcIndexName the name of index to copy.
	   * @param dstIndexName the new index name that will contains a copy of
	   * srcIndexName (destination will be overriten if it already exist).
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  moveIndex: function(srcIndexName, dstIndexName, callback) {
	    var postObj = {
	      operation: 'move', destination: dstIndexName
	    };
	    return this._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /**
	   * Copy an existing index.
	   * @param srcIndexName the name of index to copy.
	   * @param dstIndexName the new index name that will contains a copy
	   * of srcIndexName (destination will be overriten if it already exist).
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  copyIndex: function(srcIndexName, dstIndexName, callback) {
	    var postObj = {
	      operation: 'copy', destination: dstIndexName
	    };
	    return this._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /**
	   * Return last log entries.
	   * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
	   * @param length Specify the maximum number of entries to retrieve starting
	   * at offset. Maximum allowed value: 1000.
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  getLogs: function(offset, length, callback) {
	    if (arguments.length === 0 || typeof offset === 'function') {
	      // getLogs([cb])
	      callback = offset;
	      offset = 0;
	      length = 10;
	    } else if (arguments.length === 1 || typeof length === 'function') {
	      // getLogs(1, [cb)]
	      callback = length;
	      length = 10;
	    }
	
	    return this._jsonRequest({
	      method: 'GET',
	      url: '/1/logs?offset=' + offset + '&length=' + length,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * List all existing indexes (paginated)
	   *
	   * @param page The page to retrieve, starting at 0.
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with index list
	   */
	  listIndexes: function(page, callback) {
	    var params = '';
	
	    if (page === undefined || typeof page === 'function') {
	      callback = page;
	    } else {
	      params = '?page=' + page;
	    }
	
	    return this._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes' + params,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	
	  /*
	   * Get the index object initialized
	   *
	   * @param indexName the name of index
	   * @param callback the result callback with one argument (the Index instance)
	   */
	  initIndex: function(indexName) {
	    return new this.Index(this, indexName);
	  },
	  /*
	   * List all existing user keys with their associated ACLs
	   *
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  listUserKeys: function(callback) {
	    return this._jsonRequest({
	      method: 'GET',
	      url: '/1/keys',
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Get ACL of a user key
	   *
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  getUserKeyACL: function(key, callback) {
	    return this._jsonRequest({
	      method: 'GET',
	      url: '/1/keys/' + key,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Delete an existing user key
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  deleteUserKey: function(key, callback) {
	    return this._jsonRequest({
	      method: 'DELETE',
	      url: '/1/keys/' + key,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Add a new global API key
	   *
	   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	   *   can contains the following values:
	   *     - search: allow to search (https and http)
	   *     - addObject: allows to add/update an object in the index (https only)
	   *     - deleteObject : allows to delete an existing object (https only)
	   *     - deleteIndex : allows to delete index content (https only)
	   *     - settings : allows to get index settings (https only)
	   *     - editSettings : allows to change index settings (https only)
	   * @param {Object} [params] - Optionnal parameters to set for the key
	   * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
	   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	   * @param {string[]} params.indexes - Allowed targeted indexes for this key
	   * @param {string} params.description - A description for your key
	   * @param {string[]} params.referers - A list of authorized referers
	   * @param {Object} params.queryParameters - Force the key to use specific query parameters
	   * @param {Function} callback - The result callback called with two arguments
	   *   error: null or Error('message')
	   *   content: the server answer with user keys list
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * client.addUserKey(['search'], {
	   *   validity: 300,
	   *   maxQueriesPerIPPerHour: 2000,
	   *   maxHitsPerQuery: 3,
	   *   indexes: ['fruits'],
	   *   description: 'Eat three fruits',
	   *   referers: ['*.algolia.com'],
	   *   queryParameters: {
	   *     tagFilters: ['public'],
	   *   }
	   * })
	   * @see {@link https://www.algolia.com/doc/rest_api#AddKey|Algolia REST API Documentation}
	   */
	  addUserKey: function(acls, params, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: client.addUserKey(arrayOfAcls[, params, callback])';
	
	    if (!isArray(acls)) {
	      throw new Error(usage);
	    }
	
	    if (arguments.length === 1 || typeof params === 'function') {
	      callback = params;
	      params = null;
	    }
	
	    var postObj = {
	      acl: acls
	    };
	
	    if (params) {
	      postObj.validity = params.validity;
	      postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	      postObj.maxHitsPerQuery = params.maxHitsPerQuery;
	      postObj.indexes = params.indexes;
	      postObj.description = params.description;
	
	      if (params.queryParameters) {
	        postObj.queryParameters = this._getSearchParams(params.queryParameters, '');
	      }
	
	      postObj.referers = params.referers;
	    }
	
	    return this._jsonRequest({
	      method: 'POST',
	      url: '/1/keys',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /**
	   * Add a new global API key
	   * @deprecated Please use client.addUserKey()
	   */
	  addUserKeyWithValidity: deprecate(function(acls, params, callback) {
	    return this.addUserKey(acls, params, callback);
	  }, deprecatedMessage('client.addUserKeyWithValidity()', 'client.addUserKey()')),
	
	  /**
	   * Update an existing API key
	   * @param {string} key - The key to update
	   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	   *   can contains the following values:
	   *     - search: allow to search (https and http)
	   *     - addObject: allows to add/update an object in the index (https only)
	   *     - deleteObject : allows to delete an existing object (https only)
	   *     - deleteIndex : allows to delete index content (https only)
	   *     - settings : allows to get index settings (https only)
	   *     - editSettings : allows to change index settings (https only)
	   * @param {Object} [params] - Optionnal parameters to set for the key
	   * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
	   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	   * @param {string[]} params.indexes - Allowed targeted indexes for this key
	   * @param {string} params.description - A description for your key
	   * @param {string[]} params.referers - A list of authorized referers
	   * @param {Object} params.queryParameters - Force the key to use specific query parameters
	   * @param {Function} callback - The result callback called with two arguments
	   *   error: null or Error('message')
	   *   content: the server answer with user keys list
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * client.updateUserKey('APIKEY', ['search'], {
	   *   validity: 300,
	   *   maxQueriesPerIPPerHour: 2000,
	   *   maxHitsPerQuery: 3,
	   *   indexes: ['fruits'],
	   *   description: 'Eat three fruits',
	   *   referers: ['*.algolia.com'],
	   *   queryParameters: {
	   *     tagFilters: ['public'],
	   *   }
	   * })
	   * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
	   */
	  updateUserKey: function(key, acls, params, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: client.updateUserKey(key, arrayOfAcls[, params, callback])';
	
	    if (!isArray(acls)) {
	      throw new Error(usage);
	    }
	
	    if (arguments.length === 2 || typeof params === 'function') {
	      callback = params;
	      params = null;
	    }
	
	    var putObj = {
	      acl: acls
	    };
	
	    if (params) {
	      putObj.validity = params.validity;
	      putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	      putObj.maxHitsPerQuery = params.maxHitsPerQuery;
	      putObj.indexes = params.indexes;
	      putObj.description = params.description;
	
	      if (params.queryParameters) {
	        putObj.queryParameters = this._getSearchParams(params.queryParameters, '');
	      }
	
	      putObj.referers = params.referers;
	    }
	
	    return this._jsonRequest({
	      method: 'PUT',
	      url: '/1/keys/' + key,
	      body: putObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	
	  /**
	   * Set the extra security tagFilters header
	   * @param {string|array} tags The list of tags defining the current security filters
	   */
	  setSecurityTags: function(tags) {
	    if (Object.prototype.toString.call(tags) === '[object Array]') {
	      var strTags = [];
	      for (var i = 0; i < tags.length; ++i) {
	        if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
	          var oredTags = [];
	          for (var j = 0; j < tags[i].length; ++j) {
	            oredTags.push(tags[i][j]);
	          }
	          strTags.push('(' + oredTags.join(',') + ')');
	        } else {
	          strTags.push(tags[i]);
	        }
	      }
	      tags = strTags.join(',');
	    }
	
	    this.securityTags = tags;
	  },
	
	  /**
	   * Set the extra user token header
	   * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
	   */
	  setUserToken: function(userToken) {
	    this.userToken = userToken;
	  },
	
	  /**
	   * Initialize a new batch of search queries
	   * @deprecated use client.search()
	   */
	  startQueriesBatch: deprecate(function startQueriesBatchDeprecated() {
	    this._batch = [];
	  }, deprecatedMessage('client.startQueriesBatch()', 'client.search()')),
	
	  /**
	   * Add a search query in the batch
	   * @deprecated use client.search()
	   */
	  addQueryInBatch: deprecate(function addQueryInBatchDeprecated(indexName, query, args) {
	    this._batch.push({
	      indexName: indexName,
	      query: query,
	      params: args
	    });
	  }, deprecatedMessage('client.addQueryInBatch()', 'client.search()')),
	
	  /**
	   * Clear all queries in client's cache
	   * @return undefined
	   */
	  clearCache: function() {
	    this.cache = {};
	  },
	
	  /**
	   * Launch the batch of queries using XMLHttpRequest.
	   * @deprecated use client.search()
	   */
	  sendQueriesBatch: deprecate(function sendQueriesBatchDeprecated(callback) {
	    return this.search(this._batch, callback);
	  }, deprecatedMessage('client.sendQueriesBatch()', 'client.search()')),
	
	  /**
	  * Set the number of milliseconds a request can take before automatically being terminated.
	  *
	  * @param {Number} milliseconds
	  */
	  setRequestTimeout: function(milliseconds) {
	    if (milliseconds) {
	      this.requestTimeout = parseInt(milliseconds, 10);
	    }
	  },
	
	  /**
	   * Search through multiple indices at the same time
	   * @param  {Object[]}   queries  An array of queries you want to run.
	   * @param {string} queries[].indexName The index name you want to target
	   * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
	   * @param {Object} queries[].params Any search param like hitsPerPage, ..
	   * @param  {Function} callback Callback to be called
	   * @return {Promise|undefined} Returns a promise if no callback given
	   */
	  search: function(queries, callback) {
	    var isArray = __webpack_require__(31);
	    var map = __webpack_require__(52);
	
	    var usage = 'Usage: client.search(arrayOfQueries[, callback])';
	
	    if (!isArray(queries)) {
	      throw new Error(usage);
	    }
	
	    var client = this;
	
	    var postObj = {
	      requests: map(queries, function prepareRequest(query) {
	        var params = '';
	
	        // allow query.query
	        // so we are mimicing the index.search(query, params) method
	        // {indexName:, query:, params:}
	        if (query.query !== undefined) {
	          params += 'query=' + encodeURIComponent(query.query);
	        }
	
	        return {
	          indexName: query.indexName,
	          params: client._getSearchParams(query.params, params)
	        };
	      })
	    };
	
	    var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
	      return requestId + '=' +
	        encodeURIComponent(
	          '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
	          request.params
	        );
	    }).join('&');
	
	    return this._jsonRequest({
	      cache: this.cache,
	      method: 'POST',
	      url: '/1/indexes/*/queries',
	      body: postObj,
	      hostType: 'read',
	      fallback: {
	        method: 'GET',
	        url: '/1/indexes/*',
	        body: {
	          params: JSONPParams
	        }
	      },
	      callback: callback
	    });
	  },
	
	  /**
	   * Perform write operations accross multiple indexes.
	   *
	   * To reduce the amount of time spent on network round trips,
	   * you can create, update, or delete several objects in one call,
	   * using the batch endpoint (all operations are done in the given order).
	   *
	   * Available actions:
	   *   - addObject
	   *   - updateObject
	   *   - partialUpdateObject
	   *   - partialUpdateObjectNoCreate
	   *   - deleteObject
	   *
	   * https://www.algolia.com/doc/rest_api#Indexes
	   * @param  {Object[]} operations An array of operations to perform
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * client.batch([{
	   *   action: 'addObject',
	   *   indexName: 'clients',
	   *   body: {
	   *     name: 'Bill'
	   *   }
	   * }, {
	   *   action: 'udpateObject',
	   *   indexName: 'fruits',
	   *   body: {
	   *     objectID: '29138',
	   *     name: 'banana'
	   *   }
	   * }], cb)
	   */
	  batch: function(operations, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: client.batch(operations[, callback])';
	
	    if (!isArray(operations)) {
	      throw new Error(usage);
	    }
	
	    return this._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/*/batch',
	      body: {
	        requests: operations
	      },
	      hostType: 'write',
	      callback: callback
	    });
	  },
	
	  // environment specific methods
	  destroy: notImplemented,
	  enableRateLimitForward: notImplemented,
	  disableRateLimitForward: notImplemented,
	  useSecuredAPIKey: notImplemented,
	  disableSecuredAPIKey: notImplemented,
	  generateSecuredApiKey: notImplemented,
	  /*
	   * Index class constructor.
	   * You should not use this method directly but use initIndex() function
	   */
	  Index: function(algoliasearch, indexName) {
	    this.indexName = indexName;
	    this.as = algoliasearch;
	    this.typeAheadArgs = null;
	    this.typeAheadValueOption = null;
	
	    // make sure every index instance has it's own cache
	    this.cache = {};
	  },
	  /**
	  * Add an extra field to the HTTP request
	  *
	  * @param name the header field name
	  * @param value the header field value
	  */
	  setExtraHeader: function(name, value) {
	    this.extraHeaders.push({
	      name: name.toLowerCase(), value: value
	    });
	  },
	
	  /**
	  * Augment sent x-algolia-agent with more data, each agent part
	  * is automatically separated from the others by a semicolon;
	  *
	  * @param algoliaAgent the agent to add
	  */
	  addAlgoliaAgent: function(algoliaAgent) {
	    this._ua += ';' + algoliaAgent;
	  },
	
	  /*
	   * Wrapper that try all hosts to maximize the quality of service
	   */
	  _jsonRequest: function(initialOpts) {
	    var requestDebug = __webpack_require__(39)('algoliasearch:' + initialOpts.url);
	
	    var body;
	    var cache = initialOpts.cache;
	    var client = this;
	    var tries = 0;
	    var usingFallback = false;
	    var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
	    var headers;
	
	    if (this.apiKey.length > MAX_API_KEY_LENGTH && initialOpts.body !== undefined && initialOpts.body.params !== undefined) {
	      initialOpts.body.apiKey = this.apiKey;
	      headers = this._computeRequestHeaders(false);
	    } else {
	      headers = this._computeRequestHeaders();
	    }
	
	    if (initialOpts.body !== undefined) {
	      body = safeJSONStringify(initialOpts.body);
	    }
	
	    requestDebug('request start');
	
	    function doRequest(requester, reqOpts) {
	      var cacheID;
	
	      if (client._useCache) {
	        cacheID = initialOpts.url;
	      }
	
	      // as we sometime use POST requests to pass parameters (like query='aa'),
	      // the cacheID must also include the body to be different between calls
	      if (client._useCache && body) {
	        cacheID += '_body_' + reqOpts.body;
	      }
	
	      // handle cache existence
	      if (client._useCache && cache && cache[cacheID] !== undefined) {
	        requestDebug('serving response from cache');
	        return client._promise.resolve(JSON.parse(cache[cacheID]));
	      }
	
	      // if we reached max tries
	      if (tries >= client.hosts[initialOpts.hostType].length) {
	        if (!hasFallback || usingFallback) {
	          requestDebug('could not get any response');
	          // then stop
	          return client._promise.reject(new errors.AlgoliaSearchError(
	            'Cannot connect to the AlgoliaSearch API.' +
	            ' Send an email to support@algolia.com to report and resolve the issue.' +
	            ' Application id was: ' + client.applicationID
	          ));
	        }
	
	        requestDebug('switching to fallback');
	
	        // let's try the fallback starting from here
	        tries = 0;
	
	        // method, url and body are fallback dependent
	        reqOpts.method = initialOpts.fallback.method;
	        reqOpts.url = initialOpts.fallback.url;
	        reqOpts.jsonBody = initialOpts.fallback.body;
	        if (reqOpts.jsonBody) {
	          reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
	        }
	        // re-compute headers, they could be omitting the API KEY
	        headers = client._computeRequestHeaders();
	
	        reqOpts.timeout = client.requestTimeout * (tries + 1);
	        client.hostIndex[initialOpts.hostType] = 0;
	        usingFallback = true; // the current request is now using fallback
	        return doRequest(client._request.fallback, reqOpts);
	      }
	
	      var url = client.hosts[initialOpts.hostType][client.hostIndex[initialOpts.hostType]] + reqOpts.url;
	      var options = {
	        body: reqOpts.body,
	        jsonBody: reqOpts.jsonBody,
	        method: reqOpts.method,
	        headers: headers,
	        timeout: reqOpts.timeout,
	        debug: requestDebug
	      };
	
	      requestDebug('method: %s, url: %s, headers: %j, timeout: %d',
	        options.method, url, options.headers, options.timeout);
	
	      if (requester === client._request.fallback) {
	        requestDebug('using fallback');
	      }
	
	      // `requester` is any of this._request or this._request.fallback
	      // thus it needs to be called using the client as context
	      return requester.call(client, url, options).then(success, tryFallback);
	
	      function success(httpResponse) {
	        // compute the status of the response,
	        //
	        // When in browser mode, using XDR or JSONP, we have no statusCode available
	        // So we rely on our API response `status` property.
	        // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
	        // So we check if there's a `message` along `status` and it means it's an error
	        //
	        // That's the only case where we have a response.status that's not the http statusCode
	        var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||
	
	          // this is important to check the request statusCode AFTER the body eventual
	          // statusCode because some implementations (jQuery XDomainRequest transport) may
	          // send statusCode 200 while we had an error
	          httpResponse.statusCode ||
	
	          // When in browser mode, using XDR or JSONP
	          // we default to success when no error (no response.status && response.message)
	          // If there was a JSON.parse() error then body is null and it fails
	          httpResponse && httpResponse.body && 200;
	
	        requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
	          httpResponse.statusCode, status, httpResponse.headers);
	
	        var ok = status === 200 || status === 201;
	        var retry = !ok && Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 1;
	
	        if (client._useCache && ok && cache) {
	          cache[cacheID] = httpResponse.responseText;
	        }
	
	        if (ok) {
	          return httpResponse.body;
	        }
	
	        if (retry) {
	          tries += 1;
	          return retryRequest();
	        }
	
	        var unrecoverableError = new errors.AlgoliaSearchError(
	          httpResponse.body && httpResponse.body.message
	        );
	
	        return client._promise.reject(unrecoverableError);
	      }
	
	      function tryFallback(err) {
	        // error cases:
	        //  While not in fallback mode:
	        //    - CORS not supported
	        //    - network error
	        //  While in fallback mode:
	        //    - timeout
	        //    - network error
	        //    - badly formatted JSONP (script loaded, did not call our callback)
	        //  In both cases:
	        //    - uncaught exception occurs (TypeError)
	        requestDebug('error: %s, stack: %s', err.message, err.stack);
	
	        if (!(err instanceof errors.AlgoliaSearchError)) {
	          err = new errors.Unknown(err && err.message, err);
	        }
	
	        tries += 1;
	
	        // stop the request implementation when:
	        if (
	          // we did not generate this error,
	          // it comes from a throw in some other piece of code
	          err instanceof errors.Unknown ||
	
	          // server sent unparsable JSON
	          err instanceof errors.UnparsableJSON ||
	
	          // max tries and already using fallback or no fallback
	          tries >= client.hosts[initialOpts.hostType].length &&
	          (usingFallback || !hasFallback)) {
	          // stop request implementation for this command
	          return client._promise.reject(err);
	        }
	
	        client.hostIndex[initialOpts.hostType] = ++client.hostIndex[initialOpts.hostType] % client.hosts[initialOpts.hostType].length;
	
	        if (err instanceof errors.RequestTimeout) {
	          return retryRequest();
	        } else if (!usingFallback) {
	          // next request loop, force using fallback for this request
	          tries = Infinity;
	        }
	
	        return doRequest(requester, reqOpts);
	      }
	
	      function retryRequest() {
	        client.hostIndex[initialOpts.hostType] = ++client.hostIndex[initialOpts.hostType] % client.hosts[initialOpts.hostType].length;
	        reqOpts.timeout = client.requestTimeout * (tries + 1);
	        return doRequest(requester, reqOpts);
	      }
	    }
	
	    var promise = doRequest(
	      client._request, {
	        url: initialOpts.url,
	        method: initialOpts.method,
	        body: body,
	        jsonBody: initialOpts.body,
	        timeout: client.requestTimeout * (tries + 1)
	      }
	    );
	
	    // either we have a callback
	    // either we are using promises
	    if (initialOpts.callback) {
	      promise.then(function okCb(content) {
	        exitPromise(function() {
	          initialOpts.callback(null, content);
	        }, client._setTimeout || setTimeout);
	      }, function nookCb(err) {
	        exitPromise(function() {
	          initialOpts.callback(err);
	        }, client._setTimeout || setTimeout);
	      });
	    } else {
	      return promise;
	    }
	  },
	
	  /*
	  * Transform search param object in query string
	  */
	  _getSearchParams: function(args, params) {
	    if (args === undefined || args === null) {
	      return params;
	    }
	    for (var key in args) {
	      if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
	        params += params === '' ? '' : '&';
	        params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
	      }
	    }
	    return params;
	  },
	
	  _computeRequestHeaders: function(withAPIKey) {
	    var forEach = __webpack_require__(12);
	
	    var requestHeaders = {
	      'x-algolia-agent': this._ua,
	      'x-algolia-application-id': this.applicationID
	    };
	
	    // browser will inline headers in the url, node.js will use http headers
	    // but in some situations, the API KEY will be too long (big secured API keys)
	    // so if the request is a POST and the KEY is very long, we will be asked to not put
	    // it into headers but in the JSON body
	    if (withAPIKey !== false) {
	      requestHeaders['x-algolia-api-key'] = this.apiKey;
	    }
	
	    if (this.userToken) {
	      requestHeaders['x-algolia-usertoken'] = this.userToken;
	    }
	
	    if (this.securityTags) {
	      requestHeaders['x-algolia-tagfilters'] = this.securityTags;
	    }
	
	    if (this.extraHeaders) {
	      forEach(this.extraHeaders, function addToRequestHeaders(header) {
	        requestHeaders[header.name] = header.value;
	      });
	    }
	
	    return requestHeaders;
	  }
	};
	
	/*
	 * Contains all the functions related to one index
	 * You should use AlgoliaSearch.initIndex(indexName) to retrieve this object
	 */
	AlgoliaSearch.prototype.Index.prototype = {
	  /*
	   * Clear all queries in cache
	   */
	  clearCache: function() {
	    this.cache = {};
	  },
	  /*
	   * Add an object in this index
	   *
	   * @param content contains the javascript object to add inside the index
	   * @param objectID (optional) an objectID you want to attribute to this object
	   * (if the attribute already exist the old object will be overwrite)
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
	   */
	  addObject: function(content, objectID, callback) {
	    var indexObj = this;
	
	    if (arguments.length === 1 || typeof objectID === 'function') {
	      callback = objectID;
	      objectID = undefined;
	    }
	
	    return this.as._jsonRequest({
	      method: objectID !== undefined ?
	        'PUT' : // update or create
	        'POST', // create (API generates an objectID)
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + // create
	        (objectID !== undefined ? '/' + encodeURIComponent(objectID) : ''), // update or create
	      body: content,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Add several objects
	   *
	   * @param objects contains an array of objects to add
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  addObjects: function(objects, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: index.addObjects(arrayOfObjects[, callback])';
	
	    if (!isArray(objects)) {
	      throw new Error(usage);
	    }
	
	    var indexObj = this;
	    var postObj = {
	      requests: []
	    };
	    for (var i = 0; i < objects.length; ++i) {
	      var request = {
	        action: 'addObject',
	        body: objects[i]
	      };
	      postObj.requests.push(request);
	    }
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Get an object from this index
	   *
	   * @param objectID the unique identifier of the object to retrieve
	   * @param attrs (optional) if set, contains the array of attribute names to retrieve
	   * @param callback (optional) the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the object to retrieve or the error message if a failure occured
	   */
	  getObject: function(objectID, attrs, callback) {
	    var indexObj = this;
	
	    if (arguments.length === 1 || typeof attrs === 'function') {
	      callback = attrs;
	      attrs = undefined;
	    }
	
	    var params = '';
	    if (attrs !== undefined) {
	      params = '?attributes=';
	      for (var i = 0; i < attrs.length; ++i) {
	        if (i !== 0) {
	          params += ',';
	        }
	        params += attrs[i];
	      }
	    }
	
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	
	  /*
	   * Get several objects from this index
	   *
	   * @param objectIDs the array of unique identifier of objects to retrieve
	   */
	  getObjects: function(objectIDs, attributesToRetrieve, callback) {
	    var isArray = __webpack_require__(31);
	    var map = __webpack_require__(52);
	
	    var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';
	
	    if (!isArray(objectIDs)) {
	      throw new Error(usage);
	    }
	
	    var indexObj = this;
	
	    if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
	      callback = attributesToRetrieve;
	      attributesToRetrieve = undefined;
	    }
	
	    var body = {
	      requests: map(objectIDs, function prepareRequest(objectID) {
	        var request = {
	          indexName: indexObj.indexName,
	          objectID: objectID
	        };
	
	        if (attributesToRetrieve) {
	          request.attributesToRetrieve = attributesToRetrieve.join(',');
	        }
	
	        return request;
	      })
	    };
	
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/*/objects',
	      hostType: 'read',
	      body: body,
	      callback: callback
	    });
	  },
	
	  /*
	   * Update partially an object (only update attributes passed in argument)
	   *
	   * @param partialObject contains the javascript attributes to override, the
	   *  object must contains an objectID attribute
	   * @param createIfNotExists (optional) if false, avoid an automatic creation of the object
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
	   */
	  partialUpdateObject: function(partialObject, createIfNotExists, callback) {
	    if (arguments.length === 1 || typeof createIfNotExists === 'function') {
	      callback = createIfNotExists;
	      createIfNotExists = undefined;
	    }
	
	    var indexObj = this;
	    var url = '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial';
	    if (createIfNotExists === false) {
	      url += '?createIfNotExists=false';
	    }
	
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: url,
	      body: partialObject,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Partially Override the content of several objects
	   *
	   * @param objects contains an array of objects to update (each object must contains a objectID attribute)
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  partialUpdateObjects: function(objects, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: index.partialUpdateObjects(arrayOfObjects[, callback])';
	
	    if (!isArray(objects)) {
	      throw new Error(usage);
	    }
	
	    var indexObj = this;
	    var postObj = {
	      requests: []
	    };
	    for (var i = 0; i < objects.length; ++i) {
	      var request = {
	        action: 'partialUpdateObject',
	        objectID: objects[i].objectID,
	        body: objects[i]
	      };
	      postObj.requests.push(request);
	    }
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Override the content of object
	   *
	   * @param object contains the javascript object to save, the object must contains an objectID attribute
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  saveObject: function(object, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'PUT',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
	      body: object,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Override the content of several objects
	   *
	   * @param objects contains an array of objects to update (each object must contains a objectID attribute)
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  saveObjects: function(objects, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: index.saveObjects(arrayOfObjects[, callback])';
	
	    if (!isArray(objects)) {
	      throw new Error(usage);
	    }
	
	    var indexObj = this;
	    var postObj = {
	      requests: []
	    };
	    for (var i = 0; i < objects.length; ++i) {
	      var request = {
	        action: 'updateObject',
	        objectID: objects[i].objectID,
	        body: objects[i]
	      };
	      postObj.requests.push(request);
	    }
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Delete an object from the index
	   *
	   * @param objectID the unique identifier of object to delete
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
	   */
	  deleteObject: function(objectID, callback) {
	    if (typeof objectID === 'function' || typeof objectID !== 'string' && typeof objectID !== 'number') {
	      var err = new errors.AlgoliaSearchError('Cannot delete an object without an objectID');
	      callback = objectID;
	      if (typeof callback === 'function') {
	        return callback(err);
	      }
	
	      return this.as._promise.reject(err);
	    }
	
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'DELETE',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Delete several objects from an index
	   *
	   * @param objectIDs contains an array of objectID to delete
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
	   */
	  deleteObjects: function(objectIDs, callback) {
	    var isArray = __webpack_require__(31);
	    var map = __webpack_require__(52);
	
	    var usage = 'Usage: index.deleteObjects(arrayOfObjectIDs[, callback])';
	
	    if (!isArray(objectIDs)) {
	      throw new Error(usage);
	    }
	
	    var indexObj = this;
	    var postObj = {
	      requests: map(objectIDs, function prepareRequest(objectID) {
	        return {
	          action: 'deleteObject',
	          objectID: objectID,
	          body: {
	            objectID: objectID
	          }
	        };
	      })
	    };
	
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Delete all objects matching a query
	   *
	   * @param query the query string
	   * @param params the optional query parameters
	   * @param callback (optional) the result callback called with one argument
	   *  error: null or Error('message')
	   */
	  deleteByQuery: function(query, params, callback) {
	    var clone = __webpack_require__(42);
	    var map = __webpack_require__(52);
	
	    var indexObj = this;
	    var client = indexObj.as;
	
	    if (arguments.length === 1 || typeof params === 'function') {
	      callback = params;
	      params = {};
	    } else {
	      params = clone(params);
	    }
	
	    params.attributesToRetrieve = 'objectID';
	    params.hitsPerPage = 1000;
	    params.distinct = false;
	
	    // when deleting, we should never use cache to get the
	    // search results
	    this.clearCache();
	
	    // there's a problem in how we use the promise chain,
	    // see how waitTask is done
	    var promise = this
	      .search(query, params)
	      .then(stopOrDelete);
	
	    function stopOrDelete(searchContent) {
	      // stop here
	      if (searchContent.nbHits === 0) {
	        // return indexObj.as._request.resolve();
	        return searchContent;
	      }
	
	      // continue and do a recursive call
	      var objectIDs = map(searchContent.hits, function getObjectID(object) {
	        return object.objectID;
	      });
	
	      return indexObj
	        .deleteObjects(objectIDs)
	        .then(waitTask)
	        .then(doDeleteByQuery);
	    }
	
	    function waitTask(deleteObjectsContent) {
	      return indexObj.waitTask(deleteObjectsContent.taskID);
	    }
	
	    function doDeleteByQuery() {
	      return indexObj.deleteByQuery(query, params);
	    }
	
	    if (!callback) {
	      return promise;
	    }
	
	    promise.then(success, failure);
	
	    function success() {
	      exitPromise(function exit() {
	        callback(null);
	      }, client._setTimeout || setTimeout);
	    }
	
	    function failure(err) {
	      exitPromise(function exit() {
	        callback(err);
	      }, client._setTimeout || setTimeout);
	    }
	  },
	
	  /*
	   * Search inside the index using XMLHttpRequest request (Using a POST query to
	   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
	   *
	   * @param query the full text query
	   * @param args (optional) if set, contains an object with query parameters:
	   * - page: (integer) Pagination parameter used to select the page to retrieve.
	   *                   Page is zero-based and defaults to 0. Thus,
	   *                   to retrieve the 10th page you need to set page=9
	   * - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
	   * - attributesToRetrieve: a string that contains the list of object attributes
	   * you want to retrieve (let you minimize the answer size).
	   *   Attributes are separated with a comma (for example "name,address").
	   *   You can also use an array (for example ["name","address"]).
	   *   By default, all attributes are retrieved. You can also use '*' to retrieve all
	   *   values when an attributesToRetrieve setting is specified for your index.
	   * - attributesToHighlight: a string that contains the list of attributes you
	   *   want to highlight according to the query.
	   *   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
	   *   If an attribute has no match for the query, the raw value is returned.
	   *   By default all indexed text attributes are highlighted.
	   *   You can use `*` if you want to highlight all textual attributes.
	   *   Numerical attributes are not highlighted.
	   *   A matchLevel is returned for each highlighted attribute and can contain:
	   *      - full: if all the query terms were found in the attribute,
	   *      - partial: if only some of the query terms were found,
	   *      - none: if none of the query terms were found.
	   * - attributesToSnippet: a string that contains the list of attributes to snippet alongside
	   * the number of words to return (syntax is `attributeName:nbWords`).
	   *    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
	   *    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
	   *    By default no snippet is computed.
	   * - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
	   * Defaults to 3.
	   * - minWordSizefor2Typos: the minimum number of characters in a query word
	   * to accept two typos in this word. Defaults to 7.
	   * - getRankingInfo: if set to 1, the result hits will contain ranking
	   * information in _rankingInfo attribute.
	   * - aroundLatLng: search for entries around a given
	   * latitude/longitude (specified as two floats separated by a comma).
	   *   For example aroundLatLng=47.316669,5.016670).
	   *   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
	   *   and the precision for ranking with aroundPrecision
	   *   (for example if you set aroundPrecision=100, two objects that are distant of
	   *   less than 100m will be considered as identical for "geo" ranking parameter).
	   *   At indexing, you should specify geoloc of an object with the _geoloc attribute
	   *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
	   * - insideBoundingBox: search entries inside a given area defined by the two extreme points
	   * of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
	   *   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
	   *   At indexing, you should specify geoloc of an object with the _geoloc attribute
	   *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
	   * - numericFilters: a string that contains the list of numeric filters you want to
	   * apply separated by a comma.
	   *   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
	   *   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
	   *   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
	   *   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
	   * - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
	   *   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
	   *   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
	   *   means tag1 AND (tag2 OR tag3).
	   *   At indexing, tags should be added in the _tags** attribute
	   *   of objects (for example {"_tags":["tag1","tag2"]}).
	   * - facetFilters: filter the query by a list of facets.
	   *   Facets are separated by commas and each facet is encoded as `attributeName:value`.
	   *   For example: `facetFilters=category:Book,author:John%20Doe`.
	   *   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
	   * - facets: List of object attributes that you want to use for faceting.
	   *   Comma separated list: `"category,author"` or array `['category','author']`
	   *   Only attributes that have been added in **attributesForFaceting** index setting
	   *   can be used in this parameter.
	   *   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
	   * - queryType: select how the query words are interpreted, it can be one of the following value:
	   *    - prefixAll: all query words are interpreted as prefixes,
	   *    - prefixLast: only the last word is interpreted as a prefix (default behavior),
	   *    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
	   * - optionalWords: a string that contains the list of words that should
	   * be considered as optional when found in the query.
	   *   Comma separated and array are accepted.
	   * - distinct: If set to 1, enable the distinct feature (disabled by default)
	   * if the attributeForDistinct index setting is set.
	   *   This feature is similar to the SQL "distinct" keyword: when enabled
	   *   in a query with the distinct=1 parameter,
	   *   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
	   *   For example, if the chosen attribute is show_name and several hits have
	   *   the same value for show_name, then only the best
	   *   one is kept and others are removed.
	   * - restrictSearchableAttributes: List of attributes you want to use for
	   * textual search (must be a subset of the attributesToIndex index setting)
	   * either comma separated or as an array
	   * @param callback the result callback called with two arguments:
	   *  error: null or Error('message'). If false, the content contains the error.
	   *  content: the server answer that contains the list of results.
	   */
	  search: buildSearchMethod('query'),
	
	  /*
	   * -- BETA --
	   * Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
	   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
	   *
	   * @param query the similar query
	   * @param args (optional) if set, contains an object with query parameters.
	   *   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
	   *   are the two most useful to restrict the similar results and get more relevant content
	   */
	  similarSearch: buildSearchMethod('similarQuery'),
	
	  /*
	   * Browse index content. The response content will have a `cursor` property that you can use
	   * to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
	   *
	   * @param {string} query - The full text query
	   * @param {Object} [queryParameters] - Any search query parameter
	   * @param {Function} [callback] - The result callback called with two arguments
	   *   error: null or Error('message')
	   *   content: the server answer with the browse result
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * index.browse('cool songs', {
	   *   tagFilters: 'public,comments',
	   *   hitsPerPage: 500
	   * }, callback);
	   * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
	   */
	  // pre 3.5.0 usage, backward compatible
	  // browse: function(page, hitsPerPage, callback) {
	  browse: function(query, queryParameters, callback) {
	    var merge = __webpack_require__(77);
	
	    var indexObj = this;
	
	    var page;
	    var hitsPerPage;
	
	    // we check variadic calls that are not the one defined
	    // .browse()/.browse(fn)
	    // => page = 0
	    if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
	      page = 0;
	      callback = arguments[0];
	      query = undefined;
	    } else if (typeof arguments[0] === 'number') {
	      // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
	      page = arguments[0];
	      if (typeof arguments[1] === 'number') {
	        hitsPerPage = arguments[1];
	      } else if (typeof arguments[1] === 'function') {
	        callback = arguments[1];
	        hitsPerPage = undefined;
	      }
	      query = undefined;
	      queryParameters = undefined;
	    } else if (typeof arguments[0] === 'object') {
	      // .browse(queryParameters)/.browse(queryParameters, cb)
	      if (typeof arguments[1] === 'function') {
	        callback = arguments[1];
	      }
	      queryParameters = arguments[0];
	      query = undefined;
	    } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
	      // .browse(query, cb)
	      callback = arguments[1];
	      queryParameters = undefined;
	    }
	
	    // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)
	
	    // get search query parameters combining various possible calls
	    // to .browse();
	    queryParameters = merge({}, queryParameters || {}, {
	      page: page,
	      hitsPerPage: hitsPerPage,
	      query: query
	    });
	
	    var params = this.as._getSearchParams(queryParameters, '');
	
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse?' + params,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	
	  /*
	   * Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
	   *
	   * @param {string} query - The full text query
	   * @param {Object} [queryParameters] - Any search query parameter
	   * @param {Function} [callback] - The result callback called with two arguments
	   *   error: null or Error('message')
	   *   content: the server answer with the browse result
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * index.browseFrom('14lkfsakl32', callback);
	   * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
	   */
	  browseFrom: function(cursor, callback) {
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse?cursor=' + encodeURIComponent(cursor),
	      hostType: 'read',
	      callback: callback
	    });
	  },
	
	  /*
	   * Browse all content from an index using events. Basically this will do
	   * .browse() -> .browseFrom -> .browseFrom -> .. until all the results are returned
	   *
	   * @param {string} query - The full text query
	   * @param {Object} [queryParameters] - Any search query parameter
	   * @return {EventEmitter}
	   * @example
	   * var browser = index.browseAll('cool songs', {
	   *   tagFilters: 'public,comments',
	   *   hitsPerPage: 500
	   * });
	   *
	   * browser.on('result', function resultCallback(content) {
	   *   console.log(content.hits);
	   * });
	   *
	   * // if any error occurs, you get it
	   * browser.on('error', function(err) {
	   *   throw err;
	   * });
	   *
	   * // when you have browsed the whole index, you get this event
	   * browser.on('end', function() {
	   *   console.log('finished');
	   * });
	   *
	   * // at any point if you want to stop the browsing process, you can stop it manually
	   * // otherwise it will go on and on
	   * browser.stop();
	   *
	   * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
	   */
	  browseAll: function(query, queryParameters) {
	    if (typeof query === 'object') {
	      queryParameters = query;
	      query = undefined;
	    }
	
	    var merge = __webpack_require__(77);
	
	    var IndexBrowser = __webpack_require__(85);
	
	    var browser = new IndexBrowser();
	    var client = this.as;
	    var index = this;
	    var params = client._getSearchParams(
	      merge({}, queryParameters || {}, {
	        query: query
	      }), ''
	    );
	
	    // start browsing
	    browseLoop();
	
	    function browseLoop(cursor) {
	      if (browser._stopped) {
	        return;
	      }
	
	      var queryString;
	
	      if (cursor !== undefined) {
	        queryString = 'cursor=' + encodeURIComponent(cursor);
	      } else {
	        queryString = params;
	      }
	
	      client._jsonRequest({
	        method: 'GET',
	        url: '/1/indexes/' + encodeURIComponent(index.indexName) + '/browse?' + queryString,
	        hostType: 'read',
	        callback: browseCallback
	      });
	    }
	
	    function browseCallback(err, content) {
	      if (browser._stopped) {
	        return;
	      }
	
	      if (err) {
	        browser._error(err);
	        return;
	      }
	
	      browser._result(content);
	
	      // no cursor means we are finished browsing
	      if (content.cursor === undefined) {
	        browser._end();
	        return;
	      }
	
	      browseLoop(content.cursor);
	    }
	
	    return browser;
	  },
	
	  /*
	   * Get a Typeahead.js adapter
	   * @param searchParams contains an object with query parameters (see search for details)
	   */
	  ttAdapter: function(params) {
	    var self = this;
	    return function ttAdapter(query, syncCb, asyncCb) {
	      var cb;
	
	      if (typeof asyncCb === 'function') {
	        // typeahead 0.11
	        cb = asyncCb;
	      } else {
	        // pre typeahead 0.11
	        cb = syncCb;
	      }
	
	      self.search(query, params, function searchDone(err, content) {
	        if (err) {
	          cb(err);
	          return;
	        }
	
	        cb(content.hits);
	      });
	    };
	  },
	
	  /*
	   * Wait the publication of a task on the server.
	   * All server task are asynchronous and you can check with this method that the task is published.
	   *
	   * @param taskID the id of the task returned by server
	   * @param callback the result callback with with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains the list of results
	   */
	  waitTask: function(taskID, callback) {
	    // wait minimum 100ms before retrying
	    var baseDelay = 100;
	    // wait maximum 5s before retrying
	    var maxDelay = 5000;
	    var loop = 0;
	
	    // waitTask() must be handled differently from other methods,
	    // it's a recursive method using a timeout
	    var indexObj = this;
	    var client = indexObj.as;
	
	    var promise = retryLoop();
	
	    function retryLoop() {
	      return client._jsonRequest({
	        method: 'GET',
	        hostType: 'read',
	        url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/task/' + taskID
	      }).then(function success(content) {
	        loop++;
	        var delay = baseDelay * loop * loop;
	        if (delay > maxDelay) {
	          delay = maxDelay;
	        }
	
	        if (content.status !== 'published') {
	          return client._promise.delay(delay).then(retryLoop);
	        }
	
	        return content;
	      });
	    }
	
	    if (!callback) {
	      return promise;
	    }
	
	    promise.then(successCb, failureCb);
	
	    function successCb(content) {
	      exitPromise(function exit() {
	        callback(null, content);
	      }, client._setTimeout || setTimeout);
	    }
	
	    function failureCb(err) {
	      exitPromise(function exit() {
	        callback(err);
	      }, client._setTimeout || setTimeout);
	    }
	  },
	
	  /*
	   * This function deletes the index content. Settings and index specific API keys are kept untouched.
	   *
	   * @param callback (optional) the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the settings object or the error message if a failure occured
	   */
	  clearIndex: function(callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/clear',
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Get settings of this index
	   *
	   * @param callback (optional) the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the settings object or the error message if a failure occured
	   */
	  getSettings: function(callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
	      hostType: 'read',
	      callback: callback
	    });
	  },
	
	  /*
	   * Set settings for this index
	   *
	   * @param settigns the settings object that can contains :
	   * - minWordSizefor1Typo: (integer) the minimum number of characters to accept one typo (default = 3).
	   * - minWordSizefor2Typos: (integer) the minimum number of characters to accept two typos (default = 7).
	   * - hitsPerPage: (integer) the number of hits per page (default = 10).
	   * - attributesToRetrieve: (array of strings) default list of attributes to retrieve in objects.
	   *   If set to null, all attributes are retrieved.
	   * - attributesToHighlight: (array of strings) default list of attributes to highlight.
	   *   If set to null, all indexed attributes are highlighted.
	   * - attributesToSnippet**: (array of strings) default list of attributes to snippet alongside the number
	   * of words to return (syntax is attributeName:nbWords).
	   *   By default no snippet is computed. If set to null, no snippet is computed.
	   * - attributesToIndex: (array of strings) the list of fields you want to index.
	   *   If set to null, all textual and numerical attributes of your objects are indexed,
	   *   but you should update it to get optimal results.
	   *   This parameter has two important uses:
	   *     - Limit the attributes to index: For example if you store a binary image in base64,
	   *     you want to store it and be able to
	   *       retrieve it but you don't want to search in the base64 string.
	   *     - Control part of the ranking*: (see the ranking parameter for full explanation)
	   *     Matches in attributes at the beginning of
	   *       the list will be considered more important than matches in attributes further down the list.
	   *       In one attribute, matching text at the beginning of the attribute will be
	   *       considered more important than text after, you can disable
	   *       this behavior if you add your attribute inside `unordered(AttributeName)`,
	   *       for example attributesToIndex: ["title", "unordered(text)"].
	   * - attributesForFaceting: (array of strings) The list of fields you want to use for faceting.
	   *   All strings in the attribute selected for faceting are extracted and added as a facet.
	   *   If set to null, no attribute is used for faceting.
	   * - attributeForDistinct: (string) The attribute name used for the Distinct feature.
	   * This feature is similar to the SQL "distinct" keyword: when enabled
	   *   in query with the distinct=1 parameter, all hits containing a duplicate
	   *   value for this attribute are removed from results.
	   *   For example, if the chosen attribute is show_name and several hits have
	   *   the same value for show_name, then only the best one is kept and others are removed.
	   * - ranking: (array of strings) controls the way results are sorted.
	   *   We have six available criteria:
	   *    - typo: sort according to number of typos,
	   *    - geo: sort according to decreassing distance when performing a geo-location based search,
	   *    - proximity: sort according to the proximity of query words in hits,
	   *    - attribute: sort according to the order of attributes defined by attributesToIndex,
	   *    - exact:
	   *        - if the user query contains one word: sort objects having an attribute
	   *        that is exactly the query word before others.
	   *          For example if you search for the "V" TV show, you want to find it
	   *          with the "V" query and avoid to have all popular TV
	   *          show starting by the v letter before it.
	   *        - if the user query contains multiple words: sort according to the
	   *        number of words that matched exactly (and not as a prefix).
	   *    - custom: sort according to a user defined formula set in **customRanking** attribute.
	   *   The standard order is ["typo", "geo", "proximity", "attribute", "exact", "custom"]
	   * - customRanking: (array of strings) lets you specify part of the ranking.
	   *   The syntax of this condition is an array of strings containing attributes
	   *   prefixed by asc (ascending order) or desc (descending order) operator.
	   *   For example `"customRanking" => ["desc(population)", "asc(name)"]`
	   * - queryType: Select how the query words are interpreted, it can be one of the following value:
	   *   - prefixAll: all query words are interpreted as prefixes,
	   *   - prefixLast: only the last word is interpreted as a prefix (default behavior),
	   *   - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
	   * - highlightPreTag: (string) Specify the string that is inserted before
	   * the highlighted parts in the query result (default to "<em>").
	   * - highlightPostTag: (string) Specify the string that is inserted after
	   * the highlighted parts in the query result (default to "</em>").
	   * - optionalWords: (array of strings) Specify a list of words that should
	   * be considered as optional when found in the query.
	   * @param callback (optional) the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer or the error message if a failure occured
	   */
	  setSettings: function(settings, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'PUT',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
	      hostType: 'write',
	      body: settings,
	      callback: callback
	    });
	  },
	  /*
	   * List all existing user keys associated to this index
	   *
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  listUserKeys: function(callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Get ACL of a user key associated to this index
	   *
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  getUserKeyACL: function(key, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Delete an existing user key associated to this index
	   *
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  deleteUserKey: function(key, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'DELETE',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Add a new API key to this index
	   *
	   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	   *   can contains the following values:
	   *     - search: allow to search (https and http)
	   *     - addObject: allows to add/update an object in the index (https only)
	   *     - deleteObject : allows to delete an existing object (https only)
	   *     - deleteIndex : allows to delete index content (https only)
	   *     - settings : allows to get index settings (https only)
	   *     - editSettings : allows to change index settings (https only)
	   * @param {Object} [params] - Optionnal parameters to set for the key
	   * @param {number} params.validity - Number of seconds after which the key will
	   * be automatically removed (0 means no time limit for this key)
	   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	   * @param {string} params.description - A description for your key
	   * @param {string[]} params.referers - A list of authorized referers
	   * @param {Object} params.queryParameters - Force the key to use specific query parameters
	   * @param {Function} callback - The result callback called with two arguments
	   *   error: null or Error('message')
	   *   content: the server answer with user keys list
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * index.addUserKey(['search'], {
	   *   validity: 300,
	   *   maxQueriesPerIPPerHour: 2000,
	   *   maxHitsPerQuery: 3,
	   *   description: 'Eat three fruits',
	   *   referers: ['*.algolia.com'],
	   *   queryParameters: {
	   *     tagFilters: ['public'],
	   *   }
	   * })
	   * @see {@link https://www.algolia.com/doc/rest_api#AddIndexKey|Algolia REST API Documentation}
	   */
	  addUserKey: function(acls, params, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: index.addUserKey(arrayOfAcls[, params, callback])';
	
	    if (!isArray(acls)) {
	      throw new Error(usage);
	    }
	
	    if (arguments.length === 1 || typeof params === 'function') {
	      callback = params;
	      params = null;
	    }
	
	    var postObj = {
	      acl: acls
	    };
	
	    if (params) {
	      postObj.validity = params.validity;
	      postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	      postObj.maxHitsPerQuery = params.maxHitsPerQuery;
	      postObj.description = params.description;
	
	      if (params.queryParameters) {
	        postObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
	      }
	
	      postObj.referers = params.referers;
	    }
	
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	
	  /**
	   * Add an existing user key associated to this index
	   * @deprecated use index.addUserKey()
	   */
	  addUserKeyWithValidity: deprecate(function deprecatedAddUserKeyWithValidity(acls, params, callback) {
	    return this.addUserKey(acls, params, callback);
	  }, deprecatedMessage('index.addUserKeyWithValidity()', 'index.addUserKey()')),
	
	  /**
	   * Update an existing API key of this index
	   * @param {string} key - The key to update
	   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	   *   can contains the following values:
	   *     - search: allow to search (https and http)
	   *     - addObject: allows to add/update an object in the index (https only)
	   *     - deleteObject : allows to delete an existing object (https only)
	   *     - deleteIndex : allows to delete index content (https only)
	   *     - settings : allows to get index settings (https only)
	   *     - editSettings : allows to change index settings (https only)
	   * @param {Object} [params] - Optionnal parameters to set for the key
	   * @param {number} params.validity - Number of seconds after which the key will
	   * be automatically removed (0 means no time limit for this key)
	   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	   * @param {string} params.description - A description for your key
	   * @param {string[]} params.referers - A list of authorized referers
	   * @param {Object} params.queryParameters - Force the key to use specific query parameters
	   * @param {Function} callback - The result callback called with two arguments
	   *   error: null or Error('message')
	   *   content: the server answer with user keys list
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * index.updateUserKey('APIKEY', ['search'], {
	   *   validity: 300,
	   *   maxQueriesPerIPPerHour: 2000,
	   *   maxHitsPerQuery: 3,
	   *   description: 'Eat three fruits',
	   *   referers: ['*.algolia.com'],
	   *   queryParameters: {
	   *     tagFilters: ['public'],
	   *   }
	   * })
	   * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
	   */
	  updateUserKey: function(key, acls, params, callback) {
	    var isArray = __webpack_require__(31);
	    var usage = 'Usage: index.updateUserKey(key, arrayOfAcls[, params, callback])';
	
	    if (!isArray(acls)) {
	      throw new Error(usage);
	    }
	
	    if (arguments.length === 2 || typeof params === 'function') {
	      callback = params;
	      params = null;
	    }
	
	    var putObj = {
	      acl: acls
	    };
	
	    if (params) {
	      putObj.validity = params.validity;
	      putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	      putObj.maxHitsPerQuery = params.maxHitsPerQuery;
	      putObj.description = params.description;
	
	      if (params.queryParameters) {
	        putObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
	      }
	
	      putObj.referers = params.referers;
	    }
	
	    return this.as._jsonRequest({
	      method: 'PUT',
	      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys/' + key,
	      body: putObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	
	  _search: function(params, url, callback) {
	    return this.as._jsonRequest({
	      cache: this.cache,
	      method: 'POST',
	      url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
	      body: {params: params},
	      hostType: 'read',
	      fallback: {
	        method: 'GET',
	        url: '/1/indexes/' + encodeURIComponent(this.indexName),
	        body: {params: params}
	      },
	      callback: callback
	    });
	  },
	
	  as: null,
	  indexName: null,
	  typeAheadArgs: null,
	  typeAheadValueOption: null
	};
	
	function prepareHost(protocol) {
	  return function prepare(host) {
	    return protocol + '//' + host.toLowerCase();
	  };
	}
	
	function notImplemented() {
	  var message = 'Not implemented in this environment.\n' +
	    'If you feel this is a mistake, write to support@algolia.com';
	
	  throw new errors.AlgoliaSearchError(message);
	}
	
	function deprecatedMessage(previousUsage, newUsage) {
	  var githubAnchorLink = previousUsage.toLowerCase()
	    .replace('.', '')
	    .replace('()', '');
	
	  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
	    '`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#' + githubAnchorLink;
	}
	
	// Parse cloud does not supports setTimeout
	// We do not store a setTimeout reference in the client everytime
	// We only fallback to a fake setTimeout when not available
	// setTimeout cannot be override globally sadly
	function exitPromise(fn, _setTimeout) {
	  _setTimeout(fn, 0);
	}
	
	function deprecate(fn, message) {
	  var warned = false;
	
	  function deprecated() {
	    if (!warned) {
	      /* eslint no-console:0 */
	      console.log(message);
	      warned = true;
	    }
	
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	}
	
	// Prototype.js < 1.7, a widely used library, defines a weird
	// Array.prototype.toJSON function that will fail to stringify our content
	// appropriately
	// refs:
	//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
	//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
	//   - http://stackoverflow.com/a/3148441/147079
	function safeJSONStringify(obj) {
	  /* eslint no-extend-native:0 */
	
	  if (Array.prototype.toJSON === undefined) {
	    return JSON.stringify(obj);
	  }
	
	  var toJSON = Array.prototype.toJSON;
	  delete Array.prototype.toJSON;
	  var out = JSON.stringify(obj);
	  Array.prototype.toJSON = toJSON;
	
	  return out;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This file hosts our error definitions
	// We use custom error "types" so that we can act on them when we need it
	// e.g.: if error instanceof errors.UnparsableJSON then..
	
	var inherits = __webpack_require__(4);
	
	function AlgoliaSearchError(message, extraProperties) {
	  var forEach = __webpack_require__(12);
	
	  var error = this;
	
	  // try to get a stacktrace
	  if (typeof Error.captureStackTrace === 'function') {
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
	  }
	
	  this.name = this.constructor.name;
	  this.message = message || 'Unknown error';
	
	  if (extraProperties) {
	    forEach(extraProperties, function addToErrorObject(value, key) {
	      error[key] = value;
	    });
	  }
	}
	
	inherits(AlgoliaSearchError, Error);
	
	function createCustomError(name, message) {
	  function AlgoliaSearchCustomError() {
	    var args = Array.prototype.slice.call(arguments, 0);
	
	    // custom message not set, use default
	    if (typeof args[0] !== 'string') {
	      args.unshift(message);
	    }
	
	    AlgoliaSearchError.apply(this, args);
	    this.name = 'AlgoliaSearch' + name + 'Error';
	  }
	
	  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);
	
	  return AlgoliaSearchCustomError;
	}
	
	// late exports to let various fn defs and inherits take place
	module.exports = {
	  AlgoliaSearchError: AlgoliaSearchError,
	  UnparsableJSON: createCustomError(
	    'UnparsableJSON',
	    'Could not parse the incoming response as JSON, see err.more for details'
	  ),
	  RequestTimeout: createCustomError(
	    'RequestTimeout',
	    'Request timedout before getting a response'
	  ),
	  Network: createCustomError(
	    'Network',
	    'Network issue, see err.more for details'
	  ),
	  JSONPScriptFail: createCustomError(
	    'JSONPScriptFail',
	    '<script> was loaded but did not call our provided callback'
	  ),
	  JSONPScriptError: createCustomError(
	    'JSONPScriptError',
	    '<script> unable to load due to an `error` event on it'
	  ),
	  Unknown: createCustomError(
	    'Unknown',
	    'Unknown error occured'
	  )
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(13),
	    baseEach = __webpack_require__(14),
	    createForEach = __webpack_require__(35);
	
	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);
	
	module.exports = forEach;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(15),
	    createBaseEach = __webpack_require__(34);
	
	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(16),
	    keys = __webpack_require__(20);
	
	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(17);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(18);
	
	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;
	
	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	module.exports = toObject;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21),
	    isArrayLike = __webpack_require__(25),
	    isObject = __webpack_require__(19),
	    shimKeys = __webpack_require__(29);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	module.exports = keys;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(22);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(23),
	    isObjectLike = __webpack_require__(24);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(26),
	    isLength = __webpack_require__(28);
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(27);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(31),
	    isIndex = __webpack_require__(32),
	    isLength = __webpack_require__(28),
	    keysIn = __webpack_require__(33);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = shimKeys;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(25),
	    isObjectLike = __webpack_require__(24);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21),
	    isLength = __webpack_require__(28),
	    isObjectLike = __webpack_require__(24);
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	module.exports = isArray;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(31),
	    isIndex = __webpack_require__(32),
	    isLength = __webpack_require__(28),
	    isObject = __webpack_require__(19);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(26),
	    isLength = __webpack_require__(28),
	    toObject = __webpack_require__(18);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(36),
	    isArray = __webpack_require__(31);
	
	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}
	
	module.exports = createForEach;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(37);
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	module.exports = bindCallback;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = buildSearchMethod;
	
	var errors = __webpack_require__(11);
	
	function buildSearchMethod(queryParam, url) {
	  return function search(query, args, callback) {
	    // warn V2 users on how to search
	    if (typeof query === 'function' && typeof args === 'object' ||
	      typeof callback === 'object') {
	      // .search(query, params, cb)
	      // .search(cb, params)
	      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
	    }
	
	    if (arguments.length === 0 || typeof query === 'function') {
	      // .search(), .search(cb)
	      callback = query;
	      query = '';
	    } else if (arguments.length === 1 || typeof args === 'function') {
	      // .search(query/args), .search(query, cb)
	      callback = args;
	      args = undefined;
	    }
	
	    // .search(args), careful: typeof null === 'object'
	    if (typeof query === 'object' && query !== null) {
	      args = query;
	      query = undefined;
	    } else if (query === undefined || query === null) { // .search(undefined/null)
	      query = '';
	    }
	
	    var params = '';
	
	    if (query !== undefined) {
	      params += queryParam + '=' + encodeURIComponent(query);
	    }
	
	    if (args !== undefined) {
	      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
	      params = this.as._getSearchParams(args, params);
	    }
	
	    return this._search(params, url, callback);
	  };
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(40);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(41);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  // long, short were "future reserved words in js", YUI compressor fail on them
	  // https://github.com/algolia/algoliasearch-client-js/issues/113#issuecomment-111978606
	  // https://github.com/yui/yuicompressor/issues/47
	  // https://github.com/rauchg/ms.js/pull/40
	  return options['long']
	    ? _long(val)
	    : _short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function _short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function _long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(43),
	    bindCallback = __webpack_require__(36),
	    isIterateeCall = __webpack_require__(51);
	
	/**
	 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	 * otherwise they are assigned by reference. If `customizer` is provided it's
	 * invoked to produce the cloned values. If `customizer` returns `undefined`
	 * cloning is handled by the method instead. The `customizer` is bound to
	 * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var shallow = _.clone(users);
	 * shallow[0] === users[0];
	 * // => true
	 *
	 * var deep = _.clone(users, true);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.clone(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(false);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 0
	 */
	function clone(value, isDeep, customizer, thisArg) {
	  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
	    isDeep = false;
	  }
	  else if (typeof isDeep == 'function') {
	    thisArg = customizer;
	    customizer = isDeep;
	    isDeep = false;
	  }
	  return typeof customizer == 'function'
	    ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3))
	    : baseClone(value, isDeep);
	}
	
	module.exports = clone;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(44),
	    arrayEach = __webpack_require__(13),
	    baseAssign = __webpack_require__(45),
	    baseForOwn = __webpack_require__(15),
	    initCloneArray = __webpack_require__(47),
	    initCloneByTag = __webpack_require__(48),
	    initCloneObject = __webpack_require__(50),
	    isArray = __webpack_require__(31),
	    isObject = __webpack_require__(19);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[stringTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[mapTag] = cloneableTags[setTag] =
	cloneableTags[weakMapTag] = false;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;
	
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);
	
	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);
	
	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}
	
	module.exports = baseClone;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = arrayCopy;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(46),
	    keys = __webpack_require__(20);
	
	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}
	
	module.exports = baseCopy;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);
	
	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	module.exports = initCloneArray;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var bufferClone = __webpack_require__(49);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}
	
	module.exports = initCloneByTag;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Native method references. */
	var ArrayBuffer = global.ArrayBuffer,
	    Uint8Array = global.Uint8Array;
	
	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  var result = new ArrayBuffer(buffer.byteLength),
	      view = new Uint8Array(result);
	
	  view.set(new Uint8Array(buffer));
	  return result;
	}
	
	module.exports = bufferClone;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor;
	}
	
	module.exports = initCloneObject;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(25),
	    isIndex = __webpack_require__(32),
	    isObject = __webpack_require__(19);
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(53),
	    baseCallback = __webpack_require__(54),
	    baseMap = __webpack_require__(76),
	    isArray = __webpack_require__(31);
	
	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	 * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	 * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	 * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	 * `sum`, `uniq`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @alias collect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function timesThree(n) {
	 *   return n * 3;
	 * }
	 *
	 * _.map([1, 2], timesThree);
	 * // => [3, 6]
	 *
	 * _.map({ 'a': 1, 'b': 2 }, timesThree);
	 * // => [3, 6] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // using the `_.property` callback shorthand
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee, thisArg) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  iteratee = baseCallback(iteratee, thisArg, 3);
	  return func(collection, iteratee);
	}
	
	module.exports = map;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(55),
	    baseMatchesProperty = __webpack_require__(67),
	    bindCallback = __webpack_require__(36),
	    identity = __webpack_require__(37),
	    property = __webpack_require__(74);
	
	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}
	
	module.exports = baseCallback;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(56),
	    getMatchData = __webpack_require__(64),
	    toObject = __webpack_require__(18);
	
	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];
	
	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(57),
	    toObject = __webpack_require__(18);
	
	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(58),
	    isObject = __webpack_require__(19),
	    isObjectLike = __webpack_require__(24);
	
	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(59),
	    equalByTag = __webpack_require__(61),
	    equalObjects = __webpack_require__(62),
	    isArray = __webpack_require__(31),
	    isTypedArray = __webpack_require__(63);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);
	
	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);
	
	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
	
	  stackA.pop();
	  stackB.pop();
	
	  return result;
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(60);
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
	
	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = equalArrays;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(20);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;
	
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = equalObjects;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(28),
	    isObjectLike = __webpack_require__(24);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(65),
	    pairs = __webpack_require__(66);
	
	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;
	
	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(20),
	    toObject = __webpack_require__(18);
	
	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);
	
	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);
	
	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}
	
	module.exports = pairs;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(68),
	    baseIsEqual = __webpack_require__(57),
	    baseSlice = __webpack_require__(69),
	    isArray = __webpack_require__(31),
	    isKey = __webpack_require__(70),
	    isStrictComparable = __webpack_require__(65),
	    last = __webpack_require__(71),
	    toObject = __webpack_require__(18),
	    toPath = __webpack_require__(72);
	
	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');
	
	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(18);
	
	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.exports = baseSlice;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(31),
	    toObject = __webpack_require__(18);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}
	
	module.exports = isKey;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}
	
	module.exports = last;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(73),
	    isArray = __webpack_require__(31);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.exports = toPath;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}
	
	module.exports = baseToString;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(27),
	    basePropertyDeep = __webpack_require__(75),
	    isKey = __webpack_require__(70);
	
	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(68),
	    toPath = __webpack_require__(72);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(14),
	    isArrayLike = __webpack_require__(25);
	
	/**
	 * The base implementation of `_.map` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];
	
	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}
	
	module.exports = baseMap;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(78),
	    createAssigner = __webpack_require__(83);
	
	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);
	
	module.exports = merge;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(13),
	    baseMergeDeep = __webpack_require__(79),
	    isArray = __webpack_require__(31),
	    isArrayLike = __webpack_require__(25),
	    isObject = __webpack_require__(19),
	    isObjectLike = __webpack_require__(24),
	    isTypedArray = __webpack_require__(63),
	    keys = __webpack_require__(20);
	
	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);
	
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;
	
	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}
	
	module.exports = baseMerge;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(44),
	    isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(31),
	    isArrayLike = __webpack_require__(25),
	    isPlainObject = __webpack_require__(80),
	    isTypedArray = __webpack_require__(63),
	    toPlainObject = __webpack_require__(82);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];
	
	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;
	
	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(81),
	    isArguments = __webpack_require__(30),
	    isObjectLike = __webpack_require__(24);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;
	
	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(16),
	    keysIn = __webpack_require__(33);
	
	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}
	
	module.exports = baseForIn;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(46),
	    keysIn = __webpack_require__(33);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(36),
	    isIterateeCall = __webpack_require__(51),
	    restParam = __webpack_require__(84);
	
	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;
	
	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This is the object returned by the `index.browseAll()` method
	
	module.exports = IndexBrowser;
	
	var inherits = __webpack_require__(4);
	var EventEmitter = __webpack_require__(2).EventEmitter;
	
	function IndexBrowser() {
	}
	
	inherits(IndexBrowser, EventEmitter);
	
	IndexBrowser.prototype.stop = function() {
	  this._stopped = true;
	  this._clean();
	};
	
	IndexBrowser.prototype._end = function() {
	  this.emit('end');
	  this._clean();
	};
	
	IndexBrowser.prototype._error = function(err) {
	  this.emit('error', err);
	  this._clean();
	};
	
	IndexBrowser.prototype._result = function(content) {
	  this.emit('result', content);
	};
	
	IndexBrowser.prototype._clean = function() {
	  this.removeAllListeners('stop');
	  this.removeAllListeners('end');
	  this.removeAllListeners('error');
	  this.removeAllListeners('result');
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = inlineHeaders;
	
	var querystring = __webpack_require__(87);
	
	function inlineHeaders(url, headers) {
	  if (/\?/.test(url)) {
	    url += '&';
	  } else {
	    url += '?';
	  }
	
	  return url + querystring.encode(headers);
	}


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(88);
	exports.encode = exports.stringify = __webpack_require__(89);


/***/ },
/* 88 */
/***/ function(module, exports) {

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
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
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
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
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
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 89 */
/***/ function(module, exports) {

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
	
	var stringifyPrimitive = function(v) {
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
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = jsonpRequest;
	
	var errors = __webpack_require__(11);
	
	var JSONPCounter = 0;
	
	function jsonpRequest(url, opts, cb) {
	  if (opts.method !== 'GET') {
	    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
	    return;
	  }
	
	  opts.debug('JSONP: start');
	
	  var cbCalled = false;
	  var timedOut = false;
	
	  JSONPCounter += 1;
	  var head = document.getElementsByTagName('head')[0];
	  var script = document.createElement('script');
	  var cbName = 'algoliaJSONP_' + JSONPCounter;
	  var done = false;
	
	  window[cbName] = function(data) {
	    try {
	      delete window[cbName];
	    } catch (e) {
	      window[cbName] = undefined;
	    }
	
	    if (timedOut) {
	      return;
	    }
	
	    cbCalled = true;
	
	    clean();
	
	    cb(null, {
	      body: data/* ,
	      // We do not send the statusCode, there's no statusCode in JSONP, it will be
	      // computed using data.status && data.message like with XDR
	      statusCode*/
	    });
	  };
	
	  // add callback by hand
	  url += '&callback=' + cbName;
	
	  // add body params manually
	  if (opts.jsonBody && opts.jsonBody.params) {
	    url += '&' + opts.jsonBody.params;
	  }
	
	  var ontimeout = setTimeout(timeout, opts.timeout);
	
	  // script onreadystatechange needed only for
	  // <= IE8
	  // https://github.com/angular/angular.js/issues/4523
	  script.onreadystatechange = readystatechange;
	  script.onload = success;
	  script.onerror = error;
	
	  script.async = true;
	  script.defer = true;
	  script.src = url;
	  head.appendChild(script);
	
	  function success() {
	    opts.debug('JSONP: success');
	
	    if (done || timedOut) {
	      return;
	    }
	
	    done = true;
	
	    // script loaded but did not call the fn => script loading error
	    if (!cbCalled) {
	      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
	      clean();
	      cb(new errors.JSONPScriptFail());
	    }
	  }
	
	  function readystatechange() {
	    if (this.readyState === 'loaded' || this.readyState === 'complete') {
	      success();
	    }
	  }
	
	  function clean() {
	    clearTimeout(ontimeout);
	    script.onload = null;
	    script.onreadystatechange = null;
	    script.onerror = null;
	    head.removeChild(script);
	
	    try {
	      delete window[cbName];
	      delete window[cbName + '_loaded'];
	    } catch (e) {
	      window[cbName] = null;
	      window[cbName + '_loaded'] = null;
	    }
	  }
	
	  function timeout() {
	    opts.debug('JSONP: Script timeout');
	
	    timedOut = true;
	    clean();
	    cb(new errors.RequestTimeout());
	  }
	
	  function error() {
	    opts.debug('JSONP: Script error');
	
	    if (done || timedOut) {
	      return;
	    }
	
	    clean();
	    cb(new errors.JSONPScriptError());
	  }
	}


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = createPlacesClient;
	
	var buildSearchMethod = __webpack_require__(38);
	
	function createPlacesClient(algoliasearch) {
	  return function places(appID, apiKey, opts) {
	    var cloneDeep = __webpack_require__(92);
	
	    opts = opts && cloneDeep(opts) || {};
	    opts.hosts = opts.hosts || [
	      'places-dsn.algolia.net',
	      'places-1.algolianet.com',
	      'places-2.algolianet.com',
	      'places-3.algolianet.com'
	    ];
	
	    var client = algoliasearch(appID, apiKey, opts);
	    var index = client.initIndex('places');
	    index.search = buildSearchMethod('query', '/1/places/query');
	    return index;
	  };
	}


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(43),
	    bindCallback = __webpack_require__(36);
	
	/**
	 * Creates a deep clone of `value`. If `customizer` is provided it's invoked
	 * to produce the cloned values. If `customizer` returns `undefined` cloning
	 * is handled by the method instead. The `customizer` is bound to `thisArg`
	 * and invoked with up to three argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var deep = _.cloneDeep(users);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.cloneDeep(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(true);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 20
	 */
	function cloneDeep(value, customizer, thisArg) {
	  return typeof customizer == 'function'
	    ? baseClone(value, true, bindCallback(customizer, thisArg, 3))
	    : baseClone(value, true);
	}
	
	module.exports = cloneDeep;


/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = getDocumentProtocol;
	
	function getDocumentProtocol() {
	  var protocol = window.document.location.protocol;
	
	  // when in `file:` mode (local html file), default to `http:`
	  if (protocol !== 'http:' && protocol !== 'https:') {
	    protocol = 'http:';
	  }
	
	  return protocol;
	}


/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = '3.13.1';


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(96);


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var current$ = window.$;
	__webpack_require__(97);
	var zepto = window.Zepto;
	window.$ = current$; // restore the `$` (we don't want Zepto here)
	
	// setup DOM element
	var DOM = __webpack_require__(98);
	DOM.element = zepto;
	
	// setup utils functions
	var _ = __webpack_require__(99);
	_.isArray = zepto.isArray;
	_.isFunction = zepto.isFunction;
	_.isObject = zepto.isPlainObject;
	_.bind = zepto.proxy;
	_.each = function(collection, cb) {
	  // stupid argument order for jQuery.each
	  zepto.each(collection, reverseArgs);
	  function reverseArgs(index, value) {
	    return cb(value, index);
	  }
	};
	_.map = zepto.map;
	_.mixin = zepto.extend;
	
	var typeaheadKey = 'aaAutocomplete';
	var Typeahead = __webpack_require__(100);
	var EventBus = __webpack_require__(101);
	
	function autocomplete(selector, options, datasets, typeaheadObject) {
	  datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 2);
	
	  var inputs = zepto(selector).each(function(i, input) {
	    var $input = zepto(input);
	    var eventBus = new EventBus({el: $input});
	    var typeahead = typeaheadObject || new Typeahead({
	      input: $input,
	      eventBus: eventBus,
	      dropdownMenuContainer: options.dropdownMenuContainer,
	      hint: options.hint === undefined ? true : !!options.hint,
	      minLength: options.minLength,
	      autoselect: options.autoselect,
	      openOnFocus: options.openOnFocus,
	      templates: options.templates,
	      debug: options.debug,
	      cssClasses: options.cssClasses,
	      datasets: datasets
	    });
	
	    $input.data(typeaheadKey, typeahead);
	  });
	
	  // expose all methods in the `autocomplete` attribute
	  inputs.autocomplete = {};
	  _.each(['open', 'close', 'getVal', 'setVal', 'destroy'], function(method) {
	    inputs.autocomplete[method] = function() {
	      var methodArguments = arguments;
	      inputs.each(function(j, input) {
	        var typeahead = zepto(input).data(typeaheadKey);
	        typeahead[method].apply(typeahead, methodArguments);
	      });
	    };
	  });
	
	  return inputs;
	}
	
	autocomplete.sources = Typeahead.sources;
	
	module.exports = autocomplete;


/***/ },
/* 97 */
/***/ function(module, exports) {

	/*! Zepto 1.1.6 (generated with Zepto Builder) - zepto event assets data ie - zeptojs.com/license */
	//     Zepto.js
	//     (c) 2010-2016 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.
	
	var Zepto = (function() {
	  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
	    document = window.document,
	    elementDisplay = {}, classCache = {},
	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    rootNodeRE = /^(?:body|html)$/i,
	    capitalRE = /([A-Z])/g,
	
	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
	
	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	    table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    readyRE = /complete|loaded|interactive/,
	    simpleSelectorRE = /^[\w-]*$/,
	    class2type = {},
	    toString = class2type.toString,
	    zepto = {},
	    camelize, uniq,
	    tempParent = document.createElement('div'),
	    propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	    isArray = Array.isArray ||
	      function(object){ return object instanceof Array }
	
	  zepto.matches = function(element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                          element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }
	
	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }
	
	  function isFunction(value) { return type(value) == "function" }
	  function isWindow(obj)     { return obj != null && obj == obj.window }
	  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	  function isObject(obj)     { return type(obj) == "object" }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }
	  function likeArray(obj) { return typeof obj.length == 'number' }
	
	  function compact(array) { return filter.call(array, function(item){ return item != null }) }
	  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	  function dasherize(str) {
	    return str.replace(/::/g, '/')
	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	           .replace(/_/g, '-')
	           .toLowerCase()
	  }
	  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }
	
	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }
	
	  function maybeAddPx(name, value) {
	    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	  }
	
	  function defaultDisplay(nodeName) {
	    var element, display
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName)
	      document.body.appendChild(element)
	      display = getComputedStyle(element, '').getPropertyValue("display")
	      element.parentNode.removeChild(element)
	      display == "none" && (display = "block")
	      elementDisplay[nodeName] = display
	    }
	    return elementDisplay[nodeName]
	  }
	
	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	  }
	
	  function Z(dom, selector) {
	    var i, len = dom ? dom.length : 0
	    for (i = 0; i < len; i++) this[i] = dom[i]
	    this.length = len
	    this.selector = selector || ''
	  }
	
	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overridden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function(html, name, properties) {
	    var dom, nodes, container
	
	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))
	
	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'
	
	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function(){
	        container.removeChild(this)
	      })
	    }
	
	    if (isPlainObject(properties)) {
	      nodes = $(dom)
	      $.each(properties, function(key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	        else nodes.attr(key, value)
	      })
	    }
	
	    return dom
	  }
	
	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. This method can be overridden in plugins.
	  zepto.Z = function(dom, selector) {
	    return new Z(dom, selector)
	  }
	
	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overridden in plugins.
	  zepto.isZ = function(object) {
	    return object instanceof zepto.Z
	  }
	
	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overridden in plugins.
	  zepto.init = function(selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }
	
	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function(selector, context){
	    return zepto.init(selector, context)
	  }
	
	  function extend(target, source, deep) {
	    for (key in source)
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	          target[key] = {}
	        if (isArray(source[key]) && !isArray(target[key]))
	          target[key] = []
	        extend(target[key], source[key], deep)
	      }
	      else if (source[key] !== undefined) target[key] = source[key]
	  }
	
	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function(target){
	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function(arg){ extend(target, arg, deep) })
	    return target
	  }
	
	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overridden in plugins.
	  zepto.qsa = function(element, selector){
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	        isSimple = simpleSelectorRE.test(nameOnly)
	    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
	      slice.call(
	        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
	          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	          element.getElementsByTagName(selector) : // Or a tag
	          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      )
	  }
	
	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }
	
	  $.contains = document.documentElement.contains ?
	    function(parent, node) {
	      return parent !== node && parent.contains(node)
	    } :
	    function(parent, node) {
	      while (node && (node = node.parentNode))
	        if (node === parent) return true
	      return false
	    }
	
	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }
	
	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }
	
	  // access className property while respecting SVGAnimatedString
	  function className(node, value){
	    var klass = node.className || '',
	        svg   = klass && klass.baseVal !== undefined
	
	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }
	
	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	          value == "null" ? null :
	          +value + "" == value ? +value :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	          value )
	        : value
	    } catch(e) {
	      return value
	    }
	  }
	
	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject
	
	  $.isEmptyObject = function(obj) {
	    var name
	    for (name in obj) return false
	    return true
	  }
	
	  $.inArray = function(elem, array, i){
	    return emptyArray.indexOf.call(array, elem, i)
	  }
	
	  $.camelCase = camelize
	  $.trim = function(str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }
	
	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }
	  $.noop = function() {}
	
	  $.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }
	
	  $.each = function(elements, callback){
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }
	
	    return elements
	  }
	
	  $.grep = function(elements, callback){
	    return filter.call(elements, callback)
	  }
	
	  if (window.JSON) $.parseJSON = JSON.parse
	
	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })
	
	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    constructor: zepto.Z,
	    length: 0,
	
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    splice: emptyArray.splice,
	    indexOf: emptyArray.indexOf,
	    concat: function(){
	      var i, value, args = []
	      for (i = 0; i < arguments.length; i++) {
	        value = arguments[i]
	        args[i] = zepto.isZ(value) ? value.toArray() : value
	      }
	      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
	    },
	
	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function(fn){
	      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments))
	    },
	
	    ready: function(callback){
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($)
	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	      return this
	    },
	    get: function(idx){
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function(){ return this.get() },
	    size: function(){
	      return this.length
	    },
	    remove: function(){
	      return this.each(function(){
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function(callback){
	      emptyArray.every.call(this, function(el, idx){
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function(selector){
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function(element){
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function(selector,context){
	      return $(uniq(this.concat($(selector,context))))
	    },
	    is: function(selector){
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function(selector){
	      var nodes=[]
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function(selector){
	      return this.filter(function(){
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	    },
	    first: function(){
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function(){
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function(selector){
	      var result, $this = this
	      if (!selector) result = $()
	      else if (typeof selector == 'object')
	        result = $(selector).filter(function(){
	          var node = this
	          return emptyArray.some.call($this, function(parent){
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function(){ return zepto.qsa(this, selector) })
	      return result
	    },
	    closest: function(selector, context){
	      var node = this[0], collection = false
	      if (typeof selector == 'object') collection = $(selector)
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	        node = node !== context && !isDocument(node) && node.parentNode
	      return $(node)
	    },
	    parents: function(selector){
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function(node){
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function(selector){
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function(selector){
	      return filtered(this.map(function(){ return children(this) }), selector)
	    },
	    contents: function() {
	      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
	    },
	    siblings: function(selector){
	      return filtered(this.map(function(i, el){
	        return filter.call(children(el.parentNode), function(child){ return child!==el })
	      }), selector)
	    },
	    empty: function(){
	      return this.each(function(){ this.innerHTML = '' })
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function(property){
	      return $.map(this, function(el){ return el[property] })
	    },
	    show: function(){
	      return this.each(function(){
	        this.style.display == "none" && (this.style.display = '')
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	          this.style.display = defaultDisplay(this.nodeName)
	      })
	    },
	    replaceWith: function(newContent){
	      return this.before(newContent).remove()
	    },
	    wrap: function(structure){
	      var func = isFunction(structure)
	      if (this[0] && !func)
	        var dom   = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1
	
	      return this.each(function(index){
	        $(this).wrapAll(
	          func ? structure.call(this, index) :
	            clone ? dom.cloneNode(true) : dom
	        )
	      })
	    },
	    wrapAll: function(structure){
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure))
	        var children
	        // drill down to the inmost element
	        while ((children = structure.children()).length) structure = children.first()
	        $(structure).append(this)
	      }
	      return this
	    },
	    wrapInner: function(structure){
	      var func = isFunction(structure)
	      return this.each(function(index){
	        var self = $(this), contents = self.contents(),
	            dom  = func ? structure.call(this, index) : structure
	        contents.length ? contents.wrapAll(dom) : self.append(dom)
	      })
	    },
	    unwrap: function(){
	      this.parent().each(function(){
	        $(this).replaceWith($(this).children())
	      })
	      return this
	    },
	    clone: function(){
	      return this.map(function(){ return this.cloneNode(true) })
	    },
	    hide: function(){
	      return this.css("display", "none")
	    },
	    toggle: function(setting){
	      return this.each(function(){
	        var el = $(this)
	        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	    html: function(html){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var originHtml = this.innerHTML
	          $(this).empty().append( funcArg(this, html, idx, originHtml) )
	        }) :
	        (0 in this ? this[0].innerHTML : null)
	    },
	    text: function(text){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var newText = funcArg(this, text, idx, this.textContent)
	          this.textContent = newText == null ? '' : ''+newText
	        }) :
	        (0 in this ? this.pluck('textContent').join("") : null)
	    },
	    attr: function(name, value){
	      var result
	      return (typeof name == 'string' && !(1 in arguments)) ?
	        (!this.length || this[0].nodeType !== 1 ? undefined :
	          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	        ) :
	        this.each(function(idx){
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function(name){
	      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        setAttribute(this, attribute)
	      }, this)})
	    },
	    prop: function(name, value){
	      name = propMap[name] || name
	      return (1 in arguments) ?
	        this.each(function(idx){
	          this[name] = funcArg(this, value, idx, this[name])
	        }) :
	        (this[0] && this[0][name])
	    },
	    data: function(name, value){
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()
	
	      var data = (1 in arguments) ?
	        this.attr(attrName, value) :
	        this.attr(attrName)
	
	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function(value){
	      return 0 in arguments ?
	        this.each(function(idx){
	          this.value = funcArg(this, value, idx, this.value)
	        }) :
	        (this[0] && (this[0].multiple ?
	           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	           this[0].value)
	        )
	    },
	    offset: function(coordinates){
	      if (coordinates) return this.each(function(index){
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	              top:  coords.top  - parentOffset.top,
	              left: coords.left - parentOffset.left
	            }
	
	        if ($this.css('position') == 'static') props['position'] = 'relative'
	        $this.css(props)
	      })
	      if (!this.length) return null
	      if (!$.contains(document.documentElement, this[0]))
	        return {top: 0, left: 0}
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function(property, value){
	      if (arguments.length < 2) {
	        var computedStyle, element = this[0]
	        if(!element) return
	        computedStyle = getComputedStyle(element, '')
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(property, function(_, prop){
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }
	
	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function(){ this.style.removeProperty(dasherize(key)) })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }
	
	      return this.each(function(){ this.style.cssText += ';' + css })
	    },
	    index: function(element){
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function(name){
	      if (!name) return false
	      return emptyArray.some.call(this, function(el){
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function(name){
	      if (!name) return this
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function(klass){
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function(name){
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function(name, when){
	      if (!name) return this
	      return this.each(function(idx){
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function(klass){
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function(value){
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function(){ this.scrollTop = value } :
	        function(){ this.scrollTo(this.scrollX, value) })
	    },
	    scrollLeft: function(value){
	      if (!this.length) return
	      var hasScrollLeft = 'scrollLeft' in this[0]
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	      return this.each(hasScrollLeft ?
	        function(){ this.scrollLeft = value } :
	        function(){ this.scrollTo(value, this.scrollY) })
	    },
	    position: function() {
	      if (!this.length) return
	
	      var elem = this[0],
	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),
	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()
	
	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0
	
	      // Add offsetParent borders
	      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0
	
	      // Subtract the two offsets
	      return {
	        top:  offset.top  - parentOffset.top,
	        left: offset.left - parentOffset.left
	      }
	    },
	    offsetParent: function() {
	      return this.map(function(){
	        var parent = this.offsetParent || document.body
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	          parent = parent.offsetParent
	        return parent
	      })
	    }
	  }
	
	  // for now
	  $.fn.detach = $.fn.remove
	
	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function(dimension){
	    var dimensionProperty =
	      dimension.replace(/./, function(m){ return m[0].toUpperCase() })
	
	    $.fn[dimension] = function(value){
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	        (offset = this.offset()) && offset[dimension]
	      else return this.each(function(idx){
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })
	
	  function traverseNode(node, fun) {
	    fun(node)
	    for (var i = 0, len = node.childNodes.length; i < len; i++)
	      traverseNode(node.childNodes[i], fun)
	  }
	
	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function(operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append
	
	    $.fn[operator] = function(){
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function(arg) {
	            argType = type(arg)
	            return argType == "object" || argType == "array" || arg == null ?
	              arg : zepto.fragment(arg)
	          }),
	          parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this
	
	      return this.each(function(_, target){
	        parent = inside ? target : target.parentNode
	
	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	                 operatorIndex == 1 ? target.firstChild :
	                 operatorIndex == 2 ? target :
	                 null
	
	        var parentInDocument = $.contains(document.documentElement, parent)
	
	        nodes.forEach(function(node){
	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()
	
	          parent.insertBefore(node, target)
	          if (parentInDocument) traverseNode(node, function(el){
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	               (!el.type || el.type === 'text/javascript') && !el.src)
	              window['eval'].call(window, el.innerHTML)
	          })
	        })
	      })
	    }
	
	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	      $(html)[operator](this)
	      return this
	    }
	  })
	
	  zepto.Z.prototype = Z.prototype = $.fn
	
	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = zepto
	
	  return $
	})()
	
	// If `$` is not yet defined, point it to `Zepto`
	window.Zepto = Zepto
	window.$ === undefined && (window.$ = Zepto)
	//     Zepto.js
	//     (c) 2010-2016 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.
	
	;(function($){
	  var cache = [], timeout
	
	  $.fn.remove = function(){
	    return this.each(function(){
	      if(this.parentNode){
	        if(this.tagName === 'IMG'){
	          cache.push(this)
	          this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
	          if (timeout) clearTimeout(timeout)
	          timeout = setTimeout(function(){ cache = [] }, 60000)
	        }
	        this.parentNode.removeChild(this)
	      }
	    })
	  }
	})(Zepto)
	//     Zepto.js
	//     (c) 2010-2016 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.
	
	// The following code is heavily inspired by jQuery's $.fn.data()
	
	;(function($){
	  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
	    exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []
	
	  // Get value from node:
	  // 1. first try key as given,
	  // 2. then try camelized key,
	  // 3. fall back to reading "data-*" attribute.
	  function getData(node, name) {
	    var id = node[exp], store = id && data[id]
	    if (name === undefined) return store || setData(node)
	    else {
	      if (store) {
	        if (name in store) return store[name]
	        var camelName = camelize(name)
	        if (camelName in store) return store[camelName]
	      }
	      return dataAttr.call($(node), name)
	    }
	  }
	
	  // Store value under camelized key on node
	  function setData(node, name, value) {
	    var id = node[exp] || (node[exp] = ++$.uuid),
	      store = data[id] || (data[id] = attributeData(node))
	    if (name !== undefined) store[camelize(name)] = value
	    return store
	  }
	
	  // Read all "data-*" attributes from a node
	  function attributeData(node) {
	    var store = {}
	    $.each(node.attributes || emptyArray, function(i, attr){
	      if (attr.name.indexOf('data-') == 0)
	        store[camelize(attr.name.replace('data-', ''))] =
	          $.zepto.deserializeValue(attr.value)
	    })
	    return store
	  }
	
	  $.fn.data = function(name, value) {
	    return value === undefined ?
	      // set multiple values via object
	      $.isPlainObject(name) ?
	        this.each(function(i, node){
	          $.each(name, function(key, value){ setData(node, key, value) })
	        }) :
	        // get value from first element
	        (0 in this ? getData(this[0], name) : undefined) :
	      // set value on all elements
	      this.each(function(){ setData(this, name, value) })
	  }
	
	  $.fn.removeData = function(names) {
	    if (typeof names == 'string') names = names.split(/\s+/)
	    return this.each(function(){
	      var id = this[exp], store = id && data[id]
	      if (store) $.each(names || store, function(key){
	        delete store[names ? camelize(this) : key]
	      })
	    })
	  }
	
	  // Generate extended `remove` and `empty` functions
	  ;['remove', 'empty'].forEach(function(methodName){
	    var origFn = $.fn[methodName]
	    $.fn[methodName] = function() {
	      var elements = this.find('*')
	      if (methodName === 'remove') elements = elements.add(this)
	      elements.removeData()
	      return origFn.call(this)
	    }
	  })
	})(Zepto)
	//     Zepto.js
	//     (c) 2010-2016 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.
	
	;(function($){
	  var _zid = 1, undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function(obj){ return typeof obj == 'string' },
	      handlers = {},
	      specialEvents={},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }
	
	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'
	
	  function zid(element) {
	    return element._zid || (element._zid = _zid++)
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event)
	    if (event.ns) var matcher = matcherFor(event.ns)
	    return (handlers[zid(element)] || []).filter(function(handler) {
	      return handler
	        && (!event.e  || handler.e == event.e)
	        && (!event.ns || matcher.test(handler.ns))
	        && (!fn       || zid(handler.fn) === zid(fn))
	        && (!selector || handler.sel == selector)
	    })
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.')
	    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	  }
	
	  function eventCapture(handler, captureSetting) {
	    return handler.del &&
	      (!focusinSupported && (handler.e in focus)) ||
	      !!captureSetting
	  }
	
	  function realEvent(type) {
	    return hover[type] || (focusinSupported && focus[type]) || type
	  }
	
	  function add(element, events, fn, data, selector, delegator, capture){
	    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	    events.split(/\s/).forEach(function(event){
	      if (event == 'ready') return $(document).ready(fn)
	      var handler   = parse(event)
	      handler.fn    = fn
	      handler.sel   = selector
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function(e){
	        var related = e.relatedTarget
	        if (!related || (related !== this && !$.contains(this, related)))
	          return handler.fn.apply(this, arguments)
	      }
	      handler.del   = delegator
	      var callback  = delegator || fn
	      handler.proxy = function(e){
	        e = compatible(e)
	        if (e.isImmediatePropagationStopped()) return
	        e.data = data
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	        if (result === false) e.preventDefault(), e.stopPropagation()
	        return result
	      }
	      handler.i = set.length
	      set.push(handler)
	      if ('addEventListener' in element)
	        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	    })
	  }
	  function remove(element, events, fn, selector, capture){
	    var id = zid(element)
	    ;(events || '').split(/\s/).forEach(function(event){
	      findHandlers(element, event, fn, selector).forEach(function(handler){
	        delete handlers[id][handler.i]
	      if ('removeEventListener' in element)
	        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	      })
	    })
	  }
	
	  $.event = { add: add, remove: remove }
	
	  $.proxy = function(fn, context) {
	    var args = (2 in arguments) && slice.call(arguments, 2)
	    if (isFunction(fn)) {
	      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	      proxyFn._zid = zid(fn)
	      return proxyFn
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn)
	        return $.proxy.apply(null, args)
	      } else {
	        return $.proxy(fn[context], fn)
	      }
	    } else {
	      throw new TypeError("expected function")
	    }
	  }
	
	  $.fn.bind = function(event, data, callback){
	    return this.on(event, data, callback)
	  }
	  $.fn.unbind = function(event, callback){
	    return this.off(event, callback)
	  }
	  $.fn.one = function(event, selector, data, callback){
	    return this.on(event, selector, data, callback, 1)
	  }
	
	  var returnTrue = function(){return true},
	      returnFalse = function(){return false},
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	      }
	
	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event)
	
	      $.each(eventMethods, function(name, predicate) {
	        var sourceMethod = source[name]
	        event[name] = function(){
	          this[predicate] = returnTrue
	          return sourceMethod && sourceMethod.apply(source, arguments)
	        }
	        event[predicate] = returnFalse
	      })
	
	      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          'returnValue' in source ? source.returnValue === false :
	          source.getPreventDefault && source.getPreventDefault())
	        event.isDefaultPrevented = returnTrue
	    }
	    return event
	  }
	
	  function createProxy(event) {
	    var key, proxy = { originalEvent: event }
	    for (key in event)
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]
	
	    return compatible(proxy, event)
	  }
	
	  $.fn.delegate = function(selector, event, callback){
	    return this.on(event, selector, callback)
	  }
	  $.fn.undelegate = function(selector, event, callback){
	    return this.off(event, selector, callback)
	  }
	
	  $.fn.live = function(event, callback){
	    $(document.body).delegate(this.selector, event, callback)
	    return this
	  }
	  $.fn.die = function(event, callback){
	    $(document.body).undelegate(this.selector, event, callback)
	    return this
	  }
	
	  $.fn.on = function(event, selector, data, callback, one){
	    var autoRemove, delegator, $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.on(type, selector, data, fn, one)
	      })
	      return $this
	    }
	
	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = data, data = selector, selector = undefined
	    if (callback === undefined || data === false)
	      callback = data, data = undefined
	
	    if (callback === false) callback = returnFalse
	
	    return $this.each(function(_, element){
	      if (one) autoRemove = function(e){
	        remove(element, e.type, callback)
	        return callback.apply(this, arguments)
	      }
	
	      if (selector) delegator = function(e){
	        var evt, match = $(e.target).closest(selector, element).get(0)
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	        }
	      }
	
	      add(element, event, callback, data, selector, delegator || autoRemove)
	    })
	  }
	  $.fn.off = function(event, selector, callback){
	    var $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.off(type, selector, fn)
	      })
	      return $this
	    }
	
	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = selector, selector = undefined
	
	    if (callback === false) callback = returnFalse
	
	    return $this.each(function(){
	      remove(this, event, callback, selector)
	    })
	  }
	
	  $.fn.trigger = function(event, args){
	    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	    event._args = args
	    return this.each(function(){
	      // handle focus(), blur() by calling them directly
	      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
	      // items in the collection might not be DOM elements
	      else if ('dispatchEvent' in this) this.dispatchEvent(event)
	      else $(this).triggerHandler(event, args)
	    })
	  }
	
	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function(event, args){
	    var e, result
	    this.each(function(i, element){
	      e = createProxy(isString(event) ? $.Event(event) : event)
	      e._args = args
	      e.target = element
	      $.each(findHandlers(element, event.type || event), function(i, handler){
	        result = handler.proxy(e)
	        if (e.isImmediatePropagationStopped()) return false
	      })
	    })
	    return result
	  }
	
	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
	  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	    $.fn[event] = function(callback) {
	      return (0 in arguments) ?
	        this.bind(event, callback) :
	        this.trigger(event)
	    }
	  })
	
	  $.Event = function(type, props) {
	    if (!isString(type)) props = type, type = props.type
	    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	    event.initEvent(type, bubbles, true)
	    return compatible(event)
	  }
	
	})(Zepto)
	//     Zepto.js
	//     (c) 2010-2016 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.
	
	;(function(){
	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined)
	  } catch(e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function(element){
	      try {
	        return nativeGetComputedStyle(element)
	      } catch(e) {
	        return null
	      }
	    }
	  }
	})()


/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  element: null
	};


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DOM = __webpack_require__(98);
	
	module.exports = {
	  // those methods are implemented differently
	  // depending on which build it is, using
	  // $... or angular... or Zepto... or require(...)
	  isArray: null,
	  isFunction: null,
	  isObject: null,
	  bind: null,
	  each: null,
	  map: null,
	  mixin: null,
	
	  isMsie: function() {
	    // from https://github.com/ded/bowser/blob/master/bowser.js
	    return (/(msie|trident)/i).test(navigator.userAgent) ?
	      navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
	  },
	
	  // http://stackoverflow.com/a/6969486
	  escapeRegExChars: function(str) {
	    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	  },
	
	  isNumber: function(obj) { return typeof obj === 'number'; },
	
	  toStr: function toStr(s) {
	    return s === undefined || s === null ? '' : s + '';
	  },
	
	  cloneDeep: function cloneDeep(obj) {
	    var clone = this.mixin({}, obj);
	    var self = this;
	    this.each(clone, function(value, key) {
	      if (value) {
	        if (self.isArray(value)) {
	          clone[key] = [].concat(value);
	        } else if (self.isObject(value)) {
	          clone[key] = self.cloneDeep(value);
	        }
	      }
	    });
	    return clone;
	  },
	
	  error: function(msg) {
	    throw new Error(msg);
	  },
	
	  every: function(obj, test) {
	    var result = true;
	    if (!obj) {
	      return result;
	    }
	    this.each(obj, function(val, key) {
	      result = test.call(null, val, key, obj);
	      if (!result) {
	        return false;
	      }
	    });
	    return !!result;
	  },
	
	  getUniqueId: (function() {
	    var counter = 0;
	    return function() { return counter++; };
	  })(),
	
	  templatify: function templatify(obj) {
	    if (this.isFunction(obj)) {
	      return obj;
	    }
	    var $template = DOM.element(obj);
	    if ($template.prop('tagName') === 'SCRIPT') {
	      return function template() { return $template.text(); };
	    }
	    return function template() { return String(obj); };
	  },
	
	  defer: function(fn) { setTimeout(fn, 0); },
	
	  noop: function() {},
	
	  className: function(prefix, clazz, skipDot) {
	    return (skipDot ? '' : '.') + prefix + '-' + clazz;
	  }
	};


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var attrsKey = 'aaAttrs';
	
	var _ = __webpack_require__(99);
	var DOM = __webpack_require__(98);
	var EventBus = __webpack_require__(101);
	var Input = __webpack_require__(102);
	var Dropdown = __webpack_require__(105);
	var html = __webpack_require__(107);
	var css = __webpack_require__(108);
	
	// constructor
	// -----------
	
	// THOUGHT: what if datasets could dynamically be added/removed?
	function Typeahead(o) {
	  var $menu;
	  var $input;
	  var $hint;
	
	  o = o || {};
	
	  if (!o.input) {
	    _.error('missing input');
	  }
	
	  this.isActivated = false;
	  this.debug = !!o.debug;
	  this.autoselect = !!o.autoselect;
	  this.openOnFocus = !!o.openOnFocus;
	  this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
	  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
	  this.$node = buildDom(o);
	
	  $menu = this.$node.find(_.className(this.cssClasses.prefix, this.cssClasses.dropdownMenu));
	  $input = this.$node.find(_.className(this.cssClasses.prefix, this.cssClasses.input));
	  $hint = this.$node.find(_.className(this.cssClasses.prefix, this.cssClasses.hint));
	
	  if (o.dropdownMenuContainer) {
	    DOM.element(o.dropdownMenuContainer)
	      .css('position', 'relative') // ensure the container has a relative position
	      .append($menu.css('top', '0')); // override the top: 100%
	  }
	
	  // #705: if there's scrollable overflow, ie doesn't support
	  // blur cancellations when the scrollbar is clicked
	  //
	  // #351: preventDefault won't cancel blurs in ie <= 8
	  $input.on('blur.aa', function($e) {
	    var active = document.activeElement;
	    if (_.isMsie() && ($menu.is(active) || $menu.has(active).length > 0)) {
	      $e.preventDefault();
	      // stop immediate in order to prevent Input#_onBlur from
	      // getting exectued
	      $e.stopImmediatePropagation();
	      _.defer(function() { $input.focus(); });
	    }
	  });
	
	  // #351: prevents input blur due to clicks within dropdown menu
	  $menu.on('mousedown.aa', function($e) { $e.preventDefault(); });
	
	  this.eventBus = o.eventBus || new EventBus({el: $input});
	
	  this.dropdown = new Typeahead.Dropdown({menu: $menu, datasets: o.datasets, templates: o.templates, cssClasses: this.cssClasses})
	    .onSync('suggestionClicked', this._onSuggestionClicked, this)
	    .onSync('cursorMoved', this._onCursorMoved, this)
	    .onSync('cursorRemoved', this._onCursorRemoved, this)
	    .onSync('opened', this._onOpened, this)
	    .onSync('closed', this._onClosed, this)
	    .onSync('shown', this._onShown, this)
	    .onAsync('datasetRendered', this._onDatasetRendered, this);
	
	  this.input = new Typeahead.Input({input: $input, hint: $hint})
	    .onSync('focused', this._onFocused, this)
	    .onSync('blurred', this._onBlurred, this)
	    .onSync('enterKeyed', this._onEnterKeyed, this)
	    .onSync('tabKeyed', this._onTabKeyed, this)
	    .onSync('escKeyed', this._onEscKeyed, this)
	    .onSync('upKeyed', this._onUpKeyed, this)
	    .onSync('downKeyed', this._onDownKeyed, this)
	    .onSync('leftKeyed', this._onLeftKeyed, this)
	    .onSync('rightKeyed', this._onRightKeyed, this)
	    .onSync('queryChanged', this._onQueryChanged, this)
	    .onSync('whitespaceChanged', this._onWhitespaceChanged, this);
	
	  this._setLanguageDirection();
	}
	
	// instance methods
	// ----------------
	
	_.mixin(Typeahead.prototype, {
	
	  // ### private
	
	  _onSuggestionClicked: function onSuggestionClicked(type, $el) {
	    var datum;
	
	    if (datum = this.dropdown.getDatumForSuggestion($el)) {
	      this._select(datum);
	    }
	  },
	
	  _onCursorMoved: function onCursorMoved() {
	    var datum = this.dropdown.getDatumForCursor();
	
	    this.input.setInputValue(datum.value, true);
	
	    this.eventBus.trigger('cursorchanged', datum.raw, datum.datasetName);
	  },
	
	  _onCursorRemoved: function onCursorRemoved() {
	    this.input.resetInputValue();
	    this._updateHint();
	  },
	
	  _onDatasetRendered: function onDatasetRendered() {
	    this._updateHint();
	
	    this.eventBus.trigger('updated');
	  },
	
	  _onOpened: function onOpened() {
	    this._updateHint();
	
	    this.eventBus.trigger('opened');
	  },
	
	  _onShown: function onShown() {
	    this.eventBus.trigger('shown');
	  },
	
	  _onClosed: function onClosed() {
	    this.input.clearHint();
	
	    this.eventBus.trigger('closed');
	  },
	
	  _onFocused: function onFocused() {
	    this.isActivated = true;
	
	    if (this.openOnFocus) {
	      var query = this.input.getQuery();
	      if (query.length >= this.minLength) {
	        this.dropdown.update(query);
	      } else {
	        this.dropdown.empty();
	      }
	
	      this.dropdown.open();
	    }
	  },
	
	  _onBlurred: function onBlurred() {
	    if (!this.debug) {
	      this.isActivated = false;
	      this.dropdown.empty();
	      this.dropdown.close();
	    }
	  },
	
	  _onEnterKeyed: function onEnterKeyed(type, $e) {
	    var cursorDatum;
	    var topSuggestionDatum;
	
	    cursorDatum = this.dropdown.getDatumForCursor();
	    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
	
	    if (cursorDatum) {
	      this._select(cursorDatum);
	      $e.preventDefault();
	    } else if (this.autoselect && topSuggestionDatum) {
	      this._select(topSuggestionDatum);
	      $e.preventDefault();
	    }
	  },
	
	  _onTabKeyed: function onTabKeyed(type, $e) {
	    var datum;
	
	    if (datum = this.dropdown.getDatumForCursor()) {
	      this._select(datum);
	      $e.preventDefault();
	    } else {
	      this._autocomplete(true);
	    }
	  },
	
	  _onEscKeyed: function onEscKeyed() {
	    this.dropdown.close();
	    this.input.resetInputValue();
	  },
	
	  _onUpKeyed: function onUpKeyed() {
	    var query = this.input.getQuery();
	
	    if (this.dropdown.isEmpty && query.length >= this.minLength) {
	      this.dropdown.update(query);
	    } else {
	      this.dropdown.moveCursorUp();
	    }
	
	    this.dropdown.open();
	  },
	
	  _onDownKeyed: function onDownKeyed() {
	    var query = this.input.getQuery();
	
	    if (this.dropdown.isEmpty && query.length >= this.minLength) {
	      this.dropdown.update(query);
	    } else {
	      this.dropdown.moveCursorDown();
	    }
	
	    this.dropdown.open();
	  },
	
	  _onLeftKeyed: function onLeftKeyed() {
	    if (this.dir === 'rtl') {
	      this._autocomplete();
	    }
	  },
	
	  _onRightKeyed: function onRightKeyed() {
	    if (this.dir === 'ltr') {
	      this._autocomplete();
	    }
	  },
	
	  _onQueryChanged: function onQueryChanged(e, query) {
	    this.input.clearHintIfInvalid();
	
	    if (query.length >= this.minLength) {
	      this.dropdown.update(query);
	    } else {
	      this.dropdown.empty();
	    }
	
	    this.dropdown.open();
	    this._setLanguageDirection();
	  },
	
	  _onWhitespaceChanged: function onWhitespaceChanged() {
	    this._updateHint();
	    this.dropdown.open();
	  },
	
	  _setLanguageDirection: function setLanguageDirection() {
	    var dir = this.input.getLanguageDirection();
	
	    if (this.dir !== dir) {
	      this.dir = dir;
	      this.$node.css('direction', dir);
	      this.dropdown.setLanguageDirection(dir);
	    }
	  },
	
	  _updateHint: function updateHint() {
	    var datum;
	    var val;
	    var query;
	    var escapedQuery;
	    var frontMatchRegEx;
	    var match;
	
	    datum = this.dropdown.getDatumForTopSuggestion();
	
	    if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
	      val = this.input.getInputValue();
	      query = Input.normalizeQuery(val);
	      escapedQuery = _.escapeRegExChars(query);
	
	      // match input value, then capture trailing text
	      frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
	      match = frontMatchRegEx.exec(datum.value);
	
	      // clear hint if there's no trailing text
	      if (match) {
	        this.input.setHint(val + match[1]);
	      } else {
	        this.input.clearHint();
	      }
	    } else {
	      this.input.clearHint();
	    }
	  },
	
	  _autocomplete: function autocomplete(laxCursor) {
	    var hint;
	    var query;
	    var isCursorAtEnd;
	    var datum;
	
	    hint = this.input.getHint();
	    query = this.input.getQuery();
	    isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();
	
	    if (hint && query !== hint && isCursorAtEnd) {
	      datum = this.dropdown.getDatumForTopSuggestion();
	      if (datum) {
	        this.input.setInputValue(datum.value);
	      }
	
	      this.eventBus.trigger('autocompleted', datum.raw, datum.datasetName);
	    }
	  },
	
	  _select: function select(datum) {
	    if (typeof datum.value !== 'undefined') {
	      this.input.setQuery(datum.value);
	    }
	    this.input.setInputValue(datum.value, true);
	
	    this._setLanguageDirection();
	
	    this.eventBus.trigger('selected', datum.raw, datum.datasetName);
	    this.dropdown.close();
	
	    // #118: allow click event to bubble up to the body before removing
	    // the suggestions otherwise we break event delegation
	    _.defer(_.bind(this.dropdown.empty, this.dropdown));
	  },
	
	  // ### public
	
	  open: function open() {
	    // if the menu is not activated yet, we need to update
	    // the underlying dropdown menu to trigger the search
	    // otherwise we're not gonna see anything
	    if (!this.isActivated) {
	      var query = this.input.getInputValue();
	      if (query.length >= this.minLength) {
	        this.dropdown.update(query);
	      } else {
	        this.dropdown.empty();
	      }
	    }
	    this.dropdown.open();
	  },
	
	  close: function close() {
	    this.dropdown.close();
	  },
	
	  setVal: function setVal(val) {
	    // expect val to be a string, so be safe, and coerce
	    val = _.toStr(val);
	
	    if (this.isActivated) {
	      this.input.setInputValue(val);
	    } else {
	      this.input.setQuery(val);
	      this.input.setInputValue(val, true);
	    }
	
	    this._setLanguageDirection();
	  },
	
	  getVal: function getVal() {
	    return this.input.getQuery();
	  },
	
	  destroy: function destroy() {
	    this.input.destroy();
	    this.dropdown.destroy();
	
	    destroyDomStructure(this.$node, this.cssClasses);
	
	    this.$node = null;
	  }
	});
	
	function buildDom(options) {
	  var $input;
	  var $wrapper;
	  var $dropdown;
	  var $hint;
	
	  $input = DOM.element(options.input);
	  $wrapper = DOM.element(html.wrapper.replace('%ROOT%', options.cssClasses.root)).css(css.wrapper);
	  // override the display property with the table-cell value
	  // if the parent element is a table and the original input was a block
	  //  -> https://github.com/algolia/autocomplete.js/issues/16
	  if ($input.css('display') === 'block' && $input.parent().css('display') === 'table') {
	    $wrapper.css('display', 'table-cell');
	  }
	  var dropdownHtml = html.dropdown.
	    replace('%PREFIX%', options.cssClasses.prefix).
	    replace('%DROPDOWN_MENU%', options.cssClasses.dropdownMenu);
	  $dropdown = DOM.element(dropdownHtml).css(css.dropdown);
	  if (options.templates && options.templates.dropdownMenu) {
	    $dropdown.html(_.templatify(options.templates.dropdownMenu)());
	  }
	  $hint = $input.clone().css(css.hint).css(getBackgroundStyles($input));
	
	  $hint
	    .val('')
	    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.hint, true))
	    .removeAttr('id name placeholder required')
	    .prop('readonly', true)
	    .attr({autocomplete: 'off', spellcheck: 'false', tabindex: -1});
	  if ($hint.removeData) {
	    $hint.removeData();
	  }
	
	  // store the original values of the attrs that get modified
	  // so modifications can be reverted on destroy
	  $input.data(attrsKey, {
	    dir: $input.attr('dir'),
	    autocomplete: $input.attr('autocomplete'),
	    spellcheck: $input.attr('spellcheck'),
	    style: $input.attr('style')
	  });
	
	  $input
	    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.input, true))
	    .attr({autocomplete: 'off', spellcheck: false})
	    .css(options.hint ? css.input : css.inputWithNoHint);
	
	  // ie7 does not like it when dir is set to auto
	  try {
	    if (!$input.attr('dir')) {
	      $input.attr('dir', 'auto');
	    }
	  } catch (e) {
	    // ignore
	  }
	
	  return $input
	    .wrap($wrapper)
	    .parent()
	    .prepend(options.hint ? $hint : null)
	    .append($dropdown);
	}
	
	function getBackgroundStyles($el) {
	  return {
	    backgroundAttachment: $el.css('background-attachment'),
	    backgroundClip: $el.css('background-clip'),
	    backgroundColor: $el.css('background-color'),
	    backgroundImage: $el.css('background-image'),
	    backgroundOrigin: $el.css('background-origin'),
	    backgroundPosition: $el.css('background-position'),
	    backgroundRepeat: $el.css('background-repeat'),
	    backgroundSize: $el.css('background-size')
	  };
	}
	
	function destroyDomStructure($node, cssClasses) {
	  var $input = $node.find(_.className(cssClasses.prefix, cssClasses.input));
	
	  // need to remove attrs that weren't previously defined and
	  // revert attrs that originally had a value
	  _.each($input.data(attrsKey), function(val, key) {
	    if (val === undefined) {
	      $input.removeAttr(key);
	    } else {
	      $input.attr(key, val);
	    }
	  });
	
	  $input
	    .detach()
	    .removeClass(_.className(cssClasses.prefix, cssClasses.input, true))
	    .insertAfter($node);
	  if ($input.removeData) {
	    $input.removeData(attrsKey);
	  }
	
	  $node.remove();
	}
	
	Typeahead.Dropdown = Dropdown;
	Typeahead.Input = Input;
	Typeahead.sources = __webpack_require__(109);
	
	module.exports = Typeahead;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var namespace = 'autocomplete:';
	
	var _ = __webpack_require__(99);
	var DOM = __webpack_require__(98);
	
	// constructor
	// -----------
	
	function EventBus(o) {
	  if (!o || !o.el) {
	    _.error('EventBus initialized without el');
	  }
	
	  this.$el = DOM.element(o.el);
	}
	
	// instance methods
	// ----------------
	
	_.mixin(EventBus.prototype, {
	
	  // ### public
	
	  trigger: function(type) {
	    var args = [].slice.call(arguments, 1);
	
	    this.$el.trigger(namespace + type, args);
	  }
	});
	
	module.exports = EventBus;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var specialKeyCodeMap;
	
	specialKeyCodeMap = {
	  9: 'tab',
	  27: 'esc',
	  37: 'left',
	  39: 'right',
	  13: 'enter',
	  38: 'up',
	  40: 'down'
	};
	
	var _ = __webpack_require__(99);
	var DOM = __webpack_require__(98);
	var EventEmitter = __webpack_require__(103);
	
	// constructor
	// -----------
	
	function Input(o) {
	  var that = this;
	  var onBlur;
	  var onFocus;
	  var onKeydown;
	  var onInput;
	
	  o = o || {};
	
	  if (!o.input) {
	    _.error('input is missing');
	  }
	
	  // bound functions
	  onBlur = _.bind(this._onBlur, this);
	  onFocus = _.bind(this._onFocus, this);
	  onKeydown = _.bind(this._onKeydown, this);
	  onInput = _.bind(this._onInput, this);
	
	  this.$hint = DOM.element(o.hint);
	  this.$input = DOM.element(o.input)
	    .on('blur.aa', onBlur)
	    .on('focus.aa', onFocus)
	    .on('keydown.aa', onKeydown);
	
	  // if no hint, noop all the hint related functions
	  if (this.$hint.length === 0) {
	    this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
	  }
	
	  // ie7 and ie8 don't support the input event
	  // ie9 doesn't fire the input event when characters are removed
	  // not sure if ie10 is compatible
	  if (!_.isMsie()) {
	    this.$input.on('input.aa', onInput);
	  } else {
	    this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function($e) {
	      // if a special key triggered this, ignore it
	      if (specialKeyCodeMap[$e.which || $e.keyCode]) {
	        return;
	      }
	
	      // give the browser a chance to update the value of the input
	      // before checking to see if the query changed
	      _.defer(_.bind(that._onInput, that, $e));
	    });
	  }
	
	  // the query defaults to whatever the value of the input is
	  // on initialization, it'll most likely be an empty string
	  this.query = this.$input.val();
	
	  // helps with calculating the width of the input's value
	  this.$overflowHelper = buildOverflowHelper(this.$input);
	}
	
	// static methods
	// --------------
	
	Input.normalizeQuery = function(str) {
	  // strips leading whitespace and condenses all whitespace
	  return (str || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
	};
	
	// instance methods
	// ----------------
	
	_.mixin(Input.prototype, EventEmitter, {
	
	  // ### private
	
	  _onBlur: function onBlur() {
	    this.resetInputValue();
	    this.trigger('blurred');
	  },
	
	  _onFocus: function onFocus() {
	    this.trigger('focused');
	  },
	
	  _onKeydown: function onKeydown($e) {
	    // which is normalized and consistent (but not for ie)
	    var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
	
	    this._managePreventDefault(keyName, $e);
	    if (keyName && this._shouldTrigger(keyName, $e)) {
	      this.trigger(keyName + 'Keyed', $e);
	    }
	  },
	
	  _onInput: function onInput() {
	    this._checkInputValue();
	  },
	
	  _managePreventDefault: function managePreventDefault(keyName, $e) {
	    var preventDefault;
	    var hintValue;
	    var inputValue;
	
	    switch (keyName) {
	    case 'tab':
	      hintValue = this.getHint();
	      inputValue = this.getInputValue();
	
	      preventDefault = hintValue &&
	        hintValue !== inputValue &&
	        !withModifier($e);
	      break;
	
	    case 'up':
	    case 'down':
	      preventDefault = !withModifier($e);
	      break;
	
	    default:
	      preventDefault = false;
	    }
	
	    if (preventDefault) {
	      $e.preventDefault();
	    }
	  },
	
	  _shouldTrigger: function shouldTrigger(keyName, $e) {
	    var trigger;
	
	    switch (keyName) {
	    case 'tab':
	      trigger = !withModifier($e);
	      break;
	
	    default:
	      trigger = true;
	    }
	
	    return trigger;
	  },
	
	  _checkInputValue: function checkInputValue() {
	    var inputValue;
	    var areEquivalent;
	    var hasDifferentWhitespace;
	
	    inputValue = this.getInputValue();
	    areEquivalent = areQueriesEquivalent(inputValue, this.query);
	    hasDifferentWhitespace = areEquivalent && this.query ?
	      this.query.length !== inputValue.length : false;
	
	    this.query = inputValue;
	
	    if (!areEquivalent) {
	      this.trigger('queryChanged', this.query);
	    } else if (hasDifferentWhitespace) {
	      this.trigger('whitespaceChanged', this.query);
	    }
	  },
	
	  // ### public
	
	  focus: function focus() {
	    this.$input.focus();
	  },
	
	  blur: function blur() {
	    this.$input.blur();
	  },
	
	  getQuery: function getQuery() {
	    return this.query;
	  },
	
	  setQuery: function setQuery(query) {
	    this.query = query;
	  },
	
	  getInputValue: function getInputValue() {
	    return this.$input.val();
	  },
	
	  setInputValue: function setInputValue(value, silent) {
	    if (typeof value === 'undefined') {
	      value = this.query;
	    }
	    this.$input.val(value);
	
	    // silent prevents any additional events from being triggered
	    if (silent) {
	      this.clearHint();
	    } else {
	      this._checkInputValue();
	    }
	  },
	
	  resetInputValue: function resetInputValue() {
	    this.setInputValue(this.query, true);
	  },
	
	  getHint: function getHint() {
	    return this.$hint.val();
	  },
	
	  setHint: function setHint(value) {
	    this.$hint.val(value);
	  },
	
	  clearHint: function clearHint() {
	    this.setHint('');
	  },
	
	  clearHintIfInvalid: function clearHintIfInvalid() {
	    var val;
	    var hint;
	    var valIsPrefixOfHint;
	    var isValid;
	
	    val = this.getInputValue();
	    hint = this.getHint();
	    valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
	    isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();
	
	    if (!isValid) {
	      this.clearHint();
	    }
	  },
	
	  getLanguageDirection: function getLanguageDirection() {
	    return (this.$input.css('direction') || 'ltr').toLowerCase();
	  },
	
	  hasOverflow: function hasOverflow() {
	    // 2 is arbitrary, just picking a small number to handle edge cases
	    var constraint = this.$input.width() - 2;
	
	    this.$overflowHelper.text(this.getInputValue());
	
	    return this.$overflowHelper.width() >= constraint;
	  },
	
	  isCursorAtEnd: function() {
	    var valueLength;
	    var selectionStart;
	    var range;
	
	    valueLength = this.$input.val().length;
	    selectionStart = this.$input[0].selectionStart;
	
	    if (_.isNumber(selectionStart)) {
	      return selectionStart === valueLength;
	    } else if (document.selection) {
	      // NOTE: this won't work unless the input has focus, the good news
	      // is this code should only get called when the input has focus
	      range = document.selection.createRange();
	      range.moveStart('character', -valueLength);
	
	      return valueLength === range.text.length;
	    }
	
	    return true;
	  },
	
	  destroy: function destroy() {
	    this.$hint.off('.aa');
	    this.$input.off('.aa');
	
	    this.$hint = this.$input = this.$overflowHelper = null;
	  }
	});
	
	// helper functions
	// ----------------
	
	function buildOverflowHelper($input) {
	  return DOM.element('<pre aria-hidden="true"></pre>')
	    .css({
	      // position helper off-screen
	      position: 'absolute',
	      visibility: 'hidden',
	      // avoid line breaks and whitespace collapsing
	      whiteSpace: 'pre',
	      // use same font css as input to calculate accurate width
	      fontFamily: $input.css('font-family'),
	      fontSize: $input.css('font-size'),
	      fontStyle: $input.css('font-style'),
	      fontVariant: $input.css('font-variant'),
	      fontWeight: $input.css('font-weight'),
	      wordSpacing: $input.css('word-spacing'),
	      letterSpacing: $input.css('letter-spacing'),
	      textIndent: $input.css('text-indent'),
	      textRendering: $input.css('text-rendering'),
	      textTransform: $input.css('text-transform')
	    })
	    .insertAfter($input);
	}
	
	function areQueriesEquivalent(a, b) {
	  return Input.normalizeQuery(a) === Input.normalizeQuery(b);
	}
	
	function withModifier($e) {
	  return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
	}
	
	module.exports = Input;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {'use strict';
	
	var splitter = /\s+/;
	var nextTick = getNextTick();
	
	module.exports = {
	  onSync: onSync,
	  onAsync: onAsync,
	  off: off,
	  trigger: trigger
	};
	
	function on(method, types, cb, context) {
	  var type;
	
	  if (!cb) {
	    return this;
	  }
	
	  types = types.split(splitter);
	  cb = context ? bindContext(cb, context) : cb;
	
	  this._callbacks = this._callbacks || {};
	
	  while (type = types.shift()) {
	    this._callbacks[type] = this._callbacks[type] || {sync: [], async: []};
	    this._callbacks[type][method].push(cb);
	  }
	
	  return this;
	}
	
	function onAsync(types, cb, context) {
	  return on.call(this, 'async', types, cb, context);
	}
	
	function onSync(types, cb, context) {
	  return on.call(this, 'sync', types, cb, context);
	}
	
	function off(types) {
	  var type;
	
	  if (!this._callbacks) {
	    return this;
	  }
	
	  types = types.split(splitter);
	
	  while (type = types.shift()) {
	    delete this._callbacks[type];
	  }
	
	  return this;
	}
	
	function trigger(types) {
	  var type;
	  var callbacks;
	  var args;
	  var syncFlush;
	  var asyncFlush;
	
	  if (!this._callbacks) {
	    return this;
	  }
	
	  types = types.split(splitter);
	  args = [].slice.call(arguments, 1);
	
	  while ((type = types.shift()) && (callbacks = this._callbacks[type])) { // eslint-disable-line
	    syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
	    asyncFlush = getFlush(callbacks.async, this, [type].concat(args));
	
	    if (syncFlush()) {
	      nextTick(asyncFlush);
	    }
	  }
	
	  return this;
	}
	
	function getFlush(callbacks, context, args) {
	  return flush;
	
	  function flush() {
	    var cancelled;
	
	    for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
	      // only cancel if the callback explicitly returns false
	      cancelled = callbacks[i].apply(context, args) === false;
	    }
	
	    return !cancelled;
	  }
	}
	
	function getNextTick() {
	  var nextTickFn;
	
	  if (window.setImmediate) { // IE10+
	    nextTickFn = function nextTickSetImmediate(fn) {
	      setImmediate(function() { fn(); });
	    };
	  } else { // old browsers
	    nextTickFn = function nextTickSetTimeout(fn) {
	      setTimeout(function() { fn(); }, 0);
	    };
	  }
	
	  return nextTickFn;
	}
	
	function bindContext(fn, context) {
	  return fn.bind ?
	    fn.bind(context) :
	    function() { fn.apply(context, [].slice.call(arguments, 0)); };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104).setImmediate))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104).setImmediate, __webpack_require__(104).clearImmediate))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(99);
	var DOM = __webpack_require__(98);
	var EventEmitter = __webpack_require__(103);
	var Dataset = __webpack_require__(106);
	var css = __webpack_require__(108);
	
	// constructor
	// -----------
	
	function Dropdown(o) {
	  var that = this;
	  var onSuggestionClick;
	  var onSuggestionMouseEnter;
	  var onSuggestionMouseLeave;
	
	  o = o || {};
	
	  if (!o.menu) {
	    _.error('menu is required');
	  }
	
	  if (!_.isArray(o.datasets) && !_.isObject(o.datasets)) {
	    _.error('1 or more datasets required');
	  }
	  if (!o.datasets) {
	    _.error('datasets is required');
	  }
	
	  this.isOpen = false;
	  this.isEmpty = true;
	  this.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
	
	  // bound functions
	  onSuggestionClick = _.bind(this._onSuggestionClick, this);
	  onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
	  onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);
	
	  var cssClass = _.className(this.cssClasses.prefix, this.cssClasses.suggestion);
	  this.$menu = DOM.element(o.menu)
	    .on('click.aa', cssClass, onSuggestionClick)
	    .on('mouseenter.aa', cssClass, onSuggestionMouseEnter)
	    .on('mouseleave.aa', cssClass, onSuggestionMouseLeave);
	
	  if (o.templates && o.templates.header) {
	    this.$menu.prepend(_.templatify(o.templates.header)());
	  }
	
	  this.datasets = _.map(o.datasets, function(oDataset) { return initializeDataset(that.$menu, oDataset, o.cssClasses); });
	  _.each(this.datasets, function(dataset) {
	    var root = dataset.getRoot();
	    if (root && root.parent().length === 0) {
	      that.$menu.append(root);
	    }
	    dataset.onSync('rendered', that._onRendered, that);
	  });
	
	  if (o.templates && o.templates.footer) {
	    this.$menu.append(_.templatify(o.templates.footer)());
	  }
	}
	
	// instance methods
	// ----------------
	
	_.mixin(Dropdown.prototype, EventEmitter, {
	
	  // ### private
	
	  _onSuggestionClick: function onSuggestionClick($e) {
	    this.trigger('suggestionClicked', DOM.element($e.currentTarget));
	  },
	
	  _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
	    this._removeCursor();
	    this._setCursor(DOM.element($e.currentTarget));
	  },
	
	  _onSuggestionMouseLeave: function onSuggestionMouseLeave() {
	    this._removeCursor();
	  },
	
	  _onRendered: function onRendered() {
	    this.isEmpty = _.every(this.datasets, isDatasetEmpty);
	
	    if (this.isEmpty) {
	      this._hide();
	    } else if (this.isOpen) {
	      this._show();
	    }
	
	    this.trigger('datasetRendered');
	
	    function isDatasetEmpty(dataset) {
	      return dataset.isEmpty();
	    }
	  },
	
	  _hide: function() {
	    this.$menu.hide();
	  },
	
	  _show: function() {
	    // can't use jQuery#show because $menu is a span element we want
	    // display: block; not dislay: inline;
	    this.$menu.css('display', 'block');
	
	    this.trigger('shown');
	  },
	
	  _getSuggestions: function getSuggestions() {
	    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.suggestion));
	  },
	
	  _getCursor: function getCursor() {
	    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.cursor)).first();
	  },
	
	  _setCursor: function setCursor($el) {
	    $el.first().addClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true));
	    this.trigger('cursorMoved');
	  },
	
	  _removeCursor: function removeCursor() {
	    this._getCursor().removeClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true));
	  },
	
	  _moveCursor: function moveCursor(increment) {
	    var $suggestions;
	    var $oldCursor;
	    var newCursorIndex;
	    var $newCursor;
	
	    if (!this.isOpen) {
	      return;
	    }
	
	    $oldCursor = this._getCursor();
	    $suggestions = this._getSuggestions();
	
	    this._removeCursor();
	
	    // shifting before and after modulo to deal with -1 index
	    newCursorIndex = $suggestions.index($oldCursor) + increment;
	    newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;
	
	    if (newCursorIndex === -1) {
	      this.trigger('cursorRemoved');
	
	      return;
	    } else if (newCursorIndex < -1) {
	      newCursorIndex = $suggestions.length - 1;
	    }
	
	    this._setCursor($newCursor = $suggestions.eq(newCursorIndex));
	
	    // in the case of scrollable overflow
	    // make sure the cursor is visible in the menu
	    this._ensureVisible($newCursor);
	  },
	
	  _ensureVisible: function ensureVisible($el) {
	    var elTop;
	    var elBottom;
	    var menuScrollTop;
	    var menuHeight;
	
	    elTop = $el.position().top;
	    elBottom = elTop + $el.height() +
	      parseInt($el.css('margin-top'), 10) +
	      parseInt($el.css('margin-bottom'), 10);
	    menuScrollTop = this.$menu.scrollTop();
	    menuHeight = this.$menu.height() +
	      parseInt(this.$menu.css('paddingTop'), 10) +
	      parseInt(this.$menu.css('paddingBottom'), 10);
	
	    if (elTop < 0) {
	      this.$menu.scrollTop(menuScrollTop + elTop);
	    } else if (menuHeight < elBottom) {
	      this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
	    }
	  },
	
	  // ### public
	
	  close: function close() {
	    if (this.isOpen) {
	      this.isOpen = false;
	
	      this._removeCursor();
	      this._hide();
	
	      this.trigger('closed');
	    }
	  },
	
	  open: function open() {
	    if (!this.isOpen) {
	      this.isOpen = true;
	
	      if (!this.isEmpty) {
	        this._show();
	      }
	
	      this.trigger('opened');
	    }
	  },
	
	  setLanguageDirection: function setLanguageDirection(dir) {
	    this.$menu.css(dir === 'ltr' ? css.ltr : css.rtl);
	  },
	
	  moveCursorUp: function moveCursorUp() {
	    this._moveCursor(-1);
	  },
	
	  moveCursorDown: function moveCursorDown() {
	    this._moveCursor(+1);
	  },
	
	  getDatumForSuggestion: function getDatumForSuggestion($el) {
	    var datum = null;
	
	    if ($el.length) {
	      datum = {
	        raw: Dataset.extractDatum($el),
	        value: Dataset.extractValue($el),
	        datasetName: Dataset.extractDatasetName($el)
	      };
	    }
	
	    return datum;
	  },
	
	  getDatumForCursor: function getDatumForCursor() {
	    return this.getDatumForSuggestion(this._getCursor().first());
	  },
	
	  getDatumForTopSuggestion: function getDatumForTopSuggestion() {
	    return this.getDatumForSuggestion(this._getSuggestions().first());
	  },
	
	  update: function update(query) {
	    _.each(this.datasets, updateDataset);
	
	    function updateDataset(dataset) {
	      dataset.update(query);
	    }
	  },
	
	  empty: function empty() {
	    _.each(this.datasets, clearDataset);
	    this.isEmpty = true;
	
	    function clearDataset(dataset) {
	      dataset.clear();
	    }
	  },
	
	  isVisible: function isVisible() {
	    return this.isOpen && !this.isEmpty;
	  },
	
	  destroy: function destroy() {
	    this.$menu.off('.aa');
	
	    this.$menu = null;
	
	    _.each(this.datasets, destroyDataset);
	
	    function destroyDataset(dataset) {
	      dataset.destroy();
	    }
	  }
	});
	
	// helper functions
	// ----------------
	Dropdown.Dataset = Dataset;
	
	function initializeDataset($menu, oDataset, cssClasses) {
	  return new Dropdown.Dataset(_.mixin({$menu: $menu, cssClasses: cssClasses}, oDataset));
	}
	
	module.exports = Dropdown;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var datasetKey = 'aaDataset';
	var valueKey = 'aaValue';
	var datumKey = 'aaDatum';
	
	var _ = __webpack_require__(99);
	var DOM = __webpack_require__(98);
	var html = __webpack_require__(107);
	var css = __webpack_require__(108);
	var EventEmitter = __webpack_require__(103);
	
	// constructor
	// -----------
	
	function Dataset(o) {
	  o = o || {};
	  o.templates = o.templates || {};
	
	  if (!o.source) {
	    _.error('missing source');
	  }
	
	  if (o.name && !isValidName(o.name)) {
	    _.error('invalid dataset name: ' + o.name);
	  }
	
	  // tracks the last query the dataset was updated for
	  this.query = null;
	
	  this.highlight = !!o.highlight;
	  this.name = typeof o.name === 'undefined' || o.name === null ? _.getUniqueId() : o.name;
	
	  this.source = o.source;
	  this.displayFn = getDisplayFn(o.display || o.displayKey);
	
	  this.templates = getTemplates(o.templates, this.displayFn);
	
	  this.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
	
	  var clazz = _.className(this.cssClasses.prefix, this.cssClasses.dataset);
	  this.$el = o.$menu && o.$menu.find(clazz + '-' + this.name).length > 0 ?
	    DOM.element(o.$menu.find(clazz + '-' + this.name)[0]) :
	    DOM.element(
	      html.dataset.replace('%CLASS%', this.name)
	        .replace('%PREFIX%', this.cssClasses.prefix)
	        .replace('%DATASET%', this.cssClasses.dataset)
	    );
	
	  this.$menu = o.$menu;
	}
	
	// static methods
	// --------------
	
	Dataset.extractDatasetName = function extractDatasetName(el) {
	  return DOM.element(el).data(datasetKey);
	};
	
	Dataset.extractValue = function extractValue(el) {
	  return DOM.element(el).data(valueKey);
	};
	
	Dataset.extractDatum = function extractDatum(el) {
	  var datum = DOM.element(el).data(datumKey);
	  if (typeof datum === 'string') {
	    // Zepto has an automatic deserialization of the
	    // JSON encoded data attribute
	    datum = JSON.parse(datum);
	  }
	  return datum;
	};
	
	// instance methods
	// ----------------
	
	_.mixin(Dataset.prototype, EventEmitter, {
	
	  // ### private
	
	  _render: function render(query, suggestions) {
	    if (!this.$el) {
	      return;
	    }
	
	    var that = this;
	    var hasSuggestions;
	    var renderArgs = [].slice.call(arguments, 2);
	
	    this.$el.empty();
	    hasSuggestions = suggestions && suggestions.length;
	
	    if (!hasSuggestions && this.templates.empty) {
	      this.$el
	        .html(getEmptyHtml.apply(this, renderArgs))
	        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
	        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
	    } else if (hasSuggestions) {
	      this.$el
	        .html(getSuggestionsHtml.apply(this, renderArgs))
	        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
	        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
	    }
	
	    if (this.$menu) {
	      this.$menu.addClass(this.cssClasses.prefix + '-' + (hasSuggestions ? 'with' : 'without') + '-' + this.name)
	        .removeClass(this.cssClasses.prefix + '-' + (hasSuggestions ? 'without' : 'with') + '-' + this.name);
	    }
	
	    this.trigger('rendered');
	
	    function getEmptyHtml() {
	      var args = [].slice.call(arguments, 0);
	      args = [{query: query, isEmpty: true}].concat(args);
	      return that.templates.empty.apply(this, args);
	    }
	
	    function getSuggestionsHtml() {
	      var args = [].slice.call(arguments, 0);
	      var $suggestions;
	      var nodes;
	      var self = this;
	
	      var suggestionsHtml = html.suggestions.
	        replace('%PREFIX%', this.cssClasses.prefix).
	        replace('%SUGGESTIONS%', this.cssClasses.suggestions);
	      $suggestions = DOM.element(suggestionsHtml).css(css.suggestions);
	
	      // jQuery#append doesn't support arrays as the first argument
	      // until version 1.8, see http://bugs.jquery.com/ticket/11231
	      nodes = _.map(suggestions, getSuggestionNode);
	      $suggestions.append.apply($suggestions, nodes);
	
	      return $suggestions;
	
	      function getSuggestionNode(suggestion) {
	        var $el;
	
	        var suggestionHtml = html.suggestion.
	          replace('%PREFIX%', self.cssClasses.prefix).
	          replace('%SUGGESTION%', self.cssClasses.suggestion);
	        $el = DOM.element(suggestionHtml)
	          .append(that.templates.suggestion.apply(this, [suggestion].concat(args)));
	
	        $el.data(datasetKey, that.name);
	        $el.data(valueKey, that.displayFn(suggestion) || undefined); // this led to undefined return value
	        $el.data(datumKey, JSON.stringify(suggestion));
	        $el.children().each(function() { DOM.element(this).css(css.suggestionChild); });
	
	        return $el;
	      }
	    }
	
	    function getHeaderHtml() {
	      var args = [].slice.call(arguments, 0);
	      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
	      return that.templates.header.apply(this, args);
	    }
	
	    function getFooterHtml() {
	      var args = [].slice.call(arguments, 0);
	      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
	      return that.templates.footer.apply(this, args);
	    }
	  },
	
	  // ### public
	
	  getRoot: function getRoot() {
	    return this.$el;
	  },
	
	  update: function update(query) {
	    var that = this;
	
	    this.query = query;
	    this.canceled = false;
	    this.source(query, render);
	
	    function render(suggestions) {
	      // if the update has been canceled or if the query has changed
	      // do not render the suggestions as they've become outdated
	      if (!that.canceled && query === that.query) {
	        // concat all the other arguments that could have been passed
	        // to the render function, and forward them to _render
	        var args = [].slice.call(arguments, 1);
	        args = [query, suggestions].concat(args);
	        that._render.apply(that, args);
	      }
	    }
	  },
	
	  cancel: function cancel() {
	    this.canceled = true;
	  },
	
	  clear: function clear() {
	    this.cancel();
	    this.$el.empty();
	    this.trigger('rendered');
	  },
	
	  isEmpty: function isEmpty() {
	    return this.$el.is(':empty');
	  },
	
	  destroy: function destroy() {
	    this.$el = null;
	  }
	});
	
	// helper functions
	// ----------------
	
	function getDisplayFn(display) {
	  display = display || 'value';
	
	  return _.isFunction(display) ? display : displayFn;
	
	  function displayFn(obj) {
	    return obj[display];
	  }
	}
	
	function getTemplates(templates, displayFn) {
	  return {
	    empty: templates.empty && _.templatify(templates.empty),
	    header: templates.header && _.templatify(templates.header),
	    footer: templates.footer && _.templatify(templates.footer),
	    suggestion: templates.suggestion || suggestionTemplate
	  };
	
	  function suggestionTemplate(context) {
	    return '<p>' + displayFn(context) + '</p>';
	  }
	}
	
	function isValidName(str) {
	  // dashes, underscores, letters, and numbers
	  return (/^[_a-zA-Z0-9-]+$/).test(str);
	}
	
	module.exports = Dataset;


/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  wrapper: '<span class="%ROOT%"></span>',
	  dropdown: '<span class="%PREFIX%-%DROPDOWN_MENU%"></span>',
	  dataset: '<div class="%PREFIX%-%DATASET%-%CLASS%"></div>',
	  suggestions: '<span class="%PREFIX%-%SUGGESTIONS%"></span>',
	  suggestion: '<div class="%PREFIX%-%SUGGESTION%"></div>'
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(99);
	
	var css = {
	  wrapper: {
	    position: 'relative',
	    display: 'inline-block'
	  },
	  hint: {
	    position: 'absolute',
	    top: '0',
	    left: '0',
	    borderColor: 'transparent',
	    boxShadow: 'none',
	    // #741: fix hint opacity issue on iOS
	    opacity: '1'
	  },
	  input: {
	    position: 'relative',
	    verticalAlign: 'top',
	    backgroundColor: 'transparent'
	  },
	  inputWithNoHint: {
	    position: 'relative',
	    verticalAlign: 'top'
	  },
	  dropdown: {
	    position: 'absolute',
	    top: '100%',
	    left: '0',
	    zIndex: '100',
	    display: 'none'
	  },
	  suggestions: {
	    display: 'block'
	  },
	  suggestion: {
	    whiteSpace: 'nowrap',
	    cursor: 'pointer'
	  },
	  suggestionChild: {
	    whiteSpace: 'normal'
	  },
	  ltr: {
	    left: '0',
	    right: 'auto'
	  },
	  rtl: {
	    left: 'auto',
	    right: '0'
	  },
	  defaultClasses: {
	    root: 'algolia-autocomplete',
	    prefix: 'aa',
	    dropdownMenu: 'dropdown-menu',
	    input: 'input',
	    hint: 'hint',
	    suggestions: 'suggestions',
	    suggestion: 'suggestion',
	    cursor: 'cursor',
	    dataset: 'dataset'
	  }
	};
	
	// ie specific styling
	if (_.isMsie()) {
	  // ie6-8 (and 9?) doesn't fire hover and click events for elements with
	  // transparent backgrounds, for a workaround, use 1x1 transparent gif
	  _.mixin(css.input, {
	    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
	  });
	}
	
	// ie7 and under specific styling
	if (_.isMsie() && _.isMsie() <= 7) {
	  // if someone can tell me why this is necessary to align
	  // the hint with the query in ie7, i'll send you $5 - @JakeHarding
	  _.mixin(css.input, {marginTop: '-1px'});
	}
	
	module.exports = css;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  hits: __webpack_require__(110),
	  popularIn: __webpack_require__(111)
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(99);
	
	module.exports = function search(index, params) {
	  return sourceFn;
	
	  function sourceFn(query, cb) {
	    index.search(query, params, function(error, content) {
	      if (error) {
	        _.error(error.message);
	        return;
	      }
	      cb(content.hits, content);
	    });
	  }
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(99);
	
	module.exports = function popularIn(index, params, details, options) {
	  if (!details.source) {
	    return _.error("Missing 'source' key");
	  }
	  var source = _.isFunction(details.source) ? details.source : function(hit) { return hit[details.source]; };
	
	  if (!details.index) {
	    return _.error("Missing 'index' key");
	  }
	  var detailsIndex = details.index;
	
	  options = options || {};
	
	  return sourceFn;
	
	  function sourceFn(query, cb) {
	    index.search(query, params, function(error, content) {
	      if (error) {
	        _.error(error.message);
	        return;
	      }
	
	      if (content.hits.length > 0) {
	        var first = content.hits[0];
	
	        var detailsParams = _.mixin({hitsPerPage: 0}, details);
	        delete detailsParams.source; // not a query parameter
	        delete detailsParams.index; // not a query parameter
	
	        detailsIndex.search(source(first), detailsParams, function(error2, content2) {
	          if (error2) {
	            _.error(error2.message);
	            return;
	          }
	
	          var suggestions = [];
	
	          // add the 'all department' entry before others
	          if (options.includeAll) {
	            var label = options.allTitle || 'All departments';
	            suggestions.push(_.mixin({
	              facet: {value: label, count: content2.nbHits}
	            }, _.cloneDeep(first)));
	          }
	
	          // enrich the first hit iterating over the facets
	          _.each(content2.facets, function(values, facet) {
	            _.each(values, function(count, value) {
	              suggestions.push(_.mixin({
	                facet: {facet: facet, value: value, count: count}
	              }, _.cloneDeep(first)));
	            });
	          });
	
	          // append all other hits
	          for (var i = 1; i < content.hits.length; ++i) {
	            suggestions.push(content.hits[i]);
	          }
	
	          cb(suggestions, content);
	        });
	
	        return;
	      }
	
	      cb([]);
	    });
	  }
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = formatHit;
	
	var _findCountryCode = __webpack_require__(113);
	
	var _findCountryCode2 = _interopRequireDefault(_findCountryCode);
	
	var _findType = __webpack_require__(114);
	
	var _findType2 = _interopRequireDefault(_findType);
	
	var _formatInputValue = __webpack_require__(115);
	
	var _formatInputValue2 = _interopRequireDefault(_formatInputValue);
	
	var _formatDropdownValue = __webpack_require__(116);
	
	var _formatDropdownValue2 = _interopRequireDefault(_formatDropdownValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function formatHit(hit, hitIndex) {
	  try {
	    var administrative = hit.administrative && hit.administrative[0] !== hit.locale_names[0] ? hit.administrative[0] : undefined;
	
	    var suggestion = {
	      administrative: administrative,
	      city: hit.city && hit.city[0],
	      country: hit.country,
	      countryCode: (0, _findCountryCode2.default)(hit._tags),
	      type: (0, _findType2.default)(hit._tags),
	      latlng: {
	        lat: hit._geoloc.lat,
	        lng: hit._geoloc.lng
	      },
	      postcode: hit.postcode && hit.postcode[0],
	      name: hit.locale_names[0].trim() // trim should be done in data, waiting for a fix in Places API
	    };
	
	    // this is the value to put inside the <input value=
	    var value = (0, _formatInputValue2.default)(suggestion);
	    var dropdownValue = (0, _formatDropdownValue2.default)(_extends({}, suggestion, {
	      name: hit._highlightResult.locale_names[0].value.trim()
	    }));
	
	    return _extends({}, suggestion, {
	      value: value,
	      _dropdownValue: dropdownValue,
	      _index: hitIndex
	    });
	  } catch (e) {
	    /* eslint no-console: 0 */
	    console.error('Could not parse object', hit);
	    console.error(e);
	    return {
	      inputValue: 'Could not parse object',
	      _dropdownHTMLFormatted: 'Could not parse object'
	    };
	  }
	}

/***/ },
/* 113 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = findCountryCode;
	function findCountryCode(tags) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var tag = _step.value;
	
	      var find = tag.match(/country\/(.*)?/);
	      if (find) {
	        return find[1];
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

/***/ },
/* 114 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = findType;
	function findType(tags) {
	  var types = ['country', 'city', 'address'];
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var type = _step.value;
	
	      if (tags.indexOf(type) !== -1) {
	        return type;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = formatInputValue;
	function formatInputValue(_ref) {
	  var administrative = _ref.administrative;
	  var city = _ref.city;
	  var country = _ref.country;
	  var type = _ref.type;
	  var name = _ref.name;
	
	  var out = (name + '\n' + (type !== 'city' ? ' ' + city + ',' : '') + '\n ' + (administrative ? administrative + ',' : '') + '\n ' + country).replace(/\n/g, '');
	
	  return out;
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = formatDropdownValue;
	
	var _address = __webpack_require__(117);
	
	var _address2 = _interopRequireDefault(_address);
	
	var _city = __webpack_require__(118);
	
	var _city2 = _interopRequireDefault(_city);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function formatDropdownValue(_ref) {
	  var administrative = _ref.administrative;
	  var city = _ref.city;
	  var country = _ref.country;
	  var type = _ref.type;
	  var name = _ref.name;
	
	  var out = ('<span class="ap-suggestion-icon">' + (type === 'city' ? _city2.default.trim() : _address2.default.trim()) + '</span>\n<span class="ap-name">' + name + '</span> <span class="ap-address">\n' + (type !== 'city' ? city + ',' : '') + '\n ' + (administrative ? administrative + ',' : '') + '\n ' + country + '</span>').replace(/\n/g, '');
	
	  return out;
	}

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n"

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"19\" viewBox=\"0 0 18 19\"><path d=\"M12 9V3L9 0 6 3v2H0v14h18V9h-6zm-8 8H2v-2h2v2zm0-4H2v-2h2v2zm0-4H2V7h2v2zm6 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm0-4H8V3h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z\"/></svg>\n"

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(120);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(122)(content, {"insertAt":"top"});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./places.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./places.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(121)();
	// imports
	
	
	// module
	exports.push([module.id, ".algolia-places.algolia-places-styled {\n  width: 100%; }\n  .algolia-places.algolia-places-styled .ap-input, .algolia-places.algolia-places-styled .ap-hint {\n    width: 100%; }\n  .algolia-places.algolia-places-styled .ap-input:hover ~ .ap-input-icon svg,\n  .algolia-places.algolia-places-styled .ap-input:focus ~ .ap-input-icon svg,\n  .algolia-places.algolia-places-styled .ap-input-icon:hover svg {\n    fill: #aaaaaa; }\n  .algolia-places.algolia-places-styled .ap-dropdown-menu {\n    width: 100%;\n    background: #ffffff;\n    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n    border-radius: 3px;\n    margin-top: 3px;\n    overflow: hidden; }\n  .algolia-places.algolia-places-styled .ap-suggestion {\n    cursor: pointer;\n    height: 46px;\n    line-height: 46px;\n    padding-left: 18px;\n    overflow: hidden; }\n    .algolia-places.algolia-places-styled .ap-suggestion em {\n      font-weight: bold;\n      font-style: normal; }\n  .algolia-places.algolia-places-styled .ap-address {\n    font-size: smaller;\n    margin-left: 12px;\n    color: #aaaaaa; }\n  .algolia-places.algolia-places-styled .ap-suggestion-icon {\n    margin-right: 10px;\n    width: 14px;\n    height: 20px;\n    vertical-align: middle; }\n    .algolia-places.algolia-places-styled .ap-suggestion-icon svg {\n      transform: scale(0.9) translateY(2px);\n      fill: #cfcfcf; }\n  .algolia-places.algolia-places-styled .ap-input-icon {\n    border: 0;\n    background: transparent;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 16px;\n    outline: none; }\n    .algolia-places.algolia-places-styled .ap-input-icon svg {\n      fill: #cfcfcf;\n      position: absolute;\n      top: 50%;\n      right: 0;\n      transform: translateY(-50%); }\n  .algolia-places.algolia-places-styled .ap-cursor {\n    background: #efefef; }\n    .algolia-places.algolia-places-styled .ap-cursor .ap-suggestion-icon svg {\n      transform: scale(1);\n      fill: #aaaaaa; }\n  .algolia-places.algolia-places-styled .ap-footer {\n    opacity: .8;\n    text-align: right;\n    padding: .5em 1em .5em 0;\n    font-size: 12px;\n    line-height: 12px; }\n    .algolia-places.algolia-places-styled .ap-footer a {\n      color: inherit;\n      text-decoration: none; }\n      .algolia-places.algolia-places-styled .ap-footer a svg {\n        vertical-align: middle; }\n    .algolia-places.algolia-places-styled .ap-footer:hover {\n      opacity: 1; }\n", ""]);
	
	// exports


/***/ },
/* 121 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z\"/></svg>\n"

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg width=\"38px\" height=\"12px\" viewBox=\"0 0 38 12\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 3.7 (28169) - http://www.bohemiancoding.com/sketch -->\n    <title>Group</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"Group\">\n            <path d=\"M22.7598077,4.31665385 L22.2614231,6.11142308 L23.8669231,5.21769231 C23.6330769,4.78288462 23.2355385,4.45476923 22.7598077,4.31738462 L22.7598077,4.31665385 Z M18.8246154,6.14942308 C18.8246154,8.07134615 20.3563077,9.63080769 22.2482692,9.63080769 C24.1387692,9.63080769 25.6719231,8.06696154 25.6719231,6.14503846 C25.6719231,4.22311538 24.1387692,2.66657692 22.2482692,2.66657692 C20.3555769,2.66657692 18.8238846,4.22311538 18.8238846,6.14503846 L18.8246154,6.14942308 Z M22.2482692,3.66261538 C23.5958077,3.66261538 24.6941538,4.77776923 24.6941538,6.14723077 C24.6941538,7.51815385 23.5950769,8.63403846 22.2460769,8.63403846 C20.8992692,8.63403846 19.8016538,7.51815385 19.8016538,6.14942308 C19.8016538,4.77776923 20.8992692,3.66261538 22.2497308,3.66261538 L22.2482692,3.66261538 Z M23.4284615,2.23615385 C23.4284615,2.21642308 23.4321154,2.204 23.4321154,2.19084615 L23.4321154,1.87661538 C23.4321154,1.5295 23.1573462,1.24815385 22.8182692,1.24815385 L21.7425769,1.24815385 C21.4027692,1.24815385 21.1287308,1.52365385 21.1287308,1.86930769 L21.1287308,2.17842308 C21.4707308,2.07611538 21.8317308,2.02496154 22.2029615,2.02496154 C22.6311923,2.02496154 23.0418846,2.09073077 23.4284615,2.22957692 L23.4284615,2.23615385 Z M19.6737692,2.84561538 C19.4340769,2.60153846 19.0453077,2.60153846 18.8056154,2.84561538 L18.696,2.95523077 C18.4570385,3.19857692 18.4570385,3.59684615 18.696,3.84092308 L18.8114615,3.95638462 C19.0599231,3.55226923 19.3741538,3.19857692 19.7358846,2.90407692 L19.6745,2.83830769 L19.6737692,2.84561538 Z\" id=\"Shape\" fill=\"#00B7E5\"></path>\n            <path d=\"M6.68653846,9.28076923 C6.54476923,8.91757692 6.41323077,8.56096154 6.29046154,8.21019231 L5.90461538,7.13961538 L2.02934615,7.13961538 L1.24961538,9.28076923 L0,9.28076923 C0.328846154,8.39434615 0.638692308,7.57369231 0.926615385,6.821 C1.216,6.06684615 1.49661538,5.35215385 1.77284615,4.67546154 C2.05053846,3.99584615 2.32676923,3.35276923 2.59715385,2.73673077 C2.87046154,2.12069231 3.15253846,1.5105 3.45215385,0.900307692 L4.5505,0.900307692 C4.84573077,1.50392308 5.13146154,2.11338462 5.40257692,2.73015385 C5.67515385,3.34619231 5.94846154,3.98853846 6.22469231,4.66888462 C6.50019231,5.34119231 6.783,6.05734615 7.07238462,6.81003846 C7.35957692,7.56273077 7.66869231,8.38119231 7.999,9.26542308 L6.688,9.26542308 L6.68580769,9.25811538 L6.68653846,9.28076923 Z M5.56115385,6.175 C5.29515385,5.47346154 5.035,4.79384615 4.77557692,4.13907692 C4.51834615,3.48138462 4.24942308,2.85146154 3.96661538,2.24638462 C3.67723077,2.85438462 3.40757692,3.48430769 3.1445,4.14053846 C2.88873077,4.79823077 2.6315,5.47565385 2.37426923,6.17719231 L5.56042308,6.17719231 L5.56042308,6.175 L5.56115385,6.175 Z M11.2648077,9.69876923 C10.5603462,9.68196154 10.0605,9.53069231 9.76526923,9.24569231 C9.47003846,8.96069231 9.32315385,8.51346154 9.32315385,7.90984615 L9.32315385,0.266 L10.469,0.0686923077 L10.469,7.72715385 C10.469,7.91423077 10.4836154,8.06915385 10.5157692,8.19192308 C10.5486538,8.31396154 10.602,8.41115385 10.6750769,8.48715385 C10.7518077,8.55876923 10.8548462,8.61576923 10.9768846,8.65084615 C11.1011154,8.68592308 11.2545769,8.71661538 11.4372692,8.74219231 L11.2765,9.6995 L11.2648077,9.69876923 Z M16.5380385,8.78092308 C16.4430385,8.84669231 16.2530385,8.92853846 15.9753462,9.03084615 C15.6976538,9.13315385 15.3688077,9.18211538 14.9888077,9.18211538 C14.6088077,9.18211538 14.2434231,9.12365385 13.9072692,9.00088462 C13.5711154,8.87884615 13.2715,8.68957692 13.0230385,8.43234615 C12.7745769,8.17657692 12.5772692,7.85503846 12.4311154,7.47503846 C12.2849615,7.09503846 12.2118846,6.63465385 12.2118846,6.1085 C12.2118846,5.64080769 12.2776538,5.21696154 12.4165,4.83696154 C12.5553462,4.44965385 12.7599615,4.1135 13.0230385,3.83580769 C13.2861154,3.55080769 13.6076538,3.33157692 13.9949615,3.17811538 C14.3749615,3.01734615 14.8061154,2.93696154 15.2884231,2.93696154 C15.8145769,2.93696154 16.2749615,2.9735 16.6768846,3.05388462 C17.0693077,3.12696154 17.4032692,3.20734615 17.6729231,3.27311538 L17.6729231,8.93657692 C17.6729231,9.9085 17.4171538,10.6246538 16.9129231,11.0631154 C16.4050385,11.5015769 15.6413846,11.7208077 14.6139231,11.7208077 C14.2171154,11.7208077 13.8393077,11.6842692 13.4848846,11.6258077 C13.1268077,11.5600385 12.8257308,11.4796538 12.5619231,11.3919615 L12.768,10.3981154 C12.9908846,10.4858077 13.2722308,10.5661923 13.6010769,10.6319615 C13.9299231,10.6977308 14.2748462,10.7415769 14.6278077,10.7415769 C15.3001154,10.7415769 15.7897308,10.6100385 16.0842308,10.3396538 C16.3809231,10.0692692 16.5336538,9.63811538 16.5336538,9.0535 L16.5336538,8.77580769 L16.5380385,8.78092308 Z M16.0703462,3.97538462 C15.8803462,3.94615385 15.6245769,3.93153846 15.2957308,3.93153846 C14.6891923,3.93153846 14.2141923,4.13176923 13.8853462,4.53076923 C13.5565,4.92903846 13.3957308,5.45884615 13.3957308,6.11653846 C13.3957308,6.48411538 13.4395769,6.79615385 13.5345769,7.05923077 C13.6295769,7.32230769 13.7538077,7.53934615 13.9145769,7.70669231 C14.0753462,7.87988462 14.2580385,8.0085 14.4626538,8.08523077 C14.6745769,8.16853846 14.8865,8.20726923 15.1057308,8.20726923 C15.4053462,8.20726923 15.6830385,8.17073077 15.9388077,8.08303846 C16.1945769,8.00265385 16.3918846,7.90765385 16.5380385,7.79073077 L16.5380385,4.07038462 C16.4284231,4.03823077 16.2749615,4.00753846 16.0776538,3.97903846 L16.0703462,3.97538462 Z M28.4568846,9.69876923 C27.7553462,9.68196154 27.2511154,9.53069231 26.9588077,9.24569231 C26.6665,8.96069231 26.5203462,8.51346154 26.5203462,7.90984615 L26.5203462,0.266 L27.6676538,0.0686923077 L27.6676538,7.72715385 C27.6676538,7.91423077 27.6822692,8.06915385 27.7188077,8.19192308 C27.7553462,8.31396154 27.8065,8.41115385 27.8722692,8.48423077 C27.9453462,8.56242308 28.0476538,8.61357692 28.1718846,8.65230769 C28.2961154,8.69103846 28.4495769,8.721 28.6322692,8.74365385 L28.4715,9.6995 L28.4568846,9.69876923 Z M30.7222692,1.52730769 C30.4884231,1.52730769 30.2911154,1.45788462 30.1303462,1.31976923 C29.9622692,1.18092308 29.8818846,0.996038462 29.8818846,0.762923077 C29.8818846,0.529076923 29.9622692,0.342730769 30.1303462,0.205346154 C30.2911154,0.0738076923 30.4884231,0.000730769231 30.7222692,0.000730769231 C30.9561154,0.000730769231 31.1534231,0.0738076923 31.3215,0.205346154 C31.4822692,0.344192308 31.5699615,0.534192308 31.5699615,0.768038462 C31.5699615,1.00188462 31.4895769,1.19188462 31.3215,1.32342308 C31.1607308,1.46226923 30.9561154,1.53534615 30.7281154,1.53534615 L30.7222692,1.52730769 Z M30.0865,2.70238462 L31.3872692,2.70238462 L31.3872692,9.21061538 L30.0791923,9.21061538 L30.0791923,2.70238462 L30.0865,2.70238462 Z M35.3918846,2.51238462 C35.8595769,2.51238462 36.2468846,2.57523077 36.5684231,2.70092308 C36.8899615,2.82807692 37.1457308,3.00638462 37.3430385,3.23730769 C37.5330385,3.46238462 37.6791923,3.73788462 37.7595769,4.05869231 C37.8472692,4.37292308 37.8838077,4.72661538 37.8838077,5.111 L37.8838077,9.36188462 L37.4672692,9.43496154 C37.2918846,9.4715 37.0799615,9.49342308 36.8607308,9.52265385 C36.6415,9.55188462 36.3930385,9.57380769 36.1299615,9.59573077 C35.8668846,9.61765385 35.6038077,9.63226923 35.3480385,9.63226923 C34.9826538,9.63226923 34.6450385,9.59573077 34.3373846,9.51534615 C34.0304615,9.44226923 33.7659231,9.31073077 33.5408462,9.14265385 C33.3186923,8.97457692 33.1462308,8.74803846 33.0183462,8.46303846 C32.8911923,8.18534615 32.8283462,7.84919231 32.8283462,7.45457692 C32.8283462,7.07457692 32.9014231,6.75303846 33.0475769,6.48996154 C33.1915385,6.21957692 33.3888462,6.00034615 33.6395,5.83957692 C33.8901538,5.67880769 34.1802692,5.55457692 34.5127692,5.47419231 C34.8438077,5.40111538 35.1923846,5.35726923 35.5577692,5.35726923 C35.6746923,5.35726923 35.796,5.36457692 35.9231538,5.377 C36.0473846,5.39161538 36.1643077,5.40988462 36.2761154,5.42815385 L36.5698846,5.48661538 L36.7416154,5.52680769 L36.7416154,5.18334615 C36.7416154,4.98603846 36.7226154,4.78142308 36.6802308,4.58630769 C36.6363846,4.389 36.5618462,4.21361538 36.4536923,4.06234615 C36.3440769,3.91107692 36.1979231,3.78830769 36.0137692,3.69696154 C35.8193846,3.60561538 35.5753077,3.55811538 35.2800769,3.55811538 C34.8949615,3.55811538 34.561,3.591 34.2738077,3.64580769 C33.9888077,3.70426923 33.7695769,3.76273077 33.6307308,3.82557692 L33.4940769,2.82442308 C33.6446154,2.75134615 33.8916154,2.68557692 34.2467692,2.61980769 C34.5902308,2.55257692 34.9702308,2.5175 35.3794615,2.5175 L35.3838462,2.5175 L35.3918846,2.51238462 Z M35.4941923,8.60992308 C35.7718846,8.60992308 36.0130385,8.60115385 36.2249615,8.58946154 C36.4368846,8.5785 36.6122692,8.55438462 36.7511154,8.52003846 L36.7511154,6.48923077 C36.6707308,6.44538462 36.5318846,6.40884615 36.3418846,6.37815385 C36.1591923,6.34746154 35.9253462,6.33211538 35.6622692,6.33211538 C35.4941923,6.33211538 35.3041923,6.34526923 35.1141923,6.37084615 C34.9241923,6.39788462 34.7415,6.45123077 34.5734231,6.53526923 C34.4126538,6.61857692 34.2738077,6.73111538 34.1715,6.87507692 C34.0618846,7.01903846 34.0092692,7.20903846 34.0092692,7.44507692 C34.0092692,7.88061538 34.1466538,8.18315385 34.4111923,8.35342308 C34.6742692,8.5215 35.0396538,8.60919231 35.4978462,8.60919231 L35.4934615,8.60919231 L35.4941923,8.60992308 Z\" id=\"Shape\" fill=\"#2B395C\"></path>\n        </g>\n    </g>\n</svg>"

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\">\n  <path fill=\"#797979\" fill-rule=\"evenodd\" d=\"M6.577.5L5.304.005 2.627 1.02 0 0l.992 2.767-.986 2.685.998 2.76-1 2.717.613.22 3.39-3.45.563.06.726-.69s-.717-.92-.91-1.86c.193-.146.184-.14.355-.285C4.1 1.93 6.58.5 6.58.5zm-4.17 11.354l.22.12 2.68-1.05 2.62 1.04 2.644-1.03 1.02-2.717-.33-.944s-1.13 1.26-3.44.878c-.174.29-.25.37-.25.37s-1.11-.31-1.683-.89c-.573.58-.795.71-.795.71l.08.634-2.76 2.89zm6.26-4.395c1.817 0 3.29-1.53 3.29-3.4 0-1.88-1.473-3.4-3.29-3.4s-3.29 1.52-3.29 3.4c0 1.87 1.473 3.4 3.29 3.4z\"/>\n</svg>\n"

/***/ },
/* 126 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '0.0.17';

/***/ }
/******/ ])
});
;
//# sourceMappingURL=places.js.map