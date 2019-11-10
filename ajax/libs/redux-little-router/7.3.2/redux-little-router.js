(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxLittleRouter"] = factory(require("react"));
	else
		root["ReduxLittleRouter"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_30__) {
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createMatcher = exports.locationDidChange = exports.routerReducer = exports.GO_BACK = exports.GO_FORWARD = exports.GO = exports.REPLACE = exports.PUSH = exports.LOCATION_CHANGED = exports.Fragment = exports.PersistentQueryLink = exports.Link = exports.RouterProvider = exports.provideRouter = exports.initializeCurrentLocation = exports.createStoreWithRouter = undefined;
	
	var _storeEnhancer = __webpack_require__(1);
	
	var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);
	
	var _provider = __webpack_require__(29);
	
	var _provider2 = _interopRequireDefault(_provider);
	
	var _link = __webpack_require__(31);
	
	var _fragment = __webpack_require__(32);
	
	var _fragment2 = _interopRequireDefault(_fragment);
	
	var _reducer = __webpack_require__(27);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	var _createMatcher = __webpack_require__(24);
	
	var _createMatcher2 = _interopRequireDefault(_createMatcher);
	
	var _actionTypes = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.createStoreWithRouter = _storeEnhancer2.default;
	exports.initializeCurrentLocation = _storeEnhancer.initializeCurrentLocation;
	exports.provideRouter = _provider2.default;
	exports.RouterProvider = _provider.RouterProvider;
	exports.Link = _link.Link;
	exports.PersistentQueryLink = _link.PersistentQueryLink;
	exports.Fragment = _fragment2.default;
	exports.LOCATION_CHANGED = _actionTypes.LOCATION_CHANGED;
	exports.PUSH = _actionTypes.PUSH;
	exports.REPLACE = _actionTypes.REPLACE;
	exports.GO = _actionTypes.GO;
	exports.GO_FORWARD = _actionTypes.GO_FORWARD;
	exports.GO_BACK = _actionTypes.GO_BACK;
	exports.routerReducer = _reducer2.default;
	exports.locationDidChange = _storeEnhancer.locationDidChange;
	exports.createMatcher = _createMatcher2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initializeCurrentLocation = exports.locationDidChange = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createBrowserHistory = __webpack_require__(2);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _createMemoryHistory = __webpack_require__(17);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	var _useBasename = __webpack_require__(18);
	
	var _useBasename2 = _interopRequireDefault(_useBasename);
	
	var _useQueries = __webpack_require__(19);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _actionTypes = __webpack_require__(23);
	
	var _createMatcher = __webpack_require__(24);
	
	var _createMatcher2 = _interopRequireDefault(_createMatcher);
	
	var _reducer = __webpack_require__(27);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	var _initialRouterState = __webpack_require__(28);
	
	var _initialRouterState2 = _interopRequireDefault(_initialRouterState);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var README_MESSAGE = '\n  See the README for more information:\n  https://github.com/FormidableLabs/redux-little-router#wiring-up-the-boilerplate\n';
	
	var locationDidChange = exports.locationDidChange = function locationDidChange(_ref) {
	  var location = _ref.location;
	  var matchRoute = _ref.matchRoute;
	
	  // Extract the pathname so that we don't match against the basename.
	  // This avoids requiring basename-hardcoded routes.
	  var pathname = location.pathname;
	
	
	  return {
	    type: _actionTypes.LOCATION_CHANGED,
	    payload: _extends({}, location, matchRoute(pathname))
	  };
	};
	
	var initializeCurrentLocation = exports.initializeCurrentLocation = function initializeCurrentLocation(location) {
	  return {
	    type: _actionTypes.LOCATION_CHANGED,
	    payload: location
	  };
	};
	
	var resolveHistory = function resolveHistory(_ref2) {
	  var basename = _ref2.basename;
	  var forServerRender = _ref2.forServerRender;
	
	  var historyFactory = forServerRender ? _createMemoryHistory2.default : _createBrowserHistory2.default;
	
	  return (0, _useBasename2.default)((0, _useQueries2.default)(historyFactory))({
	    basename: basename
	  });
	};
	
	exports.default = function (_ref3) {
	  var routes = _ref3.routes;
	  var pathname = _ref3.pathname;
	  var query = _ref3.query;
	  var _ref3$basename = _ref3.basename;
	  var basename = _ref3$basename === undefined ? '' : _ref3$basename;
	  var _ref3$forServerRender = _ref3.forServerRender;
	  var forServerRender = _ref3$forServerRender === undefined ? false : _ref3$forServerRender;
	  var _ref3$createMatcher = _ref3.createMatcher;
	  var createMatcher = _ref3$createMatcher === undefined ? _createMatcher2.default : _ref3$createMatcher;
	  var userHistory = _ref3.history;
	
	  if (!routes) {
	    throw Error('\n      Missing route configuration. You must define your routes as\n      an object where the keys are routes and the values are any\n      route-specific data.\n\n      ' + README_MESSAGE + '\n    ');
	  }
	
	  // eslint-disable-next-line no-magic-numbers
	  if (!Object.keys(routes).every(function (route) {
	    return route.indexOf('/') === 0;
	  })) {
	    throw Error('\n      The route configuration you provided is malformed. Make sure\n      that all of your routes start with a slash.\n\n      ' + README_MESSAGE + '\n    ');
	  }
	
	  var history = userHistory || resolveHistory({
	    basename: basename, forServerRender: forServerRender
	  });
	
	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var enhancedReducer = function enhancedReducer(state, action) {
	        var vanillaState = _extends({}, state);
	        delete vanillaState.router;
	
	        var newState = reducer(vanillaState, action);
	
	        // Support redux-loop
	        if (Array.isArray(newState)) {
	          var nextState = newState[0]; // eslint-disable-line no-magic-numbers
	          var nextEffects = newState[1]; // eslint-disable-line no-magic-numbers
	          return [_extends({}, nextState, {
	            router: (0, _reducer2.default)(state && state.router, action)
	          }), nextEffects];
	        }
	
	        return _extends({}, reducer(vanillaState, action), {
	          router: (0, _reducer2.default)(state && state.router, action)
	        });
	      };
	
	      var store = createStore(enhancedReducer, pathname || query ? _extends({}, initialState, {
	        router: (0, _initialRouterState2.default)({
	          pathname: pathname, query: query || {}, routes: routes, history: history
	        }) }) : initialState, enhancer);
	
	      var matchRoute = createMatcher(routes);
	      history.listen(function (location) {
	        if (location) {
	          store.dispatch(locationDidChange({
	            location: location, matchRoute: matchRoute
	          }));
	        }
	      });
	
	      var dispatch = function dispatch(action) {
	        switch (action.type) {
	          case _actionTypes.PUSH:
	            history.push(action.payload);
	            return null;
	          case _actionTypes.REPLACE:
	            history.replace(action.payload);
	            return null;
	          case _actionTypes.GO:
	            history.go(action.payload);
	            return null;
	          case _actionTypes.GO_BACK:
	            history.goBack();
	            return null;
	          case _actionTypes.GO_FORWARD:
	            history.goForward();
	            return null;
	          default:
	            // We return the result of dispatch here
	            // to retain compatibility with enhancers
	            // that return a promise from dispatch.
	            return store.dispatch(action);
	        }
	      };
	
	      return _extends({}, store, { dispatch: dispatch, history: history, matchRoute: matchRoute });
	    };
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(4);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(5);
	
	var _BrowserProtocol = __webpack_require__(6);
	
	var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);
	
	var _RefreshProtocol = __webpack_require__(13);
	
	var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);
	
	var _DOMUtils = __webpack_require__(11);
	
	var _createHistory = __webpack_require__(14);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve clean URLs. You can force this
	 * behavior using { forceRefresh: true } in options.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;
	
	  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
	  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;
	
	  var getUserConfirmation = Protocol.getUserConfirmation;
	  var getCurrentLocation = Protocol.getCurrentLocation;
	  var pushLocation = Protocol.pushLocation;
	  var replaceLocation = Protocol.replaceLocation;
	  var go = Protocol.go;
	
	
	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));
	
	  var listenerCount = 0,
	      stopListener = void 0;
	
	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);
	
	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopListener();
	    };
	  };
	
	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };
	
	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen
	  });
	};
	
	exports.default = createBrowserHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;
	
	var _LocationUtils = __webpack_require__(7);
	
	var _DOMUtils = __webpack_require__(11);
	
	var _DOMStateStorage = __webpack_require__(12);
	
	var _PathUtils = __webpack_require__(8);
	
	/* eslint-disable no-alert */
	
	
	var PopStateEvent = 'popstate';
	
	var _createLocation = function _createLocation(historyState) {
	  var key = historyState && historyState.key;
	
	  return (0, _LocationUtils.createLocation)({
	    pathname: window.location.pathname,
	    search: window.location.search,
	    hash: window.location.hash,
	    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
	  }, undefined, key);
	};
	
	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  var historyState = void 0;
	  try {
	    historyState = window.history.state || {};
	  } catch (error) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/mjackson/history/pull/289
	    historyState = {};
	  }
	
	  return _createLocation(historyState);
	};
	
	var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
	  return callback(window.confirm(message));
	};
	
	var startListener = exports.startListener = function startListener(listener) {
	  var handlePopState = function handlePopState(event) {
	    if (event.state !== undefined) // Ignore extraneous popstate events in WebKit
	      listener(_createLocation(event.state));
	  };
	
	  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);
	
	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);
	  };
	};
	
	var updateLocation = function updateLocation(location, updateState) {
	  var state = location.state;
	  var key = location.key;
	
	
	  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);
	
	  updateState({ key: key }, (0, _PathUtils.createPath)(location));
	};
	
	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.pushState(state, null, path);
	  });
	};
	
	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.replaceState(state, null, path);
	  });
	};
	
	var go = exports.go = function go(n) {
	  if (n) window.history.go(n);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(4);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PathUtils = __webpack_require__(8);
	
	var _Actions = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createQuery = exports.createQuery = function createQuery(props) {
	  return _extends(Object.create(null), props);
	};
	
	var createLocation = exports.createLocation = function createLocation() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;
	
	  var pathname = object.pathname || '/';
	  var search = object.search || '';
	  var hash = object.hash || '';
	  var state = object.state;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	};
	
	var isDate = function isDate(object) {
	  return Object.prototype.toString.call(object) === '[object Date]';
	};
	
	var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
	  if (a === b) return true;
	
	  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);
	
	  if (typeofA !== typeofB) return false;
	
	  !(typeofA !== 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;
	
	  // Not the same object, but same type.
	  if (typeofA === 'object') {
	    !!(isDate(a) && isDate(b)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;
	
	    if (!Array.isArray(a)) return Object.keys(a).every(function (key) {
	      return statesAreEqual(a[key], b[key]);
	    });
	
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return statesAreEqual(item, b[index]);
	    });
	  }
	
	  // All other serializable types (string, number, boolean)
	  // should be strict equal.
	  return false;
	};
	
	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.key === b.key &&
	  // a.action === b.action && // Different action !== location change.
	  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = exports.isAbsolutePath = undefined;
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isAbsolutePath = exports.isAbsolutePath = function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	};
	
	var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
	  var _parsePath = parsePath(path);
	
	  var pathname = _parsePath.pathname;
	  var search = _parsePath.search;
	  var hash = _parsePath.hash;
	
	
	  return createPath({
	    pathname: pathname,
	    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
	    hash: hash
	  });
	};
	
	var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
	  var _parsePath2 = parsePath(path);
	
	  var pathname = _parsePath2.pathname;
	  var search = _parsePath2.search;
	  var hash = _parsePath2.hash;
	
	
	  return createPath({
	    pathname: pathname,
	    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
	      return prefix === '?' ? prefix : suffix;
	    }),
	    hash: hash
	  });
	};
	
	var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
	  var _parsePath3 = parsePath(path);
	
	  var search = _parsePath3.search;
	
	  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
	  return match && match[1];
	};
	
	var extractPath = function extractPath(string) {
	  var match = string.match(/^(https?:)?\/\/[^\/]*/);
	  return match == null ? string : string.substring(match[0].length);
	};
	
	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';
	
	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	};
	
	var createPath = exports.createPath = function createPath(location) {
	  if (location == null || typeof location === 'string') return location;
	
	  var basename = location.basename;
	  var pathname = location.pathname;
	  var search = location.search;
	  var hash = location.hash;
	
	  var path = (basename || '') + pathname;
	
	  if (search && search !== '?') path += search;
	
	  if (hash) path += hash;
	
	  return path;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	var PUSH = exports.PUSH = 'PUSH';
	
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = exports.REPLACE = 'REPLACE';
	
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = exports.POP = 'POP';

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};
	
	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;
	
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
	
	  return window.history && 'pushState' in window.history;
	};
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.readState = exports.saveState = undefined;
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR']; /* eslint-disable no-empty */
	
	
	var SecurityError = 'SecurityError';
	var KeyPrefix = '@@History/';
	
	var createKey = function createKey(key) {
	  return KeyPrefix + key;
	};
	
	var saveState = exports.saveState = function saveState(key, state) {
	  if (!window.sessionStorage) {
	    // Session storage is not available or hidden.
	    // sessionStorage is undefined in Internet Explorer when served via file protocol.
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;
	    return;
	  }
	
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;
	
	      return;
	    }
	
	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;
	
	      return;
	    }
	
	    throw error;
	  }
	};
	
	var readState = exports.readState = function readState(key) {
	  var json = void 0;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;
	
	      return undefined;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return undefined;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;
	
	var _BrowserProtocol = __webpack_require__(6);
	
	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});
	
	var _LocationUtils = __webpack_require__(7);
	
	var _PathUtils = __webpack_require__(8);
	
	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  return (0, _LocationUtils.createLocation)(window.location);
	};
	
	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  window.location.href = (0, _PathUtils.createPath)(location);
	  return false; // Don't update location
	};
	
	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  window.location.replace((0, _PathUtils.createPath)(location));
	  return false; // Don't update location
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _AsyncUtils = __webpack_require__(15);
	
	var _PathUtils = __webpack_require__(8);
	
	var _runTransitionHook = __webpack_require__(16);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _Actions = __webpack_require__(10);
	
	var _LocationUtils = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var createHistory = function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var getUserConfirmation = options.getUserConfirmation;
	  var pushLocation = options.pushLocation;
	  var replaceLocation = options.replaceLocation;
	  var go = options.go;
	  var keyLength = options.keyLength;
	
	
	  var currentLocation = void 0;
	  var pendingLocation = void 0;
	  var beforeListeners = [];
	  var listeners = [];
	  var allKeys = [];
	
	  var getCurrentIndex = function getCurrentIndex() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);
	
	    if (currentLocation) return allKeys.indexOf(currentLocation.key);
	
	    return -1;
	  };
	
	  var updateLocation = function updateLocation(nextLocation) {
	    currentLocation = nextLocation;
	
	    var currentIndex = getCurrentIndex();
	
	    if (currentLocation.action === _Actions.PUSH) {
	      allKeys = [].concat(_toConsumableArray(allKeys.slice(0, currentIndex + 1)), [currentLocation.key]);
	    } else if (currentLocation.action === _Actions.REPLACE) {
	      allKeys[currentIndex] = currentLocation.key;
	    }
	
	    listeners.forEach(function (listener) {
	      return listener(currentLocation);
	    });
	  };
	
	  var listenBefore = function listenBefore(listener) {
	    beforeListeners.push(listener);
	
	    return function () {
	      return beforeListeners = beforeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };
	
	  var listen = function listen(listener) {
	    listeners.push(listener);
	
	    return function () {
	      return listeners = listeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };
	
	  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
	    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
	      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
	        return result != null ? done(result) : next();
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          return callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  };
	
	  var transitionTo = function transitionTo(nextLocation) {
	    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation
	
	      pendingLocation = null;
	
	      if (ok) {
	        // Treat PUSH to same path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = (0, _PathUtils.createPath)(currentLocation);
	          var nextPath = (0, _PathUtils.createPath)(nextLocation);
	
	          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (nextLocation.action === _Actions.POP) {
	          updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.PUSH) {
	          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.REPLACE) {
	          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
	        }
	      } else if (currentLocation && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(currentLocation.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
	      }
	    });
	  };
	
	  var push = function push(input) {
	    return transitionTo(createLocation(input, _Actions.PUSH));
	  };
	
	  var replace = function replace(input) {
	    return transitionTo(createLocation(input, _Actions.REPLACE));
	  };
	
	  var goBack = function goBack() {
	    return go(-1);
	  };
	
	  var goForward = function goForward() {
	    return go(1);
	  };
	
	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength || 6);
	  };
	
	  var createHref = function createHref(location) {
	    return (0, _PathUtils.createPath)(location);
	  };
	
	  var createLocation = function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	    return (0, _LocationUtils.createLocation)(location, action, key);
	  };
	
	  return {
	    getCurrentLocation: getCurrentLocation,
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: _PathUtils.createPath,
	    createHref: createHref,
	    createLocation: createLocation
	  };
	};
	
	exports.default = createHistory;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var isSync = false,
	      hasNext = false,
	      doneArgs = void 0;
	
	  var done = function done() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    isDone = true;
	
	    if (isSync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = args;
	      return;
	    }
	
	    callback.apply(undefined, args);
	  };
	
	  var next = function next() {
	    if (isDone) return;
	
	    hasNext = true;
	
	    if (isSync) return; // Iterate instead of recursing if possible.
	
	    isSync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work(currentTurn++, next, done);
	    }
	
	    isSync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(undefined, _toConsumableArray(doneArgs));
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  };
	
	  next();
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var runTransitionHook = function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
	  }
	};
	
	exports.default = runTransitionHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(4);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _LocationUtils = __webpack_require__(7);
	
	var _PathUtils = __webpack_require__(8);
	
	var _createHistory = __webpack_require__(14);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	var _Actions = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createStateStorage = function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	};
	
	var createMemoryHistory = function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var getCurrentLocation = function getCurrentLocation() {
	    var entry = entries[current];
	    var path = (0, _PathUtils.createPath)(entry);
	
	    var key = void 0,
	        state = void 0;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    }
	
	    var init = (0, _PathUtils.parsePath)(path);
	
	    return (0, _LocationUtils.createLocation)(_extends({}, init, { state: state }), undefined, key);
	  };
	
	  var canGo = function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  };
	
	  var go = function go(n) {
	    if (!n) return;
	
	    if (!canGo(n)) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Cannot go(%s) there is not enough history', n) : void 0;
	
	      return;
	    }
	
	    current += n;
	    var currentLocation = getCurrentLocation();
	
	    // Change action to POP
	    history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	  };
	
	  var pushLocation = function pushLocation(location) {
	    current += 1;
	
	    if (current < entries.length) entries.splice(current);
	
	    entries.push(location);
	
	    saveState(location.key, location.state);
	  };
	
	  var replaceLocation = function replaceLocation(location) {
	    entries[current] = location;
	    saveState(location.key, location.state);
	  };
	
	  var history = (0, _createHistory2.default)(_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    return (0, _LocationUtils.createLocation)(entry);
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : (0, _invariant2.default)(false) : void 0;
	  }
	
	  var storage = createStateStorage(entries);
	
	  var saveState = function saveState(key, state) {
	    return storage[key] = state;
	  };
	
	  var readState = function readState(key) {
	    return storage[key];
	  };
	
	  return history;
	};
	
	exports.default = createMemoryHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _runTransitionHook = __webpack_require__(16);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _PathUtils = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var useBasename = function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	    var basename = options.basename;
	
	
	    var addBasename = function addBasename(location) {
	      if (!location) return location;
	
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    };
	
	    var prependBasename = function prependBasename(location) {
	      if (!basename) return location;
	
	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var pname = object.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    };
	
	    // Override all read methods with basename-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return addBasename(history.getCurrentLocation());
	    };
	
	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, addBasename(location), callback);
	      });
	    };
	
	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(addBasename(location));
	      });
	    };
	
	    // Override all write methods with basename-aware versions.
	    var push = function push(location) {
	      return history.push(prependBasename(location));
	    };
	
	    var replace = function replace(location) {
	      return history.replace(prependBasename(location));
	    };
	
	    var createPath = function createPath(location) {
	      return history.createPath(prependBasename(location));
	    };
	
	    var createHref = function createHref(location) {
	      return history.createHref(prependBasename(location));
	    };
	
	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    };
	
	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};
	
	exports.default = useBasename;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _queryString = __webpack_require__(20);
	
	var _runTransitionHook = __webpack_require__(16);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _LocationUtils = __webpack_require__(7);
	
	var _PathUtils = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultStringifyQuery = function defaultStringifyQuery(query) {
	  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
	};
	
	var defaultParseQueryString = _queryString.parse;
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	var useQueries = function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    var decodeQuery = function decodeQuery(location) {
	      if (!location) return location;
	
	      if (location.query == null) location.query = parseQueryString(location.search.substring(1));
	
	      return location;
	    };
	
	    var encodeQuery = function encodeQuery(location, query) {
	      if (query == null) return location;
	
	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var queryString = stringifyQuery(query);
	      var search = queryString ? '?' + queryString : '';
	
	      return _extends({}, object, {
	        search: search
	      });
	    };
	
	    // Override all read methods with query-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return decodeQuery(history.getCurrentLocation());
	    };
	
	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, decodeQuery(location), callback);
	      });
	    };
	
	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(decodeQuery(location));
	      });
	    };
	
	    // Override all write methods with query-aware versions.
	    var push = function push(location) {
	      return history.push(encodeQuery(location, location.query));
	    };
	
	    var replace = function replace(location) {
	      return history.replace(encodeQuery(location, location.query));
	    };
	
	    var createPath = function createPath(location) {
	      return history.createPath(encodeQuery(location, location.query));
	    };
	
	    var createHref = function createHref(location) {
	      return history.createHref(encodeQuery(location, location.query));
	    };
	
	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var newLocation = history.createLocation.apply(history, [encodeQuery(location, location.query)].concat(args));
	
	      if (location.query) newLocation.query = (0, _LocationUtils.createQuery)(location.query);
	
	      return decodeQuery(newLocation);
	    };
	
	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};
	
	exports.default = useQueries;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(21);
	var objectAssign = __webpack_require__(22);
	
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
/* 21 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LOCATION_CHANGED = exports.LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED';
	var PUSH = exports.PUSH = 'ROUTER_PUSH';
	var REPLACE = exports.REPLACE = 'ROUTER_REPLACE';
	var GO = exports.GO = 'ROUTER_GO';
	var GO_BACK = exports.GO_BACK = 'ROUTER_GO_BACK';
	var GO_FORWARD = exports.GO_FORWARD = 'ROUTER_GO_FORWARD';

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _urlPattern = __webpack_require__(25);
	
	var _urlPattern2 = _interopRequireDefault(_urlPattern);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (routes) {
	  var routeList = Object.keys(routes).map(function (route) {
	    return {
	      route: route,
	      pattern: new _urlPattern2.default(route),
	      result: routes[route]
	    };
	  });
	
	  return function (incomingUrl) {
	    // Discard query strings
	    var route = incomingUrl.split('?')[0]; // eslint-disable-line no-magic-numbers
	
	    // Find the route that matches the URL
	    for (var i = 0; i < routeList.length; i++) {
	      var storedRoute = routeList[i];
	      var match = storedRoute.pattern.match(route);
	
	      if (match) {
	        // Return the matched params and user-defined result object
	        return {
	          route: storedRoute.route,
	          params: match,
	          result: storedRoute.result
	        };
	      }
	    }
	
	    return null;
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.10.0
	var slice = [].slice;
	
	(function(root, factory) {
	  if (('function' === "function") && (__webpack_require__(26) != null)) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined" && exports !== null) {
	    return module.exports = factory();
	  } else {
	    return root.UrlPattern = factory();
	  }
	})(this, function() {
	  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
	  escapeForRegex = function(string) {
	    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	  };
	  concatMap = function(array, f) {
	    var i, length, results;
	    results = [];
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      results = results.concat(f(array[i]));
	    }
	    return results;
	  };
	  stringConcatMap = function(array, f) {
	    var i, length, result;
	    result = '';
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      result += f(array[i]);
	    }
	    return result;
	  };
	  regexGroupCount = function(regex) {
	    return (new RegExp(regex.toString() + '|')).exec('').length - 1;
	  };
	  keysAndValuesToObject = function(keys, values) {
	    var i, key, length, object, value;
	    object = {};
	    i = -1;
	    length = keys.length;
	    while (++i < length) {
	      key = keys[i];
	      value = values[i];
	      if (value == null) {
	        continue;
	      }
	      if (object[key] != null) {
	        if (!Array.isArray(object[key])) {
	          object[key] = [object[key]];
	        }
	        object[key].push(value);
	      } else {
	        object[key] = value;
	      }
	    }
	    return object;
	  };
	  P = {};
	  P.Result = function(value, rest) {
	    this.value = value;
	    this.rest = rest;
	  };
	  P.Tagged = function(tag, value) {
	    this.tag = tag;
	    this.value = value;
	  };
	  P.tag = function(tag, parser) {
	    return function(input) {
	      var result, tagged;
	      result = parser(input);
	      if (result == null) {
	        return;
	      }
	      tagged = new P.Tagged(tag, result.value);
	      return new P.Result(tagged, result.rest);
	    };
	  };
	  P.regex = function(regex) {
	    return function(input) {
	      var matches, result;
	      matches = regex.exec(input);
	      if (matches == null) {
	        return;
	      }
	      result = matches[0];
	      return new P.Result(result, input.slice(result.length));
	    };
	  };
	  P.sequence = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, rest, result, values;
	      i = -1;
	      length = parsers.length;
	      values = [];
	      rest = input;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(rest);
	        if (result == null) {
	          return;
	        }
	        values.push(result.value);
	        rest = result.rest;
	      }
	      return new P.Result(values, rest);
	    };
	  };
	  P.pick = function() {
	    var indexes, parsers;
	    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return function(input) {
	      var array, result;
	      result = P.sequence.apply(P, parsers)(input);
	      if (result == null) {
	        return;
	      }
	      array = result.value;
	      result.value = array[indexes];
	      return result;
	    };
	  };
	  P.string = function(string) {
	    var length;
	    length = string.length;
	    return function(input) {
	      if (input.slice(0, length) === string) {
	        return new P.Result(string, input.slice(length));
	      }
	    };
	  };
	  P.lazy = function(fn) {
	    var cached;
	    cached = null;
	    return function(input) {
	      if (cached == null) {
	        cached = fn();
	      }
	      return cached(input);
	    };
	  };
	  P.baseMany = function(parser, end, stringResult, atLeastOneResultRequired, input) {
	    var endResult, parserResult, rest, results;
	    rest = input;
	    results = stringResult ? '' : [];
	    while (true) {
	      if (end != null) {
	        endResult = end(rest);
	        if (endResult != null) {
	          break;
	        }
	      }
	      parserResult = parser(rest);
	      if (parserResult == null) {
	        break;
	      }
	      if (stringResult) {
	        results += parserResult.value;
	      } else {
	        results.push(parserResult.value);
	      }
	      rest = parserResult.rest;
	    }
	    if (atLeastOneResultRequired && results.length === 0) {
	      return;
	    }
	    return new P.Result(results, rest);
	  };
	  P.many1 = function(parser) {
	    return function(input) {
	      return P.baseMany(parser, null, false, true, input);
	    };
	  };
	  P.concatMany1Till = function(parser, end) {
	    return function(input) {
	      return P.baseMany(parser, end, true, true, input);
	    };
	  };
	  P.firstChoice = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, result;
	      i = -1;
	      length = parsers.length;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(input);
	        if (result != null) {
	          return result;
	        }
	      }
	    };
	  };
	  newParser = function(options) {
	    var U;
	    U = {};
	    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
	    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function() {
	      return U.pattern;
	    }), P.string(options.optionalSegmentEndChar)));
	    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
	    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function() {
	      return U.name;
	    })));
	    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
	    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function() {
	      return U.escapedChar;
	    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
	    U.token = P.lazy(function() {
	      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
	    });
	    U.pattern = P.many1(P.lazy(function() {
	      return U.token;
	    }));
	    return U;
	  };
	  defaultOptions = {
	    escapeChar: '\\',
	    segmentNameStartChar: ':',
	    segmentValueCharset: 'a-zA-Z0-9-_~ %',
	    segmentNameCharset: 'a-zA-Z0-9',
	    optionalSegmentStartChar: '(',
	    optionalSegmentEndChar: ')',
	    wildcardChar: '*'
	  };
	  baseAstNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return baseAstNodeToRegexString(node, segmentValueCharset);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return '(.*?)';
	      case 'named':
	        return "([" + segmentValueCharset + "]+)";
	      case 'static':
	        return escapeForRegex(astNode.value);
	      case 'optional':
	        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
	    }
	  };
	  astNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (segmentValueCharset == null) {
	      segmentValueCharset = defaultOptions.segmentValueCharset;
	    }
	    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
	  };
	  astNodeToNames = function(astNode) {
	    if (Array.isArray(astNode)) {
	      return concatMap(astNode, astNodeToNames);
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return ['_'];
	      case 'named':
	        return [astNode.value];
	      case 'static':
	        return [];
	      case 'optional':
	        return astNodeToNames(astNode.value);
	    }
	  };
	  getParam = function(params, key, nextIndexes, sideEffects) {
	    var index, maxIndex, result, value;
	    if (sideEffects == null) {
	      sideEffects = false;
	    }
	    value = params[key];
	    if (value == null) {
	      if (sideEffects) {
	        throw new Error("no values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    index = nextIndexes[key] || 0;
	    maxIndex = Array.isArray(value) ? value.length - 1 : 0;
	    if (index > maxIndex) {
	      if (sideEffects) {
	        throw new Error("too few values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    result = Array.isArray(value) ? value[index] : value;
	    if (sideEffects) {
	      nextIndexes[key] = index + 1;
	    }
	    return result;
	  };
	  astNodeContainsSegmentsForProvidedParams = function(astNode, params, nextIndexes) {
	    var i, length;
	    if (Array.isArray(astNode)) {
	      i = -1;
	      length = astNode.length;
	      while (++i < length) {
	        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, false) != null;
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, false) != null;
	      case 'static':
	        return false;
	      case 'optional':
	        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
	    }
	  };
	  stringify = function(astNode, params, nextIndexes) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return stringify(node, params, nextIndexes);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, true);
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, true);
	      case 'static':
	        return astNode.value;
	      case 'optional':
	        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
	          return stringify(astNode.value, params, nextIndexes);
	        } else {
	          return '';
	        }
	    }
	  };
	  UrlPattern = function(arg1, arg2) {
	    var groupCount, options, parsed, parser, withoutWhitespace;
	    if (arg1 instanceof UrlPattern) {
	      this.isRegex = arg1.isRegex;
	      this.regex = arg1.regex;
	      this.ast = arg1.ast;
	      this.names = arg1.names;
	      return;
	    }
	    this.isRegex = arg1 instanceof RegExp;
	    if (!(('string' === typeof arg1) || this.isRegex)) {
	      throw new TypeError('argument must be a regex or a string');
	    }
	    if (this.isRegex) {
	      this.regex = arg1;
	      if (arg2 != null) {
	        if (!Array.isArray(arg2)) {
	          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
	        }
	        groupCount = regexGroupCount(this.regex);
	        if (arg2.length !== groupCount) {
	          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
	        }
	        this.names = arg2;
	      }
	      return;
	    }
	    if (arg1 === '') {
	      throw new Error('argument must not be the empty string');
	    }
	    withoutWhitespace = arg1.replace(/\s+/g, '');
	    if (withoutWhitespace !== arg1) {
	      throw new Error('argument must not contain whitespace');
	    }
	    options = {
	      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
	      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
	      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
	      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
	      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
	      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
	      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
	    };
	    parser = newParser(options);
	    parsed = parser.pattern(arg1);
	    if (parsed == null) {
	      throw new Error("couldn't parse pattern");
	    }
	    if (parsed.rest !== '') {
	      throw new Error("could only partially parse pattern");
	    }
	    this.ast = parsed.value;
	    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
	    this.names = astNodeToNames(this.ast);
	  };
	  UrlPattern.prototype.match = function(url) {
	    var groups, match;
	    match = this.regex.exec(url);
	    if (match == null) {
	      return null;
	    }
	    groups = match.slice(1);
	    if (this.names) {
	      return keysAndValuesToObject(this.names, groups);
	    } else {
	      return groups;
	    }
	  };
	  UrlPattern.prototype.stringify = function(params) {
	    if (params == null) {
	      params = {};
	    }
	    if (this.isRegex) {
	      throw new Error("can't stringify patterns generated from a regex");
	    }
	    if (params !== Object(params)) {
	      throw new Error("argument must be an object or undefined");
	    }
	    return stringify(this.ast, params, {});
	  };
	  UrlPattern.escapeForRegex = escapeForRegex;
	  UrlPattern.concatMap = concatMap;
	  UrlPattern.stringConcatMap = stringConcatMap;
	  UrlPattern.regexGroupCount = regexGroupCount;
	  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
	  UrlPattern.P = P;
	  UrlPattern.newParser = newParser;
	  UrlPattern.defaultOptions = defaultOptions;
	  UrlPattern.astNodeToRegexString = astNodeToRegexString;
	  UrlPattern.astNodeToNames = astNodeToNames;
	  UrlPattern.getParam = getParam;
	  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
	  UrlPattern.stringify = stringify;
	  return UrlPattern;
	});


/***/ },
/* 26 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _actionTypes = __webpack_require__(23);
	
	exports.default = function () {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];
	
	  if (action.type === _actionTypes.LOCATION_CHANGED) {
	    // No-op the initial route action
	    if (state && state.pathname === action.payload.pathname) {
	      return state;
	    }
	
	    return _extends({}, action.payload, {
	      previous: state && state.current
	    });
	  }
	  return state;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createMatcher = __webpack_require__(24);
	
	var _createMatcher2 = _interopRequireDefault(_createMatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (_ref) {
	  var _ref$pathname = _ref.pathname;
	  var pathname = _ref$pathname === undefined ? '/' : _ref$pathname;
	  var _ref$query = _ref.query;
	  var query = _ref$query === undefined ? {} : _ref$query;
	  var routes = _ref.routes;
	  var history = _ref.history;
	  return _extends({}, history.createLocation({
	    pathname: pathname,
	    query: query
	  }), (0, _createMatcher2.default)(routes)(pathname));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RouterProvider = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(30);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RouterProvider = exports.RouterProvider = function (_Component) {
	  _inherits(RouterProvider, _Component);
	
	  function RouterProvider(props) {
	    _classCallCheck(this, RouterProvider);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RouterProvider).call(this, props));
	
	    _this.router = {
	      store: props.store
	    };
	    return _this;
	  }
	
	  _createClass(RouterProvider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        router: this.router
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);
	
	  return RouterProvider;
	}(_react.Component);
	
	RouterProvider.childContextTypes = {
	  router: _react.PropTypes.object
	};
	
	exports.default = function (_ref) {
	  var store = _ref.store;
	  return function (ComposedComponent) {
	    return function (props) {
	      return _react2.default.createElement(
	        RouterProvider,
	        { store: store },
	        _react2.default.createElement(ComposedComponent, props)
	      );
	    };
	  };
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_30__;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PersistentQueryLink = exports.Link = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(30);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _actionTypes = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var LEFT_MOUSE_BUTTON = 0;
	
	var normalizeHref = function normalizeHref(location) {
	  return '' + (location.basename || '') + location.pathname;
	};
	
	var normalizeLocation = function normalizeLocation(href) {
	  if (typeof href === 'string') {
	    var pathnameAndQuery = href.split('?');
	    var pathname = pathnameAndQuery[0]; // eslint-disable-line no-magic-numbers
	    var query = pathnameAndQuery[1]; // eslint-disable-line no-magic-numbers
	    return query ? { pathname: pathname, search: '?' + query } : { pathname: pathname };
	  }
	  return href;
	};
	
	var resolveQueryForLocation = function resolveQueryForLocation(_ref) {
	  var linkLocation = _ref.linkLocation;
	  var persistQuery = _ref.persistQuery;
	  var currentLocation = _ref.currentLocation;
	
	  var currentQuery = currentLocation && currentLocation.query;
	
	  // Only use the query from state if it exists
	  // and the href doesn't provide its own query
	  if (persistQuery && currentQuery && !linkLocation.search && !linkLocation.query) {
	    return {
	      pathname: linkLocation.pathname,
	      query: currentQuery
	    };
	  }
	
	  return linkLocation;
	};
	
	var isNotLeftClick = function isNotLeftClick(e) {
	  return e.button && e.button !== LEFT_MOUSE_BUTTON;
	};
	var hasModifier = function hasModifier(e) {
	  return Boolean(e.shiftKey || e.altKey || e.metaKey || e.ctrlKey);
	};
	
	var _onClick = function _onClick(_ref2) {
	  var e = _ref2.e;
	  var target = _ref2.target;
	  var location = _ref2.location;
	  var replaceState = _ref2.replaceState;
	  var router = _ref2.router;
	
	  if (hasModifier(e) || isNotLeftClick(e) || target) {
	    return;
	  }
	
	  e.preventDefault();
	
	  if (router) {
	    router.store.dispatch({
	      type: replaceState ? _actionTypes.REPLACE : _actionTypes.PUSH,
	      payload: location
	    });
	  }
	};
	
	var Link = function Link(props, context) {
	  var href = props.href;
	  var target = props.target;
	  var persistQuery = props.persistQuery;
	  var replaceState = props.replaceState;
	  var children = props.children;
	
	  var rest = _objectWithoutProperties(props, ['href', 'target', 'persistQuery', 'replaceState', 'children']);
	
	  var router = context.router;
	
	
	  var locationDescriptor = resolveQueryForLocation({
	    linkLocation: normalizeLocation(href),
	    currentLocation: router.store.getState().router,
	    persistQuery: persistQuery
	  });
	
	  var location = router.store.history.createLocation(locationDescriptor);
	
	  return _react2.default.createElement(
	    'a',
	    _extends({
	      href: normalizeHref(location),
	      onClick: function onClick(e) {
	        return _onClick({
	          e: e,
	          target: target,
	          location: location,
	          replaceState: replaceState,
	          router: router
	        });
	      }
	    }, rest),
	    children
	  );
	};
	
	Link.contextTypes = {
	  router: _react.PropTypes.object
	};
	
	var PersistentQueryLink = function (_Component) {
	  _inherits(PersistentQueryLink, _Component);
	
	  function PersistentQueryLink() {
	    _classCallCheck(this, PersistentQueryLink);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PersistentQueryLink).apply(this, arguments));
	  }
	
	  _createClass(PersistentQueryLink, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	
	      var rest = _objectWithoutProperties(_props, ['children']);
	
	      return _react2.default.createElement(
	        Link,
	        _extends({}, rest, { persistQuery: true }),
	        children
	      );
	    }
	  }]);
	
	  return PersistentQueryLink;
	}(_react.Component);
	
	PersistentQueryLink.propTypes = {
	  children: _react.PropTypes.node
	};
	
	PersistentQueryLink.contextTypes = {
	  router: _react.PropTypes.object
	};
	
	exports.Link = Link;
	exports.PersistentQueryLink = PersistentQueryLink;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(30);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Fragment = function Fragment(props, context) {
	  var forRoute = props.forRoute;
	  var forRoutes = props.forRoutes;
	  var withConditions = props.withConditions;
	  var children = props.children;
	  var matchRoute = context.router.store.matchRoute;
	
	  var _context$router$store = context.router.store.getState();
	
	  var location = _context$router$store.router;
	
	  var matchResult = matchRoute(location.pathname);
	
	  if (!matchResult) {
	    return null;
	  }
	
	  if (forRoute && matchResult.route !== forRoute) {
	    return null;
	  }
	
	  if (forRoutes) {
	    var anyMatch = forRoutes.some(function (route) {
	      return matchResult.route === route;
	    });
	
	    if (!anyMatch) {
	      return null;
	    }
	  }
	
	  if (withConditions && !withConditions(location)) {
	    return null;
	  }
	
	  return _react2.default.createElement(
	    'div',
	    null,
	    children
	  );
	};
	
	
	Fragment.contextTypes = {
	  router: _react.PropTypes.object
	};
	
	exports.default = Fragment;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-little-router.js.map