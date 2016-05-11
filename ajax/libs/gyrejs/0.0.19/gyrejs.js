(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable"], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory(require("Immutable"));
	else
		root["GyreJS"] = factory(root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
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

	"use strict";

	var _gyrejs = __webpack_require__(3);

	var _gyrejs2 = _interopRequireDefault(_gyrejs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _gyrejs2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * actionHandler()
	 *
	 * @param {Object} store instance.
	 * @param {Object} options Options object.
	 * @returns {{addAction: Function, dispatch: Function}} API.
	 */
	var actionHandler = function actionHandler(store, options) {
	  // Private variables
	  var actionMap = new Map();
	  var middleWare = [];

	  // Public functions
	  /**
	   * dispatch() Dispatch a registered action by ID.
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
	      // Invoke all registered middleWare before running the final action.
	      middleWare.reduce(function (prev, next) {
	        return function () {
	          return next(options.NS, id, args, prev, dispatch);
	        };
	      }, function () {
	        return actionMap.get(id)(args.push(dispatch) && args);
	      })();
	    } else {
	      console.warn(">> GyreJS-'" + options.NS + "'-gyre: Unregistered action dispatched: '" + id + "' with arguments:", args, ". (This is a no-op)"); // eslint-disable-line no-console
	    }
	  };

	  /**
	   * addAction() Add a single action.
	   *
	   * @param {String} id Action ID.
	   * @param {Function} func Reducer function.
	   * the actions.
	   * @returns {void}
	   */
	  var addAction = function addAction(id, func) {
	    actionMap.set(id, function (args) {
	      return store.updateState(options.NS, func, args);
	    });
	  };

	  /**
	   * addActions() Add multiple actions.
	   *
	   * @param {Object} actions Key/func object of actions.
	   * the actions.
	   * @returns {void}
	   */
	  var addActions = function addActions(actions) {
	    Object.keys(actions).forEach(function (action) {
	      addAction(action, actions[action]);
	    });
	  };

	  /**
	   * use() Apply middleware.
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

	exports.default = actionHandler;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _actionHandler = __webpack_require__(1);

	var _actionHandler2 = _interopRequireDefault(_actionHandler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultActions = function defaultActions() {
	  return {};
	};
	/**
	 * gyreFactory()
	 *
	 * @param {Function} [actions] Default actions object.
	 * @param {Function} filters Reducer factory.
	 * @param {Immutable.Map|Object} [state] Initial state object.
	 * @returns {Function} Gyre factory function.
	 */
	var gyreFactory = function gyreFactory(_ref) {
	  var _ref$actions = _ref.actions;
	  var actions = _ref$actions === undefined ? defaultActions : _ref$actions;
	  var _ref$filters = _ref.filters;
	  var filters = _ref$filters === undefined ? {} : _ref$filters;
	  var _ref$state = _ref.state;
	  var state = _ref$state === undefined ? {} : _ref$state;
	  return function (store, options) {
	    // Private variables
	    var AH = (0, _actionHandler2.default)(store, options);

	    // Public functions
	    /**
	     * getFilter() Getter for reducer
	     *
	     * @param {*} id Id
	     * @param {Function} cb Callback
	     * @param {Array} [args] Remaining arguments.
	     * @returns {Function|void} Filter factory
	     */
	    var getFilter = function getFilter(id, cb) {
	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }

	      if (Object.prototype.hasOwnProperty.call(filters, id)) {
	        return filters[id].apply(filters, [store, AH.dispatch, cb, options].concat(args));
	      }
	      console.warn(">> GyreJS-'" + options.NS + "'-gyre: Unregistered filter requested: '" + id + "' with arguments:", args, "."); // eslint-disable-line no-console
	    };

	    /**
	     * setState()
	     *
	     * @param {Object|Immutable.Map} tState The state to set to this gyre.
	     * @returns {Immutable.Map} Current store state.
	     */
	    var setState = function setState(tState) {
	      return store.setState(tState, options.NS);
	    };

	    /**
	     * getState()
	     *
	     * @returns {Immutable.Map} Current store state.
	     */
	    var getState = function getState() {
	      return store.getState().get(options.NS);
	    };

	    // Setup
	    AH.addActions(actions(options));
	    setState(state);

	    // API
	    return {
	      addAction: AH.addAction,
	      addActions: AH.addActions,
	      dispatch: AH.dispatch,
	      getState: getState,
	      getFilter: getFilter,
	      nameSpace: options.NS,
	      setState: setState,
	      use: AH.use
	    };
	  };
	};

	exports.default = gyreFactory;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(4);

	var _store2 = _interopRequireDefault(_store);

	var _gyreFactory = __webpack_require__(2);

	var _gyreFactory2 = _interopRequireDefault(_gyreFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Private variables
	// Import sub libraries
	var gyres = new Map();
	var store = (0, _store2.default)();

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
	    console.warn(">> GyreJS: Error on create - Gyre factory '" + id + "' not registered."); // eslint-disable-line no-console
	  }
	  var newNameSpace = id + "-" + Date.now();
	  store.setState({
	    data: {}
	  }, newNameSpace);

	  return gyres.get(id)(store, Object.assign({}, { NS: newNameSpace }, options));
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

	/**
	 * unRegisterGyreFactory()
	 *
	 * @param {String} id Id of a registered gyre factory.
	 * @returns {boolean} Whether the factory has been un-registered.
	 */
	var unRegisterGyreFactory = function unRegisterGyreFactory(id) {
	  if (!gyres.has(id)) {
	    console.warn(">> GyreJS: Error on unregister - Gyre factory '" + id + "' not registered."); // eslint-disable-line no-console
	    return false;
	  }
	  return gyres.delete(id) && true;
	};

	exports.default = {
	  createGyre: createGyre,
	  registerGyreFactory: registerGyreFactory,
	  unRegisterGyreFactory: unRegisterGyreFactory,
	  GyreFactoryFactory: _gyreFactory2.default
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _immutable = __webpack_require__(5);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Store() Factory function
	 *
	 * @returns {{addFilter: Function, getState: Function, setState: Function, updateState: Function}} API
	 */
	var store = function store() {
	  // Private variables
	  var state = _immutable2.default.Map({});
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
	    return setNewState(_immutable2.default.Map.isMap(newState) ? newState : _immutable2.default.Map(newState), ns);
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
	    return setNewState(func.apply(undefined, _toConsumableArray([state.get(ns)].concat(args))) || state.get(ns), ns);
	  };

	  // API
	  return {
	    addFilter: addFilter,
	    getState: getState,
	    setState: setState,
	    updateState: updateState
	  };
	};

	exports.default = store;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;