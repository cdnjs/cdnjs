(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Redux"] = factory();
	else
		root["Redux"] = factory();
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

	exports.__esModule = true;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	var _index = __webpack_require__(6);

	_defaults(exports, _interopRequireWildcard(_index));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = composeMiddleware;

	function composeMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return middlewares.reduceRight(function (composed, m) {
	    return m(composed);
	  });
	}

	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = composeReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(3);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(10);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	function composeReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });

	  return function Composition(atom, action) {
	    if (atom === undefined) atom = {};

	    return _utilsMapValues2['default'](finalReducers, function (store, key) {
	      return store(atom[key], action);
	    });
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _invariant = __webpack_require__(11);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _utilsIsPlainObject = __webpack_require__(9);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var Store = (function () {
	  function Store(reducer, initialState) {
	    _classCallCheck(this, Store);

	    _invariant2['default'](typeof reducer === 'function', 'Expected the reducer to be a function.');

	    this.state = initialState;
	    this.listeners = [];
	    this.replaceReducer(reducer);
	  }

	  Store.prototype.getReducer = function getReducer() {
	    return this.reducer;
	  };

	  Store.prototype.replaceReducer = function replaceReducer(nextReducer) {
	    this.reducer = nextReducer;
	    this.dispatch({ type: '@@INIT' });
	  };

	  Store.prototype.dispatch = function dispatch(action) {
	    _invariant2['default'](_utilsIsPlainObject2['default'](action), 'Actions must be plain objects. Use custom middleware for async actions.');

	    var reducer = this.reducer;

	    this.state = reducer(this.state, action);
	    this.listeners.forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  };

	  Store.prototype.getState = function getState() {
	    return this.state;
	  };

	  Store.prototype.subscribe = function subscribe(listener) {
	    var listeners = this.listeners;

	    listeners.push(listener);

	    return function unsubscribe() {
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  };

	  return Store;
	})();

	exports['default'] = Store;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Store = __webpack_require__(4);

	var _Store2 = _interopRequireDefault(_Store);

	var _utilsComposeReducers = __webpack_require__(2);

	var _utilsComposeReducers2 = _interopRequireDefault(_utilsComposeReducers);

	var _utilsComposeMiddleware = __webpack_require__(1);

	var _utilsComposeMiddleware2 = _interopRequireDefault(_utilsComposeMiddleware);

	var _middlewareThunk = __webpack_require__(7);

	var _middlewareThunk2 = _interopRequireDefault(_middlewareThunk);

	var defaultMiddlewares = function defaultMiddlewares(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;
	  return [_middlewareThunk2['default']({ dispatch: dispatch, getState: getState })];
	};

	function createStore(reducer, initialState) {
	  var middlewares = arguments[2] === undefined ? defaultMiddlewares : arguments[2];

	  var finalReducer = typeof reducer === 'function' ? reducer : _utilsComposeReducers2['default'](reducer);

	  var store = new _Store2['default'](finalReducer, initialState);
	  var getState = store.getState.bind(store);

	  var rawDispatch = store.dispatch.bind(store);
	  var cookedDispatch = null;

	  function dispatch(action) {
	    return cookedDispatch(action);
	  }

	  var finalMiddlewares = typeof middlewares === 'function' ? middlewares({ dispatch: dispatch, getState: getState }) : middlewares;

	  cookedDispatch = _utilsComposeMiddleware2['default'].apply(undefined, finalMiddlewares.concat([rawDispatch]));

	  return {
	    dispatch: cookedDispatch,
	    subscribe: store.subscribe.bind(store),
	    getState: store.getState.bind(store),
	    getReducer: store.getReducer.bind(store),
	    replaceReducer: store.replaceReducer.bind(store)
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(5);

	var _createStore2 = _interopRequireDefault(_createStore);

	// Utilities

	var _utilsComposeMiddleware = __webpack_require__(1);

	var _utilsComposeMiddleware2 = _interopRequireDefault(_utilsComposeMiddleware);

	var _utilsComposeReducers = __webpack_require__(2);

	var _utilsComposeReducers2 = _interopRequireDefault(_utilsComposeReducers);

	var _utilsBindActionCreators = __webpack_require__(8);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	exports.createStore = _createStore2['default'];
	exports.composeMiddleware = _utilsComposeMiddleware2['default'];
	exports.composeReducers = _utilsComposeReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(3);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreators(actionCreators, dispatch) {
	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return function () {
	      return dispatch(actionCreator.apply(undefined, arguments));
	    };
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;

	function isPlainObject(obj) {
	  return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
	}

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
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
	  if ((undefined) !== 'production') {
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
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ }
/******/ ])
});
;