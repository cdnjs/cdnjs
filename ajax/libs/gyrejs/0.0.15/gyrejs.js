(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable"], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory(require("Immutable"));
	else
		root["GyreJS"] = factory(root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	// Import sub libraries
	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _store = __webpack_require__(1);

	var _store2 = _interopRequireDefault(_store);

	// Private variables
	var gyres = new Map();
	var store = _store2["default"]();

	// Public functions
	/**
	 * createGyre()
	 *
	 * @param {String} id Id of a registered gyre factory.
	 * @param {Object} [options] Options object for gyre.
	 * @returns {Object} Gyre instance.
	 */
	var createGyre = function createGyre(id, options) {
	  if (!gyres.has(id)) {
	    console.warn(">> GyreJS: Gyre factory '" + id + "' not registered."); // eslint-disable-line no-console
	  }
	  var newNameSpace = id + "-" + Date.now();
	  store.setState({
	    data: {}
	  }, newNameSpace);

	  return gyres.get(id)(store, Object.assign({}, { NS: newNameSpace }, options));
	};

	/**
	 * destroyGyre()
	 *
	 * @param {String} id Id of a registered gyre factory.
	 * @returns {Object|boolean} Gyre instance.
	 */
	var destroyGyre = function destroyGyre(id) {
	  if (!gyres.has(id)) {
	    console.warn(">> GyreJS: Gyre factory '" + id + "' not registered."); // eslint-disable-line no-console
	    return false;
	  }
	  return gyres["delete"](id) && true;
	};

	/**
	 * registerGyreFactory()
	 *
	 * @param {String} id Id of to register gyre.
	 * @param {Function} factory Gyre factory function.
	 * @returns {void}
	 */
	var registerGyreFactory = function registerGyreFactory(id, factory) {
	  gyres.set(id, factory);
	};

	exports.createGyre = createGyre;
	exports.destroyGyre = destroyGyre;
	exports.registerGyreFactory = registerGyreFactory;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _immutable = __webpack_require__(2);

	var _immutable2 = _interopRequireDefault(_immutable);

	/**
	 * Store() Factory function
	 *
	 * @returns {{addFilter: Function, getState: Function, setState: Function, updateState: Function}} API
	 */
	var store = function store() {
	  // Private variables
	  var state = _immutable2["default"].Map({});
	  var filterList = {};
	  var updateQueue = new Set();

	  // Private functions
	  /**
	   * Send update to all registered reducers
	   *
	   * @returns {void}
	   */
	  var sendUpdate = function sendUpdate() {
	    updateQueue.forEach(function (ns) {
	      return (filterList[ns] || []).forEach(function (filter) {
	        return filter(ns === "all" ? state : state.get(ns));
	      });
	    });
	    updateQueue.clear();
	  };

	  /**
	   * Request to issue update to filters of a given namespace.
	   *
	   * @param {String} ns Namespace.
	   * @returns {void}
	   */
	  var requestUpdate = function requestUpdate(ns) {
	    if (!updateQueue.size) {
	      requestAnimationFrame(sendUpdate);
	    }
	    updateQueue.add("all").add(ns);
	  };

	  /**
	   * removeFilter() - Factory
	   * Remove filter from the store
	   *
	   * @param {String} ns Namespace.
	   * @param {Function} cb Filter callback.
	   * @returns {Function} removal function.
	   */
	  var removeFilter = function removeFilter(ns, cb) {
	    return function () {
	      return filterList[ns] = filterList[ns].filter(function (filter) {
	        return filter !== cb;
	      });
	    };
	  };

	  /**
	   * setState() Overwrite the current state in the store.
	   * Use for setting an initial state or debugging.
	   *
	   * @param {Immutable.Map} newState New state.
	   * @param {String} ns Namespace.
	   * @returns {Immutable.Map} state Current state
	   */
	  var setNewState = function setNewState(newState, ns) {
	    if (state.get(ns) !== newState) {
	      state = state.set(ns, newState);
	      requestUpdate(ns);
	    }
	    return state;
	  };

	  // Public functions
	  /**
	   * addFilter() Register a faucet with the store and send initial data.
	   *
	   * @param {Function} cb callback.
	   * @param {String} [ns] Namespace.
	   * @returns {Function} un-register function.
	   */
	  var addFilter = function addFilter(cb) {
	    var ns = arguments.length <= 1 || arguments[1] === undefined ? "all" : arguments[1];

	    if (!filterList[ns]) {
	      filterList[ns] = [];
	    }

	    // Save to local register
	    filterList[ns].push(cb);

	    // Request update to make sure the new filter gets data asap.
	    requestUpdate(ns);

	    // Return remover
	    return removeFilter(ns, cb);
	  };

	  /**
	   * getState() returns the current state.
	   *
	   * @returns {Immutable.Map} Current state
	   */
	  var getState = function getState() {
	    return state;
	  };

	  /**
	   * setState()
	   *
	   * @param {Immutable.Map|Object} newState State.
	   * @param {String} ns Namespace.
	   * @returns {Immutable.Map} New state.
	   */
	  var setState = function setState(newState, ns) {
	    return setNewState(_immutable2["default"].Map.isMap(newState) ? newState : _immutable2["default"].Map(newState), ns);
	  };

	  /**
	   * updateState() applies a given reducer function to the state, which
	   * is supposed to return a new Immutable state.
	   *
	   * @param {String} ns Namespace.
	   * @param {Function} func Reducer function.
	   * @param {Array} args Reducer function arguments.
	   * @returns {Immutable.Map} state New state.
	   */
	  var updateState = function updateState(ns, func, args) {
	    return setNewState(func.apply(undefined, [state.get(ns)].concat(args)) || state.get(ns), ns);
	  };

	  // API
	  return {
	    addFilter: addFilter,
	    getState: getState,
	    setState: setState,
	    updateState: updateState
	  };
	};

	exports["default"] = store;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;