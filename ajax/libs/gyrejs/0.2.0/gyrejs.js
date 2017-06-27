(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GyreJS"] = factory();
	else
		root["GyreJS"] = factory();
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

	"use strict";

	var _main = __webpack_require__(9);

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
	var aggregateFactory = function aggregateFactory(_internal, _ref) {
	  var reducer = _ref.reducer;
	  var eventFilter = _ref.eventFilter;
	  var _ref$methods = _ref.methods;
	  var methods = _ref$methods === undefined ? {} : _ref$methods;

	  return function (options) {
	    var state = undefined;

	    /*
	      Private methods
	     */
	    var setInitialState = function setInitialState() {
	      state = reducer(void 0, { type: null });
	    };

	    /**
	     *
	     * @param evt
	     */
	    var applyEvent = function applyEvent(evt) {
	      if (evt.type === "__RESET__") {
	        setInitialState();
	      } else {
	        state = Object.assign({}, reducer(state, evt));
	      }
	    };

	    /**
	     *
	     * @param id
	     * @param args
	     */
	    var trigger = function trigger(id) {
	      var _internal$dispatcher;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      (_internal$dispatcher = _internal.dispatcher).triggerEvent.apply(_internal$dispatcher, [id].concat(args));
	    };

	    var getEventsFromBus = function getEventsFromBus() {
	      return eventFilter ? _internal.bus.getEvents().filter(function (event) {
	        return event.type === "__RESET__" ? true : eventFilter(event);
	      }) : _internal.bus.getEvents();
	    };

	    /*
	     Setup
	     */
	    setInitialState();
	    getEventsFromBus().forEach(function (evt) {
	      return applyEvent(evt);
	    });

	    /*
	     Setup
	     */
	    return Object.freeze(Object.keys(methods).reduce(function (prev, key) {
	      prev[key] = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }

	        methods[key].apply(null, [state, trigger].concat(args, [options]));
	      };
	      return prev;
	    }, {}));
	  };
	};

	exports.default = aggregateFactory;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var busFactory = function busFactory() {
	  var newEvents = [];
	  var eventList = [];
	  var projections = [];
	  projections.ticker = function (cb) {
	    return cb();
	  };

	  /**
	   * Send update to all registered selectors.
	   *
	   * @param {Function} [cb] Specific callback to solely invoke.
	   * @returns {Function} sendUpdate function for a namespace.
	   */
	  var sendUpdate = function sendUpdate(cb) {
	    return function () {
	      projections.updateRequested = false;

	      // After new evnets processed, concat to eventlist
	      eventList = eventList.concat(newEvents);

	      if (typeof cb === "function") {
	        eventList.forEach(function (event) {
	          return cb(event);
	        });
	      } else {
	        newEvents.forEach(function (event) {
	          projections.forEach(function (projection) {
	            return projection(event);
	          });
	        });
	        newEvents = [];
	      }
	    };
	  };

	  /**
	   * Request to issue update to filters of a given namespace.
	   *
	   * @param {Function} [cb] Specific callback to solely invoke.
	   * @returns {void}
	   */
	  var requestUpdate = function requestUpdate(cb) {
	    if (!projections.updateRequested) {
	      projections.updateRequested = true;
	      projections.ticker(sendUpdate(cb));
	    }
	  };

	  /**
	   * Remove selector from the store
	   *
	   * @param {Function} cb Selector callback.
	   * @returns {Function} removal function.
	   */
	  var removeProjection = function removeProjection(cb) {
	    return function () {
	      return projections.splice(projections.indexOf(cb), 1);
	    };
	  };

	  /**
	   * Register a selector with the store and send initial data.
	   *
	   * @param {Function} cb callback.
	   * @param {Boolean} playAll Play all existing events to this topology.
	   * @returns {Function} un-register function.
	   */
	  var addProjection = function addProjection(cb, playAll) {
	    // Save to local register
	    projections.push(cb);

	    if (playAll) {
	      requestUpdate(cb);
	    }

	    // Return function to remove selector from store.
	    return removeProjection(cb);
	  };

	  /**
	   * Triggers an event on the bus.
	   *
	   * @param {Object} evt Event.
	   * @returns {void}
	   */
	  var trigger = function trigger(evt) {
	    newEvents.push(evt);
	    requestUpdate();
	    return evt;
	  };

	  /**
	   * Set tick function
	   *
	   * The tick function is added as a property to the topology array.
	   *
	   * @param {Function} ticker Store update tick function.
	   * @returns {void}
	   */
	  var setTicker = function setTicker(ticker) {
	    if (typeof ticker !== "function") {
	      throw new Error("GyreJS (setTicker): Ticker should be a function.");
	    }

	    projections.ticker = ticker;
	  };

	  /**
	   * @returns {Array} Array of events.
	   */
	  var getEvents = function getEvents() {
	    return eventList.concat(newEvents);
	  };

	  return {
	    addProjection: addProjection,
	    getEvents: getEvents,
	    setTicker: setTicker,
	    trigger: trigger
	  };
	};

	exports.default = busFactory;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Create commands and events
	 * @param {Object} aggregates Object containing the aggregates.
	 * @param {Object} dispatcher Dispatcher instance.
	 * @returns {Function} Command factory function.
	 */
	var commandFactory = function commandFactory(aggregates, _ref) {
	  var dispatcher = _ref.dispatcher;

	  /**
	   * @param {Function|String} func Command function or aggregate method name.
	   * @param {String} [id] Aggregate method name.
	   * @returns {Object} Command object
	   */
	  return function (func, id) {
	    /**
	     * Allow direct method calling on aggregates.
	     * Assumes a 1:1 mapping of command name -> aggregate method.
	     */
	    if (typeof func === "string" || Array.isArray(func)) {
	      return function () {
	        var aName = Array.isArray(func) ? func[0] : func;
	        var options = Array.isArray(func) && func.length > 1 ? func[1] : void 0;

	        if (!Object.prototype.hasOwnProperty.call(aggregates, aName)) {
	          throw new Error("GyreJS (Command): Cannot find aggregate " + aName + "; needed for command " + id);
	        }
	        var aggregate = aggregates[aName](options);
	        if (Object.prototype.hasOwnProperty.call(aggregate, id) && typeof aggregate[id] === "function") {
	          return aggregate[id].apply(aggregate, arguments);
	        }
	        throw new Error("GyreJS (addCommand): Cannot find method " + func + " on aggregate " + id);
	      };
	    }

	    return func.bind({
	      getAggregate: function getAggregate(gId, options) {
	        return aggregates[gId](options);
	      },
	      issue: dispatcher.issueCommand,
	      trigger: dispatcher.triggerEvent
	    });
	  };
	};

	exports.default = commandFactory;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var dispatcherFactory = function dispatcherFactory(_internal, commands, events) {
	  /*
	    Public
	   */
	  var triggerEvent = function triggerEvent(evtId) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (typeof events[evtId] !== "function") {
	      console.error("GyreJS (triggerEvent): Event " + evtId + " not registered."); // eslint-disable-line no-console
	      return false;
	    }
	    return _internal.bus.trigger(events[evtId].apply(events, args));
	  };

	  var issueCommand = function issueCommand(cmdId) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    if (typeof commands[cmdId] !== "function") {
	      console.error("GyreJS (issueCommand): Command " + cmdId + " not registered."); // eslint-disable-line no-console
	      return false;
	    }
	    commands[cmdId].apply(commands, args);
	  };

	  var getEventInstance = function getEventInstance(evtId) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }

	    if (typeof events[evtId] !== "function") {
	      console.error("GyreJS (getEventInstance): Event " + evtId + " not registered."); // eslint-disable-line no-console
	      return false;
	    }
	    return events[evtId].apply(events, args);
	  };

	  return {
	    getEventInstance: getEventInstance,
	    issueCommand: issueCommand,
	    triggerEvent: triggerEvent
	  };
	};

	exports.default = dispatcherFactory;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Create events
	 * @param {String} id Id of event.
	 * @param {Function} func Event factory function.
	 * @returns {Function} Event factory function.
	 */
	var eventFactory = function eventFactory(id, func) {
	  /**
	   * @param {Object} props Properties
	   * @returns {Object} Event object
	   */
	  return function () {
	    return Object.freeze(Object.assign({}, func.apply(undefined, arguments), { type: id }));
	  };
	};

	exports.default = eventFactory;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bus = __webpack_require__(2);

	var _bus2 = _interopRequireDefault(_bus);

	var _dispatcher = __webpack_require__(4);

	var _dispatcher2 = _interopRequireDefault(_dispatcher);

	var _commands2 = __webpack_require__(3);

	var _commands3 = _interopRequireDefault(_commands2);

	var _events2 = __webpack_require__(5);

	var _events3 = _interopRequireDefault(_events2);

	var _aggregates2 = __webpack_require__(1);

	var _aggregates3 = _interopRequireDefault(_aggregates2);

	var _projections2 = __webpack_require__(7);

	var _projections3 = _interopRequireDefault(_projections2);

	var _tickers = __webpack_require__(8);

	var _tickers2 = _interopRequireDefault(_tickers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Gyre Factory
	 *
	 * @param {Function} [ticker] Store update tick function.
	 * @param {Object} [commands] Commands object.
	 * @param {Object} [events] Events object.
	 * @param {Object} [aggregates] Aggregates object.
	 * @param {Object} [projections] Projections object.
	 * @returns {Function} Gyre factory function.
	 */
	var gyreFactory = function gyreFactory() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$ticker = _ref.ticker;
	  var ticker = _ref$ticker === undefined ? "synchronous" : _ref$ticker;
	  var _ref$commands = _ref.commands;
	  var commands = _ref$commands === undefined ? {} : _ref$commands;
	  var _ref$events = _ref.events;
	  var events = _ref$events === undefined ? {} : _ref$events;
	  var _ref$aggregates = _ref.aggregates;
	  var aggregates = _ref$aggregates === undefined ? {} : _ref$aggregates;
	  var _ref$projections = _ref.projections;
	  var projections = _ref$projections === undefined ? {} : _ref$projections;
	  return function (_ref2) {
	    var gId = _ref2.gId;
	    var gyrejsDebugger = _ref2.gyrejsDebugger;

	    // Private variables
	    var API = {};
	    var _aggregates = {};
	    var _commands = {};
	    var _events = {};
	    var _projections = {};

	    // Gyre internal instances
	    var _internal = {};
	    _internal.bus = (0, _bus2.default)();
	    _internal.dispatcher = (0, _dispatcher2.default)(_internal, _commands, _events);
	    var commandFactory = (0, _commands3.default)(_aggregates, _internal);

	    // Public methods
	    /**
	     *
	     * @type {Function}
	     */
	    var addCommand = API.addCommand = function (id, cFunction, replace) {
	      if (!Object.prototype.hasOwnProperty.call(_commands, id) || replace) {
	        _commands[id] = commandFactory(cFunction, id);
	      } else {
	        console.warn(">> GyreJS-gyre: AddCommand -> Selector with id: '" + id + "' already exists."); // eslint-disable-line no-console
	      }
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addCommands = API.addCommands = function (commandsObj, replace) {
	      if ((typeof commandsObj === "undefined" ? "undefined" : _typeof(commandsObj)) !== "object") {
	        throw new Error("GyreJS (addSelectors): first argument (selectors) should be an object.");
	      }

	      Object.keys(commandsObj).forEach(function (command) {
	        API.addCommand(command, commandsObj[command], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addEvent = API.addEvent = function (id, eFunction, replace) {
	      if (!Object.prototype.hasOwnProperty.call(_events, id) || replace) {
	        _events[id] = (0, _events3.default)(id, eFunction);
	      } else {
	        console.warn(">> GyreJS-gyre: addEvent -> Selector with id: '" + id + "' already exists."); // eslint-disable-line no-console
	      }
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addEvents = API.addEvents = function (eventsObj, replace) {
	      if ((typeof eventsObj === "undefined" ? "undefined" : _typeof(eventsObj)) !== "object") {
	        throw new Error("GyreJS (addEvents): first argument (selectors) should be an object.");
	      }

	      Object.keys(eventsObj).forEach(function (event) {
	        API.addEvent(event, eventsObj[event], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addAggregate = API.addAggregate = function (id, aFunction, replace) {
	      if (!Object.prototype.hasOwnProperty.call(_aggregates, id) || replace) {
	        _aggregates[id] = (0, _aggregates3.default)(_internal, aFunction);
	      } else {
	        console.warn(">> GyreJS-gyre: addEvent -> Selector with id: '" + id + "' already exists."); // eslint-disable-line no-console
	      }
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addAggregates = API.addAggregates = function (_aggregatesObj, replace) {
	      if ((typeof _aggregatesObj === "undefined" ? "undefined" : _typeof(_aggregatesObj)) !== "object") {
	        throw new Error("GyreJS (addEvents): first argument (selectors) should be an object.");
	      }

	      Object.keys(_aggregatesObj).forEach(function (id) {
	        API.addAggregate(id, _aggregatesObj[id], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addProjection = API.addProjection = function (id, pFunction, replace) {
	      if (!Object.prototype.hasOwnProperty.call(_projections, id) || replace) {
	        _projections[id] = (0, _projections3.default)(_internal, pFunction);
	      } else {
	        console.warn(">> GyreJS-gyre: addProjection -> Projection with id: '" + id + "' already exists."); // eslint-disable-line no-console
	      }
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var addProjections = API.addProjections = function (prjctsObj, replace) {
	      if ((typeof prjctsObj === "undefined" ? "undefined" : _typeof(prjctsObj)) !== "object") {
	        throw new Error("GyreJS (addProjections): first argument should be an object.");
	      }

	      Object.keys(prjctsObj).forEach(function (id) {
	        API.addProjection(id, prjctsObj[id], replace);
	      });
	      return API;
	    };

	    /**
	     *
	     * @type {Function}
	     */
	    var removeProjection = API.removeProjection = function (id) {
	      if (!_projections.hasOwnProperty(id)) {
	        console.warn(">> GyreJS: (removeProjection) A projection with id:'" + id + "' is not registered."); // eslint-disable-line no-console
	        return false;
	      }

	      if (_projections[id].destroy(id)) {
	        delete _projections[id];
	        return true;
	      }
	      return false;
	    };

	    /**
	     *
	     * @param id
	     * @param callback
	     * @returns {*}
	     */
	    var addListener = function addListener(id, callback) {
	      if (!_projections.hasOwnProperty(id)) {
	        console.warn(">> GyreJS: (addListener) A projection with id:'" + id + "' is not registered."); // eslint-disable-line no-console
	        return false;
	      }
	      if (typeof callback !== "function") {
	        throw new Error("GyreJS (addListener): The second argument, callback, should be a function.");
	      }

	      return _projections[id].addListener(callback);
	    };

	    /**
	     * Issue a registered command.
	     *
	     * @param {Array} args Arguments.
	     * @returns {Object} API Chainable gyre instance.
	     */
	    var issue = function issue() {
	      var _internal$dispatcher;

	      (_internal$dispatcher = _internal.dispatcher).issueCommand.apply(_internal$dispatcher, arguments);
	      return API;
	    };

	    /**
	     * Trigger a registered event.
	     *
	     * @param {Array} args Arguments.
	     * @returns {Object} API Chainable gyre instance.
	     */
	    var trigger = function trigger() {
	      var _internal$dispatcher2;

	      (_internal$dispatcher2 = _internal.dispatcher).triggerEvent.apply(_internal$dispatcher2, arguments);
	      return API;
	    };

	    // Setup
	    addCommands(commands);
	    addEvents(events);
	    addAggregates(aggregates);
	    addProjections(projections);
	    _internal.bus.setTicker(_tickers2.default.get(ticker));

	    // Gyre API
	    Object.assign(API, {
	      addCommand: addCommand,
	      addCommands: addCommands,
	      addEvent: addEvent,
	      addEvents: addEvents,
	      addAggregate: addAggregate,
	      addAggregates: addAggregates,
	      addProjection: addProjection,
	      addProjections: addProjections,
	      removeProjection: removeProjection,
	      addListener: addListener,
	      issue: issue,
	      trigger: trigger
	    });

	    if (gyrejsDebugger) {
	      API = gyrejsDebugger.addGyre(gId, API);
	      _internal.bus = gyrejsDebugger.addBus(gId, _internal.bus);
	      _internal.dispatcher = gyrejsDebugger.addDispatcher(gId, _internal.dispatcher);
	    }
	    return Object.freeze(API);
	  };
	};

	exports.default = gyreFactory;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Projection factory
	 *
	 * @param {Object} _internal Object with gyre internal instances.
	 * @param {Function} reducer Object
	 * @returns {{addSelector: Function, getState: Function, setState: Function, setTicker: Function, update: Function}} API
	 */
	var projectionFactory = function projectionFactory(_internal) {
	  var reducer = arguments.length <= 1 || arguments[1] === undefined ? function (state) {
	    return state;
	  } : arguments[1];

	  // Private variables
	  var state = undefined;
	  var listeners = [];
	  listeners.ticker = function (cb) {
	    return cb();
	  };
	  listeners.updateRequested = false;

	  var setInitialState = function setInitialState() {
	    state = Object.freeze(reducer(void 0, { type: null }));
	    return state;
	  };
	  setInitialState();

	  /**
	   * Send update to all registered selectors.
	   *
	   * @param {Function} [scb] Specific callback to solely invoke.
	   * @returns {Function} sendUpdate function for a namespace.
	   */
	  var sendUpdate = function sendUpdate(scb) {
	    return function () {
	      listeners.updateRequested = false;
	      return scb ? scb(state) : listeners.forEach(function (listener) {
	        return listener(state);
	      });
	    };
	  };

	  /**
	   * Request to issue update to filters of a given namespace.
	   *
	   * @param {Function} [scb] Specific callback to solely invoke.
	   * @returns {void}
	   */
	  var requestUpdate = function requestUpdate(scb) {
	    if (!listeners.updateRequested) {
	      listeners.updateRequested = true;
	      listeners.ticker(sendUpdate(scb));
	    }
	  };

	  /**
	   * Remove selector from the store
	   *
	   * @param {Function} cb Selector callback.
	   * @returns {Function} removal function.
	   */
	  var removeListener = function removeListener(cb) {
	    return function () {
	      return listeners.splice(listeners.indexOf(cb), 1);
	    };
	  };

	  /**
	   * Overwrite the current state in the store.
	   * Use for setting an initial state or debugging.
	   *
	   * @param {Immutable.Map} newState New state.
	   * @returns {Immutable.Map} state Current state
	   */
	  var setNewState = function setNewState(newState) {
	    if (state !== newState) {
	      state = Object.freeze(newState);
	      requestUpdate();
	    }
	    return state;
	  };

	  // Public methods
	  /**
	   * Register a selector with the store and send initial data.
	   *
	   * @param {Function} cb callback.
	   * @returns {Function} un-register function.
	   */
	  var addListener = function addListener(cb) {
	    // Save to local register
	    listeners.push(cb);

	    // Request update to make sure the new filter gets data asap.
	    requestUpdate(cb);

	    // Return function to remove selector from store.
	    return removeListener(cb);
	  };

	  /**
	   * Set tick function for a given namespace.
	   *
	   * The tick function is added as a property to the selector array for given namespace.
	   *
	   * @param {Function} ticker Store update tick function for given namespace.
	   * @returns {void}
	   */
	  var setTicker = function setTicker(ticker) {
	    if (typeof ticker !== "function") {
	      throw new Error("GyreJS (setTicker): Ticker should be a function.");
	    }
	    listeners.ticker = ticker;
	  };

	  /**
	   * Applies a given reducer function to the state, which
	   * is supposed to return a new Immutable state.
	   * If nothing is returned, the original state is kept.
	   *
	   * @param {String} evt Event name.
	   * @returns {Object} state New state.
	   */
	  var update = function update(evt) {
	    if (evt.type === "__RESET__") {
	      return setNewState(reducer(void 0, evt));
	    }
	    return setNewState(reducer(state, evt));
	  };

	  /**
	   *
	   * @type {Function}
	   */
	  var destroy = function (removeProjectionFromBus) {
	    return function (id) {
	      // Check if no more listeners are present on projection
	      var lCount = listeners.length;
	      if (lCount > 0) {
	        console.warn(">> GyreJS: (removeProjection) Projection with id:'" + id + "' connot be removed; still " + lCount + " listeners attached;"); // eslint-disable-line no-console
	        return false;
	      }
	      return removeProjectionFromBus() && true;
	    };
	  }(_internal.bus.addProjection(update));

	  return {
	    addListener: addListener,
	    destroy: destroy,
	    setTicker: setTicker,
	    update: update
	  };
	};

	exports.default = projectionFactory;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var tickers = {
	  synchronous: function synchronous(cb) {
	    return cb();
	  },
	  deferred: function deferred(cb) {
	    return setTimeout(function () {
	      return cb();
	    }, 0);
	  }
	};

	exports.default = {
	  get: function get(ticker) {
	    return tickers[ticker] || tickers.synchronous;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _gyres = __webpack_require__(6);

	var _gyres2 = _interopRequireDefault(_gyres);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Private variables
	var API = {};

	// Private methods
	/**
	 * Get registered gyres object singleton.
	 * Gyres object is created on first use instead of on library load.
	 *
	 * @returns {Object} Gyres object.
	 */
	var getGyres = function () {
	  var gyres = undefined;
	  return function () {
	    return gyres || (gyres = { "empty": (0, _gyres2.default)() });
	  };
	}();

	// Public functions
	var gyrejsDebugger = undefined;
	var attachDebugger = function attachDebugger(gDebugger) {
	  return gyrejsDebugger = gDebugger;
	};

	/**
	 * Creates a new gyre instance. Based on a factory function by registered id.
	 * If no id is provided, an empty gyre instance will be returned.
	 *
	 * @param {String} [id] Id of a registered gyre factory.
	 * @param {Object} [options] Options object for gyre.
	 * @returns {Object|void} Gyre instance.
	 */
	var gCounter = 0;
	var instantiateGyre = function instantiateGyre() {
	  var id = arguments.length <= 0 || arguments[0] === undefined ? "empty" : arguments[0];
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if (getGyres().hasOwnProperty(id)) {
	    // Return gyre instance object with a unique namespace.
	    var gId = id + "-" + gCounter++;
	    return getGyres()[id](Object.assign({}, options, { gId: gId, gyrejsDebugger: gyrejsDebugger }));
	  }
	  throw new Error("GyreJS (instantiateGyre): Error on create - Gyre factory '" + id + "' not registered."); // eslint-disable-line no-console
	};

	/**
	 * Register a gyre factory function. Overides any gyre factory which is already present at that ID.
	 *
	 * @param {String} id Id of to register gyre.
	 * @param {Function} factory Gyre factory function.
	 * @returns {Object} API Chainable GyreJS object.
	 */
	var registerGyre = function registerGyre(id, factory) {
	  if (id === "empty") {
	    throw new Error("GyreJS (registerGyre): cannot use 'empty, it is a reserved id.");
	  }

	  getGyres()[id] = factory;
	  return API;
	};

	/**
	 * Un-register a gyre factory function.
	 *
	 * @param {String} id Id of a registered gyre factory.
	 * @returns {boolean} Whether the factory has been un-registered.
	 */
	var unRegisterGyre = function unRegisterGyre(id) {
	  if (!getGyres().hasOwnProperty(id)) {
	    console.warn(">> GyreJS: (unRegisterGyre) Cannot un-register - Gyre factory '" + id + "' not registered."); // eslint-disable-line no-console
	    return false;
	  }
	  return delete getGyres()[id] && true;
	};

	/**
	 * Gyre factory function.
	 *
	 * @type {Object}
	 */
	var createGyre = function createGyre() {
	  return arguments.length === 1 ? _gyres2.default.apply(undefined, arguments) : registerGyre(arguments.length <= 0 ? undefined : arguments[0], (0, _gyres2.default)(arguments.length <= 1 ? undefined : arguments[1]));
	};

	// GyreJS API
	exports.default = Object.assign(API, {
	  attachDebugger: attachDebugger,
	  createGyre: createGyre,
	  instantiateGyre: instantiateGyre,
	  registerGyre: registerGyre,
	  unRegisterGyre: unRegisterGyre
	});

/***/ }
/******/ ])
});
;