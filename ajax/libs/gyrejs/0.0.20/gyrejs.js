(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["Immutable"], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory(require("Immutable"));
	else
		root["GyreJS"] = factory(root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
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

	var _main = __webpack_require__(3);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _main2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Action creator and dispatcher.
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
	   * Dispatch a registered action by ID.
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
	      // First call functions which have been added first.
	      middleWare.reduce(function (nextToCall, firstToCall) {
	        return function () {
	          return firstToCall(options.NS, id, args, nextToCall, dispatch);
	        };
	      }, function () {
	        return actionMap.get(id)(args.push(dispatch) && args);
	      })();
	    } else {
	      console.warn(">> GyreJS-'" + options.NS + "'-gyre: Unregistered action dispatched: '" + id + "' with arguments:", args, ". (This is a no-op)"); // eslint-disable-line no-console
	    }
	  };

	  /**
	   * Add a single action.
	   *
	   * @param {String} id Action ID.
	   * @param {Function} func Reducer function.
	   * the actions.
	   * @returns {void}
	   */
	  var addAction = function addAction(id, func) {
	    actionMap.set(id, function (args) {
	      return store.update(options.NS, func, args);
	    });
	  };

	  /**
	   * Add multiple actions.
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
	   * Apply middleware. Middleware is called in the order in which it's added.
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

	var _selectorFactory = __webpack_require__(4);

	var _selectorFactory2 = _interopRequireDefault(_selectorFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var defaultActions = function defaultActions() {
	  return {};
	};

	/**
	 * Gyre Factory
	 *
	 * @param {Function} [actions] Default actions object.
	 * @param {Function} selectors Default selectors object.
	 * @param {Immutable.Map|Object} [state] Initial state object.
	 * @returns {Function} Gyre factory function.
	 */
	var gyreFactory = function gyreFactory() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$actions = _ref.actions;
	  var actions = _ref$actions === undefined ? defaultActions : _ref$actions;
	  var _ref$selectors = _ref.selectors;
	  var selectors = _ref$selectors === undefined ? {} : _ref$selectors;
	  var _ref$state = _ref.state;
	  var state = _ref$state === undefined ? {} : _ref$state;
	  return function (store, options) {
	    // Private variables
	    var AH = (0, _actionHandler2.default)(store, options);
	    var selectorFactory = (0, _selectorFactory2.default)(store, options, AH.dispatch);
	    var selObj = {};

	    // Public methods
	    /**
	     * Add a selector factory function.
	     *
	     * @param {String} id Id
	     * @param {Function} selector Selector factory function.
	     * @param {boolean} [replace] Whether to overwrite any existing selector registered by the id.
	     * @returns {void}
	     */
	    var addSelector = function addSelector(id, selector, replace) {
	      if (!Object.prototype.hasOwnProperty.call(selObj, id) || replace) {
	        selObj[id] = selector;
	      } else {
	        console.warn(">> GyreJS-'" + options.NS + "'-gyre: AddFilter -> Selector with id: '" + id + "' already exists."); // eslint-disable-line no-console
	      }
	    };

	    /**
	     * Add multiple selectors.
	     *
	     * @param {Object} selectorsObj Key/func object of selector factory functions.
	     * @param {boolean} [replace] Whether to overwrite any existing selector registered by the id.
	     * @returns {void}
	     */
	    var addSelectors = function addSelectors(selectorsObj, replace) {
	      Object.keys(selectorsObj).forEach(function (selector) {
	        addSelector(selector, selectorsObj[selector], replace);
	      });
	    };

	    /**
	     * Selector factory.
	     *
	     * @param {Function|Object|String} sel Selector function, object or id.
	     * @param {Function} cb Callback to invoke after selector update.
	     * @param {Array} [args] Remaining arguments.
	     * @returns {Function|void} Selector Un-subscribe function.
	     */
	    var createSelector = function createSelector(sel, cb) {
	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }

	      if (typeof sel === "function" || (typeof sel === "undefined" ? "undefined" : _typeof(sel)) === "object") {
	        return selectorFactory(sel, cb);
	      }
	      if (Object.prototype.hasOwnProperty.call(selObj, sel)) {
	        return selectorFactory(selObj[sel].apply(selObj, args), cb);
	      }
	      console.warn(">> GyreJS-'" + options.NS + "'-gyre: Unregistered selector requested: '" + sel + "' with arguments:", args, "."); // eslint-disable-line no-console
	    };

	    /**
	     * Set the gyre state. Overwrites the current state.
	     *
	     * @param {Object|Immutable.Map} tState The state to set to this gyre.
	     * @returns {Immutable.Map} Current store state.
	     */
	    var setState = function setState(tState) {
	      return store.setState(tState, options.NS);
	    };

	    /**
	     * Get the current gyre state.
	     *
	     * @returns {Immutable.Map} Current gyre store state.
	     */
	    var getState = function getState() {
	      return store.getState().get(options.NS);
	    };

	    // Setup
	    AH.addActions(actions(options));
	    addSelectors(selectors);
	    setState(state);

	    // Gyre API
	    return {
	      addAction: AH.addAction,
	      addActions: AH.addActions,
	      addSelector: addSelector,
	      addSelectors: addSelectors,
	      createSelector: createSelector,
	      dispatch: AH.dispatch,
	      getState: getState,
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

	var _store = __webpack_require__(5);

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
	 * Create a new gyre instance. Based on a factory function by id.
	 *
	 * @param {String} id Id of a registered gyre factory.
	 * @param {Object} [options] Options object for gyre.
	 * @returns {Object} Gyre instance.
	 */
	var createGyre = function createGyre(id, options) {
	  if (!gyres.has(id)) {
	    console.warn(">> GyreJS: Error on create - Gyre factory '" + id + "' not registered."); // eslint-disable-line no-console
	  }

	  // Generate a unique namespace.
	  var NS = id + "-" + Date.now();
	  store.setState({}, NS);

	  // Return gyre instance object.
	  return gyres.get(id)(store, Object.assign({}, options, { NS: NS }));
	};

	/**
	 * Register a gyre factory function.
	 *
	 * @param {String} id Id of to register gyre.
	 * @param {Function} factory Gyre factory function.
	 * @returns {void}
	 */
	var registerGyreFactory = function registerGyreFactory(id, factory) {
	  gyres.set(id, factory);
	};

	/**
	 * Un-register a gyre factory function.
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
	  createGyreFactory: _gyreFactory2.default
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/**
	 * Selector factory function
	 *
	 * @param {Object} store Store instance.
	 * @param {String} nameSpace Gyre namespace.
	 * @param {Function} dispatch Gyre action dispatch function.
	 * @returns {Function} Selector un-register function.
	 */
	var selectorFactory = function selectorFactory(store, _ref, dispatch) {
	  var NS = _ref.NS;
	  return function (selector, cb) {
	    // Check if the provided selector is either an object with the required api
	    // or a function.
	    if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object" && typeof selector.onUpdate !== "function") {
	      throw new Error("GyreJS: Selector object should expose an 'onUpdate' method.");
	    }
	    if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) !== "object" && typeof selector !== "function") {
	      throw new Error("GyreJS: Selector should either be a function or an object with an 'onUpdate' method.");
	    }

	    // Invoke subscribe method if present.
	    if (typeof selector.onSubscribe === "function") {
	      selector.onSubscribe(dispatch);
	    }

	    // Register callback (update) function with the store.
	    var update = (typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object" ? selector.onUpdate : selector;
	    var storeCallback = function storeCallback(state) {
	      update(state, cb);
	    };
	    var unRegister = store.addSelector(storeCallback, NS);

	    // Return selector un-register function.
	    // Invoke onUnsubscribe method if present.
	    return function () {
	      unRegister();
	      if (typeof selector.onUnsubscribe === "function") {
	        selector.onUnsubscribe(dispatch);
	      }
	    };
	  };
	};

	exports.default = selectorFactory;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _immutable = __webpack_require__(6);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Store factory function
	 *
	 * @returns {{addSelector: Function, getState: Function, setState: Function, updateState: Function}} Store API
	 */
	var store = function store() {
	  // Private variables
	  var state = _immutable2.default.Map({});
	  var selectorList = {};

	  // Private methods
	  /**
	   * Send update to all registered selectors.
	   *
	   * @returns {void}
	   */
	  var sendUpdate = function sendUpdate() {
	    Object.keys(selectorList).forEach(function (ns) {
	      return (selectorList[ns] || []).forEach(function (selector) {
	        return selector(ns === "all" ? state : state.get(ns));
	      });
	    });
	  };

	  /**
	   * Remove selector from the store
	   *
	   * @param {String} ns Namespace.
	   * @param {Function} cb Selector callback.
	   * @returns {Function} removal function.
	   */
	  var removeSelector = function removeSelector(ns, cb) {
	    return function () {
	      return selectorList[ns] = selectorList[ns].filter(function (selector) {
	        return selector !== cb;
	      });
	    };
	  };

	  /**
	   * Overwrite the current state in the store.
	   * Use for setting an initial state or debugging.
	   *
	   * @param {Immutable.Map} newState New state.
	   * @param {String} ns Namespace.
	   * @returns {Immutable.Map} state Current state
	   */
	  var setNewState = function setNewState(newState, ns) {
	    if (state.get(ns) !== newState) {
	      state = state.set(ns, newState);
	      sendUpdate(ns);
	    }
	    return state;
	  };

	  // Public methods
	  /**
	   * addSelector() Register a selector with the store and send initial data.
	   *
	   * @param {Function} cb callback.
	   * @param {String} [ns] Namespace.
	   * @returns {Function} un-register function.
	   */
	  var addSelector = function addSelector(cb) {
	    var ns = arguments.length <= 1 || arguments[1] === undefined ? "all" : arguments[1];

	    if (!selectorList[ns]) {
	      selectorList[ns] = [];
	    }

	    // Save to local register
	    selectorList[ns].push(cb);

	    // Request update to make sure the new filter gets data asap.
	    cb(ns === "all" ? state : state.get(ns));

	    // Return remover
	    return removeSelector(ns, cb);
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
	   * Applies a given reducer function to the state, which
	   * is supposed to return a new Immutable state.
	   * If nothing is returned, the original state is kept.
	   *
	   * @param {String} ns Namespace.
	   * @param {Function} func Reducer function.
	   * @param {Array} args Reducer function arguments.
	   * @returns {Immutable.Map} state New state.
	   */
	  var update = function update(ns, func, args) {
	    return setNewState(func.apply(undefined, _toConsumableArray([state.get(ns)].concat(args))) || state.get(ns), ns);
	  };

	  // API
	  return {
	    addSelector: addSelector,
	    getState: getState,
	    setState: setState,
	    update: update
	  };
	};

	exports.default = store;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }
/******/ ])
});
;