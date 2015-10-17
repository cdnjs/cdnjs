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

	// Core
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(6);

	var _createStore2 = _interopRequireDefault(_createStore);

	// Utilities

	var _utilsCompose = __webpack_require__(1);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	var _utilsCombineReducers = __webpack_require__(9);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(8);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(7);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsComposeMiddleware = __webpack_require__(3);

	var _utilsComposeMiddleware2 = _interopRequireDefault(_utilsComposeMiddleware);

	exports.createStore = _createStore2['default'];
	exports.compose = _utilsCompose2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.composeMiddleware = _utilsComposeMiddleware2['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Composes functions from left to right
	 * @param  {...Function} funcs - Functions to compose
	 * @return {Function}
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return funcs.reduceRight(function (composed, f) {
	    return f(composed);
	  });
	}

	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _invariant = __webpack_require__(5);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _utilsIsPlainObject = __webpack_require__(10);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	// Don't ever try to handle these action types in your code. They are private.
	// For any unknown actions, you must return the current state.
	// If the current state is undefined, you must return the initial state.
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;

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
	    this.dispatch({ type: ActionTypes.INIT });
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = composeMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(1);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Compose middleware from left to right
	 * @param  {...Function} middlewares
	 * @return {Function}
	 */

	function composeMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (methods) {
	    return function (next) {
	      return _compose2['default'].apply(undefined, middlewares.map(function (m) {
	        return m(methods);
	      }).concat([next]));
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
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
/* 5 */
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Store = __webpack_require__(2);

	var _Store2 = _interopRequireDefault(_Store);

	function createStore(reducer, initialState) {
	  var store = new _Store2['default'](reducer, initialState);

	  return {
	    dispatch: store.dispatch.bind(store),
	    subscribe: store.subscribe.bind(store),
	    getState: store.getState.bind(store),
	    getReducer: store.getReducer.bind(store),
	    replaceReducer: store.replaceReducer.bind(store)
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(1);

	var _compose2 = _interopRequireDefault(_compose);

	var _composeMiddleware = __webpack_require__(3);

	var _composeMiddleware2 = _interopRequireDefault(_composeMiddleware);

	/**
	 * Creates a higher-order store that applies middleware to a store's dispatch.
	 * Because middleware is potentially asynchronous, this should be the first
	 * higher-order store in the composition chain.
	 * @param {...Function} ...middlewares
	 * @return {Function} A higher-order store
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function () {
	      var store = next.apply(undefined, arguments);
	      var middleware = _composeMiddleware2['default'].apply(undefined, middlewares);

	      function dispatch(action) {
	        var methods = {
	          dispatch: dispatch,
	          getState: store.getState
	        };

	        return _compose2['default'](middleware(methods), store.dispatch)(action);
	      }

	      return _extends({}, store, {
	        dispatch: dispatch
	      });
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

	var _utilsMapValues = __webpack_require__(4);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(4);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(11);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	var _invariant = __webpack_require__(5);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Store = __webpack_require__(2);

	function getErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });

	  Object.keys(finalReducers).forEach(function (key) {
	    var reducer = finalReducers[key];
	    _invariant2['default'](typeof reducer(undefined, { type: _Store.ActionTypes.INIT }) !== 'undefined', 'Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');

	    var type = Math.random().toString(36).substring(7).split('').join('.');
	    _invariant2['default'](typeof reducer(undefined, { type: type }) !== 'undefined', 'Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _Store.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	  });

	  return function composition(state, action) {
	    if (state === undefined) state = {};

	    return _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var newState = reducer(state[key], action);
	      _invariant2['default'](typeof newState !== 'undefined', getErrorMessage(key, action));
	      return newState;
	    });
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;

	function isPlainObject(obj) {
	  return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
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

/***/ }
/******/ ])
});
;