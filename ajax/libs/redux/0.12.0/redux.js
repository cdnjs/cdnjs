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

	var _index = __webpack_require__(7);

	_defaults(exports, _interopRequireWildcard(_index));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createDispatcher;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsComposeMiddleware = __webpack_require__(2);

	var _utilsComposeMiddleware2 = _interopRequireDefault(_utilsComposeMiddleware);

	var INIT_ACTION = {
	  type: '@@INIT'
	};

	function createDispatcher(store) {
	  var middlewares = arguments[1] === undefined ? [] : arguments[1];

	  return function dispatcher(initialState, setState) {
	    var state = setState(store(initialState, INIT_ACTION));

	    function dispatch(action) {
	      state = setState(store(state, action));
	      return action;
	    }

	    function getState() {
	      return state;
	    }

	    var finalMiddlewares = typeof middlewares === 'function' ? middlewares(getState) : middlewares;

	    return _utilsComposeMiddleware2['default'].apply(undefined, finalMiddlewares.concat([dispatch]));
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = composeStores;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(4);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(10);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	function composeStores(stores) {
	  var finalStores = (0, _utilsPick2['default'])(stores, function (val) {
	    return typeof val === 'function';
	  });
	  return function Composition(atom, action) {
	    if (atom === undefined) atom = {};

	    return (0, _utilsMapValues2['default'])(finalStores, function (store, key) {
	      return store(atom[key], action);
	    });
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

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _createDispatcher = __webpack_require__(1);

	var _createDispatcher2 = _interopRequireDefault(_createDispatcher);

	var _utilsComposeStores = __webpack_require__(3);

	var _utilsComposeStores2 = _interopRequireDefault(_utilsComposeStores);

	var _middlewareThunk = __webpack_require__(8);

	var _middlewareThunk2 = _interopRequireDefault(_middlewareThunk);

	var Redux = (function () {
	  function Redux(dispatcher, initialState) {
	    _classCallCheck(this, Redux);

	    var finalDispatcher = dispatcher;
	    if (typeof dispatcher === 'object') {
	      // A shortcut notation to use the default dispatcher
	      finalDispatcher = (0, _createDispatcher2['default'])((0, _utilsComposeStores2['default'])(dispatcher), function (getState) {
	        return [(0, _middlewareThunk2['default'])(getState)];
	      });
	    }

	    this.state = initialState;
	    this.listeners = [];
	    this.replaceDispatcher(finalDispatcher);
	  }

	  Redux.prototype.getDispatcher = function getDispatcher() {
	    return this.dispatcher;
	  };

	  Redux.prototype.replaceDispatcher = function replaceDispatcher(nextDispatcher) {
	    this.dispatcher = nextDispatcher;
	    this.dispatchFn = nextDispatcher(this.state, this.setState.bind(this));
	  };

	  Redux.prototype.dispatch = function dispatch(action) {
	    return this.dispatchFn(action);
	  };

	  Redux.prototype.getState = function getState() {
	    return this.state;
	  };

	  Redux.prototype.setState = function setState(nextState) {
	    this.state = nextState;
	    this.listeners.forEach(function (listener) {
	      return listener();
	    });
	    return nextState;
	  };

	  Redux.prototype.subscribe = function subscribe(listener) {
	    var listeners = this.listeners;

	    listeners.push(listener);

	    return function unsubscribe() {
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  };

	  return Redux;
	})();

	exports['default'] = Redux;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	var _bind = Function.prototype.bind;
	exports['default'] = createRedux;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Redux = __webpack_require__(5);

	var _Redux2 = _interopRequireDefault(_Redux);

	function createRedux() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var redux = new (_bind.apply(_Redux2['default'], [null].concat(args)))();

	  return {
	    subscribe: redux.subscribe.bind(redux),
	    dispatch: redux.dispatch.bind(redux),
	    getState: redux.getState.bind(redux),
	    getDispatcher: redux.getDispatcher.bind(redux),
	    replaceDispatcher: redux.replaceDispatcher.bind(redux)
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createRedux = __webpack_require__(6);

	var _createRedux2 = _interopRequireDefault(_createRedux);

	var _createDispatcher = __webpack_require__(1);

	var _createDispatcher2 = _interopRequireDefault(_createDispatcher);

	// Utilities

	var _utilsComposeMiddleware = __webpack_require__(2);

	var _utilsComposeMiddleware2 = _interopRequireDefault(_utilsComposeMiddleware);

	var _utilsComposeStores = __webpack_require__(3);

	var _utilsComposeStores2 = _interopRequireDefault(_utilsComposeStores);

	var _utilsBindActionCreators = __webpack_require__(9);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	exports.createRedux = _createRedux2['default'];
	exports.createDispatcher = _createDispatcher2['default'];
	exports.composeMiddleware = _utilsComposeMiddleware2['default'];
	exports.composeStores = _utilsComposeStores2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;

	function thunkMiddleware(getState) {
	  return function (next) {
	    var recurse = function recurse(action) {
	      return typeof action === 'function' ? action(recurse, getState) : next(action);
	    };

	    return recurse;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(4);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreators(actionCreators, dispatch) {
	  return (0, _utilsMapValues2['default'])(actionCreators, function (actionCreator) {
	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return dispatch(actionCreator.apply(undefined, args));
	    };
	  });
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

/***/ }
/******/ ])
});
;