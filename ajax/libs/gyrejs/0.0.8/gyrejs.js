(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable", "React"], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory(require("Immutable"), require("React"));
	else
		root["GyreJS"] = factory(root["Immutable"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	/**
	 * Import libs
	 */
	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _store = __webpack_require__(5);

	var _store2 = _interopRequireDefault(_store);

	var _gyresLocalLocalFactory = __webpack_require__(2);

	var _gyresLocalLocalFactory2 = _interopRequireDefault(_gyresLocalLocalFactory);

	exports.Store = _store2["default"];
	exports.LocalFactory = _gyresLocalLocalFactory2["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * localAH()
	 *
	 * @param {Object} store instance
	 * @param {String} nameSpace state key
	 * @param {Boolean} [debugMode] Whether to enable debugging
	 * @returns {{addAction: Function, dispatch: Function}} API
	 */
	"use strict";

	exports.__esModule = true;
	var localAH = function localAH(store, nameSpace, debugMode) {
	  // Private variables
	  var actionMap = new Map();
	  var stateHistory = [];

	  // Public functions
	  /**
	   * addAction()
	   *
	   * @param {String} id Action ID
	   * @param {Function} func Reducer function
	   * @returns {void}
	   */
	  var addAction = function addAction(id, func) {
	    return actionMap.set(id, function (args) {
	      var newState = store.updateState(nameSpace, func, args, id);
	      if (debugMode) {
	        stateHistory.push(newState);
	        console.log(">> GyreJS-'" + nameSpace + "'-store: Applying action '" + id + "'", args, func);
	      }
	    });
	  };

	  /**
	   * dispatch()
	   *
	   * @param {String} id Id
	   * @param {Array} args Function arguments
	   * @returns {void}
	   */
	  var dispatch = function dispatch(id) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (actionMap.has(id)) {
	      actionMap.get(id)(args);
	    } else {
	      console.warn("GyreJS-AH: Unregistered action requested: '" + id + "' with arguments:", args);
	    }
	  };

	  /**
	   * getStateList() returns the state list.
	   *
	   * @returns {Array} Full state history
	   */
	  var getStateHistory = function getStateHistory() {
	    return stateHistory;
	  };

	  // API
	  return {
	    addAction: addAction,
	    dispatch: dispatch,
	    getStateHistory: getStateHistory
	  };
	};

	exports["default"] = localAH;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _localAH = __webpack_require__(1);

	var _localAH2 = _interopRequireDefault(_localAH);

	var _localReducer = __webpack_require__(4);

	var _localReducer2 = _interopRequireDefault(_localReducer);

	var _localReactHoC = __webpack_require__(3);

	var _localReactHoC2 = _interopRequireDefault(_localReactHoC);

	/**
	 * localFactory()
	 *
	 * @param {Object} store Store instance
	 * @param {String} NS Namespace
	 * @param {Boolean} [debugMode] Debug mode switch
	 * @returns {{AH: *, getHoC: Function, getReducer: Function}} API
	 */
	var localFactory = function localFactory(store, NS) {
	  var debugMode = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	  var nameSpace = NS || "local";

	  // Public functions
	  /**
	   * Getter for reducer
	   *
	   * @param {String} matcher Matcher
	   * @param {Function} cb Callback
	   * @returns {Function} Reducer factory
	   */
	  var getReducer = function getReducer(matcher, cb) {
	    return _localReducer2["default"](store, matcher, cb, nameSpace, debugMode);
	  };

	  /**
	   * Getter for ReactJS HoC
	   *
	   * @returns {Function} HoC Factory
	   */
	  var getHoC = function getHoC() {
	    return _localReactHoC2["default"](getReducer);
	  };

	  /**
	   * setState()
	   *
	   * @param {Object|Immutable.Map} tState The state to set to this gyre.
	   * @returns {Immutable.Map} Current store state.
	   */
	  var setState = function setState(tState) {
	    return store.setState(tState, nameSpace);
	  };

	  // API
	  return {
	    AH: _localAH2["default"](store, nameSpace, debugMode),
	    getHoC: getHoC,
	    getReducer: getReducer,
	    setState: setState
	  };
	};

	exports["default"] = localFactory;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	/**
	 * Higher order Component factory for local gyre.
	 *
	 * @param {Function} reducer Reducer factory
	 * @returns {Function} HoC Factory
	 */
	var localHoCFactory = function localHoCFactory(reducer) {
	  /**
	   * localHoC()
	   *
	   * @param {String} matcher Matcher
	   * @param {Object} DefaultComponent Default component
	   * @param {*} initialData Initial state
	   * @returns {Object} React class
	   */
	  return function (matcher, DefaultComponent, initialData) {
	    return _react2["default"].createClass({
	      displayName: "GyreJS-localHoC",
	      getInitialState: function getInitialState() {
	        return initialData || null;
	      },
	      componentWillMount: function componentWillMount() {
	        this.unRegisterReducer = reducer(matcher, this.handleNewData);
	      },
	      componentWillUnmount: function componentWillUnmount() {
	        this.unRegisterReducer();
	      },
	      shouldComponentUpdate: function shouldComponentUpdate(nextState) {
	        return this.state !== nextState;
	      },
	      handleNewData: function handleNewData(data) {
	        this.setState({
	          data: data
	        });
	      },
	      render: function render() {
	        // Render wrapped component with current props and state as props.
	        var Component = this.state ? DefaultComponent : null;
	        return Component ? _react2["default"].createElement(Component, _extends({}, this.props, this.state)) : false;
	      }
	    });
	  };
	};

	exports["default"] = localHoCFactory;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * reducer()
	 *
	 * @param {Object} store Store instance
	 * @param {String} matcher Matcher
	 * @param {Function} cb Callback
	 * @param {String} nameSpace Namespace
	 * @returns {Function} Un-register function
	 */
	"use strict";

	exports.__esModule = true;
	var reducer = function reducer(store, matcher, cb, nameSpace) {
	  // Private functions
	  var update = function update(stateVar) {
	    var state = nameSpace ? stateVar.get(nameSpace) : stateVar;

	    if (state) {
	      var data = state.get(matcher);
	      cb(data);
	    } else {
	      cb(void 0);
	    }
	  };

	  // Return the un-register function right away.
	  return store.addReducer(update);
	};

	exports["default"] = reducer;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _immutable = __webpack_require__(6);

	var _immutable2 = _interopRequireDefault(_immutable);

	var IMap = _immutable2["default"].Map;

	/**
	 * Store() Factory function
	 *
	 * @returns {{addReducer: Function, getState: Function, setState: Function, updateState: Function}} API
	 */
	var store = function store() {
	  var state = IMap({});

	  // Private variables
	  var rId = 0;
	  var reducerMap = new Map();

	  // Private functions
	  /**
	   * Send update to all registered reducers
	   *
	   * @returns {void}
	   */
	  var sendUpdate = function sendUpdate() {
	    return reducerMap.forEach(function (reducer) {
	      reducer(state);
	    });
	  };

	  /**
	   * removeReducer() - Factory
	   * Remove reducer from the store
	   *
	   * @param {Number} id Reducer Id
	   * @returns {Function} removal function.
	   */
	  var removeReducer = function removeReducer(id) {
	    return function () {
	      return reducerMap["delete"](id);
	    };
	  };

	  /**
	   * setState() Overwrite the current state in the store.
	   * Use for setting an initial state or debugging.
	   *
	   * @param {Immutable.Map|Object} newState New state
	   * @param {String} [nameSpace] Namespace
	   * @returns {Immutable.Map} state Current state
	   */
	  var setNewState = function setNewState(newState, nameSpace) {
	    var tState = IMap.isMap(newState) ? newState : IMap(newState);
	    state = nameSpace ? state.set(nameSpace, tState) : tState;
	    sendUpdate();
	    return state;
	  };

	  // Public functions
	  /**
	   * Register a faucet with the store and send initial data.
	   *
	   * @param {Function} cb callback
	   * @returns {Function} un-register function
	   */
	  var addReducer = function addReducer(cb) {
	    var id = rId++;

	    // Save to local register
	    reducerMap.set(id, cb);

	    // Send state to reducer
	    cb(state);

	    // Return remover
	    return removeReducer(id);
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
	   * @param {Immutable.Map|Object} nState State
	   * @param {String} [nameSpace] Namespace
	   * @returns {Immutable.Map} New state
	   */
	  var setState = function setState(nState, nameSpace) {
	    return setNewState(nState, nameSpace);
	  };

	  /**
	   * updateState() applies a given reducer function to the state, which
	   * is supposed to return a new Immutable state.
	   *
	   * @param {String} nameSpace Namespace
	   * @param {Function} func Reducer function
	   * @param {Array} args Reducer function arguments
	   * @returns {Immutable.Map} state New state
	   */
	  var updateState = function updateState(nameSpace, func, args) {
	    setNewState(func.apply(undefined, [state.get(nameSpace) || IMap({})].concat(args)), nameSpace);
	    return state;
	  };

	  // API
	  return {
	    addReducer: addReducer,
	    getState: getState,
	    setState: setState,
	    updateState: updateState
	  };
	};

	exports["default"] = store;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;