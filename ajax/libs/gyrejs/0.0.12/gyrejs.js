(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable"], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory(require("Immutable"));
	else
		root["GyreJS"] = factory(root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_12__) {
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

	var _store = __webpack_require__(11);

	var _store2 = _interopRequireDefault(_store);

	var _gyresLocalFactory = __webpack_require__(3);

	var _gyresLocalFactory2 = _interopRequireDefault(_gyresLocalFactory);

	var _gyresSimpleRestFactory = __webpack_require__(7);

	var _gyresSimpleRestFactory2 = _interopRequireDefault(_gyresSimpleRestFactory);

	// Middleware

	var _middleWareDispatchLogger = __webpack_require__(10);

	var _middleWareDispatchLogger2 = _interopRequireDefault(_middleWareDispatchLogger);

	var middleWare = {
	  dispatchLogger: _middleWareDispatchLogger2["default"]
	};

	// Private variables
	var gyres = new Map();
	var store = _store2["default"]();
	var usedNameSpaces = [];

	// Public functions
	/**
	 * createGyre()
	 *
	 * @param {String} id Id of a registered gyre factory.
	 * @param {String} [nameSpace] Namespace of new gyre.
	 * @returns {Object} Gyre instance.
	 */
	var createGyre = function createGyre(id, nameSpace) {
	  if (!gyres.has(id)) {
	    console.warn("GyreJS: Gyre factory '" + id + "' not registered.");
	  }
	  if (usedNameSpaces.indexOf(nameSpace) !== -1) {
	    throw new Error("GyreJS ('" + id + "'): A gyre using the namespace '" + nameSpace + "' not registered.");
	  }
	  usedNameSpaces.push(nameSpace);
	  return gyres.get(id)(store, nameSpace);
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

	// Register standard gyres
	registerGyreFactory("local", _gyresLocalFactory2["default"]);
	registerGyreFactory("simpleRest", _gyresSimpleRestFactory2["default"]);

	exports.createGyre = createGyre;
	exports.middleWare = middleWare;
	exports.registerGyreFactory = registerGyreFactory;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _actionHandler = __webpack_require__(2);

	var _actionHandler2 = _interopRequireDefault(_actionHandler);

	/**
	 * gyreFactory()
	 *
	 * @param {String} defaultNS Default namespace name.
	 * @param {Function} Reducer Reducer factory.
	 * @param {Function} ReactHoC React HoC factory.
	 * @param {Object} [actions] Default actions object.
	 * @returns {Function} Gyre factory function.
	 */
	var gyreFactory = function gyreFactory(defaultNS, Reducer, ReactHoC, actions) {
	  return function (store, NS) {
	    var nameSpace = NS || defaultNS;
	    var AH = _actionHandler2["default"](store, nameSpace);
	    if (actions) {
	      AH.addActions(actions);
	    }

	    // Public functions
	    /**
	     * getReducer() Getter for reducer
	     *
	     * @param {String} matcher Matcher
	     * @param {Function} cb Callback
	     * @returns {Function} Reducer factory
	     */
	    var getReducer = function getReducer(matcher, cb) {
	      return Reducer(store, matcher, cb, nameSpace);
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

	    /**
	     * reactHoC()
	     *
	     * @param {Object} react React instance.
	     * @return {Function} HoC factory function.
	     */
	    var reactHoC = ReactHoC(getReducer);

	    // API
	    return {
	      addAction: AH.addAction,
	      addActions: AH.addActions,
	      dispatch: AH.dispatch,
	      getReducer: getReducer,
	      reactHoC: reactHoC,
	      setState: setState,
	      use: AH.use
	    };
	  };
	};

	exports["default"] = gyreFactory;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * localAH()
	 *
	 * @param {Object} store instance.
	 * @param {String} nameSpace state key.
	 * @returns {{addAction: Function, dispatch: Function}} API.
	 */
	"use strict";

	exports.__esModule = true;
	var localAH = function localAH(store, nameSpace) {
	  // Private variables
	  var actionMap = new Map();
	  var middleWare = [];

	  // Public functions
	  /**
	   * dispatch()
	   *
	   * @param {String} id Id
	   * @param {Array} args Function arguments.
	   * @returns {void}
	   */
	  var dispatch = function dispatch(id) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (actionMap.has(id)) {
	      middleWare.reduce(function (prev, next) {
	        return function () {
	          return next(nameSpace, id, args, prev);
	        };
	      }, function () {
	        return actionMap.get(id)(args);
	      })();
	    } else {
	      console.warn("GyreJS-'" + nameSpace + "'-AH: Unregistered action requested: '" + id + "' with arguments:", args);
	    }
	  };

	  /**
	   * addAction()
	   *
	   * @param {String} id Action ID.
	   * @param {Function} func Reducer function.
	   * @param {Boolean} passDispatch Whether to pass the dispatch method to
	   * the actions.
	   * @returns {void}
	   */
	  var addAction = function addAction(id, func, passDispatch) {
	    return actionMap.set(id, function (args) {
	      store.updateState(nameSpace, func, args, passDispatch ? dispatch : null);
	    });
	  };

	  /**
	   * addActions()
	   *
	   * @param {Object} actions Key/func object of actions.
	   * @param {Boolean} passDispatch Whether to pass the dispatch method to
	   * the actions.
	   * @returns {void}
	   */
	  var addActions = function addActions(actions, passDispatch) {
	    Object.keys(actions).forEach(function (action) {
	      addAction(action, actions[action], passDispatch);
	    });
	  };

	  /**
	   * use()
	   *
	   * @param {Function} mware Middleware function.
	   * @returns {void}
	   */
	  var use = function use(mware) {
	    middleWare.unshift(mware);
	  };

	  // API
	  return {
	    addAction: addAction,
	    addActions: addActions,
	    dispatch: dispatch,
	    use: use
	  };
	};

	exports["default"] = localAH;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _gyreFactory = __webpack_require__(1);

	var _gyreFactory2 = _interopRequireDefault(_gyreFactory);

	var _reducer = __webpack_require__(5);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _reactHoC = __webpack_require__(4);

	var _reactHoC2 = _interopRequireDefault(_reactHoC);

	exports["default"] = _gyreFactory2["default"]("local", _reducer2["default"], _reactHoC2["default"]);
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Higher order Component factory for local gyre.
	 *
	 * @param {Function} reducer Reducer factory.
	 * @returns {Function} HoC Factory.
	 */
	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var localHoCFactory = function localHoCFactory(reducer) {
	  /**
	   * localHoC()
	   *
	   * @param {String} matcher Matcher.
	   * @param {Object} DefaultComponent Default component.
	   * @param {*} initialData Initial state.
	   * @returns {Object} React class
	   */
	  return function (matcher, DefaultComponent) {
	    return React.createClass({
	      displayName: "GyreJS-localHoC",
	      getInitialState: function getInitialState() {
	        return {
	          data: null
	        };
	      },
	      componentWillMount: function componentWillMount() {
	        this.unRegisterReducer = reducer(matcher, this.handleNewData);
	      },
	      componentWillUnmount: function componentWillUnmount() {
	        this.unRegisterReducer();
	      },
	      shouldComponentUpdate: function shouldComponentUpdate(nextState) {
	        return this.state.data !== nextState.data;
	      },
	      handleNewData: function handleNewData(data) {
	        this.setState({
	          data: data
	        });
	      },
	      render: function render() {
	        return typeof this.state.data !== "undefined" ? React.createElement(DefaultComponent, _extends({}, this.props, this.state)) : false;
	      }
	    });
	  };
	};

	exports["default"] = localHoCFactory;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * reducer()
	 *
	 * @param {Object} store Store instance
	 * @param {Array|String} matcher Matcher
	 * @param {Function} cb Callback
	 * @param {String} nameSpace Namespace
	 * @returns {Function} Un-register function
	 */
	"use strict";

	exports.__esModule = true;
	var reducer = function reducer(store, matcher, cb, nameSpace) {
	  // Private functions
	  var update = function update(stateVar) {
	    var state = stateVar.get(nameSpace);
	    var matchValue = Array.isArray(matcher) ? matcher : [matcher];

	    if (state) {
	      cb(matchValue.reduce(function (memo, val) {
	        memo[val] = state.get(val);
	        return memo;
	      }, {}));
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
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var actions = {};

	var ADD_QUERY = "ADD_QUERY";
	actions[ADD_QUERY] = function (state, dispatcher, query) {
	  return state.get("queries").set(query, query);
	};

	exports["default"] = {
	  passDispatch: true,
	  actions: actions
	};
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _gyreFactory = __webpack_require__(1);

	var _gyreFactory2 = _interopRequireDefault(_gyreFactory);

	var _reducer = __webpack_require__(9);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _reactHoC = __webpack_require__(8);

	var _reactHoC2 = _interopRequireDefault(_reactHoC);

	var _actions = __webpack_require__(6);

	var _actions2 = _interopRequireDefault(_actions);

	exports["default"] = _gyreFactory2["default"]("simpleRest", _reducer2["default"], _reactHoC2["default"], _actions2["default"]);
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Higher order Component factory for local gyre.
	 *
	 * @param {Function} reducer Reducer factory.
	 * @returns {Function} HoC Factory.
	 */
	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var localHoCFactory = function localHoCFactory(reducer) {
	  /**
	   * localHoC()
	   *
	   * @param {String} matcher Matcher.
	   * @param {Object} DefaultComponent Default component.
	   * @param {*} initialData Initial state.
	   * @returns {Object} React class
	   */
	  return function (matcher, DefaultComponent) {
	    return React.createClass({
	      displayName: "GyreJS-localHoC",
	      getInitialState: function getInitialState() {
	        return {
	          data: null
	        };
	      },
	      componentWillMount: function componentWillMount() {
	        this.unRegisterReducer = reducer(matcher, this.handleNewData);
	      },
	      componentWillUnmount: function componentWillUnmount() {
	        this.unRegisterReducer();
	      },
	      shouldComponentUpdate: function shouldComponentUpdate(nextState) {
	        return this.state.data !== nextState.data;
	      },
	      handleNewData: function handleNewData(data) {
	        this.setState({
	          data: data
	        });
	      },
	      render: function render() {
	        return typeof this.state.data !== "undefined" ? React.createElement(DefaultComponent, _extends({}, this.props, this.state)) : false;
	      }
	    });
	  };
	};

	exports["default"] = localHoCFactory;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * reducer()
	 *
	 * @param {Object} store Store instance
	 * @param {Array|String} matcher Matcher
	 * @param {Function} cb Callback
	 * @param {String} nameSpace Namespace
	 * @returns {Function} Un-register function
	 */
	"use strict";

	exports.__esModule = true;
	var reducer = function reducer(store, matcher, cb, nameSpace) {
	  // Private functions
	  var update = function update(stateVar) {
	    var state = stateVar.get(nameSpace);
	    var matchValue = Array.isArray(matcher) ? matcher : [matcher];

	    if (state) {
	      cb(matchValue.reduce(function (memo, val) {
	        memo[val] = state.get(val);
	        return memo;
	      }, {}));
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
/* 10 */
/***/ function(module, exports) {

	/**
	 * dispatchLogger()
	 *
	 * @param {String} nameSpace Gyre namespace.
	 * @param {String} id Action Id.
	 * @param {Array} args Action arguments array.
	 * @param {Function} next Call next function in chain.
	 * @returns {void}
	 */
	"use strict";

	exports.__esModule = true;
	var dispatchLogger = function dispatchLogger(nameSpace, id, args, next) {
	  console.log(">> GyreJS-'" + nameSpace + "'-store: Applying action '" + id + "' with arguments: ", args);
	  next();
	};

	exports["default"] = dispatchLogger;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _immutable = __webpack_require__(12);

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
	      return reducer(state);
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
	   * @param {Immutable.Map|Object} nState State.
	   * @param {String} [nameSpace] Namespace.
	   * @returns {Immutable.Map} New state.
	   */
	  var setState = function setState(nState, nameSpace) {
	    return setNewState(nState, nameSpace);
	  };

	  /**
	   * updateState() applies a given reducer function to the state, which
	   * is supposed to return a new Immutable state.
	   *
	   * @param {String} nameSpace Namespace.
	   * @param {Function} func Reducer function.
	   * @param {Array} args Reducer function arguments.
	   * @param {Function} [dispatch] Dispatcher function.
	   * @returns {Immutable.Map} state New state.
	   */
	  var updateState = function updateState(nameSpace, func, args, dispatch) {
	    var farg = [state.get(nameSpace) || IMap({})];
	    if (dispatch) {
	      farg.concat(dispatch);
	    }
	    setNewState(func.apply(undefined, farg.concat(args)), nameSpace);
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
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }
/******/ ])
});
;